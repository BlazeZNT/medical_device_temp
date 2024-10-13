"use strict";
const uni_modules_uviewPlus_libs_luchRequest_helpers_isAbsoluteURL = require("../helpers/isAbsoluteURL.js"), uni_modules_uviewPlus_libs_luchRequest_helpers_combineURLs = require("../helpers/combineURLs.js");
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !uni_modules_uviewPlus_libs_luchRequest_helpers_isAbsoluteURL.i(requestedURL)) {
    return uni_modules_uviewPlus_libs_luchRequest_helpers_combineURLs.c(baseURL, requestedURL);
  }
  return requestedURL;
}
exports.b = buildFullPath;
//# sourceMappingURL=buildFullPath.js.map
