import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ZrequestInterceptors{
  requestInterceptor?:(config:AxiosRequestConfig)=>AxiosRequestConfig
  requestInterceptorCatch?:(error:any)=>any
  responseInterceptor?:(res:AxiosResponse)=>AxiosResponse
  responseInterceptorCatch?:(error:any)=>any
}
export interface ZrequestConfig extends AxiosRequestConfig{
  interceptors:ZrequestInterceptors
}
