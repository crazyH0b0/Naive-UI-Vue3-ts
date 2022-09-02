import { IAccount, ILoginResData, ILoginRes } from './types'
import request from '../../../utils/axios'

export const accountLogin = (account:IAccount) => {
  return request<ILoginRes<ILoginResData>>({
    url: '/login',
    method: 'post',
    data: account
  })
}

export const userInfoById = (id:number) => {
  return request({
    url: '/users/' + id,
    method: 'get'
  })
}

export const reqUserMenuById = (id:number) => {
  return request<ILoginRes>({
    url: '/role/1/menu',
    method: 'get'
  })
}
