<script lang="ts" setup>

import NavMenu from '../../components/NavMenu/index.vue'
import { ref } from 'vue'
import NavHeader from '../../components/NavHeader/index.vue'
const collapsed = ref(true)

</script>
<template>
  <n-layout has-sider>
    <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed"
      show-trigger @collapse="collapsed = true" @expand="collapsed = false">
      <NavMenu></NavMenu>
    </n-layout-sider>
    <n-layout class="h-[100vh] bg-[#f3f3f8]">
<div class="grid-container h-full">
<NavHeader></NavHeader>
      <div class="h-full px-4">
          <div class="h-full grid grid-cols-1 grid-rows-[auto,1fr] gap-3 overflow-y-hidden ">
            <router-view></router-view>
          </div>
      </div>
</div>

    </n-layout>
  </n-layout>

</template>
<style>

.n-layout-sider {
  width: 100px;
  /* background: #00142b; */
}

.n-layout-scroll-container {
  /* @apply grid grid-cols-1 grid-rows-[48px,1fr]  gap-3 ; */
}
.grid-container{
  @apply grid grid-cols-1 grid-rows-[48px,1fr]  gap-5 ;

}
</style>
