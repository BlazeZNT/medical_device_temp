<template>
	<view class="page">
		<view class="logo">
			<image src="@/static/logo.png"></image>
		</view>
		<view class="card">
			<view class="header">
				<view class="pinBox_title">
					Customize your Test
				</view>
			</view>
			<view class="content">
				<view class="selectAll">
					<up-button type="default" size="mini" text="Select All"
						:customStyle="{ width: '100rpx', border: '1px solid #333'}" shape="circle"></up-button>
				</view>
				<view class="selectItemBox">
					<view class="title">
						General Health Checkup
					</view>
					<view class="items">
						<up-row gutter="30">
							<up-col span="3" v-for="(item, index) in generalHealthCheckupTags" :key="index">
								<view class="item">
									<up-button :type="selectTags.includes(item.label) ? 'primary' : 'default'"
										size="mini" :text="item.label" :customStyle="{ border: '1px solid #333'}"
										shape="circle" @click="handleClickItem(item)"></up-button>
								</view>
							</up-col>
						</up-row>
					</view>
				</view>
				<view class="selectItemBox">
					<view class="title">
						Advanced Tests
					</view>
					<view class="items">
						<up-row gutter="30">
							<up-col span="3" v-for="(item, index) in generalHealthCheckupTags" :key="index">
								<view class="item">
									<up-button :type="selectTags.includes(item.label) ? 'primary' : 'default'"
										size="mini" :text="item.label" :customStyle="{ border: '1px solid #333'}"
										shape="circle" @click="handleClickItem(item)"></up-button>
								</view>
							</up-col>
						</up-row>
					</view>
				</view>
			</view>
			<view class="footer">
				<up-button type="primary" size="mini" text="Submit" :customStyle="{ width: '240rpx'}"
					@click="handleClickGotiRegister"></up-button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import slibrary from '@/slibrary/index.js'
	import {
		ref,
		reactive
	} from 'vue';


	const generalHealthCheckupTags = ref([{
			label: 'Height'
		},
		{
			label: 'Blood Pressure'
		},
		{
			label: 'SP02'
		},
		{
			label: 'Hemoglobin'
		},
		{
			label: 'SP02'
		},
		{
			label: 'Body Fat'
		},
		{
			label: 'Height'
		},
		{
			label: 'Body Fat'
		},
		{
			label: 'Hemoglobin'
		},
		{
			label: 'Vision'
		}
	])

	const advancedTests = ref([{
			label: 'Height'
		},
		{
			label: 'Blood Pressure'
		},
		{
			label: 'SP02'
		},
		{
			label: 'Hemoglobin'
		},
		{
			label: 'SP02'
		},
		{
			label: 'Body Fat'
		},
		{
			label: 'Height'
		},
		{
			label: 'Body Fat'
		},
		{
			label: 'Hemoglobin'
		},
		{
			label: 'Vision'
		}
	])

	const selectTags = ref([])

	const handleClickItem = (item) => {
		if (selectTags.value.includes(item.label)) {
			selectTags.value = selectTags.value.filter(s => s == item.label)
			return
		}
		selectTags.value.push(item.label)
	}

	const handleClickGotiRegister = () => {
		slibrary.$router.go('/pages/health/detection')
	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		padding: 20rpx auto;
		position: relative;

		.logo {
			width: 92rpx;
			height: 77.5rpx;
			position: fixed;
			top: 20rpx;
			left: 50%;
			transform: translateX(-50%);


			image {
				width: 100%;
				height: 100%;
			}
		}

		.card {
			background: #fff;
			width: 80%;
			height: 75%;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			border-radius: 10rpx 10rpx 0 0;
			display: flex;
			flex-direction: column;
			padding: 10rpx;

			.header {
				flex-shrink: 0;
				padding: 5rpx;

				.pinBox_title {
					text-align: center;
					font-size: 14rpx;
					color: #202224;
					font-weight: bold;
					margin-bottom: 10rpx;
				}

				.pinBox_tip {
					text-align: center;
					font-size: 10rpx;
					color: #202224;
				}
			}

			.footer {
				flex-shrink: 0;
				display: flex;
				padding: 5rpx;
			}

			.content {
				flex: 1;
				overflow: hidden;
				overflow-y: auto;
				padding: 0 10rpx;
				font-size: 8rpx;
				color: #333;
				line-height: 14rpx;

				.selectItemBox {
					margin-top: 5rpx;

					.title {
						font-size: 14rpx;
						color: #4880FF;
						font-weight: bold;
					}

					.items {
						margin-top: 10rpx;
						width: 100%;

						.item {
							margin-bottom: 5rpx;
						}
					}
				}
			}
		}
	}
</style>