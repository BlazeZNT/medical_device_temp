<template>
	<LayoutContent showBack @back="handleClickHome">
		<view class="pageView">
			<view class="pageView-title"></view>
<!-- 			<view class="form">
				<BasicButton @click="handleClickSubmit">
					Submit
				</BasicButton>
			</view> -->
		</view>
		<!-- <view class="pageView" v-else-if="state.step == 2">
			<view class="pageView-title">Input <i>Pin Verification</i></view>
			<view class="pinBox">
				<CodeInput :digitboxcount="6"></CodeInput>
				<view class="pinBtn">
					<BasicButton @click="handleClickLoginCreate">
						CREATE
					</BasicButton>
				</view>
			</view>
		</view> -->
	</LayoutContent>
</template>

<script setup>
	import LayoutContent from "@/components/Layout/Content.vue";
	import slibrary from "@/slibrary/index.js";
	import BasicButton from "@/components/BasicButton/index.vue";
	import CodeInput from "@/components/CodeInput/index.vue";

	import {
		ref,
		reactive
	} from "vue";
	
	import {
		sendCode
	} from "@/services/api/auth";


	const state = reactive({
		step: 1,
		userInfo: {
			name: '',
			gender: '',
			email: '',
			birth: '',
			phone: '',
			blood: '',
		},
		genders: [{
				text: 'Male',
				value: 'Man'
			},
			{
				text: 'Female',
				value: 'Woman'
			},
			{
				text: 'Secrecy',
				value: 'null'
			},
		],blood: [
			{ text: 'A+', value: 'A+' },
			{ text: 'A-', value: 'A-' },
			{ text: 'B+', value: 'B+' },
			{ text: 'B-', value: 'B-' },
			{ text: 'AB+', value: 'AB+' },
			{ text: 'AB-', value: 'AB-' },
			{ text: 'O+', value: 'O+' },
			{ text: 'O-', value: 'O-' }
		]
	});

	// const loading = ref(false);
	// const handleClickBack = () => {
	// 	if (state.setp != 1) {
	// 		state.setp = state.setp - 1;
	// 	}
	// };
	// const handleClickRegister = () => {
	// 	state.step = 2
	// }

	const handleClickHome = () => {
		slibrary.$router.go("/pages/health/index");
	}
	const handleClickSubmit = () => {
		slibrary.$router.go("/pages/telemedicine/current");
	}


	// const handleTapVerify = async () => {
	// 	loading.value = true;

	// 	setTimeout(() => {
	// 		slibrary.$helper.toast("Successfully sent！");
	// 		setTimeout(() => {
	// 			loading.value = false;
	// 			slibrary.$router.go("/pages/login/pin");
	// 		}, 1500);
	// 	}, 1000);
	// 	// try {
	// 	// 	const res = await sendCode({
	// 	// 		email: form.value.email
	// 	// 	})
	// 	// 	slibrary.$helper.toast('Successfully sent！')
	// 	// 	setTimeout(() => {
	// 	// 		loading.value = false
	// 	// 		slibrary.$router.go('/pages/login/pin')
	// 	// 	}, 1500)
	// 	// }catch(err) {
	// 	// }
	// };
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