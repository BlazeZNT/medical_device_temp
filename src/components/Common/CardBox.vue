<template>
	<view class="pinBox" :style="{ width: props.width }">
		<view class="pinBox_title" v-if="props.title">
			{{ props.title }}
		</view>
		<view class="pinBox_tip" v-if="props.tip">
			{{ props.tip }}
		</view>
		<view class="pinBox_content">
			<slot></slot>
		</view>
	</view>
</template>

<script setup>
	import  { ref } from 'vue' 
	
	const props = defineProps({
		width: {
			type: String,
			default: '300rpx'
		},
		tip: {
			type: String,
			default: ''
		},
		title: {
			type: String,
			default: ''
		}
	})
	
</script>

<style lang="scss" scoped>
	.pinBox {
		height: auto;
		box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
		background-color: #fff;
		border-radius: 15rpx;
		padding: 20rpx;
		max-height: 350rpx;
		overflow-x: hidden;
		overflow-y: auto;

		&_title {
			text-align: center;
			font-size: 14rpx;
			color: #202224;
			font-weight: bold;
			margin-bottom: 10rpx;
		}

		&_tip {
			text-align: center;
			font-size: 10rpx;
			color: #202224;
		}
		
		&_content {
			padding: 14rpx;
		}
	}
</style>