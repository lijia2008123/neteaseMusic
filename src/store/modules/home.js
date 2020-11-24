const home = {
  state: {
    searchHistory: [],
    tabIndex: 0
  },
  mutations: {
    SET_TABINDEX: (state, index) => {
      state.tabIndex = index
    },
    SET_searchHistory: (state, history) => {
      if(history === '') {
        state.searchHistory = []
      } else {
        state.searchHistory.push(history)
      }
    }
  },
  actions: {
    addHistory({ commit }, history) {
      return new Promise(resolve => {
        commit('SET_searchHistory', history)
        resolve()
      })
    },
    tabIndexSet({ commit }, index) {
      return new Promise(resolve => {
        commit('SET_TABINDEX', index)
        resolve()
      })
    }
  }
}

export default home