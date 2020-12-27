<template>
	<div class="ranking-main">
		<pageHeader :title="title" :showShare="false" :showSingerName="false"></pageHeader>
		<div class="container">
<<<<<<< HEAD
			<div class="wrapper" v-for="item in list" :key="item.id" v-if="item.tracks.length  !== 0">
=======
			<div class="wrapper" v-for="(item, index) in list" :key="item.id" v-if="item.tracks.length  !== 0">
>>>>>>> f76209857145323212f01352520c602c2ac96a15
				<div class="img">
					<img :src="item.coverImgUrl">
					<span>{{ item.updateFrequency }}</span>
				</div>
				<div class="list">
<<<<<<< HEAD
					<span v-for="(song, i) in item.tracks" :key="i">
						{{ `${ i + 1 }.${ formatName(song.first) }-${ formatName(song.second) }` }}
=======
					<span v-for="(song, i) in item.tracks">
						{{ `${ i + 1 }.${ song.first }-${ song.second }` }}
>>>>>>> f76209857145323212f01352520c602c2ac96a15
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { toplist } from '@/api/rankingList'
	import pageHeader from '@/components/header'
	export default {
		data() {
			return {
				title: '排行榜',
				list: []
			}
		},
		components: {
	    pageHeader
	  },
	  mounted() {
	  	this.getList()
	  },
	  methods: {
		formatName(val) {
			if(val.length > 10) {
				return `${val.slice(0, 10)}...`
			}
			return val
		},
	  	getList() {
	  		toplist().then(res => {
	  			this.list = res.list
	  		})
	  	}
	  }
	}
</script>
<style lang="less" scoped>
	.ranking-main{
		.container{
			padding-top: 20px;
			.wrapper{
				padding: 0 18px 18px 18px;
				display: flex;
	    	justify-content: flex-start;
				.img{
					position: relative;
					img{
						width: 13vh;
	    			border-radius: 8px;
					}
					span{
				    font-size: 12px;
				    position: absolute;
				    bottom: 11px;
				    left: 6px;
				    color: #fff;
					}
				}
				.list{
					margin-top: 10px;
    			margin-bottom: 10px;
					font-size: 14px;
    			justify-content: space-around;
					display: flex;
			    flex-direction: column;
			    align-items: flex-start;
					span{
						padding-bottom: 5px;
						padding-bottom: 12px;
    				padding-left: 18px;
					}
				}
			}
		}
	}
</style>