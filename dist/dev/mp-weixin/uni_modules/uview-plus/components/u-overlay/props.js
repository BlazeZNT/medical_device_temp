"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js"), uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.d({
  props: {
    // 是否显示遮罩
    show: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.d.overlay.show
    },
    // 层级z-index
    zIndex: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.d.overlay.zIndex
    },
    // 遮罩的过渡时间，单位为ms
    duration: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.d.overlay.duration
    },
    // 不透明度值，当做rgba的第四个参数
    opacity: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.d.overlay.opacity
    }
  }
});
exports.p = props;
//# sourceMappingURL=props.js.map
