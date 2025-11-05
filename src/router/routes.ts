export const constantRoute = [
  {
    // 登录
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
    name: 'login',
    meta: {
      title: '登录', // 菜单标题
      hidden: true, // 隐藏菜单 true:隐藏 false:显示
    },
  },
  {
    // 一级路由布局
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: 'Layout',
    },
    // 二级路由
    children: [
      {
        // 首页
        path: '/home',
        component: () => import('@/views/Home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
        },
      },
      {
        // 测试
        path: '/ceshi',
        component: () => import('@/views/Home/index.vue'),
        name: '测试',
        meta: {
          title: '测试',
        },
      },
    ],
  },
  {
    // 404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404页面',
      hidden: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任何',
      hidden: true,
    },
  },
]
