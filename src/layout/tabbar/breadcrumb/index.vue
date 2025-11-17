<template>
  <el-breadcrumb separator=">">
    <!-- 面包屑动态展示路由名字与标题 -->
    <el-breadcrumb-item
      v-for="(item, index) in route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- 动态图标展示 -->
      <el-icon style="margin: 0px 3px; vertical-align: middle">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 面包屑动态展示匹配路由的标题 -->
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

console.log(route.matched)
</script>

<style scoped></style>
