"use strict";
const uni_modules_uviewPlus_libs_vue = require("../../libs/vue.js"), uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js");
const props = uni_modules_uviewPlus_libs_vue.d({
  props: {
    // 操作菜单是否展示 （默认false）
    show: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.d.actionSheet.show
    },
    // 标题
    title: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.d.actionSheet.title
    },
    // 选项上方的描述信息
    description: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.d.actionSheet.description
    },
    // 数据
    actions: {
      type: Array,
      default: () => uni_modules_uviewPlus_libs_config_props.d.actionSheet.actions
    },
    // 取消按钮的文字，不为空时显示按钮
    cancelText: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.d.actionSheet.cancelText
    },
    // 点击某个菜单项时是否关闭弹窗
    closeOnClickAction: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.d.actionSheet.closeOnClickAction
    },
    // 处理底部安全区（默认true）
    safeAreaInsetBottom: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.d.actionSheet.safeAreaInsetBottom
    },
    // 小程序的打开方式
    openType: {
      type: String,
      default: () => uni_modules_uviewPlus_libs_config_props.d.actionSheet.openType
    },
    // 点击遮罩是否允许关闭 (默认true)
    closeOnClickOverlay: {
      type: Boolean,
      default: () => uni_modules_uviewPlus_libs_config_props.d.actionSheet.closeOnClickOverlay
    },
    // 圆角值
    round: {
      type: [Boolean, String, Number],
      default: () => uni_modules_uviewPlus_libs_config_props.d.actionSheet.round
    },
    // 选项区域最大高度
    wrapMaxHeight: {
      type: [String],
      default: () => uni_modules_uviewPlus_libs_config_props.d.actionSheet.wrapMaxHeight
    }
  }
});
exports.p = props;
//# sourceMappingURL=props.js.map
