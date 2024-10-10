<template>
	<view class="header bg-gradient-to-b from-blue-500 to-blue-900 px-4 flex items-center flex-shrink-0">
		<i class="fas fa-times text-white mr-4" v-if="showBack" @click="handleClickBack"></i>
		<span class="text-white title">{{ title }}</span>
	</view>
</template>

<script setup>
	import {
		useRoute
	} from 'vue-router'
	import {
		computed,
		watch,
		ref
	} from 'vue'

	const props = defineProps({
		title: {
			type: String,
			default: ''
		},
		showBack: {
			type: Boolean,
			default: false
		}
	})
	
	const handleClickBack = () => {
		uni.navigateBack()
	}
</script>

<style lang="scss" scope>
	.header { 
		height: 30rpx; 
	}
</style>