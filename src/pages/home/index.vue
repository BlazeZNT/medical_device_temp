<template>
	<view class="page">
		<FixedLogo />
		<view class="content">
			<view class="btns">
				<view class="btns-item" @click="handleClickHealthCheckUp">
					<view class="icon">
						<image :src="slibrary.$url.static('/static/home/icon_Outpatient.png')" mode="heightFix"></image>
					</view>
					<view class="text">Health Checkup</view>
				</view>
				<view class="btns-item" @click="handleClickReport">
					<view class="icon">
						<image :src="slibrary.$url.static('/static/home/icon_ExamMultiple-Choice.png')"
							mode="heightFix"></image>
					</view>
					<view class="text">Report</view>
				</view>
				<view class="btns-item">
					<view class="icon">
						<image :src="slibrary.$url.static('/static/home/icon_HealthWorkerForm.png')" mode="heightFix">
						</image>
					</view>
					<view class="text">eHealth Record</view>
				</view>
				<view class="btns-item">
					<view class="icon">
						<image :src="slibrary.$url.static('/static/home/icon_MedicalAdvice.png')" mode="heightFix">
						</image>
					</view>
					<view class="text">Telemedicine</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import FixedLogo from '@/components/Common/FixedLogo.vue'
	import slibrary from '@/slibrary/index.js'
	import {
		isLogin
	} from '@/utils/auth';

	const handleClickHealthCheckUp = () => {
		console.log(isLogin())
		if (!isLogin()) {
			slibrary.$router.go('/pages/login/selectLogin')
			return
		}

		slibrary.$router.go('/pages/health/index')
	}
	
	const handleClickReport = () => {
		slibrary.$router.go('/pages/report/index')
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