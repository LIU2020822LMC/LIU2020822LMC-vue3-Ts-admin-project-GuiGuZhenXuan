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
        <el-select
          v-model="saleArrIdAndValueName"
          style="width: 200px"
          :placeholder="
            unSelectSaleAttr.length
              ? `还未选择${unSelectSaleAttr.length}个`
              : '暂无数据可选择'
          "
        >
          <el-option
            v-for="item in unSelectSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}:${item.name}`"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          style="margin-left: 10px"
          @click="addSaleAttr"
          :disabled="!(saleArrIdAndValueName.length > 0)"
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
            style="margin: 0px 3px"
            v-for="(item, index) in row.spuSaleAttrValueList"
            :key="item.id"
            closable
            @close="handleClose(row, index)"
          >
            {{ item.saleAttrValueName }}
          </el-tag>
          <el-input
            v-model="row.saleAttrValue"
            v-if="row.flag === true"
            placeholder="请你输入属性值"
            size="small"
            style="width: 100px"
            @blur="toLook(row)"
            @keyup.enter="toLook(row)"
          ></el-input>
          <el-button
            v-else
            @click="toEdit(row)"
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
    <el-button
      type="primary"
      size="default"
      @click="save"
      :disabled="saleAttr.length > 0 ? false : true"
    >
      保存
    </el-button>
    <el-button size="default" @click="Cancel">取消</el-button>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { UploadUserFile, UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import {
  getAllTradeMark,
  getSpuImageList,
  getSpuSaleAttrList,
  getAllSaleAttr,
  reqAddOrUpdateSpu,
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
  SaleAttrValue,
} from '@/api/product/spu/type'

const $emit = defineEmits(['changeScene'])

const Cancel = () => {
  $emit('changeScene', { flag: 0, params: 'update' })
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
  spuSaleAttrList: [],
})
// 控制放大图对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
const dialogImageUrl = ref<string>('')

// 将来收集还未选择的销售属性的ID与属性值的名字
const saleArrIdAndValueName = ref<string>('')

// 照片墙点击预览按钮的时候触发的钩子
const handPictureCardPreview = (file: any) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}

// 计算出当前SPU还未拥有的销售属性
const unSelectSaleAttr = computed(() => {
  const unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectArr
})

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

const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = saleArrIdAndValueName.value.split(':')
  const newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  saleAttr.value.push(newSaleAttr)
  // 清空收集的数据
  saleArrIdAndValueName.value = ''
}

// 属性值按钮的点击事件
const toEdit = (row: SaleAttr) => {
  saleAttr.value.forEach((item) => {
    item.flag = false
  })
  row.flag = true
}

// 表单元素失去焦点和回车的事件回调
const toLook = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row
  // 整理成服务器需要的属性值形式
  const newSaleAttrValue: SaleAttrValue = {
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  }

  // 判断是否为空
  if ((saleAttrValue as string)?.trim() == '' || saleAttrValue == null) {
    ElMessage.error('属性值不能为空')
    return
  }

  // 判断属性值是否在数组当中存在
  const repeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == saleAttrValue
  })
  if (repeat) {
    ElMessage.error('属性值重复')
    return
  }

  // 追加新的属性值对象
  row.spuSaleAttrValueList.push(newSaleAttrValue)

  // 清空输入框数据
  row.saleAttrValue = ''

  //切换查看模式
  row.flag = false
}

// 关闭标签事件
const handleClose = (row: SaleAttr, index: any) => {
  row.spuSaleAttrValueList.splice(index, 1)
}

// 保存按钮的回调
const save = async () => {
  // 1.照片墙的数据
  SpuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  // 2.销售属性的数据
  SpuParams.value.spuSaleAttrList = saleAttr.value
  console.log(SpuParams.value)
  const result = await reqAddOrUpdateSpu(SpuParams.value)
  if (result.code === 200) {
    ElMessage.success(SpuParams.value.id ? '更新成功' : '添加成功')
    $emit('changeScene', {
      flag: 0,
      params: SpuParams.value.id ? 'update' : 'add',
    })
  } else {
    ElMessage.error(SpuParams.value.id ? '更新失败' : '添加失败')
  }
}

// 点击添加SPU按钮的初始化方法
const initAddSpu = async (c3Id: number | string) => {
  // 清空数据
  Object.assign(SpuParams.value, {
    id: undefined,
    category3Id: '', // 收集三级分类的ID
    spuName: '', // SPU的名字
    description: '', // SPU的描述
    tmId: '', // 品牌的ID
    spuImageList: [],
    spuSaleAttrList: [],
  })
  // 清空照片墙数据
  imgList.value = []
  // 清空销售属性数据
  saleAttr.value = []
  // 清空选择的SPU销售属性
  saleArrIdAndValueName.value = ''
  // 存储三级分类的ID
  SpuParams.value.category3Id = c3Id
  // 获取全部品牌的数据
  const result: AllTradeMark = await getAllTradeMark()
  const result1: HasSaleAttrResponseData = await getAllSaleAttr()
  // 存储数据
  allTradeMark.value = result.data
  allSaleAttr.value = result1.data
}

// 对外暴露
defineExpose({
  initHasSpuData,
  initAddSpu,
})
</script>

<style scoped></style>
