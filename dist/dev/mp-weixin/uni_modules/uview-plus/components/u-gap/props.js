"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js"), uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.d({
  props: {
    // 背景颜色（默认transparent）
    bgColor: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.d.gap.bgColor
    },
    // 分割槽高度，单位px（默认30）
    height: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.d.gap.height
    },
    // 与上一个组件的距离
    marginTop: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.d.gap.marginTop
    },
    // 与下一个组件的距离
    marginBottom: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.d.gap.marginBottom
    }
  }
});
exports.p = props;
//# sourceMappingURL=props.js.map
