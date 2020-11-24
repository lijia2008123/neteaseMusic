import request from '@/utils/request'

export function getBanner(params) {
  return request({
    url: '/dj/banner',
    method: 'get' ,
    params
  })
}