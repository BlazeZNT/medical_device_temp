<template>
	<view class="page">
		<FixedLogo />
		<view class="content">
			<view class="btns">
				<view class="btns-item" @click="slibrary.$router.go('/pages/login/index')">
					<view class="icon">
						<image :src="slibrary.$url.static('/static/denglu.png')" mode="heightFix"></image>
					</view>
					<view class="text">Sign in</view>
				</view>
				<view class="btns-item"  @click="slibrary.$router.go('/pages/registeration/index')">
					<view class="icon">
						<image :src="slibrary.$url.static('/static/zhuce.png')" mode="heightFix"></image>
					</view>
					<view class="text">Register</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import FixedLogo from '@/components/Common/FixedLogo.vue'
	import slibrary from '@/slibrary/index.js'
	
	const handleClickHealthCheckUp = () => {
		slibrary.$router.go('/pages/login/consentForm')
	}
</script>

<style lang="scss" scoped>
	.page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;

		.content {
			display: flex;
			justify-content: space-evenly;

			.btns {
				display: flex;

				.btns-item {
					width: 150rpx;
					height: 150rpx;
					background-color: #fff;
					border-radius: 10rpx;
					margin-right: 20rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
					flex-direction: column;

					.icon {
						// width: 50rpx;
						height: 50rpx;
						margin-bottom: 20rpx;
					}

					.text {
						font-size: 14rpx;
					}

					&:last-child {
						margin-right: 0;
					}

				}
			}
		}
	}
</style>