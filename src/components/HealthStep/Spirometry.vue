<template>
	<ContentBox image="@/static/height.jpg">
		<view class="box">
			
		</view>
	</ContentBox>
</template>

<script>
	import steps from '../../uni_modules/uview-plus/components/u-steps/steps';
	import ContentBox from './ContentBox.vue'

	export default {
		components: {
			ContentBox
		},
		data() {
			return {
				
			}
		},
		mounted() {
		},
		methods: {
			
		}
	};
</script>


<style lang="scss" scoped>
	.box {
		width: 600rpx;
		height: 600rpx;
	}

	.title {
		font-size: 36rpx;
		margin-bottom: 20rpx;
	}

	.checkItem {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 40rpx;

		.checkItemLabel {
			margin-right: 20rpx;
			font-size: 30rpx;
			width: 100%;
		}
	}

	.dataBox {
		width: 800rpx;
		height: 600rpx;
		border-radius: 20rpx;
		border: 4rpx solid #fff;
		padding: 40rpx;
		background-image: linear-gradient(to right, rgba(#fff, 0.4), rgba(#fff, 0.2));

		.showDataBox {
			display: flex;
			justify-content: space-evenly;
			font-size: 40rpx;
			font-weight: bold;
			.data {
				display: flex;
				align-items: center;
				
				color: red;
				.tip {
					font-weight: normal;
					font-size: 30rpx;
				}
			}
		}
	
	}
</style>