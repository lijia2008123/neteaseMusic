const getters = {
  searchHistory: state => Array.from(new Set([...state.home.searchHistory])).reverse(),
  token: state => state.login.token,
  info: state => state.login.info,
  songId: state => state.play.songId,
  alId: state => state.play.alId,
  playStatus: state => state.play.playStatus,
  song: state => state.play.song,
  album: state => state.play.album,
  playSong: state => state.play.playSong,
  playBarShow: state => state.play.playBarShow,
  playTime: state => state.play.playTime,
  fullTime: state => state.play.fullTime,
  currentTime: state => state.play.currentTime,
  songUrl: state => state.play.songUrl,
  canplay: state => state.play.canplay,
  mode: state => state.play.mode,
  playingSongArr: state => state.play.playingSongArr,
  tabIndex: state => state.home.tabIndex,
  playEnd: state => state.play.playEnd,
  lyric: state => state.play.lyric
}

export default getters