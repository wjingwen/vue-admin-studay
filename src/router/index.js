import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/view/layout'
Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/view/login/login'),
    meta: { title: '登录',}
  },
  {
    path: '/',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'admin',
        name: 'adminhome',
        component: () => import('@/view/admin/index'),
        meta: {title: '首页'}
      }
    ]
  },
  // 配置404页面
  {
    path: '*',
    hidden: true,
    component: Layout,
    redirect: "/404",
    children: [
      {
        path: '/404',
        name: '404',
        component: () => import('@/view/admin/404'),
        meta: {title: '网页走丢了'}
      }
    ]
  },
]
//所有权限路由
export default new Router({
  mode:'history',
  routes: constantRouterMap
})

//动态权限路由
export const asyncRouterMap = [
  {
    path: '/menu',
    hidden: false,
    component: Layout,
    meta: {icon: 'link',title: '多层路由',permissionRouter:[1,2]},
    children:[
      {
        path:'menu-1-1',
        alwaysShow: true,//下面是否还有路由
        component: () => import('@/view/routerview/index'),
        meta: {icon: '',title: '二级路由'},
        children:[
          {
            path:'menu-1-2',
            name:'menu-1-2',
            component: () => import('@/view/menu/index'),
            meta: {icon: '',title: '三级级路由'},
          }
        ]
      },
      {
        path:'menu-2-1',
        name:'menu-2-1',
        component: () => import('@/view/menu/routertwo'),
        meta: {icon: '',title: '二级路由2'}
      }
    ],
  },
  {
    path: '/setting',
    hidden: false,
    component: Layout,
    meta:{icon: 'setting',title:'系统设置',permissionRouter:[1,2]},
    children: [
      {
        path: 'from',
        hidden: false,
        name: 'from',
        component: () => import('@/view/setting/from'),
        meta: {icon: '',title: '表单提交'}
      },
       {
        path: 'table',
        hidden: false,
        name: 'table',
        component: () => import('@/view/setting/table'),
        meta: {icon: '',title: '表格展示'}
      }
    ]
  },
  {
    path: '/echart',
    hidden: false,
    component: Layout,
    meta:{icon: 's-data',title:'Echart图标',permissionRouter:[1,2]},
    children:[
      {
        path: 'index',
        name:'echart',
        hidden: false,
        component: () => import('@/view/echart/index'),
        meta: {icon: '',title: 'Echart图标'}
      }
    ]
  },
  {
    path:'/excel',
    hidden:false,
    component:Layout,
    meta:{icon: 's-grid',title:'Excel管理',permissionRouter:[1]},
    children:[
      {
        path: 'index',
        name:'excelupload',
        hidden: false,
        component: () => import('@/view/excel/upload'),
        meta: {icon: '',title: '上传Excel'}
      },
      {
        path: 'download',
        name:'exceldownload',
        hidden: false,
        component: () => import('@/view/excel/download'),
        meta: {icon: '',title: '下载Excel'}
      }
    ]
  },
  {
    path:'/technology',
    hidden:false,
    component:Layout,
    meta:{icon: 'info',title:'VUE技术栈',permissionRouter:[1]},
    children:[
      {
        path: 'directive',
        name:'directive',
        hidden: false,
        component: () => import('@/view/technology/directive'),
        meta: {icon: '',title: '指令/组件'}
      },
      {
        path: 'funtion',
        name:'funtion',
        hidden: false,
        component: () => import('@/view/technology/funtion'),
        meta: {icon: '',title: '相关函数'}
      },
      {
        path: 'richtext',
        name:'richtext',
        hidden: false,
        component: () => import('@/view/technology/richtext'),
        meta: {icon: '',title: '富文本编辑器'}
      },
      {
        path: 'address',
        name:'address',
        hidden: false,
        component: () => import('@/view/technology/address'),
        meta: {icon: '',title: '高德地图'}
      },
    ]
  },

]
