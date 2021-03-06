import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  // {
  //   path: '/userManage',
  //   component: Layout,
  //   redirect: '/userManage/userList',
  //   name: 'userManage',
  //   meta: { title: '用户管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'goodsList',
  //       name: 'goodsList',
  //       component: () => import('@/views/goodsManage/goodsList'),
  //       meta: { title: '商品列表', icon: 'table' }
  //     },
  //     {
  //       path: 'classList',
  //       name: 'classList',
  //       component: () => import('@/views/goodsManage/classList'),
  //       meta: { title: '分类列表', icon: 'table' }
  //     },
  //     {
  //       path: 'addGoods',
  //       hidden: true,
  //       name: 'addGoods',
  //       component: () => import('@/views/goodsManage/addGoods'),
  //       meta: { title: '新增商品', icon: 'tree' }
  //     },
  //     {
  //       path: 'editGoods',
  //       hidden: true,
  //       name: 'editGoods',
  //       component: () => import('@/views/goodsManage/addGoods'),
  //       meta: { title: '编辑商品', icon: 'tree' }
  //     },
  //     {
  //       path: 'addClass',
  //       hidden: true,
  //       name: 'addClass',
  //       component: () => import('@/views/goodsManage/addClass'),
  //       meta: { title: '新增分类', icon: 'tree' }
  //     },
  //     {
  //       path: 'editClass',
  //       hidden: true,
  //       name: 'editClass',
  //       component: () => import('@/views/goodsManage/addClass'),
  //       meta: { title: '编辑分类', icon: 'tree' }
  //     }
  //   ]
  // },
  {
    path: '/goodsManage',
    component: Layout,
    redirect: '/goodsManage/goodsList',
    name: 'goodsManage',
    meta: { title: '商品管理', icon: 'example' },
    children: [
      {
        path: 'goodsList',
        name: 'goodsList',
        component: () => import('@/views/goodsManage/goodsList'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'classList',
        name: 'classList',
        component: () => import('@/views/goodsManage/classList'),
        meta: { title: '分类列表', icon: 'table' }
      },
      {
        path: 'addGoods',
        hidden: true,
        name: 'addGoods',
        component: () => import('@/views/goodsManage/addGoods'),
        meta: { title: '新增商品', icon: 'tree' }
      },
      {
        path: 'editGoods',
        hidden: true,
        name: 'editGoods',
        component: () => import('@/views/goodsManage/addGoods'),
        meta: { title: '编辑商品', icon: 'tree' }
      },
      {
        path: 'addClass',
        hidden: true,
        name: 'addClass',
        component: () => import('@/views/goodsManage/addClass'),
        meta: { title: '新增分类', icon: 'tree' }
      },
      {
        path: 'editClass',
        hidden: true,
        name: 'editClass',
        component: () => import('@/views/goodsManage/addClass'),
        meta: { title: '编辑分类', icon: 'tree' }
      }
    ]
  },
  {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage/adminList',
    name: 'userManage',
    meta: { title: '用户管理', icon: 'example' },
    children: [
      {
        path: 'adminList',
        name: 'adminList',
        component: () => import('@/views/userManage/adminList'),
        meta: { title: '系统用户', icon: 'table' }
      },
      // {
      //   path: 'userList',
      //   name: 'userList',
      //   component: () => import('@/views/userManage/userList'),
      //   meta: { title: '个人用户', icon: 'table' }
      // },
      {
        path: 'roleList',
        name: 'roleList',
        component: () => import('@/views/userManage/roleList'),
        meta: { title: '角色列表', icon: 'table' }
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

