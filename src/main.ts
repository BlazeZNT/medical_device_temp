import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from './stores';
import i18n from '@/local/index'
import uviewPlus, { setConfig } from '@/uni_modules/uview-plus'

export function createApp() {
	const app = createSSRApp(App);

	setupStore(app);

	setupRouter(app);

	app.use(i18n)

	setConfig({
		config: {
			// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
			unit: 'px' 
		},
	})

	app.use(uviewPlus)

	return {
		app,
	};
}