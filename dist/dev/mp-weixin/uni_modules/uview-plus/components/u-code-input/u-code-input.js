"use strict";
const uni_modules_uviewPlus_components_uCodeInput_props = require("./props.js"), uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js"), uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js"), uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js"), common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-code-input",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.m, uni_modules_uviewPlus_libs_mixin_mixin.m, uni_modules_uviewPlus_components_uCodeInput_props.p],
  data() {
    return {
      inputValue: "",
      isFocus: this.focus,
      timer: null,
      opacity: 1
    };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(val) {
        this.inputValue = String(val).substring(0, this.maxlength);
      }
    },
    isFocus: {
      handler(val) {
      }
    }
  },
  created() {
  },
  beforeUnmount() {
  },
  computed: {
    // 根据长度，循环输入框的个数，因为头条小程序数值不能用于v-for
    codeLength() {
      return new Array(Number(this.maxlength));
    },
    // 循环item的样式
    itemStyle() {
      return (index) => {
        const style = {
          width: uni_modules_uviewPlus_libs_function_index.a(this.size),
          height: uni_modules_uviewPlus_libs_function_index.a(this.size)
        };
        if (this.mode === "box") {
          style.border = `${this.hairline ? 0.5 : 1}px solid ${this.borderColor}`;
          if (uni_modules_uviewPlus_libs_function_index.g(this.space) === 0) {
            if (index === 0) {
              style.borderTopLeftRadius = "3px";
              style.borderBottomLeftRadius = "3px";
            }
            if (index === this.codeLength.length - 1) {
              style.borderTopRightRadius = "3px";
              style.borderBottomRightRadius = "3px";
            }
            if (index !== this.codeLength.length - 1) {
              style.borderRight = "none";
            }
          }
        }
        if (index !== this.codeLength.length - 1) {
          style.marginRight = uni_modules_uviewPlus_libs_function_index.a(this.space);
        } else {
          style.marginRight = 0;
        }
        return style;
      };
    },
    // 将输入的值，转为数组，给item历遍时，根据当前的索引显示数组的元素
    codeArray() {
      return String(this.inputValue).split("");
    },
    // 下划线模式下，横线的样式
    lineStyle() {
      const style = {};
      style.height = this.hairline ? "2px" : "4px";
      style.width = uni_modules_uviewPlus_libs_function_index.a(this.size);
      style.backgroundColor = this.borderColor;
      return style;
    }
  },
  emits: ["change", "finish", "update:modelValue"],
  methods: {
    addUnit: uni_modules_uviewPlus_libs_function_index.a,
    // 监听输入框的值发生变化
    inputHandler(e) {
      const value = e.detail.value;
      this.inputValue = value;
      if (this.disabledDot) {
        this.$nextTick(() => {
          this.inputValue = value.replace(".", "");
        });
      }
      this.$emit("change", value);
      this.$emit("update:modelValue", value);
      if (String(value).length >= Number(this.maxlength)) {
        this.$emit("finish", value);
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.M($options.codeLength, (item, index, i0) => {
      return common_vendor.P({
        a: _ctx.dot && $options.codeArray.length > index
      }, _ctx.dot && $options.codeArray.length > index ? {} : {
        b: common_vendor.R($options.codeArray[index]),
        c: $options.addUnit(_ctx.fontSize),
        d: _ctx.bold ? "bold" : "normal",
        e: _ctx.color
      }, _ctx.mode === "line" ? {
        f: common_vendor.Q($options.lineStyle)
      } : {}, {
        g: $data.isFocus && $options.codeArray.length === index
      }, $data.isFocus && $options.codeArray.length === index ? {
        h: _ctx.color
      } : {}, {
        i: common_vendor.Q($options.itemStyle(index)),
        j: index
      });
    }),
    b: _ctx.mode === "line",
    c: _ctx.disabledKeyboard,
    d: _ctx.focus,
    e: $data.inputValue,
    f: _ctx.maxlength,
    g: _ctx.adjustPosition,
    h: common_vendor.J((...args) => $options.inputHandler && $options.inputHandler(...args)),
    i: $options.addUnit(_ctx.size),
    j: common_vendor.J(($event) => $data.isFocus = true),
    k: common_vendor.J(($event) => $data.isFocus = false)
  };
}
const Component = /* @__PURE__ */ common_vendor.H(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9abf46a7"]]);
wx.createComponent(Component);
//# sourceMappingURL=u-code-input.js.map
