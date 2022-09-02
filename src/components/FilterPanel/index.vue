
<script lang="ts" setup>
import { PropType, ref, watch } from 'vue'
import { FormInst } from 'naive-ui'
import { IFormItem } from './types'

const formRef:any = ref(null)
const props = defineProps(
  {
    modelValue: {
      type: Object,
      require: true
    },
    formOptions: {
      type: Array as PropType<IFormItem[]>
    }
  })
const formData = ref({ ...props.modelValue })
const emit = defineEmits(['update:modelValue'])
watch(formData, (newValue) => {
  emit('update:modelValue', newValue)
},
{
  deep: true
})

</script>

<template>
  <n-card size="small">

    <n-form ref="formRef"  :model="formOptions" size="small" label-placement="left"
      class="grid grid-cols-4  gap-5 justify-between">
      <n-form-item v-for="(item,index) in formOptions " :key="index" :label="item.label" path="item.name">
          <n-input v-if="item.type==='input'"  v-model:value="formData[item.field]" />
            <n-select
            v-else-if="item.type==='select'"
          :options="item.options"
          v-model:value="formData[item.field]"
        />

    <n-date-picker
    v-else-if="item.type==='datepicker'"
      update-value-on-close
      type="datetimerange"
      :actions="['clear']"
      v-model:value="formData[item.field]"
    />
      </n-form-item>

    </n-form>
          <div class="flex justify-center gap-5">
                <slot name="action">

      </slot>
        </div>

  </n-card>

</template>

<style scoped >
.n-form-item-blank {
  width: 20px !important;
}
</style>
