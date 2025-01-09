<template>
	<LayoutContent >
		<view class="pageView">
			<view class="pageView-title">
				<i>Welcome, Debra.</i> What do you need today?
			</view>

			<view class="btns">
				<!-- Left Arrow -->
				<view
					class="leftback"
					v-if="state.currentIndex > 0"
					@click="clickArrow(1)"
				>
					<image src="@/static/back.png" alt="Left Arrow"></image>
				</view>

				<!-- Visible Cards -->
				<scroll-view class="scroll-view" scroll-x="true" ref="scrollView">
					<view
						class="scroll-view-item"
						v-for="item in visibleCards"
						:key="item.id"
					>
						<BtnCard>
							<view class="icon">
								<image :src="item.icon" mode="heightFix" @click = "handleClickCard(item.id)"></image>
							</view>
							<view class="text">{{ item.name }}</view>
						</BtnCard>
					</view>
				</scroll-view>

				<!-- Right Arrow -->
				<view
					class="rightback"
					v-if="state.currentIndex + 3 < btnCards.length"
					@click="clickArrow(2)"
				>
					<image src="@/static/back.png" alt="Right Arrow"></image>
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
	

	import { ref, reactive, computed } from "vue";
	
	const btnCards = [
		{ id: 1, icon: "/static/health/1.png", name: "GENERAL CHECKUP" },
		{ id: 2, icon: "/static/health/2.png", name: "ADVANCE TEST" },
		{ id: 6, icon: "/static/health/6.png", name: "EYE EXAMINATION" },
		{ id: 3, icon: "/static/health/3.png", name: "REPORT" },
		{ id: 4, icon: "/static/health/4.png", name: "E-HEALTH RECORD" },
		{ id: 5, icon: "/static/health/5.png", name: "TELE MEDICINE" },
	];
	
	const state = reactive({
		currentIndex: 0, // Tracks the starting index of visible cards
	});
	
	// Dynamically compute visible cards (3 at a time)
	const visibleCards = computed(() => {
		return btnCards.slice(state.currentIndex, state.currentIndex + 3);
	});
	const handleClickCard = (type) => {
			switch (type) {
				case 1:
					slibrary.$router.go("/pages/health/detection");
					break;
				case 3:
					slibrary.$router.go("/pages/report/report");
					break;
				case 4:
					slibrary.$router.go("/pages/login/login");
					break;
				case 5:
					slibrary.$router.go("/pages/telemedicine/choicePage");
					break;
				case 6:
					slibrary.$router.go("/pages/eye_examination/index");
					break;
					
			}
		}
	
	// Handle arrow clicks
	const clickArrow = (type) => {
		if (type === 1 && state.currentIndex > 0) {
			// Move left
			state.currentIndex -= 3;
		} else if (type === 2 && state.currentIndex + 3 < btnCards.length) {
			// Move right
			state.currentIndex += 3;
		}
	};
	
	
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
			scroll-behavior: smooth; /* Enables smooth scrolling */
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
							width: 100%;
							height: 100%;
							object-fit: contain;
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
		z-index: 10;

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