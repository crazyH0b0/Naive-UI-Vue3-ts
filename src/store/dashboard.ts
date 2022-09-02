import { defineStore } from 'pinia'
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../utils/localStoregeUtil'
import api from './../api/index'
export const useDashbordStore = defineStore('dashbordStore', {
  state: () => {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []

    }
  },
  actions: {
    async   getDashbordDataAction () {
      const categoryCountRes = await api.getCategoryGoodsCount()
      const categoryGoodsSaleRes = await api.getCategoryGoodsSale()
      const categoryGoodsFavorRes = await api.getCategoryGoodsFavor()
      const addressGoodsSaleRes = await api.getAddressGoodsSale()
      this.categoryGoodsCount = categoryCountRes.data
      this.categoryGoodsSale = categoryGoodsSaleRes.data
      this.categoryGoodsFavor = categoryGoodsFavorRes.data
      this.addressGoodsSale = addressGoodsSaleRes.data
    }
  },
  getters: {

  }
})
