/**
 *  vite 配置
 *  @see https://cn.vitejs.dev/config/
 *  @type {import('vite').UserConfig}
 */
import { resolve } from 'node:path';
import process from 'node:process';
import type { UserConfig } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import TransformPages from 'uni-read-pages-vite';
import postcssPlugins from './postcss.config';
import { createVitePlugins, currentPlatform, resolveProxy } from './build';

import { uniReadPagesV3Plugin } from './src/slibrary/router/utils/uni-read-pages-v3.js';
// import mpliveMainfestPlugin from './sheep/libs/mplive-manifest-plugin';


// const define = {}
// if(!["mp-weixin", "h5", "web"].includes(process.env.UNI_PLATFORM)) {
// 	define['global'] =  null
// 	define['wx'] =  'uni'
// }

export default defineConfig(async ({ mode }) => {
	const root = process.cwd();
	const env = loadEnv(mode, resolve(root, 'env'));
	const isProd = mode === 'production';
	const { VITE_PROXY_PREFIX, VITE_UPLOAD_PROXY_PREFIX, VITE_BASE_URL, VITE_UPLOAD_URL, VITE_PORT } = env;
	console.log(env)
	return {
		base: './',
		envDir: './env', // 自定义env目录
		// 设置路径别名
		resolve: {
			alias: {
				'@': resolve('./src'),
			},
			extensions: ['.js', '.ts'], // 使用路径别名时想要省略的后缀名，可以自己 增减
		},
		// 自定义全局变量
		define: {
			'process.env': {},
			'PLATFORM': JSON.stringify(currentPlatform),
			'ROUTES': new TransformPages().routes,
			// ...define
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "./src/uni.scss";',
				},
			},
			postcss: {
				plugins: postcssPlugins,
			},
		},
		plugins: [...createVitePlugins({ isProd }), uniReadPagesV3Plugin({
			pagesJsonDir: resolve(__dirname, './src/pages.json'),
			includes: ['path', 'aliasPath', 'name', 'meta'],
		})],
		// 开发服务器配置
		server: {
			host: true,
			// open: true,
			port: Number.parseInt(VITE_PORT!, 10),
			proxy: resolveProxy([[VITE_PROXY_PREFIX, VITE_BASE_URL], [VITE_UPLOAD_PROXY_PREFIX, VITE_UPLOAD_URL]]),
		},
		// 构建配置
		build: {
			outDir: 'dist',
			chunkSizeWarningLimit: 1500,
			sourcemap: !isProd,
			target: 'es6',
			minify: isProd ? 'terser' : false,
			terserOptions: {
				compress: {
					drop_console: isProd,
					drop_debugger: true,
				},
			},
			rollupOptions: {
				output: {
					entryFileNames: `assets/[name].${new Date().getTime()}.js`,
					chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
					assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
					compact: true,
				},
			},
		},
	} as UserConfig;
});