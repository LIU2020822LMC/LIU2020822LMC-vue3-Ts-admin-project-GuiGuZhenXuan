export const constantRoute = [
  {
    // 登录
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
    name: 'login',
  },
  {
    // 首页
    path: '/',
    component: () => import('@/views/Home/index.vue'),
    name: 'home',
  },
  {
    // 404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]
