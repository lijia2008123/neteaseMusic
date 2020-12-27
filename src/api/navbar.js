import request from '@/utils/request'

export function signin(params) {
  return request({
    url: '/daily_signin',
    method: 'get',
    params
  })
}

export function privateMsg(params) {
  return request({
    url: '/msg/private',
    method: 'get',
    params
  })
}