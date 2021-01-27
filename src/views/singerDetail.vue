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
          <p class="name">{{ detail.artist.name }}</p>
          <p class="fans">366.1万<span>粉丝</span></p>
          <div class="msg">

          </div>
        </div>
      </div>
      <div class="tabs">

      </div>
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
        detail: {}
      }
    },
    components: {
      pageHeader
    },
    created() {
      console.log(this.$route.params.id);
    },
    mounted() {
      this.getSingerDetail()
    },
    methods: {
      getSingerDetail() {
        singerDetail({ id: this.$route.params.id }).then(res => {
          this.detail = res.data
          console.log('res', this.detail);
        })
      }
      
    }
  }
</script>
<style lang='less' scoped>
  .singerDetail-main{
    .main-content{
      margin-top: -50px;
      .img{
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
        height: 16vh;
        box-shadow: 0 0 2px 0px #ececec;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .img-cover{
          .cover{
            
          }
        }
        .name{
          font-weight: 600;
          font-size: 22px;
        }
        .fans{
          font-size: 14px;
          color: #474948;
          margin-top: 5px;
          span{
            color: #8c8e8d;
          }
        }
      }
    }
  }
</style>
<style lang="less">
  
</style>