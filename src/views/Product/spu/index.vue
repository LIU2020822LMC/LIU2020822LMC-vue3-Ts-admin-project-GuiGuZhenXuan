<template>
  <!-- 三级分类 -->
  <Category :scene="scene" />
  <el-card style="margin: 10px 0px">
    <el-button type="primary" plain icon="Plus">添加SPU</el-button>
    <el-table border>
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column label="SPU名称"></el-table-column>
      <el-table-column label="SPU描述"></el-table-column>
      <el-table-column label="SPU操作"></el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[1, 3, 5, 10, 15, 20]"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="400"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const scene = ref<number>(0)
// 分页器默认页码
const pageNo = ref<number>(1)
// 每一页展示几条数据
const pageSize = ref<number>(5)
</script>

<style scoped></style>
