<script lang="ts" setup>

import { onMounted, ref } from 'vue'
import { Loginrules } from '../config/account-config'
import { useUserStore } from '../../../store/user'
import { IAccount } from '../../../api/modules/login/types'
import { useRouter } from 'vue-router'
import {
  FormInst
} from 'naive-ui'
// interface ModelType {
//   name: string | null
//   password: string | null
//   isSavePassword?:boolean | null
// }
const router = useRouter()
const store = useUserStore()
const model = ref<IAccount>({
  name: null,
  password: null,
  isSavePassword: false
})
const rules = ref(Loginrules)

const formRef = ref<FormInst | null>(null)
const handleValidateButtonClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      store.accountLoginAction({ ...model.value }).then(res => {
        router.push('/main')
      }).catch(err => {
        console.log(err)
      })
    }
  }).catch(err => {
    console.log(err)
  })
}

onMounted(() => {
  const account = store.account
  if (account.isSavePassword) {
    model.value = account
  }
})
</script>
<template>

        <n-form  ref="formRef" :model="model"  :rules="rules">
          <n-form-item-row path="name" label="用户名">
            <n-input  v-model:value="model.name"   />
          </n-form-item-row>
          <n-form-item-row label="密码" path="password">
            <n-input v-model:value="model.password"/>
          </n-form-item-row>

        <n-checkbox v-model:checked="model.isSavePassword" >
      记住密码
    </n-checkbox>
        </n-form>

        <n-button type="primary" block secondary strong @click="handleValidateButtonClick">
          登录
        </n-button>
</template>

<style scoped>

</style>
