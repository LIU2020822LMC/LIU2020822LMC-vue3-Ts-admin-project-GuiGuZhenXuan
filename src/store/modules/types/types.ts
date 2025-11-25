// 定义小仓库数据state类型
import { CategoryObj } from '@/api/product/attr/type'
import { RouteRecordRaw } from 'vue-router'

export type UserState = {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}

// 定义分类仓库state对象的ts类型
export type CategorState = {
  c1Id: string | number
  c1Arr: CategoryObj[]
}
