
<script lang='ts' setup >

import { computed } from 'vue'
import { useDashbordStore } from '../../../../store/dashboard'
import Charts from '../../../../components/Charts/index.vue'
const store = useDashbordStore()
store.getDashbordDataAction()

const categoryGoodsCount = computed(() => {
  return store.categoryGoodsCount.map((item: any) => {
    return {
      name: item.name,
      value: item.goodsCount
    }
  })
})

const options:any = computed(() => {
  return {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: categoryGoodsCount,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})

</script>

<template>
  <div class="grid grid-cols-3 grid-rows-1 ">
    <div>
      <n-card title="卡片插槽示例">
<!-- <Charts ></Charts> -->
   <!-- <Charts :option="options" ></Charts> -->
  </n-card>
    </div>
    <div>
      <n-card title="卡片插槽示例">
    卡片内容
  </n-card>
    </div>
    <div>
      <n-card title="卡片插槽示例">
    卡片内容
  </n-card>
    </div>
  </div>

  <div class="grid grid-cols-2 ">
    <div class="bg-pink-400">1</div>
    <div class="bg-red-200">2</div>

  </div>
</template>

<style scoped >

</style>
