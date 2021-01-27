<template>
  <div class="main">
    <el-row class="row" :style="{ background: $route.path === '/play' || $route.path === '/singerDetail' ? '' : '#D43A31' }">
      <el-col :span="showShare ? 12 : 24" class="left">
        <i class="el-icon-back" @click="goBack"></i>
        <div class="left-title">
          <div class="title">{{ title }}</div>
          <div class="singer-name" v-if="showSingerName" @click="singerDetail">{{ singerName }}<i class="el-icon-arrow-right"></i></div>
        </div>
      </el-col>
      <el-col :span="12" class="right" v-if="showRight">
        <span @click="funcBtn">{{ functionBtn }}</span>
        <i class="el-icon-search" @click="search"></i>
      </el-col>
      <el-col :span="12" class="right" v-if="showShare">
        <i class="el-icon-share" @click="share"></i>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      singerName: {
        type: String,
        default: '' 
      },
      title: {
        type: String,
        default: '' 
      },
      showSingerName: {
        type: Boolean,
        default: true 
      },
      functionBtn: {
        type: String,
        default: '' 
      },
      showRight: {
        type: Boolean,
        default: false 
      },
      showShare: {
        type: Boolean,
        default: false 
      }
    },
    methods: {
      singerDetail() {
        this.$emit('singerDetail')
      },
      goBack() {
        this.$router.go(-1)
      },
      funcBtn() {
        this.$emit('funcBtn')
      },
      search() {
        this.$emit('search')
      },
      share() {
        this.$emit('share')
      }
    }
  }
</script>
<style lang="less" scoped>
  .main{
    height: 6vh;
    color: #fff;
    .row{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 6vh;
      z-index: 999;
      display: flex;
      align-items: center;
      .left{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 22px;
        i{
          font-size: 20px;
        }
        .left-title{
          width: 100%;
          text-align: left;
          padding-left: 12px;
          .title{
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .singer-name{
            font-size: 14px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            max-width: 80%;
            i{
              font-size: 12px;
            }
          }
        }
      }
      .right{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 22px;
        i{
          font-size: 18px;
        }
        .el-icon-share{
          font-size: 22px;
        }
        span{
          margin-right: 12px;
          padding: 1px 9px;
          font-size: 12px;
          border: 1px solid	#DC143C;
          border-radius: 20px;
        }
      }
    }
  }
</style>