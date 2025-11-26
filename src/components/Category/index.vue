<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select
          style="width: 200px"
          v-model="categoryStore.c1Id"
          @change="handler"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="item in categoryStore.c1Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          style="width: 200px"
          @change="handler1"
          v-model="categoryStore.c2Id"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="item in categoryStore.c2Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          style="width: 200px"
          v-model="categoryStore.c3Id"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            v-for="item in categoryStore.c3Arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()

// 一级分类下拉菜单的change事件
const handler = () => {
  // 清空二、三级分类数据
  categoryStore.c2Id = ''
  categoryStore.c3Arr = []
  categoryStore.c3Id = ''
  // 获取二级分类数据
  categoryStore.GetC2()
}

// 二级分类下拉菜单的change事件
const handler1 = () => {
  // 清空三级分类数据
  categoryStore.c3Id = ''
  // 获取三级级分类数据
  categoryStore.GetC3()
}

// 接受父组件传递过来的scene
defineProps(['scene'])

onMounted(() => {
  categoryStore.GetC1()
})
</script>

<style scoped></style>
