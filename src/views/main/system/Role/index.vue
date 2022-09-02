<script lang='ts' setup >
import tablePanel from '../../../../components/TablePanel/index.vue'
import filterPane from '../../../../components/FilterPanel/index.vue'
import { useSystemStore } from '../../../../store/system'
import { dateFormat } from '../../../../utils/dateformat'
import { computed, ref, watch, toRaw } from 'vue'
import Modal from '../../../../components/Modal/index.vue'
import { usePageModal } from '../../../../hooks/usePageModal'
import { getMenuLeafKeys } from '../../../../utils/map-menus'
const store = useSystemStore()
const menus = computed(() => store.allMenuList)
const formOptions:any = [
  {
    field: 'name',
    type: 'input',
    label: '角色名称'
  },
  {
    field: 'permission',
    type: 'input',
    label: '权限介绍'
  },

  {
    field: 'range',
    type: 'datepicker',
    label: '选择日期'

  }
]
const initialState: any = {
  name: undefined,
  permission: undefined,
  range: undefined
}
const formModel: any = ref({ ...initialState })

const tableColumns:any = [
  {
    title: '昵称',
    key: 'name'
  },
  {
    title: 'id',
    key: 'id'
  },
  {
    title: '创建时间',
    key: 'createAt',
    render: (_:any) => {
      return dateFormat(_.createAt)
    }
  },

  {
    title: '更新时间',
    key: 'updateAt',
    render: (_:any) => {
      return dateFormat(_.updateAt)
    }
  }
]

store.getPageListAction({
  name: 'role',
  url: '/role/list',
  queryInfo: {
    offset: 0,
    size: 100
  }
})
const data = computed(() => {
  return store.roleList
})
const pageInfo = ref({
  currentPage: 0,
  pageSize: 10
})
const getPageData = (queryInfo:any = {}) => {
  store.getPageListAction({
    name: 'role',
    url: '/role/list',
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
const handleReset = () => {
  for (const key in initialState) {
    formModel.value[key] = initialState[key]
  }
  getPageData()
}
const roleCount = computed(() => {
  return store.roleCount
})
watch(pageInfo, () => {
  getPageData()
})

const checkedKeys:any = ref([])
const editCallFn = (item:any) => {
  const leafKeys = getMenuLeafKeys(item.menuList)
  checkedKeys.value = leafKeys
}
const [defaultInfo, modalRef, handleNewBtnClick, handleEditBtnClick] = usePageModal(undefined, editCallFn)
const modalOptions:any = [
  {
    field: 'name',
    type: 'input',
    label: '角色名称'
  },
  {
    field: 'permission',
    type: 'input',
    label: '权限介绍'
  }

]

function traversalTree (arrs:any, that:any):any {
  return arrs.map((item:any, index:any) => {
    that.push({
      key: item.id,
      label: item.name
    })
    if (item.children) {
      that[index].children = []
      traversalTree(item.children, that[index].children)
    }
  })
}

const aa = computed(() => {
  const rawMenus = toRaw(menus.value)
  const arr:any = []
  traversalTree(rawMenus, arr)
  // return rawMenus.map((item:any, index:any) => {
  //   const key = '' + item.id + index
  //   return {
  //     label: item.name,
  //     key
  //     // children: item.children.map((child:any) => {
  //     //   return {
  //     //     label: child.name,
  //     //     key: child.id,
  //     //     children: child.children.map((child1:any) => {
  //     //       return {
  //     //         label: child1.name,
  //     //         key: child1.id
  //     //       }
  //     //     })
  //     //   }
  //     // })
  //   }
  // })
  return arr
})

const otherInfo = ref({})
// const nodeProps = ({ option }: { option:any }) => {
//   return {
//     onClick () {
//       console.log(option)
//     }
//   }
// }

const updateCheckedKeys = (keys:any) => {
  otherInfo.value = { menuList: keys }
}
</script>

<template>
<filterPane :formOptions="formOptions" v-model="formModel">
<template #action>

        <n-button round  @click="handleSearchClick" >
        搜索
      </n-button>
      <n-button round @click="handleReset">
        重置
      </n-button>
</template>
</filterPane>
  <tablePanel @addBtnClick="handleNewBtnClick" @editBtnClick="handleEditBtnClick"  pageName="role" class="h-full" v-model:pageInfo="pageInfo"  :tableColumns="tableColumns" :data='data' :userCount="roleCount"></tablePanel>
  <Modal :otherInfo="otherInfo" :formOptions="modalOptions" :defaultInfo="defaultInfo" ref="modalRef" pageName="role">
    <template #tree>
      <n-tree
    block-line
    cascade
    checkable
    :data="aa"
    @update:checked-keys="updateCheckedKeys"
    :default-checked-keys="checkedKeys"
  />
    </template>
  </Modal>

</template>

<style scoped >

</style>
