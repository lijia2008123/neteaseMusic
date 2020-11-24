<template>
  <div class="main-item">
    <transition name="change" mode="out-in">
      <div class="bg bg-filter" :style="{ background: `url(${coverUrl})` }" v-show="isShow" :key="songIdVal">
    </div>
    </transition>
    <div class="content">
      <pageHeader :title="songName" :singerName="singerName" :showShare="true"></pageHeader>
        <div class="play-place">
          <img class="neddle" :src="needle" :class="playStatus ? 'neddle-on' : 'neddle-off'">
          <transition name="cd" mode="in-out" :duration="{ enter: 500, leave: 0 }">
            <div class="film" v-show="isShow" :key="songIdVal">
              <div class="black-film rotate" :style="{ background: `url(${cover})`, animationPlayState: playStatus ? 'paused' : 'running' }">
                <div class="cover-film rotate" :style="{ background: `url(${coverUrl})`, animationPlayState: playStatus ? 'paused' : 'running' }">
                </div>
              </div>
            </div>
          </transition>
        </div>
      <div class="func">
        <i class="iconfont icon-xihuan1" @click="likeMe(false)" v-if="isLike" />
        <i class="iconfont icon-03" @click="likeMe(true)" v-else />
        <i class="iconfont icon-diantai" />
        <i class="iconfont icon-pinglun" @click="seeComment" />
        <i class="iconfont icon-yueduye-yejianmoshi" />
        <i class="iconfont icon-gengduo" @click="moreMsg" />
      </div>
      <div class="progress-line">
        <i class="current-time">{{ currentTimeVal }}</i>
        <div class="progress">
          <el-progress :percentage="Number(playTimeLine)" :show-text="false" :stroke-width="3"></el-progress>
        </div>
        <i class="full-time">{{ fullTimeVal }}</i>
      </div>
      <transition name="lyric" mode="out-in">
        <div class="lyric" :key="lyricVal" v-if="lyricShow">
          {{ lyricVal }}
        </div>
      </transition>
      <div class="play-control">
        <div @click="modeChange">
          <i class="iconfont icon-danquxunhuan" v-if="modeVal === 0"></i>
          <i class="iconfont icon-liebiaoxunhuan" v-else-if="modeVal === 1"></i>
          <i class="iconfont icon-suiji" v-else></i>
        </div>
        <i class="iconfont icon-shangyiqu101" @click="changeSong('up')"></i>
        <i class="iconfont icon-bofang" v-if="playStatus" @click="playBtn"></i>
        <i class="iconfont icon-plus-pause" v-else @click="pauseBtn"></i>
        <i class="iconfont icon-xiayiqu101" @click="changeSong('down')"></i>
        <i class="iconfont icon-liebiaoxiangyou"></i>
      </div>
    </div>
    <el-drawer :visible.sync="drawer" direction="btt" custom-class="floor-drawer" :show-close="false" @closed="handleClose">
      <span>{{playSongItem.name}}</span>
    </el-drawer>
  </div>
