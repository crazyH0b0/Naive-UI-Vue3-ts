import { defineStore } from 'pinia'
import api from './../api/index'
export const useSystemStore = defineStore('systemStore', {
  state: () => {
    return {
      userList: [] as any,
      userCount: 0,
      roleList: [] as any,
      roleCount: 0,
      goodsList: [] as any,
      goodsCount: 0,
      menuList: [] as any,
      menuCount: 0,
      currentPayload: null,
      departmentList: [] as any,
      roleSelectList: [] as any,
      allMenuList: [] as any
    }
  },
  actions: {
    async   getPageListAction (payload:any) {
      if (payload.name === 'user' || payload.name === 'users') {
        this.currentPayload = payload
        const res = await api.getPageListData(payload.url, payload.queryInfo)
        const { list, totalCount } = res.data
        this.userList = list
        this.userCount = totalCount
      } else if (payload.name === 'role') {
        this.currentPayload = payload

        const res = await api.getPageListData(payload.url, payload.queryInfo)
        const { list, totalCount } = res.data
        this.roleList = list
        this.roleCount = totalCount
      } else if (payload.name === 'goods') {
        this.currentPayload = payload
        const res = await api.getPageListData(payload.url, payload.queryInfo)
        const { list, totalCount } = res.data
        this.goodsList = list
        this.goodsCount = totalCount
      } else if (payload.name === 'menu') {
        this.currentPayload = payload
        const res = await api.getPageListData(payload.url, payload.queryInfo)
        const { list, totalCount } = res.data
        this.menuList = list
        this.menuCount = totalCount
      } else if (payload.name === 'menu') {
        this.currentPayload = payload
        const res = await api.getPageListData(payload.url, payload.queryInfo)
        const { list, totalCount } = res.data
        this.menuList = list
        this.menuCount = totalCount
      }
    },
    async deletePageDataAction (payload:any) {
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await api.deletePageData(pageUrl)
      await this.getPageListAction(this.currentPayload)
    },
    async getInitalData () {
      const departmentRes = await api.getPageListData('/department/list', { offset: 0, size: 1000 })
      const roleSelectRes = await api.getPageListData('/role/list', { offset: 0, size: 1000 })
      const allMenuList = await api.getPageListData('/menu/list', { })
      this.allMenuList = allMenuList.data.list
      this.departmentList = departmentRes.data.list
      this.roleSelectList = roleSelectRes.data.list
    },
    async createPageDataAction (payload:any) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await api.createPageData(pageUrl, newData)
      this.getPageListAction({ name: pageName, url: `/${pageName}/list`, queryInfo: { offset: 0, size: 1000 } } as any)
    },
    async editPageDataAction (payload:any) {
      const { pageName, newData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await api.editPageData(pageUrl, newData)
      this.getPageListAction({ name: pageName, url: `/${pageName}/list`, queryInfo: { offset: 0, size: 1000 } } as any)
    }
  }
})
