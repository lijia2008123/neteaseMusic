<template>
  <div class='singerDetail-main'>
    <pageHeader :showShare="false" :showSingerName="false"></pageHeader>
    <div class="main-content">
      <div class="img">
        <img :src="detail.artist.cover">
      </div>
      <div class="name-block">
        <div class="name-wrapper">
          <div class="img-cover">
            <img :src="detail.user.avatarUrl">
          </div>
          <p class="name">{{ detail.artist.name }}<img :src="detail.identify.imageUrl" alt=""></p>
          <p class="fans">
            <span class="follow">125<i> 关注</i></span>
            <span class="fans-num">366.1万<i> 粉丝</i></span>
            <span class="level">Lv.9</span>
          </p>
          <p class="title">{{ detail.identify.imageDesc }}</p>
          <div class="msg">
            <div class="btn follow">+ 关注</div>
            <div class="btn btn2 circel"><i class="iconfont icon-wodeshangquan"></i> 云圈</div>
            <div class="email el-icon-message"></div>
          </div>
        </div>
      </div>
      <div class="tabs">
        <div class="tabs-wrapper">
          <div class="tab" v-for="(tab, index) in tabs" :key="tab.id" @click="currentIndex = index">
            <div class="name"><span :class="{'name-active': index === currentIndex}">{{ tab.label }}</span><span :class="{'name-border-active': index === currentIndex}"></span></div>
            <div class="num">{{ tab.num | numberFormat }}</div>
          </div>
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <div class="tabs-content" v-if="currentIndex === 0" :key="0">
          <div class="title">艺人百科</div>
        </div>
        <div class="tabs-content" v-if="currentIndex === 1" :key="1">
          歌曲
        </div>
        <div class="tabs-content" v-if="currentIndex === 2" :key="2">
          专辑
        </div>
        <div class="tabs-content" v-if="currentIndex === 3" :key="3">
          视频
        </div>
        <div class="tabs-content" v-if="currentIndex === 4" :key="4">
          动态
        </div>
      </transition>
    </div>
    
  </div>
</template>
<script>
  import { getDetail } from '@/api/radio'
  import pageHeader from '@/components/header'
  import { singerDetail, singerDescribe, singerSimilar } from '@/api/play'

  export default {
    data() {
      return {
        currentIndex: 0,
        tabs: [
          { label: '主页', id: 0, num: '' },
          { label: '歌曲', id: 1, num: '' },
          { label: '专辑', id: 2, num: '' },
          { label: '视频', id: 3, num: '' },
          { label: '动态', id: 4, num: '' }
        ],
        detail: {
          artist: {
            cover: ''
          },
          user: {
            avatarUrl: ''
          }
        }
      }
    },
    components: {
      pageHeader
    },
    computed: {
      // userImg() {
      //   return this.detail.artist.cover
      // }
    },
    filters: {
      numberFormat(val) {
        return Number(val) > 99 ? '99+' : val
      }
    },
    async created() {
      await this.getSingerDetail()
    },
    mounted() {
      console.log('userImg', this.userImg);
    },
    methods: {
      async getSingerDetail() {
        const res = await singerDetail({ id: this.$route.params.id })
        this.detail = res.data
        this.tabs[1].num = this.detail.artist.musicSize
        this.tabs[2].num = this.detail.artist.albumSize
        this.tabs[3].num = this.detail.videoCount
        this.tabs[4].num = this.detail.eventCount
        console.log('this.tabs', this.tabs)
      }
    }
  }
</script>
<style lang='less' scoped>
  .singerDetail-main{
    .main-content{
      background: #f3f4f6;
      margin-top: -50px;
      height: 100vh;
      .img{
        width: 100%;
        img{
          width: 100%;
        }
      }
    }
    .name-block{
      display: flex;
      justify-content: center;
      margin-top: -19px;
      .name-wrapper{
        background: rgba(255,254,252,.9);
        width: 92%;
        border-radius: 20px;
        box-shadow: 0 0 10px 0px #ececec;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .img-cover{
          width: 22vw;
          margin-top: -5.5vh;
          img{
            width: 100%;
            border-radius: 100%;
          }
        }
        .name{
          font-weight: 600;
          font-size: 22px;
          img{
            height: 2vh;
            margin-left: 1vw;
          }
        }
        .fans{
          font-size: 14px;
          color: #474948;
          margin-top: 5px;
          span i{
            color: #8c8e8d;
            font-style: normal;
            font-size: 13px;
          }
          .follow{

          }
          .fans-num{
            margin: 0 5vw;
          }
          .level{

          }
        }
        .title{
          font-size: 13px;
          color: #8c8e8d;
          font-size: 14px;
          margin: 1vh 0 1.3vh 0;
        }
        .msg{
          display: flex;
          margin-bottom: 2vh;
          .btn{
            font-size: 14px;
            border-radius: 20px;
            padding: 0.6vh 3vh;
          }
          .btn2{
            padding: 0.6vh 1.6vh;
          }
          .follow{
            background: #d63c32;
            color: #fff8f7;

          }
          .circel{
            margin: 0 1vh;
            border: 1px solid #e9e9e9;
            i{
              font-size: 14px;
            }
          }
          .email{
            color: #393939;
            border: 1px solid #e9e9e9;
            border-radius: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.6vh 0.8vh;
          }
        }
      }
    }
    .tabs{
      margin: 3vh 0;
      display: flex;
      justify-content: center;
      .tabs-wrapper{
        display: flex;
        justify-content: space-between;
        width: 92%;
        .tab{
          display: flex;
          .name{
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 15px;
            color: #626262;
            .name-active{
              position: relative;
              font-weight: 600;
              z-index: 999;
            }
            .name-border-active{
              display: inline-block;
              height: .7vh;
              background: #c2413b;
              width: 110%;
              border-radius: 8px;
              margin-top: -6px;
              margin-left: -1px;
            }
          }
          .num{
            color: #999a9a;
            font-size: 10px;
          }
        }
      }
      
    }
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
  
</style>