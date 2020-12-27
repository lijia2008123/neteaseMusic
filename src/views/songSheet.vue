<template>
  <div class="songSheet">
    <pageHeader :title="title" :showShare="false" :showSingerName="false"></pageHeader>
    <nav>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="推荐" name="推荐">
          <div class="push">
            <transition name="fade" mode="out-in">
              <div class="push-items" v-if="changeTab" :key="activeName">
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
            </transition>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="tag" :name="tag" v-for="(tag, index) in songSheetListArr" :key="index">
          <div class="push">
            <transition name="fade" mode="out-in">
              <div class="push-items" v-if="changeTab" :key="activeName">
                <div class="push-item" v-for="item in songSheetListItem" :key="item.id">
                  <div class="push-img">
                    <img :src="item.coverImgUrl">
                    <span>
                    <i class="iconfont icon-bofang"></i> 
                    {{ item.playCount | formatNum }}</span>
                  </div>
                  <span class="push-name">{{ item.name | formatName }}</span>
                </div>
              </div>
            </transition>
          </div>
        </el-tab-pane>
      </el-tabs>
    </nav>
  </div>
</template>
<script>
import { songSheetList, songSheetDetail } from '@/api/songSheet'
import { personalized } from '@/api/home'
import pageHeader from '@/components/header'

export default {
  name: 'songSheet',
  data() {
    return {
      title: '歌单广场',
      activeName: '推荐',
      songSheetListArr: [],
      songSheetListItem: [],
      changeTab: true,
      personalizedArr: []
    }
  },
  components: {
    pageHeader
  },
  computed: {
    
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
  },
  mounted() {
    // this.getSongSheetList()
    this.getPersonalized()
    this.getSongSheetDetail('获取')
  },
  methods: {
    getPersonalized() {
      personalized().then(res => {
        this.personalizedArr = res.result
      })
    },
    handleClick(tab, event) {
      if (tab.name === '推荐') {
        this.getPersonalized()
      } else {
        this.getSongSheetDetail(this.activeName)
      }
    },
    getSongSheetDetail(val) {
      songSheetDetail({
        cat: val === '获取' ? '' : val
      }).then(res => {
        if(val === '获取') {
          this.songSheetListArr = []
          res.playlists.filter(e => this.songSheetListArr.push(e.tag))
          this.songSheetListArr = new Set(this.songSheetListArr)
        } else {
          this.songSheetListItem = res.playlists
          this.changeTab = false
          this.changeTab = true
        }
      })
    },
    getSongSheetList() {
      songSheetList().then(res => {
        this.songSheetListArr = res.tags
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .push{
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
      justify-content: space-around;
      padding: 10px 10px 8vh 10px;
      display: flex;
      flex-wrap: wrap;
      .push-item{
        padding-bottom: 28px;
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
            top: 4px;
            right: 5px;
            font-size: 12px;
          }
        }
        .push-name{
          width: 12vh;
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
  .fade-enter {
    opacity: 0;
    transform: translateX(-100%);
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
</style>
