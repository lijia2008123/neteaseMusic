<template>
  <div class='main'>
    <div class="blocks">
      <div class="block" v-for="item in bannerList" :key="item.id">
        <div class="img">
          <img :src="item.coverUrl">
          <div class="shodows"></div>
        </div>
        <div class="msg">
          <span class="song-name">{{ formatName(item.albumName) }}</span>
          <span class="song-singer">{{ formatName(item.artistName) }}</span>
          <span class="song-price">￥{{ item.price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props: {
    bannerList: {
      type: Array,
      default: []
    },
  },
  created() {

  },
  mounted() {

  },
  methods: {
    formatName(val) {
      if(val.length > 10) {
        return `${val.slice(0, 8)}...`
      }
      return val
    }
  }
}
</script>
<style lang='less' scoped>
  .blocks{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    .block{
      padding-bottom: 20px;
      flex: 0 0 28%;
      width: 28%;
      .img{
        position: relative;
        width: 100%;
        img{
          width: 100%;
          border-radius: 7px;
        }
        .shodows{
          width: 90%;
          height: 90%;
          position: absolute;
          top: 3px;
          background: #0b0b0b;
          border-radius: 100%;
          left: 23px;
          z-index: -999;
        }
      }
      .msg{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .song-name{
          color: #47484c;
          text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            max-width: 86%;
        }
        .song-singer{
          color: #adaeb2;
          font-size: 14px;
        }
        .song-price{
          color: #c05047;
        }
      }
    }
  }
</style>