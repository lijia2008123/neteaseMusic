<template>
  <div class="main">
    <nav>
      <div class="user-icon">
        <!-- <transition name="user-fade">
          <i class="el-icon-user icon-left" @click="userDetailOpen();isShow = false" v-if="isShow"></i>
        </transition>
        <transition name="plus-fade">
          <i class="el-icon-plus icon-left" @click="userDetailClose();isShow = true" v-if="!isShow"></i>
        </transition> -->
        <i class="el-icon-user icon-left" @click="userDetailOpen();isShow = false"></i>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="我的" name="first">
          我的
        </el-tab-pane>
        <el-tab-pane label="发现" name="second">
          发现
        </el-tab-pane>
        <el-tab-pane label="电台" name="third">
          电台
        </el-tab-pane>
      </el-tabs>
      <router-link to="/search">
        <i class="el-icon-search"></i>
      </router-link>
    </nav>
    <div>
      <el-drawer :visible.sync="drawer" :direction="direction" size="80%" :show-close="false">
        <div class="content">
          <div class="background-img" :style="{ backgroundImage: `url(${backgroundImgUrl})`}">
          </div>
          <div class="content-info">
            <div class="user-info">
              <div class="left">
                <img :src="userImg" alt="" class="user-img">
                <span class="user-name">{{ userName }}</span>
              </div>
              <div class="right" @click="signin">
                <span><i class="el-icon-location-information"></i>签到</span>
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="item" v-for="(item, index) in items" :key="index" @click="goItem(index)">
              <el-badge :value="item.num" class="num">
                <i :class="item.icon"></i>
              </el-badge>
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="content-center">

          </div>
          <div class="content-footer">
            <el-button type="text" class="el-icon-s-opportunity" @click="nightMode">夜间模式</el-button>
            <el-button type="text" class="el-icon-setting">设置</el-button>
            <el-button type="text" class="el-icon-remove-outline" @click="logout">注销</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
    
  </div>
</template>>
<script>
  import { mapGetters } from 'vuex'
  import { signin, privateMsg } from '@/api/navbar'

  export default {
    data() {
      return {
        drawer: false,
        direction: 'ltr',
        isShow: true,
        activeName: 'first',
        backgroundImgUrl: '',
        userImg: '',
        userName: '',
        items: [
          { name: '我的消息', icon: 'el-icon-message', num: '' },
          { name: '我的好友', icon: 'el-icon-user', num: '' },
          { name: '个人主页', icon: 'el-icon-house', num: '' },
          { name: '个性装扮', icon: 'el-icon-set-up', num: '' }
        ]
      }
    },
    computed: {
      ...mapGetters([
        'info'
      ])
    },
    created() {
      this.backgroundImgUrl = this.info.profile.backgroundUrl
      this.userImg = this.info.profile.avatarUrl
      this.userName = this.info.profile.nickname
    },
    mounted() {
      console.log('info',this.info)
      this.getPrivate()
    },
    methods: {
      goItem(index) {
        if (index === 0) {
          this.$router.push('/message')
        }
      },
      getPrivate() { // 获取私信
        privateMsg({
          offset: 0,
          limit: 99999
        }).then((res) => {
          this.items[0].num = res.newMsgCount
        })
      },
      signin() { // 签到
        signin({
          type: 1
        }).then((res) => {
          this.$message({
            type: 'success',
            message: `成功签到，+${res.point}云贝`,
            customClass: 'signinMsg'
          })
        }).catch((err) => {
          this.$message({
            type: 'warning',
            message: '重复签到',
            customClass: 'signinMsg'
          })
        })
      },
      logout() {
        this.$confirm('确定注销吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'dialogClass'
        }).then(() => {
          this.$store.dispatch('getLogout').then(() => {
            this.$router.push('/login')
          })
        })
      },
      nightMode() {

      },
      userDetailOpen() {
        this.drawer = true
      },
      userDetailClose() {
        console.log('ok2')
        this.drawer = false
      }
    }
  }
</script>
<style lang="less" scoped>
  .main{
    nav{
      position: relative;
      .user-icon{
        position: absolute;
        left: 24px;
        top: 13px;
        z-index: 999;
        font-size: 20px;
        .icon-left{
          position: absolute;
          top: 0;
          left: 0;
        }
        .el-icon-plus{
          transform: rotate(45deg);
        }
      }
      /deep/.el-tabs__nav{
        width: 100%;
        /deep/.el-tabs__active-bar{
          left: 106px;
        }
      }
      a{
        position: absolute;
        right: 24px;
        top: 13px;
        z-index: 999;
        font-size: 18px;
      }
    }
    /deep/.el-drawer__header{
      display: none;
    }
    .content{
      position: relative;
      height: 100vh;
      background: #ddd;
      .background-img{
        height: 160px;
        background-size: 100%;
        background-position: center;
        position: absolute;
        width: 100%;
      }
      .content-info{
        background: #fff;
        border-radius: 0 24px 0 0;
        position: absolute;
        width: 100%;
        top: 150px;
        .user-info{
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .left{
            display: flex;
            align-items: center;
            .user-img{
              width: 30px;
              height: 30px;
              border-radius: 100%;
            }
            .user-name{
              font-weight: 500;
              padding-left: 10px;
            }
          }
          .right{
            background: #DC2C1F;
            font-size: 8px;
            border-radius: 20px;
            span{
              padding: 3px 10px;
              display: inline-block;
              color: #fff;
              i{
                margin-right: 3px;
              }
            }
          }
        }
      }
      .content-item{
        position: absolute;
        top: 220px;
        background: #fff;
        display: flex;
        width: 100%;
        justify-content: space-around;
        .item{
          display: flex;
          flex-direction: column;
          width: 95%;
          justify-content: space-around;
          padding: 10px 8px;
          /deep/.el-badge__content{
            background: #dc2c1f;
            font-size: 10px;
            height: 16px;
            line-height: 16px;
            padding: 0 4px;
            right: 30px;
          }
          i{
            font-size: 24px;
            color: #DC2C1F;
          }
          span{
            font-size: 12px;
            margin-top: 3px;
            padding-bottom: 10px;
          }
        }
      }
      .content-center{

      }
      .content-footer{
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 5vh;
        background: #fff;
        position: absolute;
        left: 0;
        bottom: 0;
        button{
          /deep/span{
            margin-left: 3px;
          }
        }
      }
    }
  }
  .fade-enter {
    opacity: 0;
    transform: translateY(-50%);
  }
  .fade-leave-to {
    opacity: 0;
    transform: translateX(-50%);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .user-fade-enter {
    opacity: 0;
    transform: rotate(90deg)
  }
  .user-fade-leave-to {
    opacity: 0;
    transform: rotate(180deg);
  }
  .user-fade-enter-active, .user-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .plus-fade-enter {
    opacity: 0;
    transform: rotate(90deg) !important;
  }
  .plus-fade-leave-to {
    opacity: 0;
    transform: rotate(180deg) !important;
  }
  .plus-fade-enter-active, .plus-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
</style>
<style lang="less">
  .dialogClass{
    width: 70%;
  }
  .signinMsg{
    top: 0 !important;
  }
</style>