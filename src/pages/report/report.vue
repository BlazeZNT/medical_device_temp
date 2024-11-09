<template>
	<LayoutContent>
		<view class="pageView">
			<view class="dataBox">
				<view class="dataBox-item">
					<view class="label">WEIGHT</view>
					<view class="value">62.5 <i>Kg</i></view>
					<view class="footer">
						<view class="footerLabel">
							Physique
						</view>
						<view class="footerValue">
							NORMAL
						</view>
					</view>
				</view>
				<view class="dataBox-item">
					<view class="label">BODY FAT</view>
					<view class="value">30.8 <i>%</i></view>
					<view class="footer">
						<view class="progress">
							<up-line-progress :height="4" :percentage="30" :showText="false"></up-line-progress>
						</view>
						<view class="footerValue2">
							Ideal from your weight : <i> 40% </i>
						</view>
					</view>
				</view>
				<view class="dataBox-item">
					<view class="label">BMI</view>
					<view class="value">27.5</view>
					<view class="footer">
						<view class="footerLabel">
							Health Score
						</view>
						<view class="footerValue">
							72.9
						</view>
					</view>
				</view>
			</view>
			<view class="itemBox">
				<view class="itemBox-item" v-for="(item, index) in dataList" :key="index">
					<view class="dot" :style="{ backgroundColor: item.color }"></view>
					<view class="content" :style="{ color: item.color }">{{ item.name }}</view>
					<view class="value">{{ item.value }}</view>
				</view>
			</view>
			<view class="btnsbox">
				<BasicButton style="width:127.08rpx; margin-right: 40rpx;">CONTINUE</BasicButton>
				<BasicButton style="width:127.08rpx;" borderBtn>RETAKE</BasicButton>
			</view>
		</view>
	</LayoutContent>
</template>

<script setup>
	import LayoutContent from "@/components/Layout/Content.vue";
	import BasicButton from "@/components/BasicButton/index.vue";
	
	const dataList = [
		{
			name: 'Fat Free weight',
			value: '40.2%',
			color: '#F7A67B'
		},
		{
			name: 'Skeletal Muscle',
			value: '30.6%',
			color: '#12FFBB'
		},
		{
			name: 'Subcutaneous Fat',
			value: '22.4%',
			color: '#48ACD4'
		},
		{
			name: 'Muscle Mass',
			value: '22.4%',
			color: '#B9C96F'
		},
		{
			name: 'Visceral Fat',
			value: '10.0',
			color: '#14F3B4'
		},
		{
			name: 'Bone Mass',
			value: '45kg',
			color: '#A59DF5'
		},
		{
			name: 'Body Water',
			value: '54.6%',
			color: '#AC5FE7'
		},
		{
			name: 'Protein',
			value: '10.4%',
			color: '#DE7373'
		},
		{
			name: 'BMR',
			value: '564.8kcal',
			color: '#5FAEE7'
		},
		{
			name: 'Metabolic Age',
			value: '36.5',
			color: '#58FFCF'
		}
	]
</script>

<style lang="scss" scoped>
	.pageView {
		width: 100%;
		height: 100%;
	}

	.itemBox {
		width: 100%;
		flex-shrink: 0;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-column-gap: 7rpx;
		grid-row-gap: 7rpx;

		.itemBox-item {
			background: rgba(#2F3944, 0.5);
			border-radius: 2rpx 2rpx 2rpx 2rpx;
			border: 1rpx solid rgba(6, 255, 184, 0.3);
			display: flex;
			padding: 10rpx 12rpx;
			align-items: center;

			.dot {
				width: 6.25rpx;
				height: 6.25rpx;
				border-radius: 100%;
				background: red;
				margin-right: 10rpx;
			}

			.content {
				font-family: FM;
				font-weight: 500;
				font-size: 9rpx;
				color: #48ACD4;
				line-height: 11rpx;
				text-align: left;
				font-style: normal;
				text-transform: none;
				flex: 1;
			}

			.value {
				font-family: FB;
				font-weight: 800;
				font-size: 10rpx;
				color: #FFFFFF;
				line-height: 13rpx;
				text-align: right;
				font-style: normal;
				text-transform: none;
			}
		}
	}

	.dataBox {
		flex-shrink: 0;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		width: 100%;
		height: 120rpx;
		margin-bottom: 10rpx;

		.dataBox-item {
			width: 100%;
			height: 100%;
			background: linear-gradient(180deg, #364351 0%, rgba(31, 37, 45, 0) 100%);
			border: 1rpx solid;
			border-image: linear-gradient(180deg,
					rgba(88.00000235438347, 255, 207.00000286102295, 1),
					rgba(32.00000189244747, 38.0000015348196, 45.00000111758709, 1)) 1 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.label {
				font-family: FB;
				font-weight: 700;
				font-size: 12rpx;
				color: #12ffbb;
				line-height: 11rpx;
				text-align: center;
				font-style: normal;
				text-transform: none;
				margin-bottom: 20rpx;
			}

			.value {
				font-family: FL;
				font-weight: 700;
				font-size: 24rpx;
				color: #ffffff;
				line-height: 11rpx;
				text-align: center;
				font-style: normal;
				text-transform: none;

				i {
					font-size: 10rpx;
					color: rgba(255, 255, 255, 0.5);
				}
			}

			.footer {
				margin-top: 20rpx;

				.footerLabel {
					font-family: FM;
					font-weight: 500;
					font-size: 10rpx;
					color: #06FFB8;
					line-height: 9rpx;
					text-align: center;
					font-style: normal;
					text-transform: none;
					margin-bottom: 10rpx;
				}

				.footerValue {
					font-family: FB;
					font-weight: 700;
					font-size: 12rpx;
					color: #FFFFFF;
					line-height: 11rpx;
					text-align: center;
					font-style: normal;
					text-transform: none;
				}

				.progress {
					margin-bottom: 10rpx;
				}

				.footerValue2 {
					font-family: FL;
					font-size: 8rpx;
					color: #FFFFFF;
					line-height: 11rpx;
					text-align: center;
					font-style: normal;
					text-transform: none;
					color: rgba(255, 255, 255, 0.5);

					i {
						font-family: FB;
						color: #06FFB8;
					}
				}
			}
		}
	}

	.btnsbox {
		flex-shrink: 0;
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>