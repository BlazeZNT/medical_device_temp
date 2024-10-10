<template>
	<ContentBox image="@/static/height.jpg">
		<view class="box">
			<view class="title">
				Visual Acuity Testing
			</view>
			<view class="remark">
				Snellan created his chart using a geometric scalethat gives an exact measurement of a person'svisual
				acuity. The chart has 6 lines of capitalizedblock letters, known as optotypes.
			</view>

			<view>
				Instruction : <br />
				To be read from a distance of 7 feet.
			</view>

			<view class="btn" @click="show = true">Start</view>


			<up-popup :show="show" mode="center"  @close="close" >
				<view class="popupBox">
					<image src="@/static/eye.png" mode="widthFix" style="width: 100%;"></image>
					
					<view class="btn popupBtn" @click="close">Finish</view>
				</view>
			</up-popup>
		</view>
		<view>
			asd
		</view>
	</ContentBox>
</template>

<script>
	import steps from '../../uni_modules/uview-plus/components/u-steps/steps';
	import ContentBox from './ContentBox.vue'

	export default {
		components: {
			ContentBox
		},
		data() {
			return {
				show: false
			}
		},
		mounted() {},
		methods: {
			close() {
				// 关闭逻辑，设置 show 为 false  
				this.show = false;
				// console.log('close');  
			}
		}
	};
</script>


<style lang="scss" scoped>
	.box {
		width: 600rpx;
		height: 600rpx;
	}

	.title {
		font-size: 40rpx;
		color: #fff;
		margin-bottom: 20rpx;
		text-align: center;
	}

	.remark {
		font-size: 34rpx;
		color: #fff;
		width: 700rpx;
		margin-bottom: 20rpx;
	}

	.btn {
		margin-left: 250rpx;
		text-align: center;
		display: inline-block;
		padding: 20rpx 40rpx;
		background-color: green;
		border: 4rpx solid #fff;
		border-radius: 10rpx;
		margin-top: 40rpx;
	}

	.popupBox {
		width: 80vw;
		height: 80vh;
		background-color: #fff;
	}
	.popupBtn {
		position: absolute;
		right: 20rpx;
		bottom: 20rpx;
	}
</style>