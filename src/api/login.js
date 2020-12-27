import request from '@/utils/request'

export function userLogin(params) {
  return request({
    url: '/login/cellphone',
    method: 'get' ,
    params
  })
}

export function logout(params) {
  return request({
    url: '/logout',
    method: 'get',
    params
  })
}

export function userDetail(params) {
  return request({
    url: '/user/detail',
    method: 'get' ,
    params
  })
}