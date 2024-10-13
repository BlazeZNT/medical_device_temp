"use strict";
const name = "Medical-examination-machine";
const type = "module";
const version = "2.0.1";
const scripts = {
  "dev:app": "uni -p app",
  "dev:custom": "uni -p",
  "dev:h5": "pnpm git:hooks && uni",
  "dev:h5:ssr": "uni --ssr",
  "dev:mp-alipay": "uni -p mp-alipay",
  "dev:mp-baidu": "uni -p mp-baidu",
  "dev:mp-kuaishou": "uni -p mp-kuaishou",
  "dev:mp-lark": "uni -p mp-lark",
  "dev:mp-qq": "uni -p mp-qq",
  "dev:mp-toutiao": "uni -p mp-toutiao",
  "dev:mp-weixin": "pnpm git:hooks && uni -p mp-weixin",
  "dev:quickapp-webview": "uni -p quickapp-webview",
  "dev:quickapp-webview-huawei": "uni -p quickapp-webview-huawei",
  "dev:quickapp-webview-union": "uni -p quickapp-webview-union",
  "build:app": "uni build -p app",
  "build:custom": "uni build -p",
  "build:h5": "uni build --minify",
  "build:h5:ssr": "uni build --ssr",
  "build:mp-alipay": "uni build -p mp-alipay",
  "build:mp-baidu": "uni build -p mp-baidu",
  "build:mp-kuaishou": "uni build -p mp-kuaishou",
  "build:mp-lark": "uni build -p mp-lark",
  "build:mp-qq": "uni build -p mp-qq",
  "build:mp-toutiao": "uni build -p mp-toutiao",
  "build:mp-weixin": "uni build -p mp-weixin --minify",
  "build:quickapp-webview": "uni build -p quickapp-webview",
  "build:quickapp-webview-huawei": "uni build -p quickapp-webview-huawei",
  "build:quickapp-webview-union": "uni build -p quickapp-webview-union",
  postinstall: "weapp-tw patch"
};
const dependencies = {
  "@alova/adapter-uniapp": "^2.0.4",
  "@alova/mock": "^2.0.4",
  "@dcloudio/uni-app": "3.0.0-alpha-4020520240808001",
  "@dcloudio/uni-app-plus": "3.0.0-alpha-4020520240808001",
  "@dcloudio/uni-components": "3.0.0-alpha-4020520240808001",
  "@dcloudio/uni-h5": "3.0.0-alpha-4020520240808001",
  "@dcloudio/uni-i18n": "3.0.0-alpha-4020520240808001",
  "@dcloudio/uni-mp-alipay": "3.0.0-alpha-4020520240808001",
  "@dcloudio/uni-mp-baidu": "3.0.0-alpha-4020520240808001",
  "@dcloudio/uni-mp-kuaishou": "3.0.0-alpha-4020520240808001",
  "@dcloudio/uni-mp-lark": "3.0.0-alpha-4020520240808001",
  "@dcloudio/uni-mp-qq": "3.0.0-alpha-4020520240808001",
  "@dcloudio/uni-mp-toutiao": "3.0.0-alpha-4020520240808001",
  "@dcloudio/uni-mp-weixin": "3.0.0-alpha-4020520240808001",
  "@dcloudio/uni-quickapp-webview": "3.0.0-alpha-4020520240808001",
  "@multiavatar/multiavatar": "^1.0.7",
  alova: "^3.0.9",
  "crypto-js": "^4.2.0",
  dayjs: "^1.11.13",
  "lodash-es": "^4.17.21",
  pinia: "^2.2.2",
  vue: "^3.4.38",
  "vue-i18n": "^9.14.1"
};
const devDependencies = {
  "@antfu/eslint-config": "^2.26.0",
  "@dcloudio/types": "^3.4.12",
  "@dcloudio/uni-automator": "3.0.0-alpha-4020520240808001",
  "@dcloudio/uni-cli-shared": "3.0.0-alpha-4020520240808001",
  "@dcloudio/uni-stacktracey": "3.0.0-alpha-4020520240808001",
  "@dcloudio/vite-plugin-uni": "3.0.0-alpha-4020520240808001",
  "@egoist/tailwindcss-icons": "^1.8.1",
  "@iconify/json": "^2.2.238",
  "@types/crypto-js": "^4.2.2",
  "@types/lodash-es": "^4.17.12",
  "@types/node": "^20.16.1",
  "@vitejs/plugin-vue": "^5.1.2",
  "@vue/runtime-core": "^3.4.38",
  autoprefixer: "^10.4.20",
  "commit-and-tag-version": "^12.4.1",
  eslint: "^9.9.0",
  "eslint-plugin-format": "^0.1.2",
  globals: "^15.9.0",
  "lint-staged": "^15.2.9",
  picocolors: "^1.0.1",
  postcss: "^8.4.41",
  "rollup-plugin-visualizer": "^5.12.0",
  sass: "^1.77.8",
  "simple-git-hooks": "^2.11.1",
  tailwindcss: "^3.4.10",
  tsx: "^4.17.0",
  typescript: "^5.5.4",
  "uni-mini-router": "^0.1.6",
  "uni-read-pages-vite": "^0.0.6",
  "unplugin-auto-import": "^0.18.2",
  vite: "^5.4.1",
  "vite-plugin-restart": "^0.4.1",
  "weapp-tailwindcss": "^3.5.0"
};
const id = "h_mo-Vue3-Vite-TS-basic-framework";
const displayName = "Vue3-Vite-TS 基础框架";
const description = "基于Vue3 SFC ，封装了Tailwindcss、Mock、路由拦截、请求拦截及缓存加密等...适用于新项目，规范代码目录，开箱即用";
const keywords = [
  "vue3",
  "ts",
  "请求/路由拦截",
  "unocss",
  "mock"
];
const dcloudext = {
  category: [
    "uni-app前端模板",
    "uni-app前端项目模板"
  ]
};
const pkg = {
  name,
  type,
  version,
  scripts,
  dependencies,
  devDependencies,
  id,
  displayName,
  description,
  keywords,
  dcloudext
};
const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": true, "MODE": "development", "PROD": false, "SSR": false, "VITE_CJS_IGNORE_WARNING": "true", "VITE_ROOT_DIR": "D:\\ty\\medical-device", "VITE_USER_NODE_ENV": "development" };
function getPkgVersion() {
  return `${`__${pkg.version}`}__`.toUpperCase();
}
const devMode = "development";
function getEnvMode() {
  return getEnvValue("VITE_ENV");
}
function getEnvValue(key) {
  const envValue = __vite_import_meta_env__[key];
  return envValue === "true" ? true : envValue === "false" ? false : envValue;
}
function isDevMode() {
  return getEnvMode() === devMode;
}
function isUseMock() {
  return getEnvValue("VITE_USE_MOCK");
}
function getBaseUrl() {
  return getEnvValue("VITE_BASE_URL");
}
exports.a = getPkgVersion;
exports.b = getBaseUrl;
exports.c = isUseMock;
exports.g = getEnvValue;
exports.i = isDevMode;
//# sourceMappingURL=env.js.map
