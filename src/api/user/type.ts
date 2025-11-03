// 登录接口需要携带参数的ts类型
export interface loginForm {
  username: string
  password: string
}

export interface LoginData {
  token: string
}

// 登录接口返回数据类型
export interface loginResponseData {
  code: number
  data: LoginData
}

export interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string
  token: string
}

// 获取用户信息接口返回数据类型
export interface userResponseData {
  code: number
  data: userInfo
}
