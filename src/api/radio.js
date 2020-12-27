import request from '@/utils/request'

export function getBanner(params) {
  return request({
    url: '/dj/banner',
    method: 'get' ,
    params
  })
}
export function radioItem(params) { // 电台分类
  return request({
    url: '/dj/catelist',
    method: 'get' ,
    params
  })
}