<template>
	<ContentBox image="@/static/height.jpg">
		<view class="height-slider-container">
			<view class="height-display">{{ height }}<text>Cm</text></view>
			<view class="slider-wrapper-container">
				<!-- 数值标记 -->
				<view class="height-markers">
					<view v-for="mark in dynamicMarks" :key="mark" class="marker"
						:style="{ top: calculateMarkerPosition(mark) + 'rpx' }">{{ mark }} Cm</view>
				</view>
				<!-- 滑动条 -->
				<view class="slider-wrapper" @touchstart="startDragging" @touchmove="onDragging"
					@touchend="stopDragging" ref="slider">
					<view class="slider-scale">
						<!-- 滑动条刻度 -->
						<view v-for="mark in dynamicMarks" :key="mark" class="slider-line"
							:style="{ top: calculateMarkerPosition(mark) + 'rpx' }"></view>
						<view class="slider-mark" :style="{ top: sliderPosition + 'rpx' }"></view>
						<view class="slider-indicator" :style="{ top: sliderPosition + 'rpx' }"></view>
					</view>
				</view>
			</view>
		</view>
	</ContentBox>
</template>

<script>
	import ContentBox from '@/components/HealthStep/ContentBox.vue'
	export default {
		components: {
			ContentBox
		},
		data() {
			return {
				height: 165, // 初始默认高度
				maxHeight: 200, // 最大身高
				minHeight: 150, // 最小身高
				isDragging: false, // 是否正在拖动的标志
				sliderPosition: 100, // 滑动条的初始位置（像素）
				maxSliderPosition: 200, // 滑动条的最大位置（像素）
				minSliderPosition: 0, // 滑动条的最小位置（像素）
				totalMarks: 5, // 刻度数量
			};
		},
		computed: {
			// 生成动态的刻度值
			dynamicMarks() {
				const marks = [];
				const step = (this.maxHeight - this.minHeight) / this.totalMarks;
				for (let i = 0; i <= this.totalMarks; i++) {
					marks.push(Math.round(this.minHeight + step * i));
				}
				return marks;
			},
			// 身高范围
			heightRange() {
				return this.maxHeight - this.minHeight;
			},
		},
		methods: {
			// 计算刻度标记的位置
			calculateMarkerPosition(mark) {
				const percentage = (this.maxHeight - mark) / this.heightRange;
				return (this.minSliderPosition + percentage * (this.maxSliderPosition - this.minSliderPosition));
			},
			// 开始拖动
			startDragging() {
				this.isDragging = true;
			},
			// 拖动中
			onDragging(e) {
				if (this.isDragging) {
					const touch = e.touches[0];
					const query = uni.createSelectorQuery().in(this);
					query.select('.slider-wrapper').boundingClientRect((rect) => {
						let newSliderPosition = touch.clientY - rect.top;
						if (newSliderPosition >= this.minSliderPosition && newSliderPosition <= this
							.maxSliderPosition) {
							this.sliderPosition = newSliderPosition;
							this.updateHeight();
						}
					}).exec();
				}
			},
			// 停止拖动
			stopDragging() {
				this.isDragging = false;
			},
			// 根据滑动条的位置更新身高值
			updateHeight() {
				let percentage = (this.maxSliderPosition - this.sliderPosition) / (this.maxSliderPosition - this
					.minSliderPosition);
				this.height = Math.round(this.minHeight + percentage * this.heightRange);
			},
		},
	};
</script>


<style lang="scss" scoped>
	.height-slider-container {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  font-family: Arial, sans-serif;
	  color: white;
	  position: relative;
	}
	
	.height-display {
	  font-size: 20rpx;
	  font-weight: bold;
	  margin-bottom: 10rpx;
	}
	
	.slider-wrapper-container {
	  display: flex;
	  position: relative;
	}
	
	.height-markers {
	  position: relative;
	  margin-right: 20rpx;  /* 调整数字和滑动条之间的距离 */
	}
	
	.marker {
	  position: absolute;
	  font-size: 8rpx;
	  left: 0;
	  opacity: 0.7;
	}
	
	.slider-wrapper {
	  position: relative;
	  height: 220rpx;
	  width: 60rpx;
	  background-color: #6bd7f3;
	  border-radius: 12rpx;
	  overflow: hidden;
	}
	
	.slider-scale {
	  position: relative;
	  height: 100%;
	  width: 100%;
	}
	
	.slider-line {
	  position: absolute;
	  left: 50%;
	  transform: translateX(-50%);
	  width: 10rpx;
	  height: 1rpx;
	  background-color: white;
	}
	
	.slider-mark {
	  position: absolute;
	  left: 50%;
	  transform: translateX(-50%);
	  width: 10rpx;
	  height: 1rpx;
	  background-color: yellow;
	}
	
	.slider-indicator {
	  position: absolute;
	  left: 100%;
	  margin-left: 10px;
	  width: 0;
	  height: 0;
	  border-top: 4rpx solid transparent;
	  border-bottom: 4rpx solid transparent;
	  border-left: 5rpx solid yellow;
	}

</style>