const tokenKey = "token"
const userId = "uid"

export function setToken(token) {
  return localStorage.setItem(tokenKey, token)
}
export function getToken() {
  return localStorage.getItem(tokenKey)
}
export function removeToken() {
  return localStorage.removeItem(tokenKey)
}
export function setUid(uid) {
  return localStorage.setItem(userId, uid)
}
export function getUid() {
  return localStorage.getItem(userId)
}
export function removeUid() {
  return localStorage.removeItem(userId)
}
export function setSongId(id) {
  return localStorage.setItem('songId', id)
}
export function getSongId() {
  return localStorage.getItem('songId')
}
export function setAlId(id) {
  return localStorage.setItem('alId', id)
}
export function getAlId() {
  return localStorage.getItem('alId')
}
export function setAllMsg(msg) {
  return localStorage.setItem('allMsg', msg)
}
export function getAllMsg() {
  return localStorage.getItem('allMsg')
}
