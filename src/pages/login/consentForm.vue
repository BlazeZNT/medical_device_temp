<template>
	<view class="page">
		<view class="logo">
			<image src="@/static/logo.png"></image>
		</view>
		<view class="card">
			<view class="header">
				<view class="pinBox_title">
					User Consent Form
				</view>
				<view class="pinBox_tip">
					Please read the following terms and conditions carefully before proceeding:
				</view>
			</view>
			<view class="content">
				Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
				Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
				Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
				Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the
				undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
				Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the
				theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor
				sit amet..", comes from a line in section 1.10.32.<br />
				The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
				Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their
				exact original form, accompanied by English versions from the 1914 translation by H. Rackham.Contrary to
				popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
				literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
				Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
				Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the
				undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
				Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the
				theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor
				sit amet..", comes from a line in section 1.10.32.<br />
				The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
				Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their
				exact original form, accompanied by English versions from the 1914 translation by H. Rackham.literature
				from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
				College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum
				passage, and going through the cites of the word in classical literature, discovered the undoubtable
				source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
				Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics,
				very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
				comes from a line in section 1.10.32.
			</view>
			<view class="footer">
				<up-button type="primary" size="mini" text="Decline" :customStyle="{ width: '120rpx'}"></up-button>
				<up-button type="primary" size="mini" text="Accept" :customStyle="{ width: '120rpx'}"
					@click="handleClickGotiRegister"></up-button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import slibrary from '@/slibrary/index.js'

	const handleClickGotiRegister = () => {
		slibrary.$router.go('/pages/login/index')
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