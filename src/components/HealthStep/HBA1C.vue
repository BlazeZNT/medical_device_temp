<template>
	<ContentBox image="@/static/height.jpg">
		<view class="box">
			<view class="dataBox">
				<view class="showDataBox">
					<view class="num">5.33</view>
					<view class="tips">%</view>
				</view>
			</view>
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
		width: 500rpx;
		height: 500rpx;
		border-radius: 100%;
		border: 4rpx solid green;
		
		background-image: linear-gradient(to right, rgba(#fff, 0.4), rgba(#fff, 0.2));
		
		display: flex;
		justify-content: center;
		align-items: center;
		
		.showDataBox {
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			font-weight: bold;
			.num {
				color: green;
				font-size: 100rpx;
			}
			.tips {
				color: green;
				font-size: 50rpx;	
			}
		}
	}
</style>