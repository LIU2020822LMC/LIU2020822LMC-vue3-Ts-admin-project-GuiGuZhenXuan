export const constantRoute = [
  {
    // 登录
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
    name: 'Login',
    meta: {
      title: '登录', // 菜单标题
      hidden: true, // 隐藏菜单 true:隐藏 false:显示
      icon: 'Setting', // 菜单文字左侧的图标，支持element-plus全部图标
    },
  },
  {
    // 一级路由布局
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'Layout',
    meta: {
      title: 'Layout',
      icon: 'Setting',
    },
    redirect: '/home',
    // 二级路由
    children: [
      {
        // 首页
        path: '/home',
        component: () => import('@/views/Home/index.vue'),
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          hidden: false,
        },
      },
    ],
  },
  {
    // 数据可视化
    path: '/screen',
    component: () => import('@/views/Screen/index.vue'),
    name: 'Screen',
    meta: {
      title: '数据可视化',
      hidden: false,
      icon: 'Monitor',
    },
  },
  {
    // 权限管理
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock',
    },
    children: [
      {
        // 用户管理
        path: '/acl/user',
        component: () => import('@/views/Acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User',
        },
      },
      {
        // 角色管理
        path: '/acl/role',
        component: () => import('@/views/Acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'Avatar',
        },
      },
      {
        // 菜单管理
        path: '/acl/permission',
        component: () => import('@/views/Acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Menu',
        },
      },
    ],
  },
  {
    // 商品管理
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'goods',
    },
    children: [
      {
        // 品牌管理
        path: '/product/trademark',
        component: () => import('@/views/Product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'ShoppingCartFull',
        },
      },
      {
        // 属性管理
        path: '/product/attribute',
        component: () => import('@/views/Product/attribute/index.vue'),
        name: 'Attribute',
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'PriceTag',
        },
      },
      {
        // SPU管理
        path: '/product/spu',
        component: () => import('@/views/Product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          hidden: false,
          icon: 'Grid',
        },
      },
      {
        // Sku管理
        path: '/product/sku',
        component: () => import('@/views/Product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          hidden: false,
          icon: 'Grid',
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
      icon: 'Setting',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任何',
      hidden: true,
      icon: 'Setting',
    },
  },
]
