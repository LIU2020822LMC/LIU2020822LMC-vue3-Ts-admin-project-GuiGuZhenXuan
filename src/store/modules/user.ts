import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Login } from '@/api/user/index.ts'
import { loginForm } from '@/api/user/type'

const useUserStore = defineStore('user', () => {
  // 用户token
  const token = ref('')
  token.value = localStorage.getItem('TOKEN') || ''

  // 登录方法
  const getLogin = async (data: loginForm) => {
    const res = await Login(data)
    token.value = res.token
    // 持久化存储在浏览器
    localStorage.setItem('TOKEN', res.token)
  }

  return {
    token,
    getLogin,
  }
})

export default useUserStore
