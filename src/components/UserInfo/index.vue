<script>
</script>

<script lang='ts' setup >
import { h } from 'vue'
import type { Component } from 'vue'
import { NIcon } from 'naive-ui'
import { useUserStore } from '../../store/user'
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon
} from 'vicons/ionicons-v5'
import { removeLocalStorage } from '../../utils/localStoregeUtil'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useUserStore()
const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const options = [
  {
    label: '用户资料',
    key: 'profile',
    icon: renderIcon(UserIcon)
  },
  {
    label: '编辑用户资料',
    key: 'editProfile',
    icon: renderIcon(EditIcon)
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogoutIcon)

  }
]

const handleSelect = (key:any) => {
  if (key === 'logout') {
    removeLocalStorage('token')
    router.push('/main')
  }
}
</script>

<template>
   <n-dropdown :options="options" @select="handleSelect">
    <n-button>{{store.userInfo.name}}</n-button>
  </n-dropdown>
</template>

<style scoped >

</style>
