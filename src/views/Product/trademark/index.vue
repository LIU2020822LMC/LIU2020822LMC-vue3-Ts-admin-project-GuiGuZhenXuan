<template>
  <el-card>
    <!-- 添加按钮 -->
    <el-button type="primary" plain icon="Plus">添加品牌</el-button>
    <!-- 表格组件 -->
    <el-table style="margin: 10px 0px" border>
      <el-table-column label="序号" width="80px" align="center" />
      <el-table-column label="品牌名称" />
      <el-table-column label="品牌LOGO" />
      <el-table-column label="品牌操作" />
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
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 当前页面
const currentPage = ref<number>(1)
// 每一页展示多少条数据
const pageSize = ref<number>(10)

const handleCurrentChange = (e: any) => {
  console.log(e)
}

const handleSizeChange = (e: any) => {
  console.log(e)
}
</script>

<style scoped></style>
