import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { useUserStore } from '../store/user'
const service = axios.create({
  baseURL: '/api', // Set base url
  timeout: 10000 // Set timeout
})

// const store = useUserStore() as any

// Request interceptors
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Remove repeat request
    removePending(config)
    // Add pending
    addPending(config)
    // Request with token

    const { token } = useUserStore()
    // @ts-ignore
    config.headers.authorization = token
    if (config.showLoading) {
      window.$loadingBar?.start()
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  async (response: AxiosResponse) => {
    // Remove pending
    removePending(response.config)

    // Only return data
    window.$loadingBar?.finish()

    return response.data
  },
  (error) => {
    const { status } = error.response
    if (status === 400) {
      window.$message.error('验证失败')
    }
    error.config && removePending(error.config)
    return Promise.reject(error)
  }
)

export default service

const pendingMap = new Map()

/**
 * Create a key for pendingMap
 * @param {*} config
 * @returns
 */
function getPendingKey (config: AxiosRequestConfig): {} {
  const { url, method, params, data } = config
  let _data = data
  if (typeof data === 'string') {
    _data = JSON.parse(data)
  }
  return [url, method, JSON.stringify(params), JSON.stringify(_data)].join('&')
}

/**
 * Save the cancel callback of each request
 * @param {*} config
 */
function addPending (config: AxiosRequestConfig): void {
  const pendingKey = getPendingKey(config)
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (pendingMap.has(pendingKey)) {
      pendingMap.set(pendingKey, cancel)
    }
  })
}

/**
 * Delete repeat request
 * @param {*} config
 */
function removePending (config: AxiosRequestConfig): void {
  const pendingKey = getPendingKey(config)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    cancelToken(pendingKey)
    pendingMap.delete(pendingKey)
  }
}
