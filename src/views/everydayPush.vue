<template>
  <div class="container">
    <header :style="{ background: `url('${bg}')` }">
      <i class="el-icon-back" @click="goBack"></i>
    </header>
    <div class="push">
      <div class="push-title">
        <span @click="playAll"><i class="iconfont icon-bofang1"></i>播放全部</span>
      </div>
      <div class="song-items">
        <div class="song-item" v-for="(item, index) in playList.dailySongs" :key="item.id">
          <div class="song-left">
            <img :src="item.al.picUrl">
            <div class="name">
              <span>{{ item.name | formatSongName }}<span class="reason" v-if="playList.dailySongs[index].id === playList.recommendReasons[0].songId">{{ playList.recommendReasons[0].reason }}</span></span>
              <span>{{ item.ar | singerName }}</span>
            </div>
          </div>
          <div class="song-right">
            <i class="iconfont icon-bofang" v-if="!item.play" @click="bannerClick(item, 2)"></i>
            <i class="iconfont icon-zanting" v-else @click="pauseSong(item.id, item)"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { list } from '@/api/everydayPush'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        playList: {
          dailySongs: []
        },
        bg: ''
      }
    },
    filters: {
      formatSongName(val) {
        if(val.length > 18) {
          return `${val.slice(0, 18)}...`
        }
        return val
      },
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
        'list': 'playingSongArr',
        'playEndVal': 'playEnd',
        'canplayVal': 'canplay',
      })
    },
    mounted() {
      this.getList()
    },
    methods: {
      bannerClick(item) {
        this.$store.dispatch('playStatus', true)
        this.$store.dispatch('playSongId', item.id)
        this.$store.dispatch('alidSet', item.al.id).then(() => {
          setTimeout(() => {
            if(this.canplayVal) {
              this.playList.dailySongs.forEach(e => {
                e.play = false
              })
              item['play'] = true
            } else {
              item['play'] = false
            }
          }, 300)
        })
      },
      goBack() {
        this.$router.go(-1)
      },
      playAll() {
        this.playList.dailySongs.forEach(e => {
          this.$store.dispatch('playingSongInfo', e.song)
        })
        this.$store.dispatch('playStatus', true)
        this.$store.dispatch('playSongId', this.playingSongArrVal[0].id)
        if(this.playingSongArrVal[0].al) {
          this.$store.dispatch('alidSet', this.playingSongArrVal[0].al.id)
        } else {
          this.$store.dispatch('alidSet', this.playingSongArrVal[0].album.id)
        }
      },
      getList() {
        list().then(res => {
          res.data.dailySongs.forEach(e => {
            e.play = false
          })
          this.playList = res.data
          this.bg = this.playList.dailySongs[0].al.picUrl
        })
      },
    }
  }
</script>
<style lang="less" scoped>
  header{
    height: 32vh;
    background-position: center !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    font-size: 20px;
    display: flex;
    padding-left: 22px;
    position: relative;
    color: #fff;
    i{
      margin-top: 1vh;
    }
  }
  .push{
    border-radius: 28px 28px 0 0;
    padding-top: 30px;
    background: #fff;
    position: relative;
    top: -3vh;
    .push-title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      span:first-child{
        font-size: 16px;
        font-weight: 600;
        margin-left: 18px;
      }
      span:last-child{
        font-size: 14px;
        border: 1px solid #ddd;
        padding: 3px 5px;
        border-radius: 30px;
        margin-right: 18px;
      }
    }
    .push-items{
      display: flex;
      overflow: scroll;
      .push-item{
        padding: 18px 0 18px 18px;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .push-img{
          text-align: left;
          width: 12vh;
          height: 12vh;
          img{
            width: 100%;
            border-radius: 8px;
          }
          .icon-bofang{
            font-size: 12px;
          }
          span{
            position: absolute;
            color: #fff;
            top: 21px;
            right: 7px;
            font-size: 12px;
          }
        }
        .push-name{
          text-align: left;
          margin-top: 5px;
        }
      }
    }
    .song-items{
      padding-top: 18px;
      padding-bottom: 10vh;
      .song-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 0;
        .song-left{
          display: flex;
          align-items: center;
          margin-left: 18px;
          img{
            width: 8vh;
            border-radius: 8px;
          }
          .name{
            margin-left: 7px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            font-size: 14px;
            span:first-child{
              margin-bottom: 5px;
            }
            span:last-child{
              font-size: 14px;
            }
            .reason{
              font-size: 12px !important;
              background: #FFC0CB;
              color: #DC143C;
              padding: 3px 5px;
              border-radius: 4px;
              margin-left: 8px;
            }
          }
        }
        .song-right{
          padding-right: 18px;
          .icon-bofang,.icon-zanting{
            color: #D43A31;
          }
        }
      }
    }
  }
</style>