import request from '@/utils/request'

export function songSheetList(params) {
  return request({
    url: '/playlist/highquality/tags',
    method: 'get',
    params
  })
}
export function songSheetDetail(params) {
  return request({
    url: '/top/playlist/highquality',
    method: 'get',
    params
  })
}