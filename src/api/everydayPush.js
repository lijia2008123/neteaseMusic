import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/recommend/songs',
    method: 'get' ,
    params
  })
}