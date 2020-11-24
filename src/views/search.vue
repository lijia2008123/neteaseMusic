<template>
  <div class="main">
    <header>
      <i class="el-icon-arrow-left" @click="goBack"></i>
      <el-select
        class="search-input"
        v-model="listQuery.searchVal"
        filterable
        remote
        clearable
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading"
        @change="searchInput">
        <el-option
          v-for="item in options"
          :key="item.keyword"
          :label="item.keyword"
          :value="item.keyword">
        </el-option>
      </el-select>
      <span class="search-btn" @click="handleSearch">搜索</span>
    </header>
    <transition name="history">
      <div class="hot-song-wapper" v-if="searchHistory.size !== 0">
        <div class="every-search">
          <span>搜索历史</span>
          <i class="el-icon-delete" @click="deleteHistory"></i>
        </div>
        <div class="hot-song history-song">
          <span v-for="(item, index) in searchHistory" :key="index" class="hot-song-item" @click="hotListClick(item)">{{ item }}</span>
        </div>
      </div>
    </transition>
    <div class="hot-song-wapper">
      <div class="every-search">大家都在搜</div>
      <div class="hot-song">
        <span v-for="(item, index) in hotList" :key="index" class="hot-song-item" :class="{ 'top-one': index === 0, 'top-two': index === 1, 'top-three': index === 2 }" @click="hotListClick(item.first)">{{ item.first }}</span>
      </div>
    </div>
      <transition name="serach-result-fade">
        <div class="serach-result" v-if="songCount && songCount !== 0">
          <div class="result-wrapper">
            <el-card v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" infinite-scroll-distance="10" style="overflow:auto;height: 72vh;">
              <div v-for="(item, index) in items" :key="time*index" class="song" @touchstart="touchstart" @touchmove='touchmove'>
                <div class="result-left">
                  <p class="name">{{ item.name }} {{ item.alia[0]}}</p>
                  <p class="singer">
                    <span v-for="(singer, i) in item.ar" :key="i">
                      {{ singer.name }}
                      <span v-if="item.ar.length !== i + 1">/</span>
                    </span>
                  </p>
                  <p class="alias">{{ item.alia[0]}}</p>
                </div>
                <div class="result-right">
                  <i class="el-icon-video-play" @click="playSong(item.id, item.al.id, item)" v-if="item.play === false"></i>
                  <i class="el-icon-video-pause" @click="pauseSong(item.id, item)" v-else></i>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </transition>
    <div v-if="songCount === 0 && listQuery.searchVal !== ''">搜索结果为空</div>
  </div>
