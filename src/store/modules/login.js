import { setToken, getToken, removeToken, setUid, getUid, removeUid } from '@/utils/auth'
import { userLogin, userDetail, logout } from '@/api/login'
// import { reject, resolve } from 'core-js/fn/promise'

const user = {
  state: {
    token: getToken(),
    info: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },
  actions: {
    getLogout({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_INFO', {})
      removeToken()
      removeUid()
      logout()
    },
    getLogin({ commit }, userInfo ) {
      return new Promise((resolve, reject) => {
        userLogin({
          phone: userInfo.account,
          password: userInfo.password
        }).then((res) => {
          commit('SET_TOKEN', res.token)
          commit('SET_INFO', res)
          setToken(res.token)
          setUid(res.bindings[0].userId)
          resolve()
        }).catch(err => {
					reject(err)
				})
      })
    },
    getUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        userDetail({
          uid: getUid()
        }).then((res) => {
          commit('SET_INFO', res)
          resolve()
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}

export default user