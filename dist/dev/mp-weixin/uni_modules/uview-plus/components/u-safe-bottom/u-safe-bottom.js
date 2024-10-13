"use strict";
const uni_modules_uviewPlus_components_uSafeBottom_props = require("./props.js"), uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js"), uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js"), uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js"), common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-safe-bottom",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.m, uni_modules_uviewPlus_libs_mixin_mixin.m, uni_modules_uviewPlus_components_uSafeBottom_props.p],
  data() {
    return {
      safeAreaBottomHeight: 0,
      isNvue: false
    };
  },
  computed: {
    style() {
      const style = {};
      return uni_modules_uviewPlus_libs_function_index.d(style, uni_modules_uviewPlus_libs_function_index.b(this.customStyle));
    }
  },
  mounted() {
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.Q($options.style),
    b: common_vendor.S(!$data.isNvue && "u-safe-area-inset-bottom")
  };
}
const Component = /* @__PURE__ */ common_vendor.H(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3a3efedd"]]);
wx.createComponent(Component);
//# sourceMappingURL=u-safe-bottom.js.map
