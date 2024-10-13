"use strict";
const common_vendor = require("../../common/vendor.js"), helper_throttle = require("../../helper/throttle.js");
var define_ROUTES_MAP_default = { "/pages/home/index": { path: "/pages/home/index", aliasPath: "/" }, "/pages/login/pin": { path: "/pages/login/pin" }, "/pages/health/index": { path: "/pages/health/index" }, "/pages/registeration/index": { path: "/pages/registeration/index" }, "/pages/health/detection": { path: "/pages/health/detection" }, "/pages/login/index": { path: "/pages/login/index" }, "/pages/login/consentForm": { path: "/pages/login/consentForm" }, "/pages/login/info": { path: "/pages/login/info" } };
var define_TABBAR_default = [];
const _go = (path, params = {}, options = {
  redirect: false
}) => {
  var _a;
  let page = "";
  let query = "";
  let url = "";
  if (common_vendor.f(path)) {
    if (common_vendor.g(path, "http")) {
      page = `/pages/public/webview`;
      query = `url=${encodeURIComponent(path)}`;
    } else if (common_vendor.g(path, "action:")) {
      handleAction(path);
      return;
    } else {
      [page, query] = path.split("?");
    }
    if (!common_vendor.h(params)) {
      let query2 = paramsToQuery(params);
      if (common_vendor.h(query)) {
        query = query2;
      } else {
        query += "&" + query2;
      }
    }
  }
  if (common_vendor.k(path)) {
    page = path.url;
    if (!common_vendor.l(path.params)) {
      query = paramsToQuery(path.params);
    }
  }
  const nextRoute = define_ROUTES_MAP_default[page];
  console.log(define_ROUTES_MAP_default);
  if (!nextRoute) {
    console.log(`%c跳转路径参数错误<${page || "EMPTY"}>`, "");
    return;
  }
  if (((_a = nextRoute.meta) == null ? void 0 : _a.auth) && !$store("user").isLogin) {
    showAuthModal();
    return;
  }
  url = page;
  if (!common_vendor.h(query)) {
    url += `?${query}`;
  }
  if (define_TABBAR_default.includes(page)) {
    common_vendor.i.switchTab({
      url
    });
    return;
  }
  if (options.redirect) {
    common_vendor.i.redirectTo({
      url
    });
    return;
  }
  common_vendor.i.navigateTo({
    url
  });
};
function go(...args) {
  helper_throttle.t(() => {
    _go(...args);
  });
}
function paramsToQuery(params) {
  if (common_vendor.h(params)) {
    return "";
  }
  let query = [];
  for (let key in params) {
    query.push(key + "=" + params[key]);
  }
  return query.join("&");
}
function back() {
  common_vendor.i.navigateBack();
}
function redirect(path, params = {}) {
  go(path, params, {
    redirect: true
  });
}
function hasHistory() {
  const pages = getCurrentPages();
  if (pages.length > 1) {
    return true;
  }
  return false;
}
function getCurrentRoute(field = "") {
  let currentPage = getCurrentPage();
  currentPage.$page["route"] = currentPage.route;
  currentPage.$page["options"] = currentPage.options;
  if (field !== "") {
    return currentPage.$page[field];
  } else {
    return currentPage.$page;
  }
}
function getCurrentPage() {
  let pages = getCurrentPages();
  return pages[pages.length - 1];
}
function handleAction(path) {
  const action = path.split(":");
  switch (action[1]) {
    case "showShareModal":
      showShareModal();
      break;
  }
}
function error(errCode, errMsg = "") {
  redirect("/pages/public/error", {
    errCode,
    errMsg
  });
}
const $router = {
  go,
  back,
  hasHistory,
  redirect,
  getCurrentPage,
  getCurrentRoute,
  error
};
exports.$ = $router;
//# sourceMappingURL=index.js.map