</template>
<script>
  import cover from '@/assets/disc-plus.png'
  import needle from '@/assets/needle-plus.png'
  import pageHeader from '@/components/header'
  import { getSongId, getAlId, setAllMsg, getAllMsg } from '@/utils/auth'
  import { getSong, getAlbum } from '@/api/search'
  import { like, likelist } from '@/api/play'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      pageHeader
    },
    data() {
      return {
        lyricShow: true,
        drawer: false,
        isLike: false,
        needle,
        cover,
        songName: '',
        singerName: '',
        coverUrl: '',
        songId: '',
        songUrl: '',
        isShow: true
      }
    },
    computed: {
      ...mapGetters({
        'userInfo': 'info',
        'playStatus': 'playStatus',
        'playTimeLine': 'playTime',
        'fullTimeVal': 'fullTime',
        'currentTimeVal': 'currentTime',
        'songIdVal':  'songId',
        'alId':  'alId',
        'playSongItem': 'playSong',
        'modeVal': 'mode',
        'lyricVal': 'lyric',
        'modplayingSongArrVal': 'playingSongArr' // 列表的所有歌曲
      })
    },
    created() {
      this.$store.dispatch('playBarIsShow', false)
    },
    watch: {
      lyricVal: function(newVal, oldVal) {
        this.lyricShow = false
        this.lyricShow = true
      }
    },
    async mounted() {
      this.getLikeList()
      if (JSON.stringify(this.$route.params) !== '{}') {
        const info = this.$route.params
        this.songName = info.playSongItem.name
        this.singerName = this.singerNameFilter(info.playSongItem.ar)
        this.coverUrl = info.albumInfo.album.picUrl
        this.songId = info.songId
      } else {
        const info = JSON.parse(getAllMsg('allMsg'))
        this.songName = info.name
        this.singerName = this.singerNameFilter(info.ar)
        this.coverUrl = info.al.picUrl
        this.songId = this.songIdVal
      }
    },
    methods: {
      moreMsg() {
        this.drawer = true
        console.log('playSongItem',this.playSongItem)
      },
      handleClose() {

      },
      seeComment() {
        this.$router.push('/comment')
      },
      getLikeList() {
        likelist({ uid: this.userInfo.uid }).then(res => {
          res.ids.forEach(e => e === Number(this.songIdVal) ? this.isLike = true : this.isLike = false)
        })
      },
      likeMe(type) {
        type ? this.isLike = true : this.isLike = false
        like({
          id: this.songIdVal,
          like: type
        }).then(res => {
          
        })
      },
      singerNameFilter(val) {
        if(val.length && val.length < 2) {
          return val[0].name
        } else {
          let name = ''
          val.forEach((e, i) => {
            name += `${e.name}/`
          })
          return name.slice(0, name.length-1)
        }
      },
      changeSong(type) { // 上一曲 下一曲
        this.isShow != this.isShow
        let index = null
        this.modplayingSongArrVal.forEach((e, i) => {
          if(e.id === this.songIdVal) {
            index = i
          }
        })
        if(type === 'up') {
          index --
          if(index <= 0 ) index = this.modplayingSongArrVal.length - 1
          this.$store.dispatch('playStatus', true)
          this.$store.dispatch('playSongId', this.modplayingSongArrVal[index].id)
          this.$store.dispatch('alidSet', this.modplayingSongArrVal[index].al.id)
        } else {
          index ++
          if(index > this.modplayingSongArrVal.length - 1) index = 0
          this.$store.dispatch('playStatus', true)
          this.$store.dispatch('playSongId', this.modplayingSongArrVal[index].id)
          this.$store.dispatch('alidSet', this.modplayingSongArrVal[index].al.id)
        }
        const info = this.playSongItem
        console.log('info',info)
        this.songName = info.name
        this.singerName = info.ar[0].name
        this.coverUrl = info.al.picUrl
        this.songId = this.songIdVal
        
      },
      modeChange() { // 播放模式切换
        let i = this.modeVal
        i ++
        if(i === 3) {
          i = 0
        }
        this.$store.dispatch('modeSet', i)
      },
      playBtn() {
        this.$store.dispatch('playStatus', false)
      },
      pauseBtn() {
        this.$store.dispatch('playStatus', true)
      },
      async getAlbumMsg() {
        const res = await getAlbum({ id: this.alId })
        this.$store.dispatch('albumMsg', res)
        res.songs.forEach(e => {
          if(e.id === Number(this.songIdVal)) {
            this.$store.dispatch('playingSongInfo', e)
          }
        })
      },
      async getSongDetail() {
        const res = await getSong({ id: this.songIdVal })
        if(res.data[0].url === null || res.data[0].url === '') {
          this.$store.dispatch('canplaySet', false)
          this.$store.dispatch('playStatus', true)
          this.$message.error('暂无权限~')
          return
        } else {
          this.$store.dispatch('canplaySet', true)
          await this.getAlbumMsg()
          this.$store.dispatch('songUrlSet', res.data[0].url)
          setTimeout(() => {
            this.$store.dispatch('playStatus', false)
          }, 300)
        }
      }
    },
    destroyed() {
      this.$store.dispatch('playBarIsShow', true)
      this.lyricShow = true
    }
  }
