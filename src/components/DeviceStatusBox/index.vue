<template>
	<view class="deviceBox">
		<view class="title">
			Device Statistics:
		</view>
		<view class="status">
			<view class="status_text">
				Connected 
			</view>
			<view class="dot"></view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.deviceBox {
		padding: 10rpx 20rpx;
		background: #fff;
		border-radius: 10rpx;
		box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		
		.title {
			font-size: 10rpx;
			font-weight: bold;
			margin-bottom: 8rpx;
		}
		
		
		.status {
			display: flex;
			align-items: center;
			position: relative;
			
			.status_text {
				font-size: 8rpx;
				margin-right: 5rpx;
			}
			
			.dot {
				width: 8rpx;
				height: 8rpx;
				// background: #04FF00;
				border-radius: 100%;
				position: relative;
				
				&::before {
					content: '';
					width: 8rpx;
					height: 8rpx;
					position: absolute;
					left: 0px;
					top: 0px;
					border-radius: 50%;
					animation: dot 1.5s ease-out 0s infinite;
					background-color: #04FF00;
				}
				
			}
		}
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