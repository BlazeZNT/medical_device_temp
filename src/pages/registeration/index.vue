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
				<up-form :labelWidth="100" labelPosition="top" :model="state.model1" :rules="state.rules" ref="form1">
					<up-row :gutter="40">
						<up-col span="6">
							<up-form-item label="Name" prop="userInfo.name" borderBottom ref="item1">
								<up-input v-model="state.model1.userInfo.name" placeholder="Name"></up-input>
							</up-form-item>
						</up-col>
						<up-col span="6">
							<up-form-item label="Gender" prop="userInfo.name" borderBottom ref="item1">
								<up-input v-model="state.model1.userInfo.name" placeholder="Email"></up-input>
							</up-form-item>
						</up-col>
					</up-row>
					<up-row :gutter="40">
						<up-col span="6">
							<up-form-item label="Gender" prop="userInfo.name" borderBottom ref="item1"
								@click="state.showSex = true;">
								<up-input v-model="state.model1.userInfo.sex" disabled disabledColor="#ffffff"
									placeholder="请选择性别">
									<template #suffix>
										<up-icon name="arrow-down"></up-icon>
									</template>
								</up-input>
							</up-form-item>
						</up-col>
						<up-col span="6">
							<up-form-item label="Aadhar Card" prop="userInfo.name" borderBottom ref="item1">
								<up-input v-model="state.model1.userInfo.name" placeholder="Email"></up-input>
							</up-form-item>
						</up-col>
					</up-row>
					<up-row :gutter="40">
						<up-col span="6">
							<up-form-item label="Date of Birth" prop="userInfo.name" borderBottom ref="item1">
								<up-input v-model="state.model1.userInfo.name" placeholder="Name"></up-input>
							</up-form-item>
						</up-col>
						<up-col span="6">
							<up-form-item label="Unique ID" prop="userInfo.name" borderBottom ref="item1">
								<up-input v-model="state.model1.userInfo.name" placeholder="Email"></up-input>
							</up-form-item>
						</up-col>
					</up-row>
					<up-row :gutter="40">
						<up-col span="6">
							<up-form-item label="Phone Number" prop="userInfo.name" borderBottom ref="item1">
								<up-input v-model="state.model1.userInfo.name" placeholder="Name"></up-input>
							</up-form-item>
						</up-col>
						<up-col span="6">
							<up-form-item label="Abha" prop="userInfo.name" borderBottom ref="item1">
								<up-input v-model="state.model1.userInfo.name" placeholder="Email"></up-input>
							</up-form-item>
						</up-col>
					</up-row>
				</up-form>
			</view>
			<view class="footer">
				<up-button type="primary" size="mini" text="Register" :customStyle="{ width: '240rpx'}"
					@click="handleClickGotiRegister"></up-button>
			</view>
		</view>
		<up-action-sheet :show="state.showSex" :actions="state.actions" title="请选择性别" description="如果选择保密会报错"
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

	// 使用 reactive 创建响应式状态  
	const state = reactive({
		showSex: false,
		model1: {
			userInfo: {
				name: '',
				sex: '',
			},
		},
		actions: [{
				name: '男'
			},
			{
				name: '女'
			},
			{
				name: '保密'
			},
		],
		rules: {
			'userInfo.name': {
				type: 'string',
				required: true,
				message: '请填写姓名',
				trigger: ['blur', 'change'],
			},
			'userInfo.sex': {
				type: 'string',
				max: 1,
				required: true,
				message: '请选择男或女',
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
		state.model1.userInfo.sex = e.name;
		if (formRef.value) {
			formRef.value.validateField('userInfo.sex');
		}
	}

	const handleClickGotiRegister = () => {
		slibrary.$router.go('/pages/health/index')
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
				padding: 10rpx;
				font-size: 8rpx;
				color: #333;
				line-height: 14rpx;
			}
		}
	}
</style>