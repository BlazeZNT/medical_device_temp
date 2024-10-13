"use strict";
const common_vendor = require("../common/vendor.js"), local_zhHans = require("./zh-Hans.js"), local_langEn = require("./langEn.js"), local_zhHant = require("./zh-Hant.js"), utils_storage = require("../utils/storage.js");
const messages = {
  en: local_langEn.e,
  "zh-Hans": local_zhHans.z,
  "zh-Hant": local_zhHant.z
};
const i18n = common_vendor.c({
  legacy: false,
  globalInjection: true,
  locale: utils_storage.g("lang") == "" ? common_vendor.i.getLocale() : utils_storage.g("lang"),
  messages
});
exports.i = i18n;
//# sourceMappingURL=index.js.map
