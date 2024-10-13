"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "info",
  setup(__props) {
    const save = () => {
      console.log("1");
      common_vendor.i.navigateTo({
        url: "/pages/health/index"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.P({}, {}, {
        a: common_vendor.J(save)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor.H(_sfc_main, [["__scopeId", "data-v-bf9cf9b7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=info.js.map
