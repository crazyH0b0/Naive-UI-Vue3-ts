<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import './utils/axios'
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import MessageApi from './components/message-api.vue'
import loadingApi from './components/loading-api.vue'
import dialogApi from './components/dialog-api.vue'
import { NMessageProvider, NLoadingBarProvider } from 'naive-ui'
// import { useSystemStore } from './store/system'
// const store = useSystemStore()
// store.getInitalData()
</script>

<template>
<n-dialog-provider>
<dialogApi></dialogApi>
</n-dialog-provider>

 <n-message-provider>
    <MessageApi />
  </n-message-provider>
<n-loading-bar-provider>
  <loadingApi />
</n-loading-bar-provider>
  <router-view></router-view>

</template>

<style scoped>
.app{
  height: 100%;
}
</style>
