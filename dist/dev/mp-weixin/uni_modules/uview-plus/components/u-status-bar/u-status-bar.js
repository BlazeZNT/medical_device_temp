"use strict";
const uni_modules_uviewPlus_components_uStatusBar_props = require("./props.js"), uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js"), uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js"), uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js"), common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-status-bar",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.m, uni_modules_uviewPlus_libs_mixin_mixin.m, uni_modules_uviewPlus_components_uStatusBar_props.p],
  data() {
    return {};
  },
  computed: {
    style() {
      const style = {};
      style.height = uni_modules_uviewPlus_libs_function_index.a(uni_modules_uviewPlus_libs_function_index.k().statusBarHeight, "px");
      style.backgroundColor = this.bgColor;
      return uni_modules_uviewPlus_libs_function_index.d(style, uni_modules_uviewPlus_libs_function_index.b(this.customStyle));
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.Q($options.style)
  };
}
const Component = /* @__PURE__ */ common_vendor.H(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-96630e2e"]]);
wx.createComponent(Component);
//# sourceMappingURL=u-status-bar.js.map
