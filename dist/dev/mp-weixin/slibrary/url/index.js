"use strict";
const slibrary_config_index = require("../config/index.js");
const _static = (url = "", staticurl = "local") => {
  if (staticurl === "") {
    staticurl = slibrary_config_index.s;
  }
  if (staticurl !== "local") {
    url = _cdn(url, staticurl);
  }
  return url;
};
const $url = {
  static: _static
};
exports.$ = $url;
//# sourceMappingURL=index.js.map
