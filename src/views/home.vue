<template>
  <div class="main">
    <navbar />
    <div class="container">
      <transition name="change" mode="out-in">
        <div v-show="tabIndex === 0" class="block-wrapper">
          <div class="bg"></div>
          <el-carousel trigger="click" height="18vh" :autoplay="false">
            <el-carousel-item v-for="item in banners" :key="item.bannerId">
              <div class="banner" @click="bannerClick(item)">
                <img :src="item.pic" class="banner-img" />
                <span class="banner-title" :style="{ background: item.titleColor === 'red' ? '#DC2C1F' : '#6495ED' }">{{ item.typeTitle }}</span>
              </div>
            </el-carousel-item>
          </el-carousel>
          <div class="radius">
            <div class="radius-item" v-for="item in ballArr" :key="item.id" @click="clickBall(item)">
              <div class="radius-img">
                <span v-if="item.id === -1">{{ date }}</span>
                <img :src="item.iconUrl">
              </div>
              <span class="radius-title">{{ item.name }}</span>
            </div>
          </div>
          <div class="push">
            <div class="push-title">
              <span>懂你的精选歌单</span>
              <span @click="moreSongSheet">查看更多</span>
            </div>
            <div class="push-items">
              <div class="push-item" v-for="item in personalizedArr" :key="item.id">
                <div class="push-img">
                  <img :src="item.picUrl">
                  <span>
                  <i class="iconfont icon-bofang"></i> 
                  {{ item.playCount | formatNum }}</span>
                </div>
                <span class="push-name">{{ item.name | formatName }}</span>
              </div>
            </div>
          </div>
          <div class="push">
            <div class="push-title">
              <span>值得聆听的音乐</span>
              <span @click="playAll"><i class="iconfont icon-bofang1"></i>播放全部</span>
            </div>
            <div class="song-items">
              <div class="song-item" v-for="item in newSongArr" :key="item.id">
                <div class="song-left">
                  <img :src="item.picUrl">
                  <div class="name">
                    <span>{{ item.name | formatSongName }}</span>
                    <span>{{ item.song.artists | singerName | formatSongName }}</span>
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
      </transition>
      <transition name="change" mode="out-in">
        <div v-show="tabIndex === 1">
          发现
        </div>
      </transition>
      <transition name="change" mode="out-in">
        <div v-show="tabIndex === 2">
          云村
        </div>
      </transition>
      <transition name="change" mode="out-in">
        <div v-show="tabIndex === 3">
          视频
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import navbar from '@/components/navbar'
import { banner, ball, personalized, newsong } from '@/api/home'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      newSongArr: [],
      personalizedArr: [],
      ballArr: [],
      banners: [],
      radius: [
        { name: '每日推荐', icon: 'icon-rili' },
        { name: '私人FM', icon: 'icon-shouyinji' },
        { name: '歌单', icon: 'icon-gedan' },
        { name: '排行榜', icon: 'icon-PCbofangye_paihangbang' },
        { name: '电台', icon: 'icon-redian' }
      ]
    }
  },
  components: {
    navbar
  },
  filters: {
    formatNum(val) {
      let len = String(val).length
      if(len > 4) {
        return parseInt(val / 10000) + '万'
      }
      return val
    },
    formatName(val) {
      if(val.length > 10) {
        return `${val.slice(0, 10)}...`
      }
      return val
    },
    formatSongName(val) {
      if(val.length > 18) {
        return `${val.slice(0, 18)}...`
      }
      return val
    },
    singerName(val) {
      if(val.length && val.length < 2) {
        return val[0].name
      } else {
        let name = ''
        val.forEach((e, i) => {
          name += `${e.name}/`
        })
        return name.slice(0, name.length-1)
      }
    }
  },
  computed: {
    ...mapGetters({
      'tabIndex':  'tabIndex',
      'canplayVal': 'canplay',
      'playStatus': 'playStatus',
      'songIdVal':  'songId',
      'playingSongArrVal': 'playingSongArr',
    }),
    date() {
      return new Date().getDate()
    }
  },
  watch: {
    'tabIndex': function(newVal, oldVal) {
      console.log('newVal',newVal)
    },
    playStatus: function(newVal, oldVal) {
      if(newVal === true) {
        this.newSongArr.forEach(e => {
          e.play = false
        })
      } else {
        this.newSongArr.forEach(e => {
          if (e.id === this.songIdVal) {
            e.play = true
          }
        })
      }
    }
  },
  mounted() {
    this.getBanner()
    this.getBall()
    this.getPersonalized()
    this.getNewSong()
  },
  methods: {
    moreSongSheet() {
      this.$router.push('/songSheet')
    },
    clickBall(item) {
      console.log('clickBall',item)
      if(item.name === '每日推荐') {
        this.$router.push('/everydayPush')
      } else if(item.name === '歌单') {
        this.$router.push('/songSheet')
      } else if(item.name === '排行榜') {
        this.$router.push('/rankingList')
      } else if(item.name === '电台') {
        this.$router.push('/radio')
      }
    },
    playAll() {
      this.newSongArr.forEach(e => {
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
    getNewSong() {
      newsong().then(res => {
        res.result.forEach(e => {
          e.play = false
        })
        this.newSongArr = res.result
      })
    },
    getPersonalized() {
      personalized({ limit: 6 }).then(res => {
        this.personalizedArr = res.result
      })
    },
    getBall() {
      ball().then(res => {
        this.ballArr = res.data
      })
    },
    pauseSong(id, item) {
      item['play'] = false
      this.$store.dispatch('playSongId', id)
      this.$store.dispatch('playStatus', true)
    },
    bannerClick(item, type) {
      if(item.song) {
        this.$store.dispatch('playStatus', true)
        this.$store.dispatch('playSongId', item.song.id)
        this.$store.dispatch('alidSet', type === 2 ? item.song.album.id : item.song.al.id).then(() => {
          setTimeout(() => {
            if(this.canplayVal) {
              this.newSongArr.forEach(e => {
                e.play = false
              })
              item['play'] = true
            } else {
              item['play'] = false
            }
          }, 300)
        })
      } else {
        console.log('打开网页')
      }
    },
    getBanner() {
      banner().then(res => {
        this.banners = res.banners
        
      })
    }
  }
  
}
</script>
<style lang="less" scoped>
  .main{
    .container{
      .block-wrapper{
        // padding: 18px;
        position: relative;
        .bg{
          background: #D43A31;
          background: #262626;
          height: 13vh;
          width: 100%;
          position: absolute;
        }
        .banner{
          position: relative;
          .banner-img{
            width: 100%;
            border-radius: 10px;
          }
          .banner-title{
            position: absolute;
            right: 0;
            bottom: 5px;
            border-radius: 10px 0;
            padding: 3px 5px;
            color: #fff;
            font-size: 12px;
          }
        }
      }
      .radius{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .radius-item:first-child{
          margin-left: 18px;
        }
        .radius-item:last-child{
          margin-right: 18px;
        }
        .radius-item{
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .radius-img{
            background: #D43A31;
            background: #262626;
            color: #fff;
            border-radius: 100%;
            height: 5vh;
            width: 5vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            img{
              width: 100%;
            }
            span{
              position: absolute;
              color: #D43A31;
              font-weight: 600;
              font-size: 14px;
              top: 14px;
            }
          }
          .radius-title{
            margin-top: 5px;
            font-size: 14px;
          }
        }
      }
      .push{
        margin-top: 22px;
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
    }
    /*deep*/.el-carousel__container{
      height: 30vh !important;
    }
  }
  .change-enter {
    opacity: 0;
    transform: translateX(-100%);
  }
  .change-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
  .change-enter-active, .change-leave-active {
    transition: all .5s;
  }
  .fade-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
</style>
<style lang="less">
  .container{
    /*deep*/.el-carousel{
      padding: 16px 16px 0px 16px;
      height: 18vh;
    }
    .el-carousel__indicators{
      bottom: 6px;
    }
    .el-carousel__container{
      height: 100%;
    }
    /*deep*/.el-carousel__indicators{
      width: 100%;
    }
    /*deep*/.el-carousel__button{
      width: 6px;
      height: 6px;
      border-radius: 100%;
      background: #DC2C1F;
      opacity: .3;
    }
  }
</style>