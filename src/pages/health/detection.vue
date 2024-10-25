<template>
	<view class="page">
		<view class="steps">
			<StepBox :active="active" :activeIndex="activeIndex" @change="stepChange"></StepBox>
		</view>

		<view class="content">
			<component :is="stepComponent"></component>
		</view>

		<view class="footer">
			<view class="logo" @click="slibrary.$router.go('/pages/home/index')">
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
	import BodyFat from "@/components/HealthStep/BodyFat.vue";
	import Erwen from "@/components/HealthStep/Erwen.vue";
	import Oximeter from "@/components/HealthStep/Oximeter.vue";
	import BloodPressure from "@/components/HealthStep/BloodPressure.vue";
	import RandomBloodSugar from "@/components/HealthStep/RandomBloodSugar.vue";
	import HBA1C from "@/components/HealthStep/HBA1C.vue";
	import HemoglobinTest from "@/components/HealthStep/HemoglobinTest.vue";
	import Lipid from "@/components/HealthStep/Lipid.vue";
	import slibrary from '@/slibrary/index.js'

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
</style>