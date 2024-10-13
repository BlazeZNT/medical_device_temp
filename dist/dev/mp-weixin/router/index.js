"use strict";
const common_vendor = require("../common/vendor.js"), router_guard = require("./guard.js");
var define_ROUTES_default = [{ path: "/pages/home/index", aliasPath: "/" }, { path: "/pages/login/pin" }, { path: "/pages/health/index" }, { path: "/pages/registeration/index" }, { path: "/pages/health/detection" }, { path: "/pages/login/index" }, { path: "/pages/login/consentForm" }, { path: "/pages/login/info" }, { path: "/pages/home/index", aliasPath: "/" }, { path: "/pages/login/pin" }, { path: "/pages/health/index" }, { path: "/pages/registeration/index" }, { path: "/pages/health/detection" }, { path: "/pages/login/index" }, { path: "/pages/login/consentForm" }, { path: "/pages/login/info" }];
const router = common_vendor._({
  routes: [...define_ROUTES_default]
  // 路由表信息
});
function setupRouter(app) {
  router_guard.c(router);
  app.use(router);
}
exports.s = setupRouter;
//# sourceMappingURL=index.js.map
