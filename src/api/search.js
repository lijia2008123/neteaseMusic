import request from '@/utils/request'

export function homeSearch(params) {
  return request({
    url: '/cloudsearch',
    method: 'get',
    params
  })
}
export function searchHot(params) {
  return request({
    url: '/search/hot',
    method: 'get',
    params
  })
}
export function searchSuggest(params) {
  return request({
    url: '/search/suggest',
    method: 'get',
    params
  })
}
export function getSong(params) {
  return request({
    url: '/song/url',
    method: 'get',
    params
  })
}
export function getAlbum(params) {
  return request({
    url: '/album',
    method: 'get',
    params
  })
}