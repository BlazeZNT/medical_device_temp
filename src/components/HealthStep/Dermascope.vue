<template>
	<ContentBox image="@/static/height.jpg">
		<view class="box">
			<camera device-position="back" flash="off" @error="error" style="width: 600rpx; height: 600rpx;"></camera>
		</view>
	</ContentBox>
</template>

<script>
	import steps from '../../uni_modules/uview-plus/components/u-steps/steps';
	import ContentBox from './ContentBox.vue'

	export default {
		components: {
			ContentBox
		},
		data() {
			return {}
		},
		mounted() {},
		methods: {}
	};
</script>


<style lang="scss" scoped>
	.box {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>