<script lang='ts' setup >
import { h, ref } from 'vue'
import { NButton } from 'naive-ui'
import { useSystemStore } from '../../store/system'
const emit = defineEmits(['update:pageInfo', 'addBtnClick', 'editBtnClick'])
const store = useSystemStore()
const props = defineProps({
  pageName: {
    type: String,
    default: ''
  },
  showIndex: {
    type: Boolean,
    default: true
  },
  data: {
    type: Array,
    default: () => []
  },
  tableColumns: {
    type: Array,
    default: () => []
  },
  userCount: {
    type: Number,
    default: () => undefined
  },
  pageInfo: {
    type: Object,
    default: () => ({
      currentPage: 0,
      pageSize: 10
    })
  },
  formOptions: {
    type: Array
  }

})

// const isCreate = usePermisson(props.pageName, 'create')
// const isUpdate = usePermisson(props.pageName, 'update')
// const isDelete = usePermisson(props.pageName, 'delete')
// const isQuery = usePermisson(props.pageName, 'query')
const page = ref(1)
const pagesize = ref(10)

const createColumns = ({ deleteRow, editRow }:any): any => {
  if (props.showIndex === true) {
    return [

      {
        title: '序号',
        key: 'key',
        render: (_:any, index:any) => {
          return `${index + 1}`
        }
      },
      ...props.tableColumns,
      {
        title: '操作',
        key: 'action',
        render (row:any) {
          return [
            h(
              NButton,
              {
                style: {
                  marginRight: '6px'
                },
                size: 'small',
                onClick: () => editRow(row)
              },
              {
                default: () => '编辑'
              }
            ),
            h(
              NButton,
              {
                size: 'small',
                onClick: () => deleteRow(row)
              },
              {
                default: () => '删除'
              }
            )

          ]
        }

      }

    ]
  } else {
    return [

      ...props.tableColumns,
      {
        title: '操作',
        key: 'action',
        render (row:any) {
          return [
            h(
              NButton,
              {
                style: {
                  marginRight: '6px'
                },
                size: 'small',
                onClick: () => editRow(row)
              },
              {
                default: () => '编辑'
              }
            ),
            h(
              NButton,
              {
                size: 'small',
                onClick: () => deleteRow(row)
              },
              {
                default: () => '删除'
              }
            )

          ]
        }

      }

    ]
  }
}

const columns = createColumns({
  deleteRow (rowData:any) {
    store.deletePageDataAction({ pageName: props.pageName, id: rowData.id })
  },
  editRow (rowData:any) {
    emit('editBtnClick', rowData)
  }
})

const handlePageChange = (currentPage:any) => {
  page.value = currentPage
  emit('update:pageInfo', { ...props.pageInfo, currentPage })
}
const handlePagesizeChange = (pageSize:any) => {
  pagesize.value = pageSize

  emit('update:pageInfo', { ...props.pageInfo, pageSize })
}
const handleAddUser = async () => {
  emit('addBtnClick')
}

</script>

<template>
  <n-card content-style="padding:10px;box-sizing:border-box;"  pane-style="padding: 20px;">
    <div class="flex justify-between">

      <n-button class="mb-3" @click="handleAddUser">新增用户</n-button>

    </div>
      <n-data-table
    :columns="columns"
    :data="data"
    :bordered="true"
    :single-line="false"
     :max-height="360"
  />
<div class="flex flex-row-reverse ">

  <n-pagination
  v-model:page="page"
  v-model:page-size="pagesize"
  show-size-picker
  :page-sizes="[5, 10, 30, 40]"
  :item-count="userCount"

:on-update:page-size="handlePagesizeChange"
:on-update:page="handlePageChange"
>
   <template #prefix="{itemCount}">
      共 {{ itemCount }}条
    </template>
</n-pagination>
</div>
  </n-card>

</template>

<style scoped >

</style>
