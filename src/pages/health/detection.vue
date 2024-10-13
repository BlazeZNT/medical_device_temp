<template>
	<view class="page">
		<view class="steps">
			<StepBox></StepBox>
		</view>

		<view class="content">
			<component :is="stepComponent"></component>
		</view>

		<view class="footer">
			<view class="logo">
				<image src="@/static/logo.png"></image>
			</view>

			<DeviceStatusBox></DeviceStatusBox>
		</view>
	</view>
</template>
<script setup>
	import DeviceStatusBox from '@/components/DeviceStatusBox/index.vue'
	import StepBox from '@/components/StepBox/index.vue'
	import Height from "@/components/HealthStep/Height.vue";
	
	const stepComponent = shallowRef(Height)
	
</script>
<style lang="scss" scoped>
	.page {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		overflow: hidden;

		.steps {
			flex-shrink: 0;
			overflow: hidden;
			width: 100vw;
		}

		.footer {
			flex-shrink: 0;
			display: flex;
			justify-content: space-between;
			padding-bottom: 20rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;

			.logo {
				width: 92rpx;
				height: 77.5rpx;


				image {
					width: 100%;
					height: 100%;
				}
			}


		}

		.content {
			flex: 1;

		}
	}
</style>