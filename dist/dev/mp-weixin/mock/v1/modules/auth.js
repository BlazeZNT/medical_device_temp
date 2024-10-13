"use strict";
const common_vendor = require("../../../common/vendor.js"), mock_utils = require("../../utils.js"), enums_httpEnum = require("../../../enums/httpEnum.js"), utils_character = require("../../../utils/character.js");
function createRandomToken(len = 36 * 6) {
  const token = common_vendor.j(common_vendor.s("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ._-", len), "");
  return `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.${token}`;
}
const authMocks = common_vendor.d({
  // 登录
  "[POST]/api/login": (params) => {
    const { email, password } = params.data;
    if (email === "uni-app@test.com" && (password === "Vue3_Ts_Vite" || password === "123456")) {
      const token = createRandomToken();
      return mock_utils.c({ data: { token } });
    }
    return mock_utils.c({ data: [], code: enums_httpEnum.R.FAIL, message: "邮箱或密码错误" });
  },
  // 获取用户信息
  "[GET]/api/users": () => {
    const generateNicknames = utils_character.g(common_vendor.b(2, 6));
    const svgCode = common_vendor.e(generateNicknames);
    const base64SVG = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      svgCode
    )}`;
    return mock_utils.c({
      data: {
        id: 1,
        nickname: generateNicknames,
        avatar: base64SVG,
        email: "uni-app@test.com"
      }
    });
  }
});
exports.a = authMocks;
//# sourceMappingURL=auth.js.map
