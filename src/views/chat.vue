<template>
  <div class="main">
    <pageHeader :title="nickname"></pageHeader>
    <div class="chatWindow">
      <div class="chat-content" v-for="(item, index) in msg" :key="index">
        <div class="time">
          <span>{{ item.time }}</span>
        </div>
        <div class="item" :class="{ 'item-reverse': nickname !== item.nickname }">
          <img :src="item.avatarUrl" class="user-img">
          <span class="word">{{item.msg}}</span>
        </div>
      </div>
    </div>
    <footer>
      <div class="footer-wrapper">
        <el-input placeholder="写私信..." class="input" v-model="sendWord"></el-input>
        <el-button @click="send">发送</el-button>
      </div>
    </footer>
  </div>
</template>
<script>
  import { chatDetail, sendChat } from '@/api/chat'
  import pageHeader from '@/components/header'

  export default {
    components: {
      pageHeader
    },
    data() {
      return {
        uid: null,
        msg: [],
        sendWord: ''
      }
    },
    computed: {
      nickname() {
        return this.$route.params.fromUser.nickname
      },
      toUser() {
        return this.$route.params.toUser.nickname
      }
    },
    created() {
    },
    mounted() {
      this.uid = this.$route.params.fromUser.userId
      this.getChatDetail()
    },
    methods: {
      send() {
        if(this.sendWord === '') return
        sendChat({
          user_ids: this.uid,
          msg: this.sendWord
        }).then(res => {
          this.msg.push({
            nickname: this.toUser,
            avatarUrl: this.$route.params.toUser.avatarUrl,
            msg: this.sendWord,
            time: this.formatDate(new Date())
          })
        })
      },
      getChatDetail() {
        chatDetail({ uid: this.uid }).then(res => {
          const resMsg = res.msgs.reverse()
          this.msg = []
          resMsg.forEach((e, i) => {
            let playlist = ''
            let songShare = ''
            if(JSON.parse(e.msg).msg === '' && JSON.parse(e.msg).playlist) {
              playlist = JSON.parse(e.msg).playlist.name
            } else if(JSON.parse(e.msg).msg === '' && JSON.parse(e.msg).song && JSON.parse(e.msg).song.name) {
              songShare = JSON.parse(e.msg).song
            }
            let sendMsg = {}
            sendMsg.msg = JSON.parse(e.msg).msg || playlist || `${JSON.parse(e.msg).title} - ${songShare.name}`
            sendMsg.time = this.formatDate(e.time)
            if (e.fromUser.followed === true || e.fromUser.authStatus === 1 || e.fromUser.nickname === this.toUser) {
              sendMsg.nickname = e.fromUser.nickname
              sendMsg.avatarUrl = e.fromUser.avatarUrl
              this.msg.push(sendMsg)
            } else if(e.toUser.followed === true) {
              sendMsg.nickname = e.toUser.nickname
              sendMsg.avatarUrl = e.toUser.avatarUrl
              this.msg.push(sendMsg)
            }
          })
          this.msg = this.msg
          setTimeout(() => {
            document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight
          },500)
        })
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
    .chatWindow{
      .chat-content{
        .time{
          margin: 18px 0 10px 0;
          span{
            background: #eee;
            padding: 4px 20px;
            border-radius: 16px;
            font-size: 12px;
          }
        }
        .item{
          display: flex;
          padding: 10px 8px;
          .word{
            word-break: break-all;
            max-width: 60%;
            background: #eee;
            padding: 10px 30px;
            border-radius: 36px;
            text-align: left;
          }
          .user-img{
            margin: 4px 6px 0 6px;
            width: 30px;
            height: 30px;
            border-radius: 100%;
          }
        }
        .item-reverse{
          flex-direction: row-reverse;
        }
      }
    }
    footer{
      height: 7vh;
      .footer-wrapper{
        display: flex;
        margin-top: 10px;
        border-top: 1px solid #DCDFE6;
        position: fixed;
        width: 100%;
        bottom: 0;
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
  footer{
    /*deep*/.el-input__inner{
      border: none !important;
    }
    /*deep*/.el-button{
      border: none;
    }
  }
</style>