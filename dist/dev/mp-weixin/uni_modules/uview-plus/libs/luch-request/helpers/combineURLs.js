"use strict";
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? `${baseURL.replace(/\/+$/, "")}/${relativeURL.replace(/^\/+/, "")}` : baseURL;
}
exports.c = combineURLs;
//# sourceMappingURL=combineURLs.js.map
