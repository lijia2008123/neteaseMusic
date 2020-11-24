import request from '@/utils/request'

export function getLyric(params) {
  return request({
    url: '/lyric',
    method: 'get',
    params
  })
}