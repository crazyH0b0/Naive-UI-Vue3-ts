import request from '../../../utils/axios'
import { IRes } from '../../types'
import { ISystemResData } from './types'

export function getPageListData (url:string, queryInfo:any) {
  return request<IRes<ISystemResData>>({
    url,
    method: 'post',
    data: queryInfo
  })
}

export function deletePageData (url:string) {
  return request<IRes<ISystemResData>>({
    url,
    method: 'delete'
  })
}

export function createPageData (url:string, newData:any) {
  return request<IRes<ISystemResData>>({
    url,
    method: 'post',
    data: newData
  })
}

export function editPageData (url:string, newData:any) {
  return request<IRes<ISystemResData>>({
    url,
    method: 'patch',
    data: newData
  })
}
