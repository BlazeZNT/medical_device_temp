<template>
	<view class="w-full h-full flex devicesSontent">
		<view class="left" v-if="image">
			<view class="img">
				<image style="width: 100%;height: 100%;" :src="image"  ref="imgRef" alt="" mode="scaleToFill" />
			</view>
		</view>
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