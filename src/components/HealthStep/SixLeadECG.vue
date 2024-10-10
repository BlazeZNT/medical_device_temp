<template>
	<ContentBox>
		<view class="box">
			<view class="dataBox">
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
			return {}
		},
		mounted() {},
		methods: {}
	};
</script>


<style lang="scss" scoped>
	.box {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
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
		width: 80%;
		height: 75%;
		border-radius: 20rpx;
		border: 4rpx solid #fff;
		padding: 40rpx;
		background: #fff;

	}
</style>