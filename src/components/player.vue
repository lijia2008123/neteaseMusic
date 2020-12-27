<template>
  <div class="main-item">
    <audio :src="songUrlVal" id="player" :autoplay="true" :loop="false" @timeupdate="timeupdate" @ended="songEnd" @play="songPlay"></audio>
  </div>
</template>
<script>
  import { getSong } from '@/api/search'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        songName: '',
        singerName: '',
        coverUrl: '',
        songId: '',
        songUrl: '',
        fullTime: null,
        autoplay: false
      }
    },
    computed: {
      ...mapGetters({
        'songsId':  'songId',
        'playStatus': 'playStatus',
        'songUrlVal': 'songUrl'
      })
    },
    watch: {
      playStatus: function(newVal, oldVal) {
        const player = document.getElementById('player')
        if(newVal === true) {
          console.log('暂停')
          setTimeout(() => {
            player.pause()
          }, 300)
        } else {
          // this.$store.dispatch('playStatus', true)
          if(this.autoplay) {
            this.$store.dispatch('playStatus', false)
            if (this.songUrlVal !== '') {
              console.log('播放xxx')
              setTimeout(() => {
                player.play()
                this.getSongMsg()
              }, 300)
            }
          }
        }
      },
      // songUrlVal: function(newVal, oldVal) {
      //   console.log('valUrl', newVal, oldVal)
      //   const player = document.getElementById('player')
      //   player.play()
      //   this.getSongMsg()
      // },
    },
    mounted() {
      setTimeout(() => {
        this.autoplay = true
      }, 1000)
    },
    methods: {
      songPlay() {
        this.$store.dispatch('playEndSet', false)
      },
      songEnd() {
        this.$store.dispatch('playStatus', true)
        this.$store.dispatch('playEndSet', true)
      },
      timeupdate(e){ // 存储进度条值
        const player = document.getElementById('player')
        setTimeout(() => {
          player.addEventListener('timeupdate', () => {
            const playTime = player.currentTime / player.duration * 100
            this.$store.dispatch('playTimeSet', playTime)
            this.$store.dispatch('currentTimeSet', this.timeFormat(player.currentTime))
          })
        }, 300)
      },
      getSongMsg() { // 获取歌曲总时间
        const player = document.getElementById('player')
        this.$store.dispatch('fullTimeSet', this.timeFormat(player.duration))
      },
      timeFormat(time) { // 秒转为时间
        let timeDisplay
        timeDisplay = Math.floor(time)//获取实时时间
        let minute = timeDisplay / 60
        let minutes = parseInt(minute)
        if (minutes < 10) {
          minutes = "0" + minutes
        }
        let second = timeDisplay % 60
        let seconds = Math.round(second)
        if (seconds < 10) {
          seconds = "0" + seconds
        }
        return `${minutes}:${seconds}`
      }
    }
  }
</script>
<style lang="less" scoped>

</style>