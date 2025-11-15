import { defineStore } from 'pinia'
import { Login, getUserInfo, logout } from '@/api/user/index.ts'
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/types'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { ref } from 'vue'
// 引入路由（常量路由）
import { constantRoute } from '@/router/routes'

const useUserStore = defineStore('user', () => {
  // 用户token
  const token = ref<UserState['token']>(GET_TOKEN())
  // 菜单路由
  const menuList = ref<UserState['menuRoutes']>(constantRoute)
  // 用户名字
  const username = ref<UserState['username']>('')
  // 用户头像
  const avatar = ref<UserState['avatar']>('')

  // 登录方法
  const getLogin = async (data: loginForm) => {
    const res: loginResponseData = await Login(data)
    token.value = res.data || ''
    // 持久化存储在本地浏览器
    SET_TOKEN(res.data as string)
  }

  // 获取用户信息方法
  const GetUserInfo = async () => {
    // 获取用户信息进行存储仓库当中（用户名字、用户头像）
    const res: any = await getUserInfo()
    if (res.code === 200) {
      username.value = res.data.name
      avatar.value = res.data.avatar
      return 'OK'
    } else {
      return Promise.reject('获取用户信息失败')
    }
  }

  // 退出登录按钮
  const Logout = async () => {
    const res = await logout()
    if (res.code == 200) {
      // 清空用户相关信息
      token.value = ''
      username.value = ''
      avatar.value = ''
      // 清除持久化存储token
      REMOVE_TOKEN()
    } else {
      return Promise.reject(res.message)
    }
  }
  return {
    token,
    getLogin,
    menuList,
    GetUserInfo,
    username,
    avatar,
    Logout,
  }
})

export default useUserStore
