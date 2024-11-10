<script setup lang="ts">
	import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
	import { useUserStore } from '@/stores/modules/user';

	onLaunch(() => {
		// #ifdef APP-PLUS
		plus.navigator.setFullscreen(true);
		// #endif
	});
	onShow(() => {
		const userStore = useUserStore();
		userStore.initUserInfo();
		console.log('App Show');
	});
	onHide(() => {
		console.log('App Hide');
	});
</script>

<style lang="scss">
	// @import "@/uni_modules/uview-plus/index.scss";
	// @import 'tailwindcss/utilities';
	// @import 'tailwindcss/base';
	// @import 'tailwindcss/components';
	@import '@/static/fonts/font.css';
	@import '@/scss/main.scss';

</style>