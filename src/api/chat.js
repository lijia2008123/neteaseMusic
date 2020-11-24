import request from '@/utils/request'

export function chatDetail(params) {
  return request({
    url: '/msg/private/history',
    method: 'get' ,
    params
  })
}

export function sendChat(params) {
  return request({
    url: '/send/text',
    method: 'get' ,
    params
  })
}