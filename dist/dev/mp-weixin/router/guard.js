"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const utils_auth = require("../utils/auth.js");
function createRouterGuard(router) {
  createBeforeEachGuard(router);
  createAfterEachGuard(router);
}
function createBeforeEachGuard(router) {
  router.beforeEach((to, _, next) => {
    var _a;
    const _isLogin = utils_auth.i();
    if (to && ((_a = to == null ? void 0 : to.meta) == null ? void 0 : _a.ignoreAuth)) {
      next();
    } else if (!_isLogin && to && to.name !== "Login") {
      next({ name: "Login", params: __spreadValues({ redirect: to.name }, to.query), navType: "push" });
    } else if (_isLogin && to && to.name === "Login") {
      next({ name: "Home", navType: "replaceAll" });
    } else {
      next();
    }
    next();
  });
}
function createAfterEachGuard(router) {
  router.afterEach((to) => {
    var _a;
    if (to && ((_a = to == null ? void 0 : to.meta) == null ? void 0 : _a.ignoreAuth))
      return;
    const _isLogin = utils_auth.i();
    if (!_isLogin && to && to.name !== "Login") {
      router.push({ name: "Login", params: __spreadValues({}, to.query) });
    } else if (_isLogin && to && to.name === "Login") {
      router.replaceAll({ name: "Home" });
    }
  });
}
exports.c = createRouterGuard;
//# sourceMappingURL=guard.js.map
