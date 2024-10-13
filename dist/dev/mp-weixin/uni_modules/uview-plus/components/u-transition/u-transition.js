"use strict";
var __defProp = Object.defineProperty;
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
const uni_modules_uviewPlus_components_uTransition_props = require("./props.js"), uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js"), uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js"), uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js"), uni_modules_uviewPlus_components_uTransition_transitionMixin = require("./transitionMixin.js"), common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-transition",
  data() {
    return {
      inited: false,
      // 是否显示/隐藏组件
      viewStyle: {},
      // 组件内部的样式
      status: "",
      // 记录组件动画的状态
      transitionEnded: false,
      // 组件是否结束的标记
      display: false,
      // 组件是否展示
      classes: ""
      // 应用的类名
    };
  },
  emits: ["click", "beforeEnter", "enter", "afterEnter", "beforeLeave", "leave", "afterLeave"],
  computed: {
    mergeStyle() {
      const { viewStyle, customStyle } = this;
      return __spreadValues(__spreadValues({
        transitionDuration: `${this.duration}ms`,
        // display: `${this.display ? '' : 'none'}`,
        transitionTimingFunction: this.timingFunction
      }, uni_modules_uviewPlus_libs_function_index.b(customStyle)), viewStyle);
    }
  },
  // 将mixin挂在到组件中，实际上为一个vue格式对象。
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.m, uni_modules_uviewPlus_libs_mixin_mixin.m, uni_modules_uviewPlus_components_uTransition_transitionMixin.t, uni_modules_uviewPlus_components_uTransition_props.p],
  watch: {
    show: {
      handler(newVal) {
        newVal ? this.vueEnter() : this.vueLeave();
      },
      // 表示同时监听初始化时的props的show的意思
      immediate: true
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.P({
    a: $data.inited
  }, $data.inited ? {
    b: common_vendor.J((...args) => _ctx.clickHandler && _ctx.clickHandler(...args)),
    c: common_vendor.S($data.classes),
    d: common_vendor.Q($options.mergeStyle),
    e: common_vendor.J((...args) => _ctx.noop && _ctx.noop(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor.H(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-69991aca"]]);
wx.createComponent(Component);
//# sourceMappingURL=u-transition.js.map
