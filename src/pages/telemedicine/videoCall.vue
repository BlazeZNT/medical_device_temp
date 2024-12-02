<template>
	<LayoutContent showBack @click="handleClickHome">
		<view class="pageView">
			<view class="pageView-title">Video Call</view>
			<view class="form">
				<uni-forms
					label-position="top"
					label-width="120rpx"
					:border="false"
				>
					<div>
						<!-- <view class = "video">
							<VideoCallComponent />
						</view> -->
					</div>
				</uni-forms>
			</view>
		</view>
	</LayoutContent>
</template>

<script>
// import VideoCallComponent from "@/components/videoCall/videoTest.nvue";
import { reactive, ref } from "vue";
import LayoutContent from "@/components/Layout/Content.vue";
import BasicButton from "@/components/BasicButton/index.vue";
import CustomCalendar from "@/components/CustomCalendar/index.vue";

export default {
	components: {
		LayoutContent,
		BasicButton,
		CustomCalendar,
	},

};

const handleClickHome = () => {
  slibrary.$router.go("/pages/telemedicine/choicePage");
};
</script>

<style lang="scss" scoped>
.pageView {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	.pinBox {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.pinBtn {
			margin-top: 50rpx;
			width: 436rpx;
			display: flex;
			justify-content: center;
		}
	}
	.video {
	    max-height: 500px;
	    max-width: 500px;
	}

	&-title {
		font-family: FB;
		color: #fff;
		font-size: 20px;
		margin-bottom: 20px;

		i {
			color: #06ffb8;
		}
	}
}
.form {
	width: 386.46rpx;

	.column {
		display: flex;
		width: 100%;
	}
}

:deep() {
	.uni-forms-item {
		flex: 1;
	}

	.uni-forms-item__label {
		font-family: FL;

		text {
			color: #58FFCF;
			font-size: 9rpx !important;
			line-height: 10rpx;
			text-align: left;
			font-style: normal;
			text-transform: none;
		}
	}

	.uni-easyinput__content.is-input-border {
		background-color: transparent !important;
		border: 1px solid #D8D8D8 !important;
		color: #fff !important;
	}

	.uni-select__input-text {
		color: #fff !important;
		font-size: 9rpx !important;
		line-height: 10rpx;
	}

	.uni-select__selector {
		background: #323D49 !important;
		box-shadow: 0rpx 7rpx 7rpx 4rpx #1B2028 !important;
		border-radius: 2rpx 2rpx 2rpx 2rpx !important;
		border: none !important;
	}

	.uni-popper__arrow_bottom {
		display: none !important;
	}

	.uni-select__selector-item {
		padding: 4rpx 6rpx !important;

		text {
			color: #fff !important;
			font-size: 9rpx;
			color: #FFFFFF;
			line-height: 13rpx;
		}
	}

	.uni-date-x--border {
		border: 1px solid #D8D8D8 !important;
	}

	.uni-date-x {
		background: transparent !important;
		color: #fff !important;
	}

	.uni-calendar__content {
		background: #323D49 !important;
	}

	.uni-calendar-item--disable .uni-calendar-item__weeks-box-text-disable {
		color: #666 !important;
	}

	.uni-calendar-item__weeks-box-text {
		color: #fff !important;
	}

	.uni-datetime-picker--btn {
		background-color: #58FFCF !important;
	}
}
</style>