<template>
	<ContentBox image="@/static/height.jpg">
		<view class="box">
			<view class="step1" v-if="!showData">
				<view class="title">Steps to follow:</view>
				<view class="checkItem" v-for="item in steps" :key="item.id">
					<view class="checkItemLabel">{{ item.id }}: {{ item.name }}</view>
					<view class="loading">
						<up-loading-icon color="red" v-if="item.showLoading && !item.done"></up-loading-icon>
						<up-icon name="checkmark-circle-fill" color="#2979ff" size="30" v-if="item.done"></up-icon>
					</view>
				</view>
			</view>
			<view class="dataBox" v-if="showData">
				<view class="showDataBox">
					<view class="num">103</view>
					<view class="tips">mg/dL</view>
				</view>
			</view>
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
				step: 1,
				steps: [{
						id: 1,
						name: 'Insert Strip',
						showLoading: false,
						done: false
					},
					{
						id: 2,
						name: 'Add Blood',
						showLoading: false,
						done: false
					}
				],
				showData: false
			}
		},
		mounted() {
			this.initMock()
		},
		methods: {
			initMock() {
				let completedCount = 0; // 计数器
				const totalSteps = this.steps.length; // 获取总项数
				this.steps.forEach((item, index) => {
					setTimeout(() => {
						item.showLoading = true
					}, index * 2000); // 根据索引设置延迟
					setTimeout(() => {
						completedCount++; // 增加已完成计数器
						if (completedCount === totalSteps) {
							console.log("所有项都已完成");
							// 这里可以执行循环完成后的操作
							this.showData = true
						}
						item.done = true
					}, index * 2000 + 1000); // 根据索引设置延迟
				})
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
		font-size: 36rpx;
		margin-bottom: 20rpx;
	}

	.checkItem {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 40rpx;

		.checkItemLabel {
			margin-right: 20rpx;
			font-size: 30rpx;
			width: 100%;
		}
	}
	
	.dataBox {
		width: 500rpx;
		height: 500rpx;
		border-radius: 100%;
		border: 4rpx solid green;
		
		background-image: linear-gradient(to right, rgba(#fff, 0.4), rgba(#fff, 0.2));
		
		display: flex;
		justify-content: center;
		align-items: center;
		
		.showDataBox {
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			font-weight: bold;
			
			.num {
				color: green;
				font-size: 100rpx;
			}
			.tips {
				color: green;
				font-size: 50rpx;
			}
		}
	}
</style>