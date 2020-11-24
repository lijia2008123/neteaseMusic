<template>
  <div class="main" v-if="isShow">
    <div class="bar">
      <div class="left" @click="goPlay(playSongItem.id)">
        <div class="img">
          <img :src="albumInfo.album.picUrl ? albumInfo.album.picUrl : cover" :style="{ animationPlayState: playStatus ? 'paused' : 'running' }" class="rotate" />
          <div class="img-cover" v-if="!albumInfo.album.picUrl"></div>
          <div class="img-center" v-if="!albumInfo.album.picUrl"></div>
        </div>
        <div class="info">
          <div class="song-name">{{ playSongItem.name ? playSongItem.name : '未播放' }}</div>
          <div class="name" v-if="playStatus">{{ playSongItem.ar | singerName }}</div>
            <div class="name" v-else>{{ lyricVal }}</div>
        </div>
      </div>
      <div class="right">
        <i class="el-icon-video-play play-btn" v-if="playStatus" @click="playSong(playSongItem.id)"></i>
        <i class="el-icon-video-pause play-btn" @click="pauseSong" v-else></i>
        <i class="iconfont icon-liebiaoxiangyou more-btn" @click="showList"></i>
      </div>
    </div>
    <div>
      <el-drawer :visible.sync="showListDrawer" direction="btt" :append-to-body="true" :show-close="false" custom-class="drawer-class">
        <header>
          <div @click="modeChange" class="drawe-header-left">
            <i class="iconfont icon-danquxunhuan" v-if="modeVal === 0"><span>单曲循环</span></i>
            <i class="iconfont icon-liebiaoxunhuan" v-else-if="modeVal === 1"><span>列表循环</span></i>
            <i class="iconfont icon-suiji" v-else><span>随机播放</span></i>
            ({{ modplayingSongArrVal.length }})
          </div>
          <div @click="modeChange" class="drawe-header-right">
            <span><i class="iconfont icon-wenjianjia" />收藏全部</span>
            <i class="el-icon-delete" @click="delList('all')"></i>
          </div>
        </header>
        <div class="list-wrapper">
          <div class="song-list" v-for="item in modplayingSongArrVal" :key="item.id">
            <div class="song-list-left" @click="changeSong(item)" :style="{ color: item.id ===  Number(songIdVal) ? '#DC143C' : ''}">
              <i class="iconfont icon-shengyin"></i>
              <span class="song-name">{{ item.name }}</span>
              <span class="line">-</span>
              <span class="name">{{ (item.ar || item.artists) | singerName }}</span>
            </div>
            <div class="song-list-right">
              <i class="iconfont icon-iconset0127" @click="delList('single', item.id)"></i>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
  import { getSong, getAlbum } from '@/api/search'
  import cover from '@/assets/disc-plus.png'
  import { setSongId, setAlId, getSongId, getAlId, setAllMsg, getAllMsg } from '@/utils/auth'
  import { mapGetters } from 'vuex'
  import { getLyric } from '@/api/playBar'
  import Lyric from 'lyric-parser'

  export default {
    data() {
      return {
        cover,
        showListDrawer: false,
        lyric: {},
        lyricStatus: undefined
      }
    },
    filters: {
      singerName(val) {
        if(val !== undefined && val.length && val.length < 2) {
          return val[0].name
        } else if(val !== undefined){
          let name = ''
          val.forEach((e, i) => {
            name += `${e.name} / `
          })
          return name.slice(0, name.length - 2)
        }
      }
    },
    computed: {
      ...mapGetters({
        'songIdVal':  'songId',
        'alId':  'alId',
        'playStatus': 'playStatus',
        'songInfo': 'song',
        'albumInfo': 'album',
        'playSongItem': 'playSong',
        'modeVal': 'mode',
        'modplayingSongArrVal': 'playingSongArr',
        'playEndVal': 'playEnd',
        'playTimeLine': 'playTime',
        'lyricVal': 'lyric',
      })
    },
    props: {
      isShow: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      playEndVal: function(newVal, oldVal) {
        if(newVal === true) {
          if(this.modplayingSongArrVal.length && this.modplayingSongArrVal.length > 1) {
            let index = 0
            this.modplayingSongArrVal.forEach((e, i) => {
              if(Number(this.songIdVal) === e.id) {
                index = i
              }
            })
            if(index >= this.modplayingSongArrVal.length) return
            index ++
            this.$store.dispatch('playSongId', this.modplayingSongArrVal[index].id)
            this.$store.dispatch('alidSet', this.modplayingSongArrVal[index].al.id)
          }
        }
      },
      playStatus: function(newVal, oldVal) {
        if (this.playTimeLine !== 0) {
          this.lyricStatus.togglePlay()
          console.log('状态切换')
        }
      },
      songIdVal: function(newVal, oldVal) {
        this.$store.dispatch('playTimeSet', 0)
        if(this.lyricStatus) {
          this.lyricStatus.stop() //切换歌曲后，清空前一首歌歌词Layric实例中的定时器
        }
        this.getSongDetail()
        setTimeout(() => {
          setSongId(newVal)
          setAlId(this.alId)
        }, 300)
      }
    },
    mounted() {
      if(this.songIdVal === '' && getSongId() !== 'undefined') {
        this.$store.dispatch('playSongId', getSongId())
        this.$store.dispatch('alidSet', getAlId())
      }
    },
    methods: {
      getLyricMsg() {
        getLyric({ id: this.songIdVal }).then(res => {
          this.lyric = res.lrc.lyric
          this.lyricStatus = new Lyric(this.lyric, this.handleLyric)
          this.lyricStatus.play()
        })
      },
      handleLyric({lineNum, txt}) {
        console.log(lineNum,txt)
        this.$store.dispatch('lyricSet', txt)
      },
      delList(type, id) { // 列表删除
        this.$store.dispatch('removeList', {
          type: type,
          id: id ? id : ''
        }).then(() => {
          if(type === 'all') {
            setSongId()
            setAlId()
          } else {

          }
        })
      },
      changeSong(item) { // 列表切歌
        this.$store.dispatch('playStatus', true)
        this.$store.dispatch('playSongId', item.id)
        if(item.al) {
          this.$store.dispatch('alidSet', item.al.id)
        } else {
          this.$store.dispatch('alidSet', item.album.id)
        }
      },
      modeChange() { // 播放模式切换
        let i = this.modeVal
        i ++
        if(i === 3) {
          i = 0
        }
        this.$store.dispatch('modeSet', i)
      },
      showList() {
        this.showListDrawer = true
      },
      async getSongDetail() {
        const res = await getSong({ id: this.songIdVal })
        if(res.data[0].url === null || res.data[0].url === '') {
          this.$store.dispatch('canplaySet', false)
          this.$store.dispatch('playStatus', true)
          this.$message.error('暂无权限~')
          return
        } else {
          await this.getAlbumMsg()
          this.$store.dispatch('canplaySet', true)
          this.$store.dispatch('songUrlSet', res.data[0].url)
          this.getLyricMsg()
          setTimeout(() => {
            this.$store.dispatch('playStatus', false)
          }, 500)
        }
      },
      async getAlbumMsg() {
        const res = await getAlbum({ id: this.alId })
        this.$store.dispatch('albumMsg', res)
        res.songs.forEach(e => {
          if(e.id === Number(this.songIdVal)) {
            this.$store.dispatch('playingSongInfo', e)
            setAllMsg(JSON.stringify(e))
          }
        })
      },
      pauseSong() {
        this.$store.dispatch('playStatus', true)
      },
      playSong(id) {
        this.$store.dispatch('playStatus', false)
      },
      goPlay(id) {
        this.$router.push({ name: 'Play', params: { playSongItem: this.playSongItem, albumInfo: this.albumInfo, songId: id } })
      }
    }
  }
