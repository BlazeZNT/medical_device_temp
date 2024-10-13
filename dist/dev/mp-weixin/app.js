"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js"), stores_modules_user = require("./stores/modules/user.js"), router_index = require("./router/index.js"), stores_index = require("./stores/index.js"), local_index = require("./local/index.js"), uni_modules_uviewPlus_index = require("./uni_modules/uview-plus/index.js");
if (!Math) {
  "./pages/home/index.js";
  "./pages/login/pin.js";
  "./pages/health/index.js";
  "./pages/registeration/index.js";
  "./pages/health/detection.js";
  "./pages/login/index.js";
  "./pages/login/consentForm.js";
  "./pages/login/info.js";
}
const _sfc_main = /* @__PURE__ */ common_vendor.B({
  __name: "App",
  setup(__props) {
    common_vendor.C(() => {
      plus.navigator.setFullscreen(true);
    });
    common_vendor.D(() => {
      const userStore = stores_modules_user.u();
      userStore.initUserInfo();
      console.log("App Show");
    });
    common_vendor.F(() => {
      console.log("App Hide");
    });
    return () => {
    };
  }
});
function createApp() {
  const app = common_vendor.G(_sfc_main);
  stores_index.s(app);
  router_index.s(app);
  app.use(local_index.i);
  uni_modules_uviewPlus_index.s({
    config: {
      // 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
      unit: "px"
    }
  });
  app.use(uni_modules_uviewPlus_index.u);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=app.js.map
