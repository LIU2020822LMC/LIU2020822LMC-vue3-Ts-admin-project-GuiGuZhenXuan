import axios from 'axios'
import { ElMessage } from 'element-plus'

// 1. 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 从环境变量获取基础地址（需在 .env 文件配置）
  timeout: 10000, // 超时时间（10秒）
})

// 2. 请求拦截器（发送请求前处理）
request.interceptors.request.use(
  (config) => {
    // // 示例：添加 Token（根据实际场景修改）
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    // 请求错误处理
    ElMessage.error('请求失败')
    return Promise.reject(error)
  },
)

// 3. 响应拦截器（收到响应后处理）
request.interceptors.response.use(
  (response) => {
    const { data } = response
    // 假设后端接口统一返回格式：{ code: 200, data: ..., '' }
    if (data.code === 200) {
      // 成功状态：直接返回 data 数据
      return data
    } else {
      // 业务错误（如参数错误、权限不足等）
      return Promise.reject(new Error(data.data?.message || '操作失败'))
    }
  },
  (error) => {
    // HTTP 错误（如 404、500 等）
    let message = ''
    if (error.response) {
      // 有响应但状态码异常
      const status = error.response.status
      switch (status) {
        case 401:
          message = '登录已过期，请重新登录'
          // 示例：跳转到登录页（需结合路由库，如 Vue Router）
          // router.push('/login')
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = `请求错误`
      }
    } else if (error.request) {
      // 无响应（如网络错误、超时）
      message = '网络连接失败，请检查网络'
    } else {
      // 其他错误
      message = error.message
    }
    ElMessage.error(message)
    return Promise.reject(error)
  },
)

export default request
