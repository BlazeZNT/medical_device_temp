"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js"), uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.d({
  props: {
    // 键盘弹起时，是否自动上推页面
    adjustPosition: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.d.codeInput.adjustPosition
    },
    // 最大输入长度
    maxlength: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.d.codeInput.maxlength
    },
    // 是否用圆点填充
    dot: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.d.codeInput.dot
    },
    // 显示模式，box-盒子模式，line-底部横线模式
    mode: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.d.codeInput.mode
    },
    // 是否细边框
    hairline: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.d.codeInput.hairline
    },
    // 字符间的距离
    space: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.d.codeInput.space
    },
    // 预置值
    modelValue: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.d.codeInput.value
    },
    // 是否自动获取焦点
    focus: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.d.codeInput.focus
    },
    // 字体是否加粗
    bold: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.d.codeInput.bold
    },
    // 字体颜色
    color: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.d.codeInput.color
    },
    // 字体大小
    fontSize: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.d.codeInput.fontSize
    },
    // 输入框的大小，宽等于高
    size: {
      type: [String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.d.codeInput.size
    },
    // 是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true
    disabledKeyboard: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.d.codeInput.disabledKeyboard
    },
    // 边框和线条颜色
    borderColor: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.d.codeInput.borderColor
    },
    // 是否禁止输入"."符号
    disabledDot: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.d.codeInput.disabledDot
    }
  }
});
exports.p = props;
//# sourceMappingURL=props.js.map
