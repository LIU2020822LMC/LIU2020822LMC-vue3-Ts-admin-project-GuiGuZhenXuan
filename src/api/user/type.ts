// 登录接口需要携带参数的ts类型
export interface loginForm {
  username: string
  password: string
}

// 登录接口返回数据类型
export interface loginResponseData {
  code: number
  data: string
  message: string
  ok: boolean
}

export interface userInfo {
  avatar: string
  buttons: string[]
  name: string
  roles: string[]
}

// 获取用户信息接口返回数据类型
export interface userResponseData {
  code: number
  data: userInfo
  message: string
  ok: boolean
}

// 退出登录接口返回数据类型
export interface logoutResponseData {
  code: number
  data: string
  message: string
  ok: boolean
}
