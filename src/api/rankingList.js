import request from '@/utils/request'

export function toplist(params) {
  return request({
    url: '/toplist/detail',
    method: 'get' ,
    params
  })
}