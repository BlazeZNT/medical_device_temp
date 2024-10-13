"use strict";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const uni_modules_uviewPlus_components_uRow_props = require("./props.js"), uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js"), uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js"), uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js"), common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-row",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.m, uni_modules_uviewPlus_libs_mixin_mixin.m, uni_modules_uviewPlus_components_uRow_props.p],
  data() {
    return {};
  },
  computed: {
    uJustify() {
      if (this.justify == "end" || this.justify == "start") return "flex-" + this.justify;
      else if (this.justify == "around" || this.justify == "between") return "space-" + this.justify;
      else return this.justify;
    },
    uAlignItem() {
      if (this.align == "top") return "flex-start";
      if (this.align == "bottom") return "flex-end";
      else return this.align;
    },
    rowStyle() {
      const style = {
        alignItems: this.uAlignItem,
        justifyContent: this.uJustify
      };
      if (this.gutter) {
        style.marginLeft = uni_modules_uviewPlus_libs_function_index.a(-Number(this.gutter) / 2);
        style.marginRight = uni_modules_uviewPlus_libs_function_index.a(-Number(this.gutter) / 2);
      }
      return uni_modules_uviewPlus_libs_function_index.d(style, uni_modules_uviewPlus_libs_function_index.b(this.customStyle));
    }
  },
  emits: ["click"],
  methods: {
    clickHandler(e) {
      this.$emit("click");
    },
    getComponentWidth() {
      return __async(this, null, function* () {
        yield uni_modules_uviewPlus_libs_function_index.s();
        return new Promise((resolve) => {
          this.$uGetRect(".u-row").then((res) => {
            resolve(res.width);
          });
        });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.Q($options.rowStyle),
    b: common_vendor.J((...args) => $options.clickHandler && $options.clickHandler(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor.H(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-351013df"]]);
wx.createComponent(Component);
//# sourceMappingURL=u-row.js.map
