import request from '@/utils/request'

export function banner(params) {
  return request({
    url: '/banner?type=2',
    method: 'get' ,
    params
  })
}
export function ball(params) {
  return request({
    url: '/homepage/dragon/ball',
    method: 'get' ,
    params
  })
}
export function personalized(params) {
  return request({
    url: '/personalized',
    method: 'get' ,
    params
  })
}
export function newsong(params) {
  return request({
    url: '/personalized/newsong',
    method: 'get' ,
    params
  })
}