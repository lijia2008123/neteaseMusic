import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/msg/private',
    method: 'get' ,
    params
  })
}