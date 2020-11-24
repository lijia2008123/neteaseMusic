const playData = {
  state: {
    songId: '',
    alId: '',
    playStatus: true,
    song: {},
    playSong: {
      name: '',
      ar: [{ name: '' }]
    },
    album: {
      album: {
        picUrl: ''
      }
    },
    lyric: '',
    playBarShow: true,
    playTime: 0,
    fullTime: 0,
    currentTime: 0,
    songUrl: '',
    canplay: true,
    mode: 0,
    playEnd: false,
    playingSongArr: [], // 播放的歌曲列表
    // songUrlArr: [] // 播放的歌曲url列表
  },
  mutations: {
    SET_LYRIC: (state, lyric) => {
      state.lyric = lyric
    },
    SET_PLAYEND: (state, playEnd) => {
      state.playEnd = playEnd
    },
    SET_MODE: (state, mode) => {
      state.mode = mode
    },
    SET_CANPLAY: (state, canplay) => {
      state.canplay = canplay
    },
    SET_SONG: (state, songId) => {
      state.songId = songId
    },
    SET_ALID: (state, alId) => {
      state.alId = alId
    },
    SET_STATUS: (state, play) => {
      state.playStatus = play
    },
    SET_SONGINFO: (state, songInfo) => {
      state.song = songInfo
    },
    SET_ALBUMINFO: (state, albumInfo) => {
      state.album = albumInfo
    },
    SET_PLAYINGSONG: (state, playingSong) => {
      state.playSong = playingSong
    },
    SET_PLAYBARSHOW: (state, playBarShow) => {
      state.playBarShow = playBarShow
    },
    SET_PLAYTIME: (state, playTime) => {
      state.playTime = playTime
    },
    SET_FULLTIME: (state, fullTime) => {
      state.fullTime = fullTime
    },
    SET_CURRENTTIME: (state, currentTime) => {
      state.currentTime = currentTime
    },
    SET_SONGURL: (state, songUrl) => {
      state.songUrl = songUrl
    },
    SET_PLAYSONGARR: (state, playingSongArr) => {
      state.playingSongArr.push(playingSongArr)
      var obj = {}
       state.playingSongArr = state.playingSongArr.reduce(function(item, next) {
         obj[next.id] ? '' : obj[next.id] = true && item.push(next)
         return item
      }, [])
    },
    SET_REMOVELIST: (state, item) => {
      if(item.type === 'all') {
        state.playingSongArr = []
      } else {
        state.playingSongArr.forEach((e, i) => {
          if(e.id === item.id) {
            state.playingSongArr.splice(i, 1)
          }
        })
      }
    },
  },
  actions: {
    // playSongSet({ commit }, playingSongArr) {
    //   return new Promise(resolve => {
    //     commit('SET_PLAYSONGARR', playingSongArr)
    //     resolve()
    //   })
    // },
    lyricSet({ commit }, lyric) {
      return new Promise(resolve => {
        commit('SET_LYRIC', lyric)
        resolve()
      })
    },
    playEndSet({ commit }, playEnd) {
      return new Promise(resolve => {
        commit('SET_PLAYEND', playEnd)
        resolve()
      })
    },
    removeList({ commit }, item) {
      return new Promise(resolve => {
        commit('SET_REMOVELIST', item)
        resolve()
      })
    },
    modeSet({ commit }, mode) {
      return new Promise(resolve => {
        commit('SET_MODE', mode)
        resolve()
      })
    },
    canplaySet({ commit }, canplay) {
      return new Promise(resolve => {
        commit('SET_CANPLAY', canplay)
        resolve()
      })
    },
    alidSet({ commit }, songId) {
      return new Promise(resolve => {
        commit('SET_ALID', songId)
        resolve()
      })
    },
    songUrlSet({ commit }, songUrl) {
      return new Promise(resolve => {
        commit('SET_SONGURL', songUrl)
        resolve()
      })
    },
    playingSongInfo({ commit }, playingSong) {
      return new Promise(resolve => {
        commit('SET_PLAYINGSONG', playingSong)
        commit('SET_PLAYSONGARR', playingSong)
        resolve()
      })
    },
    currentTimeSet({ commit }, currentTime) {
      return new Promise(resolve => {
        commit('SET_CURRENTTIME', currentTime)
        resolve()
      })
    },
    fullTimeSet({ commit }, fullTime) {
      return new Promise(resolve => {
        commit('SET_FULLTIME', fullTime)
        resolve()
      })
    },
    playTimeSet({ commit }, playTime) {
      return new Promise(resolve => {
        commit('SET_PLAYTIME', playTime)
        resolve()
      })
    },
    playSongId({ commit }, songId) {
      return new Promise(resolve => {
        commit('SET_SONG', songId)
        resolve()
      })
    },
    playStatus({ commit }, play) {
      return new Promise(resolve => {
        commit('SET_STATUS', play)
        resolve()
      })
    },
    songMsg({ commit }, songInfo) {
      return new Promise(resolve => {
        commit('SET_SONGINFO', songInfo)
        resolve()
      })
    },
    albumMsg({ commit }, albumInfo) {
      return new Promise(resolve => {
        commit('SET_ALBUMINFO', albumInfo)
        resolve()
      })
    },
    playBarIsShow({ commit }, playBarShow) {
      return new Promise(resolve => {
        commit('SET_PLAYBARSHOW', playBarShow)
        resolve()
      })
    }
  }
}

export default playData