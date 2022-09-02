
<script lang='ts' setup >
import { mapBreadcrumb } from '../../utils/map-menus'
import { useUserStore } from '../../store/user'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()
const store = useUserStore()
const breadcrumb = computed(() => {
  return mapBreadcrumb(store.userMenu, route.path)
})

</script>

<template>
        <n-layout-header class=" flex items-center justify-between  px-4 bg-[#ffffff] ">
        <div>
          <n-breadcrumb>
            <n-breadcrumb-item>
              {{breadcrumb[0].name}}</n-breadcrumb-item>
            <n-breadcrumb-item>
              {{breadcrumb[1].name}}</n-breadcrumb-item>

          </n-breadcrumb>
        </div>
        <UserInfo></UserInfo>
      </n-layout-header>
</template>

<style scoped >

</style>
