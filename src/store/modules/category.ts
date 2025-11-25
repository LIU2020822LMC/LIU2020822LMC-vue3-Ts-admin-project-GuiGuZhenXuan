// 小仓库： 商品分级组件相关配置仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getC1 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategorState } from './types/types'

const useCategoryStore = defineStore('Category', () => {
  // 存储一级分类的数据
  const c1Arr = ref<CategorState['c1Arr']>([])
  // 存储一级分类ID
  const c1Id = ref<CategorState['c1Id']>('')

  // 获取一级分类数据的方法
  const GetC1 = async () => {
    const res: CategoryResponseData = await getC1()
    if (res.code == 200) {
      c1Arr.value = res.data
    }
  }

  return {
    c1Arr,
    c1Id,
    GetC1,
  }
})

export default useCategoryStore
