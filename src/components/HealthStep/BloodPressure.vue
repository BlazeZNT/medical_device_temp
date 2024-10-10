<template>
	<ContentBox image="@/static/height.jpg">
		<view class="box">
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
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: relative;

		.btn {
			padding: 20rpx;
			background: green;
			color: #fff;
			border-radius: 20rpx;
		}
	}

	.box {
		width: 400rpx;
		height: 400rpx;
		display: flex;
		flex-direction: column;

		.data-item {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			color: green;

			.num {
				font-size: 80rpx;
				margin-right: 20rpx;
			}

			.tip {
				line-height: 30rpx;
			}
		}
	}
</style>