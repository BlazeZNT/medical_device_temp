"use strict";
var __defProp = Object.defineProperty;
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
const uni_modules_uviewPlus_libs_luchRequest_utils = require("../utils.js");
const mergeKeys = (keys, globalsConfig, config2) => {
  const config = {};
  keys.forEach((prop) => {
    if (!uni_modules_uviewPlus_libs_luchRequest_utils.i(config2[prop])) {
      config[prop] = config2[prop];
    } else if (!uni_modules_uviewPlus_libs_luchRequest_utils.i(globalsConfig[prop])) {
      config[prop] = globalsConfig[prop];
    }
  });
  return config;
};
const mergeConfig = (globalsConfig, config2 = {}) => {
  const method = config2.method || globalsConfig.method || "GET";
  let config = {
    baseURL: globalsConfig.baseURL || "",
    method,
    url: config2.url || "",
    params: config2.params || {},
    custom: __spreadValues(__spreadValues({}, globalsConfig.custom || {}), config2.custom || {}),
    header: uni_modules_uviewPlus_libs_luchRequest_utils.d(globalsConfig.header || {}, config2.header || {})
  };
  const defaultToConfig2Keys = ["getTask", "validateStatus"];
  config = __spreadValues(__spreadValues({}, config), mergeKeys(defaultToConfig2Keys, globalsConfig, config2));
  if (method === "DOWNLOAD") ;
  else if (method === "UPLOAD") {
    delete config.header["content-type"];
    delete config.header["Content-Type"];
    const uploadKeys = [
      "filePath",
      "name",
      "formData"
    ];
    uploadKeys.forEach((prop) => {
      if (!uni_modules_uviewPlus_libs_luchRequest_utils.i(config2[prop])) {
        config[prop] = config2[prop];
      }
    });
  } else {
    const defaultsKeys = [
      "data",
      "timeout",
      "dataType",
      "responseType"
    ];
    config = __spreadValues(__spreadValues({}, config), mergeKeys(defaultsKeys, globalsConfig, config2));
  }
  return config;
};
exports.m = mergeConfig;
//# sourceMappingURL=mergeConfig.js.map
