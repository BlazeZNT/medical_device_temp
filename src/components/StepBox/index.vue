<template>
	<scroll-view scroll-x="true" class="scrollBox flex-shrink-0" :show-scrollbar="false">
		<view class="stepBox  space-x-40">
			<view class="stepBoxItem" v-for="(item, index) in stepArr"
				:class="[activeIndex == index ? 'activeSetp' : '', item.status == 'pass' ? 'doneStep' : '']"
				:key="item.id" @click="handleClickStep(item, index)">
				<view class="icon">
					<i class="fas fa-ruler-vertical "></i>
				</view>
				<view class="text" style="width: 200rpx;">
					{{ item.text }}
					<!-- <ScrollText :content="item.text" :index="index"></ScrollText> -->
				</view>
				<view class="activeIcon" v-if="activeIndex == index">
					<i class="fas fa-running text-white text-2xl"></i>
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
	// import ScrollText from '@/components/ScrollText.vue'
	
	const activeIndex = ref(0)
	
	const stepArr = shallowRef([{
			id: 1,
			text: 'Height'
		}, {
			id: 2,
			text: 'BodyFat'
		}, {
			id: 3,
			text: 'Erwen'
		}, {
			id: 4,
			text: 'Oximeter'
		}, {
			id: 5,
			text: 'BloodPressure'
		},
		{
			id: 6,
			text: 'RandomBloodSugar'
		}, {
			id: 7,
			text: 'HBA1C'
		}, {
			id: 8,
			text: 'HemoglobinTest'
		}, {
			id: 9,
			text: 'Lipid'
		}, {
			id: 10,
			text: 'SixLeadECG'
		}, {
			id: 10,
			text: 'Spirometry'
		}, {
			id: 10,
			text: 'CardiovascularSystemicExamination'
		}, {
			id: 10,
			text: 'SnellenChart'
		}, {
			id: 10,
			text: 'Audiometry'
		}, {
			id: 10,
			text: 'Dermascope'
		}, {
			id: 10,
			text: 'Otoscope'
		}
	])
	
	const handleClickStep = (item, index) => {
		activeIndex.value = index
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
				padding: 15rpx 15rpx;
				background: #fff;
				box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
				
				

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