"use strict";
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const common_vendor = require("../../common/vendor.js"), services_api_user = require("../../services/api/user.js"), services_api_auth = require("../../services/api/auth.js"), utils_auth = require("../../utils/auth.js"), utils_cache_index = require("../../utils/cache/index.js"), enums_cacheEnum = require("../../enums/cacheEnum.js");
const useUserStore = common_vendor.o("UserStore", () => {
  const token = common_vendor.p(null);
  const userInfo = common_vendor.p(null);
  function initUserInfo() {
    if (utils_auth.i()) {
      token.value = utils_auth.g();
      getUserInfo();
    }
  }
  const loggedIn = common_vendor.q(() => !!token.value);
  const { send: sendLogin } = common_vendor.u(services_api_auth.l, { immediate: false });
  function login(params) {
    return __async(this, null, function* () {
      try {
        const res = yield sendLogin(params);
        token.value = res.token;
        utils_auth.s(res.token);
        yield getUserInfo();
      } catch (error) {
        throw error;
      }
    });
  }
  const { send: _getUserInfo } = common_vendor.u(services_api_user.g, { initialData: null, immediate: false });
  function getUserInfo() {
    return __async(this, null, function* () {
      try {
        userInfo.value = yield _getUserInfo();
      } catch (error) {
        throw error;
      }
    });
  }
  function logout() {
    return __async(this, null, function* () {
      try {
        utils_cache_index.r(enums_cacheEnum.T);
        userInfo.value = null;
        token.value = null;
      } catch (err) {
        throw err;
      }
    });
  }
  return {
    userInfo,
    loggedIn,
    login,
    logout,
    getUserInfo,
    initUserInfo
  };
});
exports.u = useUserStore;
//# sourceMappingURL=user.js.map
