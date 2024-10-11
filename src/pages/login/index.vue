<template>
	<view class="page">
		<FixedLogo />
		<view class="content">
			<CardBox title="Patient Login" tip="Please enter your mobile number to continuee">
				<view class="boxcenter">
					<up-form :model="form" labelPosition="top" ref="uFormRef">
						<up-form-item label="Mobile Number" prop="mobile" label-width="180">
							  <up-input
							    placeholder="Mobile Number"
							    border="surround"
							    v-model="form.mobile"
							  ></up-input>
						</up-form-item>
					</up-form>

					<view class="btn">
						<up-button type="primary" size="small" text="Login" :disabled="!form.mobile" @tap="handleTapVerify"
							:loading="loading" :loadingSize="8"></up-button>
					</view>
					
					<view class="with-title">
						Login with:
					</view>
					
					<view class="with">
						<view class="with-item">
							<view class="icon">
								<image :src="slibrary.$url.static('/static/login/icon_AddressCard.png')" mode="heightFix"></image>
							</view>
							<view class="label">
								Login with mobile
							</view>
						</view>
						<view class="with-item">
							<view class="icon">
								<image :src="slibrary.$url.static('/static/login/icon_AddressCard2.png')" mode="heightFix"></image>
							</view>
							<view class="label">
								Login with Unique ID
							</view>
						</view>
						<view class="with-item">
							<view class="icon">
								<image :src="slibrary.$url.static('/static/login/icon_CreditCard.png')" mode="heightFix"></image>
							</view>
							<view class="label">
								Login with Aadhaar Card
							</view> 
						</view>
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


	const form = ref({
		mobile: '',
	})

	const loading = ref(false)

	const handleTapVerify = () => {

		loading.value = true

		setTimeout(() => {
			loading.value = false
			slibrary.$router.go('/pages/login/consentForm')
		}, 1500)
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
			
			.with-title {
				font-size: 12rpx;
				margin: 14rpx 0;
			}
			
			.with {
				
				.with-item { 
					width: 100%;
					padding: 10rpx 15rpx;
					border:1px solid rgba(#333, 0.5);
					border-radius: 4rpx;
					margin-bottom: 10rpx;
					display: flex;
					align-items: center;
					
					.label {
						font-size: 6rpx;
					}
					
					.icon {
						height: 20rpx;
						margin-right: 10rpx;
					}
					
					&:last-child {
						margin-bottom: 0;
					}
				}
				
			}

		}
	}
</style>