"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const common_vendor = require("../../common/vendor.js"), uni_modules_uviewPlus_libs_mixin_mixin = require("./libs/mixin/mixin.js"), uni_modules_uviewPlus_libs_mixin_mpMixin = require("./libs/mixin/mpMixin.js"), uni_modules_uviewPlus_libs_luchRequest_core_Request = require("./libs/luch-request/core/Request.js"), uni_modules_uviewPlus_libs_util_route = require("./libs/util/route.js"), uni_modules_uviewPlus_libs_function_colorGradient = require("./libs/function/colorGradient.js"), uni_modules_uviewPlus_libs_function_test = require("./libs/function/test.js"), uni_modules_uviewPlus_libs_function_debounce = require("./libs/function/debounce.js"), uni_modules_uviewPlus_libs_function_throttle = require("./libs/function/throttle.js"), uni_modules_uviewPlus_libs_function_index = require("./libs/function/index.js"), uni_modules_uviewPlus_libs_config_config = require("./libs/config/config.js"), uni_modules_uviewPlus_libs_config_props = require("./libs/config/props.js"), uni_modules_uviewPlus_libs_config_zIndex = require("./libs/config/zIndex.js"), uni_modules_uviewPlus_libs_config_color = require("./libs/config/color.js"), uni_modules_uviewPlus_libs_function_platform = require("./libs/function/platform.js");
const http = new uni_modules_uviewPlus_libs_luchRequest_core_Request.R();
let themeType = ["primary", "success", "error", "warning", "info"];
function setConfig(configs) {
  uni_modules_uviewPlus_libs_function_index.i.shallowMerge(uni_modules_uviewPlus_libs_config_config.c, configs.config || {});
  uni_modules_uviewPlus_libs_function_index.i.shallowMerge(uni_modules_uviewPlus_libs_config_props.d, configs.props || {});
  uni_modules_uviewPlus_libs_function_index.i.shallowMerge(uni_modules_uviewPlus_libs_config_color.c, configs.color || {});
  uni_modules_uviewPlus_libs_function_index.i.shallowMerge(uni_modules_uviewPlus_libs_config_zIndex.z, configs.zIndex || {});
}
uni_modules_uviewPlus_libs_function_index.i.setConfig = setConfig;
const $u = __spreadProps(__spreadValues({
  route: uni_modules_uviewPlus_libs_util_route.r,
  date: uni_modules_uviewPlus_libs_function_index.i.timeFormat,
  // 另名date
  colorGradient: uni_modules_uviewPlus_libs_function_colorGradient.c.colorGradient,
  hexToRgb: uni_modules_uviewPlus_libs_function_colorGradient.c.hexToRgb,
  rgbToHex: uni_modules_uviewPlus_libs_function_colorGradient.c.rgbToHex,
  colorToRgba: uni_modules_uviewPlus_libs_function_colorGradient.c.colorToRgba,
  test: uni_modules_uviewPlus_libs_function_test.t,
  type: themeType,
  http,
  config: uni_modules_uviewPlus_libs_config_config.c,
  // uview-plus配置信息相关，比如版本号
  zIndex: uni_modules_uviewPlus_libs_config_zIndex.z,
  debounce: uni_modules_uviewPlus_libs_function_debounce.d,
  throttle: uni_modules_uviewPlus_libs_function_throttle.t,
  mixin: uni_modules_uviewPlus_libs_mixin_mixin.m,
  mpMixin: uni_modules_uviewPlus_libs_mixin_mpMixin.m,
  props: uni_modules_uviewPlus_libs_config_props.d
}, uni_modules_uviewPlus_libs_function_index.i), {
  color: uni_modules_uviewPlus_libs_config_color.c,
  platform: uni_modules_uviewPlus_libs_function_platform.p
});
const install = (Vue) => {
  common_vendor.i.$u = $u;
  Vue.config.globalProperties.$u = $u;
  Vue.mixin(uni_modules_uviewPlus_libs_mixin_mixin.m);
};
const uviewPlus = {
  install
};
exports.s = setConfig;
exports.u = uviewPlus;
//# sourceMappingURL=index.js.map
