<template>
	<view class="header">
		<view class="logo">
			<image class="logoImage" src="@/static/logo2.png" mode="heightFix"></image>
		</view>
		<view class="right">
			<view class="textBox left">
				<view class="label">
					<text class="labelText">Patient Name</text>
				</view>
				<view class="value">
					<text class="valueText">Debra Robertson</text>
				</view>
			</view>
			<view class="textBox">
				<view class="label">
					<text class="labelText">Age</text>
				</view>
				<view class="value">
					<text class="valueText">38</text>
				</view>
			</view>
			<view class="textBox">
				<view class="label">
					<text class="labelText">Date of Birth</text>
				</view>
				<view class="value">
					<text class="valueText">10/11/1996</text>
				</view>
			</view>
			<view class="textBox">
				<view class="label">
					<text class="labelText">Gender</text>
				</view>
				<view class="value">
					<text class="valueText">Female</text>
				</view>
			</view>
			<view class="textBox">
				<view class="label">
					<text class="labelText">Phone</text>
				</view>
				<view class="value">
					<text class="valueText">62857891</text>
				</view>
			</view>
			<view class="avatar"></view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.header {
		// #ifndef APP-NVUE
		width: 100%;
		height: 65px;
		// #endif
		// #ifdef APP-NVUE
		width: 750rpx;
		height: 45rpx;
		flex-direction: row;
		// #endif
		flex-shrink: 0;
		display: flex;

		justify-content: space-between;
		align-items: center;
		padding: 0 43rpx;



		.right {
			display: flex;
			align-items: center;

			.textBox {
				margin-right: 20rpx;
				text-align: left;

				.label {
					text {
						font-size: 7.5rpx;
						color: #12FFBB;
						margin-bottom: 2rpx;
						font-family: FL;
					}
				}

				.value {
					text {
						font-size: 10rpx;
						color: #fff;
					}
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

	// #ifndef APP-NVUE 
	.logo {
		// width: 125px;
		height: 40px;

		image {
			width: 100%;
			height: 100%;
		}
	}

	// #endif

	// #ifdef APP-NVUE 
	.logoImage {
		width: 125rpx;
		height: 30rpx;
	}

	.labelText {
		font-size: 7.5rpx;
		color: #12FFBB;
		margin-bottom: 2rpx;
		font-family: FL;
	}

	.valueText {
		font-size: 10rpx;
		color: #fff;
	}

	.right {
		flex-direction: row;
	}

	// #endif
</style>