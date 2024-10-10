<template>
	<ContentBox image="@/static/height.jpg">
		<div class="scale-container" @touchstart="onTouchStart" @touchmove="onTouchMove">
			<div class="scale">
				<h3>Smart Scale (Kg)</h3>
				<div class="weight-display">{{ currentWeight.toFixed(1) }} Kg</div>
				<div class="gauge-container">
					<div class="gauge" :style="{ transform: `rotate(${rotationAngle}deg)` }">
						<div v-for="tick in ticks" :key="tick" class="tick"
							:style="{ transform: `rotate(${tick * tickAngle}deg)` }"></div>
					</div>
					<div class="needle"></div>
				</div>
			</div>
		</div>
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

	onMounted(() => {})
</script>

<script>
	export default {
		data() {
			return {
				minWeight: 60, // 最小体重
				maxWeight: 100, // 最大体重
				currentWeight: 70.0, // 当前体重
				touchStartX: 0, // 记录触摸起始位置
				rotationAngle: 0, // 控制刻度盘的旋转角度
				ticks: 41, // 刻度数量（按1kg一个刻度）
				tickAngle: 4.5, // 每个刻度的旋转角度
			};
		},
		methods: {
			onTouchStart(e) {
				this.touchStartX = e.touches[0].clientX;
			},
			onTouchMove(e) {
				const deltaX = e.touches[0].clientX - this.touchStartX;
				this.touchStartX = e.touches[0].clientX; // 重置起始位置

				// 根据滑动的距离调整体重
				const weightChange = deltaX > 0 ? -0.5 : 0.5; // 每次滑动改变的体重
				this.updateWeight(weightChange);
			},
			updateWeight(change) {
				const newWeight = this.currentWeight + change;
				if (newWeight >= this.minWeight && newWeight <= this.maxWeight) {
					this.currentWeight = newWeight;
					this.rotationAngle = (this.currentWeight - this.minWeight) * this.tickAngle; // 更新刻度盘的旋转角度
				}
			}
		}
	};
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

	.scale-container {
		display: flex;
		justify-content: center;
		align-items: center;
		// background-color: #f0f4f8;
	}

	.scale {
		width: 250px;
		background-color: #1976d2;
		border-radius: 20px;
		text-align: center;
		color: white;
		padding: 15px;
	}

	.weight-display {
		font-size: 2rem;
		margin-bottom: 20px;
	}

	.gauge-container {
		position: relative;
		width: 100%;
		height: 120px;
		overflow: hidden;
	}

	.gauge {
		position: absolute;
		width: 200%;
		height: 200%;
		top: 0;
		left: -50%;
		border-radius: 50%;
		border-top: 2px solid transparent;
		border-left: 2px solid transparent;
		transform-origin: 50% 100%;
		/* 控制旋转点 */
		transition: transform 0.3s ease-out;
	}

	.tick {
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 2px;
		height: 20px;
		background-color: white;
		transform-origin: bottom center;
	}

	.needle {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 4px;
		height: 60px;
		background-color: red;
	}
</style>