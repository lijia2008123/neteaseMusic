import request from '@/utils/request'

export function getDetail(params) {
  return request({
    url: '/dj/banner',
    method: 'get' ,
    params
  })
}
