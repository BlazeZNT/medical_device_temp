<template>
	<view class="page">
		<view class="steps">
			<StepBox :active="active" :activeNum="activeIndex" @change="stepChange"></StepBox>
		</view>

		<view class="content">
			<component :initChange="init" :checkChange="check" :nextFun="nextFun" :is="stepComponent"></component>
		</view>

		<view class="footer">
			<view class="logo" @click="slibrary.$router.go('/pages/home/index')">
				<image src="@/static/logo.png"></image>
			</view>

			<DeviceStatusBox></DeviceStatusBox>
		</view>

		<view class="loadingModal" v-if="showLoading">
			<view class="mask"></view>
			<view class="model">
				<view class="loading">
					<image src="@/static/loading.gif"></image>
				</view>
				<view class="text">
					Detecting...
				</view>
			</view>
		</view>
	</view>
</template>
<script setup>
	import DeviceStatusBox from '@/components/DeviceStatusBox/index.vue'
	import StepBox from '@/components/StepBox/index.vue'
	import Height from "@/components/HealthStep/Height.vue";
	import BodyFat from "@/components/HealthStep/BodyFat.vue";
	import Erwen from "@/components/HealthStep/Erwen.vue";
	import Oximeter from "@/components/HealthStep/Oximeter.vue";
	import BloodPressure from "@/components/HealthStep/BloodPressure.vue";
	import RandomBloodSugar from "@/components/HealthStep/RandomBloodSugar.vue";
	import HBA1C from "@/components/HealthStep/HBA1C.vue";
	import HemoglobinTest from "@/components/HealthStep/HemoglobinTest.vue";
	import Lipid from "@/components/HealthStep/Lipid.vue";
	import slibrary from '@/slibrary/index.js'

	const showLoading = ref(false)

	const stepComponent = shallowRef(Height)

	const Components = {
		Height: Height,
		BodyFat: BodyFat,
		Erwen,
		Oximeter,
		BloodPressure,
		HBA1C,
		Lipid
	}


	const active = ref('Height')
	const activeIndex = ref(0)

	const stepChange = (e, i) => {
		active.value = e.text
		activeIndex.value = i
		stepComponent.value = Components[e.text]
	}
	
	const init = () => {
		showLoading.value = true
	}
	
	const check = () => {
		showLoading.value = false
	}
	
	const nextFun = () => {
		activeIndex.value = activeIndex.value + 1
	}
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
			padding: 20rpx;
		}

		.footer {
			flex-shrink: 0;
			display: flex;
			justify-content: space-between;
			padding-bottom: 20rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;
			position: fixed;
			bottom: 10rpx;
			left: 0;
			right: 0;

			.logo {
				width: 70rpx;
				height: 50rpx;


				image {
					width: 100%;
					height: 100%;
				}
			}


		}

		.content {
			flex: 1;
			overflow: hidden;
			padding-bottom: 18rpx;
		}
	}

	.loadingModal {
		width: 100vw;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;

		.mask {
			width: 100%;
			height: 100%;
			background: rgba(#000, 0.5);
		}

		.model {
			width: 200rpx;
			height: 200rpx;
			border-radius: 20rpx;
			background: #fff;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			.loading {
				width: 130rpx;
				height: 130rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.text {
				font-size: 16rpx;
			}
		}

	}
</style>