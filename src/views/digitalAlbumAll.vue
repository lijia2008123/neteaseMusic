<template>
  <div class='main-all-cover'>
    <pageHeader :title="title" :showShare="false" :showSingerName="false"></pageHeader>
    <diskCover :bannerList="bannerList"></diskCover>
  </div>
</template>
<script>
  import { list } from '@/api/digitalAlbum'
  import pageHeader from '@/components/header'
  import diskCover from '@/components/diskCover'

  export default {
    data() {
      return {
        title: '最新上架',
        bannerList: [],
      }
    },
    components: {
      pageHeader,
      diskCover
    },
    created() {
      this.getList()
    },
    mounted() {
      
    },
    methods: {
      getList() {
        list().then(res => {
          this.bannerList = res.products
        })
      }
    }
  }
</script>
<style lang='less' scoped>
  .main-all-cover{
    padding: 20px 25px 60px 16px;
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