<template>
  <!-- 三级分类 -->
  <Category :scene="scene" />
  <el-card style="margin: 10px 0px" v-show="scene == 0">
    <el-button type="primary" plain icon="Plus" @click="addSpu">
      添加SPU
    </el-button>
    <el-table border :data="records" :style="{ margin: '10px 0px' }">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column label="SPU名称" prop="spuName"></el-table-column>
      <el-table-column label="SPU描述" prop="description"></el-table-column>
      <el-table-column label="SPU操作">
        <template #default>
          <el-button
            type="primary"
            icon="Plus"
            circle
            title="添加SPU"
          ></el-button>
          <el-button
            type="primary"
            icon="Edit"
            circle
            title="修改SPU"
            @click="updateSpu"
          ></el-button>
          <el-button
            type="info"
            icon="View"
            circle
            title="查看SKU列表"
          ></el-button>
          <el-button
            type="danger"
            icon="Delete"
            circle
            title="删除SPU"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[1, 3, 5, 10, 15, 20]"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      @current-change="GetHasSpu"
      @size-change="changeSize"
    />
  </el-card>
  <!-- 添加SKU的子组件 -->
  <skuForm v-show="scene == 2" />
  <!-- 添加SPU|修改SPU子组件 -->
  <spuForm v-show="scene == 1" @changeScene="ChangeSize" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { getHasSpu } from '@/api/product/spu'
import { Records } from '@/api/product/spu/type'
import skuForm from './skuForm.vue'
import spuForm from './spuForm.vue'

const categoryStore = useCategoryStore()
// 存储已有的SPU的数据
const records = ref<Records>()
const scene = ref<number>(0) // 0:显示已有SPU 1：添加或者修改已有SPU 2：添加SKU的结构
// 分页器默认页码
const pageNo = ref<number>(1)
// 每一页展示几条数据
const pageSize = ref<number>(5)

// 监听三级分类ID变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 务必保证有三级分类ID
    if (!categoryStore.c3Id) return
    GetHasSpu()
  },
)
// 存储已有SPU总个数
const total = ref<number>(0)

// 获取SPU分页列表函数
const GetHasSpu = async (pager = 1) => {
  // 修改当前页码
  pageNo.value = pager
  const res = await getHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
  records.value = res.data.records
  total.value = res.data.total
}

// 添加新的SPU按钮的回调
const addSpu = () => {
  scene.value = 1
}

const ChangeSize = (number: number) => {
  scene.value = number
}

// 修改已有的SPU的按钮的回调
const updateSpu = () => {
  scene.value = 1
}

// 分页器下拉菜单发生变化的时候触发
const changeSize = () => {
  GetHasSpu()
}
</script>

<style scoped></style>
