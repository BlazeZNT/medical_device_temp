<template>
	<view>
		<view class="rulerContainer">
			<swiper v-if="ruleType === 'cm'" @animationfinish="finishRuler" :current="current"
				:display-multiple-items="40" :acceleration="true" :int="false">
				<swiper-item v-for="(item, index) in initialItems" :key="index">
					<view class="swiper-item">
						<view class="zoro-line" :class="getLineClass(index)"></view>
						<view class="text-num-init" v-if="isTextVisible(index)">
							<view class="zoro-line-num" :class="getNumClass(index)">{{ getNumText(index) }}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="line"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "SwiperRuler",
		props: {
			current: {
				type: [Number, String],
				default: 0
			},
			maxValue: {
				type: Number,
				default: 225
			},
			ruleType: {
				type: String,
				default: 'cm'
			}
		},
		computed: {
			initialItems() {
				return [...Array(15).keys()].concat([...Array(this.maxValue + 226).keys()]);
			}
		},
		methods: {
			finishRuler(e) {
				const value = this.ruleType === 'cm' ? (e.detail.current / 10) : (1 / 16) * e.detail.current;
				console.log(value);  // Log the calculated value to the console
				this.$emit('finishRuler', value);
			},
			getLineClass(index) {
				return ((index) % 10 === 0 || (index) % 10 === 5) ? 'num-line-6' : 'num-line-3';
			},
			isTextVisible(index) {
				return (index / 5) % 1 === 0;
			},
			getNumClass(index) {
				return (index / 10) >= 10 ? 'big-line-num' : '';
			},
			getNumText(index) {
				return (index / 10).toString();
			}
		}
	};
</script>

<style>
	.rulerContainer .uni-swiper-slide-frame {
		left: 50%;
		width: 8upx !important;
	}
</style>

<style scoped>
	.rulerContainer {
		text-align: center;
		height: 75rpx;
		width: 250rpx;
		background: #56CCF2;
		border-radius: 6rpx;
		padding: 20rpx 20rpx;
		position: relative;
	}

	.rulerContainer uni-swiper {
		height: 75upx;
	}

	.rulerContainer .icon-top-img {
		width: 7upx;
		height: 14upx;
	}

	.swiper-item {
		width: 100%;
		height: 40upx;
		margin: 0;
	}

	.rulerContainer uni-swiper-item {
		overflow: initial;
	}

	.rulerContainer .zoro-line {
		position: relative;
		width: 100%;
		text-align: left;
	}

	.rulerContainer .zoro-line::before {
		display: block;
		content: "";
		height: 40upx;
		position: absolute;
		border-left: 1px solid #fff;
		top: 0;
		left: 0;
	}

	.rulerContainer .num-line-3::before,
	.rulerContainer .num-line-5::before,
	.rulerContainer .num-line-7::before,
	.rulerContainer .num-line-9::before,
	.rulerContainer .num-line-11::before,
	.rulerContainer .num-line-13::before {
		height: 8upx;
	}

	.rulerContainer .num-line-6::before,
	.rulerContainer .num-line-10::before {
		height: 16upx;
		border-width: 1px;
	}

	.rulerContainer .num-line-1::before,
	.rulerContainer .num-line-15::before {
		height: 8upx;
		border-width: 1px;
	}

	.rulerContainer .num-line-12::before,
	.rulerContainer .num-line-4::before {
		height: 19upx;
	}

	.rulerContainer .num-line-8::before {
		height: 24upx;
		border-width: 1px;
	}

	.rulerContainer .num-line-2::before,
	.rulerContainer .num-line-14::before {
		height: 16upx;
	}

	.rulerContainer .zoro-line-num {
		padding-top: 25rpx;
		width: 100%;
		left: 0;
		text-align: left;
		color: #fff;
		font-size: 9upx;
	}

	.rulerContainer .big-line-num {
		left: -7upx;
	}

	.rulerContainer .text-num-init {
		text-align: left;
		width: 100%;
		display: block;
		height: 100%;
	}

	.line {
		position: absolute;
		height: 100%;
		width: 2rpx;
		background: #fff;
		left: 50%;
		top: 0;
	}
</style>
