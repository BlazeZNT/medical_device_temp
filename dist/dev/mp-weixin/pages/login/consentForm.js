"use strict";
const common_vendor = require("../../common/vendor.js"), common_assets = require("../../common/assets.js"), slibrary_index = require("../../slibrary/index.js");
if (!Array) {
  const _easycom_up_button2 = common_vendor.K("up-button");
  _easycom_up_button2();
}
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  _easycom_up_button();
}
const _sfc_main = {
  __name: "consentForm",
  setup(__props) {
    const handleClickGotiRegister = () => {
      slibrary_index.s.$router.go("/pages/registeration/index");
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._,
        b: common_vendor.L({
          type: "primary",
          size: "mini",
          text: "Decline",
          customStyle: {
            width: "120rpx"
          }
        }),
        c: common_vendor.J(handleClickGotiRegister),
        d: common_vendor.L({
          type: "primary",
          size: "mini",
          text: "Accept",
          customStyle: {
            width: "120rpx"
          }
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor.H(_sfc_main, [["__scopeId", "data-v-99c0f95a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=consentForm.js.map
