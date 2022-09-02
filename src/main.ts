import { createApp } from 'vue'

import App from './App.vue'
import router from './router/'
// import Zrequest from './utils/axios'
import 'normalize.css'
import '@/style/index.css'
import '@/style/base.css'
import pinia from './store/store'
import { useUserStore } from './store/user'
const app = createApp(App)
app.use(pinia)
// 避免浏览器刷新丢失路由
useUserStore().getMapRoutes()
app.use(router)

app.mount('#app')

// const req = new Zrequest({
//   baseURL: 'ww',
//   interceptors: {
//     requestInterceptor: (config) => {
//       return config
//     },
//     requestInterceptorCatch: (error) => {
//       return error
//     },
//     responseInterceptor: (res) => {
//       return res
//     },
//     responseInterceptorCatch: (error) => {
//       return error
//     }
//   }
// })
// req.request({
//   url: 'https://v.api.aa1.cn/api/yiyan/index.php',
//   method: 'get'
// })
