<template>
  <div class="main">
    <pageHeader :title="title" :showShare="true" :showSingerName="false"></pageHeader>
    <div class="song-msg">
      <div class="song-left">
        <img :src="playSongItem.al.picUrl" >
        <div class="item-top-left-info">
          <span>{{ playSongItem.al.name }}</span>
          <span>{{ playSongItem.ar | singerName }}</span>
        </div>
      </div>
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="comment-main">
      <div class="comment-header">
        <div class="comment-left">评论区</div>
        <div class="comment-right">
        <span @click="changeComment(1)" :style="{ 'color': sortType === 1 ? '#000' : '#a9a9a9' }">推荐</span>
          <span @click="changeComment(2)" :style="{ 'color': sortType === 2 ? '#000' : '#a9a9a9' }">最热</span>
          <span @click="changeComment(3)" :style="{ 'color': sortType === 3 ? '#000' : '#a9a9a9' }">最新</span>
        </div>
      </div>
      <div class="comment-container" v-infinite-scroll="loadMore" :infinite-scroll-disabled="busy" infinite-scroll-distance="20" style="overflow:auto;height: 72vh;">
        <transition-group name="hot" mode="out-in">
          <div class="comment-hot" v-if="showComment" :key="showComment">
            <div class="item" v-for="item in commentDetail">
              <div class="item-top">
                <div class="item-top-left">
                  <img :src="item.user.avatarUrl" >
                  <div class="item-top-left-info">
                    <div class="info-name">
                      <span>{{ item.user.nickname }}</span>
                      <i class="iconfont icon-VIP" v-if="item.user.vipType !== 0"></i>
                    </div>
                    <span>{{ formatDate(item.time) }}</span>
                  </div>
                </div>
                <div class="item-top-right">
                  <span>{{ item.likedCount }}</span>
                  <i class="iconfont icon-zansel" @click="getCommentLike(item, false)"  v-if="item.liked"></i>
                  <i class="iconfont icon-dianzan" @click="getCommentLike(item, true)"  v-else></i>
                </div>
              </div>
              <div class="item-center">
                {{ item.content }}
              </div>
              <div class="item-bottom" @click="seeReply(item);commentId = item" v-if="item.showFloorComment.replyCount !== 0">
                {{ item.showFloorComment.replyCount }} 条回复>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
      <div class="comment-drawer">
        <el-drawer :visible.sync="drawer" direction="btt" custom-class="floor-drawer" :show-close="false" @closed="handleClose">
          <div class="drawer-header">
            <el-row class="row">
              <el-col :span="12" class="left">
                <i class="el-icon-back" @click="goBack"></i>
                <div class="left-title">
                  <div class="title">回复({{ floorOwen.totalCount }})</div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="item">
            <div class="item-top">
              <div class="item-top-left">
                <img :src="floorOwen.ownerComment.user.avatarUrl" >
                <div class="item-top-left-info">
                  <div class="info-name">
                    <span>{{ floorOwen.ownerComment.user.nickname }}</span>
                    <i class="iconfont icon-VIP" v-if="floorOwen.ownerComment.user.vipType !== 0"></i>
                  </div>
                  <span>{{ formatDate(floorOwen.ownerComment.time) }}</span>
                </div>
              </div>
              <div class="item-top-right">
                <span>{{ floorOwen.ownerComment.likedCount }}</span>
                <i class="iconfont icon-zansel" @click="getCommentLike(floorOwen.ownerComment, false)"  v-if="floorOwen.ownerComment.liked"></i>
                <i class="iconfont icon-dianzan" @click="getCommentLike(floorOwen.ownerComment, true)"  v-else></i>
              </div>
            </div>
            <div class="item-center">
              {{ floorOwen.ownerComment.content }}
            </div>
          </div>
          <div class="line"></div>
          <p class="all-rever">全部回复</p>
          <div v-infinite-scroll="loadMoreRevent" :infinite-scroll-disabled="busy2" infinite-scroll-distance="10" style="overflow:auto;height: 72vh;">
            <div class="item" v-for="item in seeReplyList" style="border-bottom: 1px solid #eee;">
              <div class="item-top">
                <div class="item-top-left">
                  <img :src="item.user.avatarUrl" >
                  <div class="item-top-left-info">
                    <div class="info-name">
                      <span>{{ item.user.nickname }}</span>
                      <i class="iconfont icon-VIP" v-if="item.user.vipType !== 0"></i>
                    </div>
                    <span>{{ formatDate(item.time) }}</span>
                  </div>
                </div>
                <div class="item-top-right">
                  <span>{{ item.likedCount }}</span>
                  <i class="iconfont icon-zansel" @click="getCommentLike(item, false)"  v-if="item.liked"></i>
                  <i class="iconfont icon-dianzan" @click="getCommentLike(item, true)"  v-else></i>
                </div>
              </div>
              <div class="item-center">
                {{ item.content }}
              </div>
            </div>
          </div>
        </el-drawer>
      </div>
    </div>
  </div>
