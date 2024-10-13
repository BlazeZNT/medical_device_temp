"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js"), uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.d({
  props: {
    // input的label提示语
    label: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.d.formItem.label
    },
    // 绑定的值
    prop: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.d.formItem.prop
    },
    // 绑定的规则
    rules: {
      type: Array,
      default: () => uni_modules_uviewPlus_libs_config_props.d.formItem.rules
    },
    // 是否显示表单域的下划线边框
    borderBottom: {
      type: [String, Boolean],
      default: () => uni_modules_uviewPlus_libs_config_props.d.formItem.borderBottom
    },
    // label的位置，left-左边，top-上边
    labelPosition: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.d.formItem.labelPosition
    },
    // label的宽度，单位px
    labelWidth: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.d.formItem.labelWidth
    },
    // 右侧图标
    rightIcon: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.d.formItem.rightIcon
    },
    // 左侧图标
    leftIcon: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.d.formItem.leftIcon
    },
    // 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
    required: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.d.formItem.required
    },
    leftIconStyle: {
      type: [String, Object],
      default: () => uni_modules_uviewPlus_libs_config_props.d.formItem.leftIconStyle
    }
  }
});
exports.p = props;
//# sourceMappingURL=props.js.map
