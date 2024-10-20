<template>
	<scroll-view scroll-x="true" class="scrollBox flex-shrink-0" :show-scrollbar="false">
		<view class="stepBox  space-x-40">
			<view class="stepBoxItem" v-for="(item, index) in stepArr"
				:class="[activeIndex == index ? 'activeSetp' : '', item.status == 'pass' ? 'doneStep' : '']"
				:key="item.id" @click="handleClickStep(item, index)">
				<view class="bar"></view>
				<view class="statusBox">
					{{ item.status }}
					<view class="statusIcon">
						<up-icon name="checkmark-circle-fill" color="green" size="14" v-if="item.status == 'pass'"></up-icon>
						<view class="activeSetp" v-if="item.status == 'activeSetp'"></view>
						<view class="defaultIcon" v-else></view>
					</view>
					<view class="name">
						<ScrollText :content="item.text" :index="index"></ScrollText>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script setup>
	import {
		ref,
		shallowRef,
		markRaw
	} from 'vue'
	import ScrollText from '@/components/ScrollText.vue'

	const activeIndex = ref(0)

	const stepArr = shallowRef([{
			id: 1,
			text: 'Height',
			statue: ''
		}, {
			id: 2,
			text: 'BodyFat',
			status: ''
		}, {
			id: 3,
			text: 'Erwen',
			status: ''
		}, {
			id: 4,
			text: 'Oximeter',
			status: ''
		}, {
			id: 5,
			text: 'BloodPressure',
			status: ''
		},
		{
			id: 6,
			text: 'RandomBloodSugar',
			status: ''
			
		}, {
			id: 7,
			text: 'HBA1C',
			status: ''
		}, {
			id: 8,
			text: 'HemoglobinTest',
			status: ''
			
		}, {
			id: 9,
			text: 'Lipid',
			status: ''
			
		}, {
			id: 10,
			text: 'SixLeadECG',
			status: ''
			
		}, {
			id: 10,
			text: 'Spirometry',
			status: ''
		}, {
			id: 10,
			text: 'CardiovascularSystemicExamination',
			status: ''
		}, {
			id: 10,
			text: 'SnellenChart',
			status: ''
		}, {
			id: 10,
			text: 'Audiometry',
			status: ''
		}, {
			id: 10,
			text: 'Dermascope',
			status: ''
		}, {
			id: 10,
			text: 'Otoscope',
			status: ''
		}
	])
	
	const emit = defineEmits(['change'])
	const handleClickStep = (item, index) => {
		activeIndex.value = index
		// stepArr.value[index - 1]['status'] = 'pass'
		// stepArr.value[index]['status'] = 'activeSetp'
		emit('change', stepArr.value[index])
	}
</script>

<style lang="scss" scoped>
	.scrollBox {
		width: 100%;

		.stepBox {
			display: flex;
			padding: 10px;

			&::-webkit-scrollbar {
				display: none;
				/* Chrome Safari */
			}

			.stepBoxItem {
				position: relative;
				// width: 300rpx;
				// display: flex;
				margin-right: 20rpx;

				.bar {
					width: 120rpx;
					height: 5rpx;
					border-radius: 20rpx;
					background: #fff;
					margin-bottom: 6rpx;
				}

				.statusBox {
					display: flex;
					align-items: center;
					width: 100%;
					overflow: hidden;

					.statusIcon {
						margin-right: 6rpx;

						.activeSetp,
						.defaultIcon {
							width: 14rpx;
							height: 14rpx;
							border-radius: 100%;
							border: 2rpx solid #fff;
						}
						
						.activeSetp {
							border: 4rpx solid green;
						}


					}

					.name {
						color: #fff;
					}
				}

				// &::after {
				//   content: '';
				//   position: absolute;
				//   right: -10px;
				//   top: 50%;
				//   transform: translateY(-50%);
				//   border-left: 10px solid #a0a5ff;
				//   border-top: 10px solid transparent;
				//   border-bottom: 10px solid transparent;
				// }

				// &.active {
				//   background-color: #a0d5ff;
				//   border-color: #1a73e8;
				//   color: white;
				// }


				// .text {
				// 	position: absolute;
				// 	bottom: -40rpx;
				// }

				// .activeIcon {
				// 	position: absolute;
				// 	top: -70rpx;
				// 	color: #fff;
				// 	left: 50%;
				// 	transform: translateX(-50%);
				// 	z-index: 2;
				// 	font-size: 20rpx;

				// }

				// &.activeSetp {
				// 	.icon {
				// 		width: 60px;
				// 		height: 60px;
				// 		border: 2px solid #fff;
				// 		font-size: 28px;
				// 		background-color: rgb(147, 197, 253);

				// 		.fas {
				// 			color: #fff !important;
				// 		}
				// 	}
				// }



				// &.doneStep {
				// 	.icon {
				// 		background-color: forestgreen;
				// 		border: 2px solid #fff;
				// 		color: #fff;

				// 		.fas {
				// 			color: #fff;
				// 		}
				// 	}
				// }


				// &:last-child {
				// 	.icon {
				// 		&::after {
				// 			width: 0;
				// 		}
				// 	}
				// }

			}
		}
	}
</style>