// 登录接口需要携带参数的ts类型
export interface loginForm {
  username: string
  password: string
}

// 定义全部接口返回数据都拥有的ts类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data: string
}

export interface userInfo {
  avatar: string
  routes: string[]
  buttons: string[]
  name: string
  roles: string[]
}

// 获取用户信息接口返回数据类型
export interface userResponseData extends ResponseData {
  data: userInfo
}

// 退出登录接口返回数据类型
export interface logoutResponseData extends ResponseData {
  data: string
}
