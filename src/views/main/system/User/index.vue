<script lang="ts" setup>
import { usePageModal } from '../../../../hooks/usePageModal'
import { computed, ref, watch } from 'vue'
import { dateFormat } from '../../../../utils/dateformat'
import FilterPanel from '../../../../components/FilterPanel/index.vue'
import { NButton } from 'naive-ui'
import { useSystemStore } from '../../../../store/system'
import TablePanel from '../../../../components/TablePanel/index.vue'
import { usePermisson } from '../../../../hooks/usePermissons'
import Modal from '../../../../components/Modal/index.vue'
const editCallFn = () => {
  const passwordItem = modalOptions.find((item:any) => item.field === 'password')
  passwordItem.isHidden = true
}
const newCallFn = () => {
  const passwordItem = modalOptions.find((item:any) => item.field === 'password')
  passwordItem.isHidden = false
}
const [defaultInfo, modalRef, handleNewBtnClick, handleEditBtnClick] = usePageModal(newCallFn, editCallFn)
const formOptions:any = [
  {
    field: 'id',
    type: 'input',
    label: 'id'
  },
  {
    field: 'name',
    type: 'input',
    label: '用户名'
  },
  {
    field: 'realname',
    type: 'input',
    label: '真实姓名'
  },

  {
    field: 'cellphone',
    type: 'input',
    label: '电话号码'

  },
  {
    field: 'enable',
    type: 'input',
    label: '用户状态'

  },
  {
    field: 'createAt',
    type: 'datepicker',
    label: '创建时间'

  }
]
const modalOptions:any = [
  {
    field: 'name',
    type: 'input',
    label: '用户名'
  },
  {
    field: 'realname',
    type: 'input',
    label: '真实姓名'
  },
  {
    field: 'password',
    type: 'input',
    label: '密码'
  },

  {
    field: 'cellphone',
    type: 'input',
    label: '电话号码'

  },
  {
    field: 'departmentId',
    type: 'select',
    label: '选择部门',
    options: [

    ]
  },
  {
    field: 'roleId',
    type: 'select',
    label: '选择角色',
    options: []
  }
]

const isCreate = usePermisson('users', 'create')
const isUpdate = usePermisson('users', 'update')
const isDelete = usePermisson('users', 'delete')
const isQuery = usePermisson('users', 'query')
const initialState: any = {
  id: undefined,
  name: undefined,
  realname: undefined,
  cellphone: undefined,
  enable: undefined,
  createAt: undefined
}
const formModel: any = ref({ ...initialState })
// const modalRef:any = ref(null)

let data:any = null
const store = useSystemStore()

const modalConfigRef:any = computed(() => {
  const deptItem = modalOptions.find((item:any) => item.field === 'departmentId')
  deptItem.options = store.departmentList.map((item:any) => {
    return {
      label: item.name,
      value: item.id
    }
  })

  const roleItem = modalOptions.find((item:any) => item.field === 'roleId')
  roleItem.options = store.roleSelectList.map((item:any) => {
    return {
      label: item.name,
      value: item.id
    }
  })
  return modalOptions
})

// const defaultInfo = ref({})
const tableColumns:any = [
  {
    title: '电话',
    key: 'cellphone'
  },
  {
    title: '创建时间',
    key: 'createAt',
    render: (_:any) => {
      return dateFormat(_.createAt)
    }
  },
  {
    title: '部门Id',
    key: 'departmentId'
  },
  {
    title: '是否禁用',
    key: 'enable'
  },
  {
    title: 'id',
    key: 'id'
  },
  {
    title: '昵称',
    key: 'name'
  },
  {
    title: '名字',
    key: 'realname'
  },
  {
    title: '角色id',
    key: 'roleId'
  },
  {
    title: '更新时间',
    key: 'updateAt',
    render: (_:any) => {
      return dateFormat(_.updateAt)
    }
  }
]

data = computed(() => {
  return store.userList
})
const handleReset = () => {
  for (const key in initialState) {
    formModel.value[key] = initialState[key]
  }
  getPageData()
}
// (pageInfo.value.currentPage === 1 ? 0 : (pageInfo.value.currentPage - 1))
const getPageData = (queryInfo:any = {}) => {
  if (!isQuery) return
  store.getPageListAction({
    name: 'user',
    url: '/users/list',
    queryInfo: {
      offset: (pageInfo.value.currentPage === 0 ? 0 : (pageInfo.value.currentPage - 1)) * pageInfo.value.pageSize,
      size: pageInfo.value?.pageSize,
      ...queryInfo
    }
  })
}
const handleSearchClick = () => {
  getPageData(formModel.value)
}
const userCount = computed(() => {
  return store.userCount
})

const pageInfo = ref({
  currentPage: 0,
  pageSize: 10
})
watch(pageInfo, () => {
  getPageData()
})
getPageData()
// const handleNewBtnClick = () => {
//   modalRef.value.showModal = true
// }
// const handleEditBtnCLick = (user:any) => {
//   modalRef.value.showModal = true
//   defaultInfo.value = { ...user }
// }
// const userList = computed(() => store.userList)
// const userCount = computed(() => store.userCount)
</script>
<template>

<FilterPanel :formOptions="formOptions" v-model="formModel">
<template #action>

        <n-button round class="" @click="handleSearchClick" :disabled="isQuery" >
        搜索
      </n-button>
      <n-button round class="" @click="handleReset" :disabled="true">
        重置
      </n-button>
</template>
</FilterPanel>
<Modal :formOptions="modalConfigRef" :defaultInfo="defaultInfo" ref="modalRef" pageName="users"></Modal>
<TablePanel @addBtnClick="handleNewBtnClick" @editBtnClick="handleEditBtnClick" :formOptions="modalOptions" pageName="users" v-model:pageInfo="pageInfo"  :tableColumns="tableColumns" :data='data' :userCount="userCount" ></TablePanel>
</template>
