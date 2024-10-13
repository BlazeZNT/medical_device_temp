"use strict";
const common_vendor = require("../../common/vendor.js"), slibrary_index = require("../../slibrary/index.js");
if (!Math) {
  FixedLogo();
}
const FixedLogo = () => "../../components/Common/FixedLogo.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const handleClickHealthCheckUp = () => {
      slibrary_index.s.$router.go("/pages/login/pin");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.I(slibrary_index.s).$url.static("/static/home/icon_Outpatient.png"),
        b: common_vendor.J(handleClickHealthCheckUp),
        c: common_vendor.I(slibrary_index.s).$url.static("/static/home/icon_ExamMultiple-Choice.png"),
        d: common_vendor.I(slibrary_index.s).$url.static("/static/home/icon_HealthWorkerForm.png"),
        e: common_vendor.I(slibrary_index.s).$url.static("/static/home/icon_MedicalAdvice.png")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor.H(_sfc_main, [["__scopeId", "data-v-2c5296db"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=index.js.map