</template>
<script>
  import { homeSearch, searchHot, searchSuggest, getSong, getAlbum } from '@/api/search'
  import { mapGetters } from 'vuex'

  // const delay = (function() { // 输入框防抖
  //   let timer = 0
  //   return function(callback, ms) {
  //     clearTimeout(timer)
  //     timer = setTimeout(callback, ms)
  //   }
  // })()

  export default {
    name: 'Search',
    data() {
      return {
        listQuery: {
          searchVal: ''
        },
        hotList: [],
        isShow: false,
        songCount: null,
        options: [],
        loading: false,
        busy: false
      }
    },
    computed: {
      ...mapGetters({
        'searchHistory':  'searchHistory',
        'songIdVal':  'songId',
        'playStatus': 'playStatus',
        'canplayVal': 'canplay',
        'playBarIsShow':  'playBarShow',
      }),
      time() {
        return new Date()
      }
    },
    watch: {
      playStatus: function(newVal, oldVal) {
        if(newVal === true) {
          this.items.forEach(e => {
            e.play = false
          })
        } else {
          this.items.forEach(e => {
            if (e.id === this.songId) {
              e.play = true
            }
          })
        }
      },
      $route(to,from){
        if(to.path === '/search') {
          this.$store.dispatch('playBarIsShow', true)
        }
      }
    },
    mounted() {
      this.getSearchHot()
    },
    methods: {
      // getSongMsg(id, song) {
      //   getSong({ id: id }).then(res => {
      //     this.$store.dispatch('songMsg', res)
      //     if(res.data[0].url === null || res.data[0].url === '') {
      //       song['play'] = false
      //       this.$store.dispatch('playStatus', true)
      //       this.$message.error('开通会员才可以播放这首歌哦~')
      //       return
      //     } else {
      //       this.$store.dispatch('playSongId', id)
      //       this.$store.dispatch('songUrlSet', res.data[0].url)
      //       this.$store.dispatch('playStatus', false)
      //       song['play'] = true
      //     }
      //   })
      // },
      // getAlbumMsg(id) {
      //   getAlbum({ id: id }).then(res => {
      //     this.$store.dispatch('albumMsg', res)
      //   })
      // },
      pauseSong(id, songItem) {
        songItem['play'] = false
        this.$store.dispatch('playSongId', id)
        this.$store.dispatch('playStatus', true)
      },
      playSong(id, alId, songItem) {
        // if(id === this.songIdVal) {
        //   this.$store.dispatch('playStatus', false)
        // }
        this.$store.dispatch('playSongId', id).then(res => {
          this.$store.dispatch('alidSet', alId).then(r => {
            setTimeout(() => {
              if(this.canplayVal) {
                this.items.forEach(e => {
                  e.play = false
                })
                songItem['play'] = true
                this.$store.dispatch('playStatus', false)
              } else {
                songItem['play'] = false
                this.$store.dispatch('playStatus', true)
              }
            }, 300)
          })
        })
        // this.items.forEach(e => {
        //   e.play = false
        // })
        // songItem['play'] = true
        // this.$store.dispatch('albumMsg', { album: { picUrl: '' } })
        // this.$store.dispatch('playingSongInfo', songItem)
        // this.getAlbumMsg(alId)
        // this.getSongMsg(id, songItem)
      },
      touchmove(e) {
        // console.log('touchmove',e)
      },
      touchstart(e) {
        // console.log('e',e)
      },
      goBack() {
        this.$router.go(-1)
      },
      deleteHistory() {
        this.$store.dispatch('addHistory', '')
      },
      loadMore() {
        this.busy = true
        this.listQuery.offset ++
        this.getList(this.listQuery.searchVal, 1)
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true
          searchSuggest({
            keywords: query,
            type: 'mobile'
          }).then((res) => {
            this.options = res.result.allMatch
            this.loading = false
          })
        } else {
          this.options = []
        }
      },
      getSearchHot() {
        searchHot().then((res) => {
          this.hotList = res.result.hots
        })
      },
      hotListClick(song) {
        this.listQuery.searchVal = song
        this.getList(song)
        this.options = []
      },
      searchInput(val) {
        this.songCount = null
        if(this.listQuery.searchVal === '') {
          this.items = []
          this.options = []
          return false
        }
        this.getList(val)
//         delay(async () => {
//           this.getList()
//         }, 1000)
      },
      getList(val, index) {
        // this.songCount = null
        if(this.listQuery.searchVal === '') {
          this.items = []
          return false
        }
        homeSearch({
          keywords: this.listQuery.searchVal,
          offset: this.listQuery.offset,
          limit: this.listQuery.limit
        }).then((res) => {
          res.result.songs.forEach(e => {
            e.play = false
          })
          if(index === 1) {
            this.items.push(...res.result.songs)
            this.busy = false
          } else {
            this.items = res.result.songs
          }
          this.songCount = res.result.songCount
          this.isShow = true
          this.$store.dispatch('addHistory', this.listQuery.searchVal)
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  header{
    display: flex;
    align-items: center;
    padding: 20px 15px;
    .el-icon-arrow-left{
      width: 8%;
    }
    .search-input{
      width: 80%;
      /deep/.el-input__inner{
        height: 30px;
        line-height: 30px;
        border-radius: 30px;
      }
      /deep/.el-input__icon{
        line-height: 30px;
      }
    }
    .search-btn{
      width: 12%;
      padding-left: 10px;
      font-size: 14px;
    }
  }
  .hot-song-wapper{
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 10px;
    .every-search{
      font-size: 12px;
      display: flex;
      margin-left: 16px;
      margin-bottom: 7px;
      align-items: center;
      justify-content: space-between;
      i{
        padding-right: 18px;
      }
    }
    .history-song{
      text-align: left;
    }
    .hot-song{
      width: 92%;
      .hot-song-item{
        background: #F5F5F5;
        padding: 5px 10px;
        margin: 6px 7px;
        border-radius: 15px;
        display: inline-block;
        font-size: 12px;
      }
    }
  }
  .serach-result{
    display: flex;
    justify-content: center;
    .result-wrapper{
      width: 92%;
      font-size: 14px;
      .song{
        padding: 7px 0;
        display: flex;
        align-items: center;
      }
      .result-left{
        text-align: left;
        width: 85%;
        .name{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .singer{
          font-size: 10px;
          padding: 2px 0;
        }
        .alias{
          font-size: 10px;
        }
      }
      .result-right{
        width: 15%;
        text-align: right;
        i{
          font-size: 18px;
          cursor: pointer;
        }
      }
    }
  }
  .top-one{
    background: #DC2C1F !important;
    color: #fff;
  }
  .top-two{
    background: #FA8072 !important;
    color: #fff;
  }
  .top-three{
    background: #FFA07A !important;
    color: #fff;
  }
  .history-enter, .history-leave-to {
    opacity: 0;
    transform: translateX(100%);
  }
  .history-enter-active, .history-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
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
  .serach-result-fade-enter {
    opacity: 0;
    transform: translateY(-6%);
  }
  .serach-result-fade-leave-to {
    opacity: 0;
    transform: translateY(-6%);
  }
  .serach-result-fade-enter-active, .serach-result-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
</style>