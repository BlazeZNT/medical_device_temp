"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "CardBox",
  props: {
    width: {
      type: String,
      default: "300rpx"
    },
    tip: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return common_vendor.P({
        a: props.title
      }, props.title ? {
        b: common_vendor.R(props.title)
      } : {}, {
        c: props.tip
      }, props.tip ? {
        d: common_vendor.R(props.tip)
      } : {}, {
        e: props.width
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor.H(_sfc_main, [["__scopeId", "data-v-437fe14b"]]);
wx.createComponent(Component);
//# sourceMappingURL=CardBox.js.map
