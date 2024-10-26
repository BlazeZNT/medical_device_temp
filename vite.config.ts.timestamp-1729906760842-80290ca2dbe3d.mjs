// vite.config.ts
import { resolve } from "node:path";
import process2 from "node:process";
import { defineConfig, loadEnv } from "file:///D:/ty/medical-device/node_modules/vite/dist/node/index.js";
import TransformPages2 from "file:///D:/ty/medical-device/node_modules/uni-read-pages-vite/lib/index.js";

// postcss.config.ts
import tailwindcss from "file:///D:/ty/medical-device/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///D:/ty/medical-device/node_modules/autoprefixer/lib/autoprefixer.js";
import cssMacro from "file:///D:/ty/medical-device/node_modules/weapp-tailwindcss/dist/css-macro/postcss.mjs";
var plugins = [tailwindcss(), autoprefixer()];
plugins.push(cssMacro);
var postcss_config_default = plugins;

// build/platform.ts
import process from "node:process";
var currentPlatform = process.env.UNI_PLATFORM;
var isH5 = currentPlatform === "h5";
var isApp = currentPlatform === "app";
var WeappTailwindcssDisabled = isH5 || isApp;

// build/proxy.ts
function resolveProxy(proxyList = []) {
  const proxy = {};
  for (const [prefix, target] of proxyList) {
    const isHttps = /^https:\/\//.test(target);
    proxy[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      ...isHttps ? { secure: false } : {}
    };
  }
  return proxy;
}

