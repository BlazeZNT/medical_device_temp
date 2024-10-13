"use strict";
const uni_modules_uviewPlus_components_uGap_props = require("./props.js"), uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js"), uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js"), uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js"), common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-gap",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.m, uni_modules_uviewPlus_libs_mixin_mixin.m, uni_modules_uviewPlus_components_uGap_props.p],
  computed: {
    gapStyle() {
      const style = {
        backgroundColor: this.bgColor,
        height: uni_modules_uviewPlus_libs_function_index.a(this.height),
        marginTop: uni_modules_uviewPlus_libs_function_index.a(this.marginTop),
        marginBottom: uni_modules_uviewPlus_libs_function_index.a(this.marginBottom)
      };
      return uni_modules_uviewPlus_libs_function_index.d(style, uni_modules_uviewPlus_libs_function_index.b(this.customStyle));
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.Q($options.gapStyle)
  };
}
const Component = /* @__PURE__ */ common_vendor.H(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-47d20285"]]);
wx.createComponent(Component);
//# sourceMappingURL=u-gap.js.map
