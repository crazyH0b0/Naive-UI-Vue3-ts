<script lang="ts" setup>
import { ref } from 'vue'
import { Registerrules } from '../config/account-config'
import {
  FormInst
} from 'naive-ui'
interface ModelType {
  username: string | null
  password: string | null
  reenteredPassword: string | null
}
const model = ref<ModelType>({
  username: null,
  password: null,
  reenteredPassword: null
})
const formRef = ref<FormInst | null>(null)

const rules = ref(Registerrules)
const handleValidateButtonClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      window.$message.success('注册成功')
      // message.success('验证成功')
    } else {
      window.$message.error('注册失败')

      // message.error('验证失败')
    }
  })
}

</script>
<template>
        <n-form  ref="formRef" :model="model"  :rules="rules">
          <n-form-item-row path="username" label="用户名">
            <n-input  v-model:value="model.username"   />
          </n-form-item-row>
          <n-form-item-row label="密码" path="password">
            <n-input v-model:value="model.password"/>
          </n-form-item-row>
                    <n-form-item-row label="重复密码" path="reenteredPassword">
            <n-input v-model:value="model.reenteredPassword"/>
          </n-form-item-row>
        </n-form>
        <n-button type="primary" block secondary strong @click="handleValidateButtonClick">
          注册
        </n-button>
</template>

<style scoped>

</style>
