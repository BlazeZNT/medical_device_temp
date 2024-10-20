<template>
	<ContentBox image="../../static/step/1.png">
		<view class="content">
			<view class="num">
				{{ kedu }}cm
			</view>
			<swiperModel ref="refswiper" :max-value="maxValue" :ruleType="ruleType" :current="current"
				@finishRuler="finishRuler" />
		</view>
	</ContentBox> 
</template>

<script>
	import ContentBox from '@/components/HealthStep/ContentBox.vue'
	import swiperModel from "@/components/swiper-ruler.vue";
	export default {
		components: {
			ContentBox,
			swiperModel
		},
		data() {
			return {
				current: 160, //刻度指向的位置
				maxValue: 200,
				ruleType: 'cm',
				kedu: 0
			};
		},
		methods: {
			// 刻度尺滚动绑定
			finishRuler(e) {
				this.kedu = e
			},
		},
	};
</script>


<style lang="scss" scoped>
.content {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	flex-direction: column;
	.num {
		color: #fff;
		font-size: 24rpx;
		margin-bottom: 20rpx;
	}
}
</style>