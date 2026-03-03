<template>
  <el-card style="margin: 10px 0px">
    <el-form label-width="100px">
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格（元）">
        <el-input placeholder="价格（元）" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量（g）">
        <el-input placeholder="重量（g）" type="number"></el-input>
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input placeholder="SKU描述" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item
            :label="item.attrName"
            v-for="item in attrArr"
            :key="item.id"
          >
            <el-select placeholder="请选择" style="width: 200px">
              <el-option
                v-for="attrValue in item.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="attrValue.attrId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item
            v-for="item in saleArr"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select placeholder="请选择" style="width: 200px">
              <el-option
                v-for="item1 in item.spuSaleAttrValueList"
                :key="item1.id"
                :label="item1.saleAttrValueName"
                :value="item1.spuId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="imgArr">
          <el-table-column
            type="selection"
            width="80px"
            align="center"
          ></el-table-column>
          <el-table-column label="图片" align="center">
            <template #default="{ row }">
              <img
                :src="row.imgUrl"
                alt="图片加载失败"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
          <el-table-column label="名称" align="center">
            <template #default="{ row }">
              {{ row.imgName }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template>
              <el-button type="primary" size="small">设置默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { getAttr } from '@/api/product/attr'
import { getSpuImageList, getSpuSaleAttrList } from '@/api/product/spu'
import { ref } from 'vue'
const $emit = defineEmits(['changeScene'])

// 取消按钮回调
const cancel = () => {
  // 点击取消按钮切换场景为
  $emit('changeScene', { flag: 0, params: '' })
}

// 平台属性
const attrArr = ref<any>([])
// 销售属性
const saleArr = ref<any>([])
// 照片的数据
const imgArr = ref<any>([])

// 初始化数据
const initSkuData = async (
  c1Id: number | string,
  c2Id: number | string,
  spu: any,
) => {
  // 获取平台属性
  const result: any = await getAttr(c1Id, c2Id, spu.category3Id)
  attrArr.value = result.data
  // 获取对应的销售属性
  const result1: any = await getSpuSaleAttrList(spu.id)
  saleArr.value = result1.data
  console.log('销售属性', saleArr.value)
  // 获取照片墙的数据
  const result2: any = await getSpuImageList(spu.id)
  imgArr.value = result2.data
  console.log('照片墙的数据', imgArr.value)
}

// 对外暴露方法
defineExpose({
  initSkuData,
})
</script>

<style scoped></style>
