import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import '@/assets/theme/index.css'
import { getToken } from '@/utils/auth'
import mixin from "@/mixin"
import '@/assets/iconfont/iconfont.css'

Vue.use(ElementUI)
Vue.mixin(mixin)

Vue.config.productionTip = false

router.beforeEach(async(to, from, next) => {
  const hasToken = getToken()
  if(hasToken) {
    if(to.path === '/login') {
      next({ path: '/' })
    } else {
      const userInfo = store.getters.info
      if(JSON.stringify(userInfo) == "{}") {
        await store.dispatch('getUserInfo').then((res) => {
          next()
        })
      } else {
        next()
      }
    }
  } else {
    if(to.path === '/login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
