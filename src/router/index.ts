import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { getLocalStorage } from '../utils/localStoregeUtil'
import { firstMenu } from '../utils/map-menus'
const routes:RouteRecordRaw[] = [
  // {
  //   path: '/:pathMatch(.*)*',
  //   component: () => import('@/views/404/index.vue')
  // },
  {
    path: '/',
    redirect: 'main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/index.vue'),
    children: []
  }

]
const router = createRouter({
  routes,
  history: createWebHashHistory()
})
router.beforeEach((to, from) => {
  window.$loadingBar?.start()
  if (to.path !== '/login') {
    const token = getLocalStorage('token')
    if (!token) {
      window.$loadingBar?.finish()
      return '/login'
    }
  }
  if (to.path === '/main') {
    console.log(firstMenu, 'firstMenu.url')

    return firstMenu.url
  }
})
router.afterEach((to: any) => {
  window.$loadingBar?.finish()
})
export default router
