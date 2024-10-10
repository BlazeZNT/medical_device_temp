<template>
	<view class="page">
		<Header title="Health" showBack />
		<div class="content">
			<scroll-view scroll-x="true" class="scrollBox flex-shrink-0" :show-scrollbar="false">
				<view class="stepBox  space-x-40">
					<view class="stepBoxItem" v-for="(item, index) in stepArr"
						:class="[activeIndex == index ? 'activeSetp' : '', item.status == 'pass' ? 'doneStep' : '']"
						:key="item.id" @click="handleClickStep(item, index)">
						<view class="icon">
							<i class="fas fa-ruler-vertical "></i>
						</view>
						<view class="text" style="width: 200rpx;">
							<ScrollText :content="item.text" :index="index"></ScrollText>
							<!-- {{ item.text }} -->
						</view>
						<view class="activeIcon" v-if="activeIndex == index">
							<i class="fas fa-running text-white text-2xl"></i>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="flex-1 w-full">
				<component :is="stepComponent"></component>
			</view>
			<view class="actionBar flex justify-between w-full p-6">
				<view class="left">
					<view class="fas fa-angle-double-left text-6xl" v-if="activeIndex != 0"
						@click="handleClickAction('left')"></view>
				</view>
				<view class="right">
					<view class="fas fa-angle-double-right text-6xl" @click="handleClickAction('right')"></view>
				</view>
			</view>
		</div>
	</view>
</template>

<script setup>
	import Header from '@/components/Header/index.vue'

	import ScrollText from '@/components/ScrollText.vue'
	import {
		ref,
		shallowRef,
		markRaw
	} from 'vue'

	import Height from "@/components/HealthStep/Height.vue";
	import BodyFat from "@/components/HealthStep/BodyFat.vue";
	import Erwen from "@/components/HealthStep/Erwen.vue";
	import Oximeter from "@/components/HealthStep/Oximeter.vue";
	import BloodPressure from "@/components/HealthStep/BloodPressure.vue";
	import RandomBloodSugar  from "@/components/HealthStep/RandomBloodSugar.vue";
	import HBA1C from "@/components/HealthStep/HBA1C.vue";
	import HemoglobinTest from "@/components/HealthStep/HemoglobinTest.vue";
	import Lipid from "@/components/HealthStep/Lipid.vue";
	import SixLeadECG from "@/components/HealthStep/SixLeadECG.vue";
	import Spirometry from "@/components/HealthStep/Spirometry.vue";
	import CardiovascularSystemicExamination from 
		"@/components/HealthStep/CardiovascularSystemicExamination.vue";
	import SnellenChart from "@/components/HealthStep/SnellenChart.vue";
	import Audiometry from "@/components/HealthStep/Audiometry.vue";
	import Dermascope from "@/components/HealthStep/Dermascope.vue";
	import Otoscope from "@/components/HealthStep/Otoscope.vue";


	const stepComponent = shallowRef(Height)
	const activeIndex = ref(0)

	const stepArr = shallowRef([{
			id: 1,
			name: Height,
			text: 'Height'
		}, {
			id: 2,
			name: BodyFat,
			text: 'BodyFat'
		}, {
			id: 3,
			name: Erwen,
			text: 'Erwen'
		}, {
			id: 4,
			name: Oximeter,
			text: 'Oximeter'
		}, {
			id: 5,
			name: BloodPressure,
			text: 'BloodPressure'
		},
		{
			id: 6,
			name: RandomBloodSugar,
			text: 'RandomBloodSugar'
		}, {
			id: 7,
			name: HBA1C,
			text: 'HBA1C'
		}, {
			id: 8,
			name: HemoglobinTest,
			text: 'HemoglobinTest'
		}, {
			id: 9,
			name: Lipid,
			text: 'Lipid'
		}, {
			id: 10,
			name: SixLeadECG,
			text: 'SixLeadECG'
		}, {
			id: 10,
			name: Spirometry,
			text: 'Spirometry'
		}, {
			id: 10,
			name: CardiovascularSystemicExamination,
			text: 'CardiovascularSystemicExamination'
		}, {
			id: 10,
			name: SnellenChart,
			text: 'SnellenChart'
		}, {
			id: 10,
			name: Audiometry,
			text: 'Audiometry'
		}, {
			id: 10,
			name: Dermascope,
			text: 'Dermascope'
		}, {
			id: 10,
			name: Otoscope,
			text: 'Otoscope'
		}
	])

	const handleClickStep = (item, index) => {
		stepComponent.value = item.name
		activeIndex.value = index
		updateStatus()
	}

	const handleClickAction = flag => {
		if (flag == 'left') {
			stepComponent.value = stepArr.value[activeIndex.value - 1].name
			activeIndex.value = activeIndex.value - 1
		} else {
			stepComponent.value = stepArr.value[activeIndex.value + 1].name
			activeIndex.value = activeIndex.value + 1
		}
		updateStatus()
	}

	const updateStatus = () => {
		stepArr.value = stepArr.value.map((item, index) => {
			if (index < activeIndex.value) {
				item.status = 'pass'
			} else {
				item.status = ''
			}
			return item
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
			// border: 1px solid red;
			overflow: hidden;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}
	}

	.scrollBox {

		.stepBox {
			display: flex;
			padding: 40px;

			&::-webkit-scrollbar {
				display: none;
				/* Chrome Safari */
			}

			.stepBoxItem {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				position: relative;

				.text {
					position: absolute;
					bottom: -40rpx;
				}

				.activeIcon {
					position: absolute;
					top: -70rpx;
					color: #fff;
					left: 50%;
					transform: translateX(-50%);
					z-index: 2;
					font-size: 20rpx;

				}

				&.activeSetp {
					.icon {
						width: 60px;
						height: 60px;
						border: 2px solid #fff;
						font-size: 28px;
						background-color: rgb(147, 197, 253);

						.fas {
							color: #fff !important;
						}
					}
				}



				&.doneStep {
					.icon {
						background-color: forestgreen;
						border: 2px solid #fff;
						color: #fff;

						.fas {
							color: #fff;
						}
					}
				}


				&:last-child {
					.icon {
						&::after {
							width: 0;
						}
					}
				}

				.icon {
					width: 40px;
					height: 40px;
					background-color: #fff;
					border-radius: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-bottom: 14px;
					position: relative;
					font-size: 20px;
					border: 2px solid rgb(147, 197, 253);

					.fas {
						color: rgb(147, 197, 253);
					}

					&::after {
						position: absolute;
						content: '';
						width: 140px;
						height: 1px;
						// background-color: #fff;
						border-top: 2px dashed #ccc;
						/* 设置为虚线 */
						top: 50%;
						right: 0;
						left: calc(100% + 10px);
						/* 线在当前步骤的右侧 */

					}
				}

			}
		}
	}

	.devicesSontent {
		.right {
			position: relative;

			&:before {
				position: absolute;
				left: 0;
				height: 80%;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid rgba(#fff, 0.4);
				content: '';
			}

		}
	}
</style>