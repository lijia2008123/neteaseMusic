<template>
  <div class='radio-main'>
    <pageHeader :title="title" :showShare="false" :showSingerName="false"></pageHeader>
    <div class="block-wrapper">
      <div class="bg"></div>
      <el-carousel trigger="click" :autoplay="false">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <div class="banner" @click="bannerClick(item)">
            <img :src="item.pic" class="banner-img" />
            <span class="banner-title" style="background: '#DC2C1F'">{{ item.typeTitle }}</span>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="radius">
      <div class="radius-item" v-for="item in ballList" :key="item.id" @click="clickBall(item.name)">
        <div class="radius-img">
          <i :class="item.icon" class="iconfont"></i>
        </div>
        <span class="radius-title">{{ item.name }}</span>
      </div>
    </div>
    
  </div>
</template>
<script>
  import { getBanner } from '@/api/radio'
  import pageHeader from '@/components/header'

  export default {
    data() {
      return {
        title: '电台',
<<<<<<< HEAD
        bannerList: [],
        ballList: [
          { name: '电台分类', icon: 'icon-041siyecao' },
          { name: '电台排行', icon: 'icon-list' },
          { name: '付费精品', icon: 'icon-huangguan' },
          { name: '声之剧场', icon: 'icon-ju' }
        ]
=======
        bannerList: []
>>>>>>> f76209857145323212f01352520c602c2ac96a15
      }
    },
    components: {
      pageHeader
    },
    created() {

    },
    mounted() {
      this.getBannerDetail()
    },
    methods: {
<<<<<<< HEAD
      clickBall(name) {
        if(name === '电台分类') {
          this.$router.push('/radio-item')
        }
      },
      bannerClick() {

      },
=======
>>>>>>> f76209857145323212f01352520c602c2ac96a15
      getBannerDetail() {
        getBanner().then(res => {
          this.bannerList = res.data
        })
      }
    }
  }
</script>
<style lang='less' scoped>
  .radio-main{
    .block-wrapper{
      // padding: 18px;
      position: relative;
      .bg{
        background: #D43A31;
<<<<<<< HEAD
        // background: #262626;
=======
        background: #262626;
>>>>>>> f76209857145323212f01352520c602c2ac96a15
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
          background: #DC2C1F;
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
<<<<<<< HEAD
    .radius{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 6px;
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
            font-size: 25px;
          }
        }
        .radius-title{
          margin-top: 5px;
          font-size: 14px;
        }
      }
    }
=======
>>>>>>> f76209857145323212f01352520c602c2ac96a15
  }
  /*deep*/.el-carousel__container{
    height: 30vh !important;
  }
</style>
<style lang="less">
  .radio-main{
    /*deep*/.el-carousel{
      padding: 16px 16px 0px 16px;
<<<<<<< HEAD
      height: 22vh;
=======
      height: 18vh;
>>>>>>> f76209857145323212f01352520c602c2ac96a15
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