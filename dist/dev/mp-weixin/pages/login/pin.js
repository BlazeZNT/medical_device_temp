"use strict";
const common_vendor = require("../../common/vendor.js"), slibrary_index = require("../../slibrary/index.js");
if (!Array) {
  const _easycom_up_code_input2 = common_vendor.K("up-code-input");
  const _easycom_up_button2 = common_vendor.K("up-button");
  (_easycom_up_code_input2 + _easycom_up_button2)();
}
const _easycom_up_code_input = () => "../../uni_modules/uview-plus/components/u-code-input/u-code-input.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (FixedLogo + _easycom_up_code_input + _easycom_up_button + CardBox)();
}
const FixedLogo = () => "../../components/Common/FixedLogo.js";
const CardBox = () => "../../components/Common/CardBox.js";
const _sfc_main = {
  __name: "pin",
  setup(__props) {
    const code = common_vendor.p("");
    const loading = common_vendor.p(false);
    const handleTapVerify = () => {
      if (!code.value) {
        common_vendor.i.showToast({
          icon: "none",
          title: "请输入验证码"
        });
        return;
      }
      if (code.value.length < 6) {
        common_vendor.i.showToast({
          icon: "none",
          title: "请输入6位验证码"
        });
        return;
      }
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        slibrary_index.s.$router.go("/pages/login/index");
      }, 1500);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.J(($event) => code.value = $event),
        b: common_vendor.L({
          maxlength: 6,
          modelValue: code.value
        }),
        c: common_vendor.J(handleTapVerify),
        d: common_vendor.L({
          type: "primary",
          size: "small",
          text: "Verify",
          disabled: !code.value,
          loading: loading.value
        }),
        e: common_vendor.L({
          title: "M-Pin Verification",
          tip: "Please type in your 6 digit M-Pin tp continue"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor.H(_sfc_main, [["__scopeId", "data-v-ae813ffe"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=pin.js.map
