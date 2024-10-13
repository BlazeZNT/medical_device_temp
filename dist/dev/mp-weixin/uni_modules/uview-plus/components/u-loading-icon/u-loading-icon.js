"use strict";
const uni_modules_uviewPlus_components_uLoadingIcon_props = require("./props.js"), uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js"), uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js"), uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js"), uni_modules_uviewPlus_libs_function_colorGradient = require("../../libs/function/colorGradient.js"), common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-loading-icon",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.m, uni_modules_uviewPlus_libs_mixin_mixin.m, uni_modules_uviewPlus_components_uLoadingIcon_props.p],
  data() {
    return {
      // Array.form可以通过一个伪数组对象创建指定长度的数组
      // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from
      array12: Array.from({
        length: 12
      }),
      // 这里需要设置默认值为360，否则在安卓nvue上，会延迟一个duration周期后才执行
      // 在iOS nvue上，则会一开始默认执行两个周期的动画
      aniAngel: 360,
      // 动画旋转角度
      webviewHide: false,
      // 监听webview的状态，如果隐藏了页面，则停止动画，以免性能消耗
      loading: false
      // 是否运行中，针对nvue使用
    };
  },
  computed: {
    // 当为circle类型时，给其另外三边设置一个更轻一些的颜色
    // 之所以需要这么做的原因是，比如父组件传了color为红色，那么需要另外的三个边为浅红色
    // 而不能是固定的某一个其他颜色(因为这个固定的颜色可能浅蓝，导致效果没有那么细腻良好)
    otherBorderColor() {
      const lightColor = uni_modules_uviewPlus_libs_function_colorGradient.a(this.color, "#ffffff", 100)[80];
      if (this.mode === "circle") {
        return this.inactiveColor ? this.inactiveColor : lightColor;
      } else {
        return "transparent";
      }
    }
  },
  watch: {
    show(n) {
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    addUnit: uni_modules_uviewPlus_libs_function_index.a,
    addStyle: uni_modules_uviewPlus_libs_function_index.b,
    init() {
      setTimeout(() => {
      }, 20);
    },
    // 监听webview的显示与隐藏
    addEventListenerToWebview() {
      const pages = getCurrentPages();
      const page = pages[pages.length - 1];
      const currentWebview = page.$getAppWebview();
      currentWebview.addEventListener("hide", () => {
        this.webviewHide = true;
      });
      currentWebview.addEventListener("show", () => {
        this.webviewHide = false;
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.P({
    a: _ctx.show
  }, _ctx.show ? common_vendor.P({
    b: !$data.webviewHide
  }, !$data.webviewHide ? common_vendor.P({
    c: _ctx.mode === "spinner"
  }, _ctx.mode === "spinner" ? {
    d: common_vendor.M($data.array12, (item, index, i0) => {
      return {
        a: index
      };
    })
  } : {}, {
    e: common_vendor.S(`u-loading-icon__spinner--${_ctx.mode}`),
    f: _ctx.color,
    g: $options.addUnit(_ctx.size),
    h: $options.addUnit(_ctx.size),
    i: _ctx.color,
    j: $options.otherBorderColor,
    k: $options.otherBorderColor,
    l: $options.otherBorderColor,
    m: `${_ctx.duration}ms`,
    n: _ctx.mode === "semicircle" || _ctx.mode === "circle" ? _ctx.timingFunction : ""
  }) : {}, {
    o: _ctx.text
  }, _ctx.text ? {
    p: common_vendor.R(_ctx.text),
    q: $options.addUnit(_ctx.textSize),
    r: _ctx.textColor
  } : {}, {
    s: common_vendor.Q($options.addStyle(_ctx.customStyle)),
    t: common_vendor.S(_ctx.vertical && "u-loading-icon--vertical")
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor.H(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bfe4499f"]]);
wx.createComponent(Component);
//# sourceMappingURL=u-loading-icon.js.map
