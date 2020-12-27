import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/search.vue')
  },
  {
    path: '/',
    name: '/',
    redirect: '/home'
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import(/* webpackChunkName: "message" */ '@/views/message.vue')
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import(/* webpackChunkName: "chat" */ '@/views/chat.vue')
  },
  {
    path: '/play',
    name: 'Play',
    component: () => import(/* webpackChunkName: "play" */ '@/views/play.vue')
  },
  {
    path: '/comment',
    name: 'Comment',
    component: () => import(/* webpackChunkName: "Comment" */ '@/views/comment.vue')
  },
  {
    path: '/everydayPush',
    name: 'EverydayPush',
    component: () => import(/* webpackChunkName: "everydayPush" */ '@/views/everydayPush.vue')
  },
  {
    path: '/songSheet',
    name: 'SongSheet',
    component: () => import(/* webpackChunkName: "songSheet" */ '@/views/songSheet.vue')
  },
  {
    path: '/rankingList',
    name: 'RankingList',
    component: () => import(/* webpackChunkName: "rankingList" */ '@/views/rankingList.vue')
  },
  {
    path: '/radio',
    name: 'Radio',
    component: () => import(/* webpackChunkName: "radio" */ '@/views/radio.vue')
  },
  {
    path: '/radio-item',
    name: 'RadioItem',
    component: () => import(/* webpackChunkName: "radio-item" */ '@/views/radio-item.vue')
  },
  {
    path: '/digitalAlbum',
    name: 'DigitalAlbum',
    component: () => import(/* webpackChunkName: "digitalAlbum" */ '@/views/digitalAlbum.vue')
  },
  {
    path: '/digitalAlbumAll',
    name: 'DigitalAlbumAll',
    component: () => import(/* webpackChunkName: "digitalAlbumAll" */ '@/views/digitalAlbumAll.vue')
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue"),
    hidden: true,
    meta: {
      title: 'NOT FOUND'
    }
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
    meta: {
      title: 'NOT FOUND'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
