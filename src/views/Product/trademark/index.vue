<template>
  <el-card>
    <!-- 添加按钮 -->
    <el-button type="primary" plain icon="Plus">添加品牌</el-button>
    <!-- 表格组件 -->
    <el-table style="margin: 10px 0px" border :data="trademarkArr">
      <el-table-column label="序号" width="80px" align="center" type="index" />
      <el-table-column label="品牌名称" prop="tmName" align="center" />
      <el-table-column label="品牌LOGO" align="center">
        <template v-slot="{ row }">
          <img
            :src="row.logoUrl"
            alt="图片资源未正确加载"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作" align="center">
        <template v-slot="{ row }">
          <el-button type="primary" size="small" icon="Edit" circle plain />
          <h1>{{ row.id }}</h1>
          <el-button type="danger" size="small" icon="delete" circle plain />
        </template>
      </el-table-column>
      <!-- 空状态组件 - 使用 empty 插槽 -->
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 200]"
      :background="true"
      layout="prev, pager, next, jumper,->, sizes,total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getHasTrademark } from '@/api/product/trademark'

// 当前页面
const currentPage = ref<number>(1)
// 每一页展示多少条数据
const pageSize = ref<number>(10)
// 存储已有品牌数据总数
const total = ref<number>(0)
// 存储已有品牌的数据
const trademarkArr = ref([])

// 获取已有品牌数据函数
const GetHasTrademark = async () => {
  const res = await getHasTrademark(currentPage.value, pageSize.value)
  if (res.code == 200) {
    trademarkArr.value = res.data.records
    total.value = res.data.total
  }
}

const handleCurrentChange = (e: any) => {
  console.log(e)
}

const handleSizeChange = (e: any) => {
  console.log(e)
}

onMounted(() => {
  GetHasTrademark()
})
</script>

<style scoped></style>
