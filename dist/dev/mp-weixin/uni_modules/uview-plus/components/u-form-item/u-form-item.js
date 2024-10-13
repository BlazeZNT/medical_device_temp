"use strict";
const uni_modules_uviewPlus_components_uFormItem_props = require("./props.js"), uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js"), uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js"), uni_modules_uviewPlus_libs_config_props = require("../../libs/config/props.js"), uni_modules_uviewPlus_libs_config_color = require("../../libs/config/color.js"), uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js"), common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-form-item",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.m, uni_modules_uviewPlus_libs_mixin_mixin.m, uni_modules_uviewPlus_components_uFormItem_props.p],
  data() {
    return {
      // 错误提示语
      message: "",
      parentData: {
        // 提示文本的位置
        labelPosition: "left",
        // 提示文本对齐方式
        labelAlign: "left",
        // 提示文本的样式
        labelStyle: {},
        // 提示文本的宽度
        labelWidth: 45,
        // 错误提示方式
        errorType: "message"
      },
      color: uni_modules_uviewPlus_libs_config_color.c,
      itemRules: []
    };
  },
  // 组件创建完成时，将当前实例保存到u-form中
  computed: {
    propsLine() {
      return uni_modules_uviewPlus_libs_config_props.d.line;
    }
  },
  mounted() {
    this.init();
  },
  emits: ["click"],
  watch: {
    // 监听规则的变化
    rules: {
      immediate: true,
      handler(n) {
        this.setRules(n);
      }
    }
  },
  methods: {
    addStyle: uni_modules_uviewPlus_libs_function_index.b,
    addUnit: uni_modules_uviewPlus_libs_function_index.a,
    init() {
      this.updateParentData();
      if (!this.parent) {
        uni_modules_uviewPlus_libs_function_index.e("u-form-item需要结合u-form组件使用");
      }
    },
    // 手动设置校验的规则，如果规则中有函数的话，微信小程序中会过滤掉，所以只能手动调用设置规则
    setRules(rules) {
      if (rules.length === 0) {
        this.itemRules = [];
        return;
      }
      this.itemRules = rules;
    },
    // 获取父组件的参数
    updateParentData() {
      this.getParentData("u-form");
    },
    // 移除u-form-item的校验结果
    clearValidate() {
      this.message = null;
    },
    // 清空当前的组件的校验结果，并重置为初始值
    resetField() {
      const value = uni_modules_uviewPlus_libs_function_index.c(this.parent.originalModel, this.prop);
      uni_modules_uviewPlus_libs_function_index.h(this.parent.model, this.prop, value);
      this.message = null;
    },
    // 点击组件
    clickHandler() {
      this.$emit("click");
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.K("u-icon");
  const _easycom_u_line2 = common_vendor.K("u-line");
  (_easycom_u_icon2 + _easycom_u_line2)();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
const _easycom_u_line = () => "../u-line/u-line.js";
if (!Math) {
  (_easycom_u_icon + _easycom_u_line)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.P({
    a: _ctx.required || _ctx.leftIcon || _ctx.label
  }, _ctx.required || _ctx.leftIcon || _ctx.label ? common_vendor.P({
    b: _ctx.required
  }, _ctx.required ? {} : {}, {
    c: _ctx.leftIcon
  }, _ctx.leftIcon ? {
    d: common_vendor.L({
      name: _ctx.leftIcon,
      ["custom-style"]: _ctx.leftIconStyle
    })
  } : {}, {
    e: common_vendor.R(_ctx.label),
    f: common_vendor.Q($data.parentData.labelStyle),
    g: common_vendor.Q({
      justifyContent: $data.parentData.labelAlign === "left" ? "flex-start" : $data.parentData.labelAlign === "center" ? "center" : "flex-end"
    }),
    h: $options.addUnit(_ctx.labelWidth || $data.parentData.labelWidth),
    i: $data.parentData.labelPosition === "left" ? 0 : "5px"
  }) : {}, {
    j: _ctx.$slots.right
  }, _ctx.$slots.right ? {} : {}, {
    k: common_vendor.J((...args) => $options.clickHandler && $options.clickHandler(...args)),
    l: common_vendor.Q($options.addStyle(_ctx.customStyle)),
    m: common_vendor.Q({
      flexDirection: (_ctx.labelPosition || $data.parentData.labelPosition) === "left" ? "row" : "column"
    }),
    n: !!$data.message && $data.parentData.errorType === "message"
  }, !!$data.message && $data.parentData.errorType === "message" ? {
    o: common_vendor.R($data.message),
    p: $options.addUnit($data.parentData.labelPosition === "top" ? 0 : _ctx.labelWidth || $data.parentData.labelWidth)
  } : {}, {
    q: _ctx.borderBottom
  }, _ctx.borderBottom ? {
    r: common_vendor.L({
      color: $data.message && $data.parentData.errorType === "border-bottom" ? $data.color.error : $options.propsLine.color,
      customStyle: `margin-top: ${$data.message && $data.parentData.errorType === "message" ? "5px" : 0}`
    })
  } : {}, {
    s: !!$data.message && $data.parentData.errorType === "message" ? 1 : ""
  });
}
const Component = /* @__PURE__ */ common_vendor.H(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-98223e3d"]]);
wx.createComponent(Component);
//# sourceMappingURL=u-form-item.js.map
