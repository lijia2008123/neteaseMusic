<template>
  <div class='feilei-main'>
    <p class="title">{{ title }}</p>
    <div class="items">
      <div v-for="item in list" :key="item.id" class="item" @click="clickItem(item)">
        <img :src="item.pic56x56Url">
        <span>{{ item.name }}</span>
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
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: []
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    clickItem(item) {
      this.$emit('itemClick', item)
    }
  }
}
</script>
<style lang='less' scoped>
  .feilei-main{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2vh;
    .title{
      padding: 3vh 0 1vh 0;
    }
    .items{
      width: 78%;
      display: flex;
      flex-wrap: wrap;
      .item{
        width: 50%;
        height: 7vh;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img{
          width: 4vh;
          height: 4vh;
        }
      }
    }
  }
  
  
</style>