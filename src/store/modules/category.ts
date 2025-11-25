// 小仓库： 商品分级组件相关配置仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getC1, getC3, getC2 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategorState } from './types/types'

const useCategoryStore = defineStore('Category', () => {
  // 存储一级分类的数据
  const c1Arr = ref<CategorState['c1Arr']>([])
  // 存储一级分类ID
  const c1Id = ref<CategorState['c1Id']>('')
  // 存储二级分类的数据
  const c2Arr = ref<CategorState['c2Arr']>([])
  // 存储二级分类ID
  const c2Id = ref<CategorState['c2Id']>('')
  // 存储三级级分类的数据
  const c3Arr = ref<CategorState['c3Arr']>([])
  // 存储三级级分类ID
  const c3Id = ref<CategorState['c3Id']>('')

  // 获取一级分类数据的方法
  const GetC1 = async () => {
    const res: CategoryResponseData = await getC1()
    if (res.code == 200) {
      c1Arr.value = res.data
    }
  }

  // 获取二级分类数据的方法
  const GetC2 = async () => {
    const res: CategoryResponseData = await getC2(c1Id.value)
    if (res.code == 200) {
      c2Arr.value = res.data
    }
  }

  // 获取三级分类数据的方法
  const GetC3 = async () => {
    const res: CategoryResponseData = await getC3(c2Id.value)
    if (res.code == 200) {
      c3Arr.value = res.data
    }
  }

  return {
    c1Arr,
    c1Id,
    c2Arr,
    c2Id,
    c3Arr,
    c3Id,
    GetC1,
    GetC2,
    GetC3,
  }
})

export default useCategoryStore
