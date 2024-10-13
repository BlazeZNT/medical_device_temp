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
const common_vendor = require("../../../../../common/vendor.js"), uni_modules_uviewPlus_libs_luchRequest_helpers_buildURL = require("../helpers/buildURL.js"), uni_modules_uviewPlus_libs_luchRequest_core_buildFullPath = require("../core/buildFullPath.js"), uni_modules_uviewPlus_libs_luchRequest_core_settle = require("../core/settle.js"), uni_modules_uviewPlus_libs_luchRequest_utils = require("../utils.js");
const mergeKeys = (keys, config2) => {
  const config = {};
  keys.forEach((prop) => {
    if (!uni_modules_uviewPlus_libs_luchRequest_utils.i(config2[prop])) {
      config[prop] = config2[prop];
    }
  });
  return config;
};
const adapter = (config) => new Promise((resolve, reject) => {
  const fullPath = uni_modules_uviewPlus_libs_luchRequest_helpers_buildURL.b(uni_modules_uviewPlus_libs_luchRequest_core_buildFullPath.b(config.baseURL, config.url), config.params);
  const _config = {
    url: fullPath,
    header: config.header,
    complete: (response) => {
      config.fullPath = fullPath;
      response.config = config;
      try {
        if (typeof response.data === "string") {
          response.data = JSON.parse(response.data);
        }
      } catch (e) {
      }
      uni_modules_uviewPlus_libs_luchRequest_core_settle.s(resolve, reject, response);
    }
  };
  let requestTask;
  if (config.method === "UPLOAD") {
    delete _config.header["content-type"];
    delete _config.header["Content-Type"];
    const otherConfig = {
      filePath: config.filePath,
      name: config.name
    };
    const optionalKeys = [
      "formData"
    ];
    requestTask = common_vendor.i.uploadFile(__spreadValues(__spreadValues(__spreadValues({}, _config), otherConfig), mergeKeys(optionalKeys, config)));
  } else if (config.method === "DOWNLOAD") {
    requestTask = common_vendor.i.downloadFile(_config);
  } else {
    const optionalKeys = [
      "data",
      "method",
      "timeout",
      "dataType",
      "responseType"
    ];
    requestTask = common_vendor.i.request(__spreadValues(__spreadValues({}, _config), mergeKeys(optionalKeys, config)));
  }
  if (config.getTask) {
    config.getTask(requestTask, config);
  }
});
exports.a = adapter;
//# sourceMappingURL=index.js.map
