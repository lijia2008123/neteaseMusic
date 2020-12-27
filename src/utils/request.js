import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import qs from 'qs'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60000
})

service.interceptors.request.use(
  config => {
    config.withCredentials = true
    config.headers['X-Real-IP'] = '211.161.244.70'
    if(config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if(res.code && res.code !== 200) {
      if(res.code && res.code === 301) {
        MessageBox.confirm(res.message, '提示', {
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: '确定'
        }).finally(() => {
          this.$router.push('/')
        })
      } else {
        MessageBox.confirm(res.message, '提示', {
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: '确定'
        }).finally(() => {
  
        })
      }
      
      return Promise.reject(res.message)
    } else {
      // Message({
      //   message: res.message,
      //   type: 'success',
      //   duration: 5000
      // })
      return response.data
    }
  },
  error => {
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5000
    // })
    return Promise.reject(error)
  }
)

export default service