</script>
<style lang="less" scoped>
  .main-item{
    overflow: hidden;
    .bg{
      height: 100vh;
      background-size: cover !important;
      background-position: center !important;
      transform: scale(1.2);
    }
    .content{
      overflow: hidden;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      .play-place{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        .neddle{
          position: absolute;
          z-index: 999;
          top: 3vh;
          left: 51%;
          width: 17vh;
          margin-left: -3vh;
          transform-origin: 15% 0%;
          transition: all .6s;
        }
        .film{
          height: 40vh;
          width: 40vh;
          border-radius: 100%;
          margin-top: 8vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.2);
          overflow: hidden;
          .black-film{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40vh;
            width: 40vh;
            border-radius: 100%;
            background-size: 100% !important;
            background-repeat: no-repeat !important;
            background-position: center !important;
            .cover-film{
              height: 25vh;
              width: 25vh;
              border-radius: 100%;
              background-size: contain !important;
            }
          }
        }
      }
      .func{
        position: absolute;
        bottom: 20vh;
        width: 100%;
        color: #fff;
        display: flex;
        justify-content: space-around;
        i{
          font-size: 28px;
        }
        .icon-03{
          margin-left: 56px;
        }
        .icon-gengduo{
          margin-right: 56px;
          transform: rotate(90deg);
        }
        .icon-xihuan1{
          margin-left: 56px;
          color: red;
        }
      }
      .progress-line{
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 115px;
        width: 100%;
        color: #ddd;
        .current-time{
          margin-left: 16px;
          font-style: normal;
          font-size: 12px;
        }
        .progress{
          margin-left: 16px;
          margin-right: 16px;
          width: 100%;
        }
        .full-time{
          margin-right: 16px;
          font-style: normal;
          font-size: 12px;
        }
      }
      .lyric{
        margin-top: 10vh;
        color: #fff;
      }
      .play-control{
        font-size: 30px;
        color: #fff;
        position: absolute;
        width: 100%;
        bottom: 35px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        i{
          font-size: 28px;
        }
        .icon-bofang,.icon-plus-pause{
          font-size: 66px;
        }
        .icon-danquxunhuan,.icon-liebiaoxunhuan,.icon-suiji{
          margin-left: 56px;
        }
        .icon-liebiaoxiangyou{
          margin-right: 56px;
        }
      }
    }
  }
  .cd-enter {
    // transform: translateX(100%);
    opacity: 1;
  }
  .cd-leave-to {
    // transform: translateX(-100%);
    opacity: 0;
  }
  .cd-enter-active, .cd-leave-active {
    transition: all .5s
  }
  .lyric-enter {
    transform: translateY(30%);
    opacity: 1;
  }
  .lyric-leave-to {
    transform: translateY(30%);
    opacity: 0;
  }
  .lyric-enter-active, .lyric-leave-active {
    transition: all .5s
  }
  .fade-enter {
    transform: translateY(100%);
  }
  .fade-leave-to {
    transform: translateY(100%);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s
  }
  .change-enter {
    opacity: .8;
  }
  .change-leave-to {
    opacity: .8;
  }
  .change-enter-active, .change-leave-active {
    transition: all .6s;
  }
  .bg-filter{
    filter: blur(16px);
  }
  .rotate{
    animation:turn 28s linear infinite;
  }
  @keyframes turn{
    0%{-webkit-transform:rotate(0deg);}
    25%{-webkit-transform:rotate(90deg);}
    50%{-webkit-transform:rotate(180deg);}
    75%{-webkit-transform:rotate(270deg);}
    100%{-webkit-transform:rotate(360deg);}
  }
  .neddle-on{
    transform: rotate(-20deg);
  }
  .neddle-off{
    transform: rotate(0deg);
  }
</style>
<style lang="less">
  .main-item{
    /*deep*/.floor-drawer{
      border-radius: 28px 28px 0 0;
      height: 60% !important;
      padding: 10px 15px !important;
      .el-drawer__header{
        display: none;
      }
    }
  }
</style>