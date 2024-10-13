<template>
	<view class="w-full h-full flex devicesSontent">
		<view class="left flex-1 flex justify-center items-center" v-if="image">
			<view class="img" style="width: 100px;height: 100px;">
				<img src="@/static/fat2.png" alt="" />
			</view>
		</view>
		<view class="right flex-1">
			<view class="functional">
				<slot></slot>
				<view class="devicesStatus">
					<view>Devices Statistics</view>
					<view class="flex items-center">
						<view>
							connected
						</view>
						<view class="dot"></view>
					</view>
				</view>
			</view>
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
	.functional {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;

		.btn {
			padding: 10rpx;
			background: green;
			color: #fff;
			border-radius: 10rpx;
		}
	}

	.devicesStatus {
		position: absolute;
		right: 20%;
		bottom: 0%;

		.dot {
			margin-left: 10rpx;
			width: 10rpx;
			height: 10rpx;
			background-color: green;
			border-radius: 100%;
			position: relative;

			&::before {
				content: '';
				width: 10rpx;
				height: 10rpx;
				position: absolute;
				left: 0px;
				top: 0px;
				border-radius: 50%;
				animation: dot 1.5s ease-out 0s infinite;
				background-color: #fff;
			}
		}
	}

	.action {
		background: rgba(#3b82f6, 0.8);
		border-radius: 30rpx;
		overflow: hidden;
	}

	@keyframes dot {
		0% {
			transform: scale(0.5);
			opacity: 1;
		}

		30% {
			opacity: 1;
		}

		100% {
			transform: scale(1.4);
			opacity: 0;
		}
	}
</style>