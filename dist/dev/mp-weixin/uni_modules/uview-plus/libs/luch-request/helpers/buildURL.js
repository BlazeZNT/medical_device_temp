"use strict";
const uni_modules_uviewPlus_libs_luchRequest_utils = require("../utils.js");
function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url, params) {
  if (!params) {
    return url;
  }
  let serializedParams;
  if (uni_modules_uviewPlus_libs_luchRequest_utils.b(params)) {
    serializedParams = params.toString();
  } else {
    const parts = [];
    uni_modules_uviewPlus_libs_luchRequest_utils.f(params, (val, key) => {
      if (val === null || typeof val === "undefined") {
        return;
      }
      if (uni_modules_uviewPlus_libs_luchRequest_utils.c(val)) {
        key = `${key}[]`;
      } else {
        val = [val];
      }
      uni_modules_uviewPlus_libs_luchRequest_utils.f(val, (v) => {
        if (uni_modules_uviewPlus_libs_luchRequest_utils.e(v)) {
          v = v.toISOString();
        } else if (uni_modules_uviewPlus_libs_luchRequest_utils.g(v)) {
          v = JSON.stringify(v);
        }
        parts.push(`${encode(key)}=${encode(v)}`);
      });
    });
    serializedParams = parts.join("&");
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
exports.b = buildURL;
//# sourceMappingURL=buildURL.js.map
