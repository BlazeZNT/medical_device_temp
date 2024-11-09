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
var define = {};
if (!["mp-weixin", "h5", "web"].includes(process2.env.UNI_PLATFORM)) {
  define["global"] = null;
  define["wx"] = "uni";
}
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
      "ROUTES": new TransformPages2().routes,
      ...define
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicG9zdGNzcy5jb25maWcudHMiLCAiYnVpbGQvcGxhdGZvcm0udHMiLCAiYnVpbGQvcHJveHkudHMiLCAiYnVpbGQvdml0ZVBsdWdpbnMudHMiLCAic3JjL3NsaWJyYXJ5L3JvdXRlci91dGlscy91bmktcmVhZC1wYWdlcy12My5qcyIsICJzcmMvc2xpYnJhcnkvcm91dGVyL3V0aWxzL3N0cmlwLWpzb24tY29tbWVudHMuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx0eVxcXFxtZWRpY2FsLWRldmljZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdHlcXFxcbWVkaWNhbC1kZXZpY2VcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3R5L21lZGljYWwtZGV2aWNlL3ZpdGUuY29uZmlnLnRzXCI7LyoqXHJcbiAqICB2aXRlIFx1OTE0RFx1N0Y2RVxyXG4gKiAgQHNlZSBodHRwczovL2NuLnZpdGVqcy5kZXYvY29uZmlnL1xyXG4gKiAgQHR5cGUge2ltcG9ydCgndml0ZScpLlVzZXJDb25maWd9XHJcbiAqL1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJztcclxuaW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJztcclxuaW1wb3J0IHR5cGUgeyBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgVHJhbnNmb3JtUGFnZXMgZnJvbSAndW5pLXJlYWQtcGFnZXMtdml0ZSc7XHJcbmltcG9ydCBwb3N0Y3NzUGx1Z2lucyBmcm9tICcuL3Bvc3Rjc3MuY29uZmlnJztcclxuaW1wb3J0IHsgY3JlYXRlVml0ZVBsdWdpbnMsIGN1cnJlbnRQbGF0Zm9ybSwgcmVzb2x2ZVByb3h5IH0gZnJvbSAnLi9idWlsZCc7XHJcblxyXG5pbXBvcnQgeyB1bmlSZWFkUGFnZXNWM1BsdWdpbiB9ICBmcm9tICcuL3NyYy9zbGlicmFyeS9yb3V0ZXIvdXRpbHMvdW5pLXJlYWQtcGFnZXMtdjMuanMnO1xyXG4vLyBpbXBvcnQgbXBsaXZlTWFpbmZlc3RQbHVnaW4gZnJvbSAnLi9zaGVlcC9saWJzL21wbGl2ZS1tYW5pZmVzdC1wbHVnaW4nO1xyXG5cclxuXHJcbmNvbnN0IGRlZmluZSA9IHt9XHJcbmlmKCFbXCJtcC13ZWl4aW5cIiwgXCJoNVwiLCBcIndlYlwiXS5pbmNsdWRlcyhwcm9jZXNzLmVudi5VTklfUExBVEZPUk0pKSB7XHJcbiAgICBkZWZpbmVbJ2dsb2JhbCddID0gIG51bGxcclxuICAgIGRlZmluZVsnd3gnXSA9ICAndW5pJ1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoYXN5bmMgKHsgbW9kZSB9KSA9PiB7XHJcblx0Y29uc3Qgcm9vdCA9IHByb2Nlc3MuY3dkKCk7XHJcblx0Y29uc3QgZW52ID0gbG9hZEVudihtb2RlLCByZXNvbHZlKHJvb3QsICdlbnYnKSk7XHJcblx0Y29uc3QgaXNQcm9kID0gbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nO1xyXG5cdGNvbnN0IHsgVklURV9QUk9YWV9QUkVGSVgsIFZJVEVfVVBMT0FEX1BST1hZX1BSRUZJWCwgVklURV9CQVNFX1VSTCwgVklURV9VUExPQURfVVJMLCBWSVRFX1BPUlQgfSA9IGVudjtcclxuXHRjb25zb2xlLmxvZyhlbnYpXHJcblx0cmV0dXJuIHtcclxuXHRcdGJhc2U6ICcuLycsXHJcblx0XHRlbnZEaXI6ICcuL2VudicsIC8vIFx1ODFFQVx1NUI5QVx1NEU0OWVudlx1NzZFRVx1NUY1NVxyXG5cdFx0Ly8gXHU4QkJFXHU3RjZFXHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXHJcblx0XHRyZXNvbHZlOiB7XHJcblx0XHRcdGFsaWFzOiB7XHJcblx0XHRcdFx0J0AnOiByZXNvbHZlKCcuL3NyYycpLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRleHRlbnNpb25zOiBbJy5qcycsICcudHMnXSwgLy8gXHU0RjdGXHU3NTI4XHU4REVGXHU1Rjg0XHU1MjJCXHU1NDBEXHU2NUY2XHU2MEYzXHU4OTgxXHU3NzAxXHU3NTY1XHU3Njg0XHU1NDBFXHU3RjAwXHU1NDBEXHVGRjBDXHU1M0VGXHU0RUU1XHU4MUVBXHU1REYxIFx1NTg5RVx1NTFDRlxyXG5cdFx0fSxcclxuXHRcdC8vIFx1ODFFQVx1NUI5QVx1NEU0OVx1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlxyXG5cdFx0ZGVmaW5lOiB7XHJcblx0XHRcdCdwcm9jZXNzLmVudic6IHt9LFxyXG5cdFx0XHQnUExBVEZPUk0nOiBKU09OLnN0cmluZ2lmeShjdXJyZW50UGxhdGZvcm0pLFxyXG5cdFx0XHQnUk9VVEVTJzogbmV3IFRyYW5zZm9ybVBhZ2VzKCkucm91dGVzLFxyXG5cdFx0XHQuLi5kZWZpbmVcclxuXHRcdH0sXHJcblx0XHRjc3M6IHtcclxuXHRcdFx0cHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG5cdFx0XHRcdHNjc3M6IHtcclxuXHRcdFx0XHRcdGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIi4vc3JjL3VuaS5zY3NzXCI7JyxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRwb3N0Y3NzOiB7XHJcblx0XHRcdFx0cGx1Z2luczogcG9zdGNzc1BsdWdpbnMsXHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdFx0cGx1Z2luczogWy4uLmNyZWF0ZVZpdGVQbHVnaW5zKHsgaXNQcm9kIH0pLCB1bmlSZWFkUGFnZXNWM1BsdWdpbih7XHJcblx0XHRcdHBhZ2VzSnNvbkRpcjogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9wYWdlcy5qc29uJyksXHJcblx0XHRcdGluY2x1ZGVzOiBbJ3BhdGgnLCAnYWxpYXNQYXRoJywgJ25hbWUnLCAnbWV0YSddLFxyXG5cdFx0fSldLFxyXG5cdFx0Ly8gXHU1RjAwXHU1M0QxXHU2NzBEXHU1MkExXHU1NjY4XHU5MTREXHU3RjZFXHJcblx0XHRzZXJ2ZXI6IHtcclxuXHRcdFx0aG9zdDogdHJ1ZSxcclxuXHRcdFx0Ly8gb3BlbjogdHJ1ZSxcclxuXHRcdFx0cG9ydDogTnVtYmVyLnBhcnNlSW50KFZJVEVfUE9SVCEsIDEwKSxcclxuXHRcdFx0cHJveHk6IHJlc29sdmVQcm94eShbW1ZJVEVfUFJPWFlfUFJFRklYLCBWSVRFX0JBU0VfVVJMXSwgW1ZJVEVfVVBMT0FEX1BST1hZX1BSRUZJWCwgVklURV9VUExPQURfVVJMXV0pLFxyXG5cdFx0fSxcclxuXHRcdC8vIFx1Njc4NFx1NUVGQVx1OTE0RFx1N0Y2RVxyXG5cdFx0YnVpbGQ6IHtcclxuXHRcdFx0b3V0RGlyOiAnZGlzdCcsXHJcblx0XHRcdGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTUwMCxcclxuXHRcdFx0c291cmNlbWFwOiAhaXNQcm9kLFxyXG5cdFx0XHR0YXJnZXQ6ICdlczYnLFxyXG5cdFx0XHRtaW5pZnk6IGlzUHJvZCA/ICd0ZXJzZXInIDogZmFsc2UsXHJcblx0XHRcdHRlcnNlck9wdGlvbnM6IHtcclxuXHRcdFx0XHRjb21wcmVzczoge1xyXG5cdFx0XHRcdFx0ZHJvcF9jb25zb2xlOiBpc1Byb2QsXHJcblx0XHRcdFx0XHRkcm9wX2RlYnVnZ2VyOiB0cnVlLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHJvbGx1cE9wdGlvbnM6IHtcclxuXHRcdFx0XHRvdXRwdXQ6IHtcclxuXHRcdFx0XHRcdGVudHJ5RmlsZU5hbWVzOiBgYXNzZXRzL1tuYW1lXS4ke25ldyBEYXRlKCkuZ2V0VGltZSgpfS5qc2AsXHJcblx0XHRcdFx0XHRjaHVua0ZpbGVOYW1lczogYGFzc2V0cy9bbmFtZV0uJHtuZXcgRGF0ZSgpLmdldFRpbWUoKX0uanNgLFxyXG5cdFx0XHRcdFx0YXNzZXRGaWxlTmFtZXM6IGBhc3NldHMvW25hbWVdLiR7bmV3IERhdGUoKS5nZXRUaW1lKCl9LltleHRdYCxcclxuXHRcdFx0XHRcdGNvbXBhY3Q6IHRydWUsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0fSBhcyBVc2VyQ29uZmlnO1xyXG59KTsiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHR5XFxcXG1lZGljYWwtZGV2aWNlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx0eVxcXFxtZWRpY2FsLWRldmljZVxcXFxwb3N0Y3NzLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovdHkvbWVkaWNhbC1kZXZpY2UvcG9zdGNzcy5jb25maWcudHNcIjtpbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAndGFpbHdpbmRjc3MnO1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInO1xuaW1wb3J0IHR5cGUgeyBBY2NlcHRlZFBsdWdpbiB9IGZyb20gJ3Bvc3Rjc3MnO1xuaW1wb3J0IGNzc01hY3JvIGZyb20gJ3dlYXBwLXRhaWx3aW5kY3NzL2Nzcy1tYWNyby9wb3N0Y3NzJztcblxuY29uc3QgcGx1Z2luczogQWNjZXB0ZWRQbHVnaW5bXSA9IFt0YWlsd2luZGNzcygpLCBhdXRvcHJlZml4ZXIoKV07XG5cbi8vIFx1NTNFRlx1NEVFNVx1NEY3Rlx1NzUyOCBwb3N0Y3NzLXB4dHJhbnNmb3JtIFx1Njc2NVx1OEZEQlx1ODg0QyBweCBcdThGNkMgcnB4IFx1NzY4NFx1NTI5Rlx1ODBGRFxuXG5wbHVnaW5zLnB1c2goY3NzTWFjcm8pO1xuXG5leHBvcnQgZGVmYXVsdCBwbHVnaW5zO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx0eVxcXFxtZWRpY2FsLWRldmljZVxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdHlcXFxcbWVkaWNhbC1kZXZpY2VcXFxcYnVpbGRcXFxccGxhdGZvcm0udHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3R5L21lZGljYWwtZGV2aWNlL2J1aWxkL3BsYXRmb3JtLnRzXCI7aW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJztcblxuY29uc3QgY3VycmVudFBsYXRmb3JtID0gcHJvY2Vzcy5lbnYuVU5JX1BMQVRGT1JNO1xuY29uc3QgaXNINSA9IGN1cnJlbnRQbGF0Zm9ybSA9PT0gJ2g1JztcbmNvbnN0IGlzQXBwID0gY3VycmVudFBsYXRmb3JtID09PSAnYXBwJztcbmNvbnN0IFdlYXBwVGFpbHdpbmRjc3NEaXNhYmxlZCA9IGlzSDUgfHwgaXNBcHA7XG5jb25zdCBpc01wID0gIWlzSDUgJiYgIWlzQXBwO1xuXG5leHBvcnQge1xuICBpc0g1LFxuICBpc0FwcCxcbiAgV2VhcHBUYWlsd2luZGNzc0Rpc2FibGVkLFxuICBpc01wLFxuICBjdXJyZW50UGxhdGZvcm0sXG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx0eVxcXFxtZWRpY2FsLWRldmljZVxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdHlcXFxcbWVkaWNhbC1kZXZpY2VcXFxcYnVpbGRcXFxccHJveHkudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3R5L21lZGljYWwtZGV2aWNlL2J1aWxkL3Byb3h5LnRzXCI7LyoqXG4gKiBDb25maWd1cmUgYWNjb3JkaW5nIHRvIHRoZSBwcm94eSBsaXN0XG4gKiBAcGFyYW0gcHJveHlMaXN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlUHJveHkocHJveHlMaXN0OiBbc3RyaW5nLCBzdHJpbmddW10gPSBbXSkge1xuICBjb25zdCBwcm94eTogUmVjb3JkPHN0cmluZywgUHJveHlPcHRpb25zPiA9IHt9O1xuICBmb3IgKGNvbnN0IFtwcmVmaXgsIHRhcmdldF0gb2YgcHJveHlMaXN0KSB7XG4gICAgY29uc3QgaXNIdHRwcyA9IC9eaHR0cHM6XFwvXFwvLy50ZXN0KHRhcmdldCk7XG4gICAgcHJveHlbcHJlZml4XSA9IHtcbiAgICAgIHRhcmdldCxcbiAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgIHdzOiB0cnVlLFxuICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7cHJlZml4fWApLCAnJyksXG4gICAgICAvLyBodHRwcyBpcyByZXF1aXJlIHNlY3VyZT1mYWxzZVxuICAgICAgLi4uKGlzSHR0cHMgPyB7IHNlY3VyZTogZmFsc2UgfSA6IHt9KSxcbiAgICB9O1xuICB9XG4gIHJldHVybiBwcm94eTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcdHlcXFxcbWVkaWNhbC1kZXZpY2VcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHR5XFxcXG1lZGljYWwtZGV2aWNlXFxcXGJ1aWxkXFxcXHZpdGVQbHVnaW5zLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi90eS9tZWRpY2FsLWRldmljZS9idWlsZC92aXRlUGx1Z2lucy50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdW5pIGZyb20gJ0BkY2xvdWRpby92aXRlLXBsdWdpbi11bmknO1xuaW1wb3J0IHsgVW5pZmllZFZpdGVXZWFwcFRhaWx3aW5kY3NzUGx1Z2luIGFzIHV2dHcgfSBmcm9tICd3ZWFwcC10YWlsd2luZGNzcy92aXRlJztcbmltcG9ydCBhdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnO1xuaW1wb3J0IHZpdGVSZXN0YXJ0IGZyb20gJ3ZpdGUtcGx1Z2luLXJlc3RhcnQnO1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcic7XG5pbXBvcnQgeyBXZWFwcFRhaWx3aW5kY3NzRGlzYWJsZWQsIGlzSDUgfSBmcm9tICcuL3BsYXRmb3JtJztcblxuaW50ZXJmYWNlIFZpdGVQbHVnaW5Db25maWcge1xuICBpc1Byb2Q6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVZpdGVQbHVnaW5zKHsgaXNQcm9kIH06IFZpdGVQbHVnaW5Db25maWcpOiBQbHVnaW5PcHRpb25bXSB7XG4gIHJldHVybiBbXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciBUT0RPIHVuaSgpIFx1NEYxQVx1NjJBNVx1OTUxOVx1RkYxQXVuaSBpcyBub3QgYSBmdW5jdGlvbixcdTY2ODJcdTY1RjZcdTRGN0ZcdTc1MjhcdTZCNjRcdTY1QjlcdTVGMEZcdTg5RTNcdTUxQjNcbiAgICB1bmk/LmRlZmF1bHQoKSxcbiAgICB1dnR3KHtcbiAgICAgIHJlbTJycHg6IHRydWUsXG4gICAgICBkaXNhYmxlZDogV2VhcHBUYWlsd2luZGNzc0Rpc2FibGVkLFxuICAgICAgLy8gXHU0RjdGXHU3NTI4XHU2NUIwXHU3Njg0IGFzdC1ncmVwIFx1Njc2NVx1NTkwNFx1NzQwNiBqcyBcdThENDRcdTZFOTBcdUZGMENcdTkwMUZcdTVFQTZcdTY2MkYgYmFiZWwgXHU3Njg0Mlx1NTAwRFx1NURFNlx1NTNGM1xuICAgICAgLy8gXHU5NzAwXHU4OTgxXHU1MTQ4XHU1Qjg5XHU4OEM1IGBAYXN0LWdyZXAvbmFwaWBcbiAgICAgIC8vIGpzQXN0VG9vbDogJ2FzdC1ncmVwJ1xuICAgIH0pLFxuICAgIGF1dG9JbXBvcnQoe1xuICAgICAgaW5jbHVkZTogW1xuICAgICAgICAvXFwuW3RqXXN4PyQvLCAvLyAudHMsIC50c3gsIC5qcywgLmpzeFxuICAgICAgICAvXFwudnVlJC8sXG4gICAgICAgIC9cXC52dWVcXD92dWUvLCAvLyAudnVlXG4gICAgICBdLFxuICAgICAgaW1wb3J0czogW1xuICAgICAgICAndnVlJyxcbiAgICAgICAgJ3VuaS1hcHAnLFxuICAgICAgICAncGluaWEnLFxuICAgICAgICB7XG4gICAgICAgICAgJ3VuaS1taW5pLXJvdXRlcic6IFsndXNlUm91dGVyJywgJ3VzZVJvdXRlJ10sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAnYWxvdmEvY2xpZW50JzogWyd1c2VSZXF1ZXN0J10sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgZHRzOiAndHlwaW5ncy9hdXRvLWltcG9ydHMuZC50cycsXG4gICAgICBlc2xpbnRyYzoge1xuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KSxcbiAgICB2aXRlUmVzdGFydCh7XG4gICAgICByZXN0YXJ0OiBbJ3ZpdGUuY29uZmlnLnRzJywgJ3NyYy9wYWdlcy5qc29uJ10sXG4gICAgfSksXG4gICAgaXNINSAmJiBpc1Byb2RcbiAgICAmJiB2aXN1YWxpemVyKHtcbiAgICAgIGZpbGVuYW1lOiAnLi9ub2RlX21vZHVsZXMvLmNhY2hlL3Zpc3VhbGl6ZXIvc3RhdHMuaHRtbCcsXG4gICAgICBvcGVuOiB0cnVlLFxuICAgICAgZ3ppcFNpemU6IHRydWUsXG4gICAgICBicm90bGlTaXplOiB0cnVlLFxuICAgIH0pLFxuICBdO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx0eVxcXFxtZWRpY2FsLWRldmljZVxcXFxzcmNcXFxcc2xpYnJhcnlcXFxccm91dGVyXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx0eVxcXFxtZWRpY2FsLWRldmljZVxcXFxzcmNcXFxcc2xpYnJhcnlcXFxccm91dGVyXFxcXHV0aWxzXFxcXHVuaS1yZWFkLXBhZ2VzLXYzLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi90eS9tZWRpY2FsLWRldmljZS9zcmMvc2xpYnJhcnkvcm91dGVyL3V0aWxzL3VuaS1yZWFkLXBhZ2VzLXYzLmpzXCI7Ly8gJ3VzZSBzdHJpY3QnO1xyXG4vLyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XHJcbi8vICAgdmFsdWU6IHRydWUsXHJcbi8vIH0pO1xyXG5cclxuLy8gY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xyXG5pbXBvcnQgZnMgZnJvbSAnZnMnXHJcbmltcG9ydCBzdHJpcEpzb25Db21tZW50cyBmcm9tICcuL3N0cmlwLWpzb24tY29tbWVudHMnO1xyXG5pbXBvcnQgeyBpc0FycmF5LCBpc0VtcHR5IH0gZnJvbSAnbG9kYXNoLWVzJztcclxuXHJcbmNsYXNzIFRyYW5zZm9ybVBhZ2VzIHtcclxuICBjb25zdHJ1Y3Rvcih7IGluY2x1ZGVzLCBwYWdlc0pzb25EaXIgfSkge1xyXG4gICAgdGhpcy5pbmNsdWRlcyA9IGluY2x1ZGVzO1xyXG4gICAgdGhpcy51bmlQYWdlc0pTT04gPSBKU09OLnBhcnNlKHN0cmlwSnNvbkNvbW1lbnRzKGZzLnJlYWRGaWxlU3luYyhwYWdlc0pzb25EaXIsICd1dGYtOCcpKSk7XHJcbiAgICB0aGlzLnJvdXRlcyA9IHRoaXMuZ2V0UGFnZXNSb3V0ZXMoKS5jb25jYXQodGhpcy5nZXRTdWJQYWNrYWdlc1JvdXRlcygpKTtcclxuICAgIHRoaXMudGFiYmFyID0gdGhpcy5nZXRUYWJiYXJSb3V0ZXMoKTtcclxuICAgIHRoaXMucm91dGVzTWFwID0gdGhpcy50cmFuc2Zvcm1QYXRoVG9LZXkodGhpcy5yb3V0ZXMpO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBcdTkwMUFcdThGQzdcdThCRkJcdTUzRDZwYWdlcy5qc29uXHU2NTg3XHU0RUY2IFx1NzUxRlx1NjIxMFx1NzZGNFx1NjNBNVx1NTNFRlx1NzUyOFx1NzY4NHJvdXRlc1xyXG4gICAqL1xyXG4gIGdldFBhZ2VzUm91dGVzKHBhZ2VzID0gdGhpcy51bmlQYWdlc0pTT04ucGFnZXMsIHJvb3RQYXRoID0gbnVsbCkge1xyXG4gICAgbGV0IHJvdXRlcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBpdGVtID0gcGFnZXNbaV07XHJcbiAgICAgIGxldCByb3V0ZSA9IHt9O1xyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuaW5jbHVkZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBjb25zdCBrZXkgPSB0aGlzLmluY2x1ZGVzW2pdO1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IGl0ZW1ba2V5XTtcclxuICAgICAgICBpZiAoa2V5ID09PSAncGF0aCcpIHtcclxuICAgICAgICAgIHZhbHVlID0gcm9vdFBhdGggPyBgLyR7cm9vdFBhdGh9LyR7dmFsdWV9YCA6IGAvJHt2YWx1ZX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoa2V5ID09PSAnYWxpYXNQYXRoJyAmJiBpID09IDAgJiYgcm9vdFBhdGggPT0gbnVsbCkge1xyXG4gICAgICAgICAgcm91dGVba2V5XSA9IHJvdXRlW2tleV0gfHwgJy8nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgcm91dGVba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByb3V0ZXMucHVzaChyb3V0ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcm91dGVzO1xyXG4gIH1cclxuICAvKipcclxuICAgKiBcdTg5RTNcdTY3OTBcdTVDMEZcdTdBMEJcdTVFOEZcdTUyMDZcdTUzMDVcdThERUZcdTVGODRcclxuICAgKi9cclxuICBnZXRTdWJQYWNrYWdlc1JvdXRlcygpIHtcclxuICAgIGlmICghKHRoaXMudW5pUGFnZXNKU09OICYmIHRoaXMudW5pUGFnZXNKU09OLnN1YlBhY2thZ2VzKSkge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgICBjb25zdCBzdWJQYWNrYWdlcyA9IHRoaXMudW5pUGFnZXNKU09OLnN1YlBhY2thZ2VzO1xyXG4gICAgbGV0IHJvdXRlcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJQYWNrYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBzdWJQYWdlcyA9IHN1YlBhY2thZ2VzW2ldLnBhZ2VzO1xyXG4gICAgICBjb25zdCByb290ID0gc3ViUGFja2FnZXNbaV0ucm9vdDtcclxuICAgICAgY29uc3Qgc3ViUm91dGVzID0gdGhpcy5nZXRQYWdlc1JvdXRlcyhzdWJQYWdlcywgcm9vdCk7XHJcbiAgICAgIHJvdXRlcyA9IHJvdXRlcy5jb25jYXQoc3ViUm91dGVzKTtcclxuICAgIH1cclxuICAgIHJldHVybiByb3V0ZXM7XHJcbiAgfVxyXG5cclxuICBnZXRUYWJiYXJSb3V0ZXMoKSB7XHJcbiAgICBpZiAoISh0aGlzLnVuaVBhZ2VzSlNPTiAmJiB0aGlzLnVuaVBhZ2VzSlNPTi50YWJCYXIgJiYgdGhpcy51bmlQYWdlc0pTT04udGFiQmFyLmxpc3QpKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIGNvbnN0IHRhYmJhciA9IHRoaXMudW5pUGFnZXNKU09OLnRhYkJhci5saXN0O1xyXG4gICAgbGV0IHRhYmJhck1hcCA9IFtdO1xyXG4gICAgdGFiYmFyLmZvckVhY2goKGJhcikgPT4ge1xyXG4gICAgICB0YWJiYXJNYXAucHVzaCgnLycgKyBiYXIucGFnZVBhdGgpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdGFiYmFyTWFwO1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtUGF0aFRvS2V5KGxpc3QpIHtcclxuICAgIGlmICghaXNBcnJheShsaXN0KSB8fCBpc0VtcHR5KGxpc3QpKSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICAgIGxldCBtYXAgPSB7fTtcclxuICAgIGxpc3QuZm9yRWFjaCgoaSkgPT4ge1xyXG4gICAgICBtYXBbaS5wYXRoXSA9IGk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtYXA7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1bmlSZWFkUGFnZXNWM1BsdWdpbih7IHBhZ2VzSnNvbkRpciwgaW5jbHVkZXMgfSkge1xyXG4gIGxldCBkZWZhdWx0SW5jbHVkZXMgPSBbJ3BhdGgnLCAnYWxpYXNQYXRoJywgJ25hbWUnXTtcclxuICBpbmNsdWRlcyA9IFsuLi5kZWZhdWx0SW5jbHVkZXMsIC4uLmluY2x1ZGVzXTtcclxuICBsZXQgcGFnZXMgPSBuZXcgVHJhbnNmb3JtUGFnZXMoe1xyXG4gICAgcGFnZXNKc29uRGlyLFxyXG4gICAgaW5jbHVkZXMsXHJcbiAgfSk7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6ICd1bmktcmVhZC1wYWdlcy12MycsXHJcbiAgICBjb25maWcoY29uZmlnKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZGVmaW5lOiB7XHJcbiAgICAgICAgICBST1VURVM6IHBhZ2VzLnJvdXRlcyxcclxuICAgICAgICAgIFJPVVRFU19NQVA6IHBhZ2VzLnJvdXRlc01hcCxcclxuICAgICAgICAgIFRBQkJBUjogcGFnZXMudGFiYmFyLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gIH07XHJcbn1cclxuZXhwb3J0IHsgdW5pUmVhZFBhZ2VzVjNQbHVnaW4gfTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx0eVxcXFxtZWRpY2FsLWRldmljZVxcXFxzcmNcXFxcc2xpYnJhcnlcXFxccm91dGVyXFxcXHV0aWxzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx0eVxcXFxtZWRpY2FsLWRldmljZVxcXFxzcmNcXFxcc2xpYnJhcnlcXFxccm91dGVyXFxcXHV0aWxzXFxcXHN0cmlwLWpzb24tY29tbWVudHMuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3R5L21lZGljYWwtZGV2aWNlL3NyYy9zbGlicmFyeS9yb3V0ZXIvdXRpbHMvc3RyaXAtanNvbi1jb21tZW50cy5qc1wiO2NvbnN0IHNpbmdsZUNvbW1lbnQgPSBTeW1ib2woJ3NpbmdsZUNvbW1lbnQnKTtcclxuY29uc3QgbXVsdGlDb21tZW50ID0gU3ltYm9sKCdtdWx0aUNvbW1lbnQnKTtcclxuXHJcbmNvbnN0IHN0cmlwV2l0aG91dFdoaXRlc3BhY2UgPSAoKSA9PiAnJztcclxuY29uc3Qgc3RyaXBXaXRoV2hpdGVzcGFjZSA9IChzdHJpbmcsIHN0YXJ0LCBlbmQpID0+IHN0cmluZy5zbGljZShzdGFydCwgZW5kKS5yZXBsYWNlKC9cXFMvZywgJyAnKTtcclxuXHJcbmNvbnN0IGlzRXNjYXBlZCA9IChqc29uU3RyaW5nLCBxdW90ZVBvc2l0aW9uKSA9PiB7XHJcbiAgbGV0IGluZGV4ID0gcXVvdGVQb3NpdGlvbiAtIDE7XHJcbiAgbGV0IGJhY2tzbGFzaENvdW50ID0gMDtcclxuXHJcbiAgd2hpbGUgKGpzb25TdHJpbmdbaW5kZXhdID09PSAnXFxcXCcpIHtcclxuICAgIGluZGV4IC09IDE7XHJcbiAgICBiYWNrc2xhc2hDb3VudCArPSAxO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIEJvb2xlYW4oYmFja3NsYXNoQ291bnQgJSAyKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHN0cmlwSnNvbkNvbW1lbnRzKGpzb25TdHJpbmcsIHsgd2hpdGVzcGFjZSA9IHRydWUgfSA9IHt9KSB7XHJcbiAgaWYgKHR5cGVvZiBqc29uU3RyaW5nICE9PSAnc3RyaW5nJykge1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcclxuICAgICAgYEV4cGVjdGVkIGFyZ3VtZW50IFxcYGpzb25TdHJpbmdcXGAgdG8gYmUgYSBcXGBzdHJpbmdcXGAsIGdvdCBcXGAke3R5cGVvZiBqc29uU3RyaW5nfVxcYGAsXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc3RyaXAgPSB3aGl0ZXNwYWNlID8gc3RyaXBXaXRoV2hpdGVzcGFjZSA6IHN0cmlwV2l0aG91dFdoaXRlc3BhY2U7XHJcblxyXG4gIGxldCBpc0luc2lkZVN0cmluZyA9IGZhbHNlO1xyXG4gIGxldCBpc0luc2lkZUNvbW1lbnQgPSBmYWxzZTtcclxuICBsZXQgb2Zmc2V0ID0gMDtcclxuICBsZXQgcmVzdWx0ID0gJyc7XHJcblxyXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBqc29uU3RyaW5nLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgY29uc3QgY3VycmVudENoYXJhY3RlciA9IGpzb25TdHJpbmdbaW5kZXhdO1xyXG4gICAgY29uc3QgbmV4dENoYXJhY3RlciA9IGpzb25TdHJpbmdbaW5kZXggKyAxXTtcclxuXHJcbiAgICBpZiAoIWlzSW5zaWRlQ29tbWVudCAmJiBjdXJyZW50Q2hhcmFjdGVyID09PSAnXCInKSB7XHJcbiAgICAgIGNvbnN0IGVzY2FwZWQgPSBpc0VzY2FwZWQoanNvblN0cmluZywgaW5kZXgpO1xyXG4gICAgICBpZiAoIWVzY2FwZWQpIHtcclxuICAgICAgICBpc0luc2lkZVN0cmluZyA9ICFpc0luc2lkZVN0cmluZztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc0luc2lkZVN0cmluZykge1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzSW5zaWRlQ29tbWVudCAmJiBjdXJyZW50Q2hhcmFjdGVyICsgbmV4dENoYXJhY3RlciA9PT0gJy8vJykge1xyXG4gICAgICByZXN1bHQgKz0ganNvblN0cmluZy5zbGljZShvZmZzZXQsIGluZGV4KTtcclxuICAgICAgb2Zmc2V0ID0gaW5kZXg7XHJcbiAgICAgIGlzSW5zaWRlQ29tbWVudCA9IHNpbmdsZUNvbW1lbnQ7XHJcbiAgICAgIGluZGV4Kys7XHJcbiAgICB9IGVsc2UgaWYgKGlzSW5zaWRlQ29tbWVudCA9PT0gc2luZ2xlQ29tbWVudCAmJiBjdXJyZW50Q2hhcmFjdGVyICsgbmV4dENoYXJhY3RlciA9PT0gJ1xcclxcbicpIHtcclxuICAgICAgaW5kZXgrKztcclxuICAgICAgaXNJbnNpZGVDb21tZW50ID0gZmFsc2U7XHJcbiAgICAgIHJlc3VsdCArPSBzdHJpcChqc29uU3RyaW5nLCBvZmZzZXQsIGluZGV4KTtcclxuICAgICAgb2Zmc2V0ID0gaW5kZXg7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfSBlbHNlIGlmIChpc0luc2lkZUNvbW1lbnQgPT09IHNpbmdsZUNvbW1lbnQgJiYgY3VycmVudENoYXJhY3RlciA9PT0gJ1xcbicpIHtcclxuICAgICAgaXNJbnNpZGVDb21tZW50ID0gZmFsc2U7XHJcbiAgICAgIHJlc3VsdCArPSBzdHJpcChqc29uU3RyaW5nLCBvZmZzZXQsIGluZGV4KTtcclxuICAgICAgb2Zmc2V0ID0gaW5kZXg7XHJcbiAgICB9IGVsc2UgaWYgKCFpc0luc2lkZUNvbW1lbnQgJiYgY3VycmVudENoYXJhY3RlciArIG5leHRDaGFyYWN0ZXIgPT09ICcvKicpIHtcclxuICAgICAgcmVzdWx0ICs9IGpzb25TdHJpbmcuc2xpY2Uob2Zmc2V0LCBpbmRleCk7XHJcbiAgICAgIG9mZnNldCA9IGluZGV4O1xyXG4gICAgICBpc0luc2lkZUNvbW1lbnQgPSBtdWx0aUNvbW1lbnQ7XHJcbiAgICAgIGluZGV4Kys7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfSBlbHNlIGlmIChpc0luc2lkZUNvbW1lbnQgPT09IG11bHRpQ29tbWVudCAmJiBjdXJyZW50Q2hhcmFjdGVyICsgbmV4dENoYXJhY3RlciA9PT0gJyovJykge1xyXG4gICAgICBpbmRleCsrO1xyXG4gICAgICBpc0luc2lkZUNvbW1lbnQgPSBmYWxzZTtcclxuICAgICAgcmVzdWx0ICs9IHN0cmlwKGpzb25TdHJpbmcsIG9mZnNldCwgaW5kZXggKyAxKTtcclxuICAgICAgb2Zmc2V0ID0gaW5kZXggKyAxO1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiByZXN1bHQgKyAoaXNJbnNpZGVDb21tZW50ID8gc3RyaXAoanNvblN0cmluZy5zbGljZShvZmZzZXQpKSA6IGpzb25TdHJpbmcuc2xpY2Uob2Zmc2V0KSk7XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUtBLFNBQVMsZUFBZTtBQUN4QixPQUFPQSxjQUFhO0FBRXBCLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU9DLHFCQUFvQjs7O0FDVCtOLE9BQU8saUJBQWlCO0FBQ2xSLE9BQU8sa0JBQWtCO0FBRXpCLE9BQU8sY0FBYztBQUVyQixJQUFNLFVBQTRCLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQztBQUloRSxRQUFRLEtBQUssUUFBUTtBQUVyQixJQUFPLHlCQUFROzs7QUNYbVAsT0FBTyxhQUFhO0FBRXRSLElBQU0sa0JBQWtCLFFBQVEsSUFBSTtBQUNwQyxJQUFNLE9BQU8sb0JBQW9CO0FBQ2pDLElBQU0sUUFBUSxvQkFBb0I7QUFDbEMsSUFBTSwyQkFBMkIsUUFBUTs7O0FDRGxDLFNBQVMsYUFBYSxZQUFnQyxDQUFDLEdBQUc7QUFDL0QsUUFBTSxRQUFzQyxDQUFDO0FBQzdDLGFBQVcsQ0FBQyxRQUFRLE1BQU0sS0FBSyxXQUFXO0FBQ3hDLFVBQU0sVUFBVSxjQUFjLEtBQUssTUFBTTtBQUN6QyxVQUFNLE1BQU0sSUFBSTtBQUFBLE1BQ2Q7QUFBQSxNQUNBLGNBQWM7QUFBQSxNQUNkLElBQUk7QUFBQSxNQUNKLFNBQVMsVUFBUSxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksTUFBTSxFQUFFLEdBQUcsRUFBRTtBQUFBO0FBQUEsTUFFMUQsR0FBSSxVQUFVLEVBQUUs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QVE7QUFBQSxNQUNSLHVCQUF1QjtBQUFBLE1BQ3ZCLFdBQVcsQ0FBQztBQUFBLE1BQ1osUUFBUTtBQUFBLE1BQ1IsUUFBUSxTQUFTLFdBQVc7QUFBQSxNQUM1QixlQUFlO0FBQUEsUUFDZCxVQUFVO0FBQUEsVUFDVCxjQUFjO0FBQUEsVUFDZCxlQUFlO0FBQUEsUUFDaEI7QUFBQSxNQUNEO0FBQUEsTUFDQSxlQUFlO0FBQUEsUUFDZCxRQUFRO0FBQUEsVUFDUCxnQkFBZ0Isa0JBQWlCLG9CQUFJLEtBQUssR0FBRSxRQUFRLENBQUM7QUFBQSxVQUNyRCxnQkFBZ0Isa0JBQWlCLG9CQUFJLEtBQUssR0FBRSxRQUFRLENBQUM7QUFBQSxVQUNyRCxnQkFBZ0Isa0JBQWlCLG9CQUFJLEtBQUssR0FBRSxRQUFRLENBQUM7QUFBQSxVQUNyRCxTQUFTO0FBQUEsUUFDVjtBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbInByb2Nlc3MiLCAiVHJhbnNmb3JtUGFnZXMiLCAicHJvY2VzcyIsICJUcmFuc2Zvcm1QYWdlcyJdCn0K
