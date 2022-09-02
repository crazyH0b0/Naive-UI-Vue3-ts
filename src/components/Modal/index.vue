<script lang='ts' setup >import { ref, watch } from 'vue'
import { useSystemStore } from '../../store/system'
const store = useSystemStore()
const formData:any = ref({})
const showModal = ref(false)
defineExpose({
  showModal
})
const props:any = defineProps({
  formOptions: {
    type: Object,
    default: () => {}
  },
  title: {
    type: String
  },
  defaultInfo: {
    type: Object,
    default: () => {}
  },
  pageName: {
    type: String
  },
  otherInfo: {
    type: Object,
    default: () => {}

  }

})

watch(() => props.defaultInfo, (newValue) => {
  for (const item of props.formOptions) {
    formData.value[item.field] = newValue[item.field] + ''
  }
}, {
  deep: true
})

const handleConfirm = () => {
  if (Object.keys(props.defaultInfo).length) {
    store.editPageDataAction({
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id
    })
  } else {
    store.createPageDataAction({
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo }

    })
  }
  showModal.value = false
}

</script>

<template>

<n-modal  v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="新建用户"
    content="你确认"

 >
    <n-card
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >

    <n-form ref="formRef"  :model="formOptions" size="small" label-placement="left" label-width="80px">
<template v-for="(item,index) in formOptions" :key="index">
  <n-form-item  v-if="!item.isHidden"  :label="item.label" path="item.name">
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
</template>

<slot name="tree"></slot>
    </n-form>
    <template #action>
 <div class="flex justify-around">
  <n-button type="tertiary" @click="handleConfirm">
      确定
    </n-button>
    <n-button type="tertiary" class="text-black-400">
      取消
    </n-button>
 </div>
    </template>
    </n-card>
  </n-modal>
</template>

<style scoped >

</style>
