// 路由鉴权：鉴权，项目当中路由能不能被的权限的设置
import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 全局前置守卫
router.beforeEach((next: any) => {
  // 访问某一个路由之前守卫
  nprogress.start()
  next()
})

// 全局后卫守卫
router.afterEach(() => {
  nprogress.done()
})
