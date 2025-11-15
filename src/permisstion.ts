// 路由鉴权：鉴权，项目当中路由能不能被的权限的设置
import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import setting from './setting'
// 获取用户相关的小仓库内部token数据，去判断用户是否登录成功
import useUserStore from './store/modules/user'
import pinia from './store'
const userState = useUserStore(pinia)

// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  console.log(from.path)
  // 改变网站显示的名字
  document.title = `${setting.title} - ${to.meta.title}`
  // 访问某一个路由之前守卫
  nprogress.start()
  // 获取token，去判断用户登录还是未登录
  const token = userState.token
  const username = userState.username
  // 用户登录
  if (token) {
    // 登录成功，访问login的话直接指向首页
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      // 有用户信息
      if (username) {
        next()
      } else {
        // 如果没有用户信息，在守卫这里发请求获取到了用户信息再放行
        try {
          // 获取用户信息
          await userState.GetUserInfo()
          next()
        } catch (error) {
          // token失效，退出登录
          userState.Logout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
  next()
})

// 全局后卫守卫
router.afterEach(() => {
  nprogress.done()
})
