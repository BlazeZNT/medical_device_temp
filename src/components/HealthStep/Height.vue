<template>
	<ContentBox image="@/static/height.jpg">
		<view class="action relative" style="width: 600rpx;height: 600rpx;">
			<view class="flex-1 relative flex flex-col" style="width: 100%; height: 100%;padding: 40rpx 0;">
				<!-- 格子 -->
				<view class="flex-1 fulled flex flex-col gezibox">
					<view class="geziitem" v-for="item in interpolation" :key="item" :class="[lineFunc(item)]">
					</view>
					<view class="handle" :style="sliderStyle" @touchstart="touchstart"
						@touchmove.stop.prevent="touchMove">
						<view class="text">
							<view class="text2">cm</view>
						</view>
					</view>
				</view>
			</view>
			<view class="heightNumber">
				<view class="text1">{{ currentTemperature }}</view>
			</view>
			<view class="title">
				Smart Sacle
			</view>
		</view>
	</ContentBox>
</template>

<script setup>
	import {
		ref,
		computed,
		reactive,
		onMounted,
		getCurrentInstance
	} from 'vue'
	
	import ContentBox from './ContentBox.vue'
	
	const instance = getCurrentInstance(); // 获取组件实例

	const sliderMinX = ref(0)
	const sliderMaxX = ref(245)

	let tmp = 30
	const sliderX = ref(0)

	onMounted(() => {
		const query = uni.createSelectorQuery().in(instance);
		query.select('.gezibox').fields({
			size: true,
			dataset: true,
			rect: true,
			id: true
		});
		query.exec(eles => {
			sliderMaxX.value = eles[0].height
			sliderX.value = (30 - tmp) * sliderMaxX.value / 20;
		})
	})

	const currentTemperature = computed(() => {
		const tempRangeStart = 200;
		const tempRange = 120;
		return tempRangeStart - parseInt((sliderX.value / sliderMaxX.value * tempRange));
	})

	const min = ref(120)
	const max = ref(200)


	const sliderStyle = computed(() => {
		return `transform: translate3d(0, ${sliderX.value}px, 0);`
	})


	const interpolation = computed(() => {
		let num = max.value - min.value
		let arr = []
		for (let i = min.value; i < max.value; i++) {
			if ((i % 2) == 0 || (i % 5) == 0) {
				arr.push(i)
			}
		}
		return arr
	})

	const lineFunc = (i) => {
		if ((i % 5) == 0) {
			return 'longLine'
		}
	}

	const startObg = reactive({
		startX: 0,
		startY: 0
	})

	const initialSliderX = ref(0)

	const touchstart = (e) => {
		console.log(e)
		startObg.startX = e.changedTouches[0].clientX
		startObg.startY = e.changedTouches[0].clientY
		initialSliderX.value = sliderX.value
	}

	const touchMove = (e) => {
		e.stopPropagation();
		console.log(e)
		let {
			startX,
			startY
		} = startObg
		let slidingRange = 45; //
		let touchMoveX = e.changedTouches[0].clientX;
		let touchMoveY = e.changedTouches[0].clientY;
		let angle = angleFun({
			X: startX,
			Y: startY
		}, {
			X: touchMoveX,
			Y: touchMoveY
		});
		//为了方便计算取绝对值判断
		if (Math.abs(angle) > slidingRange && touchMoveY < startY) {
			// 向上滑动
			console.log('上')
			console.log(touchMoveY)
			const dragAmount = touchMoveY - startY
			const targetX = initialSliderX.value + dragAmount
			sliderX.value = Math.max(Math.min(targetX, sliderMaxX.value), sliderMinX.value)
		};
		if (Math.abs(angle) > slidingRange && touchMoveY > startY) {
			// 向下滑动
			console.log('下')
			console.log(touchMoveY)
			// scrollTop.value = touchMoveY
			const dragAmount = touchMoveY - startY
			const targetX = initialSliderX.value + dragAmount
			sliderX.value = Math.max(Math.min(targetX, sliderMaxX.value), sliderMinX.value)
		}
	}
	//计算滑动角度 start 起点坐标 end 终点坐标
	const angleFun = (start, end) => {
		var _X = end.X - start.X,
			_Y = end.Y - start.Y;
		//返回角度 Math.atan()返回数字的反正切值
		return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
	}
</script>

<style lang="scss" scoped>
	.functional {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: relative;

		.btn {
			padding: 20rpx;
			background: green;
			color: #fff;
			border-radius: 20rpx;
		}
	}

	.devicesStatus {
		position: absolute;
		right: 10%;
		bottom: 10%;

		.dot {
			margin-left: 10rpx;
			width: 20rpx;
			height: 20rpx;
			background-color: green;
			border-radius: 100%;
		}
	}

	.action {
		background: rgba(#3b82f6, 0.8);
		border-radius: 30rpx;
		overflow: hidden;
	}

	.gezibox {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: flex-end;
	}

	.geziitem {
		width: 40rpx;
		height: 2rpx;
		background-color: #fff;
		// margin-bottom: 8rpx;
	}

	.longLine {
		width: 80rpx;
	}

	.handle {
		position: absolute;
		width: 160rpx;
		height: 4rpx;
		background-color: rgba(255, 77, 108, 1);
		top: 40rpx;

		.text {
			display: flex;
			flex-direction: column;
			position: absolute;
			left: -20%;
			top: 20rpx;
			align-items: flex-end;

			.text1 {
				font-size: 48rpx;
			}

			.text2 {
				font-size: 24rpx;
			}
		}

		&::after {
			content: '';
			width: 34rpx;
			height: 34rpx;
			background-color: rgba(255, 77, 108, 1);
			border-radius: 100%;
			position: absolute;
			left: -20%;
			top: -16rpx;
		}
	}

	.heightNumber {
		position: absolute;
		top: 40%;
		left: 30%;

		.text1 {
			font-size: 80rpx;
		}
	}

	.title {
		position: absolute;
		top: 5%;
		left: 10%;
		font-size: 40rpx;
		color: #fff;
	}
</style>