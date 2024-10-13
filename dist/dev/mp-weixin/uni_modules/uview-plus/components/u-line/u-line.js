"use strict";
const uni_modules_uviewPlus_components_uLine_props = require("./props.js"), uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js"), uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js"), uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js"), common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-line",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.m, uni_modules_uviewPlus_libs_mixin_mixin.m, uni_modules_uviewPlus_components_uLine_props.p],
  computed: {
    lineStyle() {
      const style = {};
      style.margin = this.margin;
      if (this.direction === "row") {
        style.borderBottomWidth = "1px";
        style.borderBottomStyle = this.dashed ? "dashed" : "solid";
        style.width = uni_modules_uviewPlus_libs_function_index.a(this.length);
        if (this.hairline) style.transform = "scaleY(0.5)";
      } else {
        style.borderLeftWidth = "1px";
        style.borderLeftStyle = this.dashed ? "dashed" : "solid";
        style.height = uni_modules_uviewPlus_libs_function_index.a(this.length);
        if (this.hairline) style.transform = "scaleX(0.5)";
      }
      style.borderColor = this.color;
      return uni_modules_uviewPlus_libs_function_index.d(style, uni_modules_uviewPlus_libs_function_index.b(this.customStyle));
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.Q($options.lineStyle)
  };
}
const Component = /* @__PURE__ */ common_vendor.H(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-18143249"]]);
wx.createComponent(Component);
//# sourceMappingURL=u-line.js.map
