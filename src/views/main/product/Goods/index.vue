
<script lang='ts' setup >
import { NImage } from 'naive-ui'
import { computed, h, ref, watch } from 'vue'
import FilterPanel from '../../../../components/FilterPanel/index.vue'
import TablePanel from '../../../../components/TablePanel/index.vue'
import { useSystemStore } from '../../../../store/system'
import { dateFormat } from '../../../../utils/dateformat'
const store = useSystemStore()

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
const initialState: any = {
  id: undefined,
  name: undefined,
  realname: undefined,
  cellphone: undefined,
  enable: undefined,
  createAt: undefined
}
const formModel: any = ref({ ...initialState })

const tableColumns:any = [
  {
    title: '商品名称',
    key: 'name',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '原价格',
    key: 'oldPrice'
  },
  {
    title: '现价格',
    key: 'newPrice'
  },
  {
    title: '商品图片',
    key: 'imgUrl',
    render (row:any) {
      return h(
        NImage,
        {
          src: row.imgUrl,
          lazy: true,
          width: '100',
          height: '50'
        }

      )
    }
  },
  {
    title: '状态',
    key: 'status'
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

const getPageData = (queryInfo:any = {}) => {
  store.getPageListAction({
    name: 'goods',
    url: '/goods/list',
    queryInfo: {
      offset: (pageInfo.value.currentPage === 0 ? 0 : (pageInfo.value.currentPage - 1)) * pageInfo.value.pageSize,
      size: pageInfo.value?.pageSize,
      ...queryInfo
    }
  })
}

const data = computed(() => {
  return store.goodsList
})
const pageInfo = ref({
  currentPage: 0,
  pageSize: 10
})
watch(pageInfo, () => {
  getPageData()
})
const goodsCount = computed(() => {
  return store.goodsCount
})
const handleReset = () => {
  for (const key in initialState) {
    formModel.value[key] = initialState[key]
  }
  getPageData()
}

const handleSearchClick = () => {
  getPageData(formModel.value)
}
getPageData()
</script>

<template>
<FilterPanel :formOptions="formOptions" v-model="formModel">
<template #action>

        <n-button round  @click="handleSearchClick" >
        搜索
      </n-button>
      <n-button round @click="handleReset">
        重置
      </n-button>
</template>
</FilterPanel>
<tablePanel class="h-full" v-model:pageInfo="pageInfo"  :tableColumns="tableColumns" :data='data' :userCount="goodsCount"></tablePanel>

</template>

<style scoped >

</style>
