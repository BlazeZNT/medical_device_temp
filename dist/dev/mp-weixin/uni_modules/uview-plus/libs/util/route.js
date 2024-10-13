"use strict";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const common_vendor = require("../../../../common/vendor.js"), uni_modules_uviewPlus_libs_function_index = require("../function/index.js");
class Router {
  constructor() {
    this.config = {
      type: "navigateTo",
      url: "",
      delta: 1,
      // navigateBack页面后退时,回退的层数
      params: {},
      // 传递的参数
      animationType: "pop-in",
      // 窗口动画,只在APP有效
      animationDuration: 300,
      // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false
      // 是否需要拦截
    };
    this.route = this.route.bind(this);
  }
  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  addRootPath(url) {
    return url[0] === "/" ? url : `/${url}`;
  }
  // 整合路由参数
  mixinParam(url, params) {
    url = url && this.addRootPath(url);
    let query = "";
    if (/.*\/.*\?.*=.*/.test(url)) {
      query = uni_modules_uviewPlus_libs_function_index.q(params, false);
      return url += `&${query}`;
    }
    query = uni_modules_uviewPlus_libs_function_index.q(params);
    return url += query;
  }
  // 对外的方法名称
  route() {
    return __async(this, arguments, function* (options = {}, params = {}) {
      let mergeConfig = {};
      if (typeof options === "string") {
        mergeConfig.url = this.mixinParam(options, params);
        mergeConfig.type = "navigateTo";
      } else {
        mergeConfig = uni_modules_uviewPlus_libs_function_index.d(this.config, options);
        mergeConfig.url = this.mixinParam(options.url, options.params);
      }
      if (mergeConfig.url === uni_modules_uviewPlus_libs_function_index.p()) return;
      if (params.intercept) {
        this.config.intercept = params.intercept;
      }
      mergeConfig.params = params;
      mergeConfig = uni_modules_uviewPlus_libs_function_index.d(this.config, mergeConfig);
      if (typeof common_vendor.i.$u.routeIntercept === "function") {
        const isNext = yield new Promise((resolve, reject) => {
          common_vendor.i.$u.routeIntercept(mergeConfig, resolve);
        });
        isNext && this.openPage(mergeConfig);
      } else {
        this.openPage(mergeConfig);
      }
    });
  }
  // 执行路由跳转
  openPage(config) {
    const {
      url,
      type,
      delta,
      animationType,
      animationDuration
    } = config;
    if (config.type == "navigateTo" || config.type == "to") {
      common_vendor.i.navigateTo({
        url,
        animationType,
        animationDuration
      });
    }
    if (config.type == "redirectTo" || config.type == "redirect") {
      common_vendor.i.redirectTo({
        url
      });
    }
    if (config.type == "switchTab" || config.type == "tab") {
      common_vendor.i.switchTab({
        url
      });
    }
    if (config.type == "reLaunch" || config.type == "launch") {
      common_vendor.i.reLaunch({
        url
      });
    }
    if (config.type == "navigateBack" || config.type == "back") {
      common_vendor.i.navigateBack({
        delta
      });
    }
  }
}
const route = new Router().route;
exports.r = route;
//# sourceMappingURL=route.js.map
