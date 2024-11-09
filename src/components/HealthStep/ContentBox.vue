<template>
	<view class="w-full h-full flex devicesSontent">
		<view class="right">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue' 
	const props = defineProps({
		image: {
			type: String,
			default: ''
		},
		showImg: {
			type: Boolean,
			default: true
		}
	})
	
	onMounted(() => {
	})
</script>

<style lang="scss" scoped>
	.left {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		overflow: hidden;
		
		.img {
			width: 300rpx;
			height: 240rpx;
		}
	}

	.right {
		overflow: hidden;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.devicesSontent {
		width: 100%;
		height: 100%;
		display: flex;
		padding: 10rpx 20rpx;
		overflow: hidden;
		
		
	}

</style>