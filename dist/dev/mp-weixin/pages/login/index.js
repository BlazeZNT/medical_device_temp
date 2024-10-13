"use strict";
const common_vendor = require("../../common/vendor.js"), slibrary_index = require("../../slibrary/index.js");
if (!Array) {
  const _easycom_up_input2 = common_vendor.K("up-input");
  const _easycom_up_form_item2 = common_vendor.K("up-form-item");
  const _easycom_up_form2 = common_vendor.K("up-form");
  const _easycom_up_button2 = common_vendor.K("up-button");
  (_easycom_up_input2 + _easycom_up_form_item2 + _easycom_up_form2 + _easycom_up_button2)();
}
const _easycom_up_input = () => "../../uni_modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_form_item = () => "../../uni_modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_up_form = () => "../../uni_modules/uview-plus/components/u-form/u-form.js";
const _easycom_up_button = () => "../../uni_modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (FixedLogo + _easycom_up_input + _easycom_up_form_item + _easycom_up_form + _easycom_up_button + CardBox)();
}
const FixedLogo = () => "../../components/Common/FixedLogo.js";
const CardBox = () => "../../components/Common/CardBox.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const form = common_vendor.p({
      mobile: ""
    });
    const loading = common_vendor.p(false);
    const handleTapVerify = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        slibrary_index.s.$router.go("/pages/login/consentForm");
      }, 1500);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.J(($event) => form.value.mobile = $event),
        b: common_vendor.L({
          placeholder: "Mobile Number",
          border: "surround",
          modelValue: form.value.mobile
        }),
        c: common_vendor.L({
          label: "Mobile Number",
          prop: "mobile",
          ["label-width"]: "180"
        }),
        d: common_vendor.O("uFormRef", "45258083-2,45258083-1"),
        e: common_vendor.L({
          model: form.value,
          labelPosition: "top"
        }),
        f: common_vendor.J(handleTapVerify),
        g: common_vendor.L({
          type: "primary",
          size: "small",
          text: "Login",
          disabled: !form.value.mobile,
          loading: loading.value,
          loadingSize: 8
        }),
        h: common_vendor.I(slibrary_index.s).$url.static("/static/login/icon_AddressCard.png"),
        i: common_vendor.I(slibrary_index.s).$url.static("/static/login/icon_AddressCard2.png"),
        j: common_vendor.I(slibrary_index.s).$url.static("/static/login/icon_CreditCard.png"),
        k: common_vendor.L({
          title: "Patient Login",
          tip: "Please enter your mobile number to continuee"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor.H(_sfc_main, [["__scopeId", "data-v-45258083"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=index.js.map
