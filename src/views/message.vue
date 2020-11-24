<template>
  <div class="main">
    <pageHeader :title="title" :functionBtn="functionBtn" @search="search" @funcBtn="funcBtn" :showRight="showRight" />
    <div class="items">
      <div class="item" v-for="(item, index) in items" :key="index">
        <span :class="item.icon" class="icon" :style="{'background': item.background}"></span>
        <span class="name">{{ item.name }}</span>
      </div>
    </div>
    <div class="message">
      <div class="item" v-for="(msg, index) in messages" :key="index" @click="openChat(msg)">
        <div class="img">
          <img :src="msg.fromUser.avatarUrl">
          <span v-if="msg.fromUser.vipType !== 0 || msg.fromUser.userType !== 0">V</span>
        </div>
        <div class="info">
          <div class="info-top">
            <div class="title">{{ msg.fromUser.nickname }}</div>
            <div class="date">{{ formatDate(msg.lastMsgTime) }}</div>
          </div>
          <div class="info-bottom">
            <div class="content">{{ msg.lastMsg | formatTitle }}</div>
            <div class="num" v-if="msg.newMsgCount !== 0">{{ msg.newMsgCount }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import pageHeader from '@/components/header'
  import { list } from '@/api/message'

  export default {
    data() {
      return {
        showRight: true,
        title: '消息',
        functionBtn: '标为已读',
        items: [
          { name: '粉丝', icon: 'el-icon-user-solid', background: '#FE2B54' },
          { name: '评论', icon: 'el-icon-s-comment', background: '#59B5E6' },
          { name: '@我', icon: 'el-icon-s-promotion', background: '#FA6A4F' },
          { name: '通知', icon: 'el-icon-message-solid', background: '#FEBC20' }
        ],
        messages: []
      }
    },
    components: {
      pageHeader
    },
    filters: {
      formatTitle(val) {
        if (val) {
          let newVal = JSON.parse(val)
          return newVal.msg
        }
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      openChat(msg) {
        this.$router.push({ name: 'Chat', params: msg })
      },
      getList() {
        list({
          offset: 0,
          limit: 99999
        }).then((res) => {
          this.messages = res.msgs
        }).catch((err) => {

        })
      },
      search() {

      },
      funcBtn() {

      },
      formatDate(dateVal) { // 时间戳转时间
        let date = new Date(dateVal)
        let Y = date.getFullYear() + '年'
        let M = date.getMonth() + 1 + '月'
        let D = date.getDate() + '日'
        // let h = date.getHours()  + 1 < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
        // let m = date.getMinutes()  + 1 < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
        // let s = date.getSeconds()  + 1 < 10 ? '0' + date.getSeconds() : date.getSeconds()
        if (new Date().getFullYear() === date.getFullYear()) {
          return M + D
        }
        return Y + M + D
      }
    }
  }
</script>
<style lang="less" scoped>
  .main{
    .items{
      display: flex;
      justify-content: space-around;
      .item{
        display: flex;
        flex-direction: column;
        padding: 20px 0;
        .icon{
          font-size: 30px;
          border-radius: 100%;
          padding: 10px;
          color: #fff;
        }
        .name{
          color: #262626;
          font-size: 14px;
          margin-top: 8px;
        }
      }
    }
    .message{
      .item{
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #262626;
        padding: 13px 20px;
        border-bottom: 1px solid #eee;
        .img{
          width: 50px;
          height: 50px;
          border-radius: 100%;
          position: relative;
          display: flex;
          img{
            width: 100%;
            height: 100%;
            border-radius: 100%;
          }
          span{
            position: absolute;
            bottom: 2px;
            left: 36px;
            border-radius: 100%;
            background: red;
            width: 15px;
            height: 15px;
            text-align: center;
            color: #fff;
            font-family: fangsong;
            line-height: 18px;
          }
        }
        .info{
          width: 79%;
          padding-left: 13px;
          .info-top,.info-bottom{
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .content{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 85%;
            text-align: left;
          }
          .num{
            width: 15px;
            height: 15px;
            background: red;
            border-radius: 100%;
            color: #fff;
            text-align: center;
            font-size: 12px;
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
</style>>