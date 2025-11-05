import { defineStore } from 'pinia'
import { Login } from '@/api/user/index.ts'
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/types'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
// 引入路由（常量路由）
import { constantRoute } from '@/router/routes'

const useUserStore = defineStore('user', () => {
  // 用户token
  let token: UserState['token'] = GET_TOKEN()
  // 菜单路由
  const menuList: UserState['menuRoutes'] = constantRoute

  // 登录方法
  const getLogin = async (data: loginForm) => {
    const res: loginResponseData = await Login(data)
    token = res.data.token || ''
    // 持久化存储在本地浏览器
    SET_TOKEN(res.data.token as string)
  }

  return {
    token,
    getLogin,
    menuList,
  }
})

export default useUserStore
