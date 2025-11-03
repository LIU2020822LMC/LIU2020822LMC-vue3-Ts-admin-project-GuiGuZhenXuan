import { defineStore } from 'pinia'
import { Login } from '@/api/user/index.ts'
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/types'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'

const useUserStore = defineStore('user', () => {
  // 用户token
  let token: UserState = GET_TOKEN()

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
  }
})

export default useUserStore