// build/vitePlugins.ts
import uni from "file:///D:/ty/medical-device/node_modules/@dcloudio/vite-plugin-uni/dist/index.js";
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from "file:///D:/ty/medical-device/node_modules/weapp-tailwindcss/dist/vite.mjs";
import autoImport from "file:///D:/ty/medical-device/node_modules/unplugin-auto-import/dist/vite.js";
import viteRestart from "file:///D:/ty/medical-device/node_modules/vite-plugin-restart/dist/index.js";
import { visualizer } from "file:///D:/ty/medical-device/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
function createVitePlugins({ isProd }) {
  return [
    // @ts-expect-error TODO uni() 会报错：uni is not a function,暂时使用此方式解决
    uni?.default(),
    uvtw({
      rem2rpx: true,
      disabled: WeappTailwindcssDisabled
      // 使用新的 ast-grep 来处理 js 资源，速度是 babel 的2倍左右
      // 需要先安装 `@ast-grep/napi`
      // jsAstTool: 'ast-grep'
    }),
    autoImport({
      include: [
        /\.[tj]sx?$/,
        // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/
        // .vue
      ],
      imports: [
        "vue",
        "uni-app",
        "pinia",
        {
          "uni-mini-router": ["useRouter", "useRoute"]
        },
        {
          "alova/client": ["useRequest"]
        }
      ],
      dts: "typings/auto-imports.d.ts",
      eslintrc: {
        enabled: true
      }
    }),
    viteRestart({
      restart: ["vite.config.ts", "src/pages.json"]
    }),
    isH5 && isProd && visualizer({
      filename: "./node_modules/.cache/visualizer/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ];
}

// src/slibrary/router/utils/uni-read-pages-v3.js
import fs from "fs";

// src/slibrary/router/utils/strip-json-comments.js
var singleComment = Symbol("singleComment");
var multiComment = Symbol("multiComment");
var stripWithoutWhitespace = () => "";
var stripWithWhitespace = (string, start, end) => string.slice(start, end).replace(/\S/g, " ");
var isEscaped = (jsonString, quotePosition) => {
  let index = quotePosition - 1;
  let backslashCount = 0;
  while (jsonString[index] === "\\") {
    index -= 1;
    backslashCount += 1;
  }
  return Boolean(backslashCount % 2);
};
function stripJsonComments(jsonString, { whitespace = true } = {}) {
  if (typeof jsonString !== "string") {
    throw new TypeError(
      `Expected argument \`jsonString\` to be a \`string\`, got \`${typeof jsonString}\``
    );
  }
  const strip = whitespace ? stripWithWhitespace : stripWithoutWhitespace;
  let isInsideString = false;
  let isInsideComment = false;
  let offset = 0;
  let result = "";
  for (let index = 0; index < jsonString.length; index++) {
    const currentCharacter = jsonString[index];
    const nextCharacter = jsonString[index + 1];
    if (!isInsideComment && currentCharacter === '"') {
      const escaped = isEscaped(jsonString, index);
      if (!escaped) {
        isInsideString = !isInsideString;
      }
    }
    if (isInsideString) {
      continue;
    }
    if (!isInsideComment && currentCharacter + nextCharacter === "//") {
      result += jsonString.slice(offset, index);
      offset = index;
      isInsideComment = singleComment;
      index++;
    } else if (isInsideComment === singleComment && currentCharacter + nextCharacter === "\r\n") {
      index++;
      isInsideComment = false;
      result += strip(jsonString, offset, index);
      offset = index;
      continue;
    } else if (isInsideComment === singleComment && currentCharacter === "\n") {
      isInsideComment = false;
      result += strip(jsonString, offset, index);
      offset = index;
    } else if (!isInsideComment && currentCharacter + nextCharacter === "/*") {
      result += jsonString.slice(offset, index);
      offset = index;
      isInsideComment = multiComment;
      index++;
      continue;
    } else if (isInsideComment === multiComment && currentCharacter + nextCharacter === "*/") {
      index++;
      isInsideComment = false;
      result += strip(jsonString, offset, index + 1);
      offset = index + 1;
      continue;
    }
  }
  return result + (isInsideComment ? strip(jsonString.slice(offset)) : jsonString.slice(offset));
}

// src/slibrary/router/utils/uni-read-pages-v3.js
import { isArray, isEmpty } from "file:///D:/ty/medical-device/node_modules/lodash-es/lodash.js";
var TransformPages = class {
  constructor({ includes, pagesJsonDir }) {
    this.includes = includes;
    this.uniPagesJSON = JSON.parse(stripJsonComments(fs.readFileSync(pagesJsonDir, "utf-8")));
    this.routes = this.getPagesRoutes().concat(this.getSubPackagesRoutes());
    this.tabbar = this.getTabbarRoutes();
    this.routesMap = this.transformPathToKey(this.routes);
  }
  /**
   * 通过读取pages.json文件 生成直接可用的routes
   */
  getPagesRoutes(pages = this.uniPagesJSON.pages, rootPath = null) {
    let routes = [];
    for (let i = 0; i < pages.length; i++) {
      const item = pages[i];
      let route = {};
      for (let j = 0; j < this.includes.length; j++) {
        const key = this.includes[j];
        let value = item[key];
        if (key === "path") {
          value = rootPath ? `/${rootPath}/${value}` : `/${value}`;
        }
        if (key === "aliasPath" && i == 0 && rootPath == null) {
          route[key] = route[key] || "/";
        } else if (value !== void 0) {
          route[key] = value;
        }
      }
      routes.push(route);
    }
    return routes;
  }
  /**
   * 解析小程序分包路径
   */
  getSubPackagesRoutes() {
    if (!(this.uniPagesJSON && this.uniPagesJSON.subPackages)) {
      return [];
    }
    const subPackages = this.uniPagesJSON.subPackages;
    let routes = [];
    for (let i = 0; i < subPackages.length; i++) {
      const subPages = subPackages[i].pages;
      const root = subPackages[i].root;
      const subRoutes = this.getPagesRoutes(subPages, root);
      routes = routes.concat(subRoutes);
    }
    return routes;
  }
  getTabbarRoutes() {
    if (!(this.uniPagesJSON && this.uniPagesJSON.tabBar && this.uniPagesJSON.tabBar.list)) {
      return [];
    }
    const tabbar = this.uniPagesJSON.tabBar.list;
    let tabbarMap = [];
    tabbar.forEach((bar) => {
      tabbarMap.push("/" + bar.pagePath);
    });
    return tabbarMap;
  }
  transformPathToKey(list) {
    if (!isArray(list) || isEmpty(list)) {
      return [];
    }
    let map = {};
    list.forEach((i) => {
      map[i.path] = i;
    });
    return map;
  }
};
function uniReadPagesV3Plugin({ pagesJsonDir, includes }) {
  let defaultIncludes = ["path", "aliasPath", "name"];
  includes = [...defaultIncludes, ...includes];
  let pages = new TransformPages({
    pagesJsonDir,
    includes
  });
  return {
    name: "uni-read-pages-v3",
    config(config) {
      return {
        define: {
          ROUTES: pages.routes,
          ROUTES_MAP: pages.routesMap,
          TABBAR: pages.tabbar
        }
      };
    }
  };
}

// vite.config.ts
var __vite_injected_original_dirname = "D:\\ty\\medical-device";
var vite_config_default = defineConfig(async ({ mode }) => {
  const root = process2.cwd();
  const env = loadEnv(mode, resolve(root, "env"));
  const isProd = mode === "production";
  const { VITE_PROXY_PREFIX, VITE_UPLOAD_PROXY_PREFIX, VITE_BASE_URL, VITE_UPLOAD_URL, VITE_PORT } = env;
  console.log(env);
  return {
    base: "./",
    envDir: "./env",
    // 自定义env目录
    // 设置路径别名
    resolve: {
      alias: {
        "@": resolve("./src")
      },
      extensions: [".js", ".ts"]
      // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    // 自定义全局变量
    define: {
      "process.env": {},
      "PLATFORM": JSON.stringify(currentPlatform),
      "ROUTES": new TransformPages2().routes
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/uni.scss";'
        }
      },
      postcss: {
        plugins: postcss_config_default
      }
    },
    plugins: [...createVitePlugins({ isProd }), uniReadPagesV3Plugin({
      pagesJsonDir: resolve(__vite_injected_original_dirname, "./src/pages.json"),
      includes: ["path", "aliasPath", "name", "meta"]
    })],
    // 开发服务器配置
    server: {
      host: true,
      // open: true,
      port: Number.parseInt(VITE_PORT, 10),
      proxy: resolveProxy([[VITE_PROXY_PREFIX, VITE_BASE_URL], [VITE_UPLOAD_PROXY_PREFIX, VITE_UPLOAD_URL]])
    },
    // 构建配置
    build: {
      outDir: "dist",
      chunkSizeWarningLimit: 1500,
      sourcemap: !isProd,
      target: "es6",
      minify: isProd ? "terser" : false,
      terserOptions: {
        compress: {
          drop_console: isProd,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].${(/* @__PURE__ */ new Date()).getTime()}.js`,
          chunkFileNames: `assets/[name].${(/* @__PURE__ */ new Date()).getTime()}.js`,
          assetFileNames: `assets/[name].${(/* @__PURE__ */ new Date()).getTime()}.[ext]`,
          compact: true
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicG9zdGNzcy5jb25maWcudHMiLCAiYnVpbGQvcGxhdGZvcm0udHMiLCAiYnVpbGQvcHJveHkudHMiLCAiYnVpbGQvdml0ZVBsdWdpbnMudHMiLCAic3JjL3NsaWJyYXJ5L3JvdXRlci91dGlscy91bmktcmVhZC1wYWdlcy12My5qcyIsICJzcmMvc2xpYnJhcnkvcm91dGVyL3V0aWxzL3N0cmlwLWpzb24tY29tbWVudHMuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx0eVxcXFxtZWRpY2FsLWRldmljZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdHlcXFxcbWVkaWNhbC1kZXZpY2VcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3R5L21lZGljYWwtZGV2aWNlL3ZpdGUuY29uZmlnLnRzXCI7LyoqXHJcbiAqICB2aXRlIFx1OTE0RFx1N0Y2RVxyXG4gKiAgQHNlZSBodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnL1xyXG4gKiAgQHR5cGUge2ltcG9ydCgndml0ZScpLlVzZXJDb25maWd9XHJcbiAqL1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJztcclxuaW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJztcclxuaW1wb3J0IHR5cGUgeyBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgVHJhbnNmb3JtUGFnZXMgZnJvbSAndW5pLXJlYWQtcGFnZXMtdml0ZSc7XHJcbmltcG9ydCBwb3N0Y3NzUGx1Z2lucyBmcm9tICcuL3Bvc3Rjc3MuY29uZmlnJztcclxuaW1wb3J0IHsgY3JlYXRlVml0ZVBsdWdpbnMsIGN1cnJlbnRQbGF0Zm9ybSwgcmVzb2x2ZVByb3h5IH0gZnJvbSAnLi9idWlsZCc7XHJcblxyXG5pbXBvcnQgeyB1bmlSZWFkUGFnZXNWM1BsdWdpbiB9ICBmcm9tICcuL3NyYy9zbGlicmFyeS9yb3V0ZXIvdXRpbHMvdW5pLXJlYWQtcGFnZXMtdjMuanMnO1xyXG4vLyBpbXBvcnQgbXBsaXZlTWFpbmZlc3RQbHVnaW4gZnJvbSAnLi9zaGVlcC9saWJzL21wbGl2ZS1tYW5pZmVzdC1wbHVnaW4nO1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoYXN5bmMgKHsgbW9kZSB9KSA9PiB7XHJcblx0Y29uc3Qgcm9vdCA9IHByb2Nlc3MuY3dkKCk7XHJcblx0Y29uc3QgZW52ID0gbG9hZEVudihtb2RlLCByZXNvbHZlKHJvb3QsICdlbnYnKSk7XHJcblx0Y29uc3QgaXNQcm9kID0gbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nO1xyXG5cdGNvbnN0IHsgVklURV9QUk9YWV9QUkVGSVgsIFZJVEVfVVBMT0FEX1BST1hZX1BSRUZJWCwgVklURV9CQVNFX1VSTCwgVklURV9VUExPQURfVVJMLCBWSVRFX1BPUlQgfSA9IGVudjtcclxuXHRjb25zb2xlLmxvZyhlbnYpXHJcblx0cmV0dXJuIHtcclxuXHRcdGJhc2U6ICcuLycsXHJcblx0XHRlbnZEaXI6ICcuL2VudicsIC8vIFx1ODFFQVx1NUI5QVx1NEU0OWVudlx1NzZFRVx1NUY1NVxyXG5cdFx0Ly8gXHU4QkJFXHU3RjZFXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXHJcblx0XHRyZXNvbHZlOiB7XHJcblx0XHRcdGFsaWFzOiB7XHJcblx0XHRcdFx0J0AnOiByZXNvbHZlKCcuL3NyYycpLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRleHRlbnNpb25zOiBbJy5qcycsICcudHMnXSwgLy8gXHU0RjdGXHU3NTI4XHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXHU2NUY2XHU2MEYzXHU4OTgxXHU3NzAxXHU3NTY1XHU3Njg0XHU1NDBFXHU3RjAwXHU1NDBEXHVGRjBDXHU1M0VGXHU0RUU1XHU4MUVBXHU1REYxIFx1NTg5RVx1NTFDRlxyXG5cdFx0fSxcclxuXHRcdC8vIFx1ODFFQVx1NUI5QVx1NEU0OVx1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlxyXG5cdFx0ZGVmaW5lOiB7XHJcblx0XHRcdCdwcm9jZXNzLmVudic6IHt9LFxyXG5cdFx0XHQnUExBVEZPUk0nOiBKU09OLnN0cmluZ2lmeShjdXJyZW50UGxhdGZvcm0pLFxyXG5cdFx0XHQnUk9VVEVTJzogbmV3IFRyYW5zZm9ybVBhZ2VzKCkucm91dGVzLFxyXG5cdFx0fSxcclxuXHRcdGNzczoge1xyXG5cdFx0XHRwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcblx0XHRcdFx0c2Nzczoge1xyXG5cdFx0XHRcdFx0YWRkaXRpb25hbERhdGE6ICdAaW1wb3J0IFwiLi9zcmMvdW5pLnNjc3NcIjsnLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHBvc3Rjc3M6IHtcclxuXHRcdFx0XHRwbHVnaW5zOiBwb3N0Y3NzUGx1Z2lucyxcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0XHRwbHVnaW5zOiBbLi4uY3JlYXRlVml0ZVBsdWdpbnMoeyBpc1Byb2QgfSksIHVuaVJlYWRQYWdlc1YzUGx1Z2luKHtcclxuXHRcdFx0cGFnZXNKc29uRGlyOiByZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3BhZ2VzLmpzb24nKSxcclxuXHRcdFx0aW5jbHVkZXM6IFsncGF0aCcsICdhbGlhc1BhdGgnLCAnbmFtZScsICdtZXRhJ10sXHJcblx0XHR9KV0sXHJcblx0XHQvLyBcdTVGMDBcdTUzRDFcdTY3MERcdTUyQTFcdTU2NjhcdTkxNERcdTdGNkVcclxuXHRcdHNlcnZlcjoge1xyXG5cdFx0XHRob3N0OiB0cnVlLFxyXG5cdFx0XHQvLyBvcGVuOiB0cnVlLFxyXG5cdFx0XHRwb3J0OiBOdW1iZXIucGFyc2VJbnQoVklURV9QT1JUISwgMTApLFxyXG5cdFx0XHRwcm94eTogcmVzb2x2ZVByb3h5KFtbVklURV9QUk9YWV9QUkVGSVgsIFZJVEVfQkFTRV9VUkxdLCBbVklURV9VUExPQURfUFJPWFlfUFJFRklYLCBWSVRFX1VQTE9BRF9VUkxdXSksXHJcblx0XHR9LFxyXG5cdFx0Ly8gXHU2Nzg0XHU1RUZBXHU5MTREXHU3RjZFXHJcblx0XHRidWlsZDoge1xyXG5cdFx0XHRvdXREaXI6ICdkaXN0JyxcclxuXHRcdFx0Y2h1bmtTaXplV2FybmluZ0xpbWl0OiAxNTAwLFxyXG5cdFx0XHRzb3VyY2VtYXA6ICFpc1Byb2QsXHJcblx0XHRcdHRhcmdldDogJ2VzNicsXHJcblx0XHRcdG1pbmlmeTogaXNQcm9kID8gJ3RlcnNlcicgOiBmYWxzZSxcclxuXHRcdFx0dGVyc2VyT3B0aW9uczoge1xyXG5cdFx0XHRcdGNvbXByZXNzOiB7XHJcblx0XHRcdFx0XHRkcm9wX2NvbnNvbGU6IGlzUHJvZCxcclxuXHRcdFx0XHRcdGRyb3BfZGVidWdnZXI6IHRydWUsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdFx0cm9sbHVwT3B0aW9uczoge1xyXG5cdFx0XHRcdG91dHB1dDoge1xyXG5cdFx0XHRcdFx0ZW50cnlGaWxlTmFtZXM6IGBhc3NldHMvW25hbWVdLiR7bmV3IERhdGUoKS5nZXRUaW1lKCl9LmpzYCxcclxuXHRcdFx0XHRcdGNodW5rRmlsZU5hbWVzOiBgYXNzZXRzL1tuYW1lXS4ke25ldyBEYXRlKCkuZ2V0VGltZSgpfS5qc2AsXHJcblx0XHRcdFx0XHRhc3NldEZpbGVOYW1lczogYGFzc2V0cy9bbmFtZV0uJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX0uW2V4dF1gLFxyXG5cdFx0XHRcdFx0Y29tcGFjdDogdHJ1ZSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHR9IGFzIFVzZXJDb25maWc7XHJcbn0pOyIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcdHlcXFxcbWVkaWNhbC1kZXZpY2VcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHR5XFxcXG1lZGljYWwtZGV2aWNlXFxcXHBvc3Rjc3MuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi90eS9tZWRpY2FsLWRldmljZS9wb3N0Y3NzLmNvbmZpZy50c1wiO2ltcG9ydCB0YWlsd2luZGNzcyBmcm9tICd0YWlsd2luZGNzcyc7XG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcic7XG5pbXBvcnQgdHlwZSB7IEFjY2VwdGVkUGx1Z2luIH0gZnJvbSAncG9zdGNzcyc7XG5pbXBvcnQgY3NzTWFjcm8gZnJvbSAnd2VhcHAtdGFpbHdpbmRjc3MvY3NzLW1hY3JvL3Bvc3Rjc3MnO1xuXG5jb25zdCBwbHVnaW5zOiBBY2NlcHRlZFBsdWdpbltdID0gW3RhaWx3aW5kY3NzKCksIGF1dG9wcmVmaXhlcigpXTtcblxuLy8gXHU1M0VGXHU0RUU1XHU0RjdGXHU3NTI4IHBvc3Rjc3MtcHh0cmFuc2Zvcm0gXHU2NzY1XHU4RkRCXHU4ODRDIHB4IFx1OEY2QyBycHggXHU3Njg0XHU1MjlGXHU4MEZEXG5cbnBsdWdpbnMucHVzaChjc3NNYWNybyk7XG5cbmV4cG9ydCBkZWZhdWx0IHBsdWdpbnM7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHR5XFxcXG1lZGljYWwtZGV2aWNlXFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx0eVxcXFxtZWRpY2FsLWRldmljZVxcXFxidWlsZFxcXFxwbGF0Zm9ybS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovdHkvbWVkaWNhbC1kZXZpY2UvYnVpbGQvcGxhdGZvcm0udHNcIjtpbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnO1xuXG5jb25zdCBjdXJyZW50UGxhdGZvcm0gPSBwcm9jZXNzLmVudi5VTklfUExBVEZPUk07XG5jb25zdCBpc0g1ID0gY3VycmVudFBsYXRmb3JtID09PSAnaDUnO1xuY29uc3QgaXNBcHAgPSBjdXJyZW50UGxhdGZvcm0gPT09ICdhcHAnO1xuY29uc3QgV2VhcHBUYWlsd2luZGNzc0Rpc2FibGVkID0gaXNINSB8fCBpc0FwcDtcbmNvbnN0IGlzTXAgPSAhaXNINSAmJiAhaXNBcHA7XG5cbmV4cG9ydCB7XG4gIGlzSDUsXG4gIGlzQXBwLFxuICBXZWFwcFRhaWx3aW5kY3NzRGlzYWJsZWQsXG4gIGlzTXAsXG4gIGN1cnJlbnRQbGF0Zm9ybSxcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHR5XFxcXG1lZGljYWwtZGV2aWNlXFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx0eVxcXFxtZWRpY2FsLWRldmljZVxcXFxidWlsZFxcXFxwcm94eS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovdHkvbWVkaWNhbC1kZXZpY2UvYnVpbGQvcHJveHkudHNcIjsvKipcbiAqIENvbmZpZ3VyZSBhY2NvcmRpbmcgdG8gdGhlIHByb3h5IGxpc3RcbiAqIEBwYXJhbSBwcm94eUxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVQcm94eShwcm94eUxpc3Q6IFtzdHJpbmcsIHN0cmluZ11bXSA9IFtdKSB7XG4gIGNvbnN0IHByb3h5OiBSZWNvcmQ8c3RyaW5nLCBQcm94eU9wdGlvbnM+ID0ge307XG4gIGZvciAoY29uc3QgW3ByZWZpeCwgdGFyZ2V0XSBvZiBwcm94eUxpc3QpIHtcbiAgICBjb25zdCBpc0h0dHBzID0gL15odHRwczpcXC9cXC8vLnRlc3QodGFyZ2V0KTtcbiAgICBwcm94eVtwcmVmaXhdID0ge1xuICAgICAgdGFyZ2V0LFxuICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgd3M6IHRydWUsXG4gICAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZShuZXcgUmVnRXhwKGBeJHtwcmVmaXh9YCksICcnKSxcbiAgICAgIC8vIGh0dHBzIGlzIHJlcXVpcmUgc2VjdXJlPWZhbHNlXG4gICAgICAuLi4oaXNIdHRwcyA/IHsgc2VjdXJlOiBmYWxzZSB9IDoge30pLFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHByb3h5O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx0eVxcXFxtZWRpY2FsLWRldmljZVxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdHlcXFxcbWVkaWNhbC1kZXZpY2VcXFxcYnVpbGRcXFxcdml0ZVBsdWdpbnMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3R5L21lZGljYWwtZGV2aWNlL2J1aWxkL3ZpdGVQbHVnaW5zLnRzXCI7aW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJztcbmltcG9ydCB1bmkgZnJvbSAnQGRjbG91ZGlvL3ZpdGUtcGx1Z2luLXVuaSc7XG5pbXBvcnQgeyBVbmlmaWVkVml0ZVdlYXBwVGFpbHdpbmRjc3NQbHVnaW4gYXMgdXZ0dyB9IGZyb20gJ3dlYXBwLXRhaWx3aW5kY3NzL3ZpdGUnO1xuaW1wb3J0IGF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XG5pbXBvcnQgdml0ZVJlc3RhcnQgZnJvbSAndml0ZS1wbHVnaW4tcmVzdGFydCc7XG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJztcbmltcG9ydCB7IFdlYXBwVGFpbHdpbmRjc3NEaXNhYmxlZCwgaXNINSB9IGZyb20gJy4vcGxhdGZvcm0nO1xuXG5pbnRlcmZhY2UgVml0ZVBsdWdpbkNvbmZpZyB7XG4gIGlzUHJvZDogYm9vbGVhblxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVml0ZVBsdWdpbnMoeyBpc1Byb2QgfTogVml0ZVBsdWdpbkNvbmZpZyk6IFBsdWdpbk9wdGlvbltdIHtcbiAgcmV0dXJuIFtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIFRPRE8gdW5pKCkgXHU0RjFBXHU2MkE1XHU5NTE5XHVGRjFBdW5pIGlzIG5vdCBhIGZ1bmN0aW9uLFx1NjY4Mlx1NjVGNlx1NEY3Rlx1NzUyOFx1NkI2NFx1NjVCOVx1NUYwRlx1ODlFM1x1NTFCM1xuICAgIHVuaT8uZGVmYXVsdCgpLFxuICAgIHV2dHcoe1xuICAgICAgcmVtMnJweDogdHJ1ZSxcbiAgICAgIGRpc2FibGVkOiBXZWFwcFRhaWx3aW5kY3NzRGlzYWJsZWQsXG4gICAgICAvLyBcdTRGN0ZcdTc1MjhcdTY1QjBcdTc2ODQgYXN0LWdyZXAgXHU2NzY1XHU1OTA0XHU3NDA2IGpzIFx1OEQ0NFx1NkU5MFx1RkYwQ1x1OTAxRlx1NUVBNlx1NjYyRiBiYWJlbCBcdTc2ODQyXHU1MDBEXHU1REU2XHU1M0YzXG4gICAgICAvLyBcdTk3MDBcdTg5ODFcdTUxNDhcdTVCODlcdTg4QzUgYEBhc3QtZ3JlcC9uYXBpYFxuICAgICAgLy8ganNBc3RUb29sOiAnYXN0LWdyZXAnXG4gICAgfSksXG4gICAgYXV0b0ltcG9ydCh7XG4gICAgICBpbmNsdWRlOiBbXG4gICAgICAgIC9cXC5bdGpdc3g/JC8sIC8vIC50cywgLnRzeCwgLmpzLCAuanN4XG4gICAgICAgIC9cXC52dWUkLyxcbiAgICAgICAgL1xcLnZ1ZVxcP3Z1ZS8sIC8vIC52dWVcbiAgICAgIF0sXG4gICAgICBpbXBvcnRzOiBbXG4gICAgICAgICd2dWUnLFxuICAgICAgICAndW5pLWFwcCcsXG4gICAgICAgICdwaW5pYScsXG4gICAgICAgIHtcbiAgICAgICAgICAndW5pLW1pbmktcm91dGVyJzogWyd1c2VSb3V0ZXInLCAndXNlUm91dGUnXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICdhbG92YS9jbGllbnQnOiBbJ3VzZVJlcXVlc3QnXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBkdHM6ICd0eXBpbmdzL2F1dG8taW1wb3J0cy5kLnRzJyxcbiAgICAgIGVzbGludHJjOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0pLFxuICAgIHZpdGVSZXN0YXJ0KHtcbiAgICAgIHJlc3RhcnQ6IFsndml0ZS5jb25maWcudHMnLCAnc3JjL3BhZ2VzLmpzb24nXSxcbiAgICB9KSxcbiAgICBpc0g1ICYmIGlzUHJvZFxuICAgICYmIHZpc3VhbGl6ZXIoe1xuICAgICAgZmlsZW5hbWU6ICcuL25vZGVfbW9kdWxlcy8uY2FjaGUvdmlzdWFsaXplci9zdGF0cy5odG1sJyxcbiAgICAgIG9wZW46IHRydWUsXG4gICAgICBnemlwU2l6ZTogdHJ1ZSxcbiAgICAgIGJyb3RsaVNpemU6IHRydWUsXG4gICAgfSksXG4gIF07XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHR5XFxcXG1lZGljYWwtZGV2aWNlXFxcXHNyY1xcXFxzbGlicmFyeVxcXFxyb3V0ZXJcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHR5XFxcXG1lZGljYWwtZGV2aWNlXFxcXHNyY1xcXFxzbGlicmFyeVxcXFxyb3V0ZXJcXFxcdXRpbHNcXFxcdW5pLXJlYWQtcGFnZXMtdjMuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3R5L21lZGljYWwtZGV2aWNlL3NyYy9zbGlicmFyeS9yb3V0ZXIvdXRpbHMvdW5pLXJlYWQtcGFnZXMtdjMuanNcIjsvLyAndXNlIHN0cmljdCc7XHJcbi8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcclxuLy8gICB2YWx1ZTogdHJ1ZSxcclxuLy8gfSk7XHJcblxyXG4vLyBjb25zdCBmcyA9IHJlcXVpcmUoJ2ZzJyk7XHJcbmltcG9ydCBmcyBmcm9tICdmcydcclxuaW1wb3J0IHN0cmlwSnNvbkNvbW1lbnRzIGZyb20gJy4vc3RyaXAtanNvbi1jb21tZW50cyc7XHJcbmltcG9ydCB7IGlzQXJyYXksIGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gtZXMnO1xyXG5cclxuY2xhc3MgVHJhbnNmb3JtUGFnZXMge1xyXG4gIGNvbnN0cnVjdG9yKHsgaW5jbHVkZXMsIHBhZ2VzSnNvbkRpciB9KSB7XHJcbiAgICB0aGlzLmluY2x1ZGVzID0gaW5jbHVkZXM7XHJcbiAgICB0aGlzLnVuaVBhZ2VzSlNPTiA9IEpTT04ucGFyc2Uoc3RyaXBKc29uQ29tbWVudHMoZnMucmVhZEZpbGVTeW5jKHBhZ2VzSnNvbkRpciwgJ3V0Zi04JykpKTtcclxuICAgIHRoaXMucm91dGVzID0gdGhpcy5nZXRQYWdlc1JvdXRlcygpLmNvbmNhdCh0aGlzLmdldFN1YlBhY2thZ2VzUm91dGVzKCkpO1xyXG4gICAgdGhpcy50YWJiYXIgPSB0aGlzLmdldFRhYmJhclJvdXRlcygpO1xyXG4gICAgdGhpcy5yb3V0ZXNNYXAgPSB0aGlzLnRyYW5zZm9ybVBhdGhUb0tleSh0aGlzLnJvdXRlcyk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFx1OTAxQVx1OEZDN1x1OEJGQlx1NTNENnBhZ2VzLmpzb25cdTY1ODdcdTRFRjYgXHU3NTFGXHU2MjEwXHU3NkY0XHU2M0E1XHU1M0VGXHU3NTI4XHU3Njg0cm91dGVzXHJcbiAgICovXHJcbiAgZ2V0UGFnZXNSb3V0ZXMocGFnZXMgPSB0aGlzLnVuaVBhZ2VzSlNPTi5wYWdlcywgcm9vdFBhdGggPSBudWxsKSB7XHJcbiAgICBsZXQgcm91dGVzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGl0ZW0gPSBwYWdlc1tpXTtcclxuICAgICAgbGV0IHJvdXRlID0ge307XHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5pbmNsdWRlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IHRoaXMuaW5jbHVkZXNbal07XHJcbiAgICAgICAgbGV0IHZhbHVlID0gaXRlbVtrZXldO1xyXG4gICAgICAgIGlmIChrZXkgPT09ICdwYXRoJykge1xyXG4gICAgICAgICAgdmFsdWUgPSByb290UGF0aCA/IGAvJHtyb290UGF0aH0vJHt2YWx1ZX1gIDogYC8ke3ZhbHVlfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChrZXkgPT09ICdhbGlhc1BhdGgnICYmIGkgPT0gMCAmJiByb290UGF0aCA9PSBudWxsKSB7XHJcbiAgICAgICAgICByb3V0ZVtrZXldID0gcm91dGVba2V5XSB8fCAnLyc7XHJcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICByb3V0ZVtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJvdXRlcy5wdXNoKHJvdXRlKTtcclxuICAgIH1cclxuICAgIHJldHVybiByb3V0ZXM7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIFx1ODlFM1x1Njc5MFx1NUMwRlx1N0EwQlx1NUU4Rlx1NTIwNlx1NTMwNVx1OERFRlx1NUY4NFxyXG4gICAqL1xyXG4gIGdldFN1YlBhY2thZ2VzUm91dGVzKCkge1xyXG4gICAgaWYgKCEodGhpcy51bmlQYWdlc0pTT04gJiYgdGhpcy51bmlQYWdlc0pTT04uc3ViUGFja2FnZXMpKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIGNvbnN0IHN1YlBhY2thZ2VzID0gdGhpcy51bmlQYWdlc0pTT04uc3ViUGFja2FnZXM7XHJcbiAgICBsZXQgcm91dGVzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YlBhY2thZ2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHN1YlBhZ2VzID0gc3ViUGFja2FnZXNbaV0ucGFnZXM7XHJcbiAgICAgIGNvbnN0IHJvb3QgPSBzdWJQYWNrYWdlc1tpXS5yb290O1xyXG4gICAgICBjb25zdCBzdWJSb3V0ZXMgPSB0aGlzLmdldFBhZ2VzUm91dGVzKHN1YlBhZ2VzLCByb290KTtcclxuICAgICAgcm91dGVzID0gcm91dGVzLmNvbmNhdChzdWJSb3V0ZXMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJvdXRlcztcclxuICB9XHJcblxyXG4gIGdldFRhYmJhclJvdXRlcygpIHtcclxuICAgIGlmICghKHRoaXMudW5pUGFnZXNKU09OICYmIHRoaXMudW5pUGFnZXNKU09OLnRhYkJhciAmJiB0aGlzLnVuaVBhZ2VzSlNPTi50YWJCYXIubGlzdCkpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGFiYmFyID0gdGhpcy51bmlQYWdlc0pTT04udGFiQmFyLmxpc3Q7XHJcbiAgICBsZXQgdGFiYmFyTWFwID0gW107XHJcbiAgICB0YWJiYXIuZm9yRWFjaCgoYmFyKSA9PiB7XHJcbiAgICAgIHRhYmJhck1hcC5wdXNoKCcvJyArIGJhci5wYWdlUGF0aCk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB0YWJiYXJNYXA7XHJcbiAgfVxyXG5cclxuICB0cmFuc2Zvcm1QYXRoVG9LZXkobGlzdCkge1xyXG4gICAgaWYgKCFpc0FycmF5KGxpc3QpIHx8IGlzRW1wdHkobGlzdCkpIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gICAgbGV0IG1hcCA9IHt9O1xyXG4gICAgbGlzdC5mb3JFYWNoKChpKSA9PiB7XHJcbiAgICAgIG1hcFtpLnBhdGhdID0gaTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hcDtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVuaVJlYWRQYWdlc1YzUGx1Z2luKHsgcGFnZXNKc29uRGlyLCBpbmNsdWRlcyB9KSB7XHJcbiAgbGV0IGRlZmF1bHRJbmNsdWRlcyA9IFsncGF0aCcsICdhbGlhc1BhdGgnLCAnbmFtZSddO1xyXG4gIGluY2x1ZGVzID0gWy4uLmRlZmF1bHRJbmNsdWRlcywgLi4uaW5jbHVkZXNdO1xyXG4gIGxldCBwYWdlcyA9IG5ldyBUcmFuc2Zvcm1QYWdlcyh7XHJcbiAgICBwYWdlc0pzb25EaXIsXHJcbiAgICBpbmNsdWRlcyxcclxuICB9KTtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogJ3VuaS1yZWFkLXBhZ2VzLXYzJyxcclxuICAgIGNvbmZpZyhjb25maWcpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBkZWZpbmU6IHtcclxuICAgICAgICAgIFJPVVRFUzogcGFnZXMucm91dGVzLFxyXG4gICAgICAgICAgUk9VVEVTX01BUDogcGFnZXMucm91dGVzTWFwLFxyXG4gICAgICAgICAgVEFCQkFSOiBwYWdlcy50YWJiYXIsXHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG5leHBvcnQgeyB1bmlSZWFkUGFnZXNWM1BsdWdpbiB9O1xyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHR5XFxcXG1lZGljYWwtZGV2aWNlXFxcXHNyY1xcXFxzbGlicmFyeVxcXFxyb3V0ZXJcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHR5XFxcXG1lZGljYWwtZGV2aWNlXFxcXHNyY1xcXFxzbGlicmFyeVxcXFxyb3V0ZXJcXFxcdXRpbHNcXFxcc3RyaXAtanNvbi1jb21tZW50cy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovdHkvbWVkaWNhbC1kZXZpY2Uvc3JjL3NsaWJyYXJ5L3JvdXRlci91dGlscy9zdHJpcC1qc29uLWNvbW1lbnRzLmpzXCI7Y29uc3Qgc2luZ2xlQ29tbWVudCA9IFN5bWJvbCgnc2luZ2xlQ29tbWVudCcpO1xyXG5jb25zdCBtdWx0aUNvbW1lbnQgPSBTeW1ib2woJ211bHRpQ29tbWVudCcpO1xyXG5cclxuY29uc3Qgc3RyaXBXaXRob3V0V2hpdGVzcGFjZSA9ICgpID0+ICcnO1xyXG5jb25zdCBzdHJpcFdpdGhXaGl0ZXNwYWNlID0gKHN0cmluZywgc3RhcnQsIGVuZCkgPT4gc3RyaW5nLnNsaWNlKHN0YXJ0LCBlbmQpLnJlcGxhY2UoL1xcUy9nLCAnICcpO1xyXG5cclxuY29uc3QgaXNFc2NhcGVkID0gKGpzb25TdHJpbmcsIHF1b3RlUG9zaXRpb24pID0+IHtcclxuICBsZXQgaW5kZXggPSBxdW90ZVBvc2l0aW9uIC0gMTtcclxuICBsZXQgYmFja3NsYXNoQ291bnQgPSAwO1xyXG5cclxuICB3aGlsZSAoanNvblN0cmluZ1tpbmRleF0gPT09ICdcXFxcJykge1xyXG4gICAgaW5kZXggLT0gMTtcclxuICAgIGJhY2tzbGFzaENvdW50ICs9IDE7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gQm9vbGVhbihiYWNrc2xhc2hDb3VudCAlIDIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RyaXBKc29uQ29tbWVudHMoanNvblN0cmluZywgeyB3aGl0ZXNwYWNlID0gdHJ1ZSB9ID0ge30pIHtcclxuICBpZiAodHlwZW9mIGpzb25TdHJpbmcgIT09ICdzdHJpbmcnKSB7XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxyXG4gICAgICBgRXhwZWN0ZWQgYXJndW1lbnQgXFxganNvblN0cmluZ1xcYCB0byBiZSBhIFxcYHN0cmluZ1xcYCwgZ290IFxcYCR7dHlwZW9mIGpzb25TdHJpbmd9XFxgYCxcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzdHJpcCA9IHdoaXRlc3BhY2UgPyBzdHJpcFdpdGhXaGl0ZXNwYWNlIDogc3RyaXBXaXRob3V0V2hpdGVzcGFjZTtcclxuXHJcbiAgbGV0IGlzSW5zaWRlU3RyaW5nID0gZmFsc2U7XHJcbiAgbGV0IGlzSW5zaWRlQ29tbWVudCA9IGZhbHNlO1xyXG4gIGxldCBvZmZzZXQgPSAwO1xyXG4gIGxldCByZXN1bHQgPSAnJztcclxuXHJcbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGpzb25TdHJpbmcubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICBjb25zdCBjdXJyZW50Q2hhcmFjdGVyID0ganNvblN0cmluZ1tpbmRleF07XHJcbiAgICBjb25zdCBuZXh0Q2hhcmFjdGVyID0ganNvblN0cmluZ1tpbmRleCArIDFdO1xyXG5cclxuICAgIGlmICghaXNJbnNpZGVDb21tZW50ICYmIGN1cnJlbnRDaGFyYWN0ZXIgPT09ICdcIicpIHtcclxuICAgICAgY29uc3QgZXNjYXBlZCA9IGlzRXNjYXBlZChqc29uU3RyaW5nLCBpbmRleCk7XHJcbiAgICAgIGlmICghZXNjYXBlZCkge1xyXG4gICAgICAgIGlzSW5zaWRlU3RyaW5nID0gIWlzSW5zaWRlU3RyaW5nO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzSW5zaWRlU3RyaW5nKSB7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNJbnNpZGVDb21tZW50ICYmIGN1cnJlbnRDaGFyYWN0ZXIgKyBuZXh0Q2hhcmFjdGVyID09PSAnLy8nKSB7XHJcbiAgICAgIHJlc3VsdCArPSBqc29uU3RyaW5nLnNsaWNlKG9mZnNldCwgaW5kZXgpO1xyXG4gICAgICBvZmZzZXQgPSBpbmRleDtcclxuICAgICAgaXNJbnNpZGVDb21tZW50ID0gc2luZ2xlQ29tbWVudDtcclxuICAgICAgaW5kZXgrKztcclxuICAgIH0gZWxzZSBpZiAoaXNJbnNpZGVDb21tZW50ID09PSBzaW5nbGVDb21tZW50ICYmIGN1cnJlbnRDaGFyYWN0ZXIgKyBuZXh0Q2hhcmFjdGVyID09PSAnXFxyXFxuJykge1xyXG4gICAgICBpbmRleCsrO1xyXG4gICAgICBpc0luc2lkZUNvbW1lbnQgPSBmYWxzZTtcclxuICAgICAgcmVzdWx0ICs9IHN0cmlwKGpzb25TdHJpbmcsIG9mZnNldCwgaW5kZXgpO1xyXG4gICAgICBvZmZzZXQgPSBpbmRleDtcclxuICAgICAgY29udGludWU7XHJcbiAgICB9IGVsc2UgaWYgKGlzSW5zaWRlQ29tbWVudCA9PT0gc2luZ2xlQ29tbWVudCAmJiBjdXJyZW50Q2hhcmFjdGVyID09PSAnXFxuJykge1xyXG4gICAgICBpc0luc2lkZUNvbW1lbnQgPSBmYWxzZTtcclxuICAgICAgcmVzdWx0ICs9IHN0cmlwKGpzb25TdHJpbmcsIG9mZnNldCwgaW5kZXgpO1xyXG4gICAgICBvZmZzZXQgPSBpbmRleDtcclxuICAgIH0gZWxzZSBpZiAoIWlzSW5zaWRlQ29tbWVudCAmJiBjdXJyZW50Q2hhcmFjdGVyICsgbmV4dENoYXJhY3RlciA9PT0gJy8qJykge1xyXG4gICAgICByZXN1bHQgKz0ganNvblN0cmluZy5zbGljZShvZmZzZXQsIGluZGV4KTtcclxuICAgICAgb2Zmc2V0ID0gaW5kZXg7XHJcbiAgICAgIGlzSW5zaWRlQ29tbWVudCA9IG11bHRpQ29tbWVudDtcclxuICAgICAgaW5kZXgrKztcclxuICAgICAgY29udGludWU7XHJcbiAgICB9IGVsc2UgaWYgKGlzSW5zaWRlQ29tbWVudCA9PT0gbXVsdGlDb21tZW50ICYmIGN1cnJlbnRDaGFyYWN0ZXIgKyBuZXh0Q2hhcmFjdGVyID09PSAnKi8nKSB7XHJcbiAgICAgIGluZGV4Kys7XHJcbiAgICAgIGlzSW5zaWRlQ29tbWVudCA9IGZhbHNlO1xyXG4gICAgICByZXN1bHQgKz0gc3RyaXAoanNvblN0cmluZywgb2Zmc2V0LCBpbmRleCArIDEpO1xyXG4gICAgICBvZmZzZXQgPSBpbmRleCArIDE7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3VsdCArIChpc0luc2lkZUNvbW1lbnQgPyBzdHJpcChqc29uU3RyaW5nLnNsaWNlKG9mZnNldCkpIDoganNvblN0cmluZy5zbGljZShvZmZzZXQpKTtcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBS0EsU0FBUyxlQUFlO0FBQ3hCLE9BQU9BLGNBQWE7QUFFcEIsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBT0MscUJBQW9COzs7QUNUK04sT0FBTyxpQkFBaUI7QUFDbFIsT0FBTyxrQkFBa0I7QUFFekIsT0FBTyxjQUFjO0FBRXJCLElBQU0sVUFBNEIsQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDO0FBSWhFLFFBQVEsS0FBSyxRQUFRO0FBRXJCLElBQU8seUJBQVE7OztBQ1htUCxPQUFPLGFBQWE7QUFFdFIsSUFBTSxrQkFBa0IsUUFBUSxJQUFJO0FBQ3BDLElBQU0sT0FBTyxvQkFBb0I7QUFDakMsSUFBTSxRQUFRLG9CQUFvQjtBQUNsQyxJQUFNLDJCQUEyQixRQUFROzs7QUNEbEMsU0FBUyxhQUFhLFlBQWdDLENBQUMsR0FBRztBQUMvRCxRQUFNLFFBQXNDLENBQUM7QUFDN0MsYUFBVyxDQUFDLFFBQVEsTUFBTSxLQUFLLFdBQVc7QUFDeEMsVUFBTSxVQUFVLGNBQWMsS0FBSyxNQUFNO0FBQ3pDLFVBQU0sTUFBTSxJQUFJO0FBQUEsTUFDZDtBQUFBLE1BQ0EsY0FBYztBQUFBLE1BQ2QsSUFBSTtBQUFBLE1BQ0osU0FBUyxVQUFRLEtBQUssUUFBUSxJQUFJLE9BQU8sSUFBSSxNQUFNLEVBQUUsR0FBRyxFQUFFO0FBQUE7QUFBQSxNQUUxRCxHQUFJLFVBQVUsRUFBRSxRQUFRLE1BQU0sSUFBSSxDQUFDO0FBQUEsSUFDckM7QUFBQSxFQUNGO0FBQ0EsU0FBTztBQUNUOzs7QUNqQkEsT0FBTyxTQUFTO0FBQ2hCLFNBQVMscUNBQXFDLFlBQVk7QUFDMUQsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxpQkFBaUI7QUFDeEIsU0FBUyxrQkFBa0I7QUFPcEIsU0FBUyxrQkFBa0IsRUFBRSxPQUFPLEdBQXFDO0FBQzlFLFNBQU87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
