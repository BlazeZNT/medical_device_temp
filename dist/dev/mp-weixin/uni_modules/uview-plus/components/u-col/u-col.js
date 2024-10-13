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
const uni_modules_uviewPlus_components_uCol_props = require("./props.js"), uni_modules_uviewPlus_libs_mixin_mpMixin = require("../../libs/mixin/mpMixin.js"), uni_modules_uviewPlus_libs_mixin_mixin = require("../../libs/mixin/mixin.js"), uni_modules_uviewPlus_libs_function_index = require("../../libs/function/index.js"), common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-col",
  mixins: [uni_modules_uviewPlus_libs_mixin_mpMixin.m, uni_modules_uviewPlus_libs_mixin_mixin.m, uni_modules_uviewPlus_components_uCol_props.p],
  data() {
    return {
      width: 0,
      parentData: {
        gutter: 0
      },
      gridNum: 12
    };
  },
  //  微信小程序中 options 选项
  options: {
    virtualHost: true
    // 将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等
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
    colStyle() {
      const style = {
        // 这里写成"padding: 0 10px"的形式是因为nvue的需要
        paddingLeft: uni_modules_uviewPlus_libs_function_index.a(uni_modules_uviewPlus_libs_function_index.g(this.parentData.gutter) / 2),
        paddingRight: uni_modules_uviewPlus_libs_function_index.a(uni_modules_uviewPlus_libs_function_index.g(this.parentData.gutter) / 2),
        alignItems: this.uAlignItem,
        justifyContent: this.uJustify,
        textAlign: this.textAlign,
        // 在非nvue上，使用百分比形式
        flex: `0 0 ${100 / this.gridNum * this.span}%`,
        marginLeft: 100 / 12 * this.offset + "%"
      };
      return uni_modules_uviewPlus_libs_function_index.d(style, uni_modules_uviewPlus_libs_function_index.b(this.customStyle));
    }
  },
  mounted() {
    this.init();
  },
  emits: ["click"],
  methods: {
    init() {
      return __async(this, null, function* () {
        this.updateParentData();
        this.width = yield this.parent.getComponentWidth();
      });
    },
    updateParentData() {
      this.getParentData("u-row");
    },
    clickHandler(e) {
      this.$emit("click");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.S("u-col-" + _ctx.span),
    b: common_vendor.Q($options.colStyle),
    c: common_vendor.J((...args) => $options.clickHandler && $options.clickHandler(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor.H(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3a203208"]]);
wx.createComponent(Component);
//# sourceMappingURL=u-col.js.map
