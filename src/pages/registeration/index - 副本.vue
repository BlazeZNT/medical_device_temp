<template>
	<view class="page">
		<view class="logo">
			<image src="@/static/logo.png"></image>
		</view>
		<view class="card">
			<view class="header">
				<view class="pinBox_title">
					Create an Account
				</view>
			</view>
			<view class="content">
				<up-form :labelWidth="100" labelPosition="top" :model="state.userInfo" :rules="state.rules"
					ref="formRef">
					<up-row :gutter="40">
						<up-col span="6">
							<up-form-item label="Name" prop="name" borderBottom ref="item1">
								<up-input v-model="state.userInfo.name" placeholder="Name"></up-input>
							</up-form-item>
						</up-col>
						<up-col span="6">
							<up-form-item label="Email" prop="email" borderBottom ref="item1">
								<up-input v-model="state.userInfo.email" placeholder="Email"></up-input>
							</up-form-item>
						</up-col>
					</up-row>
					<up-row :gutter="40">
						<up-col span="6">
							<up-form-item label="Gender" prop="gender" borderBottom ref="item1"
								@click="state.showSex = true;">
								<up-input v-model="state.userInfo.gender" disabled disabledColor="#ffffff"
									placeholder="Please select gender">
									<template #suffix>
										<up-icon name="arrow-down"></up-icon>
									</template>
								</up-input>
							</up-form-item>
						</up-col>
						<up-col span="6">
							<up-form-item label="Date of Birth" prop="birth" borderBottom>
								<up-datetime-picker style="width: 100%;" hasInput v-model="state.dateTime"
									mode="date" :formatter="formatter" @change="dateChange"></up-datetime-picker>
							</up-form-item>
						</up-col>
					</up-row>
					<up-row :gutter="40">
						<up-col span="6">
							<up-form-item label="Phone Number" prop="phone" borderBottom ref="item1">
								<up-input v-model="state.userInfo.phone" placeholder="Phone Number"></up-input>
							</up-form-item>
						</up-col>
					</up-row>
					<!-- <up-row :gutter="40">
						<up-col span="6">
							<up-form-item label="Phone Number" prop="userInfo.phone" borderBottom ref="item1">
								<up-input v-model="state.model1.userInfo.phone" placeholder="Name"></up-input>
							</up-form-item>
						</up-col>
						<up-col span="6">
							<up-form-item label="Abha" prop="userInfo.name" borderBottom ref="item1">
								<up-input v-model="state.model1.userInfo.name" placeholder="Email"></up-input>
							</up-form-item>
						</up-col>
					</up-row> -->
				</up-form>
			</view>
			<view class="footer">
				<up-button type="primary" size="mini" text="Register" :customStyle="{ width: '240rpx'}"
					@click="handleClickGotiRegister"></up-button>
			</view>
		</view>
		<up-action-sheet :show="state.showSex" :actions="state.actions" title="Please select gender"
			@close="state.showSex = false" @select="sexSelect">
		</up-action-sheet>
	</view>
</template>

<script setup>
	import slibrary from '@/slibrary/index.js'
	import {
		ref,
		reactive
	} from 'vue';

	import {
		sendCode
	} from '@/services/api/auth';
	import dayjs from 'dayjs/esm/index';


	// 使用 reactive 创建响应式状态  
	const state = reactive({
		showSex: false,
		showDate: false,
		dateTime: '',
		userInfo: {
			name: '',
			gender: '',
			email: '',
			birth: '',
			phone: ''
		},
		actions: [{
				name: 'Male',
				value: 'Man'
			},
			{
				name: 'Female',
				value: 'Woman'
			},
			{
				name: 'Secrecy',
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

	// 使用 ref 创建响应式引用  
	const formRef = ref(null);

	// 定义方法  
	function sexSelect(e) {
		state.userInfo.gender = e.value;
		if (formRef.value) {
			formRef.value.validateField('sex');
		}
	}
	const loading = ref(false)
	const handleClickGotiRegister = () => {
		formRef.value.validate().then(async valid => {
			if (valid) {
				loading.value = true
				try {
					const res = await sendCode({
						email: state.userInfo.email
					})
					loading.value = false
					uni.setStorageSync('regUserInfo', {
						...state.userInfo
					})
					slibrary.$router.go('/pages/login/pin')
				} catch (err) {}

			}
		});

	}
	const dateChange = (e) => {
		state.userInfo.birth = dayjs(e.value).format('YYYY-MM-DD')
		console.log(state.userInfo.birth)
		if (formRef.value) {
			formRef.value.validateField('birth');
		}
	}

	const formatter = (type, value) => {
		if (type === 'year') {
			return `${value}年`;
		}
		if (type === 'month') {
			return `${value}月`;
		}
		if (type === 'day') {
			return `${value}日`;
		}
		return value;
	};
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
				padding: 10rpx;
				font-size: 8rpx;
				color: #333;
				line-height: 14rpx;
			}
		}
	}
</style>