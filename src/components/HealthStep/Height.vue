<template>
	<ContentBox image="../../static/step/1.png">
		<view style="display: flex; flex-direction: column; align-items: center">
			<view class="content">
				<view class="num">
					{{ kedu }}cm
				</view>
				<swiperModel ref="refswiper" :max-value="maxValue" :ruleType="ruleType" :current="current"
					@finishRuler="finishRuler" />
			</view>
			<view class="modelbtn" @click="nextFun">
				Next
			</view>
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
		props: {
			initChange: Function,
			checkChange: Function,
			nextFun: Function
		},
		data() {
			return {
				current: 160, //刻度指向的位置
				maxValue: 200,
				ruleType: 'cm',
				kedu: 0
			};
		},
		mounted() {
			this.initChange()

			setTimeout(() => {
				this.kedu = 175
				this.checkChange()
			}, 2000)
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

	.modelbtn {
		width: 160rpx;
		height: 40rpx;
		color: #fff;
		background: #56CCF2;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20rpx;
		margin-top: 40rpx;
	}
</style>