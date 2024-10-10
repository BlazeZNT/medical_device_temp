import { createSSRApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import { setupStore } from './stores';
import i18n from '@/local/index'

export function createApp() {
	const app = createSSRApp(App);

	setupStore(app);

	setupRouter(app);
	
	app.use(i18n)
	
	return {
		app,
	};
}