</script>
<style lang="less" scoped>
.main {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 8px 0px;
    background: #fff;
    border-top: 1px solid #dedede;
    .bar{
      justify-content: space-between;
      display: flex;
      align-items: center;
      .left {
          width: 68%;
          display: flex;
          align-items: center;
          .img {
            width: 46px;
            height: 46px;
            border-radius: 100%;
            padding: 0 8px 0 14px;
            position: relative;
            img{
              width: 100%;
              height: 100%;
              border-radius: 100%;
            }
            .img-cover{
              position: absolute;
              width: 30px;
              height: 30px;
              left: 50%;
              background: #DC2C1F;
              border-radius: 100%;
              top: 50%;
              margin-left: -11.7px;
              margin-top: -14.7px;
            }
            .img-center{
              position: absolute;
              background: #262626;
              left: 50%;
              top: 50%;
              width: 10px;
              height: 10px;
              border-radius: 100%;
              margin-top: -5px;
              margin-left: -2px;
            }
          }
          .info {
            text-align: left;
            width: calc(100% - 86px);
            .song-name {
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              max-width: 86%;
            }
            .name {
              font-size: 14px;
            }
          }
        }
        .right {
          display: flex;
          align-items: center;
          margin-right: 14px;
          font-size: 30px;
          .play-btn {
            margin-right: 10px;
          }
          .more-btn {
            font-size: 26px;
          }
        }
    }
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
</style>
<style lang="less">

/*deep*/.drawer-class{
  border-radius: 28px 28px 0 0;
  height: 60% !important;
  padding: 10px 15px !important;
  .el-drawer__header{
    display: none;
  }
  header{
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    .drawe-header-left
    i{
      span{
        margin-left: 3px;
      }
    }
    .drawe-header-right{
      span{
        i{
          margin-right: 3px;
        }
        padding-right: 8px;
        border-right: 1px solid #eee;
      }
      .el-icon-delete{
        padding-left: 8px;
      }
    }
  }
  .list-wrapper{
    .song-list{
      padding: 8px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .song-list-left{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 86%;
        min-width: 85%;
        .icon-shengyin{
          margin-right: 3px;
        }
        .song-name{

        }
        .line{
          padding: 0 5px;
        }
        .name{
          font-size: 12px;
        }
      }
      .song-list-right{
        .el-icon-delete{

        }
      }
    }
  }
}
</style>