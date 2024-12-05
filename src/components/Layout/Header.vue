<template>
	<view class="header">
		<view class="logo">
			<image src="@/static/logo2.png" mode="heightFix"></image>
		</view>
		<view class="right">
			<view class="textBox left">
				<view class="label">Patient Name</view>
				<view class="value">Debra Robertson</view>
			</view>
			<view class="textBox">
				<view class="label">Age</view>
				<view class="value">38</view>
			</view>
			<view class="textBox">
				<view class="label">Date of Birth</view>
				<view class="value">10/11/1996</view>
			</view>
			<view class="textBox">
				<view class="label">Gender</view>
				<view class="value">Female</view>
			</view>
			<view class="textBox">
				<view class="label">Phone</view>
				<view class="value">62857891</view>
			</view>
			<view class="avatar"></view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.header {
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
			
			.avatar {
				width: 28rpx;
				height: 28rpx;
				background: #fff;
				border-radius: 100%;
			}
		}
	}
</style>