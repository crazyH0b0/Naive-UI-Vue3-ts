<script lang="ts" setup>
import LoginPanel from './LoginPanel.vue'
import RegisterPanel from './RegisterPanel.vue'

// import { ref } from 'vue'
// import { Loginrules } from '../config/account-config'
// interface ModelType {
//   username: string | null
//   password: string | null
//   reenteredPassword: string | null
// }
// const model = ref<ModelType>({
//   username: null,
//   password: null,
//   reenteredPassword: null
// })
// const rules = ref(Loginrules)
</script>
<template>
<div class="flex flex-col items-center">
  <div class="text-2xl mb-3">后台管理系统</div>
  <n-card>
    <n-tabs
      class="card-tabs"
      default-value="signin"
      size="large"
      animated
      style="margin: 0 -4px"
      pane-style="padding-left: 20px; padding-right: 20px; box-sizing: border-box;"
 pane-class="login-panel"
    >
      <n-tab-pane name="signin" tab="登录">
        <LoginPanel></LoginPanel>
      </n-tab-pane>
      <n-tab-pane name="signup" tab="注册">
        <RegisterPanel></RegisterPanel>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</div>
</template>

<style scoped>
.login-panel{
  width: 300px;
}
</style>
