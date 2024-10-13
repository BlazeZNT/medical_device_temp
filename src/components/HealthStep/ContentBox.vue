<template>
	<view class="w-full h-full flex devicesSontent">
		<view class="left" v-if="image">
			<view class="img">
				<image style="width: 100%;height: 100%;" src="@/static/fat2.png" alt="" mode="scaleToFill" />
			</view>
		</view>
		<view class="right">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		image: {
			type: String,
			default: ''
		}
	})
</script>

<style lang="scss" scoped>
	.left {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		overflow: hidden;
	}

	.right {
		overflow: hidden;
		flex: 2;
	}

	.devicesSontent {
		width: 100%;
		height: 100%;
		display: flex;
		padding: 10rpx 20rpx;
		overflow: hidden;
		
		.img {
			width: 200rpx;
			height: 100rpx;
		}
	}

</style>