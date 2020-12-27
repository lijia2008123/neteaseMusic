<template>
  <div class='digitalAlbum-main'>
    <pageHeader :title="title" :showShare="false" :showSingerName="false"></pageHeader>
    <div class="block-wrapper">
      <el-carousel trigger="click" height="37vh" :autoplay="false">
        <el-carousel-item v-for="item in bannerList" :key="item.targetId">
          <div class="banner" @click="bannerClick(item)">
            <img :src="item.coverUrl" class="banner-img" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="radius">
      <div class="radius-item" v-for="item in ballList" :key="item.id" @click="clickBall(item)">
        <div class="radius-img">
          <span v-if="item.name === '已购'">￥</span>
          <i :class="item.icon"></i>
        </div>
        <span class="radius-title">{{ item.name }}</span>
      </div>
    </div>
    <div class="new-in">
      <div class="new-in-title">
        <h4 @click="goAll">最新上架</h4><i class="el-icon-arrow-right"></i>
      </div>
      <diskCover :bannerList="bannerList"></diskCover>
    </div>
  </div>
</template>
<script>
  import { list } from '@/api/digitalAlbum'
  import pageHeader from '@/components/header'
  import diskCover from '@/components/diskCover'

  export default {
    data() {
      return {
        title: '数字专辑',
        bannerList: [],
        ballList: [
          { name: '畅销榜', icon: 'iconfont icon-paihangbang' },
          { name: '语种风格馆', icon: 'iconfont icon-041siyecao' },
          { name: '已购', icon: 'iconfont icon-ttpodicon' }
        ]
      }
    },
    components: {
      pageHeader,
      diskCover
    },
    created() {

    },
    mounted() {
      this.getList()
    },
    methods: {
      goAll() {
        this.$router.push('/digitalAlbumAll')
      },
      bannerClick(item) {

      },
      getList() {
        list({ limit: 6 }).then(res => {
          this.bannerList = res.products
        })
      }
    }
  }
</script>
<style lang='less' scoped>
  .digitalAlbum-main{
    .block-wrapper{
      .banner{
        height: 100%;
        .banner-img{
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
    }
    .radius{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 30px;
      padding-left: 19px;
      padding-right: 19px;
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
          // background: #262626;
          color: #fff;
          border-radius: 100%;
          height: 6vh;
          width: 6vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          font-size: 22px;
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
          i{
            font-size: 22px;
          }
        }
        .radius-title{
          margin-top: 5px;
          font-size: 14px;
        }
      }
    }
    .new-in{
      padding-right: 13px;
      margin-top: 15px;
      margin-bottom: 60px;
      .new-in-title{
        text-align: left;
        display: flex;
        align-items: center;
        padding: 13px 0;
        h4{
          line-height: 20px;
        }
        i{
          line-height: 20px;
        }
      }
    }
  }
  /*deep*/.el-carousel__container{
    height: 30vh !important;
  }
</style>
<style lang="less">
  .digitalAlbum-main{
    padding-left: 16px;
    padding-right: 16px;
    /*deep*/.el-carousel{
      padding: 16px 0 0px 0;
      height: 37vh;
    }
    .el-carousel__indicators{
      bottom: 6px;
    }
    .el-carousel__container{
      height: 100%;
    }
    /*deep*/.el-carousel__indicators{
      display: flex;
    }
    /*deep*/.el-carousel__indicators--horizontal {
      bottom: 14px;
    }
    /*deep*/.el-carousel__button{
      width: 6px !important;
      height: 6px;
      border-radius: 100%;
      background: #DC2C1F;
      opacity: .3;
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