import request from '@/utils/request'

export function list(params) {
  return request({
    url: '/album/list',
    method: 'get' ,
    params
  })
}