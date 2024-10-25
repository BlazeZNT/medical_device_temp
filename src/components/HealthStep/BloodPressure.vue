<template>
	<ContentBox image="../../static/step/6.png" :showImg="showImg">
		<view class="model" v-if="!showImg">
			<view class="content">
				<view class="title">
					Steps to follow:
				</view>
				<view class="tips">
					<text>1. Wear the cuff over your arm</text>
					<text>2. Press the start button on the blood pressure device</text>
				</view>
			</view>
			<view class="modelbtn" @click="handleClickStart">
				Start
			</view>
		</view>
		<view class="box" v-else>
			<view class="data-item">
				<view class="num">{{num1}}</view>
				<view class="tip">SYS<br />mmHg</view>
			</view>
			<view class="data-item">
				<view class="num">{{num2}}</view>
				<view class="tip">DIA<br />mmHg</view>
			</view>
			<view class="data-item">
				<view class="num">{{num3}}</view>
				<view class="tip">PUL<br />bpm</view>
			</view>
		</view>
	</ContentBox>
</template>

<script>
	import ContentBox from './ContentBox.vue'

	export default {
		components: {
			ContentBox
		},
		data() {
			return {
				num1: this.getRandomNumber(),
				num2: this.getRandomNumber(),
				num3: this.getRandomNumber(),
				showImg: false
			}
		},
		mounted() {
			this.interval = setInterval(() => {
				this.updateValues();
			}, 1000); // 每隔1秒更新一次
		},
		unMounted() {
			clearInterval(this.interval); // 组件销毁时清除定时器
		},
		methods: {
			handleClickStart() {
				this.showImg = true
			},
			getRandomNumber() {
				return Math.floor(Math.random() * (200 - 20 + 1)) + 20;
			},
			updateValues() {
				this.num1 = this.getRandomNumber();
				this.num2 = this.getRandomNumber();
				this.num3 = this.getRandomNumber();
			},
		}
	};
</script>


<style lang="scss" scoped>
	.functional {
		width: 100%;
		height: 100%;
		position: relative;

		.btn {
			padding: 20rpx;
			background: #04FF00;
			color: #fff;
			border-radius: 20rpx;
		}
	}

	.box {
		width: 200rpx;
		height: 200rpx;
		display: flex;
		flex-direction: column;
		background: #fff;
		border-radius: 20rpx;
		padding: 20rpx;

		.data-item {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			color: #4880FF;

			.num {
				font-size: 40rpx;
				margin-right: 10rpx;
			}

			.tip {
				line-height: 15rpx;
				color: #333;
				width: 50rpx;
			}
		}
	}

	.model {
		width: 70%;
		height: 80%;
		transform: translateY(-30rpx);
		display: flex;
		flex-direction: column;
		align-items: center;

		.content {
			background: #fff;
			border-radius: 20rpx;
			width: 100%;
			height: 100%;
			margin-bottom: 20rpx;
			padding: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.title {
				font-size: 28rpx;
				color: #4880FF;
				margin-bottom: 20rpx;
			}

			.tips {
				font-size: 24rpx;
				display: flex;
				flex-direction: column;

				text {
					margin-bottom: 10rpx;
				}
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
		}
	}
</style>