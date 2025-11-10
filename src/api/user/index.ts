import request from '@/utils/request'
import { loginForm, loginResponseData, userResponseData } from './type'

// 统一管理接口
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
}

// 登录接口方法
export const Login = (data: loginForm) => {
  return request.post<any, loginResponseData>(API.LOGIN_URL, data)
}

// 获取用户信息接口方法
export const getUserInfo = () => {
  // 第一个参数 any：表示该请求的入参类型（通常是请求参数，如 query、params 等）。这里指定为 any 意味着不限制入参的类型
  // 第二个参数 userResponseData：表示该请求的响应数据类型（即接口返回的数据结构）。
  return request.get<any, userResponseData>(API.USERINFO_URL)
}
