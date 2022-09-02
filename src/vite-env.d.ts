/* eslint-disable no-unused-vars */
/// <reference types="vite/client" />

import 'pinia'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare interface Window {
  $message: any
  $loadingBar?: any;
  $dialog?:any
}

declare module 'vicons/ionicons-v5'

declare module 'pinia' {
  import type Router from 'vue-router' // is it correct ?
  export interface PiniaCustomProperties {
    router: Router;
  }
}
