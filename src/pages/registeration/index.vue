<template>
	<LayoutContent showBack @back="handleClickBack">
		<view class="pageView" v-if="state.step == 1">
			<view class="pageView-title">Create Patient Account</view>
			<view class="form">
				<uni-forms label-position="top" label-width="120rpx" :border="false" :modelValue="state.userInfo">
					<view class="column">
						<uni-forms-item label="Name*" name="name" style="margin-right: 20rpx;">
							<uni-easyinput type="text" v-model="state.userInfo.name" placeholder="Name" />
						</uni-forms-item>
						<uni-forms-item label="Email*" name="email">
							<uni-easyinput type="text" v-model="state.userInfo.email" placeholder="Email" />
						</uni-forms-item>
					</view>
					<view class="column">
						<uni-forms-item label="Gender*" name="gender" style="margin-right: 20rpx;">
							<uni-data-select v-model="state.userInfo.gender" :localdata="state.genders"
								placeholder="Select Gender"></uni-data-select>
						</uni-forms-item>
						<uni-forms-item label="Blood Group" name="Blood">
							<uni-data-select v-model="state.userInfo.blood" :localdata="state.blood"
								placeholder="Select Gender"></uni-data-select>
						</uni-forms-item>
					</view>
					<view class="column">
						<uni-forms-item label="Date of birth" name="birth" style="margin-right: 20rpx;">
							<uni-datetime-picker type="date" :value="state.userInfo.birth" start="1940-1-1" />
						</uni-forms-item>
						<uni-forms-item label="Aadhar Card Number" name="email">
							<uni-easyinput type="text" v-model="state.userInfo.email" placeholder="Card Number" />
						</uni-forms-item>
					</view>
					<view class="column">
						<uni-forms-item label="Phone Number*" name="phone" style="margin-right: 20rpx;">
							<uni-easyinput type="text" v-model="state.userInfo.name" placeholder="Phone Number" />
						</uni-forms-item>
						<uni-forms-item label="Unique ID" name="email">
							<uni-easyinput type="email" v-model="state.userInfo.email" placeholder="ID Number" />
						</uni-forms-item>
					</view>
				</uni-forms>
				<BasicButton @click="handleClickRegister">
					Register
				</BasicButton>
			</view>
		</view>
		<view class="pageView" v-else-if="state.step == 2">
			<view class="pageView-title">Input <i>Pin Verification</i></view>
			<view class="pinBox">
				<CodeInput :digitboxcount="6"></CodeInput>
				<view class="pinBtn">
					<BasicButton @click="handleClickLoginCreate">
						CREATE
					</BasicButton>
				</view>
			</view>
		</view>
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
	// import {
	// 	sendCode
	// } from "@/services/api/auth";

	// 使用 reactive 创建响应式状态
	const state = reactive({
		step: 1,
		userInfo: {
			name: '',
			gender: '',
			email: '',
			birth: '',
			phone: ''
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
		],
		rules: {
			'name': {
				type: 'string',
				required: true,
				message: 'Name',
				trigger: ['blur', 'change'],
			},
			'gender': {
				required: true,
				message: 'gender',
				trigger: ['blur', 'change'],
			},
			'email': {
				type: 'string',
				required: true,
				message: 'email',
				trigger: ['blur', 'change'],
			},
			'birth': {
				required: true,
				message: 'birth',
				trigger: ['blur', 'change'],
			},
			'phone': {
				type: 'string',
				required: true,
				message: 'phone',
				trigger: ['blur', 'change'],
			},
		},
		radio: '',
		switchVal: false,
	});

	const loading = ref(false);
	const handleClickBack = () => {
		if (state.setp != 1) {
			state.setp = state.setp - 1;
		}
	};
	const handleClickRegister = () => {
		state.step = 2
	}

	const handleClickLoginCreate = () => {
		slibrary.$router.go("/pages/health/index");
	}


	const handleTapVerify = async () => {
		loading.value = true;

		setTimeout(() => {
			slibrary.$helper.toast("Successfully sent！");
			setTimeout(() => {
				loading.value = false;
				slibrary.$router.go("/pages/login/pin");
			}, 1500);
		}, 1000);
		// try {
		// 	const res = await sendCode({
		// 		email: form.value.email
		// 	})
		// 	slibrary.$helper.toast('Successfully sent！')
		// 	setTimeout(() => {
		// 		loading.value = false
		// 		slibrary.$router.go('/pages/login/pin')
		// 	}, 1500)
		// }catch(err) {
		// }
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