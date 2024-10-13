"use strict";
const common_vendor = require("../common/vendor.js");
const storagePrefix = "hx_";
const getSaveDataKey = (keyName) => {
  if (keyName) {
    return storagePrefix + keyName;
  }
  return keyName;
};
const getLocalData = (dataKey) => {
  dataKey = getSaveDataKey(dataKey);
  return common_vendor.i.getStorageSync(dataKey);
};
exports.g = getLocalData;
//# sourceMappingURL=storage.js.map
