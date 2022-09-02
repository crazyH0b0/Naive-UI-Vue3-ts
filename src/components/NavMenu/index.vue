<script setup lang="ts">
import { MenuInst } from 'naive-ui/es/menu'
import { toRaw, ref } from 'vue'

import { useUserStore } from '../../store/user'
import test from '../../utils/list2Tree'
import { useRoute } from 'vue-router'
import { refreshRouter } from '../../utils/map-menus'
const route = useRoute()

const menuInstRef = ref<MenuInst | null>(null)
const menus = useUserStore().userMenu
let opts = ref([])
opts = test(toRaw(menus))
const key = refreshRouter(menus, route.path).name
const selectedKeyRef = ref('')
const selectAndExpand = (key:string) => {
  selectedKeyRef.value = key
  menuInstRef.value?.showOption(key)
}
selectAndExpand(key)
</script>

<template>
<n-menu ref="menuInstRef" :options="opts" v-model:value="selectedKeyRef" />

</template>

<style scoped>
.n-layout-scroll-container{
  @apply flex flex-col ;
}
</style>
