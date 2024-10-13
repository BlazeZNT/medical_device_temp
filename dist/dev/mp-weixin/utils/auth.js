"use strict";
const utils_cache_index = require("./cache/index.js"), enums_cacheEnum = require("../enums/cacheEnum.js");
const authenticationScheme = "Bearer";
function getToken() {
  return utils_cache_index.g(enums_cacheEnum.T) || null;
}
function getAuthorization() {
  const token = getToken();
  return token ? `${authenticationScheme} ${token}` : null;
}
function setToken(token) {
  return utils_cache_index.s(enums_cacheEnum.T, token);
}
function isLogin() {
  return !!getToken();
}
exports.a = getAuthorization;
exports.g = getToken;
exports.i = isLogin;
exports.s = setToken;
//# sourceMappingURL=auth.js.map
