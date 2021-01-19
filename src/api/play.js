import request from '@/utils/request'

export function like(params) {
  return request({
    url: '/like',
    method: 'get',
    params
  })
}

export function likelist(params) {
  return request({
    url: '/likelist',
    method: 'get',
    params
  })
}
// 获取歌手详情
export function singerDetail(params) {
  return request({
    url: '/artist/detail',
    method: 'get',
    params
  })
}
// 获取歌手描述
export function singerDescribe(params) {
  return request({
    url: '/artist/desc',
    method: 'get',
    params
  })
}
// 获取相似歌手
export function singerSimilar(params) {
  return request({
    url: '/simi/artist',
    method: 'get',
    params
  })
}