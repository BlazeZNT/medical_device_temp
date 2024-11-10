<template>
	<LayoutContent>
		<view class="pageView">
			<view class="pageView-title"><i>Welcome, Debra.</i> What do you need today?</view>
			<view class="btns">
				<scroll-view class="scroll-view" scroll-x="true" scroll-left="0" @scroll="scroll"
					@scrolltoupper="scrolltoupper" @scrolltolower="scrolltolower">
					<view id="demo1" class="scroll-view-item">
						<view class="card" @click="handleClickCard(1)">
							<BtnCard>
								<view class="icon">
									<image src="@/static/health/1.png" mode="heightFix"></image>
								</view>
								<view class="text">GENERAL<br />CHECKUP</view>
							</BtnCard>
						</view>
					</view>
					<view id="demo1" class="scroll-view-item">
						<view class="card" @click="handleClickCard(2)">
							<BtnCard>
								<view class="icon">
									<image src="@/static/health/2.png" mode="heightFix"></image>
								</view>
								<view class="text">ADVANCE TEST<br />&nbsp;</view>
							</BtnCard>
						</view>
					</view>
					<view id="demo1" class="scroll-view-item">
						<view class="card" @click="handleClickCard(3)">
							<BtnCard>
								<view class="icon">
									<image src="@/static/health/3.png" mode="heightFix"></image>
								</view>
								<view class="text">REPORT<br />&nbsp;</view>
							</BtnCard>
						</view>
					</view>
					<view id="demo1" class="scroll-view-item">
						<view class="card" @click="handleClickCard(4)">
							<BtnCard>
								<view class="icon">
									<image src="@/static/health/4.png" mode="heightFix"></image>
								</view>
								<view class="text">E-HEALTH<br />RECORD</view>
							</BtnCard>
						</view>
					</view>
					<view id="demo1" class="scroll-view-item">
						<view class="card" @click="handleClickCard(5)">
							<BtnCard>
								<view class="icon">
									<image src="@/static/health/5.png" mode="heightFix"></image>
								</view>
								<view class="text">TELE MEDICINE<br />&nbsp;</view>
							</BtnCard>
						</view>
					</view>
				</scroll-view>
				<view class="leftback" v-if="state.scrollLeft > 0">
					<image src="@/static/back.png"></image>
				</view>
				<view class="rightback" v-if="state.scrollLeft > 0 && !state.scrollRightFlag">
					<image src="@/static/back.png"></image>
				</view>
				<view class="rightback" v-if="state.scrollLeft == 0">
					<image src="@/static/back.png"></image>
				</view>
			</view>
		</view>
	</LayoutContent>
</template>

<script setup>
	import LayoutContent from "@/components/Layout/Content.vue";
	import slibrary from "@/slibrary/index.js";
	import BasicButton from "@/components/BasicButton/index.vue";
	import BtnCard from "@/components/Card/BtnCard.vue";

	import {
		ref,
		reactive
	} from "vue";

	// 使用 reactive 创建响应式状态
	const state = reactive({
		step: 1,
		scrollLeft: 0,
		scrollLeftFlag: true,
		scrollRightFlag: false
	});

	const handleClickCard = (type) => {
		switch (type) {
			case 1:
				slibrary.$router.go("/pages/health/detection");
				break;
			case 3:
				slibrary.$router.go("/pages/report/report");

		}
	}

	const scroll = (e) => {
		state.scrollLeft = e.detail.scrollLeft
		if (state.scrollLeft == 0) {
			state.scrollLeftFlag = true
		} else {
			state.scrollLeftFlag = false
		}
		// state.scrollRightFlag = false
	}
	const scrolltoupper = (e) => {
		state.scrollLeftFlag = true
	}

	const scrolltolower = (e) => {
		state.scrollRightFlag = true
	}
</script>

<style lang="scss" scoped>
	.pageView {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		&-title {
			font-family: FB;
			color: #fff;
			font-size: 20px;
			margin-bottom: 70px;

			i {
				color: #06ffb8;
			}
		}
	}

	.btns {
		width: 100%;
		height: 219rpx;
		padding-left: 65rpx;
		padding-right: 65rpx;
		position: relative;

		.scroll-view {
			white-space: nowrap;
			height: 100%;

			.scroll-view-item {
				display: inline-block;
				margin-right: 29rpx;
				width: 167rpx;
				height: 219rpx;

				.card {
					width: 100%;
					height: 100%;
					margin-right: 1-rpx;

					.icon {
						height: 47.74rpx;
						margin-bottom: 47px;

						image {
							height: 100%;
						}
					}

					.text {
						text-align: center;
						font-family: FB;
						font-size: 15rpx;
						color: #5beaff;
					}
				}
			}
		}
	}

	.leftback,
	.rightback {
		position: absolute;
		top: 50%;
		position: absolute;
		width: 29.17rpx;
		height: 29.17rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.leftback {
		left: 50rpx;
		transform: scale(1.5) translateY(-50%);
	}

	.rightback {
		right: 55rpx;
		transform: scale(1.5) rotate(180deg) translateY(50%);
	}
</style>