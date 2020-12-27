<template>
  <div class="home">
    <div class="logo">
      <div class="logo-radius">
        <i class="iconfont icon-wangyiyunyinle"></i>
      </div>
    </div>
    <div class="slogan">
      <span>网易云音乐 <i class="dot">·</i> <i>音乐的力量</i></span>
    </div>
    <div class="login">
      <el-tabs v-model="activeName">
        <el-tab-pane label="手机号登录" name="first">
          <div class="login-input">
            <el-input v-model="user.account" class="input" placeholder="请输入手机号" @blur="checkPhone" />
            <el-input v-model="user.password" class="input" type="password" show-password placeholder="请输入密码" @input="checkPassword" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="邮箱登录" name="second">
          <div class="login-input">
            <el-input v-model="user.account" class="input" placeholder="请输入邮箱" @input="checkPhone" />
            <el-input v-model="user.password" class="input" type="password" show-password placeholder="请输入密码" @blur="checkPassword" />
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-button @click="loginBtn" class="btn" :disabled="rightVal">登录</el-button>
    </div>
  </div>
</template>

<script>

import { userLogin } from '@/api/login'
import { testPhone } from '@/utils/vaild'
import { setToken, getToken, removeToken, setUid, getUid, removeUid } from '@/utils/auth'

export default {
  name: 'Home',
  data() {
    return {
      activeName: 'first',
      rightPhone: false,
      rightPasswd: false,
      user: {
        account: '',
        password: ''
      }
    }
  },
  components: {
    
  },
  computed: {
    rightVal() {
      if(this.rightPhone === true && this.rightPasswd === true) {
        return false
      }
      return true
    }
  },
  methods: {
    checkPhone() {
      if(!testPhone(this.user.account)){
        this.$message({
          message: '请输入正确的手机号！',
          type: 'warning',
          customClass: 'dialogClass'
        })
        this.rightPhone = false
        return
      }
      this.rightPhone = true
    },
    checkPassword() {
      if(this.user.password === '') {
        this.$message({
          message: '请输入密码！',
          type: 'warning',
          customClass: 'dialogClass'
        })
        this.rightPasswd = false
        return
      }
      this.rightPasswd = true
    },
    loginBtn() {
      if(this.user.account === ''){
        this.$message({
          message: '请输入正确的手机号！',
          type: 'warning',
          customClass: 'dialogClass'
        })
        return
      }else if(this.user.password === '') {
        this.$message({
          message: '请输入密码！',
          type: 'warning',
          customClass: 'dialogClass'
        })
        return
      } else {
        this.$store.dispatch('getLogin', this.user).then(() => {
          this.$router.push('/')
        })
      }
      
    }
  }
}
</script>
<style lang="less" scoped>
  .home{
<<<<<<< HEAD
    background: #de2e21;
=======
>>>>>>> f76209857145323212f01352520c602c2ac96a15
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-around;
<<<<<<< HEAD
    .logo{
      display: flex;
      justify-content: center;
      padding-top: 22vh;
      .logo-radius{
        background: #ea3024;
        border-radius: 100%;;
        width: 10vh;
        height: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
        i{
          font-size: 42px;
          color: #fdf6fe;
        }
      }
    }
    .slogan{
      font-size: 1.2rem;
      color: #eaffff;
      font-family: YouYuan;
      font-weight: 500;
      i{
        font-style: italic;
      }
      .dot{
        font-size: 12px;
        font-style: normal;
      }
    }
=======
>>>>>>> f76209857145323212f01352520c602c2ac96a15
    .login{
      display: flex;
      flex-direction: column;
      align-items: center;
      .login-input{
        margin: 0px 64px 10px 64px;
        .input{
          margin-bottom: 16px;
          /deep/.el-input__inner{
            height: 30px;
            border-radius: 20px;
            font-size: 12px;
          }
        }
      }
      .btn{
        width: 66%;
        border-radius: 20px;
        height: 30px;
        line-height: 0px;
      }
    }
  }
  /deep/.el-tabs__nav-scroll{
    display: flex;
    justify-content: center;
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
  .dialogClass{
    top: 0 !important;
    width: 70%;
  }
<<<<<<< HEAD
  .home{
    .el-tabs__item{
      color: #fdf6fe;
    }
    .el-tabs__item.is-active{
      color: #fff;
    }
    .el-tabs__active-bar{
      background-color: #fff;
    }
    .el-tabs__nav-wrap::after{
      background-color: #ea3024;
    }
  }
=======
>>>>>>> f76209857145323212f01352520c602c2ac96a15
</style>
