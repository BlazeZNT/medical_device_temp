"use strict";
const utils_http_index = require("../../utils/http/index.js");
function getUserInfoApi() {
  return utils_http_index.r.Get(
    "/users"
    /* GET_USER_INFO */
  );
}
exports.g = getUserInfoApi;
//# sourceMappingURL=user.js.map
