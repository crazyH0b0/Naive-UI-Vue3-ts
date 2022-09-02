import { defineStore } from 'pinia'
import { setLocalStorage, getLocalStorage, removeLocalStorage } from '../utils/localStoregeUtil'
import { IAccount } from '../api/modules/login/types'
import api from './../api/index'
import { mapMenuRoutes, mapMenusToPermissons } from '../utils/map-menus'
import { useSystemStore } from './system'
export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      // token: '',
      // userInfo: JSON.parse(getLocalStorage('userInfo') as any) || {},
      // account: JSON.parse(getLocalStorage('account') as any) || {},
      // userMenu: JSON.parse(getLocalStorage('userMenu') as any) || {}
      token: getLocalStorage('token') || '',
      userInfo: JSON.parse(getLocalStorage('userInfo') as any) || {},
      account: JSON.parse(getLocalStorage('account') as any) || {},
      userMenu: JSON.parse(getLocalStorage('userMenu') as any) || {},
      permissons: []
    }
  },
  actions: {
    async   accountLoginAction (payLoad: IAccount) {
      try {
        const res = await api.accountLogin(payLoad)
        const { id, token } = res.data
        setLocalStorage('token', token)
        this.token = token
        const store = useSystemStore()
        store.getInitalData()
        const userInfo = await api.userInfoById(id)
        setLocalStorage('userInfo', JSON.stringify(userInfo.data))
        this.userInfo = userInfo.data
        const menu = await api.reqUserMenuById(userInfo.data.role.id)
        this.userMenu = menu.data
        setLocalStorage('userMenu', JSON.stringify(this.userMenu))
        const routes = mapMenuRoutes(this.userMenu)
        routes.forEach((route) => {
          this.router.addRoute('main', route)
        })

        if (!payLoad.isSavePassword) {
          removeLocalStorage('account')
        } else {
          setLocalStorage('account', JSON.stringify(payLoad))
        }
      } catch (error) {
        throw new Error('报错了')
      }
    },
    getMapRoutes () {
      const routes = mapMenuRoutes(this.userMenu)
      routes.forEach((route) => {
        this.router.addRoute('main', route)
      })
      const permissions = mapMenusToPermissons(this.userMenu)
      this.permissons = permissions as any
      const store = useSystemStore()
      store.getInitalData()
    }
  },
  getters: {

  }
})
