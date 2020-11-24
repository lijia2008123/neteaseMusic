import request from '@/utils/request'

export function comment(params) {
  return request({
    url: '/comment/new',
    method: 'get' ,
    params
  })
}
export function commentLike(params) {
  return request({
    url: '/comment/like',
    method: 'get' ,
    params
  })
}
export function commentFloor(params) {
  return request({
    url: '/comment/floor',
    method: 'get' ,
    params
  })
}