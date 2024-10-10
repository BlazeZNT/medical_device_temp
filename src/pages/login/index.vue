<template>
	<view class="page">
		<Header title="Login" />
		<view class="content">
			<view class="left">
				<view class="label">
					Login With
				</view>
				<view class="selectBox">
					<view class="select-item">
						<view>Mobile</view>
					</view>
					<view class="select-item">
						<view>Unique Id</view>
					</view>
					<view class="select-item">
						<view>Aadhaar Card</view>
					</view>
				</view>
			</view>
			<view class="right">
				<view class="loginBox">
					<view class="title">Patient Login</view>
					<view class="inputBox">
						<view class="label">Mobile</view>
						<view class="input">
							<input type="text" />
						</view>
					</view>
					<view class="loginBtn" @click="handleGoto">
						Login
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import Header from '@/components/Header/index.vue'

	const handleGoto = () => {
		uni.navigateTo({
			url: '/pages/login/code'
		})
	}
</script>

<style lang="scss" scoped>
	.page {
		display: flex;
		flex-direction: column;
		width: 100vw;
		height: 100vh;
		background-color: #0B0D2E;
		color: #fff;

		.content {
			flex: 1;
			overflow: hidden;

			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20rpx 20rpx;

			.left {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				border-right: 2rpx solid rgba(#fff, 0.4);
				height: 100%;

				.label {
					display: flex;
					justify-content: flex-start;
					font-size: 20rpx;
					margin-bottom: 20rpx;
				}

				.selectBox {
					.select-item {
						width: 200rpx;
						border-radius: 10rpx;
						padding: 15rpx 20rpx;
						background-image: linear-gradient(to right, rgba(#fff, 0.4), rgba(#fff, 0.2));
						margin-bottom: 10rpx;
					}
				}
			}

			.right {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;

				.loginBox {
					width: 80%;
					padding: 20rpx;
					background-image: linear-gradient(to right, rgba(#fff, 0.4), rgba(#fff, 0.2));
					border-radius: 10rpx;

					.title {
						width: 100%;
						text-align: center;
						font-size: 25rpx;
					}

					.inputBox {
						width: 100%;

						.label {
							margin-bottom: 10rpx;
							font-size: 15rpx;
						}

						.input {
							width: 100%;
							background-color: #fff;
							padding: 10rpx 10rpx !important;
							border-radius: 10rpx;

							input {
								width: 100%;
								color: #000;
							}
						}
					}

					.loginBtn {
						padding: 10rpx 10rpx !important;
						background-color: green;
						border-radius: 10rpx;
						margin: 15rpx 0;
						text-align: center;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>