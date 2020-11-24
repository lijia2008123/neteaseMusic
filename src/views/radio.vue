<template>
  <div class='radio-main'>
    <pageHeader :title="title" :showShare="false" :showSingerName="false"></pageHeader>
    <div class="block-wrapper">
      <div class="bg"></div>
      <el-carousel trigger="click" height="18vh" :autoplay="false">
        <el-carousel-item v-for="item in bannerList" :key="item.targetId">
          <div class="banner" @click="bannerClick(item)">
            <img :src="item.pic" class="banner-img" />
            <span class="banner-title" style="background: '#DC2C1F'">{{ item.typeTitle }}</span>
          </div>
        </el-carousel-item>
      </el-carousel>
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
        bannerList: []
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
  }
  /*deep*/.el-carousel__container{
    height: 30vh !important;
  }
</style>
<style lang="less">
  .radio-main{
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