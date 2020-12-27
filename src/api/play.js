import request from '@/utils/request'

export function like(params) {
  return request({
    url: '/like',
    method: 'get',
    params
  })
}

export function likelist(params) {
  return request({
    url: '/likelist',
    method: 'get',
    params
  })
}