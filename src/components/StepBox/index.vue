<template>
	<scroll-view scroll-x="true" class="scrollBox flex-shrink-0" :show-scrollbar="false" :scroll-into-view="'setp' + props.activeIndex" scroll-with-animation	>
		<view class="stepBox  space-x-40">
			<view class="stepBoxItem" :id="'setp' + index" v-for="(item, index) in stepArr"
				:class="[props.active == item.text ? 'activeSetp' : '', item.status == 'pass' ? 'doneStep' : '']"
				:key="item.id" @click="handleClickStep(item, index)">
				<view class="bar"></view>
				<view class="statusBox">
					{{ item.status }}
					<view class="statusIcon">
						<up-icon name="checkmark-circle-fill" color="green" size="14"
							v-if="item.status == 'pass'"></up-icon>
						<view class="activeSetp" v-if="props.active == item.text"></view>
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
		markRaw,
		watch
	} from 'vue'
	import ScrollText from '@/components/ScrollText.vue'


	const props = defineProps({
		active: {
			type: String,
			default: ''
		},
		activeIndex: {
			type: Number,
			default: 0
		}
	})

	watch(() => props.active, (newVal) => {

	})

	// const activeIndex = ref(0)

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
		}
		// , {
		// 	id: 5,
		// 	text: 'BloodPressure',
		// 	status: ''
		// },
		// {
		// 	id: 6,
		// 	text: 'RandomBloodSugar',
		// 	status: ''

		// }, {
		// 	id: 7,
		// 	text: 'HBA1C',
		// 	status: ''
		// }, {
		// 	id: 8,
		// 	text: 'HemoglobinTest',
		// 	status: ''

		// }, {
		// 	id: 9,
		// 	text: 'Lipid',
		// 	status: ''

		// }, {
		// 	id: 10,
		// 	text: 'SixLeadECG',
		// 	status: ''

		// }, {
		// 	id: 10,
		// 	text: 'Spirometry',
		// 	status: ''
		// }, {
		// 	id: 10,
		// 	text: 'CardiovascularSystemicExamination',
		// 	status: ''
		// }, {
		// 	id: 10,
		// 	text: 'SnellenChart',
		// 	status: ''
		// }, {
		// 	id: 10,
		// 	text: 'Audiometry',
		// 	status: ''
		// }, {
		// 	id: 10,
		// 	text: 'Dermascope',
		// 	status: ''
		// }, {
		// 	id: 10,
		// 	text: 'Otoscope',
		// 	status: ''
		// }
	])

	const emit = defineEmits(['change'])
	const handleClickStep = (item, index) => {
		emit('change', stepArr.value[index], index)
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

				&.activeSetp {
					.statusBox {
						.name {
							color: #04FF00;
						}
					}

					.bar {
						background: #04FF00;
					}


				}

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
							border: 4rpx solid #04FF00 !important;
						}


					}

					.name {
						width: 100rpx;
						overflow: hidden;
						color: #fff;
					}
				}

			}
		}
	}
</style>