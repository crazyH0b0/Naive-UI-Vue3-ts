import request from '../../../utils/axios'

export function getCategoryGoodsCount () {
  return request({
    url: '/goods/category/count',
    method: 'get'
  })
}

export function getCategoryGoodsSale () {
  return request({
    url: '/goods/category/sale',
    method: 'get'
  })
}

export function getCategoryGoodsFavor () {
  return request({
    url: '/goods/category/favor',
    method: 'get'

  })
}

export function getAddressGoodsSale () {
  return request({
    url: '/goods/address/sale',
    method: 'get'

  })
}
