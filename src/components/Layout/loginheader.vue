<template>
	<view class="header">
		<view class = "contentpage">
			<view class="logo">
				<image src="@/static/logo2.png" mode="heightFix"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive } from "vue";
</script>

<style lang="scss" scoped>
	.header,
	.contentpage{
		height: 65px;
		width: 100%;
		flex-shrink: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 43px;
		
		.logo {
			// width: 125px;
			height: 40px;
			image {
				width: 100%;
				height: 100%;
			}
		}
		
		.right {
			display: flex;
			align-items: center;
			
			.textBox {
				margin-right: 20rpx;
				 text-align: left;
				.label {
					font-size: 7.5rpx;
					color: #12FFBB;
					margin-bottom: 2rpx;
					font-family: FL;	
				}
				
				.value {
					font-size: 10rpx;
					color: #fff;				
				}
			}
			
			.device-connected {
			  display: flex;
			  align-items: center;
			  justify-content: center;
			  background-color: #2b2d31; /* Button background */
			  border-radius: 20px; /* Rounded corners */
			  padding: 5px 15px;
			  height: 28px;
			}
			
			.device-connected .dot {
			  width: 10px;
			  height: 10px;
			  background-color: #06ffb8; /* Green dot color */
			  border-radius: 50%;
			  margin-right: 8px;
			}
			
			.connected-text {
			  font-weight: bold;
			  color: #ffffff;
			  font-size: 12px; /* Ensure font-size is applied */
			}
		}
	}
</style>