<script setup lang="ts">
	import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
	import { useUserStore } from '@/stores/modules/user';

	onLaunch(() => {
		plus.navigator.setFullscreen(true);
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

	page {
		
	}
</style>