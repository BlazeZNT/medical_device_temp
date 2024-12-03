<template>
	<LayoutContent showBack @back="handleClickHome">
		<view class="pageView">
			<view class="pageView-title">AiChat</view>
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
import { reactive, ref } from "vue";
import LayoutContent from "@/components/Layout/Content.vue";
import BasicButton from "@/components/BasicButton/index.vue";
import CustomCalendar from "@/components/CustomCalendar/index.vue";
import slibrary from "@/slibrary/index.js"; // Ensure this is imported

export default {
	components: {
		LayoutContent,
		BasicButton,
		CustomCalendar,
	},
	 methods: {
	    handleClickHome() {
	      console.log("Navigating home...");
	      slibrary.$router.go("/pages/telemedicine/current");
	    },
	  },
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

</style>