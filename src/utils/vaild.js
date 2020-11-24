export function testPhone(phone) {
  let reg = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/
  return reg.test(phone)
}