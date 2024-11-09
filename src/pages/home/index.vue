<template>
	<LayoutContent></LayoutContent>
</template>

<script setup>
	import LayoutContent from '@/components/Layout/Content.vue'
	
	import FixedLogo from '@/components/Common/FixedLogo.vue'
	import slibrary from '@/slibrary/index.js'
	import {
		isLogin
	} from '@/utils/auth';

	const handleClickHealthCheckUp = () => {
		// console.log(isLogin())
		// if (!isLogin()) {
		// 	slibrary.$router.go('/pages/login/selectLogin')
		// 	return
		// }

		// slibrary.$router.go('/pages/health/index')
		slibrary.$router.go('/pages/login/selectLogin')
		
	}
	
	const handleClickReport = () => {
		slibrary.$router.go('/pages/report/index')
	}
</script>

<style lang="scss" scoped>
	// .page {
	// 	display: flex;
	// 	flex-direction: column;
	// 	justify-content: center;
	// 	align-items: center;
	// 	// width: 100vw;
	// 	// height: 100vh;

	// 	.content {
	// 		display: flex;
	// 		justify-content: space-evenly;

	// 		.btns {
	// 			display: flex;

	// 			.btns-item {
	// 				width: 150px;
	// 				height: 150px;
	// 				background-color: #fff;
	// 				border-radius: 10px;
	// 				margin-right: 20px;
	// 				display: flex;
	// 				justify-content: center;
	// 				align-items: center;
	// 				box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
	// 				flex-direction: column;

	// 				.icon {
	// 					// width: 50px;
	// 					height: 50px;
	// 					margin-bottom: 20px;
	// 					image {
	// 						width: 100%;
	// 						height: 100%;
	// 					}
	// 				}

	// 				.text {
	// 					font-size: 14px;
	// 				}

	// 				&:last-child {
	// 					margin-right: 0;
	// 				}

	// 			}
	// 		}
	// 	}
	// }
</style>