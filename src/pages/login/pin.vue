<template>
	<view class="page">
		<FixedLogo />
		<view class="content">
			<CardBox title="M-Pin Verification" tip="Please type in your 6 digit M-Pin tp continue">
				<view class="boxcenter">
					<up-code-input v-model="code" :maxlength="6"></up-code-input>

					<view class="btn">
						<up-button type="primary" size="small" text="Verify" :disabled="!code" @tap="handleTapVerify"
							:loading="loading"></up-button>
					</view>
				</view>
			</CardBox>
		</view>
	</view>
</template>

<script setup>
	import FixedLogo from '@/components/Common/FixedLogo.vue'
	import slibrary from '@/slibrary/index.js'
	import CardBox from '@/components/Common/CardBox.vue'
	import {
		ref
	} from 'vue'
	import {
		onLoad,
		onShow
	} from '@dcloudio/uni-app';
	import {
		resgister,
	} from '@/services/api/auth';
	import {
		useUserStore
	} from '@/stores/modules/user';
	const userStore = useUserStore();


	const userInfo = ref(null)
	onLoad(() => {
		userInfo.value = uni.getStorageSync('regUserInfo')
	})
	const code = ref('')

	const loading = ref(false)

	const handleTapVerify = async () => {
		if (!code.value) {
			uni.showToast({
				icon: 'none',
				title: '请输入验证码'
			})
			return
		}
		if (code.value.length < 6) {
			uni.showToast({
				icon: 'none',
				title: '请输入6位验证码'
			})
			return
		}

		loading.value = true

		try {
			await userStore.login({
				...userInfo.value,
				captcha: code.value
			})
			loading.value = false
			slibrary.$router.go('/pages/index/index')
		} catch {
			loading.value = false
			
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		padding: 20rpx auto;

		.content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin: 20rpx auto;
			height: 100vh;

			.boxcenter {
				margin-top: 10rpx;
			}

			.btn {
				margin-top: 14rpx;
			}

		}
	}
</style>