</template>
<script>
  import { comment, commentLike, commentFloor } from '@/api/comment'
  import pageHeader from '@/components/header'
  import { mapGetters } from 'vuex'
  import baseMixin from "@/mixin"

  export default {
    mixins: [baseMixin],
    components: {
      pageHeader
    },
    data() {
      return {
        drawer: false,
        busy: false,
        busy2: false,
        cursor: null,
        pageNo: 1,
        sortType: 1,
        isLike: false,
        showComment: true,
        showHot: true,
        commentDetail: [],
        total: 0,
        seeReplyList: [],
        floorOwen: {
          ownerComment: {
            user: {
              avatarUrl: ''
            }
          }
        },
        comment: {},
        hasMore: true
      }
    },
    computed: {
      ...mapGetters({
        'songIdVal':  'songId',
        'playSongItem': 'playSong'
      }),
      title() {
        return `评论 (${this.total})`
      }
    },
    created() {
      this.getComment()
      console.log('playSongItem',this.playSongItem)
    },
    mounted() {
      
    },
    methods: {
      goBack() {
        this.drawer = false
      },
      loadMore() {
        if(this.hasMore !== false) {
          this.busy = true
          this.pageNo ++
          this.getComment()
        }
      },
      loadMoreRevent() {
        this.busy2 = true
        this.seeReply(this.commentId)
      },
      handleClose() {
        console.log('ok')
        this.floorOwen =  {
          ownerComment: {
            user: {
              avatarUrl: ''
            }
          }
        }
        this.seeReplyList = []
      },
      seeReply(item) {  // 查看回复
        commentFloor({
          parentCommentId: item.commentId,
          id: this.songIdVal,
          type: 0,
          time: this.seeReplyList.length !== 0 ? this.seeReplyList[this.seeReplyList.length - 1].time : 0
        }).then(res => {
          this.drawer = true
          if(res.data.ownerComment !== null) {
            this.floorOwen = res.data
          }
          this.hasMore = res.data.hasMore
          this.seeReplyList.push(...res.data.comments)
          this.busy2 = false
        })
      },
      getCommentLike(item, isLike) { // 评论点赞
        isLike ? item.liked = true : item.liked = false
        commentLike({
          id: this.songIdVal,
          cid: item.commentId,
          t: isLike ? 1 : 0,
          type: 0
        }).then(res => {
          
        })
      },
      changeComment(type) {
        this.showComment = false
        this.sortType = type
        if(this.sortType === 3) {
          this.cursor = this.commentDetail[this.commentDetail.length - 1].time
        }
        this.commentDetail = []
        this.getComment()
      },
      getComment() {
        comment({
          id: this.songIdVal,
          type: 0,
          pageNo: this.pageNo,
          sortType: this.sortType,
          cursor: this.sortType === 3 && this.pageNo !== 1 ? this.cursor : ''
        }).then(res => {
          this.total = res.data.totalCount
          if(this.pageNo === 1 && res.data.comments.length !== 0) {
            this.commentDetail = res.data.comments
          } else if(this.pageNo !== 1 && res.data.comments.length !== 0) {
            this.commentDetail.push(...res.data.comments)
          } else {
            // this.$message.error('已经是最后一页了')
          }
          this.busy = false
        }).finally(() => {
          this.showComment = true
          console.log('this.commentDetail', this.commentDetail)
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .song-msg{
    display: flex;
    justify-content: space-between;
    padding: 18px;
    align-items: center;
    .song-left{
      display: flex;
      img{
        width: 70px;
        height: 70px;
        border-radius: 8px;
      }
      .item-top-left-info{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        padding: 14px;
        span:last-child{
          font-size: 14px;
          color: #6495ED;
        }
      }
    }
    .el-icon-arrow-right{
      font-size: 20px;
      color: #808080;
    }
  }
  .comment-main{
    .comment-header{
      display: flex;
      justify-content: space-between;
      margin-top: 18px;
      .comment-left{
        margin-left: 18px;
      }
      .comment-right{
        margin-right: 18px;
        color: #A9A9A9;
        span:nth-child(2), span:last-child{
          margin-left: 15px;
        }
      }
    }
    .comment-container{
      margin-top: 15px;
      .comment-hot{
        margin-bottom: 10vh;
        .item{
          font-size: 14px;
          border-bottom: 1px solid #eee;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 10px 18px 10px 18px;
          .item-top{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            .item-top-left{
              color: #808080;
              display: flex;
              img{
                width: 36px;
                height: 36px;
                border-radius: 100%;
                margin-right: 8px;
              }
              .item-top-left-info{
                text-align: left;
                display: flex;
                flex-direction: column;
                .info-name{
                  display: flex;
                  align-items: center;
                  span:first-child{
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                    max-width: 80%;
                  }
                  .icon-VIP{
                    margin-left: 5px;
                    color: #FF4500;
                    font-size: 26px;
                  }
                }
                span:last-child{
                  font-size: 12px;
                }
              }
            }
            .item-top-right{
              span{

              }
              i{
                margin-left: 3px;
              }
              .icon-zansel{
                color: #D43A31;
              }
            }
          }
          .item-center{
            text-align: left;
            margin-left: 40px;
            margin-top: 4px;
          }
          .item-bottom{
            margin-left: 40px;
            font-size: 12px;
            color: #6495ED;
            margin-top: 5px;
          }
        }
      }
    }
    .comment-drawer{
      .drawer-header{
        height: 6vh;
        display: flex;
        align-items: center;
        .row{
          width: 100%;
          .left{
            display: flex;
            padding-left: 7px;
            .el-icon-back{
              font-size: 20px;
            }
            .left-title{
              padding-left: 12px;
              .title{

              }
            }
          }
        }
      }
      .item{
        font-size: 14px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 10px 18px 10px 18px;
        .item-top{
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          .item-top-left{
            color: #808080;
            width: 80%;
            display: flex;
            img{
              width: 36px;
              height: 36px;
              border-radius: 100%;
              margin-right: 8px;
            }
            .item-top-left-info{
              width: 100%;
              text-align: left;
              display: flex;
              flex-direction: column;
              .info-name{
                display: flex;
                align-items: center;
                span:first-child{
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  max-width: 80%;
                }
                .icon-VIP{
                  margin-left: 5px;
                  color: #FF4500;
                  font-size: 26px;
                }
              }
              span:last-child{
                font-size: 12px;
              }
            }
          }
          .item-top-right{
            span{

            }
            i{
              margin-left: 3px;
            }
            .icon-zansel{
              color: #D43A31;
            }
          }
        }
        .item-center{
          text-align: left;
          margin-left: 40px;
          margin-top: 4px;
        }
        .item-bottom{
          margin-left: 40px;
          font-size: 12px;
          color: #6495ED;
          margin-top: 5px;
        }
      }
      .line{
        height: 1vh;
        background: #eee;
        width: 100vh;
        margin: 5px -15px;
        padding: 5px 10px;
      }
      .all-rever{
        text-align: left;
        font-weight: 500;
        font-size: 14px;
        padding-left: 10px;
      }
    }
  }
  .hot-enter {
    opacity: 0;
    transform: translateX(-50%);
  }
  .hot-leave-to {
    opacity: 0;
    // transform: translateX(-50%);
  }
  .hot-enter-active, .hot-leave-active {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
</style>
<style lang="less">
  /*deep*/.floor-drawer{
    border-radius: 28px 28px 0 0;
    height: 90% !important;
    padding: 10px 15px !important;
    .el-drawer__header{
      display: none;
    }
  }
</style>