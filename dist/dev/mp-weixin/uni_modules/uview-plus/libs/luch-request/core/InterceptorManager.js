"use strict";
require("../../../../../common/vendor.js");
function InterceptorManager() {
  this.handlers = [];
}
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled,
    rejected
  });
  return this.handlers.length - 1;
};
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
InterceptorManager.prototype.forEach = function forEach(fn) {
  this.handlers.forEach((h) => {
    if (h !== null) {
      fn(h);
    }
  });
};
exports.I = InterceptorManager;
//# sourceMappingURL=InterceptorManager.js.map
