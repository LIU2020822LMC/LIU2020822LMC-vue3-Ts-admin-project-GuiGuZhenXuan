import { constantRoute } from './routes.ts'
import { createRouter, createWebHashHistory } from 'vue-router'

// 创建路由器
const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  routes: constantRoute,
})

export default router
