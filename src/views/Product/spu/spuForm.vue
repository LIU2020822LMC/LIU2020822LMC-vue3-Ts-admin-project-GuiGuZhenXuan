<template>
  <el-card style="margin: 10px 0px">
    <el-form label-width="100px">
      <el-form-item label="SPU名称">
        <el-input
          placeholder="请你输入SPU名称"
          style="width: 200px"
          v-model="SpuParams.spuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select style="width: 200px" v-model="SpuParams.tmId">
          <el-option
            v-for="item in allTradeMark"
            :key="item.id"
            :label="item.tmName"
            :value="item.id as number"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="请你输入SPU描述"
          style="width: 400px"
          v-model="SpuParams.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图标">
        <el-upload
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          v-model:file-list="imgList"
          :on-preview="handPictureCardPreview"
          :before-upload="beforeUpload"
        >
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select style="width: 200px">
          <el-option label="华为" value=""></el-option>
          <el-option label="魅族" value=""></el-option>
          <el-option label="小米" value=""></el-option>
          <el-option label="苹果" value=""></el-option>
        </el-select>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          style="margin-left: 10px"
        >
          添加属性值
        </el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogVisible" width="500" height="500">
      <img
        :src="dialogImageUrl"
        alt="图片预览失败"
        style="width: 100%; height: 100%"
      />
    </el-dialog>
    <!-- table展示销售属性与属性值的地方 -->
    <el-table border :style="{ margin: '10px 0' }" :data="saleAttr">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column
        label="销售属性名字"
        width="120px"
        prop="saleAttrName"
      ></el-table-column>
      <el-table-column label="销售属性值">
        <template #default="{ row }">
          <el-tag
            v-for="item in row.spuSaleAttrValueList"
            :key="item.id"
            closable
          >
            {{ item.saleAttrValueName }}
          </el-tag>
          <el-button
            type="success"
            icon="Plus"
            size="small"
            style="margin: 0px 5px"
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120px">
        <template #default="{ $index }">
          <el-button
            type="danger"
            size="small"
            icon="DeleteFilled"
            @click="saleAttr.splice($index, 1)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" size="default">保存</el-button>
    <el-button size="default" @click="Cancel">取消</el-button>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadUserFile, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import {
  getAllTradeMark,
  getSpuImageList,
  getSpuSaleAttrList,
  getAllSaleAttr,
} from '@/api/product/spu'
import {
  AllTradeMark,
  HasSaleAttr,
  HasSaleAttrResponseData,
  SaleAttr,
  SaleAttrResponseData,
  SpuData,
  SpuHasImg,
  TradeMark,
} from '@/api/product/spu/type'

const $emit = defineEmits(['changeScene'])

const Cancel = () => {
  $emit('changeScene', 0)
}
// 存储已有的SPU这些数据
const allTradeMark = ref<TradeMark[]>([])
// 存储已有的SPU销售属性
const saleAttr = ref<SaleAttr[]>([])
// 存储全部销售属性
const allSaleAttr = ref<HasSaleAttr[]>([])
// 存储某一个品牌旗下全部售卖商品的图片
const imgList = ref<UploadUserFile[]>([])
// 存储已有的SPU对象
const SpuParams = ref<SpuData>({
  category3Id: '', // 收集三级分类的ID
  spuName: '', // SPU的名字
  description: '', // SPU的描述
  tmId: '', // 品牌的ID
  spuImageList: [],
  spuSaleAttrList: null,
})
// 控制放大图对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
const dialogImageUrl = ref<string>('')

// 照片墙点击预览按钮的时候触发的钩子
const handPictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

// 图片上传前的钩子
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/gif'
  ) {
    ElMessage.error('上传图片文件格式必须是png、jpg、gif')
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('图片文件大小不能超过4M')
    return false
  }
  return true
}

// 子组件书写获取数据的方法
const initHasSpuData = async (spu: SpuData) => {
  // 存储已有的SPU对象，将来在模板中展示
  SpuParams.value = spu
  // 获取全部品牌的数据
  const res1: AllTradeMark = await getAllTradeMark()
  allTradeMark.value = res1.data
  // 获取某一个品牌旗下全部售卖商品的图片
  const res2: SpuHasImg = await getSpuImageList(spu.id as number)
  // 处理图片数据，将其转换为el-upload组件需要的格式
  imgList.value = res2.data.map((item) => {
    return {
      // 末尾的 ! 是 TypeScript 中的 “非空断言运算符”，作用是告诉 TypeScript 编译器：
      // “我明确知道 item.imgUrl 一定不是 null 或 undefined，无需编译时检查它的空值情况”
      name: item.imgName!,
      url: item.imgUrl!,
    }
  })
  // 获取已有的SPU销售属性的数据
  const res3: SaleAttrResponseData = await getSpuSaleAttrList(spu.id as number)
  saleAttr.value = res3.data
  // 获取整个项目全部spu的销售属性
  const res4: HasSaleAttrResponseData = await getAllSaleAttr()
  allSaleAttr.value = res4.data
}
// 对外暴露
defineExpose({
  initHasSpuData,
})
</script>

<style scoped></style>
