
<script lang='ts' setup >
import { randomUUID } from 'crypto'
import { computed, ref, watch } from 'vue'
import tablePanel from '../../../../components/TablePanel/index.vue'
import { useSystemStore } from '../../../../store/system'
import { dateFormat } from '../../../../utils/dateformat'

const store = useSystemStore()
const tableColumns:any = [
  {
    title: '菜单名称',
    key: 'name'
  },
  {
    title: '类型',
    key: 'type'
  },
  {
    title: '菜单url',
    key: 'url'
  }, {
    title: '菜单icon',
    key: 'icon'
  },
  {
    title: '按钮权限',
    key: 'permission'
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
// 表格展开的处理
const data = computed(() => {
  const menus = store.menuList.map((item:any) => {
    if (item.children) {
      item.children.forEach((element:any) => {
        element.key = element.id
      })
    }

    return {
      ...item,
      key: item.id + Math.random()
    }
  })
  return menus
})
const pageInfo = ref({
  currentPage: 0,
  pageSize: 10
})
const getPageData = (queryInfo:any = {}) => {
  store.getPageListAction({
    name: 'menu',
    url: '/menu/list',
    queryInfo: {
      offset: (pageInfo.value.currentPage === 0 ? 0 : (pageInfo.value.currentPage - 1)) * pageInfo.value.pageSize,
      size: pageInfo.value?.pageSize,
      ...queryInfo
    }
  })
}
const menuCount = computed(() => {
  return store.menuCount
})
watch(pageInfo, () => {
  getPageData()
})
getPageData()
</script>

<template>
  <tablePanel pageName="menu"  class="h-full" v-model:pageInfo="pageInfo" :showIndex="false"  :tableColumns="tableColumns" :data='data' :userCount="menuCount"></tablePanel>

</template>

<style scoped >

</style>
