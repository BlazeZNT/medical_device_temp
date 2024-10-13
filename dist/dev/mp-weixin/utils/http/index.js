"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
const common_vendor = require("../../common/vendor.js"), utils_http_faultTolerance = require("./faultTolerance.js"), utils_env = require("../env.js"), mock_index = require("../../mock/index.js"), enums_httpEnum = require("../../enums/httpEnum.js"), utils_auth = require("../auth.js");
const BASE_URL = utils_env.b();
const ContentType = {
  "Content-Type": enums_httpEnum.C.JSON,
  "Accept": "application/json, text/plain, */*"
};
const alovaInstance = common_vendor.y(__spreadProps(__spreadValues({
  baseURL: BASE_URL,
  localCache: null
}, common_vendor.A({
  mockRequest: utils_env.c() ? mock_index.m : void 0
  // APP 平台无法使用mock
})), {
  timeout: 5e3,
  beforeRequest: (method) => __async(exports, null, function* () {
    var _a;
    method.config.headers = common_vendor.z(method.config.headers, ContentType);
    const { config } = method;
    const ignoreAuth = !((_a = config.meta) == null ? void 0 : _a.ignoreAuth);
    const authorization = ignoreAuth ? utils_auth.a() : null;
    if (ignoreAuth && !authorization) {
      throw new Error("[请求错误]：未登录");
    }
    method.config.headers.authorization = utils_auth.a();
  }),
  responded: {
    /**
     * 请求成功的拦截器
     * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
     * @param response
     * @param method
     */
    onSuccess: (response, method) => __async(exports, null, function* () {
      const { config } = method;
      const { requestType } = config;
      const { statusCode, data: rawData, errMsg } = response;
      if (statusCode === 200) {
        if (requestType) {
          return response;
        }
        const { code, message: message2, data } = rawData;
        if (code === enums_httpEnum.R.SUCCESS) {
          return data;
        }
        utils_http_faultTolerance.h(code, message2);
        throw new Error(`请求错误[${code}]：${message2}`);
      }
      utils_http_faultTolerance.a(statusCode, message || "");
      throw new Error(`HTTP请求错误[${statusCode}]：${errMsg}`);
    }),
    /**
     * 请求失败的拦截器，请求错误时将会进入该拦截器。
     */
    onError: (err) => __async(exports, null, function* () {
      throw new Error(`请求失败：${err}`);
    }),
    /**
     * 请求完成的拦截器, 无论请求成功或失败都会进入该拦截器
     */
    onComplete: () => __async(exports, null, function* () {
    })
  }
}));
const request = alovaInstance;
exports.r = request;
//# sourceMappingURL=index.js.map
