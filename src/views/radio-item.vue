<template>
  <div class='radio-main'>
    <pageHeader :title="title" :showShare="false" :showSingerName="false"></pageHeader>
    <radioItemFenlei :title="itemTitle" :list="hotRadioItemArr" @itemClick="itemClick"></radioItemFenlei>
		<radioItemFenlei :title="itemTitle2" :list="moreRadioItemArr" @itemClick="itemClick"></radioItemFenlei>
  </div>
</template>
<script>
  import { radioItem } from '@/api/radio'
	import pageHeader from '@/components/header'
	import radioItemFenlei from '@/components/radioItemFenlei'

  export default {
    data() {
      return {
				title: '电台分类',
				itemTitle: '热门分类',
				itemTitle2: '更多分类',
				radioItemArr: [],
				hotRadioItemArr: [],
				moreRadioItemArr: [],
      }
    },
    components: {
			pageHeader,
			radioItemFenlei
    },
    created() {

    },
    mounted() {
      this.getRadioItem()
    },
    methods: {
			itemClick(item) {
				console.log('item', item);
			},
      getRadioItem() {
				radioItem().then(res => {
					this.radioItemArr = res.categories
					this.hotRadioItemArr = this.radioItemArr.filter((e, i) => i < 6)
					this.moreRadioItemArr = this.radioItemArr.filter((e, i) => i > 5)
				})
			}
    }
  }
</script>
<style lang='less' scoped>
  
</style>
<style lang="less">
  
</style>