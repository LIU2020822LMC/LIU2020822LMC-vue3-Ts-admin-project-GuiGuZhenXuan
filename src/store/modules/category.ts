// 小仓库： 商品分级组件相关配置仓库
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getC1 } from '@/api/product/attr'

const useCategoryStore = defineStore('Category', () => {
  // 存储一级分类的数据
  const c1Arr = ref<any>([])
  // 存储一级分类ID
  const c1Id = ref<number | string>('')

  // 获取一级分类数据的方法
  const GetC1 = async () => {
    const res: any = await getC1()
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
