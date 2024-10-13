"use strict";
const utils_http_index = require("../../utils/http/index.js");
const LOGIN = "/login";
function login(params) {
  return utils_http_index.r.Post(LOGIN, params, {
    meta: {
      ignoreAuth: true
    }
  });
}
exports.l = login;
//# sourceMappingURL=auth.js.map
