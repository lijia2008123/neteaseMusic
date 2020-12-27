<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <keep-alive include="Search, Home">
        <router-view/>
      </keep-alive>
    </transition>
    <playBar :isShow="playBarIsShow" v-if="showBar" />
    <player v-if="showBar" />
  </div>
</template>
<script>
  import playBar from '@/components/playBar'
  import player from '@/components/player'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        showBar: true
      }
    },
    components: {
      playBar,
      player
    },
    computed: {
      ...mapGetters({
        'playBarIsShow':  'playBarShow',
      })
    },
    watch:{
      $route(to,from){
        if(to.path === '/login') {
          this.showBar = false
        } else {
          this.showBar = true
        }
      }
    }
  }
</script>
<style lang="less">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    overflow: hidden;
  }
  *{
    margin: 0;
    padding: 0;
  }
  /*deep*/ .el-message{
    min-width: 270px !important;
    padding: 10px 15px 10px 20px !important;
  }
  /*deep*/ .el-drawer:focus {
    outline: none !important;
  }
</style>
