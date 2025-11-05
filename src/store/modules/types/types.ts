// 定义小仓库数据state类型
import { RouteRecordRaw } from 'vue-router'

export type UserState = {
  token: string | null
  menuRoutes: RouteRecordRaw[]
}
