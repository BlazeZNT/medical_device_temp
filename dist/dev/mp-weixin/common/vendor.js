"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve2, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e2) {
        reject(e2);
      }
    };
    var step = (x) => x.done ? resolve2(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key2, val] of props) {
    target[key2] = val;
  }
  return target;
};
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function makeMap(str, expectsLowerCase) {
  const set2 = new Set(str.split(","));
  return (val) => set2.has(val);
}
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const isOn = (key2) => key2.charCodeAt(0) === 111 && key2.charCodeAt(1) === 110 && // uppercase letter
(key2.charCodeAt(2) > 122 || key2.charCodeAt(2) < 97);
const isModelListener = (key2) => key2.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i2 = arr.indexOf(el);
  if (i2 > -1) {
    arr.splice(i2, 1);
  }
};
const hasOwnProperty$b = Object.prototype.hasOwnProperty;
const hasOwn$2 = (val, key2) => hasOwnProperty$b.call(val, key2);
const isArray$3 = Array.isArray;
const isMap = (val) => toTypeString$1(val) === "[object Map]";
const isSet = (val) => toTypeString$1(val) === "[object Set]";
const isFunction$2 = (val) => typeof val === "function";
const isString$3 = (val) => typeof val === "string";
const isSymbol$1 = (val) => typeof val === "symbol";
const isObject$3 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject$3(val) || isFunction$2(val)) && isFunction$2(val.then) && isFunction$2(val.catch);
};
const objectToString$2 = Object.prototype.toString;
const toTypeString$1 = (value) => objectToString$2.call(value);
const toRawType = (value) => {
  return toTypeString$1(value).slice(8, -1);
};
const isPlainObject$3 = (val) => toTypeString$1(val) === "[object Object]";
const isIntegerKey = (key2) => isString$3(key2) && key2 !== "NaN" && key2[0] !== "-" && "" + parseInt(key2, 10) === key2;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
const cacheStringFunction = (fn) => {
  const cache2 = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache2[str];
    return hit || (cache2[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction((str) => {
  const s2 = str ? `on${capitalize(str)}` : ``;
  return s2;
});
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i2 = 0; i2 < fns.length; i2++) {
    fns[i2](arg);
  }
};
const def = (obj, key2, value) => {
  Object.defineProperty(obj, key2, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
let _globalThis$1;
const getGlobalThis$1 = () => {
  return _globalThis$1 || (_globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray$3(value)) {
    const res = {};
    for (let i2 = 0; i2 < value.length; i2++) {
      const item = value[i2];
      const normalized = isString$3(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key2 in normalized) {
          res[key2] = normalized[key2];
        }
      }
    }
    return res;
  } else if (isString$3(value) || isObject$3(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$3(value)) {
    res = value;
  } else if (isArray$3(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      const normalized = normalizeClass(value[i2]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$3(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString$1 = (val) => {
  return isString$3(val) ? val : val == null ? "" : isArray$3(val) || isObject$3(val) && (val.toString === objectToString$2 || !isFunction$2(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key2, val2], i2) => {
          entries[stringifySymbol(key2, i2) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v2) => stringifySymbol(v2))
    };
  } else if (isSymbol$1(val)) {
    return stringifySymbol(val);
  } else if (isObject$3(val) && !isArray$3(val) && !isPlainObject$3(val)) {
    return String(val);
  }
  return val;
};
const stringifySymbol = (v2, i2 = "") => {
  var _a;
  return isSymbol$1(v2) ? `Symbol(${(_a = v2.description) != null ? _a : i2})` : v2;
};
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_EXIT = "onExit";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i2 = 0; i2 < fns.length; i2++) {
    ret = fns[i2](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString$3(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key2 = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key2];
  }
  return getValueByDataPath(obj[key2], parts.slice(1).join("."));
}
function sortObject(obj) {
  let sortObj = {};
  if (isPlainObject$3(obj)) {
    Object.keys(obj).sort().forEach((key2) => {
      const _key = key2;
      sortObj[_key] = obj[_key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map((key2) => {
    let val = obj[key2];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject$3(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key2) + "=" + encodeStr(val);
  }).filter((x) => x.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_EXIT,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
function isUniLifecycleHook(name, value, checkType = true) {
  if (checkType && !isFunction$2(value)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once((app, createErrorHandler2) => {
  if (isFunction$2(app._component.onError)) {
    return createErrorHandler2(app);
  }
});
const E = function() {
};
E.prototype = {
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx
    });
    return this;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i2 = 0;
    var len2 = evtArr.length;
    for (i2; i2 < len2; i2++) {
      evtArr[i2].fn.apply(evtArr[i2].ctx, data);
    }
    return this;
  },
  off: function(name, callback) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i2 = evts.length - 1; i2 >= 0; i2--) {
        if (evts[i2].fn === callback || evts[i2].fn._ === callback) {
          evts.splice(i2, 1);
          break;
        }
      }
      liveEvents = evts;
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1 = E;
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith$1(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  const lang = startsWith$1(locale, locales);
  if (lang) {
    return lang;
  }
}
function getBaseSystemInfo() {
  return wx.getSystemInfoSync();
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key2 in protocol) {
    const errMsg = validateProp$1(key2, data[key2], protocol[key2], !hasOwn$2(data, key2));
    if (isString$3(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray$3(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len2 = protocol.length;
  const argsLen = args.length;
  for (let i2 = 0; i2 < len2; i2++) {
    const opts = protocol[i2];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i2) {
      data[opts.name] = args[i2];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject$3(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray$3(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const { valid, expectedType } = assertType$1(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$3(value);
  } else if (expectedType === "Array") {
    valid = isArray$3(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$2(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$2(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction$2(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject$3(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction$2(success);
  const hasFail = isFunction$2(fail);
  const hasComplete = isFunction$2(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg(res.errMsg, name);
    isFunction$2(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction$2(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue$2(hooks, data, params) {
  let promise = false;
  for (let i2 = 0; i2 < hooks.length; i2++) {
    const hook = hooks[i2];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray$3(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue$2(hooks, res, options).then((res2) => {
        return isFunction$2(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray$3(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray$3(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray$3(interceptor.invoke)) {
      const res = queue$2(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject$3(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction$2(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, fn, extend(args, { success: resolve2, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  args[0];
  {
    return;
  }
}
function invokeSuccess(id, name, res) {
  const result = {
    errMsg: name + ":ok"
  };
  return invokeCallback(id, extend(res || {}, result));
}
function invokeFail(id, name, errMsg, errRes = {}) {
  const apiErrMsg = name + ":fail" + (errMsg ? " " + errMsg : "");
  delete errRes.errCode;
  let res = extend({ errMsg: apiErrMsg }, errRes);
  return invokeCallback(id, res);
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  const errMsg = formatApiArgs(args);
  if (errMsg) {
    return errMsg;
  }
}
function parseErrMsg(errMsg) {
  if (!errMsg || isString$3(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    console.error(errMsg.message + "\n" + errMsg.stack);
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, parseErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number2, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number2 = Number(number2);
  if (number2 === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number2 / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number2 < 0 ? -result : result;
}, Upx2pxProtocol);
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction$2(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray$3(hooks) && isFunction$2(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray$3(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i2 = 0; i2 < hooks.length; i2++) {
    if (res.indexOf(hooks[i2]) === -1) {
      res.push(hooks[i2]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString$3(method) && isPlainObject$3(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject$3(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString$3(method)) {
    if (isPlainObject$3(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject$3(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: Function
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
const emitter = new E$1();
const $on = defineSyncApi(API_ON, (name, callback) => {
  emitter.on(name, callback);
  return () => emitter.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  emitter.once(name, callback);
  return () => emitter.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!name) {
    emitter.e = {};
    return;
  }
  if (!isArray$3(name))
    name = [name];
  name.forEach((n2) => emitter.off(n2, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  emitter.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i2 = 0; i2 < onPushMessageCallbacks.length; i2++) {
      const callback = onPushMessageCallbacks[i2];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_2, { resolve: resolve2, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve2({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction$2(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction$2(options.success) || isFunction$2(options.fail) || isFunction$2(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject$3(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction$2(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key2 in fromArgs) {
        if (hasOwn$2(argsOption, key2)) {
          let keyOption = argsOption[key2];
          if (isFunction$2(keyOption)) {
            keyOption = keyOption(fromArgs[key2], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`微信小程序 ${methodName} 暂不支持 ${key2}`);
          } else if (isString$3(keyOption)) {
            toArgs[keyOption] = fromArgs[key2];
          } else if (isPlainObject$3(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key2] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key2) !== -1) {
          const callback = fromArgs[key2];
          if (isFunction$2(callback)) {
            toArgs[key2] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn$2(toArgs, key2)) {
            toArgs[key2] = fromArgs[key2];
          }
        }
      }
      return toArgs;
    } else if (isFunction$2(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction$2(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    return processArgs(methodName, res, returnValue, {}, keepReturnValue);
  }
  return function wrapper(methodName, method) {
    if (!hasOwn$2(protocols2, methodName)) {
      return method;
    }
    const protocol = protocols2[methodName];
    if (!protocol) {
      return function() {
        console.error(`微信小程序 暂不支持${methodName}`);
      };
    }
    return function(arg1, arg2) {
      let options = protocol;
      if (isFunction$2(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = isFunction$2(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
};
const setLocale = (locale) => {
  const app = isFunction$2(getApp) && getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_2, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  let osName = "";
  let osVersion = "";
  {
    osName = system.split(" ")[0] || "";
    osVersion = system.split(" ")[1] || "";
  }
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = language.replace(/_/g, "-");
  const parameters = {
    appId: "",
    appName: "uniapp_vue3_vite_ts",
    appVersion: "1.2.1",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "4.25",
    uniRuntimeVersion: "4.25",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0
  };
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray$3(urls)) {
      return;
    }
    const len2 = urls.length;
    if (!len2) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len2) {
      currentIndex = len2 - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = language.replace(/_/g, "-");
    toRes = sortObject(extend(toRes, {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "",
      appName: "uniapp_vue3_vite_ts",
      appVersion: "1.2.1",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage)
    }));
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback
};
function initUni(api, protocols2, platform = wx) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key2) {
      if (hasOwn$2(target, key2)) {
        return target[key2];
      }
      if (hasOwn$2(api, key2)) {
        return promisify(key2, api[key2]);
      }
      if (hasOwn$2(baseApis, key2)) {
        return promisify(key2, baseApis[key2]);
      }
      return promisify(key2, wrapper(key2, platform[key2]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction$2(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:服务[" + service + "]不存在"
      };
      isFunction$2(fail) && fail(res);
    }
    isFunction$2(complete) && complete(res);
  };
}
const objectKeys$2 = [
  "qy",
  "env",
  "error",
  "version",
  "lanDebug",
  "cloud",
  "serviceMarket",
  "router",
  "worklet",
  "__webpack_require_UNI_MP_PLUGIN__"
];
const singlePageDisableKey = ["lanDebug", "router", "worklet"];
const launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
function isWxKey(key2) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key2)) {
    return false;
  }
  return objectKeys$2.indexOf(key2) > -1 || typeof wx[key2] === "function";
}
function initWx() {
  const newWx = {};
  for (const key2 in wx) {
    if (isWxKey(key2)) {
      newWx[key2] = wx[key2];
    }
  }
  if (typeof globalThis !== "undefined" && typeof requireMiniProgram === "undefined") {
    globalThis.wx = newWx;
  }
  return newWx;
}
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx$2.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
const wx$2 = initWx();
let baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx$2.getSystemInfoSync();
}
const host = baseInfo ? baseInfo.host : null;
const shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  getProvider,
  shareVideoMessage
});
const compressImage = {
  args(fromArgs, toArgs) {
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      toArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  compressImage,
  getAppAuthorizeSetting,
  getAppBaseInfo,
  getDeviceInfo,
  getSystemInfo,
  getSystemInfoSync,
  getWindowInfo,
  previewImage,
  redirectTo,
  showActionSheet
});
const wx$1 = initWx();
var index = initUni(shims, protocols, wx$1);
new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key2) => key2 !== "arguments" && key2 !== "caller").map((key2) => Symbol[key2]).filter(isSymbol$1)
);
function toRaw$1(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw$1(raw) : observed;
}
function isRef$1(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const stack$1 = [];
function pushWarningContext$1(vnode) {
  stack$1.push(vnode);
}
function popWarningContext$1() {
  stack$1.pop();
}
function warn$1$1(msg, ...args) {
  const instance = stack$1.length ? stack$1[stack$1.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace$1();
  if (appWarnHandler) {
    callWithErrorHandling$1(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.map((a2) => {
          var _a, _b;
          return (_b = (_a = a2.toString) == null ? void 0 : _a.call(a2)) != null ? _b : JSON.stringify(a2);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName$1(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace$1(trace));
    }
    console.warn(...warnArgs);
  }
}
function getComponentTrace$1() {
  let currentVNode = stack$1[stack$1.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace$1(trace) {
  const logs = [];
  trace.forEach((entry, i2) => {
    logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry$1(entry));
  });
  return logs;
}
function formatTraceEntry$1({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName$1(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps$1(vnode.props), close] : [open + close];
}
function formatProps$1(props) {
  const res = [];
  const keys2 = Object.keys(props);
  keys2.slice(0, 3).forEach((key2) => {
    res.push(...formatProp$1(key2, props[key2]));
  });
  if (keys2.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp$1(key2, value, raw) {
  if (isString$3(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key2}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key2}=${value}`];
  } else if (isRef$1(value)) {
    value = formatProp$1(key2, toRaw$1(value.value), true);
    return raw ? value : [`${key2}=Ref<`, value, `>`];
  } else if (isFunction$2(value)) {
    return [`${key2}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw$1(value);
    return raw ? value : [`${key2}=`, value];
  }
}
const ErrorTypeStrings$1 = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function callWithErrorHandling$1(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError$1(err, instance, type);
  }
}
function handleError$1(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings$1[type];
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling$1(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError$1(err, type, contextVNode, throwInDev);
}
function logError$1(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings$1[type];
    if (contextVNode) {
      pushWarningContext$1(contextVNode);
    }
    warn$1$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext$1();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  }
}
let isFlushing$1 = false;
let isFlushPending$1 = false;
const queue$1 = [];
let flushIndex$1 = 0;
const pendingPostFlushCbs$1 = [];
let activePostFlushCbs$1 = null;
let postFlushIndex$1 = 0;
const resolvedPromise$1 = /* @__PURE__ */ Promise.resolve();
const RECURSION_LIMIT$1 = 100;
function findInsertionIndex$1(id) {
  let start = flushIndex$1 + 1;
  let end = queue$1.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue$1[middle];
    const middleJobId = getId$1(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob$1(job) {
  if (!queue$1.length || !queue$1.includes(
    job,
    isFlushing$1 && job.allowRecurse ? flushIndex$1 + 1 : flushIndex$1
  )) {
    if (job.id == null) {
      queue$1.push(job);
    } else {
      queue$1.splice(findInsertionIndex$1(job.id), 0, job);
    }
    queueFlush$1();
  }
}
function queueFlush$1() {
  if (!isFlushing$1 && !isFlushPending$1) {
    isFlushPending$1 = true;
    resolvedPromise$1.then(flushJobs$1);
  }
}
function queuePostFlushCb$1(cb) {
  if (!isArray$3(cb)) {
    if (!activePostFlushCbs$1 || !activePostFlushCbs$1.includes(
      cb,
      cb.allowRecurse ? postFlushIndex$1 + 1 : postFlushIndex$1
    )) {
      pendingPostFlushCbs$1.push(cb);
    }
  } else {
    pendingPostFlushCbs$1.push(...cb);
  }
  queueFlush$1();
}
function flushPostFlushCbs$1(seen) {
  if (pendingPostFlushCbs$1.length) {
    const deduped = [...new Set(pendingPostFlushCbs$1)].sort(
      (a2, b2) => getId$1(a2) - getId$1(b2)
    );
    pendingPostFlushCbs$1.length = 0;
    if (activePostFlushCbs$1) {
      activePostFlushCbs$1.push(...deduped);
      return;
    }
    activePostFlushCbs$1 = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex$1 = 0; postFlushIndex$1 < activePostFlushCbs$1.length; postFlushIndex$1++) {
      if (checkRecursiveUpdates$1(seen, activePostFlushCbs$1[postFlushIndex$1])) {
        continue;
      }
      activePostFlushCbs$1[postFlushIndex$1]();
    }
    activePostFlushCbs$1 = null;
    postFlushIndex$1 = 0;
  }
}
const getId$1 = (job) => job.id == null ? Infinity : job.id;
const comparator$1 = (a2, b2) => {
  const diff2 = getId$1(a2) - getId$1(b2);
  if (diff2 === 0) {
    if (a2.pre && !b2.pre)
      return -1;
    if (b2.pre && !a2.pre)
      return 1;
  }
  return diff2;
};
function flushJobs$1(seen) {
  isFlushPending$1 = false;
  isFlushing$1 = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue$1.sort(comparator$1);
  const check = (job) => checkRecursiveUpdates$1(seen, job);
  try {
    for (flushIndex$1 = 0; flushIndex$1 < queue$1.length; flushIndex$1++) {
      const job = queue$1[flushIndex$1];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling$1(job, null, 14);
      }
    }
  } finally {
    flushIndex$1 = 0;
    queue$1.length = 0;
    flushPostFlushCbs$1(seen);
    isFlushing$1 = false;
    if (queue$1.length || pendingPostFlushCbs$1.length) {
      flushJobs$1(seen);
    }
  }
}
function checkRecursiveUpdates$1(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT$1) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName$1(instance.type);
      handleError$1(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
const hmrDirtyComponents = /* @__PURE__ */ new Set();
{
  getGlobalThis$1().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
const map = /* @__PURE__ */ new Map();
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent$1(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    instance.effect.dirty = true;
    instance.update();
  });
}
function reload(id, newComp) {
  const record = map.get(id);
  if (!record)
    return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (const instance of instances) {
    const oldComp = normalizeClassComponent(instance.type);
    if (!hmrDirtyComponents.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.add(oldComp);
    }
    instance.appContext.propsCache.delete(instance.type);
    instance.appContext.emitsCache.delete(instance.type);
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      instance.parent.effect.dirty = true;
      queueJob$1(instance.parent.update);
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn(
        "[HMR] Root or manually mounted instance modified. Full reload required."
      );
    }
  }
  queuePostFlushCb$1(() => {
    for (const instance of instances) {
      hmrDirtyComponents.delete(
        normalizeClassComponent(instance.type)
      );
    }
  });
}
function updateComponentDef(oldComp, newComp) {
  extend(oldComp, newComp);
  for (const key2 in oldComp) {
    if (key2 !== "__file" && !(key2 in newComp)) {
      delete oldComp[key2];
    }
  }
}
function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e2) {
      console.error(e2);
      console.warn(
        `[HMR] Something went wrong during Vue component hot-reload. Full reload required.`
      );
    }
  };
}
{
  const g2 = getGlobalThis$1();
  const registerGlobalSetter = (key2, setter) => {
    let setters;
    if (!(setters = g2[key2]))
      setters = g2[key2] = [];
    setters.push(setter);
    return (v2) => {
      if (setters.length > 1)
        setters.forEach((set2) => set2(v2));
      else
        setters[0](v2);
    };
  };
  registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v2) => v2
  );
  registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v2) => v2
  );
}
const classifyRE$1 = /(?:^|[-_])(\w)/g;
const classify$1 = (str) => str.replace(classifyRE$1, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName$1(Component2, includeInferred = true) {
  return isFunction$2(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName$1(instance, Component2, isRoot = false) {
  let name = getComponentName$1(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key2 in registry) {
        if (registry[key2] === Component2) {
          return key2;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify$1(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent$1(value) {
  return isFunction$2(value) && "__vccOpts" in value;
}
/**
* @dcloudio/uni-mp-vue v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function warn$2(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$2(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i2, l2;
      for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) {
        this.effects[i2].stop();
      }
      for (i2 = 0, l2 = this.cleanups.length; i2 < l2; i2++) {
        this.cleanups[i2]();
      }
      if (this.scopes) {
        for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) {
          this.scopes[i2].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect2, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect2);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else {
    warn$2(
      `onScopeDispose() is called when there is no active effect scope to be associated with.`
    );
  }
}
let activeEffect;
class ReactiveEffect2 {
  constructor(fn, trigger2, scheduler, scope) {
    this.fn = fn;
    this.trigger = trigger2;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this._dirtyLevel = 4;
    this._trackId = 0;
    this._runnings = 0;
    this._shouldSchedule = false;
    this._depsLength = 0;
    recordEffectScope(this, scope);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1;
      pauseTracking();
      for (let i2 = 0; i2 < this._depsLength; i2++) {
        const dep = this.deps[i2];
        if (dep.computed) {
          triggerComputed(dep.computed);
          if (this._dirtyLevel >= 4) {
            break;
          }
        }
      }
      if (this._dirtyLevel === 1) {
        this._dirtyLevel = 0;
      }
      resetTracking();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(v2) {
    this._dirtyLevel = v2 ? 4 : 0;
  }
  run() {
    this._dirtyLevel = 0;
    if (!this.active) {
      return this.fn();
    }
    let lastShouldTrack = shouldTrack;
    let lastEffect = activeEffect;
    try {
      shouldTrack = true;
      activeEffect = this;
      this._runnings++;
      preCleanupEffect(this);
      return this.fn();
    } finally {
      postCleanupEffect(this);
      this._runnings--;
      activeEffect = lastEffect;
      shouldTrack = lastShouldTrack;
    }
  }
  stop() {
    var _a;
    if (this.active) {
      preCleanupEffect(this);
      postCleanupEffect(this);
      (_a = this.onStop) == null ? void 0 : _a.call(this);
      this.active = false;
    }
  }
}
function triggerComputed(computed2) {
  return computed2.value;
}
function preCleanupEffect(effect2) {
  effect2._trackId++;
  effect2._depsLength = 0;
}
function postCleanupEffect(effect2) {
  if (effect2.deps.length > effect2._depsLength) {
    for (let i2 = effect2._depsLength; i2 < effect2.deps.length; i2++) {
      cleanupDepEffect(effect2.deps[i2], effect2);
    }
    effect2.deps.length = effect2._depsLength;
  }
}
function cleanupDepEffect(dep, effect2) {
  const trackId = dep.get(effect2);
  if (trackId !== void 0 && effect2._trackId !== trackId) {
    dep.delete(effect2);
    if (dep.size === 0) {
      dep.cleanup();
    }
  }
}
let shouldTrack = true;
let pauseScheduleStack = 0;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function pauseScheduling() {
  pauseScheduleStack++;
}
function resetScheduling() {
  pauseScheduleStack--;
  while (!pauseScheduleStack && queueEffectSchedulers.length) {
    queueEffectSchedulers.shift()();
  }
}
function trackEffect(effect2, dep, debuggerEventExtraInfo) {
  var _a;
  if (dep.get(effect2) !== effect2._trackId) {
    dep.set(effect2, effect2._trackId);
    const oldDep = effect2.deps[effect2._depsLength];
    if (oldDep !== dep) {
      if (oldDep) {
        cleanupDepEffect(oldDep, effect2);
      }
      effect2.deps[effect2._depsLength++] = dep;
    } else {
      effect2._depsLength++;
    }
    {
      (_a = effect2.onTrack) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
    }
  }
}
const queueEffectSchedulers = [];
function triggerEffects(dep, dirtyLevel, debuggerEventExtraInfo) {
  var _a;
  pauseScheduling();
  for (const effect2 of dep.keys()) {
    let tracking;
    if (effect2._dirtyLevel < dirtyLevel && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      effect2._shouldSchedule || (effect2._shouldSchedule = effect2._dirtyLevel === 0);
      effect2._dirtyLevel = dirtyLevel;
    }
    if (effect2._shouldSchedule && (tracking != null ? tracking : tracking = dep.get(effect2) === effect2._trackId)) {
      {
        (_a = effect2.onTrigger) == null ? void 0 : _a.call(effect2, extend({ effect: effect2 }, debuggerEventExtraInfo));
      }
      effect2.trigger();
      if ((!effect2._runnings || effect2.allowRecurse) && effect2._dirtyLevel !== 2) {
        effect2._shouldSchedule = false;
        if (effect2.scheduler) {
          queueEffectSchedulers.push(effect2.scheduler);
        }
      }
    }
  }
  resetScheduling();
}
const createDep = (cleanup, computed2) => {
  const dep = /* @__PURE__ */ new Map();
  dep.cleanup = cleanup;
  dep.computed = computed2;
  return dep;
};
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
function track(target, type, key2) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key2);
    if (!dep) {
      depsMap.set(key2, dep = createDep(() => depsMap.delete(key2)));
    }
    trackEffect(
      activeEffect,
      dep,
      {
        target,
        type,
        key: key2
      }
    );
  }
}
function trigger(target, type, key2, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key2 === "length" && isArray$3(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key22) => {
      if (key22 === "length" || !isSymbol$1(key22) && key22 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key2 !== void 0) {
      deps.push(depsMap.get(key2));
    }
    switch (type) {
      case "add":
        if (!isArray$3(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key2)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$3(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  pauseScheduling();
  for (const dep of deps) {
    if (dep) {
      triggerEffects(
        dep,
        4,
        {
          target,
          type,
          key: key2,
          newValue,
          oldValue,
          oldTarget
        }
      );
    }
  }
  resetScheduling();
}
function getDepFromReactive(object, key2) {
  var _a;
  return (_a = targetMap.get(object)) == null ? void 0 : _a.get(key2);
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key2) => key2 !== "arguments" && key2 !== "caller").map((key2) => Symbol[key2]).filter(isSymbol$1)
);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key2) => {
    instrumentations[key2] = function(...args) {
      const arr = toRaw(this);
      for (let i2 = 0, l2 = this.length; i2 < l2; i2++) {
        track(arr, "get", i2 + "");
      }
      const res = arr[key2](...args);
      if (res === -1 || res === false) {
        return arr[key2](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key2) => {
    instrumentations[key2] = function(...args) {
      pauseTracking();
      pauseScheduling();
      const res = toRaw(this)[key2].apply(this, args);
      resetScheduling();
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty$a(key2) {
  const obj = toRaw(this);
  track(obj, "has", key2);
  return obj.hasOwnProperty(key2);
}
class BaseReactiveHandler2 {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key2, receiver) {
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key2 === "__v_isReactive") {
      return !isReadonly2;
    } else if (key2 === "__v_isReadonly") {
      return isReadonly2;
    } else if (key2 === "__v_isShallow") {
      return isShallow2;
    } else if (key2 === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray$3(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn$2(arrayInstrumentations, key2)) {
        return Reflect.get(arrayInstrumentations, key2, receiver);
      }
      if (key2 === "hasOwnProperty") {
        return hasOwnProperty$a;
      }
    }
    const res = Reflect.get(target, key2, receiver);
    if (isSymbol$1(key2) ? builtInSymbols.has(key2) : isNonTrackableKeys(key2)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key2);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key2) ? res : res.value;
    }
    if (isObject$3(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler2 extends BaseReactiveHandler2 {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key2, value, receiver) {
    let oldValue = target[key2];
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$3(target) && isRef(oldValue) && !isRef(value)) {
        if (isOldValueReadonly) {
          return false;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArray$3(target) && isIntegerKey(key2) ? Number(key2) < target.length : hasOwn$2(target, key2);
    const result = Reflect.set(target, key2, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key2, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key2, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key2) {
    const hadKey = hasOwn$2(target, key2);
    const oldValue = target[key2];
    const result = Reflect.deleteProperty(target, key2);
    if (result && hadKey) {
      trigger(target, "delete", key2, void 0, oldValue);
    }
    return result;
  }
  has(target, key2) {
    const result = Reflect.has(target, key2);
    if (!isSymbol$1(key2) || !builtInSymbols.has(key2)) {
      track(target, "has", key2);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray$3(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler2 extends BaseReactiveHandler2 {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key2) {
    {
      warn$2(
        `Set operation on key "${String(key2)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key2) {
    {
      warn$2(
        `Delete operation on key "${String(key2)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler2();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler2();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler2(
  true
);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler2(true);
const toShallow = (value) => value;
const getProto = (v2) => Reflect.getPrototypeOf(v2);
function get(target, key2, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key2);
  if (!isReadonly2) {
    if (hasChanged(key2, rawKey)) {
      track(rawTarget, "get", key2);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key2)) {
    return wrap(target.get(key2));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key2);
  }
}
function has(key2, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key2);
  if (!isReadonly2) {
    if (hasChanged(key2, rawKey)) {
      track(rawTarget, "has", key2);
    }
    track(rawTarget, "has", rawKey);
  }
  return key2 === rawKey ? target.has(key2) : target.has(key2) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1(key2, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key2);
  if (!hadKey) {
    key2 = toRaw(key2);
    hadKey = has2.call(target, key2);
  } else {
    checkIdentityKeys(target, has2, key2);
  }
  const oldValue = get2.call(target, key2);
  target.set(key2, value);
  if (!hadKey) {
    trigger(target, "add", key2, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key2, value, oldValue);
  }
  return this;
}
function deleteEntry(key2) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key2);
  if (!hadKey) {
    key2 = toRaw(key2);
    hadKey = has2.call(target, key2);
  } else {
    checkIdentityKeys(target, has2, key2);
  }
  const oldValue = get2 ? get2.call(target, key2) : void 0;
  const result = target.delete(key2);
  if (hadKey) {
    trigger(target, "delete", key2, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach2(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key2) => {
      return callback.call(thisArg, wrap(value), wrap(key2), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key2 = args[0] ? `on key "${args[0]}" ` : ``;
      warn$2(
        `${capitalize(type)} operation ${key2}failed: target is readonly.`,
        toRaw(this)
      );
    }
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key2) {
      return get(this, key2);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key2) {
      return get(this, key2, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key2) {
      return get(this, key2, true);
    },
    get size() {
      return size(this, true);
    },
    has(key2) {
      return has.call(this, key2, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key2) {
      return get(this, key2, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key2) {
      return has.call(this, key2, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key2, receiver) => {
    if (key2 === "__v_isReactive") {
      return !isReadonly2;
    } else if (key2 === "__v_isReadonly") {
      return isReadonly2;
    } else if (key2 === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn$2(instrumentations, key2) && key2 in target ? instrumentations : target,
      key2,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key2) {
  const rawKey = toRaw(key2);
  if (rawKey !== key2 && has2.call(target, rawKey)) {
    const type = toRawType(target);
    warn$2(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$3(target)) {
    {
      warn$2(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
const toReactive = (value) => isObject$3(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$3(value) ? readonly(value) : value;
const COMPUTED_SIDE_EFFECT_WARN = `Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free`;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this.getter = getter;
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this.effect = new ReactiveEffect2(
      () => getter(this._value),
      () => triggerRefValue(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    );
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    if ((!self2._cacheable || self2.effect.dirty) && hasChanged(self2._value, self2._value = self2.effect.run())) {
      triggerRefValue(self2, 4);
    }
    trackRefValue(self2);
    if (self2.effect._dirtyLevel >= 2) {
      if (this._warnRecursive) {
        warn$2(COMPUTED_SIDE_EFFECT_WARN, `

getter: `, this.getter);
      }
      triggerRefValue(self2, 2);
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(v2) {
    this.effect.dirty = v2;
  }
  // #endregion
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction$2(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      warn$2("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  return cRef;
}
function trackRefValue(ref2) {
  var _a;
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    trackEffect(
      activeEffect,
      (_a = ref2.dep) != null ? _a : ref2.dep = createDep(
        () => ref2.dep = void 0,
        ref2 instanceof ComputedRefImpl ? ref2 : void 0
      ),
      {
        target: ref2,
        type: "get",
        key: "value"
      }
    );
  }
}
function triggerRefValue(ref2, dirtyLevel = 4, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    triggerEffects(
      dep,
      dirtyLevel,
      {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      }
    );
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, 4, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key2, receiver) => unref(Reflect.get(target, key2, receiver)),
  set: (target, key2, value, receiver) => {
    const oldValue = target[key2];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key2, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
function toRefs(object) {
  if (!isProxy(object)) {
    warn$2(`toRefs() expects a reactive object but received a plain one.`);
  }
  const ret = isArray$3(object) ? new Array(object.length) : {};
  for (const key2 in object) {
    ret[key2] = propertyToRef(object, key2);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(toRaw(this._object), this._key);
  }
}
class GetterRefImpl {
  constructor(_getter) {
    this._getter = _getter;
    this.__v_isRef = true;
    this.__v_isReadonly = true;
  }
  get value() {
    return this._getter();
  }
}
function toRef(source, key2, defaultValue) {
  if (isRef(source)) {
    return source;
  } else if (isFunction$2(source)) {
    return new GetterRefImpl(source);
  } else if (isObject$3(source) && arguments.length > 1) {
    return propertyToRef(source, key2, defaultValue);
  } else {
    return ref(source);
  }
}
function propertyToRef(source, key2, defaultValue) {
  const val = source[key2];
  return isRef(val) ? val : new ObjectRefImpl(source, key2, defaultValue);
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.map((a2) => {
          var _a, _b;
          return (_b = (_a = a2.toString) == null ? void 0 : _a.call(a2)) != null ? _b : JSON.stringify(a2);
        }).join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i2) => {
    logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys2 = Object.keys(props);
  keys2.slice(0, 3).forEach((key2) => {
    res.push(...formatProp(key2, props[key2]));
  });
  if (keys2.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key2, value, raw) {
  if (isString$3(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key2}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key2}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key2, toRaw(value.value), true);
    return raw ? value : [`${key2}=Ref<`, value, `>`];
  } else if (isFunction$2(value)) {
    return [`${key2}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key2}=`, value];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://github.com/vuejs/core ."
};
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction$2(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values2 = [];
  for (let i2 = 0; i2 < fn.length; i2++) {
    values2.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
  }
  return values2;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i2 = queue.indexOf(job);
  if (i2 > flushIndex) {
    queue.splice(i2, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$3(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i2 = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i2 < queue.length; i2++) {
    const cb = queue[i2];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i2, 1);
      i2--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a2, b2) => getId(a2) - getId(b2)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a2, b2) => {
  const diff2 = getId(a2) - getId(b2);
  if (diff2 === 0) {
    if (a2.pre && !b2.pre)
      return -1;
    if (b2.pre && !a2.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      handleError(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
        null,
        10
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let devtools$1;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools$1) {
    devtools$1.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a, _b;
  devtools$1 = hook;
  if (devtools$1) {
    devtools$1.enabled = true;
    buffer.forEach(({ event, args }) => devtools$1.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools$1) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools$1 && typeof devtools$1.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools$1.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      // fixed by xxxxxx
      // 为 0 是 App，无 parent 是 Page 指向 App
      component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1(
    "component:emit",
    component.appContext.app,
    component,
    event,
    params
  );
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(
            `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`
          );
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction$2(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(
              `Invalid event arguments: event validation failed for event "${event}".`
            );
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number: number2, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a2) => isString$3(a2) ? a2.trim() : a2);
    }
    if (number2) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(
        `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
          instance,
          instance.type
        )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(
          event
        )}" instead of "${event}".`
      );
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache2 = appContext.emitsCache;
  const cached = cache2.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$2(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$3(comp)) {
      cache2.set(comp, null);
    }
    return null;
  }
  if (isArray$3(raw)) {
    raw.forEach((key2) => normalized[key2] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$3(comp)) {
    cache2.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key2) {
  if (!options || !isOn(key2)) {
    return false;
  }
  key2 = key2.slice(2).replace(/Once$/, "");
  return hasOwn$2(options, key2[0].toLowerCase() + key2.slice(1)) || hasOwn$2(options, hyphenate(key2)) || hasOwn$2(options, key2);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    {
      const selfName = getComponentName(
        Component2,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component2[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.`;
      warn$1(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$1(
      `resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`
    );
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction$2(cb)) {
    warn$1(
      `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
    );
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, {
  immediate,
  deep,
  flush,
  once: once2,
  onTrack,
  onTrigger
} = EMPTY_OBJ) {
  if (cb && once2) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      unwatch();
    };
  }
  if (deep !== void 0 && typeof deep === "number") {
    warn$1(
      `watch() "deep" option with number value will be used as watch depth in future versions. Please use a boolean instead to avoid potential breakage.`
    );
  }
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn$1(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (once2 !== void 0) {
      warn$1(
        `watch() "once" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const warnInvalidSource = (s2) => {
    warn$1(
      `Invalid watch source: `,
      s2,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const instance = currentInstance;
  const reactiveGetter = (source2) => deep === true ? source2 : (
    // for deep: false, only traverse root-level properties
    traverse(source2, deep === false ? 1 : void 0)
  );
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray$3(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return reactiveGetter(s2);
      } else if (isFunction$2(s2)) {
        return callWithErrorHandling(s2, instance, 2);
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction$2(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect2.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
      cleanup = effect2.onStop = void 0;
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect2.active || !effect2.dirty) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i2) => hasChanged(v2, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect2.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect2 = new ReactiveEffect2(getter, NOOP, scheduler);
  const scope = getCurrentScope();
  const unwatch = () => {
    effect2.stop();
    if (scope) {
      remove(scope.effects, effect2);
    }
  };
  {
    effect2.onTrack = onTrack;
    effect2.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect2.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect$1(
      effect2.run.bind(effect2),
      instance && instance.suspense
    );
  } else {
    effect2.run();
  }
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString$3(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$2(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i2 = 0; i2 < segments.length && cur; i2++) {
      cur = cur[segments[i2]];
    }
    return cur;
  };
}
function traverse(value, depth, currentDepth = 0, seen) {
  if (!isObject$3(value) || value["__v_skip"]) {
    return value;
  }
  if (depth && depth > 0) {
    if (currentDepth >= depth) {
      return value;
    }
    currentDepth++;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, depth, currentDepth, seen);
  } else if (isArray$3(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      traverse(value[i2], depth, currentDepth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v2) => {
      traverse(v2, depth, currentDepth, seen);
    });
  } else if (isPlainObject$3(value)) {
    for (const key2 in value) {
      traverse(value[key2], depth, currentDepth, seen);
    }
  }
  return value;
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction$2(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject$3(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v2) {
        {
          warn$1(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction$2(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction$2(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn$1(
            `A plugin must either be a function or an object with an "install" function.`
          );
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$1(
              "Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : "")
            );
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      // fixed by xxxxxx
      mount() {
      },
      // fixed by xxxxxx
      unmount() {
      },
      provide(key2, value) {
        if (key2 in context.provides) {
          warn$1(
            `App already provides property with key "${String(key2)}". It will be overwritten with the new value.`
          );
        }
        context.provides[key2] = value;
        return app;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app;
  };
}
let currentApp = null;
function provide(key2, value) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key2] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key2, value);
    }
  }
}
function inject(key2, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key2 in provides) {
      return provides[key2];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$2(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key2)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
function hasInjectionContext() {
  return !!(currentInstance || currentRenderingInstance || currentApp);
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction$2(options) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey(
      (ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, "")
    );
    warn$1(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`
    );
  }
}
const createHook$2 = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook$2("bm");
const onMounted = createHook$2("m");
const onBeforeUpdate = createHook$2("bu");
const onUpdated = createHook$2("u");
const onBeforeUnmount = createHook$2("bum");
const onUnmounted = createHook$2("um");
const onServerPrefetch = createHook$2("sp");
const onRenderTriggered = createHook$2(
  "rtg"
);
const onRenderTracked = createHook$2(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
const getPublicInstance = (i2) => {
  if (!i2)
    return null;
  if (isStatefulComponent(i2))
    return getExposeProxy(i2) || i2.proxy;
  return getPublicInstance(i2.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i2) => i2,
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: (i2) => i2.__$el || (i2.__$el = {}),
    $data: (i2) => i2.data,
    $props: (i2) => shallowReadonly(i2.props),
    $attrs: (i2) => shallowReadonly(i2.attrs),
    $slots: (i2) => shallowReadonly(i2.slots),
    $refs: (i2) => shallowReadonly(i2.refs),
    $parent: (i2) => getPublicInstance(i2.parent),
    $root: (i2) => getPublicInstance(i2.root),
    $emit: (i2) => i2.emit,
    $options: (i2) => resolveMergedOptions(i2),
    $forceUpdate: (i2) => i2.f || (i2.f = () => {
      i2.effect.dirty = true;
      queueJob(i2.update);
    }),
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: (i2) => instanceWatch.bind(i2)
  })
);
const isReservedPrefix = (key2) => key2 === "_" || key2 === "$";
const hasSetupBinding = (state, key2) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn$2(state, key2);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key2) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key2 === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key2[0] !== "$") {
      const n2 = accessCache[key2];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key2];
          case 2:
            return data[key2];
          case 4:
            return ctx[key2];
          case 3:
            return props[key2];
        }
      } else if (hasSetupBinding(setupState, key2)) {
        accessCache[key2] = 1;
        return setupState[key2];
      } else if (data !== EMPTY_OBJ && hasOwn$2(data, key2)) {
        accessCache[key2] = 2;
        return data[key2];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn$2(normalizedProps, key2)
      ) {
        accessCache[key2] = 3;
        return props[key2];
      } else if (ctx !== EMPTY_OBJ && hasOwn$2(ctx, key2)) {
        accessCache[key2] = 4;
        return ctx[key2];
      } else if (shouldCacheAccess) {
        accessCache[key2] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key2];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key2 === "$attrs") {
        track(instance, "get", key2);
      } else if (key2 === "$slots") {
        track(instance, "get", key2);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key2])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn$2(ctx, key2)) {
      accessCache[key2] = 4;
      return ctx[key2];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn$2(globalProperties, key2)
    ) {
      {
        return globalProperties[key2];
      }
    } else if (currentRenderingInstance && (!isString$3(key2) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key2.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key2[0]) && hasOwn$2(data, key2)) {
        warn$1(
          `Property ${JSON.stringify(
            key2
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance === currentRenderingInstance) {
        warn$1(
          `Property ${JSON.stringify(key2)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance }, key2, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key2)) {
      setupState[key2] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn$2(setupState, key2)) {
      warn$1(`Cannot mutate <script setup> binding "${key2}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn$2(data, key2)) {
      data[key2] = value;
      return true;
    } else if (hasOwn$2(instance.props, key2)) {
      warn$1(`Attempting to mutate prop "${key2}". Props are readonly.`);
      return false;
    }
    if (key2[0] === "$" && key2.slice(1) in instance) {
      warn$1(
        `Attempting to mutate public property "${key2}". Properties starting with $ are reserved and readonly.`
      );
      return false;
    } else {
      if (key2 in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key2, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key2] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key2) {
    let normalizedProps;
    return !!accessCache[key2] || data !== EMPTY_OBJ && hasOwn$2(data, key2) || hasSetupBinding(setupState, key2) || (normalizedProps = propsOptions[0]) && hasOwn$2(normalizedProps, key2) || hasOwn$2(ctx, key2) || hasOwn$2(publicPropertiesMap, key2) || hasOwn$2(appContext.config.globalProperties, key2);
  },
  defineProperty(target, key2, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key2] = 0;
    } else if (hasOwn$2(descriptor, "value")) {
      this.set(target, key2, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key2, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key2) => {
    Object.defineProperty(target, key2, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key2](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key2) => {
      Object.defineProperty(ctx, key2, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key2],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key2) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key2[0])) {
        warn$1(
          `setup() return property ${JSON.stringify(
            key2
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(ctx, key2, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key2],
        set: NOOP
      });
    }
  });
}
function normalizePropsOrEmits(props) {
  return isArray$3(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
function createDuplicateChecker() {
  const cache2 = /* @__PURE__ */ Object.create(null);
  return (type, key2) => {
    if (cache2[key2]) {
      warn$1(`${type} property "${key2}" is already defined in ${cache2[key2]}.`);
    } else {
      cache2[key2] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key2 in propsOptions) {
        checkDuplicateProperties("Props", key2);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key2 in methods) {
      const methodHandler = methods[key2];
      if (isFunction$2(methodHandler)) {
        {
          Object.defineProperty(ctx, key2, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key2);
        }
      } else {
        warn$1(
          `Method "${key2}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
        );
      }
    }
  }
  if (dataOptions) {
    if (!isFunction$2(dataOptions)) {
      warn$1(
        `The data option must be a function. Plain object usage is no longer supported.`
      );
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$1(
        `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
      );
    }
    if (!isObject$3(data)) {
      warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key2 in data) {
          checkDuplicateProperties("Data", key2);
          if (!isReservedPrefix(key2[0])) {
            Object.defineProperty(ctx, key2, {
              configurable: true,
              enumerable: true,
              get: () => data[key2],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key2 in computedOptions) {
      const opt = computedOptions[key2];
      const get2 = isFunction$2(opt) ? opt.bind(publicThis, publicThis) : isFunction$2(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key2}" has no getter.`);
      }
      const set2 = !isFunction$2(opt) && isFunction$2(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(
          `Write operation failed: computed property "${key2}" is readonly.`
        );
      };
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key2, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v2) => c2.value = v2
      });
      {
        checkDuplicateProperties("Computed", key2);
      }
    }
  }
  if (watchOptions) {
    for (const key2 in watchOptions) {
      createWatcher(watchOptions[key2], ctx, publicThis, key2);
    }
  }
  {
    if (provideOptions) {
      const provides = isFunction$2(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key2) => {
        provide(key2, provides[key2]);
      });
    }
  }
  {
    if (created) {
      callHook$1(created, instance, "c");
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$3(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$3(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key2) => {
        Object.defineProperty(exposed, key2, {
          get: () => publicThis[key2],
          set: (val) => publicThis[key2] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray$3(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key2 in injectOptions) {
    const opt = injectOptions[key2];
    let injected;
    if (isObject$3(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key2,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key2);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key2, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v2) => injected.value = v2
      });
    } else {
      ctx[key2] = injected;
    }
    {
      checkDuplicateProperties("Inject", key2);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray$3(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key2) {
  const getter = key2.includes(".") ? createPathGetter(publicThis, key2) : () => publicThis[key2];
  if (isString$3(raw)) {
    const handler = ctx[raw];
    if (isFunction$2(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction$2(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$3(raw)) {
    if (isArray$3(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key2));
    } else {
      const handler = isFunction$2(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$2(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key2}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache2,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache2.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m2) => mergeOptions(resolved, m2, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$3(base)) {
    cache2.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m2) => mergeOptions(to, m2, strats, true)
    );
  }
  for (const key2 in from) {
    if (asMixin && key2 === "expose") {
      warn$1(
        `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
      );
    } else {
      const strat = internalOptionMergeStrats[key2] || strats && strats[key2];
      to[key2] = strat ? strat(to[key2], from[key2]) : from[key2];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction$2(to) ? to.call(this, this) : to,
      isFunction$2(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$3(raw)) {
    const res = {};
    for (let i2 = 0; i2 < raw.length; i2++) {
      res[raw[i2]] = raw[i2];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$3(to) && isArray$3(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key2 in from) {
    merged[key2] = mergeAsArray$1(to[key2], from[key2]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key2 in instance.propsOptions[0]) {
    if (!(key2 in props)) {
      props[key2] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext(instance) && patchFlag > 0 && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
        let key2 = propsToUpdate[i2];
        if (isEmitListener(instance.emitsOptions, key2)) {
          continue;
        }
        const value = rawProps[key2];
        if (options) {
          if (hasOwn$2(attrs, key2)) {
            if (value !== attrs[key2]) {
              attrs[key2] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key2);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key2]) {
            attrs[key2] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key2 in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn$2(rawProps, key2) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key2)) === key2 || !hasOwn$2(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key2] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key2] = resolvePropValue(
              options,
              rawCurrentProps,
              key2,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key2];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key2 in attrs) {
        if (!rawProps || !hasOwn$2(rawProps, key2) && true) {
          delete attrs[key2];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key2 in rawProps) {
      if (isReservedProp(key2)) {
        continue;
      }
      const value = rawProps[key2];
      let camelKey;
      if (options && hasOwn$2(options, camelKey = camelize(key2))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key2)) {
        if (!(key2 in attrs) || value !== attrs[key2]) {
          attrs[key2] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i2 = 0; i2 < needCastKeys.length; i2++) {
      const key2 = needCastKeys[i2];
      props[key2] = resolvePropValue(
        options,
        rawCurrentProps,
        key2,
        castValues[key2],
        instance,
        !hasOwn$2(castValues, key2)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key2, value, instance, isAbsent) {
  const opt = options[key2];
  if (opt != null) {
    const hasDefault = hasOwn$2(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction$2(defaultValue)) {
        const { propsDefaults } = instance;
        if (key2 in propsDefaults) {
          value = propsDefaults[key2];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key2] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key2))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache2 = appContext.propsCache;
  const cached = cache2.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$2(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys2] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys2)
        needCastKeys.push(...keys2);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$3(comp)) {
      cache2.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$3(raw)) {
    for (let i2 = 0; i2 < raw.length; i2++) {
      if (!isString$3(raw[i2])) {
        warn$1(`props must be strings when using array syntax.`, raw[i2]);
      }
      const normalizedKey = camelize(raw[i2]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$3(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key2 in raw) {
      const normalizedKey = camelize(key2);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key2];
        const prop = normalized[normalizedKey] = isArray$3(opt) || isFunction$2(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn$2(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$3(comp)) {
    cache2.set(comp, res);
  }
  return res;
}
function validatePropName(key2) {
  if (key2[0] !== "$" && !isReservedProp(key2)) {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key2}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  if (ctor === null) {
    return "null";
  }
  if (typeof ctor === "function") {
    return ctor.name || "";
  } else if (typeof ctor === "object") {
    const name = ctor.constructor && ctor.constructor.name;
    return name || "";
  }
  return "";
}
function isSameType(a2, b2) {
  return getType(a2) === getType(b2);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$3(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction$2(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key2 in options) {
    let opt = options[key2];
    if (opt == null)
      continue;
    validateProp(
      key2,
      resolvedValues[key2],
      opt,
      shallowReadonly(resolvedValues),
      !hasOwn$2(rawProps, key2) && !hasOwn$2(rawProps, hyphenate(key2))
    );
  }
}
function validateProp(name, value, prop, props, isAbsent) {
  const { type, required, validator, skipCheck } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    let isValid = false;
    const types = isArray$3(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const { valid, expectedType } = assertType(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value, props)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$3(value);
  } else if (expectedType === "Array") {
    valid = isArray$3(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  if (expectedTypes.length === 0) {
    return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
  }
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(
      `<${formatComponentName(instance, instance.type)}> ${type}`,
      startTag,
      endTag
    );
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
const queuePostRenderEffect$1 = queuePostFlushCb;
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let setInSSRSetupState;
{
  internalSetCurrentInstance = (i2) => {
    currentInstance = i2;
  };
  setInSSRSetupState = (v2) => {
    isInSSRComponentSetup = v2;
  };
}
const setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, { isNativeTag }) {
  if (isBuiltInTag(name) || isNativeTag(name)) {
    warn$1(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isSSR && setInSSRSetupState(isSSR);
  const {
    props
    /*, children*/
  } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateComponentName(names[i2], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateDirectiveName(names[i2]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn$1(
        `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
      );
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        shallowReadonly(instance.props),
        setupContext
      ]
    );
    resetTracking();
    reset();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn$1(
          `setup() returned a Promise, but the version of Vue you are using does not support it yet.`
        );
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$2(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject$3(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(
        `setup() should not return VNodes directly - return a render function instead.`
      );
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1(
      `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
    );
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions$1(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn$1(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
      );
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
    {
      get(target, key2) {
        track(instance, "get", "$attrs");
        return target[key2];
      },
      set() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  ));
}
function getSlotsProxy(instance) {
  return instance.slotsProxy || (instance.slotsProxy = new Proxy(instance.slots, {
    get(target, key2) {
      track(instance, "get", "$slots");
      return target[key2];
    }
  }));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    {
      if (instance.exposed) {
        warn$1(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray$3(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn$1(
            `expose() should be passed a plain object, received ${exposedType}.`
          );
        }
      }
    }
    instance.exposed = exposed || {};
  };
  {
    return Object.freeze({
      get attrs() {
        return getAttrsProxy(instance);
      },
      get slots() {
        return getSlotsProxy(instance);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key2) {
        if (key2 in target) {
          return target[key2];
        }
        return instance.proxy[key2];
      },
      has(target, key2) {
        return key2 in target || key2 in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction$2(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key2 in registry) {
        if (registry[key2] === Component2) {
          return key2;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed = (getterOrOptions, debugOptions) => {
  const c2 = computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  {
    const i2 = getCurrentInstance();
    if (i2 && i2.appContext.config.warnRecursiveComputed) {
      c2._warnRecursive = true;
    }
  }
  return c2;
};
const version = "3.4.21";
const warn$3 = warn$1;
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString$1(current);
  const rootPreType = toTypeString$1(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key2 in pre) {
      const currentValue = current[key2];
      if (currentValue === void 0) {
        current[key2] = null;
      } else {
        syncKeys(currentValue, pre[key2]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString$1(current);
  const rootPreType = toTypeString$1(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key2 in current) {
        const currentValue = unwrapper(current[key2]);
        const preValue = pre[key2];
        const currentType = toTypeString$1(currentValue);
        const preType = toTypeString$1(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key2,
              currentValue
            );
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key2,
              currentValue
            );
          } else {
            if (currentValue.length < preValue.length) {
              setResult(
                result,
                (path == "" ? "" : path + ".") + key2,
                currentValue
              );
            } else {
              currentValue.forEach((item, index2) => {
                _diff(
                  item,
                  preValue[index2],
                  (path == "" ? "" : path + ".") + key2 + "[" + index2 + "]",
                  result
                );
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(
              result,
              (path == "" ? "" : path + ".") + key2,
              currentValue
            );
          } else {
            for (let subKey in currentValue) {
              _diff(
                currentValue[subKey],
                preValue[subKey],
                (path == "" ? "" : path + ".") + key2 + "." + subKey,
                result
              );
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k2, v2) {
  result[k2] = v2;
}
function hasComponentEffect(instance) {
  return queue.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i2 = 0; i2 < copies.length; i2++) {
      copies[i2]();
    }
  }
}
function nextTick(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick$1(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(
        fn.bind(instance.proxy),
        instance,
        14
      );
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray$3(src)) {
      const len2 = src.length;
      copy = new Array(len2);
      seen.set(src, copy);
      for (let i2 = 0; i2 < len2; i2++) {
        copy[i2] = clone(src[i2], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn$2(src, name)) {
          copy[name] = clone(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy$1(src) {
  return clone(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys2) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys2.forEach((key2) => {
    ret[key2] = data[key2];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy$1(data);
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys2 = Object.keys(data);
    const diffData = diff(data, getMPInstanceData(mpInstance, keys2));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs();
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(
    options,
    instance,
    publicThis
  );
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys2 = Object.keys(computedOptions);
    if (keys2.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys2);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const {
    setupState,
    $templateRefs,
    ctx: { $scope, $mpPlatform }
  } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$templateRefs || !$scope) {
    return;
  }
  if (isUnmount) {
    return $templateRefs.forEach(
      (templateRef) => setTemplateRef(templateRef, null, setupState)
    );
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    const mpComponents = (
      // 字节小程序 selectAllComponents 可能返回 null
      // https://github.com/dcloudio/uni-app/issues/3954
      ($scope.selectAllComponents(".r") || []).concat(
        $scope.selectAllComponents(".r-i-f") || []
      )
    );
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    const refs = doSetByRefs($templateRefs);
    if (refs.length && instance.proxy && instance.proxy.$scope) {
      instance.proxy.$scope.setData({ r1: 1 }, () => {
        doSetByRefs(refs);
      });
    }
  };
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick(instance, doSet);
  }
}
function toSkip(value) {
  if (isObject$3(value)) {
    markRaw(value);
  }
  return value;
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find(
    (com) => com && (com.properties || com.props).uI === id
  );
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return toSkip(mpInstance);
  }
  return null;
}
function setTemplateRef({ r: r2, f: f2 }, refValue, setupState) {
  if (isFunction$2(r2)) {
    r2(refValue, {});
  } else {
    const _isString = isString$3(r2);
    const _isRef = isRef(r2);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray$3(r2.value)) {
          r2.value = [];
        }
        const existing = r2.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          onBeforeUnmount(() => remove(existing, refValue), refValue.$);
        }
      } else if (_isString) {
        if (hasOwn$2(setupState, r2)) {
          setupState[r2] = refValue;
        }
      } else if (isRef(r2)) {
        r2.value = refValue;
      } else {
        warnRef(r2);
      }
    } else {
      warnRef(r2);
    }
  }
}
function warnRef(ref2) {
  warn$3("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
const queuePostRenderEffect = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
    startMeasure(instance, `mount`);
  }
  {
    startMeasure(instance, `init`);
  }
  setupComponent(instance);
  {
    endMeasure(instance, `init`);
  }
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
    endMeasure(instance, `mount`);
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key2 in attrs) {
    if (key2 === "class" || key2 === "style" || isOn(key2)) {
      (res || (res = {}))[key2] = attrs[key2];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const {
    type: Component2,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    uid: uid2,
    appContext: {
      app: {
        config: {
          globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 }
        }
      }
    },
    inheritAttrs
  } = instance;
  instance.$templateRefs = [];
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(
        proxyToUse,
        proxyToUse,
        renderCache,
        props,
        setupState,
        data,
        ctx
      );
    } else {
      fallthroughAttrs(
        inheritAttrs,
        props,
        propsOptions,
        Component2.props ? attrs : getFunctionalFallthrough(attrs)
      );
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(
        props,
        null
        /* we know it doesn't need it */
      );
    }
  } catch (err) {
    handleError(err, instance, 1);
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys2 = Object.keys(fallthroughAttrs2).filter(
      (key2) => key2 !== "class" && key2 !== "style"
    );
    if (!keys2.length) {
      return;
    }
    if (propsOptions && keys2.some(isModelListener)) {
      keys2.forEach((key2) => {
        if (!isModelListener(key2) || !(key2.slice(9) in propsOptions)) {
          props[key2] = fallthroughAttrs2[key2];
        }
      });
    } else {
      keys2.forEach((key2) => props[key2] = fallthroughAttrs2[key2]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs();
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString$3(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(
        data,
        oldScopedSlotData[index2]
      );
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect: effect2, update }, allowed) {
  effect2.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(
    instance
  );
  instance.$updateScopedSlots = () => nextTick$1(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      {
        devtoolsComponentAdded(instance);
      }
    } else {
      const { next, bu, u: u2 } = instance;
      {
        pushWarningContext(next || instance.vnode);
      }
      toggleRecurse(instance, false);
      updateComponentPreRender();
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      if (u2) {
        queuePostRenderEffect(u2);
      }
      {
        devtoolsComponentUpdated(instance);
      }
      {
        popWarningContext();
      }
    }
  };
  const effect2 = instance.effect = new ReactiveEffect2(
    componentUpdateFn,
    NOOP,
    () => queueJob(update),
    instance.scope
    // track it in component's effect scope
  );
  const update = instance.update = () => {
    if (effect2.dirty) {
      effect2.run();
    }
  };
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect2.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect2.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  update();
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect(um);
  }
  queuePostRenderEffect(() => {
    instance.isUnmounted = true;
  });
  {
    devtoolsComponentRemoved(instance);
  }
}
const oldCreateApp = createAppAPI();
function getTarget() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof my !== "undefined") {
    return my;
  }
}
function createVueApp(rootComponent, rootProps = null) {
  const target = getTarget();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode2 = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent22(initialVNode, options) {
    return mountComponent(createVNode2(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(
      createVNode2({ type: rootComponent }),
      {
        mpType: "app",
        mpInstance: null,
        parentComponent: null,
        slots: [],
        props: null
      }
    );
    app._instance = instance.$;
    {
      devtoolsInitApp(app, version);
    }
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn$3(`Cannot unmount an app.`);
  };
  return app;
}
function createVNode() {
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction$2(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray$3(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set$2(target, key2, val) {
  return target[key2] = val;
}
function $callMethod(method, ...args) {
  const fn = this[method];
  if (fn) {
    return fn(...args);
  }
  console.error(`method ${method} not found`);
  return null;
}
function createErrorHandler(app) {
  return function errorHandler(err, instance, _info) {
    if (!instance) {
      throw err;
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    {
      appInstance.proxy.$callHook(ON_ERROR, err);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i2 = 0;
    for (; i2 < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i2++)) << 18 | b64.indexOf(str.charAt(i2++)) << 12 | (r1 = b64.indexOf(str.charAt(i2++))) << 6 | (r2 = b64.indexOf(str.charAt(i2++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c2) {
    return "%" + ("00" + c2.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app._context.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set$2;
    globalProperties.$applyOptions = applyOptions$2;
    globalProperties.$callMethod = $callMethod;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined" && typeof global[method] !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function vOn(value, key2) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key2 !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq" || ctx.$mpPlatform === "mp-xhs") && (isString$3(key2) || typeof key2 === "number") ? "_" + key2 : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? String(eventTarget.dataset.eventsync) === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray$3(res) || isPromise(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn$2(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn$2(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject$3(event.detail) && hasOwn$2(event.detail, "checked") && !hasOwn$2(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject$3(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray$3(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray$3(source) || isString$3(source)) {
    ret = new Array(source.length);
    for (let i2 = 0, l2 = source.length; i2 < l2; i2++) {
      ret[i2] = renderItem(source[i2], i2, i2);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn$3(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i2 = 0; i2 < source; i2++) {
      ret[i2] = renderItem(i2 + 1, i2, i2);
    }
  } else if (isObject$3(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i2) => renderItem(item, i2, i2));
    } else {
      const keys2 = Object.keys(source);
      ret = new Array(keys2.length);
      for (let i2 = 0, l2 = keys2.length; i2 < l2; i2++) {
        const key2 = keys2[i2];
        ret[i2] = renderItem(source[key2], key2, i2);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function stringifyStyle(value) {
  if (isString$3(value)) {
    return value;
  }
  return stringify(normalizeStyle(value));
}
function stringify(styles) {
  let ret = "";
  if (!styles || isString$3(styles)) {
    return ret;
  }
  for (const key2 in styles) {
    ret += `${key2.startsWith(`--`) ? key2 : hyphenate(key2)}:${styles[key2]};`;
  }
  return ret;
}
function setRef(ref2, id, opts = {}) {
  const { $templateRefs } = getCurrentInstance();
  $templateRefs.push({ i: id, r: ref2, k: opts.k, f: opts.f });
}
function setupDevtoolsPlugin() {
}
const o = (value, key2) => vOn(value, key2);
const f$1 = (source, renderItem) => vFor(source, renderItem);
const s$1 = (value) => stringifyStyle(value);
const e = (target, ...sources) => extend(target, ...sources);
const h$1 = (str) => hyphenate(str);
const n = (value) => normalizeClass(value);
const t = (val) => toDisplayString$1(val);
const p$1 = (props) => renderProps(props);
const sr = (ref2, id, opts) => setRef(ref2, id, opts);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray$3(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn$2(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (isUniLifecycleHook(name, vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn$2(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = isFunction$2(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray$3(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn$2(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    // mp-alipay 组件 data 初始化比 onLaunch 早，提前挂载
    onLaunch(options) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  const { onError } = internalInstance;
  if (onError) {
    internalInstance.appContext.config.errorHandler = (err) => {
      instance.$callHook(ON_ERROR, err);
    };
  }
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm);
    const app = isFunction$2(getApp) && getApp({
      allowDefault: true
    });
    if (!app)
      return;
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn$2(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn$2(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction$2(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction$2(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction$2(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v2) {
      locale.value = v2;
    }
  });
}
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len2 = ids.length;
  if (len2 === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len2 === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn$2(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
const WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE);
      if (matches) {
        const workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray$3(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    const childVm = $children[i2];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    parentVm = findVmByVueId($children[i2], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  "eO",
  // 组件 ref
  "uR",
  // 组件 ref-in-for
  "uRIF",
  // 组件 id
  "uI",
  // 组件类型 m: 小程序组件
  "uT",
  // 组件 props
  "uP",
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  "uS"
];
function initDefaultProps(options, isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: [],
      observer: function(newVal) {
        const $slots = /* @__PURE__ */ Object.create(null);
        newVal && newVal.forEach((slotName) => {
          $slots[slotName] = true;
        });
        this.setData({
          $slots
        });
      }
    };
  }
  if (options.behaviors) {
    if (options.behaviors.includes("wx://form-field")) {
      if (!options.properties || !options.properties.name) {
        properties.name = {
          type: null,
          value: ""
        };
      }
      if (!options.properties || !options.properties.value) {
        properties.value = {
          type: null,
          value: ""
        };
      }
    }
  }
  return properties;
}
function initVirtualHostProps(options) {
  const properties = {};
  {
    if (options && options.virtualHost) {
      properties.virtualHostStyle = {
        type: null,
        value: ""
      };
      properties.virtualHostClass = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray$3(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray$3(rawProps)) {
    rawProps.forEach((key2) => {
      properties[key2] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject$3(rawProps)) {
    Object.keys(rawProps).forEach((key2) => {
      const opts = rawProps[key2];
      if (isPlainObject$3(opts)) {
        let value = opts.default;
        if (isFunction$2(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key2] = {
          type: opts.type,
          value
        };
      } else {
        properties[key2] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(properties.uP)) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject$3(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = properties[name];
      }
    });
  }
  return propsData;
}
function initFormField(vm) {
  const vueOptions = vm.$options;
  if (isArray$3(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
    vm.$watch("modelValue", () => {
      vm.$scope && vm.$scope.setData({
        name: vm.name,
        value: vm.modelValue
      });
    }, {
      immediate: true
    });
  }
}
function initData(_2) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(up, this.$vm.$);
    } else if (this.properties.uT === "m") {
      updateMiniProgramComponentProperties(up, this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i2 = 0; i2 < nextKeys.length; i2++) {
    const key2 = nextKeys[i2];
    if (nextProps[key2] !== prevProps[key2]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray$3(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray$3(vueProps)) {
          vueProps.push("name");
          vueProps.push("modelValue");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (isArray$3(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject$3(item.options)) {
        extend(options, item.options);
      }
    });
  }
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  {
    initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
  }
  if (parse2) {
    parse2(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getAppVm().$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    this.options = query;
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse2 && parse2(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customizeEvent(event), ...args]);
  };
  try {
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        // vueSlots
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
      if (!isMiniProgramPage) {
        initFormField(this.$vm);
      }
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  handleLink,
  initLifetimes,
  initRelation,
  isPage,
  mocks
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
const createHook$1 = (lifecycle) => (hook, target = getCurrentInstance()) => {
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onShow = /* @__PURE__ */ createHook$1(ON_SHOW);
const onHide = /* @__PURE__ */ createHook$1(ON_HIDE);
const onLaunch = /* @__PURE__ */ createHook$1(ON_LAUNCH);
var isVue2 = false;
function set(target, key2, val) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key2);
    target.splice(key2, 1, val);
    return val;
  }
  target[key2] = val;
  return val;
}
function del(target, key2) {
  if (Array.isArray(target)) {
    target.splice(key2, 1);
    return;
  }
  delete target[key2];
}
/*!
* pinia v2.2.3
* (c) 2024 Eduardo San Martin Morote
* @license MIT
*/
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = Symbol("pinia");
function isPlainObject$2(o2) {
  return o2 && typeof o2 === "object" && Object.prototype.toString.call(o2) === "[object Object]" && typeof o2.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
const IS_CLIENT = typeof window !== "undefined";
const componentStateTypes = [];
const getStoreType = (id) => "🍍 " + id;
function addStoreToDevtools(app, store) {
  if (!componentStateTypes.includes(getStoreType(store.$id))) {
    componentStateTypes.push(getStoreType(store.$id));
  }
}
function patchActionForGrouping(store, actionNames, wrapWithProxy) {
  const actions = actionNames.reduce((storeActions, actionName) => {
    storeActions[actionName] = toRaw(store)[actionName];
    return storeActions;
  }, {});
  for (const actionName in actions) {
    store[actionName] = function() {
      const trackedStore = wrapWithProxy ? new Proxy(store, {
        get(...args) {
          return Reflect.get(...args);
        },
        set(...args) {
          return Reflect.set(...args);
        }
      }) : store;
      const retValue = actions[actionName].apply(trackedStore, arguments);
      return retValue;
    };
  }
}
function devtoolsPlugin({ app, store, options }) {
  if (store.$id.startsWith("__hot:")) {
    return;
  }
  store._isOptionsAPI = !!options.state;
  if (!store._p._testing) {
    patchActionForGrouping(store, Object.keys(options.actions), store._isOptionsAPI);
    const originalHotUpdate = store._hotUpdate;
    toRaw(store)._hotUpdate = function(newStore) {
      originalHotUpdate.apply(this, arguments);
      patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions), !!store._isOptionsAPI);
    };
  }
  addStoreToDevtools(
    app,
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    store
  );
}
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  if (typeof Proxy !== "undefined") {
    pinia.use(devtoolsPlugin);
  }
  return pinia;
}
function patchObject(newState, oldState) {
  for (const key2 in oldState) {
    const subPatch = oldState[key2];
    if (!(key2 in newState)) {
      continue;
    }
    const targetValue = newState[key2];
    if (isPlainObject$2(targetValue) && isPlainObject$2(subPatch) && !isRef(subPatch) && !isReactive(subPatch)) {
      newState[key2] = patchObject(targetValue, subPatch);
    } else {
      {
        newState[key2] = subPatch;
      }
    }
  }
  return newState;
}
const noop$1 = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop$1) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
const ACTION_MARKER = Symbol();
const ACTION_NAME = Symbol();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key2) => target.set(key2, value));
  } else if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key2 in patchToApply) {
    if (!patchToApply.hasOwnProperty(key2))
      continue;
    const subPatch = patchToApply[key2];
    const targetValue = target[key2];
    if (isPlainObject$2(targetValue) && isPlainObject$2(subPatch) && target.hasOwnProperty(key2) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key2] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key2] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = Symbol("pinia:skipHydration");
function shouldHydrate(obj) {
  return !isPlainObject$2(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign: assign$2 } = Object;
function isComputed(o2) {
  return !!(isRef(o2) && o2.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && !hot) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = hot ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      toRefs(ref(state ? state() : {}).value)
    ) : toRefs(pinia.state.value[id]);
    return assign$2(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      if (name in localState) {
        console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
      }
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign$2({ actions: {} }, options);
  if (!pinia._e.active) {
    throw new Error("Pinia destroyed");
  }
  const $subscribeOptions = { deep: true };
  {
    $subscribeOptions.onTrigger = (event) => {
      if (isListening) {
        debuggerEvents = event;
      } else if (isListening == false && !store._hotUpdating) {
        if (Array.isArray(debuggerEvents)) {
          debuggerEvents.push(event);
        } else {
          console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
        }
      }
    };
  }
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && !hot) {
    {
      pinia.state.value[$id] = {};
    }
  }
  const hotState = ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    {
      debuggerEvents = [];
    }
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick$1().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign$2($state, newState);
    });
  } : (
    /* istanbul ignore next */
    () => {
      throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
    }
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  const action = (fn, name = "") => {
    if (ACTION_MARKER in fn) {
      fn[ACTION_NAME] = name;
      return fn;
    }
    const wrappedAction = function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name: wrappedAction[ACTION_NAME],
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = fn.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
    wrappedAction[ACTION_MARKER] = true;
    wrappedAction[ACTION_NAME] = name;
    return wrappedAction;
  };
  const _hmrPayload = /* @__PURE__ */ markRaw({
    actions: {},
    getters: {},
    state: [],
    hotState
  });
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign$2({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(assign$2(
    {
      _hmrPayload,
      _customProperties: markRaw(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    partialStore
    // must be added later
    // setupStore
  ));
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(() => setup({ action }))));
  for (const key2 in setupStore) {
    const prop = setupStore[key2];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (hot) {
        set(hotState.value, key2, toRef(setupStore, key2));
      } else if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key2];
          } else {
            mergeReactiveObjects(prop, initialState[key2]);
          }
        }
        {
          pinia.state.value[$id][key2] = prop;
        }
      }
      {
        _hmrPayload.state.push(key2);
      }
    } else if (typeof prop === "function") {
      const actionValue = hot ? prop : action(prop, key2);
      {
        setupStore[key2] = actionValue;
      }
      {
        _hmrPayload.actions[key2] = prop;
      }
      optionsForPlugin.actions[key2] = prop;
    } else {
      if (isComputed(prop)) {
        _hmrPayload.getters[key2] = isOptionsStore ? (
          // @ts-expect-error
          options.getters[key2]
        ) : prop;
        if (IS_CLIENT) {
          const getters = setupStore._getters || // @ts-expect-error: same
          (setupStore._getters = markRaw([]));
          getters.push(key2);
        }
      }
    }
  }
  {
    assign$2(store, setupStore);
    assign$2(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => hot ? hotState.value : pinia.state.value[$id],
    set: (state) => {
      if (hot) {
        throw new Error("cannot set hotState");
      }
      $patch(($state) => {
        assign$2($state, state);
      });
    }
  });
  {
    store._hotUpdate = markRaw((newStore) => {
      store._hotUpdating = true;
      newStore._hmrPayload.state.forEach((stateKey) => {
        if (stateKey in store.$state) {
          const newStateTarget = newStore.$state[stateKey];
          const oldStateSource = store.$state[stateKey];
          if (typeof newStateTarget === "object" && isPlainObject$2(newStateTarget) && isPlainObject$2(oldStateSource)) {
            patchObject(newStateTarget, oldStateSource);
          } else {
            newStore.$state[stateKey] = oldStateSource;
          }
        }
        set(store, stateKey, toRef(newStore.$state, stateKey));
      });
      Object.keys(store.$state).forEach((stateKey) => {
        if (!(stateKey in newStore.$state)) {
          del(store, stateKey);
        }
      });
      isListening = false;
      isSyncListening = false;
      pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
      isSyncListening = true;
      nextTick$1().then(() => {
        isListening = true;
      });
      for (const actionName in newStore._hmrPayload.actions) {
        const actionFn = newStore[actionName];
        set(store, actionName, action(actionFn, actionName));
      }
      for (const getterName in newStore._hmrPayload.getters) {
        const getter = newStore._hmrPayload.getters[getterName];
        const getterValue = isOptionsStore ? (
          // special handling of options api
          computed(() => {
            setActivePinia(pinia);
            return getter.call(store, store);
          })
        ) : getter;
        set(store, getterName, getterValue);
      }
      Object.keys(store._hmrPayload.getters).forEach((key2) => {
        if (!(key2 in newStore._hmrPayload.getters)) {
          del(store, key2);
        }
      });
      Object.keys(store._hmrPayload.actions).forEach((key2) => {
        if (!(key2 in newStore._hmrPayload.actions)) {
          del(store, key2);
        }
      });
      store._hmrPayload = newStore._hmrPayload;
      store._getters = newStore._getters;
      store._hotUpdating = false;
    });
  }
  if (IS_CLIENT) {
    const nonEnumerable = {
      writable: true,
      configurable: true,
      // avoid warning on devtools trying to display this property
      enumerable: false
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p2) => {
      Object.defineProperty(store, p2, assign$2({ value: store[p2] }, nonEnumerable));
    });
  }
  pinia._p.forEach((extender) => {
    if (IS_CLIENT) {
      const extensions = scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      }));
      Object.keys(extensions || {}).forEach((key2) => store._customProperties.add(key2));
      assign$2(store, extensions);
    } else {
      assign$2(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
    console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
  }
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
// @__NO_SIDE_EFFECTS__
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    pinia || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    if (!activePinia) {
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    }
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
      {
        useStore._pinia = pinia;
      }
    }
    const store = pinia._s.get(id);
    if (hot) {
      const hotId = "__hot:" + id;
      const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign$2({}, options), pinia, true);
      hot._hotUpdate(newStore);
      delete pinia.state.value[hotId];
      pinia._s.delete(hotId);
    }
    if (IS_CLIENT) {
      const currentInstance2 = getCurrentInstance();
      if (currentInstance2 && currentInstance2.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance2.proxy;
        const cache2 = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache2[id] = store;
      }
    }
    return store;
  }
  useStore.$id = id;
  return useStore;
}
class FrameworkReadableState {
  constructor(state, key2, dehydrate, exportState) {
    this.s = state;
    this.k = key2;
    this.$dhy = dehydrate;
    this.$exp = exportState;
  }
  get v() {
    return this.$dhy(this.s);
  }
  get e() {
    return this.$exp(this.s);
  }
}
class FrameworkState extends FrameworkReadableState {
  constructor(state, key2, dehydrate, exportState, update) {
    super(state, key2, dehydrate, exportState);
    this.$upd = update;
  }
  set v(newValue) {
    this.$upd(this.s, newValue);
  }
  get v() {
    return super.v;
  }
}
const undefStr$4 = "undefined";
const ObjectCls$1 = Object;
const undefinedValue$1 = void 0;
const nullValue$1 = null;
const trueValue$1 = true;
const falseValue$1 = false;
const JSONStringify$1 = (value, replacer2, space) => JSON.stringify(value, replacer2, space);
const setTimeoutFn$1 = (fn, delay = 0) => setTimeout(fn, delay);
const objectKeys$1 = (obj) => ObjectCls$1.keys(obj);
const forEach$1 = (ary, fn) => ary.forEach(fn);
const pushItem$3 = (ary, ...item) => ary.push(...item);
const mapItem$3 = (ary, callbackfn) => ary.map(callbackfn);
const typeOf = (arg) => typeof arg;
const includes = (ary, target) => ary.includes(target);
typeof window === undefStr$4 && (typeof process !== undefStr$4 ? typeof process.cwd === "function" : typeof Deno !== undefStr$4);
const MEMORY$1 = "memory";
const STORAGE_RESTORE$1 = "restore";
const noop = () => {
};
const $self = (arg) => arg;
const isFn = (arg) => typeOf(arg) === "function";
const isNumber$1 = (arg) => typeOf(arg) === "number" && !Number.isNaN(arg);
const isString$2 = (arg) => typeOf(arg) === "string";
const globalToString = (arg) => ObjectCls$1.prototype.toString.call(arg);
const isPlainObject$1 = (arg) => globalToString(arg) === "[object Object]";
const instanceOf = (arg, cls) => arg instanceof cls;
const getTime = (date) => date ? date.getTime() : Date.now();
const getContext = (methodInstance) => methodInstance.context;
const getConfig = (methodInstance) => methodInstance.config;
const getContextOptions = (alovaInstance) => alovaInstance.options;
const getOptions = (methodInstance) => getContextOptions(getContext(methodInstance));
const key = (methodInstance) => {
  const { params, headers } = getConfig(methodInstance);
  return JSONStringify$1([methodInstance.type, methodInstance.url, params, methodInstance.data, headers]);
};
const getMethodInternalKey = (methodInstance) => methodInstance.key;
const getHandlerMethod = (methodHandler, assert, args = []) => {
  const methodInstance = isFn(methodHandler) ? methodHandler(...args) : methodHandler;
  assert(!!methodInstance.key, "hook handler must be a method instance or a function that returns method instance");
  return methodInstance;
};
const isSpecialRequestBody = (data) => {
  const dataTypeString = globalToString(data);
  return /^\[object (Blob|FormData|ReadableStream|URLSearchParams)\]$/i.test(dataTypeString) || instanceOf(data, ArrayBuffer);
};
const objAssign = (target, ...sources) => ObjectCls$1.assign(target, ...sources);
const omit = (obj, ...keys2) => {
  const result = {};
  for (const key2 in obj) {
    if (!keys2.includes(key2)) {
      result[key2] = obj[key2];
    }
  }
  return result;
};
function usePromise() {
  let retResolve;
  let retReject;
  const promise = new Promise((resolve2, reject) => {
    retResolve = resolve2;
    retReject = reject;
  });
  return { promise, resolve: retResolve, reject: retReject };
}
const getLocalCacheConfigParam = (methodInstance) => {
  const { cacheFor } = getConfig(methodInstance);
  const getCacheExpireTs = (cacheExpire) => isNumber$1(cacheExpire) ? getTime() + cacheExpire : getTime(cacheExpire || undefinedValue$1);
  let cacheMode = MEMORY$1;
  let expire = () => 0;
  let store = falseValue$1;
  let tag = undefinedValue$1;
  const controlled = isFn(cacheFor);
  if (!controlled) {
    let expireColumn = cacheFor;
    if (isPlainObject$1(cacheFor)) {
      const { mode = MEMORY$1, expire: expire2, tag: configTag } = cacheFor || {};
      cacheMode = mode;
      store = mode === STORAGE_RESTORE$1;
      tag = configTag ? configTag.toString() : undefinedValue$1;
      expireColumn = expire2;
    }
    expire = (mode) => getCacheExpireTs(isFn(expireColumn) ? expireColumn({ method: methodInstance, mode }) : expireColumn);
  }
  return {
    f: cacheFor,
    c: controlled,
    e: expire,
    m: cacheMode,
    s: store,
    t: tag
  };
};
const newInstance$1 = (Cls, ...args) => new Cls(...args);
const sloughConfig = (config, args = []) => isFn(config) ? config(...args) : config;
const sloughFunction = (arg, defaultFn) => isFn(arg) ? arg : ![falseValue$1, nullValue$1].includes(arg) ? defaultFn : noop;
const createSyncOnceRunner = (delay = 0) => {
  let timer = undefinedValue$1;
  return (fn) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeoutFn$1(fn, delay);
  };
};
function statesHookHelper(statesHook2, referingObject = { trackedKeys: {}, bindError: falseValue$1 }) {
  const ref2 = (initialValue) => statesHook2.ref ? statesHook2.ref(initialValue) : { current: initialValue };
  referingObject = ref2(referingObject).current;
  const exportState = (state) => (statesHook2.export || $self)(state, referingObject);
  const memorize = (fn) => {
    if (!isFn(statesHook2.memorize)) {
      return fn;
    }
    const memorizedFn = statesHook2.memorize(fn);
    memorizedFn.memorized = true;
    return memorizedFn;
  };
  const { dehydrate } = statesHook2;
  const update = (newValue, state, key2) => newValue !== dehydrate(state, key2, referingObject) && referingObject.trackedKeys[key2] && statesHook2.update(newValue, state, key2, referingObject);
  const mapDeps = (deps) => mapItem$3(deps, (item) => instanceOf(item, FrameworkReadableState) ? item.e : item);
  const createdStateList = [];
  const depKeys = {};
  return {
    create: (initialValue, key2) => {
      pushItem$3(createdStateList, key2);
      return newInstance$1(FrameworkState, statesHook2.create(initialValue, key2, referingObject), key2, (state) => dehydrate(state, key2, referingObject), exportState, (state, newValue) => update(newValue, state, key2));
    },
    computed: (getter, depList, key2) => {
      forEach$1(depList, (dep) => {
        if (dep.k) {
          depKeys[dep.k] = true;
        }
      });
      return newInstance$1(FrameworkReadableState, statesHook2.computed(getter, mapDeps(depList), key2, referingObject), key2, (state) => dehydrate(state, key2, referingObject), exportState);
    },
    effectRequest: (effectRequestParams) => statesHook2.effectRequest(effectRequestParams, referingObject),
    ref: ref2,
    watch: (source, callback) => statesHook2.watch(mapDeps(source), callback, referingObject),
    onMounted: (callback) => statesHook2.onMounted(callback, referingObject),
    onUnmounted: (callback) => statesHook2.onUnmounted(callback, referingObject),
    /**
     * refering object that sharing some value with this object.
     */
    __referingObj: referingObject,
    /**
     * expose provider for specified use hook.
     * @param object object that contains state proxy, framework state, operating function and event binder.
     * @returns provider component.
     */
    exposeProvider: (object) => {
      const provider = {};
      const originalStatesMap = {};
      for (const key2 in object) {
        const value = object[key2];
        const isValueFunction = isFn(value);
        if (isValueFunction) {
          provider[key2] = key2.startsWith("on") ? (...args) => {
            value(...args);
            return completedProvider;
          } : value.memorized ? value : memorize(value);
        } else {
          const isFrameworkState = instanceOf(value, FrameworkReadableState);
          if (isFrameworkState) {
            originalStatesMap[key2] = value.s;
          }
          ObjectCls$1.defineProperty(provider, key2, {
            get: () => {
              referingObject.trackedKeys[key2] = trueValue$1;
              return isFrameworkState ? value.e : value;
            },
            // set need to set an function,
            // otherwise it will throw `TypeError: Cannot set property __referingObj of #<Object> which has only a getter` when setting value
            set: noop,
            enumerable: trueValue$1,
            configurable: trueValue$1
          });
        }
      }
      const { update: nestedHookUpdate, __proxyState: nestedProxyState } = provider;
      referingObject.trackedKeys = __spreadValues({}, depKeys);
      referingObject.bindError = falseValue$1;
      const extraProvider = {
        // expose referingObject automatically.
        __referingObj: referingObject,
        // the new updating function that can update the new states and nested hook states.
        update: memorize((newStates) => {
          objectKeys$1(newStates).forEach((key2) => {
            if (includes(createdStateList, key2)) {
              update(newStates[key2], originalStatesMap[key2], key2);
            } else if (key2 in provider && isFn(nestedHookUpdate)) {
              nestedHookUpdate({
                [key2]: newStates[key2]
              });
            }
          });
        }),
        __proxyState: memorize((key2) => {
          if (includes(createdStateList, key2) && instanceOf(object[key2], FrameworkReadableState)) {
            referingObject.trackedKeys[key2] = trueValue$1;
            return object[key2];
          }
          return nestedProxyState(key2);
        })
      };
      const completedProvider = objAssign(provider, extraProvider);
      return completedProvider;
    },
    /**
     * transform state proxies to object.
     * @param states proxy array of framework states
     * @param filterKey filter key of state proxy
     * @returns an object that contains the states of target form
     */
    objectify: (states, filterKey) => states.reduce((result, item) => {
      result[item.k] = filterKey ? item[filterKey] : item;
      return result;
    }, {}),
    transformState2Proxy: (state, key2) => newInstance$1(FrameworkState, state, key2, (state2) => dehydrate(state2, key2, referingObject), exportState, (state2, newValue) => update(newValue, state2, key2))
  };
}
const cacheKeyPrefix = "$a.";
const buildNamespacedCacheKey = (namespace, key2) => cacheKeyPrefix + namespace + key2;
const undefStr$3 = "undefined";
const PromiseCls = Promise;
const promiseResolve = (value) => PromiseCls.resolve(value);
const promiseReject = (value) => PromiseCls.reject(value);
const ObjectCls = Object;
const RegExpCls = RegExp;
const undefinedValue = void 0;
const nullValue = null;
const trueValue = true;
const falseValue = false;
const promiseThen = (promise, onFulfilled, onrejected) => promise.then(onFulfilled, onrejected);
const promiseCatch = (promise, onrejected) => promise.catch(onrejected);
const promiseFinally = (promise, onfinally) => promise.finally(onfinally);
const JSONStringify = (value, replacer2, space) => JSON.stringify(value, replacer2, space);
const JSONParse = (value) => JSON.parse(value);
const setTimeoutFn = (fn, delay = 0) => setTimeout(fn, delay);
const clearTimeoutTimer = (timer) => clearTimeout(timer);
const objectKeys = (obj) => ObjectCls.keys(obj);
const forEach = (ary, fn) => ary.forEach(fn);
const pushItem$2 = (ary, ...item) => ary.push(...item);
const mapItem$2 = (ary, callbackfn) => ary.map(callbackfn);
const filterItem$2 = (ary, predicate) => ary.filter(predicate);
const len = (data) => data.length;
const isArray$2 = (arg) => Array.isArray(arg);
const deleteAttr = (arg, attr) => delete arg[attr];
const defaultIsSSR = typeof window === undefStr$3 && (typeof process !== undefStr$3 ? typeof process.cwd === "function" : typeof Deno !== undefStr$3);
const MEMORY = "memory";
const STORAGE_RESTORE = "restore";
const undefStr$2 = "undefined";
typeof window === undefStr$2 && (typeof process !== undefStr$2 ? typeof process.cwd === "function" : typeof Deno !== undefStr$2);
const newInstance = (Cls, ...args) => new Cls(...args);
class AlovaError extends Error {
  constructor(prefix, message, errorCode) {
    super(message + (errorCode ? `

For detailed: https://alova.js.org/error#${errorCode}` : ""));
    this.name = `[alova${prefix ? `/${prefix}` : ""}]`;
  }
}
const createAssert = (prefix = "") => (expression, message, errorCode) => {
  if (!expression) {
    throw newInstance(AlovaError, prefix, message, errorCode);
  }
};
let globalConfigMap = {
  autoHitCache: "global",
  ssr: defaultIsSSR
};
const titleStyle$1 = "color: black; font-size: 12px; font-weight: bolder";
var defaultCacheLogger = (response, methodInstance, cacheMode, tag) => {
  const cole = console;
  const log = (...args) => console.log(...args);
  const { url } = methodInstance;
  const isRestoreMode = cacheMode === STORAGE_RESTORE;
  const hdStyle = "\x1B[42m%s\x1B[49m";
  const labelStyle2 = "\x1B[32m%s\x1B[39m";
  const startSep = ` [HitCache]${url} `;
  const endSepFn = () => Array(len(startSep) + 1).join("^");
  if (globalConfigMap.ssr) {
    log(hdStyle, startSep);
    log(labelStyle2, " Cache ", response);
    log(labelStyle2, " Mode  ", cacheMode);
    isRestoreMode && log(labelStyle2, " Tag   ", tag);
    log(labelStyle2, endSepFn());
  } else {
    cole.groupCollapsed ? cole.groupCollapsed("%cHitCache", "padding: 2px 6px; background: #c4fcd3; color: #53b56d;", url) : log(hdStyle, startSep);
    log("%c[Cache]", titleStyle$1, response);
    log("%c[Mode]", titleStyle$1, cacheMode);
    isRestoreMode && log("%c[Tag]", titleStyle$1, tag);
    log("%c[Method]", titleStyle$1, methodInstance);
    cole.groupEnd ? cole.groupEnd() : log(labelStyle2, endSepFn());
  }
};
const hitSourceStringCacheKey = (key2) => `hss.${key2}`;
const hitSourceRegexpPrefix = "hsr.";
const hitSourceRegexpCacheKey = (regexpStr) => hitSourceRegexpPrefix + regexpStr;
const unifiedHitSourceRegexpCacheKey = "$$hsrs";
const regexpSourceFlagSeparator = "__$<>$__";
const addItem = (obj, item) => {
  obj[item] = 0;
};
const setWithCacheAdapter = (namespace, key2, data, expireTimestamp, cacheAdapter, hitSource, tag) => __async(exports, null, function* () {
  if (expireTimestamp > getTime() && data) {
    const methodCacheKey = buildNamespacedCacheKey(namespace, key2);
    yield cacheAdapter.set(methodCacheKey, filterItem$2([data, expireTimestamp === Infinity ? undefinedValue : expireTimestamp, tag], Boolean));
    if (hitSource) {
      const hitSourceKeys = {};
      const hitSourceRegexpSources = [];
      forEach(hitSource, (sourceItem) => {
        const isRegexp = instanceOf(sourceItem, RegExpCls);
        const targetHitSourceKey = isRegexp ? sourceItem.source + (sourceItem.flags ? regexpSourceFlagSeparator + sourceItem.flags : "") : sourceItem;
        if (targetHitSourceKey) {
          if (isRegexp && !hitSourceKeys[targetHitSourceKey]) {
            pushItem$2(hitSourceRegexpSources, targetHitSourceKey);
          }
          addItem(hitSourceKeys, isRegexp ? hitSourceRegexpCacheKey(targetHitSourceKey) : hitSourceStringCacheKey(targetHitSourceKey));
        }
      });
      const promises = mapItem$2(objectKeys(hitSourceKeys), (hitSourceKey) => __async(exports, null, function* () {
        const targetMethodKeys = (yield cacheAdapter.get(hitSourceKey)) || {};
        addItem(targetMethodKeys, methodCacheKey);
        yield cacheAdapter.set(hitSourceKey, targetMethodKeys);
      }));
      const saveRegexp = () => __async(exports, null, function* () {
        if (len(hitSourceRegexpSources)) {
          const regexpList = (yield cacheAdapter.get(unifiedHitSourceRegexpCacheKey)) || [];
          pushItem$2(regexpList, ...hitSourceRegexpSources);
          yield cacheAdapter.set(unifiedHitSourceRegexpCacheKey, regexpList);
        }
      });
      yield PromiseCls.all([...promises, saveRegexp()]);
    }
  }
});
const removeWithCacheAdapter = (namespace, key2, cacheAdapter) => __async(exports, null, function* () {
  const methodStoreKey = buildNamespacedCacheKey(namespace, key2);
  yield cacheAdapter.remove(methodStoreKey);
});
const getRawWithCacheAdapter = (namespace, key2, cacheAdapter, tag) => __async(exports, null, function* () {
  const storagedData = yield cacheAdapter.get(buildNamespacedCacheKey(namespace, key2));
  if (storagedData) {
    const [_2, expireTimestamp, storedTag] = storagedData;
    if (storedTag === tag && (!expireTimestamp || expireTimestamp > getTime())) {
      return storagedData;
    }
    yield removeWithCacheAdapter(namespace, key2, cacheAdapter);
  }
});
const getWithCacheAdapter = (namespace, key2, cacheAdapter, tag) => __async(exports, null, function* () {
  const rawData = yield getRawWithCacheAdapter(namespace, key2, cacheAdapter, tag);
  return rawData ? rawData[0] : undefinedValue;
});
const hitTargetCacheWithCacheAdapter = (sourceKey, sourceName, cacheAdapter) => __async(exports, null, function* () {
  const sourceNameStr = `${sourceName}`;
  const sourceTargetKeyMap = {};
  const hitSourceKey = hitSourceStringCacheKey(sourceKey);
  sourceTargetKeyMap[hitSourceKey] = yield cacheAdapter.get(hitSourceKey);
  let unifiedHitSourceRegexpChannel;
  if (sourceName) {
    const hitSourceName = hitSourceStringCacheKey(sourceNameStr);
    sourceTargetKeyMap[hitSourceName] = yield cacheAdapter.get(hitSourceName);
    unifiedHitSourceRegexpChannel = yield cacheAdapter.get(unifiedHitSourceRegexpCacheKey);
    const matchedRegexpStrings = [];
    if (unifiedHitSourceRegexpChannel && len(unifiedHitSourceRegexpChannel)) {
      forEach(unifiedHitSourceRegexpChannel, (regexpStr) => {
        const [source, flag] = regexpStr.split(regexpSourceFlagSeparator);
        if (newInstance$1(RegExpCls, source, flag).test(sourceNameStr)) {
          pushItem$2(matchedRegexpStrings, regexpStr);
        }
      });
      yield PromiseCls.all(mapItem$2(matchedRegexpStrings, (regexpString) => __async(exports, null, function* () {
        const hitSourceRegexpString = hitSourceRegexpCacheKey(regexpString);
        sourceTargetKeyMap[hitSourceRegexpString] = yield cacheAdapter.get(hitSourceRegexpString);
      })));
    }
  }
  const removeWithTargetKey = (targetKey) => __async(exports, null, function* () {
    try {
      yield cacheAdapter.remove(targetKey);
      for (const sourceKey2 in sourceTargetKeyMap) {
        const targetKeys = sourceTargetKeyMap[sourceKey2];
        if (targetKeys) {
          deleteAttr(targetKeys, targetKey);
        }
      }
    } catch (error) {
    }
  });
  const accessedKeys = {};
  yield PromiseCls.all(mapItem$2(objectKeys(sourceTargetKeyMap), (sourceKey2) => __async(exports, null, function* () {
    const targetKeys = sourceTargetKeyMap[sourceKey2];
    if (targetKeys) {
      const removingPromises = [];
      for (const key2 in targetKeys) {
        if (!accessedKeys[key2]) {
          addItem(accessedKeys, key2);
          pushItem$2(removingPromises, removeWithTargetKey(key2));
        }
      }
      yield PromiseCls.all(removingPromises);
    }
  })));
  const unifiedHitSourceRegexpChannelLen = len(unifiedHitSourceRegexpChannel || []);
  yield PromiseCls.all(mapItem$2(objectKeys(sourceTargetKeyMap), (sourceKey2) => __async(exports, null, function* () {
    const targetKeys = sourceTargetKeyMap[sourceKey2];
    if (targetKeys) {
      if (len(objectKeys(targetKeys))) {
        yield cacheAdapter.set(sourceKey2, targetKeys);
      } else {
        yield cacheAdapter.remove(sourceKey2);
        if (sourceKey2.includes(hitSourceRegexpPrefix) && unifiedHitSourceRegexpChannel) {
          unifiedHitSourceRegexpChannel = filterItem$2(unifiedHitSourceRegexpChannel, (rawRegexpStr) => hitSourceRegexpCacheKey(rawRegexpStr) !== sourceKey2);
        }
      }
    }
  })));
  if (unifiedHitSourceRegexpChannelLen !== len(unifiedHitSourceRegexpChannel || [])) {
    yield cacheAdapter.set(unifiedHitSourceRegexpCacheKey, unifiedHitSourceRegexpChannel);
  }
});
var cloneMethod = (methodInstance) => {
  const { data, config } = methodInstance;
  const newConfig = __spreadValues({}, config);
  const { headers = {}, params = {} } = newConfig;
  const ctx = getContext(methodInstance);
  newConfig.headers = __spreadValues({}, headers);
  newConfig.params = __spreadValues({}, params);
  const newMethod = newInstance$1(Method, methodInstance.type, ctx, methodInstance.url, newConfig, data);
  return objAssign(newMethod, __spreadProps(__spreadValues({}, methodInstance), {
    config: newConfig
  }));
};
const queryCache = (_0, ..._1) => __async(exports, [_0, ..._1], function* (matcher, { policy = "all" } = {}) {
  if (matcher && matcher.key) {
    const { id, l1Cache, l2Cache } = getContext(matcher);
    const methodKey = getMethodInternalKey(matcher);
    const { f: cacheFor, c: controlled, s: store, e: expireMilliseconds, t: tag } = getLocalCacheConfigParam(matcher);
    if (controlled) {
      return cacheFor();
    }
    let cachedData = policy !== "l2" ? yield getWithCacheAdapter(id, methodKey, l1Cache) : undefinedValue;
    if (policy === "l2") {
      cachedData = yield getWithCacheAdapter(id, methodKey, l2Cache, tag);
    } else if (policy === "all" && !cachedData) {
      if (store && expireMilliseconds(STORAGE_RESTORE) > getTime()) {
        cachedData = yield getWithCacheAdapter(id, methodKey, l2Cache, tag);
      }
    }
    return cachedData;
  }
});
const hitCacheBySource = (sourceMethod) => __async(exports, null, function* () {
  const { autoHitCache } = globalConfigMap;
  const { l1Cache, l2Cache } = getContext(sourceMethod);
  const sourceKey = getMethodInternalKey(sourceMethod);
  const { name: sourceName } = getConfig(sourceMethod);
  const cacheAdaptersInvolved = {
    global: [...usingL1CacheAdapters, ...usingL2CacheAdapters],
    self: [l1Cache, l2Cache],
    close: []
  }[autoHitCache];
  if (cacheAdaptersInvolved && len(cacheAdaptersInvolved)) {
    yield PromiseCls.all(mapItem$2(cacheAdaptersInvolved, (involvedCacheAdapter) => hitTargetCacheWithCacheAdapter(sourceKey, sourceName, involvedCacheAdapter)));
  }
});
const adapterReturnMap = {};
const buildCompletedURL = (baseURL, url, params) => {
  baseURL = baseURL.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
  if (url !== "") {
    url = url.match(/^(\/|https?:\/\/)/) ? url : `/${url}`;
  }
  const completeURL = baseURL + url;
  const paramsStr = mapItem$2(filterItem$2(objectKeys(params), (key2) => params[key2] !== undefinedValue), (key2) => `${key2}=${params[key2]}`).join("&");
  return paramsStr ? +completeURL.includes("?") ? `${completeURL}&${paramsStr}` : `${completeURL}?${paramsStr}` : completeURL;
};
function sendRequest(methodInstance, forceRequest) {
  let fromCache = trueValue;
  let requestAdapterCtrlsPromiseResolveFn;
  const requestAdapterCtrlsPromise = newInstance$1(PromiseCls, (resolve2) => {
    requestAdapterCtrlsPromiseResolveFn = resolve2;
  });
  const response = () => __async(this, null, function* () {
    const { beforeRequest = noop, responded, requestAdapter: requestAdapter2, cacheLogger } = getOptions(methodInstance);
    const methodKey = getMethodInternalKey(methodInstance);
    const { s: toStorage, t: tag, m: cacheMode, e: expireMilliseconds } = getLocalCacheConfigParam(methodInstance);
    const { id, l1Cache, l2Cache, snapshots } = getContext(methodInstance);
    const { cacheFor } = getConfig(methodInstance);
    const { hitSource: methodHitSource } = methodInstance;
    let cachedResponse = yield isFn(cacheFor) ? cacheFor() : (
      // 如果是强制请求的，则跳过从缓存中获取的步骤
      // 否则判断是否使用缓存数据
      forceRequest ? undefinedValue : getWithCacheAdapter(id, methodKey, l1Cache)
    );
    if (cacheMode === STORAGE_RESTORE && !cachedResponse) {
      const rawL2CacheData = yield getRawWithCacheAdapter(id, methodKey, l2Cache, tag);
      if (rawL2CacheData) {
        const [l2Response, l2ExpireMilliseconds] = rawL2CacheData;
        yield setWithCacheAdapter(id, methodKey, l2Response, l2ExpireMilliseconds, l1Cache, methodHitSource);
        cachedResponse = l2Response;
      }
    }
    const clonedMethod = cloneMethod(methodInstance);
    yield beforeRequest(clonedMethod);
    const { baseURL, url: newUrl, type, data } = clonedMethod;
    const { params = {}, headers = {}, transform = $self, shareRequest } = getConfig(clonedMethod);
    const namespacedAdapterReturnMap = adapterReturnMap[id] = adapterReturnMap[id] || {};
    let requestAdapterCtrls = namespacedAdapterReturnMap[methodKey];
    let responseSuccessHandler = $self;
    let responseErrorHandler = undefinedValue;
    let responseCompleteHandler = noop;
    if (isFn(responded)) {
      responseSuccessHandler = responded;
    } else if (isPlainObject$1(responded)) {
      const { onSuccess: successHandler, onError: errorHandler, onComplete: completeHandler } = responded;
      responseSuccessHandler = isFn(successHandler) ? successHandler : responseSuccessHandler;
      responseErrorHandler = isFn(errorHandler) ? errorHandler : responseErrorHandler;
      responseCompleteHandler = isFn(completeHandler) ? completeHandler : responseCompleteHandler;
    }
    if (cachedResponse !== undefinedValue) {
      requestAdapterCtrlsPromiseResolveFn();
      sloughFunction(cacheLogger, defaultCacheLogger)(cachedResponse, clonedMethod, cacheMode, tag);
      responseCompleteHandler(clonedMethod);
      return cachedResponse;
    }
    fromCache = falseValue;
    if (!shareRequest || !requestAdapterCtrls) {
      const ctrls = requestAdapter2({
        url: buildCompletedURL(baseURL, newUrl, params),
        type,
        data,
        headers
      }, clonedMethod);
      requestAdapterCtrls = namespacedAdapterReturnMap[methodKey] = ctrls;
    }
    requestAdapterCtrlsPromiseResolveFn(requestAdapterCtrls);
    const handleResponseTask = (_0, _1, ..._2) => __async(this, [_0, _1, ..._2], function* (handlerReturns, responseHeaders, callInSuccess = trueValue) {
      const responseData = yield handlerReturns;
      const transformedData = yield transform(responseData, responseHeaders || {});
      snapshots.save(methodInstance);
      try {
        yield hitCacheBySource(clonedMethod);
      } catch (error) {
      }
      const requestBody = clonedMethod.data;
      const toCache = !requestBody || !isSpecialRequestBody(requestBody);
      if (toCache && callInSuccess) {
        try {
          yield PromiseCls.all([
            setWithCacheAdapter(id, methodKey, transformedData, expireMilliseconds(MEMORY), l1Cache, methodHitSource),
            toStorage && setWithCacheAdapter(id, methodKey, transformedData, expireMilliseconds(STORAGE_RESTORE), l2Cache, methodHitSource, tag)
          ]);
        } catch (error) {
        }
      }
      return transformedData;
    });
    return promiseFinally(promiseThen(PromiseCls.all([requestAdapterCtrls.response(), requestAdapterCtrls.headers()]), ([rawResponse, rawHeaders]) => {
      deleteAttr(namespacedAdapterReturnMap, methodKey);
      return handleResponseTask(responseSuccessHandler(rawResponse, clonedMethod), rawHeaders);
    }, (error) => {
      deleteAttr(namespacedAdapterReturnMap, methodKey);
      return isFn(responseErrorHandler) ? (
        // 响应错误时，如果未抛出错误也将会处理响应成功的流程，但不缓存数据
        handleResponseTask(responseErrorHandler(error, clonedMethod), undefinedValue, falseValue)
      ) : promiseReject(error);
    }), () => {
      responseCompleteHandler(clonedMethod);
    });
  });
  return {
    // 请求中断函数
    abort: () => {
      promiseThen(requestAdapterCtrlsPromise, (requestAdapterCtrls) => requestAdapterCtrls && requestAdapterCtrls.abort());
    },
    onDownload: (handler) => {
      promiseThen(requestAdapterCtrlsPromise, (requestAdapterCtrls) => requestAdapterCtrls && requestAdapterCtrls.onDownload && requestAdapterCtrls.onDownload(handler));
    },
    onUpload: (handler) => {
      promiseThen(requestAdapterCtrlsPromise, (requestAdapterCtrls) => requestAdapterCtrls && requestAdapterCtrls.onUpload && requestAdapterCtrls.onUpload(handler));
    },
    response,
    fromCache: () => fromCache
  };
}
const offEventCallback = (offHandler, handlers) => () => {
  const index2 = handlers.indexOf(offHandler);
  index2 >= 0 && handlers.splice(index2, 1);
};
class Method {
  constructor(type, context, url, config, data) {
    this.dhs = [];
    this.uhs = [];
    this.fromCache = undefinedValue;
    const abortRequest = () => {
      abortRequest.a();
    };
    abortRequest.a = noop;
    const instance = this;
    const contextOptions = getContextOptions(context);
    instance.abort = abortRequest;
    instance.baseURL = contextOptions.baseURL || "";
    instance.url = url;
    instance.type = type;
    instance.context = context;
    const contextConcatConfig = {};
    const mergedLocalCacheKey = "cacheFor";
    const globalLocalCache = isPlainObject$1(contextOptions[mergedLocalCacheKey]) ? contextOptions[mergedLocalCacheKey][type] : undefinedValue;
    const hitSource = config && config.hitSource;
    forEach(["timeout", "shareRequest"], (mergedKey) => {
      if (contextOptions[mergedKey] !== undefinedValue) {
        contextConcatConfig[mergedKey] = contextOptions[mergedKey];
      }
    });
    if (globalLocalCache !== undefinedValue) {
      contextConcatConfig[mergedLocalCacheKey] = globalLocalCache;
    }
    if (hitSource) {
      instance.hitSource = mapItem$2(isArray$2(hitSource) ? hitSource : [hitSource], (sourceItem) => instanceOf(sourceItem, Method) ? getMethodInternalKey(sourceItem) : sourceItem);
      deleteAttr(config, "hitSource");
    }
    instance.config = __spreadValues(__spreadProps(__spreadValues({}, contextConcatConfig), {
      headers: {},
      params: {}
    }), config || {});
    instance.data = data;
    instance.meta = config ? config.meta : instance.meta;
    instance.key = instance.generateKey();
  }
  /**
   * 绑定下载进度回调函数
   * @param progressHandler 下载进度回调函数
   * @version 2.17.0
   * @return 解绑函数
   */
  onDownload(downloadHandler) {
    pushItem$2(this.dhs, downloadHandler);
    return offEventCallback(downloadHandler, this.dhs);
  }
  /**
   * 绑定上传进度回调函数
   * @param progressHandler 上传进度回调函数
   * @version 2.17.0
   * @return 解绑函数
   */
  onUpload(uploadHandler) {
    pushItem$2(this.uhs, uploadHandler);
    return offEventCallback(uploadHandler, this.uhs);
  }
  /**
   * 通过method实例发送请求，返回promise对象
   */
  send(forceRequest = falseValue) {
    const instance = this;
    const { response, onDownload, onUpload, abort, fromCache } = sendRequest(instance, forceRequest);
    len(instance.dhs) > 0 && onDownload((loaded, total) => forEach(instance.dhs, (handler) => handler({ loaded, total })));
    len(instance.uhs) > 0 && onUpload((loaded, total) => forEach(instance.uhs, (handler) => handler({ loaded, total })));
    instance.abort.a = abort;
    instance.fromCache = undefinedValue;
    instance.promise = promiseThen(response(), (r) => {
      instance.fromCache = fromCache();
      return r;
    });
    return instance.promise;
  }
  /**
   * 设置方法名称，如果已有名称将被覆盖
   * @param name 方法名称
   */
  setName(name) {
    getConfig(this).name = name;
  }
  generateKey() {
    return key(this);
  }
  /**
   * 绑定resolve和/或reject Promise的callback
   * @param onfulfilled resolve Promise时要执行的回调
   * @param onrejected 当Promise被reject时要执行的回调
   * @returns 返回一个Promise，用于执行任何回调
   */
  then(onfulfilled, onrejected) {
    return promiseThen(this.send(), onfulfilled, onrejected);
  }
  /**
   * 绑定一个仅用于reject Promise的回调
   * @param onrejected 当Promise被reject时要执行的回调
   * @returns 返回一个完成回调的Promise
   */
  catch(onrejected) {
    return promiseCatch(this.send(), onrejected);
  }
  /**
   * 绑定一个回调，该回调在Promise结算（resolve或reject）时调用
   * @param onfinally Promise结算（resolve或reject）时执行的回调。
   * @return 返回一个完成回调的Promise。
   */
  finally(onfinally) {
    return promiseFinally(this.send(), onfinally);
  }
}
const myAssert = createAssert();
const undefStr$1 = "undefined";
const pushItem$1 = (ary, ...item) => ary.push(...item);
const mapItem$1 = (ary, callbackfn) => ary.map(callbackfn);
const filterItem$1 = (ary, predicate) => ary.filter(predicate);
typeof window === undefStr$1 && (typeof process !== undefStr$1 ? typeof process.cwd === "function" : typeof Deno !== undefStr$1);
const createEventManager$1 = () => {
  const eventMap = {};
  return {
    eventMap,
    on(type, handler) {
      const eventTypeItem = eventMap[type] = eventMap[type] || [];
      pushItem$1(eventTypeItem, handler);
      return () => {
        eventMap[type] = filterItem$1(eventTypeItem, (item) => item !== handler);
      };
    },
    off(type, handler) {
      const handlers = eventMap[type];
      if (!handlers) {
        return;
      }
      if (handler) {
        const index2 = handlers.indexOf(handler);
        index2 > -1 && handlers.splice(index2, 1);
      } else {
        delete eventMap[type];
      }
    },
    emit(type, event) {
      const handlers = eventMap[type] || [];
      return mapItem$1(handlers, (handler) => handler(event));
    }
  };
};
const EVENT_SUCCESS_KEY = "success";
const memoryAdapter = () => {
  let l1Cache = {};
  const l1CacheEmitter = createEventManager$1();
  const adapter = {
    set(key2, value) {
      l1Cache[key2] = value;
      l1CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: "set", key: key2, value, container: l1Cache });
    },
    get: (key2) => {
      const value = l1Cache[key2];
      l1CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: "get", key: key2, value, container: l1Cache });
      return value;
    },
    remove(key2) {
      deleteAttr(l1Cache, key2);
      l1CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: "remove", key: key2, container: l1Cache });
    },
    clear: () => {
      l1Cache = {};
      l1CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: "clear", key: "", container: l1Cache });
    },
    emitter: l1CacheEmitter
  };
  return adapter;
};
const storage = () => {
  myAssert(typeof localStorage !== "undefined", "l2Cache is not defined.");
  return localStorage;
};
const localStorageAdapter = () => {
  const l2CacheEmitter = createEventManager$1();
  const adapter = {
    set: (key2, value) => {
      storage().setItem(key2, JSONStringify(value));
      l2CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: "set", key: key2, value, container: storage() });
    },
    get: (key2) => {
      const data = storage().getItem(key2);
      const value = data ? JSONParse(data) : data;
      l2CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: "get", key: key2, value, container: storage() });
      return value;
    },
    remove: (key2) => {
      storage().removeItem(key2);
      l2CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: "remove", key: key2, container: storage() });
    },
    clear: () => {
      storage().clear();
      l2CacheEmitter.emit(EVENT_SUCCESS_KEY, { type: "clear", key: "", container: storage() });
    },
    emitter: l2CacheEmitter
  };
  return adapter;
};
const SetCls = Set;
class MethodSnapshotContainer {
  constructor(capacity) {
    this.records = {};
    this.occupy = 0;
    myAssert(capacity >= 0, "expected snapshots limit to be >= 0");
    this.capacity = capacity;
  }
  /**
   * 保存method实例快照
   * @param methodInstance method实例
   */
  save(methodInstance) {
    const { name } = getConfig(methodInstance);
    const { records, occupy, capacity } = this;
    if (name && occupy < capacity) {
      const targetSnapshots = records[name] = records[name] || newInstance$1(SetCls);
      targetSnapshots.add(methodInstance);
      this.occupy += 1;
    }
  }
  /**
   * 获取Method实例快照，它将根据matcher来筛选出对应的Method实例
   * @param matcher 匹配的快照名称，可以是字符串或正则表达式、或带过滤函数的对象
   * @returns 匹配到的Method实例快照数组
   */
  match(matcher, matchAll = true) {
    let nameString;
    let nameReg;
    let matchHandler;
    let nameMatcher = matcher;
    if (isPlainObject$1(matcher)) {
      nameMatcher = matcher.name;
      matchHandler = matcher.filter;
    }
    if (instanceOf(nameMatcher, RegExpCls)) {
      nameReg = nameMatcher;
    } else if (isString$2(nameMatcher)) {
      nameString = nameMatcher;
    }
    const { records } = this;
    let matches = newInstance$1(SetCls);
    if (nameString) {
      matches = records[nameString] || matches;
    } else if (nameReg) {
      forEach(filterItem$2(objectKeys(records), (methodName) => nameReg.test(methodName)), (methodName) => {
        records[methodName].forEach((method) => matches.add(method));
      });
    }
    const fromMatchesArray = isFn(matchHandler) ? filterItem$2([...matches], matchHandler) : [...matches];
    return matchAll ? fromMatchesArray : fromMatchesArray[0];
  }
}
const typeGet = "GET";
const typeHead = "HEAD";
const typePost = "POST";
const typePut = "PUT";
const typePatch = "PATCH";
const typeDelete = "DELETE";
const typeOptions = "OPTIONS";
const defaultAlovaOptions = {
  /**
   * GET请求默认缓存5分钟（300000毫秒），其他请求默认不缓存
   */
  cacheFor: {
    [typeGet]: 3e5
  },
  /**
   * 共享请求默认为true
   */
  shareRequest: trueValue,
  /**
   * method快照数量，默认为1000
   */
  snapshots: 1e3
};
let idCount = 0;
class Alova {
  constructor(options) {
    var _a, _b;
    const instance = this;
    instance.id = (options.id || (idCount += 1)).toString();
    instance.l1Cache = options.l1Cache || memoryAdapter();
    instance.l2Cache = options.l2Cache || localStorageAdapter();
    instance.options = __spreadValues(__spreadValues({}, defaultAlovaOptions), options);
    instance.snapshots = newInstance$1(MethodSnapshotContainer, (_b = (_a = options.snapshots) !== null && _a !== void 0 ? _a : defaultAlovaOptions.snapshots) !== null && _b !== void 0 ? _b : 0);
  }
  Get(url, config) {
    return newInstance$1(Method, typeGet, this, url, config);
  }
  Post(url, data, config) {
    return newInstance$1(Method, typePost, this, url, config, data);
  }
  Delete(url, data, config) {
    return newInstance$1(Method, typeDelete, this, url, config, data);
  }
  Put(url, data, config) {
    return newInstance$1(Method, typePut, this, url, config, data);
  }
  Head(url, config) {
    return newInstance$1(Method, typeHead, this, url, config);
  }
  Patch(url, data, config) {
    return newInstance$1(Method, typePatch, this, url, config, data);
  }
  Options(url, config) {
    return newInstance$1(Method, typeOptions, this, url, config);
  }
}
let boundStatesHook = undefinedValue;
const usingL1CacheAdapters = [];
const usingL2CacheAdapters = [];
const createAlova = (options) => {
  const alovaInstance = newInstance$1(Alova, options);
  const newStatesHook = alovaInstance.options.statesHook;
  if (boundStatesHook) {
    myAssert(boundStatesHook === newStatesHook, "expected to use the same `statesHook`");
  }
  boundStatesHook = newStatesHook;
  const { l1Cache, l2Cache } = alovaInstance;
  !usingL1CacheAdapters.includes(l1Cache) && pushItem$2(usingL1CacheAdapters, l1Cache);
  !usingL2CacheAdapters.includes(l2Cache) && pushItem$2(usingL2CacheAdapters, l2Cache);
  return alovaInstance;
};
const promiseStatesHook = () => {
  myAssert(!!boundStatesHook, `\`statesHook\` is not set in alova instance`);
  return boundStatesHook;
};
var vue = {
  name: "Vue",
  create: (data) => ref(data),
  dehydrate: (state) => state.value,
  update: (newVal, state) => {
    state.value = newVal;
  },
  effectRequest({ handler, removeStates, immediate, watchingStates }) {
    if (getCurrentInstance()) {
      onUnmounted(removeStates);
      onMounted(() => immediate && handler());
    } else {
      setTimeoutFn(() => {
        immediate && handler();
      });
    }
    const syncRunner = createSyncOnceRunner();
    forEach(watchingStates || [], (state, i2) => {
      watch(state, () => {
        syncRunner(() => {
          handler(i2);
        });
      }, { deep: trueValue });
    });
  },
  computed: (getter) => computed(getter),
  watch: (states, callback) => {
    watch(states, callback, {
      deep: trueValue
    });
  },
  onMounted: (callback) => {
    if (getCurrentInstance()) {
      onMounted(callback);
    } else {
      setTimeoutFn(callback, 10);
    }
  },
  onUnmounted: (callback) => {
    getCurrentInstance() && onUnmounted(callback);
  }
};
var l2CacheAdapter = {
  get(key2) {
    return index.getStorageSync(key2);
  },
  set(key2, value) {
    index.setStorageSync(key2, value);
  },
  remove(key2) {
    index.removeStorageSync(key2);
  },
  clear() {
    index.clearStorageSync();
  }
};
const requestAdapter = (elements, method) => {
  const { url, data, type, headers: header } = elements;
  let taskInstance;
  let onDownload = noop;
  let onUpload = noop;
  const responsePromise = new Promise((resolve2, reject) => {
    const { config: adapterConfig } = method;
    const { requestType, timeout } = adapterConfig;
    if (requestType === "upload") {
      const formData = {};
      const fileData = {};
      if (isPlainObject$1(data)) {
        Object.keys(data).forEach((key2) => {
          if (["name", "files", "file", "filePath"].includes(key2)) {
            fileData[key2] = data[key2];
          } else {
            formData[key2] = data[key2];
          }
        });
      }
      const uploadTask = taskInstance = index.uploadFile(__spreadProps(__spreadValues(__spreadValues({}, adapterConfig), fileData), {
        name: fileData.name,
        url,
        header,
        formData,
        timeout,
        success: (res) => resolve2(res),
        fail: (reason) => reject(new Error(reason.errMsg)),
        complete: noop
      }));
      onUpload = (handler) => {
        uploadTask.onProgressUpdate(({ totalBytesSent, totalBytesExpectedToSend }) => {
          handler(totalBytesSent, totalBytesExpectedToSend);
        });
      };
    } else if (requestType === "download") {
      const downloadTask = taskInstance = index.downloadFile(__spreadProps(__spreadValues({}, adapterConfig), {
        url,
        header,
        timeout,
        success: (res) => resolve2(res),
        fail: (reason) => reject(new Error(reason.errMsg)),
        complete: noop
      }));
      onDownload = (handler) => {
        downloadTask.onProgressUpdate(({ totalBytesWritten, totalBytesExpectedToWrite }) => {
          handler(totalBytesWritten, totalBytesExpectedToWrite);
        });
      };
    } else {
      taskInstance = index.request(__spreadProps(__spreadValues({}, adapterConfig), {
        url,
        data,
        header,
        method: type,
        timeout,
        success: (res) => resolve2(res),
        fail: (reason) => reject(new Error(reason.errMsg))
      }));
    }
  });
  return {
    response: () => responsePromise,
    headers: () => responsePromise.then((res) => res.header || {}),
    abort: () => {
      taskInstance.abort();
    },
    onDownload,
    onUpload
  };
};
var statesHook = __spreadProps(__spreadValues({}, vue), {
  effectRequest(effectRequestParams, referingObject) {
    const { handler } = effectRequestParams;
    effectRequestParams.handler = (...args) => {
      len(args) > 0 ? handler(...args) : setTimeout(() => handler(...args), 100);
    };
    return vue.effectRequest(effectRequestParams, referingObject);
  }
});
const mockResponseHandler = ({ status, body }, _2, currentMethod) => {
  const { requestType } = currentMethod.config;
  const responseHeaders = {};
  if (requestType === "upload") {
    return {
      response: {
        data: body,
        statusCode: status
      },
      headers: responseHeaders
    };
  }
  if (requestType === "download") {
    const isSuccess = status === 200;
    return {
      response: {
        tempFilePath: isSuccess ? body : "",
        statusCode: status
      },
      headers: responseHeaders
    };
  }
  return {
    response: {
      data: body,
      statusCode: status,
      header: responseHeaders,
      cookies: []
    },
    headers: responseHeaders
  };
};
function AdapterUniapp({ mockRequest } = {}) {
  return {
    statesHook,
    requestAdapter: mockRequest || requestAdapter,
    l2Cache: l2CacheAdapter
  };
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var Symbol$1 = root.Symbol;
var objectProto$9 = Object.prototype;
var hasOwnProperty$9 = objectProto$9.hasOwnProperty;
var nativeObjectToString$1 = objectProto$9.toString;
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$9.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e2) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$8 = Object.prototype;
var nativeObjectToString = objectProto$8.toString;
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString$1(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
}
function arrayMap(array, iteratee) {
  var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index2 < length) {
    result[index2] = iteratee(array[index2], index2, array);
  }
  return result;
}
var isArray$1 = Array.isArray;
var INFINITY$1 = 1 / 0;
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray$1(value)) {
    return arrayMap(value, baseToString) + "";
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index2 = string.length;
  while (index2-- && reWhitespace.test(string.charAt(index2))) {
  }
  return index2;
}
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
function isObject$2(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject$2(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject$2(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var INFINITY = 1 / 0, MAX_INTEGER = 17976931348623157e292;
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
function toInteger(value) {
  var result = toFinite(value), remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}
function identity(value) {
  return value;
}
var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$1(value) {
  if (!isObject$2(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root["__core-js_shared__"];
var maskSrcKey = function() {
  var uid2 = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid2 ? "Symbol(src)_1." + uid2 : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e2) {
    }
    try {
      return func + "";
    } catch (e2) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$7 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$8 = objectProto$7.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString.call(hasOwnProperty$8).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject$2(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key2) {
  return object == null ? void 0 : object[key2];
}
function getNative(object, key2) {
  var value = getValue(object, key2);
  return baseIsNative(value) ? value : void 0;
}
var WeakMap$1 = getNative(root, "WeakMap");
function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
function copyArray(source, array) {
  var index2 = -1, length = source.length;
  array || (array = Array(length));
  while (++index2 < length) {
    array[index2] = source[index2];
  }
  return array;
}
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
function constant(value) {
  return function() {
    return value;
  };
}
var defineProperty = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e2) {
  }
}();
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
var setToString = shortOut(baseSetToString);
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue(object, key2, value) {
  if (key2 == "__proto__" && defineProperty) {
    defineProperty(object, key2, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key2] = value;
  }
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$6 = Object.prototype;
var hasOwnProperty$7 = objectProto$6.hasOwnProperty;
function assignValue(object, key2, value) {
  var objValue = object[key2];
  if (!(hasOwnProperty$7.call(object, key2) && eq(objValue, value)) || value === void 0 && !(key2 in object)) {
    baseAssignValue(object, key2, value);
  }
}
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index2 = -1, length = props.length;
  while (++index2 < length) {
    var key2 = props[index2];
    var newValue = void 0;
    if (newValue === void 0) {
      newValue = source[key2];
    }
    if (isNew) {
      baseAssignValue(object, key2, newValue);
    } else {
      assignValue(object, key2, newValue);
    }
  }
  return object;
}
var nativeMax = Math.max;
function overRest(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index2 = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index2 < length) {
      array[index2] = args[start + index2];
    }
    index2 = -1;
    var otherArgs = Array(start + 1);
    while (++index2 < start) {
      otherArgs[index2] = args[index2];
    }
    otherArgs[start] = transform(array);
    return apply$1(func, this, otherArgs);
  };
}
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + "");
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction$1(value);
}
function isIterateeCall(value, index2, object) {
  if (!isObject$2(object)) {
    return false;
  }
  var type = typeof index2;
  if (type == "number" ? isArrayLike(object) && isIndex(index2, object.length) : type == "string" && index2 in object) {
    return eq(object[index2], value);
  }
  return false;
}
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index2 = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index2 < length) {
      var source = sources[index2];
      if (source) {
        assigner(object, source, index2, customizer);
      }
    }
    return object;
  });
}
var objectProto$5 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$5;
  return value === proto;
}
function baseTimes(n2, iteratee) {
  var index2 = -1, result = Array(n2);
  while (++index2 < n2) {
    result[index2] = iteratee(index2);
  }
  return result;
}
var argsTag$1 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$1;
}
var objectProto$4 = Object.prototype;
var hasOwnProperty$6 = objectProto$4.hasOwnProperty;
var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;
var isArguments = baseIsArguments(/* @__PURE__ */ function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$6.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
function stubFalse() {
  return false;
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var Buffer2 = moduleExports$1 ? root.Buffer : void 0;
var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag$2 = "[object Map]", numberTag = "[object Number]", objectTag$1 = "[object Object]", regexpTag = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", weakMapTag$1 = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag$2] = typedArrayTags[numberTag] = typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] = typedArrayTags[setTag$2] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag$1] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var freeProcess = moduleExports && freeGlobal.process;
var nodeUtil = function() {
  try {
    var types = freeModule && freeModule.require && freeModule.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e2) {
  }
}();
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
var objectProto$3 = Object.prototype;
var hasOwnProperty$5 = objectProto$3.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key2 in value) {
    if (hasOwnProperty$5.call(value, key2) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key2 == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key2 == "offset" || key2 == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key2 == "buffer" || key2 == "byteLength" || key2 == "byteOffset") || // Skip index properties.
    isIndex(key2, length)))) {
      result.push(key2);
    }
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
var objectProto$2 = Object.prototype;
var hasOwnProperty$4 = objectProto$2.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key2 in Object(object)) {
    if (hasOwnProperty$4.call(object, key2) && key2 != "constructor") {
      result.push(key2);
    }
  }
  return result;
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
var objectProto$1 = Object.prototype;
var hasOwnProperty$3 = objectProto$1.hasOwnProperty;
var assign$1 = createAssigner(function(object, source) {
  if (isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key2 in source) {
    if (hasOwnProperty$3.call(source, key2)) {
      assignValue(object, key2, source[key2]);
    }
  }
});
var Map$1 = getNative(root, "Map");
function toString(value) {
  return value == null ? "" : baseToString(value);
}
function baseClamp(number2, lower, upper) {
  if (number2 === number2) {
    if (upper !== void 0) {
      number2 = number2 <= upper ? number2 : upper;
    }
    {
      number2 = number2 >= lower ? number2 : lower;
    }
  }
  return number2;
}
var DataView = getNative(root, "DataView");
var Promise$1 = getNative(root, "Promise");
var Set$1 = getNative(root, "Set");
var mapTag$1 = "[object Map]", objectTag = "[object Object]", promiseTag = "[object Promise]", setTag$1 = "[object Set]", weakMapTag = "[object WeakMap]";
var dataViewTag = "[object DataView]";
var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
var getTag = baseGetTag;
if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map$1 && getTag(new Map$1()) != mapTag$1 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$1 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;
        case mapCtorString:
          return mapTag$1;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$1;
        case weakMapCtorString:
          return weakMapTag;
      }
    }
    return result;
  };
}
var stringTag = "[object String]";
function isString$1(value) {
  return typeof value == "string" || !isArray$1(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
}
function baseValues(object, props) {
  return arrayMap(props, function(key2) {
    return object[key2];
  });
}
function values(object) {
  return object == null ? [] : baseValues(object, keys(object));
}
var mapTag = "[object Map]", setTag = "[object Set]";
var objectProto = Object.prototype;
var hasOwnProperty$2 = objectProto.hasOwnProperty;
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArrayLike(value) && (isArray$1(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
    return !value.length;
  }
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key2 in value) {
    if (hasOwnProperty$2.call(value, key2)) {
      return false;
    }
  }
  return true;
}
function isNil(value) {
  return value == null;
}
var arrayProto = Array.prototype;
var nativeJoin = arrayProto.join;
function join(array, separator) {
  return array == null ? "" : nativeJoin.call(array, separator);
}
var nativeFloor = Math.floor, nativeRandom$1 = Math.random;
function baseRandom(lower, upper) {
  return lower + nativeFloor(nativeRandom$1() * (upper - lower + 1));
}
var freeParseFloat = parseFloat;
var nativeMin = Math.min, nativeRandom = Math.random;
function random(lower, upper, floating) {
  if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
    upper = floating = void 0;
  }
  if (floating === void 0) {
    if (typeof upper == "boolean") {
      floating = upper;
      upper = void 0;
    } else if (typeof lower == "boolean") {
      floating = lower;
      lower = void 0;
    }
  }
  if (lower === void 0 && upper === void 0) {
    lower = 0;
    upper = 1;
  } else {
    lower = toFinite(lower);
    if (upper === void 0) {
      upper = lower;
      lower = 0;
    } else {
      upper = toFinite(upper);
    }
  }
  if (lower > upper) {
    var temp = lower;
    lower = upper;
    upper = temp;
  }
  if (floating || lower % 1 || upper % 1) {
    var rand = nativeRandom();
    return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
  }
  return baseRandom(lower, upper);
}
function shuffleSelf(array, size2) {
  var index2 = -1, length = array.length, lastIndex = length - 1;
  size2 = size2 === void 0 ? length : size2;
  while (++index2 < size2) {
    var rand = baseRandom(index2, lastIndex), value = array[rand];
    array[rand] = array[index2];
    array[index2] = value;
  }
  array.length = size2;
  return array;
}
function arraySampleSize(array, n2) {
  return shuffleSelf(copyArray(array), baseClamp(n2, 0, array.length));
}
function baseSampleSize(collection, n2) {
  var array = values(collection);
  return shuffleSelf(array, baseClamp(n2, 0, array.length));
}
function sampleSize(collection, n2, guard) {
  if (n2 === void 0) {
    n2 = 1;
  } else {
    n2 = toInteger(n2);
  }
  var func = isArray$1(collection) ? arraySampleSize : baseSampleSize;
  return func(collection, n2);
}
function startsWith(string, target, position) {
  string = toString(string);
  position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
  target = baseToString(target);
  return string.slice(position, position + target.length) == target;
}
const mockLabel = "mock";
const mockLabelColor = "#64bde8";
const mockLabelBg = "#ccefff";
const realRequestLabel = "Realtime";
const realRequestLabelColor = "#999999";
const realRequestLabelBg = "#ededed";
const labelStyle = (bgColor, color) => `padding: 2px 6px; background: ${bgColor}; color: ${color};`;
const titleStyle = "color: black; font-size: 12px; font-weight: bolder";
const transform2TableData = (obj) => {
  const tableData = {};
  for (const key2 in obj) {
    tableData[key2] = { value: obj[key2] };
  }
  return tableData;
};
const consoleRequestInfo = ({ isMock, url, method, headers, query, data, responseHeaders, response }) => {
  const cole = console;
  cole.groupCollapsed(`%c${isMock ? mockLabel : realRequestLabel}`, labelStyle(isMock ? mockLabelBg : realRequestLabelBg, isMock ? mockLabelColor : realRequestLabelColor), url);
  cole.log("%c[Method]", titleStyle, method.toUpperCase());
  cole.log("%c[Request Headers]", titleStyle);
  cole.table(transform2TableData(headers));
  cole.log("%c[Query String Parameters]", titleStyle);
  cole.table(transform2TableData(query));
  cole.log("%c[Request Body]", titleStyle, data || "");
  if (isMock) {
    if (Object.keys(responseHeaders).length > 0) {
      cole.log("%c[Response Headers]", titleStyle);
      cole.table(transform2TableData(responseHeaders));
    }
    cole.log("%c[Response Body]", titleStyle, response || "");
  }
  cole.groupEnd();
};
const defaultMockResponse = ({ status = 200, responseHeaders, statusText = "ok", body }) => ({
  response: new Response(isSpecialRequestBody(body) ? body : JSON.stringify(body), {
    status,
    statusText
  }),
  headers: new Headers(responseHeaders)
});
const defaultMockError = (error) => error;
const parseUrl = (url) => {
  url = /^[^/]*\/\//.test(url) ? url : `//${url}`;
  const splitedFullPath = url.split("/").slice(3);
  const query = {};
  let pathContainedParams = splitedFullPath.pop();
  let pathname = "";
  let hash = "";
  if (pathContainedParams) {
    pathContainedParams = pathContainedParams.replace(/\?[^?#]+/, (mat) => {
      mat.substring(1).split("&").forEach((paramItem) => {
        const [key2, value] = paramItem.split("=");
        key2 && (query[key2] = value);
      });
      return "";
    });
    pathContainedParams = pathContainedParams.replace(/#[^#]*/, (mat) => {
      hash = mat;
      return "";
    });
    splitedFullPath.push(pathContainedParams);
    pathname = `/${splitedFullPath.join("/")}`;
  }
  return {
    pathname,
    query,
    hash
  };
};
function MockRequest({
  // 此enable为总开关
  enable = trueValue,
  delay = 2e3,
  httpAdapter,
  mockRequestLogger = consoleRequestInfo,
  mock,
  onMockResponse = defaultMockResponse,
  onMockError = defaultMockError,
  matchMode = "pathname"
} = { mock: {} }) {
  return (elements, method) => {
    mock = enable && mock || {};
    const { url, data, type, headers: requestHeaders } = elements;
    let pathname = method.url;
    let query = method.config.params || {};
    if (matchMode === "pathname") {
      const parsedUrl = parseUrl(url);
      pathname = parsedUrl.pathname;
      query = parsedUrl.query;
    }
    const params = {};
    const pathnameSplited = pathname.split("/");
    const foundMockDataKeys = Object.keys(mock).filter((key2) => {
      if (key2.startsWith("-")) {
        return falseValue;
      }
      let methodType = "GET";
      key2 = key2.replace(/^\[(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS|TRACE|CONNECT)\]/i, (_2, $1) => {
        methodType = $1.toUpperCase();
        return "";
      });
      if (methodType !== type.toUpperCase()) {
        return falseValue;
      }
      const keySplited = key2.split("/");
      if (keySplited.length !== pathnameSplited.length) {
        return falseValue;
      }
      for (const i2 in keySplited) {
        const keySplitedItem = keySplited[i2];
        const matchedParamKey = (keySplitedItem.match(/^\{(.*)\}$/) || ["", ""])[1];
        if (!matchedParamKey) {
          if (keySplitedItem !== pathnameSplited[i2]) {
            return falseValue;
          }
        } else {
          params[matchedParamKey] = pathnameSplited[i2];
        }
      }
      return trueValue;
    });
    let finalKey = foundMockDataKeys.find((key2) => !/\{.*\}/.test(key2));
    finalKey = finalKey || foundMockDataKeys.shift();
    const mockDataRaw = finalKey ? mock[finalKey] : undefinedValue;
    if (mockDataRaw === undefinedValue) {
      if (httpAdapter) {
        isFn(mockRequestLogger) && mockRequestLogger({
          isMock: falseValue,
          url,
          method: type,
          params,
          headers: requestHeaders,
          query,
          data: {},
          responseHeaders: {}
        });
        return httpAdapter(elements, method);
      }
      throw new Error(`cannot find the httpAdapter.
[url]${url}`);
    }
    const promiseResolver = usePromise();
    const { resolve: resolve2 } = promiseResolver;
    let { promise: resonpsePromise, reject } = promiseResolver;
    const timeout = method.config.timeout || 0;
    if (timeout > 0) {
      setTimeout(() => {
        reject(new Error("request timeout"));
      }, timeout);
    }
    const timer = setTimeout(() => {
      try {
        const res = isFn(mockDataRaw) ? mockDataRaw({
          query,
          params,
          data: isString$2(data) || !data ? {} : data,
          headers: requestHeaders
        }) : mockDataRaw;
        resolve2(newInstance$1(Promise, (resolveInner, rejectInner) => {
          reject = rejectInner;
          promiseResolve(res).then(resolveInner).catch(rejectInner);
        }));
      } catch (error) {
        reject(error);
      }
    }, delay);
    resonpsePromise = resonpsePromise.then((response) => {
      let status = 200;
      let statusText = "ok";
      let responseHeaders = {};
      let body = undefinedValue;
      if (response === undefinedValue) {
        status = 404;
        statusText = "api not found";
      } else if (response && isNumber$1(response.status) && isString$2(response.statusText)) {
        status = response.status;
        statusText = response.statusText;
        responseHeaders = response.responseHeaders || responseHeaders;
        body = response.body;
      } else {
        body = response;
      }
      return newInstance$1(Promise, (resolve3, reject2) => {
        try {
          const res = onMockResponse({ status, statusText, responseHeaders, body }, {
            headers: requestHeaders,
            query,
            params,
            data: data || {}
          }, method);
          resolve3(res);
        } catch (error) {
          reject2(error);
        }
      }).then((response2) => {
        isFn(mockRequestLogger) && mockRequestLogger({
          isMock: trueValue,
          url,
          method: type,
          params,
          headers: requestHeaders,
          query,
          data: data || {},
          responseHeaders,
          response: body
        });
        return response2;
      });
    }).catch((error) => promiseReject(onMockError(error, method)));
    return {
      response: () => resonpsePromise.then(({ response }) => response && response.toString() === "[object Response]" ? response.clone() : response),
      headers: () => resonpsePromise.then(({ headers }) => headers),
      abort: () => {
        clearTimeout(timer);
        reject(new Error("The user abort request"));
      }
    };
  };
}
function createAlovaMockAdapter(mockWrapper, options = { enable: true }) {
  let uniqueMockMap = {};
  mockWrapper.filter(({ enable }) => enable).forEach(({ data }) => {
    uniqueMockMap = __spreadValues(__spreadValues({}, data), uniqueMockMap);
  });
  return MockRequest(__spreadProps(__spreadValues({}, options), {
    mock: uniqueMockMap
  }));
}
var defineMock = (mock, enable = true) => ({
  enable,
  data: mock
});
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n2) {
  if (n2.__esModule) return n2;
  var f2 = n2.default;
  if (typeof f2 == "function") {
    var a2 = function a3() {
      if (this instanceof a3) {
        return Reflect.construct(f2, arguments, this.constructor);
      }
      return f2.apply(this, arguments);
    };
    a2.prototype = f2.prototype;
  } else a2 = {};
  Object.defineProperty(a2, "__esModule", { value: true });
  Object.keys(n2).forEach(function(k2) {
    var d2 = Object.getOwnPropertyDescriptor(n2, k2);
    Object.defineProperty(a2, k2, d2.get ? d2 : {
      enumerable: true,
      get: function() {
        return n2[k2];
      }
    });
  });
  return a2;
}
function multiavatar(string, sansEnv, ver) {
  string += "";
  var themes = { "00": { A: { env: ["#ff2f2b"], clo: ["#fff", "#000"], head: ["#fff"], mouth: ["#fff", "#000", "#000"], eyes: ["#000", "none", "#00FFFF"], top: ["#fff", "#fff"] }, B: { env: ["#ff1ec1"], clo: ["#000", "#fff"], head: ["#ffc1c1"], mouth: ["#fff", "#000", "#000"], eyes: ["#FF2D00", "#fff", "none"], top: ["#a21d00", "#fff"] }, C: { env: ["#0079b1"], clo: ["#0e00b1", "#d1fffe"], head: ["#f5aa77"], mouth: ["#fff", "#000", "#000"], eyes: ["#0c00de", "#fff", "none"], top: ["#acfffd", "#acfffd"] } }, "01": { A: { env: ["#a50000"], clo: ["#f06", "#8e0039"], head: ["#85492C"], mouth: ["#000"], eyes: ["#000", "#ff9809"], top: ["#ff9809", "#ff9809", "none", "none"] }, B: { env: ["#40E83B"], clo: ["#00650b", "#62ce5a"], head: ["#f7c1a6"], mouth: ["#6e1c1c"], eyes: ["#000", "#ff833b"], top: ["#67FFCC", "none", "none", "#ecff3b"] }, C: { env: ["#ff2c2c"], clo: ["#fff", "#000"], head: ["#ffce8b"], mouth: ["#000"], eyes: ["#000", "#0072ff"], top: ["#ff9809", "none", "#ffc809", "none"] } }, "02": { A: { env: ["#ff7520"], clo: ["#d12823"], head: ["#fee3c5"], mouth: ["#d12823"], eyes: ["#000", "none"], top: ["#000", "none", "none", "#FFCC00", "red"] }, B: { env: ["#ff9700"], clo: ["#000"], head: ["#d2ad6d"], mouth: ["#000"], eyes: ["#000", "#00ffdc"], top: ["#fdff00", "#fdff00", "none", "none", "none"] }, C: { env: ["#26a7ff"], clo: ["#d85cd7"], head: ["#542e02"], mouth: ["#f70014"], eyes: ["#000", "magenta"], top: ["#FFCC00", "#FFCC00", "#FFCC00", "#ff0000", "yellow"] } }, "03": { A: { env: ["#6FC30E"], clo: ["#b4e1fa", "#5b5d6e", "#515262", "#a0d2f0", "#a0d2f0"], head: ["#fae3b9"], mouth: ["#fff", "#000"], eyes: ["#000"], top: ["#8eff45", "#8eff45", "none", "none"] }, B: { env: ["#00a58c"], clo: ["#000", "none", "none", "none", "none"], head: ["#FAD2B9"], mouth: ["#fff", "#000"], eyes: ["#000"], top: ["#FFC600", "none", "#FFC600", "none"] }, C: { env: ["#ff501f"], clo: ["#000", "#ff0000", "#ff0000", "#7d7d7d", "#7d7d7d"], head: ["#fff3dc"], mouth: ["#d2001b", "none"], eyes: ["#000"], top: ["#D2001B", "none", "none", "#D2001B"] } }, "04": { A: { env: ["#fc0"], clo: ["#901e0e", "#ffbe1e", "#ffbe1e", "#c55f54"], head: ["#f8d9ad"], mouth: ["#000", "none", "#000", "none"], eyes: ["#000"], top: ["#583D00", "#AF892E", "#462D00", "#a0a0a0"] }, B: { env: ["#386465"], clo: ["#fff", "#333", "#333", "#333"], head: ["#FFD79D"], mouth: ["#000", "#000", "#000", "#000"], eyes: ["#000"], top: ["#27363C", "#5DCAD4", "#314652", "#333"] }, C: { env: ["#DFFF00"], clo: ["#304267", "#aab0b1", "#aab0b1", "#aab0b1"], head: ["#e6b876"], mouth: ["#50230a", "#50230a", "#50230a", "#50230a"], eyes: ["#000"], top: ["#333", "#afafaf", "#222", "#6d3a1d"] } }, "05": { A: { env: ["#a09300"], clo: ["#c7d4e2", "#435363", "#435363", "#141720", "#141720", "#e7ecf2", "#e7ecf2"], head: ["#f5d4a6"], mouth: ["#000", "#cf9f76"], eyes: ["#000", "#000", "#000", "#000", "#000", "#000", "#fff", "#fff", "#fff", "#fff", "#000", "#000"], top: ["none", "#fdff00"] }, B: { env: ["#b3003e"], clo: ["#000", "#435363", "#435363", "#000", "none", "#e7ecf2", "#e7ecf2"], head: ["#f5d4a6"], mouth: ["#000", "#af9f94"], eyes: ["#9ff3ff;opacity:0.96", "#000", "#9ff3ff;opacity:0.96", "#000", "#2f508a", "#000", "#000", "#000", "none", "none", "none", "none"], top: ["#ff9a00", "#ff9a00"] }, C: { env: ["#884f00"], clo: ["#ff0000", "#fff", "#fff", "#141720", "#141720", "#e7ecf2", "#e7ecf2"], head: ["#c57b14"], mouth: ["#000", "#cf9f76"], eyes: ["none", "#000", "none", "#000", "#5a0000", "#000", "#000", "#000", "none", "none", "none", "none"], top: ["#efefef", "none"] } }, "06": { A: { env: ["#8acf00"], clo: ["#ee2829", "#ff0"], head: ["#ffce73"], mouth: ["#fff", "#000"], eyes: ["#000"], top: ["#000", "#000", "none", "#000", "#ff4e4e", "#000"] }, B: { env: ["#00d2a3"], clo: ["#0D0046", "#ffce73"], head: ["#ffce73"], mouth: ["#000", "none"], eyes: ["#000"], top: ["#000", "#000", "#000", "none", "#ffb358", "#000", "none", "none"] }, C: { env: ["#ff184e"], clo: ["#000", "none"], head: ["#ffce73"], mouth: ["#ff0000", "none"], eyes: ["#000"], top: ["none", "none", "none", "none", "none", "#ffc107", "none", "none"] } }, "07": { A: { env: ["#00deae"], clo: ["#ff0000"], head: ["#ffce94"], mouth: ["#f73b6c", "#000"], eyes: ["#e91e63", "#000", "#e91e63", "#000", "#000", "#000"], top: ["#dd104f", "#dd104f", "#f73b6c", "#dd104f"] }, B: { env: ["#181284"], clo: ["#491f49", "#ff9809", "#491f49"], head: ["#f6ba97"], mouth: ["#ff9809", "#000"], eyes: ["#c4ffe4", "#000", "#c4ffe4", "#000", "#000", "#000"], top: ["none", "none", "#d6f740", "#516303"] }, C: { env: ["#bcf700"], clo: ["#ff14e4", "#000", "#14fffd"], head: ["#7b401e"], mouth: ["#666", "#000"], eyes: ["#00b5b4", "#000", "#00b5b4", "#000", "#000", "#000"], top: ["#14fffd", "#14fffd", "#14fffd", "#0d3a62"] } }, "08": { A: { env: ["#0df"], clo: ["#571e57", "#ff0"], head: ["#f2c280"], eyes: ["#795548", "#000"], mouth: ["#ff0000"], top: ["#de3b00", "none"] }, B: { env: ["#B400C2"], clo: ["#0D204A", "#00ffdf"], head: ["#ca8628"], eyes: ["#cbbdaf", "#000"], mouth: ["#1a1a1a"], top: ["#000", "#000"] }, C: { env: ["#ffe926"], clo: ["#00d6af", "#000"], head: ["#8c5100"], eyes: ["none", "#000"], mouth: ["#7d0000"], top: ["#f7f7f7", "none"] } }, "09": { A: { env: ["#4aff0c"], clo: ["#101010", "#fff", "#fff"], head: ["#dbbc7f"], mouth: ["#000"], eyes: ["#000", "none", "none"], top: ["#531148", "#531148", "#531148", "none"] }, B: { env: ["#FFC107"], clo: ["#033c58", "#fff", "#fff"], head: ["#dbc97f"], mouth: ["#000"], eyes: ["none", "#fff", "#000"], top: ["#FFEB3B", "#FFEB3B", "none", "#FFEB3B"] }, C: { env: ["#FF9800"], clo: ["#b40000", "#fff", "#fff"], head: ["#E2AF6B"], mouth: ["#000"], eyes: ["none", "#fff", "#000"], top: ["#ec0000", "#ec0000", "none", "none"] } }, 10: { A: { env: ["#104c8c"], clo: ["#354B65", "#3D8EBB", "#89D0DA", "#00FFFD"], head: ["#cc9a5c"], mouth: ["#222", "#fff"], eyes: ["#000", "#000"], top: ["#fff", "#fff", "none"] }, B: { env: ["#0DC15C"], clo: ["#212121", "#fff", "#212121", "#fff"], head: ["#dca45f"], mouth: ["#111", "#633b1d"], eyes: ["#000", "#000"], top: ["none", "#792B74", "#792B74"] }, C: { env: ["#ffe500"], clo: ["#1e5e80", "#fff", "#1e5e80", "#fff"], head: ["#e8bc86"], mouth: ["#111", "none"], eyes: ["#000", "#000"], top: ["none", "none", "#633b1d"] } }, 11: { A: { env: ["#4a3f73"], clo: ["#e6e9ee", "#f1543f", "#ff7058", "#fff", "#fff"], head: ["#b27e5b"], mouth: ["#191919", "#191919"], eyes: ["#000", "#000", "#57FFFD"], top: ["#ffc", "#ffc", "#ffc"] }, B: { env: ["#00a08d"], clo: ["#FFBA32", "#484848", "#4e4e4e", "#fff", "#fff"], head: ["#ab5f2c"], mouth: ["#191919", "#191919"], eyes: ["#000", "#ff23fa;opacity:0.39", "#000"], top: ["#ff90f4", "#ff90f4", "#ff90f4"] }, C: { env: ["#22535d"], clo: ["#000", "#ff2500", "#ff2500", "#fff", "#fff"], head: ["#a76c44"], mouth: ["#191919", "#191919"], eyes: ["#000", "none", "#000"], top: ["none", "#00efff", "none"] } }, 12: { A: { env: ["#2668DC"], clo: ["#2385c6", "#b8d0e0", "#b8d0e0"], head: ["#ad8a60"], mouth: ["#000", "#4d4d4d"], eyes: ["#7fb5a2", "#d1eddf", "#301e19"], top: ["#fff510", "#fff510"] }, B: { env: ["#643869"], clo: ["#D67D1B", "#b8d0e0", "#b8d0e0"], head: ["#CC985A", "none0000"], mouth: ["#000", "#ececec"], eyes: ["#1f2644", "#9b97ce", "#301e19"], top: ["#00eaff", "none"] }, C: { env: ["#F599FF"], clo: ["#2823C6", "#b8d0e0", "#b8d0e0"], head: ["#C7873A"], mouth: ["#000", "#4d4d4d"], eyes: ["#581b1b", "#FF8B8B", "#000"], top: ["none", "#9c0092"] } }, 13: { A: { env: ["#d10084"], clo: ["#efedee", "#00a1e0", "#00a1e0", "#efedee", "#ffce1c"], head: ["#b35f49"], mouth: ["#3a484a", "#000"], eyes: ["#000"], top: ["#000", "none", "#000", "none"] }, B: { env: ["#E6C117"], clo: ["#efedee", "#ec0033", "#ec0033", "#efedee", "#f2ff05"], head: ["#ffc016"], mouth: ["#4a3737", "#000"], eyes: ["#000"], top: ["#ffe900", "#ffe900", "none", "#ffe900"] }, C: { env: ["#1d8c00"], clo: ["#e000cb", "#fff", "#fff", "#e000cb", "#ffce1c"], head: ["#b96438"], mouth: ["#000", "#000"], eyes: ["#000"], top: ["#53ffff", "#53ffff", "none", "none"] } }, 14: { A: { env: ["#fc0065"], clo: ["#708913", "#fdea14", "#708913", "#fdea14", "#708913"], head: ["#DEA561"], mouth: ["#444", "#000"], eyes: ["#000"], top: ["#32393f", "#32393f", "#32393f", "#32393f", "#32393f", "#32393f", "#32393f", "#32393f", "#32393f", "#32393f", "#32393f", "#32393f", "#32393f", "#32393f", "#32393f", "#32393f", "#32393f"] }, B: { env: ["#81f72e"], clo: ["#ff0000", "#ffc107", "#ff0000", "#ffc107", "#ff0000"], head: ["#ef9831"], mouth: ["#6b0000", "#000"], eyes: ["#000"], top: ["#FFFAAD", "#FFFAAD", "#FFFAAD", "#FFFAAD", "#FFFAAD", "#FFFAAD", "#FFFAAD", "#FFFAAD", "#FFFAAD", "#FFFAAD", "#FFFAAD", "#FFFAAD", "#FFFAAD", "none", "none", "none", "none"] }, C: { env: ["#00D872"], clo: ["#590D00", "#FD1336", "#590D00", "#FD1336", "#590D00"], head: ["#c36c00"], mouth: ["#56442b", "#000"], eyes: ["#000"], top: ["#004E4C", "#004E4C", "#004E4C", "#004E4C", "#004E4C", "#004E4C", "#004E4C", "#004E4C", "#004E4C", "none", "none", "none", "none", "none", "none", "none", "none"] } }, 15: { A: { env: ["#111"], clo: ["#000", "#00FFFF"], head: ["#755227"], mouth: ["#fff", "#000"], eyes: ["black", "#008;opacity:0.67", "aqua"], top: ["#fff", "#fff", "#fff", "#fff", "#fff"] }, B: { env: ["#00D0D4"], clo: ["#000", "#fff"], head: ["#755227"], mouth: ["#fff", "#000"], eyes: ["black", "#1df7ff;opacity:0.64", "#fcff2c"], top: ["#fff539", "none", "#fff539", "none", "#fff539"] }, C: { env: ["#DC75FF"], clo: ["#000", "#FFBDEC"], head: ["#997549"], mouth: ["#fff", "#000"], eyes: ["black", "black", "aqua"], top: ["#00fffd", "none", "none", "none", "none"] } } }, sP = [], svgStart = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 231 231">', svgEnd = "</svg>", env = '<path d="M33.83,33.83a115.5,115.5,0,1,1,0,163.34,115.49,115.49,0,0,1,0-163.34Z" style="fill:#01;"/>', head = '<path d="m115.5 51.75a63.75 63.75 0 0 0-10.5 126.63v14.09a115.5 115.5 0 0 0-53.729 19.027 115.5 115.5 0 0 0 128.46 0 115.5 115.5 0 0 0-53.729-19.029v-14.084a63.75 63.75 0 0 0 53.25-62.881 63.75 63.75 0 0 0-63.65-63.75 63.75 63.75 0 0 0-0.09961 0z" style="fill:#000;"/>', str = "stroke-linecap:round;stroke-linejoin:round;stroke-width:";
  sP["00"] = [], sP["00"].env = env, sP["00"].clo = '<path d="m141.74 195a114.93 114.93 0 0 1 37.912 16.45l0.07 0.05c-1.17 0.79-2.3601 1.55-3.5601 2.29a115.55 115.55 0 0 1-120.95 0.21q-2.0001-1.23-4.0002-2.54a114.79 114.79 0 0 1 38.002-16.5 116.21 116.21 0 0 1 15.791-2.49v-14.57c1.32 0.22 2.6501 0.39 4.0002 0.51 2.0001 0.19 4.0002 0.28 6.1202 0.29a64.333 64.33 0 0 0 8.8804-0.62c0.67003-0.09 1.3401-0.2 2.0001-0.31v14.69a118 118 0 0 1 15.741 2.54z" style="fill:#fff;"/><path d="m79.292 212a3.4601 3.46 0 0 0 3.8902 5.07 3.3801 3.38 0 0 0 2.1001-1.61 3.4701 3.47 0 0 0-1.2801-4.72 3.4201 3.42 0 0 0-2.6201-0.34 3.5101 3.51 0 0 0-2.0901 1.6zm60.122 0.46a3.4901 3.49 0 0 0 1.21 4.7h0.06a3.4601 3.46 0 0 0 4.7202-1.27l0.07-0.13a3.4601 3.46 0 0 0-1.34-4.6 3.4601 3.46 0 0 0-2.5801-0.32 3.5301 3.53 0 0 0-2.1001 1.61zm9.8004 5.7 5.8602 5.87c-1.39 0.5-2.7901 1-4.2102 1.44l-4.4802-4.47a7.5203 7.52 0 0 1-1.9401 0.81 7.8303 7.83 0 0 1-6.0002-0.79 7.8703 7.87 0 0 1-2.9201-10.69v-0.07a7.8903 7.89 0 0 1 10.77-2.88l0.12 0.07a7.8603 7.86 0 0 1 2.7901 10.62v0.07zm-37.701-2.36-9.5004 9.51v4.9c-1.35-0.16-2.6801-0.33-4.0002-0.54v-6l0.58002-0.58 10.1-10.09a7.8703 7.87 0 1 1 2.8401 2.86zm7.3203-5.91a3.4601 3.46 0 1 0-1.6101 2.1 3.3801 3.38 0 0 0 1.6101-2.1zm-29.741 7.82 3.0901 3.1 0.59002 0.59v7.36c-1.3401-0.26-2.6801-0.55-4.0002-0.87v-4.84l-2.5101-2.51a7.5203 7.52 0 0 1-1.9401 0.81 7.8803 7.88 0 1 1 1.9101-14.43 7.8703 7.87 0 0 1 2.8901 10.75z" style="fill:#1a1a1a;"/>', sP["00"].head = head, sP["00"].mouth = '<path d="m94.19 136.84h42.632a3.7801 3.78 0 0 1 3.7802 3.78v3.22a15.231 15.23 0 0 1-15.211 15.16h-19.781a15.251 15.25 0 0 1-15.221-15.16v-3.22a3.8002 3.8 0 0 1 3.7802-3.78z" style="fill:#fff;' + str + '3px;stroke:#1a1a1a;"/><path d="m130.96 136.84v21.16m-30.911-21.16v21.16m10.34-21.16v22.16m10.31-22.2v22.2" style="fill:none;' + str + '3px;stroke:#1a1a1a;"/>', sP["00"].eyes = '<path d="m83.739 83.92h63.533a19.101 19.1 0 0 1 19.051 19 19.111 19.11 0 0 1-19.051 19h-63.533a19.091 19.09 0 0 1-19.001-19 19.091 19.09 0 0 1 19.001-19z" style="fill:#1a1a1a;"/><path d="m140.23 93.54a9.3804 9.38 0 1 0 9.3804 9.38 9.3804 9.38 0 0 0-9.3804-9.38zm-49.402 0a9.3804 9.38 0 1 0 9.3804 9.38 9.3904 9.39 0 0 0-9.3804-9.38z" style="fill:#e6e7e8;"/><rect x="79.795" y="98.627" width="71.471" height="8.5859" ry="4.2929" style="fill:#b3b3b3;"/>', sP["00"].top = '<path d="m32.902 67.662c-0.36295 1.7227-6.2342 30.695 5.6133 52.596 4.5843 8.4743 9.0081 13.239 12.75 15.893a67.7 67.7 0 0 1-3.4688-21.35 67.7 67.7 0 0 1 2.332-17.658c-4.4914-2.4646-10.868-6.9012-13.834-13.52-4.1626-9.285-3.6155-14.673-3.3926-15.961zm165.19 0c0.22292 1.2882 0.77005 6.6759-3.3926 15.961-2.9664 6.6183-9.3426 11.055-13.834 13.52a67.7 67.7 0 0 1 2.332 17.658 67.7 67.7 0 0 1-3.4688 21.35c3.7419-2.6532 8.1657-7.4183 12.75-15.893 11.847-21.9 5.9762-50.873 5.6133-52.596z" style="fill:#fff;"/><path d="m115.73 13.191c-7.3787-0.13351-13.509 5.7888-13.631 13.168-0.10128 5.8827 3.4508 10.518 8.0566 12.52 1.061 0.46115 2.1869 0.78009 3.3418 0.95703v8.4291c0.66778-0.02035 1.3358-0.03077 2.0039-0.03125 0.66547-9e-5 1.3309 0.0097 1.9961 0.0293v-8.4115c2.6002-0.38406 5.1586-1.5484 7.3086-3.625 4.2322-4.0878 4.9991-9.8755 3.1582-14.549-1.8407-4.6726-6.3502-8.3834-12.232-8.4863z" style="fill:#fff;"/>', sP["01"] = [], sP["01"].env = env, sP["01"].clo = '<path d="m141.75 195a114.79 114.79 0 0 1 38 16.5 115.53 115.53 0 0 1-128.46 0 114.79 114.79 0 0 1 38-16.5c0 10.76 11.75 19.48 26.25 19.48s26.25-8.72 26.25-19.48z" style="fill:#1a1a1a;"/><path d="m92.502 194.27v0.70391c0 4.3033 2.4373 8.2583 6.3807 11.183 4.2199 3.1204 10.106 5.0508 16.661 5.0508 6.548 0 12.434-1.9303 16.654-5.0508 3.9434-2.9245 6.388-6.8795 6.388-11.183v-0.67489c1.0768 0.21771 2.1463 0.44994 3.2158 0.69666h-7e-3c1.0695 0.24672 2.1318 0.50798 3.1867 0.791-0.27648 6.103-3.6524 11.553-8.9708 15.493-5.2821 3.9114-12.521 6.328-20.466 6.328-7.9449 0-15.184-2.4165-20.474-6.328-5.333-3.9477-8.7089-9.4194-8.9708-15.544 1.055-0.27577 2.1099-0.53702 3.1722-0.78376 1.0695-0.23947 2.1463-0.46443 3.2304-0.68213z" style="fill:#b3b3b3;"/>', sP["01"].head = head, sP["01"].mouth = '<path d="m100.35 143.85a7.67 7.67 0 0 0 7.58 7.7v0a7.66 7.66 0 0 0 7.57-7.7 7.66 7.66 0 0 0 7.57 7.7v0a7.67 7.67 0 0 0 7.58-7.7" style="fill:none;' + str + '6.3998px;stroke:#333;"/>', sP["01"].eyes = '<path d="m78.73 111a10.9 10.9 0 0 1 15.19 0m43.16 0a10.9 10.9 0 0 1 15.19 0" style="fill:none;' + str + '6.1999px;stroke:#333;"/><path d="m79.804 123.74h7.07m57.273 0h7.05" style="fill:none;' + str + '5.9998px;stroke:#b8b8b8;"/>', sP["01"].top = '<path d="m57.534 142.03c-6.9383-31.75-0.57294-52.577 14.174-62.344 22.562-12.283 62.082-12.222 83.484-1.8846 21.348 11.177 22.124 37.396 18.498 63.733 8.1279-14.155 13.164-31.598 14.085-48.902 1.0828-11.795-1.1756-18.866-7.4833-27.972-26.465-37.685-103.45-31.56-129.66-2.8372-7.8504 9.4615-9.6006 17.478-9.275 26.667 1.0024 18.667 6.9688 38.508 16.18 53.54z" style="fill:#b3b3b3;"/><path d="m111.26 3.0423c-6.013 0.1128-12.629 2.6924-15.291 7.9082-1.1676 3.2383-1.6758 6.2069-1.6758 8.8926 0.89228-0.2661 1.8005-0.5164 2.7266-0.7441 3.7502-1.0672 7.4851-1.7135 11.129-1.9981 1.1007-0.086 2.1953-0.1391 3.2773-0.1601h2e-3c5.6969-0.1133 11.09 0.6603 15.904 2.0527 0.0552-3.042-0.70696-5.9824-2.1738-8.5-1.8411-3.1599-4.7033-5.5568-8.4297-6.8262-1.6883-0.4952-3.5163-0.662-5.4688-0.625zm3.0664 17.449c-0.69317-0.01-1.3919-0.01-2.0938 0h-2e-3c-1.1591 0.019-2.3326 0.064-3.5117 0.1386-3.9035 0.246-7.9025 0.8061-11.92 1.7285-15.159 3.0075-26.469 9.9279-22.068 19.682 22.891-8.7773 52.315-10.403 76.023-2.2129 2.1414-9.5529-14.939-19.081-36.428-19.34z" style="fill:#b3b3b3;"/><path d="m165.62 16.981c-0.8575 0-1.9406 0.54389-3.3476 1.3574-7.3382 4.7652-13.452 10.867-19.516 18.363 9.2734 2.1825 17.903 5.6706 25.213 10.604 1.1512-9.1263 1.9137-18.503 0.055-26.996-0.57-2.4184-1.3017-3.3267-2.4043-3.3281zm-104.09 1.6934c-1.1026 0-1.8342 0.91165-2.4043 3.3301-1.8794 8.5869-1.0806 18.078 0.092 27.299 7.0559-4.6638 15.687-8.3667 25.111-10.984-6.043-7.4601-12.139-13.537-19.451-18.285-1.407-0.81353-2.4901-1.3605-3.3477-1.3594z" style="fill:#b3b3b3;"/><path d="m162.45 16.686c-2.3175 2e-3 -4.6276 0.57608-6.8926 1.668-8.4768 6.0155-11.113 13.349-10.133 19.787 10.323 2.7077 19.762 7.0658 27.346 13.279 9.848-4.9363 11.32-17.137 4.6152-25.852-4.7104-6.1222-9.8371-8.8878-14.936-8.8828zm-97.318 4.1387c-2.4569 0.0556-5.1642 0.54474-8.1172 1.5176-13.487 4.4433-19.06 21.215-3.6484 31.84 7.2476-6.0694 16.961-10.896 27.892-14.229 0.2193-3.3241-0.3201-7.0817-1.8691-11.236-2.8049-4.8445-7.2233-7.721-13.221-7.8906-0.3408-0.01-0.6861-0.01-1.0371-2e-3z" style="fill:#b3b3b3;"/>', sP["02"] = [], sP["02"].env = env, sP["02"].clo = '<path d="m141.75 195a114.79 114.79 0 0 1 38 16.5 115.53 115.53 0 0 1-128.46 0 114.79 114.79 0 0 1 38-16.5c0 10.76 11.75 19.48 26.25 19.48s26.25-8.72 26.25-19.48z" style="fill:#5a5a5a;"/>', sP["02"].head = head, sP["02"].mouth = '<path d="m115.5 161.71c-8.24 0-14.46-4.15-19.19-11.25 3.37-2.44 6.51-4.57 10-6.79a5.25 5.25 0 0 1 5.48-0.17 28.19 28.19 0 0 1 3.68 2.75 28.19 28.19 0 0 1 3.68-2.75 5.25 5.25 0 0 1 5.48 0.17c3.52 2.22 6.66 4.35 10 6.79-4.74 7.1-11 11.25-19.19 11.25z" style="fill:#5a5a5a;"/>', sP["02"].eyes = '<path d="m172.7 90.75h-6.54c-0.14-0.1-0.26-0.22-0.4-0.3-4.48-2.76-22.75-2.11-33.71 1.2-1 0.3-1.91 0.61-2.75 0.94-1.8937 0.79244-3.8739 1.3597-5.9 1.69-5.5051 0.79002-10.403 0.79002-15.908 0-2.0261-0.33034-4.0063-0.89756-5.9-1.69-0.84-0.33-1.76-0.64-2.75-0.94-11-3.31-29.23-4-33.71-1.2-0.13832 0.08869-0.2688 0.18906-0.39 0.3h-6.55c-1.1046 0-2 0.89543-2 2v4.66c-0.0013 0.98185 0.49088 1.8986 1.31 2.44l1.9 1.27c0.59238 0.38889 0.93475 1.0622 0.9 1.77-0.14175 5.4854 0.88072 10.939 3 16 3.58 8.38 16 10.9 24.93 10.9 2.6976 0.0771 5.3921-0.2361 8-0.93 4.35-1.43 8.24-7.36 10.45-12.42 1.7607-3.8506 2.7493-8.009 2.91-12.24 7.3e-4 -0.7138 0.38183-1.3731 1-1.73 3.2281-1.951 6.5798-1.951 9.8079 0 0.61817 0.3569 0.99927 1.0162 1 1.73 0.16067 4.231 1.1493 8.3894 2.91 12.24 2.21 5.06 6.1 11 10.45 12.42 2.6079 0.6939 5.3024 1.0071 8 0.93 8.92 0 21.35-2.52 24.93-10.9 2.1193-5.0614 3.1418-10.515 3-16-0.0348-0.70778 0.30762-1.3811 0.9-1.77l1.9-1.27c0.81913-0.54136 1.3113-1.4582 1.31-2.44v-4.6c0.0336-1.1048-0.83521-2.0274-1.94-2.06z" style="fill:#1a1a1a;' + str + '2.5;stroke:#b3b3b3;"/>', sP["02"].top = '<path d="m124.22 13.61c-19.783 0-36.945 8.0887-39.695 24.106-15.332 0.23539-31.831 2.7712-41.663 15.782-6.0238 7.9604-7.0402 19.901-6.8476 31.724 0.46007 28.503 10.742 64.228-4.3012 89.714 16.584 5.7777 43.086 10.742 73.59 11.662v-8.6558c-1.851-0.35308-3.6592-0.78105-5.4353-1.2732-30.953-8.4632-50.672-36.635-47.259-68.669 1.5514-10.603 4.6221-19.665 10.025-27.69 5.3818-7.9925 13.267-15.717 23.892-21.41 0.40658 0.72757 1.9901 3.5843 2.4074 4.3012 7.5003 12.775 17.986 23.849 33.157 26.866 12.433 2.4609 23.849 3.4666 36.346 1.1555 4.2584-0.78106 10.667-2.3967 14.851-2.4181 14.861 33.404-1.0806 75.035-40.668 87.457-2.2255 0.70616-4.5258 1.316-6.8904 1.8189 0 2.707-0.0428 5.6493-0.0642 8.5274 23.603-0.72757 48.682-4.0444 72.874-11.234-18.521-32.152 0.81315-89.083-10.036-121.46-9.0731-26.973-38.85-40.315-64.282-40.305z" style="fill:#c5c5c5;"/><path d="m33.147 172.32c-2.6535 5.1143-6.088 9.9504-10.1 12.411 7.8427 10.453 17.387 19.516 28.257 26.781 16.038-10.731 35.629-17.055 54-18.606v-9.0089c-30.065-0.94155-56.108-5.8847-72.157-11.577zm164.06 0.55637c-23.731 7.0723-48.361 10.325-71.525 11.042-0.0321 3.1242-0.0535 6.2377-0.0107 9.0517 19.227 1.7226 37.908 7.8534 53.989 18.542 0.0107 0 0.0107 0 0.0214 0.0107 10.731-7.1686 20.179-16.081 27.958-26.374-4.2798-2.3967-7.832-6.9653-10.432-12.272z" style="fill:#c5c5c5;"/><path d="m50.02 46.5c-2.9297 1.9143-6.1313 3.8826-10.154 7.9805-14.091 14.359-16.145 27.701-6.1406 44.018 4.2049 6.8583 6.1414 13.706-0.24609 20.5-7.7143 8.1957-21.559 4.2912-21.537 16.061 0.0214 8.613 15.063 7.9178 22.531 13.984 3.7662 3.0707 5.0836 8.3992 2.0664 12.508-4.2156 5.7456-16.006 7.3715-22.629 8.9336 5.8811 10.843 13.45 20.638 22.355 29.033l0.0039 0.0234 0.0059-0.0137c2e-3 2e-3 0.0038 4e-3 0.0059 6e-3 0.0034-0.0112 0.0063-0.0219 0.0098-0.0332 14.775-12.218 20.268-20.965 49.461-28.434-17.404-10.258-30.68-27.122-24.143-35.34 4.4123-5.5444 5.6612-7.8633 6.4062-12.078 2.3582-13.339-10.208-22.335-9.2363-32.715 1.9432-8.2346 11.379-11.173 16.947-15.115 5.4577-3.9082 9.8014-8.7695 10.799-16.918-13.558-4.8896-17.609-5.8617-36.506-12.4zm140.87 19.357c-3.4404-0.91243-23.311 122.43 4.4121 133.14 8.9661-8.5809 16.552-18.584 22.404-29.658 0-0.31029-25.133-3.9922-25.979-14.018-0.10699-1.1769 0.11822-1.4855 0.86718-2.502 6.6764-9.2122 30.716-11.416 29.646-23.496-0.27818-3.1563-4.1617-5.2334-6.7402-6.4531-12.155-5.767-32.942-9.6494-15.031-24.543 9.2122-7.3505 10.43-8.4323 0.59766-14.691-9.4583-6.0238-9.394-11.993-9.7578-16.326-0.0767-0.93035-0.22089-1.4003-0.41992-1.4531z" style="fill:#c5c5c5;"/><path d="m133.83 39.909c-11.33 1.393-9.5492 16.204-2e-3 16.643-4.5102 10.717 9.0165 16.181 14.441 8.3125 6.562 8.6765 18.596 0.94751 14.457-8.3125 11.718-1.5381 9.2769-16.099 0-16.643 4.503-10.867-9.4883-16.101-14.457-8.3301-6.8832-9.0411-18.509-0.47321-14.439 8.3301z" style="fill:#333;"/><path d="m153.86 48.222c0-3.0528-2.5184-5.5648-5.5791-5.5648-3.0783 0-5.5793 2.512-5.5793 5.5648 0 3.0703 2.501 5.5648 5.5793 5.5648 3.0606 0 5.5791-2.4946 5.5791-5.5648z" style="fill:#f9f9f9;"/>', sP["03"] = [], sP["03"].env = env, sP["03"].clo = '<path d="m141.75 195c13.563 3.1499 26.439 8.7409 38 16.5-38.873 26.001-89.587 26.001-128.46 0 11.561-7.7591 24.437-13.35 38-16.5 8.4869 8.8011 26.21 25.619 26.21 25.619s17.603-16.972 26.25-25.619z" style="fill:#d6d6d6;"/><path d="m109 230.81 1.6836-14.33h9.6328l1.6836 14.33c-2.16 0.12-4.33 0.19-6.51 0.19s-4.35-0.07-6.51-0.19z" style="fill:#5e5e5e;"/><path d="m124.17 210.6h-17.349v5.53a3.8828 3.29 0 0 0 3.8828 3.29h9.583a3.8828 3.29 0 0 0 3.8828-3.29z" style="fill:#535353;"/><path d="m140.57 190.36-25.066 20.245c5.9686 3.2455 11.597 7.0814 16.8 11.45 1.5989 1.3338 3.9762 1.1189 5.31-0.48 0.21005-0.25749 0.38802-0.53956 0.52999-0.84l10.826-23.805-4-6c-0.90256-1.351-2.7298-1.7137-4.08-0.81-0.11612 0.0786-0.22641 0.16549-0.33 0.26z" style="fill:#c6c6c6;"/><path d="m90.434 190.36 25.066 20.245c-5.9686 3.2455-11.597 7.0814-16.8 11.45-1.5989 1.3338-3.9762 1.1189-5.31-0.48-0.21005-0.25749-0.38802-0.53956-0.52999-0.84l-10.826-23.805 4-6c0.90256-1.351 2.7298-1.7137 4.08-0.81 0.11612 0.0786 0.22641 0.16549 0.33 0.26z" style="fill:#c6c6c6;"/>', sP["03"].head = head, sP["03"].mouth = '<path d="m136.21 147.09a21.77 21.77 0 0 1-40.13 0z" style="fill:#fff;' + str + '3.4999px;stroke:#000;"/>', sP["03"].eyes = '<path d="m145.39 104.7-11.52 11.2h17.26m-65.52-11.2 11.52 11.2h-17.26" style="fill:none;' + str + '5.4998px;stroke:#000;"/>', sP["03"].top = '<path d="m43.891 77.836c-5.1124 28.237 2.1347 61.004 24.792 81.332-6.2362-12.503-9.5362-33.948-9.4887-45.458-0.50203-37.473 41.439-46.335 56.149-17.614 18.8-31.2 52.825-16.872 54.062 13.714 0.56018 13.844-0.43568 25.598-7.0962 48.966 18.372-12.47 28.012-53.959 23.545-80.941-47.486-2.2552-94.831-2.5724-141.96 0z" style="fill:#1a1a1a;"/><path d="m111.26 12.782c-18.508 0.0791-32.594 3.6163-32.594 3.6163 24.513 5.6002 32.807 10.504 31.743 19.835-0.87227 9.702-11.092 10.875-20.811 11.554-5.2548 0.36414-10.949 0.71523-16.391 1.7525-11.862 2.2818-19.946 4.3736-24.447 11.956-1.7012 2.8662-3.7945 10.428-4.8689 16.34h141.96c-5.7242-38.563-32.557-65.073-74.595-65.054z" style="fill:#1a1a1a;"/><path d="m73.292 44.77c-11.788 2.2816-18.923 5.5444-23.394 13.126-2.8484 6.7586-4.8454 13.238-6.0072 19.939h141.96c-1.9772-14.576-6.8677-28.248-19.277-32.098-28.834-6.3308-63.774-6.3553-93.285-0.96761z" style="fill:#1a1a1a;"/><path d="m165.95 35.642c-11.178 21.829-91.89 19.36-103.98 2.3011-9.703 12.267-15.605 25.883-18.079 39.892h141.96c-3.0096-17.158-9.7424-32.688-19.902-42.193z" style="fill:#1a1a1a;"/>', sP["04"] = [], sP["04"].env = env, sP["04"].clo = '<path d="m141.75 195a114.79 114.79 0 0 1 38 16.5 115.53 115.53 0 0 1-128.46 0 114.79 114.79 0 0 1 38-16.5l15.71 15.75h21z" style="fill:#949494;"/><path d="m115.45 211.34-10.55 10.54a2.51 2.51 0 0 1-3.5599 0 2 2 0 0 1-0.26999-0.30994l-18.48-25.4 5.8901-5.8899a2.52 2.52 0 0 1 3.5199-0.0791l23.49 21.14z" style="fill:#c0c0c0;"/><path d="m115.45 211.34 10.55 10.54a2.51 2.51 0 0 0 3.5599 0 2 2 0 0 0 0.26999-0.30994l18.48-25.4-5.8901-5.8899a2.52 2.52 0 0 0-3.4699-0.089l-23.49 21.14z" style="fill:#c0c0c0;"/><path d="m158.41 199.58-10.11-3.2401v29.93q5.1601-1.5299 10.11-3.51zm-75.82 26.66v-29.9l-10.1 3.2401v23.14c3.2901 1.3199 6.67 2.4999 10.1 3.5199z" style="fill:#7c7c7c;"/>', sP["04"].head = head, sP["04"].mouth = '<path d="m118.05 148.38c-1.5064 0.59192-2.595 2.0264-2.6191 3.9863-0.0574 1.3977 0.53421 3.5611 3.6758 5.7949 8.0544 4.9446 21.507 3.6862 21.255-7.1658-4.664 4.8219-10.021 5.6377-14.773 0.73907-1.2328-1.1599-2.3694-2.4032-3.9294-3.1408-1.0946-0.50424-2.2257-0.61071-3.6096-0.21337z" style="fill:#333;"/><path d="m133.61 154.93c3.0731-0.48816 5.5702-2.8457 5.4438-4.5059-0.47801-4.8311-5.7317-3.0917-4.3369-0.31405-2.8103-1.4445-1.8343-3.8862 0.50427-4.7324 2.0509-0.79942 5.0937 0.34314 6.2002 2.6376 2.2229 7.3422-3.4376 11.68-10.384 12.561z" style="fill:#333;"/><path d="m112.81 148.38c1.5064 0.59192 2.595 2.0264 2.6191 3.9863 0.0574 1.3977-0.53421 3.5611-3.6758 5.7949-8.0544 4.9446-21.507 3.6862-21.255-7.1658 4.664 4.8219 10.021 5.6377 14.773 0.73907 1.2328-1.1599 2.3694-2.4032 3.9294-3.1408 1.0946-0.50424 2.2257-0.61071 3.6096-0.21337z" style="fill:#333;"/><path d="m97.252 154.93c-3.0731-0.48816-5.5702-2.8457-5.4438-4.5059 0.47801-4.8311 5.7317-3.0917 4.3369-0.31405 2.8103-1.4445 1.8343-3.8862-0.50427-4.7324-2.0509-0.79942-5.0937 0.34314-6.2002 2.6376-2.2229 7.3422 3.4376 11.68 10.384 12.561z" style="fill:#333;"/>', sP["04"].eyes = '<path d="m131.64 114.09 7.5801-7.5801 7.5801 7.5801m-62.6 0 7.5801-7.5801 7.5799 7.5801" style="fill:none;' + str + '6.4998px;stroke:#000;"/>', sP["04"].top = '<path d="m137.38 11.148c-12.23 1.9593-18.511 14.606-43.436 9.4915-11.285-3.2054-16.406-3.573-20.389 0.58594-4.1548 4.3384-7.033 12.435-9.8184 21.706-2.1354 7.4136-3.7187 14.381-4.7461 21.646h112.7c-3.4878-24.293-10.822-43.281-25.182-51.061-3.5314-1.623-6.5274-2.2959-9.1289-2.3613z" style="fill:#b3b3b3;"/><path d="m114.37 43.383c-19.445 0.088-38.524 2.0724-52.379 5.6992-1.2766 4.5795-2.4317 10.169-3.2285 16.807h113.11c-0.83731-6.0107-1.9164-11.674-3.3184-16.924-15.229-3.8842-34.873-5.6693-54.18-5.582z" style="fill:#e6e6e6;"/><path d="m115.5 55.773c-58.39 0-105.73 15.476-105.73 34.57h0.0312c0 11.295 16.496 21.319 42.126 27.627-0.10331-7.7704 2.788-21.904 5.2734-31.031 6.0935-1.7168 6.9294-1.8971 13.167-2.9919 14.874-2.8256 29.99-4.2037 45.133-4.1153 15.143-0.0884 30.259 1.2897 45.133 4.1153 6.2372 1.0947 7.2065 1.2751 13.3 2.9919 2.4854 9.1267 5.3768 23.26 5.2734 31.031 25.63-6.3082 41.993-16.332 41.993-27.627h0.0312c0-19.093-47.34-34.57-105.73-34.57z" style="fill:#818181;"/><path d="m72.088 83.533c-6.9765 1.1147-13.357 2.856-18.439 4.3477-1.1861 7.415-2.0038 18.858-1.8926 26.293 4.3278-0.62795 10.155-1.3644 13.295-1.6465-0.40554 0.30198 2.7344-17.827 7.0371-28.994zm86.824 0c4.3028 11.167 7.4426 29.296 7.0371 28.994 3.1396 0.28213 8.9671 1.0185 13.295 1.6465 0.11119-7.4351-0.70652-18.878-1.8926-26.293-5.0822-1.4916-11.463-3.2329-18.439-4.3477z" style="fill:#434343;"/>', sP["05"] = [], sP["05"].env = env, sP["05"].clo = '<path d="m141.75 194.98a114.79 114.78 0 0 1 38 16.498 115.53 115.52 0 0 1-128.46 0 114.79 114.78 0 0 1 38-16.498l15.71 15.748h21z" style="fill:#d2d2d2;"/><path d="m70 200.88v20.77c-2.22-0.95325-4.3999-1.9698-6.5399-3.0496h-0.10088v-14.621c2.17-1.1 4.39-2.1399 6.64-3.0996z" style="fill:#505050;"/><path d="m161 200.88v20.77c1.9-0.80986 3.7702-1.6798 5.6201-2.5898l0.0989-0.0494 0.82005-0.40997h0.10088v-14.621c-2.17-1.1-4.39-2.1399-6.6402-3.0996z" style="fill:#505050;"/><polygon transform="matrix(1 0 0 .99987 4e-5 -3e-5)" points="97.32 201.93 115.5 223.72 133.68 201.93" style="fill:#171717;"/><path d="m111.2 230.88 1.31-16.908c0.32992 1.2798 5.6399 1.2798 5.9999 0l1.3201 16.938c-1.4301 0.0494-2.8601 0.089-4.3 0.089s-2.87 0-4.3-0.089z" style="fill:#171717;"/><path d="m115.49 201.79v0.0692l-7.55 12.678-7.0001 11.809-19.19-26.487c0.60999-0.42995 1.22-0.89985 1.8001-1.3899a52 51.993 0 0 0 10.07-10.619l21.79 13.878z" style="fill:#ebebeb;"/><path d="m149.24 199.86-19.08 26.517-7.0001-11.809-7.57-12.678-0.0593-0.10086 21.94-13.998a52.21 52.203 0 0 0 10.08 10.699c0.58013 0.47009 1.1502 0.92002 1.7301 1.3399z" style="fill:#ebebeb;"/>', sP["05"].head = head, sP["05"].mouth = '<path d="m122.83 151.88a10.49 10.489 0 0 1-14.66 0" style="fill:none;' + str + '6.1996px;stroke:#333;"/>', sP["05"].eyes = '<path d="m70.959 94.985h35.031c2.4086 1e-5 4.3612 1.9523 4.3612 4.3606l-2.5864 17.511c-0.3515 2.3799-1.7218 4.3606-3.8457 4.3606h-30.9c-2.1239-1e-5 -3.8457-1.9523-3.8457-4.3606l-2.5864-17.511c1e-5 -2.4082 1.9526-4.3606 4.3612-4.3606z" style="fill:#1a1a1a;' + str + '3.0045px;stroke:#333;"/><path d="m160.05 94.985h-35.031c-2.4086 1e-5 -4.3612 1.9523-4.3612 4.3606l2.5864 17.511c0.35149 2.3799 1.7218 4.3606 3.8457 4.3606h30.9c2.1239-1e-5 3.8457-1.9523 3.8457-4.3606l2.5864-17.511c-1e-5 -2.4082-1.9526-4.3606-4.3612-4.3606z" style="fill:#1a1a1a;' + str + '3.0045px;stroke:#333;"/><path d="m90.607 102.35a4.6337 4.6332 0 1 0 4.6892 4.6337 4.6337 4.6332 0 0 0-4.6892-4.6337zm49.72 0a4.6337 4.6332 0 1 0 4.6444 4.6337 4.6337 4.6332 0 0 0-4.6444-4.6337z" style="fill:#1a1a1a;"/><path d="m70.66 94.985h-11.775" style="fill:none;' + str + '3.0045px;stroke:#333;"/><path d="m172.13 94.985h-19.484" style="fill:none;' + str + '3.0045px;stroke:#333;"/><path d="m109.32 106.2c4.2045-2.427 9.3036-1.913 12.353-0.0258" style="fill:none;' + str + '3.0045px;stroke:#333;"/><path d="m148.33 109.79-5.7626-8.2324" style="fill:none;' + str + '4;stroke:#fff;"/><path d="m156.27 105-2.403-3.4328" style="fill:none;' + str + '4;stroke:#fff;"/><path d="m82.748 114.34-8.9489-12.784" style="fill:none;' + str + '4;stroke:#fff;"/><path d="m91.408 109.79-5.7626-8.2324" style="fill:none;' + str + '4;stroke:#fff;"/>', sP["05"].top = '<path d="m41.835 75.131c-2.8674 12.582 1.2304 27.241 6.0238 39.031 0.25861 0.63658 0.51208 1.3075 0.79989 1.9683 0.71726 1.658 2.1184 3.9751 3.0038 3.9266 0.56895-0.0312 0.71637-1.5512 1.0228-3.1562 2.1988-19.097 8.8981-27.915 15.636-38.107 2.8783-4.0645 3.8616-7.2293 1.0644-9.9325-6.3236-3.5596-14.924-2.8574-21.367-0.67406-3.2312 1.4765-5.2427 3.4773-6.1842 6.9439zm125.65-8.5679c7.65-0.70616 19.714-0.1307 21.694 8.5679 1.455 6.4083 0.26915 17.747-1.0542 24.579-1.1961 5.3203-3.8066 14.231-7.8782 19.75-0.5565 0.44544-0.96888 0.13656-1.4159-1.1606-0.90692-3.0353-1.4298-7.8372-2.2556-10.727-3.4822-12.79-8.2195-21.875-14.429-29.94-5.5782-6.8415-4.2152-9.7207 5.3393-11.069z" style="fill:#4d4d4d;"/><path d="m112.27 73.826c-18.585-7.5217-34.987-14.797-48.939 5.018-4.9752 7.083-3.7876 8.8056-4.9217 0.0749-1.637-12.476-4.7505-34.174 1.9259-45.194 7.6822-12.7 19.323-13.128 31.039-5.3818 10.796 7.7784 24.277 14.647 38.015 12.219 12.732-2.2576 15.835-7.7464 15.707-19.912-0.0215-2.6-0.0963-5.2106-0.2033-7.7999 13.631 3.9267 24.609 14.776 26.513 29.049 0.88804 6.6336 0.26749 12.722-1.9259 19.013-5.9702 17.108-30.119 20.896-45.74 16.841-3.9588-1.0378-7.6822-2.4181-11.47-3.9267z" style="fill:#4d4d4d;"/>', sP["06"] = [], sP["06"].env = env, sP["06"].clo = '<path d="m115.5 231a115 115 0 0 0 64.23-19.5 114.79 114.79 0 0 0-38-16.5l-2.41-9a125.19 125.19 0 0 0-13.32-2.28v8.75q3.52 0.32 7 0.84l-17.5 17.48-17.5-17.48q3.45-0.52 7-0.84v-8.75a125.55 125.55 0 0 0-13.34 2.28l-2.41 9a114.79 114.79 0 0 0-38 16.5 114.94 114.94 0 0 0 64.25 19.5z" style="fill:#646464;"/><path d="m132.98 193.33-36.185 36.155-2.4-0.42 36.108-36.081z" style="fill:#e3e3e3;"/>', sP["06"].head = head, sP["06"].mouth = '<path d="m127.84 146.73c-2.24 8.93-6.92 15.08-12.34 15.08s-10.1-6.15-12.34-15.08z" style="fill:#fff;' + str + '2.9999px;stroke:#1a1a1a;"/>', sP["06"].eyes = '<path d="m129.31 114.14 20-5.37m-47.66 5.37-20-5.37" style="fill:none;' + str + '4.9998px;stroke:#1a1a1a;"/>', sP["06"].top = '<path d="m169.65 90.998c3.137 11.94 4.9371 36.484-3.4118 58.213l5.129 3.1164c10.044-15.199 14.959-39.163 13.943-61.33z" style="fill:#1a1a1a;"/><path d="m45.081 90.989c-0.88085 4.9304-0.87534 14.953-0.15027 21.75 2.1318 19.98 16.671 42.505 16.671 42.505l5.7352-4.4331s-13.244-31.348-6.0571-52.751c0.52108-1.5517 0.95592-2.916 1.3462-4.1835z" style="fill:#1a1a1a;"/><path d="m117 3.4883c-8.2136-0.19887-19.13 7.933-18.494 9.3516 1.6214 3.6186 11.176 22.55 11.889 23.963h10.148c2.6022-6.3102 11.32-26.531 11.32-26.531s-4.1382-4.138-12.416-6.4375c-0.77605-0.21556-1.5976-0.32513-2.4473-0.3457z" style="fill:#1a1a1a;"/><path d="m115.95 4.5428c-3.1563 0-6.3123 0.57462-9.2165 1.715-5.8084 2.2817-10.532 6.808-12.779 12.245v-5e-3c-1.8166 4.397-2.0233 9.3441-0.58058 13.857 0.69352 2.1687 1.7693 4.2296 3.1533 6.0968h38.893c0.71032-0.95769 1.3441-1.9641 1.8787-3.0144 2.6811-5.2673 2.9296-11.542 0.67253-16.975-2.257-5.4337-6.9893-9.9522-12.802-12.224-2.9064-1.1335-6.0633-1.6987-9.2196-1.6956z" style="fill:#1a1a1a;"/><path d="m92.512 28.125c0.13387 1.4318 0.41877 2.8511 0.85962 4.2306 1.4429 4.5127 4.5278 8.5654 8.6411 11.353 4.1135 2.7873 9.2311 4.2913 14.336 4.2165 5.1052-0.0764 10.168-1.7333 14.181-4.6419 2.8754-2.0834 5.2132-4.7932 6.7665-7.8447 1.2005-2.3586 1.9085-4.9188 2.127-7.5156-15.037-2.6407-31.421-3.4671-46.912 0.20253z" style="fill:#b3b3b3;"/><path d="m34.426 90.63c14.714 4.0779 22.683 6.4085 45.254 7.4257 2.5318-18.185 4.6689-28.672 10.023-38.352 3.2025 13.403 3.8346 25.22 2.9106 42.253l11.172-0.23161c1.4706-11.886 3.8989-29.213 2.1636-42.021 10.416 12.631 11.373 23.624 13.077 39.726 30.174-0.76004 59.808-4.5121 77.845-10.128-10.76-38.608-41.475-55.66-80.38-56.104-38.182-0.45134-74.543 22.405-82.065 57.432z" style="fill:#1a1a1a;"/>', sP["07"] = [], sP["07"].env = env, sP["07"].clo = '<path d="m88.18 194.11c-4.2079 1.021-8.3545 2.2792-12.42 3.7695v26.072a115.5 115.5 0 0 0 79.48 0v-26.072c-4.0858-1.4904-8.2529-2.7486-12.48-3.7695v8.7051c0 9.3888-7.6112 17-17 17h-20.58c-9.3888 0-17-7.6112-17-17v-8.7051z" style="fill:#efefef;"/>', sP["07"].head = head, sP["07"].mouth = '<polygon points="121.61 160.74 109.39 160.74 115.5 171.31" style="fill:#797979;"/><path d="m132.64 144.06a34.42 34.42 0 0 1-34.24 0" style="fill:none;' + str + '5.9998px;stroke:#000;"/>', sP["07"].eyes = '<path d="m170.25 100c1.69 9.62-4.79 29.23-22.4 29.23-6.81 0-15-3.66-20.23-10-4.34-5.33-7.56-12.87-6.2-19.45 1.63-7.89 7.07-11.45 14.67-12.92a68.16 68.16 0 0 1 12.52-1c10.77 0 19.78 3.61 21.64 14.22z" style="fill:#565656;stroke-width:3.99px;stroke:#000;"/><path d="m60.75 100c-1.69 9.62 4.79 29.23 22.4 29.23 6.81 0 15-3.66 20.23-10 4.34-5.33 7.56-12.87 6.2-19.45-1.63-7.89-7.07-11.45-14.67-12.92a68.16 68.16 0 0 0-12.52-1c-10.77 0-19.78 3.61-21.64 14.22z" style="fill:#565656;stroke-width:3.99px;stroke:#000;"/><line x1="100.2" x2="130.8" y1="87.92" y2="87.92" style="fill:none;' + str + '3.99px;stroke:#000;"/><path d="m109.87 101.73c0-2.59 2.52-4.69 5.63-4.69s5.63 2.1 5.63 4.69" style="fill:none;stroke-width:3.99px;stroke:#000;"/>', sP["07"].top = '<path d="m30.622 70.381c2.0971-3.9374 4.6649-7.9604 7.6822-12.037 3.0172-4.0765 6.0987-7.6929 9.2229-10.817l22.897 22.897c-4.4402 4.4403-8.2278 9.5439-11.213 15.14z" style="fill:#999;"/><path d="m160.58 70.423 22.907-22.897c3.1242 3.1242 6.2056 6.7406 9.2229 10.817 3.0065 4.0765 5.5744 8.0994 7.6715 12.037l-28.578 15.182c-2.9851-5.5958-6.7727-10.689-11.224-15.14z" style="fill:#999;"/><path d="m92.411 15.247c3.8197-0.87736 7.6715-1.5407 11.534-1.9794 4.0765-0.46007 7.9282-0.69546 11.555-0.69546 1.53 0 3.1563 0.0428 4.8682 0.1391l1.851 22.255 5.767-21.57c3.1028 0.37449 6.0666 0.86666 8.8912 1.4658l-10.55 49.763c-1.9259-0.41729-3.702-0.70617-5.3176-0.87736-1.423-0.14979-3.2633-0.22468-5.5102-0.22468-2.2362 0-4.237 0.10699-5.981 0.29958-1.9473 0.22469-3.8732 0.55636-5.767 0.99504z" style="fill:#999;"/><path d="m92.411 15.247c1.9152-0.43869 4.023-0.84526 6.3233-1.2304 2.065-0.34238 4.1514-0.62057 6.2698-0.84525l5.1785 50.565c-1.0913 0.10699-2.1827 0.25679-3.2954 0.43868-0.86665 0.14979-1.9152 0.36378-3.1349 0.64196z" style="fill:#4d4d4d;"/>', sP["08"] = [], sP["08"].env = env, sP["08"].clo = '<path d="m141.89 195a114.79 114.79 0 0 1 38 16.5 115.55 115.55 0 0 1-128.47 0 114.79 114.79 0 0 1 38-16.5l15.75 15.75h21z" style="fill:#353535;"/><path d="m146.4 196.14-17.4 17.44-1.17 1.17h-24.34l-1.18-1.17-17.43-17.44c1.49-0.41 3-0.79 4.51-1.14l4.67-1 12.74 12.74h17.69l12.73-12.74 4.67 1c1.52 0.35 3 0.73 4.51 1.14z" style="fill:#919191;"/>', sP["08"].head = head, sP["08"].mouth = '<path d="m115.68 160.64c7.08 0 13.11-4.93 15.46-11.84a2.14 2.14 0 0 0-1.51-2.6101 2.3 2.3 0 0 0-0.73995-0.0593h-26.42a2.12 2.12 0 0 0-2.31 1.9099 1.85 1.85 0 0 0 0.0593 0.73995c2.3401 6.9301 8.3802 11.86 15.46 11.86z" style="fill:#2f2f2f;"/>', sP["08"].eyes = '<path d="m145.38 95.628c-5.1601 2.2597-11.03 2.2597-16.19 0m-47.29 1.75c5.1755-2.2694 11.065-2.2694 16.24 0" style="fill:none;' + str + '5.9998px;stroke:#5e5e5e;"/><path d="m90.016 106.28c-4.4506-0.0105-6.6902 5.3657-3.5508 8.5195 3.1394 3.1539 8.5252 0.93887 8.5352-3.5117 0.0063-2.7522-2.2204-4.9898-4.9727-4.9961l-0.011719-0.01172zm47.281 0c-4.4506-0.0105-6.6902 5.3657-3.5508 8.5195 3.1394 3.1539 8.5252 0.93887 8.5352-3.5117 6e-3 -2.7522-2.2204-4.9898-4.9727-4.9961l-0.01171-0.01172z" style="fill:#1a1a1a;"/>', sP["08"].top = '<path d="m108.37 22.019c-6.2698-12.829-17.151-13.396-18.949 1.1769-11.448-9.4583-26.021-4.483-20.361 12.422-12.251-7.9282-24.919 1.7761-17.076 20.853-27.08 2.3646-22.715 24.726-10.111 31.435-9.9002 3.3566-10.701 9.4006-8.464 14.497 2.6574 4.7842 9.0126 6.4737 11.545 9.6519-6.624 0.59419-8.4112 5.6011-5.7404 9.5192 1.6896 2.4787 5.2756 4.2218 8.5971 5.5455 1.0485 0.40658 3.702 1.2732 3.9053 2.4181 0.18744 1.2156-6.7884 3.0055-5.7281 5.2612 0.60648 1.4227 1.7764 2.7151 2.6466 3.7156 1.2807 1.6595 10.755 8.0351 9.4583 4.2049-1.0271-3.7234-2.2148-7.4682-3.1456-11.192-1.1662-5.3069-1.7868-10.721-1.102-16.156 1.4223-5.455 5.069-4.4265 7.7837-8.3588 3.5264-5.7505 2.0296-11.614 2.124-13.575 0.107-1.7868 1.5407-1.1876 3.1884-1.4337 4.3868-0.64196 7.0081-2.1185 8.8377-6.2698 0.77035-1.9259 0.62057-9.7578 0.52426-11.78 0.36378-4.6328 4.1835 0 6.548 0.64196 3.2633 0.88805 6.8797 0.21399 9.0731-2.5037 1.7547-2.3753 2.0864-2.8888 4.6114-0.80245 2.6856 2.2148 4.0979 3.1349 7.6929 3.274 5.5637 0.20329 8.7735-6.2698 11.32-5.6386 3.5201 0.87735 3.6057 5.4567 10.261 4.8682 2.386-0.20329 3.8304-0.86665 5.4032-2.6428 0.88805-0.99505 1.958-2.5037 3.4345-2.6214 1.4658-0.1177 2.3218 2.3646 3.0065 3.4452 1.1926 2.6755 4.0295 3.6513 6.2377 3.3168 1.958-0.17119 3.854-1.4115 5.4268-2.4707 0.99679-0.66102 1.8284-0.81128 1.9256 0.2071 0.29592 2.2271 0.0862 7.7025 0.1596 8.4821 0.10556 8.4609 5.37 10.569 13.223 10.333-0.31871 3.7464 0.0583 11.28 5.4353 14.562 3.9481 2.7604 6.6657 1.2732 6.7299 7.8534 7e-3 6.1914-0.43693 13.061-1.2946 18.189-0.69547 4.0444-1.2412 6.4838-2.5251 10.378-0.64196 1.9152-0.81315 1.9687 1.4123 1.0699 7.1472-3.1456 10.539-11.48 8.3562-18.842-0.43869-2.0436 0.84525-1.7226 2.8781-2.6106 9.5248-4.2363 8.1264-11.335-0.75967-14.273 11.988-3.0926 13.886-8.9002 6.6871-15.375 7.3077-5.9168 3.6378-16.177-2.8032-16.991 12.422-7.0937 5.7349-22.062-5.1036-18.499 4.1728-12.037-5.5637-26.203-21.121-16.894 6.9653-11.373 2.065-22.661-12.101-10.785-3.4559-18.382-15.14-16.584-23.902-5.018 0.09435-20.075-16.001-17.42-18.146-2.5892z" style="fill:#1a1a1a;"/><path d="m5.4353 80.502c7.4468 9.1373 15.632 8.8912 15.632 8.8912s-6.0772 3.7983-6.8369 9.8755c-0.75966 6.088 4.5579 9.6295 8.0994 10.646 3.5522 1.0058 7.0937-2.7925 7.0937-2.7925s-5.8312 10.646-1.5193 15.964c4.3012 5.3176 11.908 3.0386 11.908 3.0386s-5.3283 10.132 1.0057 14.187c5.8312 3.7234 18.542 7.6715 20.511 8.2706-6.0666-9.7472-9.576-21.249-9.576-33.575v-0.0428c0-35.201 28.546-63.747 63.747-63.747 35.212 0 63.758 28.546 63.758 63.747 0 12.476-3.5843 24.116-9.7899 33.949h0.53496s13.931-1.0057 16.21-9.3727c2.279-8.3562 0.75967-9.8756 0.75967-9.8756s10.635 2.0329 13.417-7.5966l2.7926-9.6295s10.132 0 10.892-7.083c0.75963-7.0937-7.0295-12.411-7.0295-12.411s11.459 0.82385 14.498-10.453c1.0164-3.7555 0.83456-8.2171 0.1391-12.497-17.665-41.161-58.569-69.995-106.18-69.995-30.632 0-60.034 12.187-81.679 33.831v0.0107c-13.171 13.171-22.833 29.22-28.386 46.66z" style="fill:#1a1a1a;"/>', sP["09"] = [], sP["09"].env = env, sP["09"].clo = '<path d="m141.75 195a114.79 114.79 0 0 1 38 16.5 115.53 115.53 0 0 1-128.46 0 114.79 114.79 0 0 1 38-16.5l13.85 13.85v-1.2h17.86v3.1h5z" style="fill:#333;"/><polygon points="115.36 207.65 123.37 224.2 148.3 196.86 143.08 189.95" style="fill:#fff;"/><polygon points="115.36 207.65 107.35 224.2 82.42 196.86 87.63 189.95" style="fill:#fff;"/>', sP["09"].head = head, sP["09"].mouth = '<path d="m126.28 149.82c-6.16 2.43-15.52 2.42-21.56 0" style="fill:none;' + str + '5.9998px;stroke:#1c1c1c;"/>', sP["09"].eyes = '<path d="m83.527 103.98v10h10v-10h-10zm53.945 0v10h10v-10h-10z" style="fill:#1a1a1a;"/><path d="m56.621 94.906v11.688h5.3418v6.4922h5.3418v6.1055h5.3223v6.2324h26.846v-6.2324h5.3047v-6.1055h5.1445v-6.0039h11.154v6.0039h5.1446v6.1055h5.3066v6.2324h26.846v-6.2324h5.3203v-6.1055h5.3438v-6.4922h5.3418v-11.688z" style="fill:#1a1a1a;"/><path d="m67.387 100.65v5.9394h5.1992v-5.9394zm5.1992 5.9394v6.4922h5.4238v-6.4922zm5.4238 0h5.1992v-5.9394h-5.1992zm5.1992 0v6.4922h5.4258v-6.4922zm5.4258 6.4922v6.1055h5.1426v-6.1055zm-10.625 0v6.1055h5.1445v-6.1055zm48.281-12.432v5.9394h5.1992v-5.9394zm5.1992 5.9394v6.4922h5.4238v-6.4922zm5.4238 0h5.1992v-5.9394h-5.1992zm5.1992 0v6.4922h5.4258v-6.4922zm5.4258 6.4922v6.1055h5.1426v-6.1055zm-10.625 0v6.1055h5.1445v-6.1055z" style="fill:#fff;"/>', sP["09"].top = '<path d="m157.79 67.5a61.31 61.31 0 0 1-42.79 17.43h-55.7c18.16-37.74 68.27-46.85 98.49-17.43z" style="fill:#4d4d4d;"/><path d="m122.93 7.0078c-10.503-0.15729-21.09 1.6448-29.545 5.4316-17.141 7.8999-32.169 23.297-43.973 38.779-5.1703 6.8631-8.7779 13.46-8.1855 18.395 0.93114 12.312 10.372 26.483 11.068 36.9 15.663-72.081 105.99-70.452 124.91-7.0525l4e-3 0.0156c5.616-10.926 8.0682-20.188 8.352-27.653 0.43654-15.607-7.8088-21.149-21.735-28.249 1.7934-3.7704 1.7273-7.5023 2.0625-10.154-0.79964-7.8568-3.6796-13.51-10.43-17.758-5.9434-3.7404-13.06-6.0867-18.463-7.2266-4.5319-0.87895-9.2901-1.3562-14.064-1.4277z" style="fill:#4d4d4d;"/><path d="m42.426 75.338c0.52158 18.689 10.557 74.338-18.115 101.25 12.38 10.603 28.352 19.061 46.025 24.594 11.032-4.6874 22.88-7.4147 34.817-8.5046l0.0633-14.477c-22.49-4.3813-40.766-18.898-48.862-39.967-8.096-21.07-4.7931-44.72 9.2478-62.393zm124.67 2.7207c7.8997 10.886 11.743 24.64 11.787 37.441-0.36632 30.178-22.389 57.576-53.12 62.708l0.0238 14.471c12.282 1.1216 24.518 3.9888 35.825 8.9128 15.488-5.1448 30.007-13.325 42.396-25.043-13.136-22.051-23.282-63.045-18.694-101.55z" style="fill:#4d4d4d;"/><path d="m143.61 46.383c-11.639 0.12482-20.998 1.8906-20.998 1.8906l-9 3.5059c0.63003-0.0191 1.2603-0.0289 1.8906-0.0293h0.0996c35.169 0.055 60.959 27.235 63.283 63.383 7.4e-4 31.157-22.742 57.213-53.106 63.079l-0.0216 14.498c11.567 1.0563 23.154 3.6067 33.887 8.0463 35.952-15.315 55.082-52.303 36.709-68.279-5.018-7.9035-10.44-15.409-9.5544-23.03 5.0545-50.452 0.39626-63.561-43.189-63.064zm-69.966 21.09c-15.286 3.244-17.096 3.73-31.734 6.6953 3.0304 13.081 3.0583 22.274 1.2085 30.012-3.8004 11.361-8.9712 19.787-12.286 28.764-6.8823 22.459-2.9157 31.982 12.093 46.165 8.6595 8.0693 19.861 16.209 30.939 20.647 2.669-1.0316 5.3729-1.9628 8.106-2.792 7.4979-2.275 15.388-3.6535 23.206-4.3673l0.0433-14.393c-23.933-4.5937-44.283-21.98-50.77-45.817-6.3319-23.265 0.51104-48.752 19.195-64.914z" style="fill:#4d4d4d;"/>', sP[10] = [], sP[10].env = env, sP[10].clo = '<path d="m141.75 195a114.79 114.79 0 0 1 38 16.5 115.53 115.53 0 0 1-128.46 0 114.79 114.79 0 0 1 38-16.5l15.71 15.75h21z" style="fill:#666;"/><path d="m89.291 195a114.79 114.79 0 0 0-38.002 16.5 115.53 115.53 0 0 0 38.002 16.482zm52.434 0v32.982a115.53 115.53 0 0 0 38-16.482 114.79 114.79 0 0 0-38-16.5z" style="fill:#999;"/><path d="m157.15 199.75c0.2548 7.4501 1.54 14.855 4.9512 21.432a115.53 115.53 0 0 0 17.619-9.6797 114.79 114.79 0 0 0-22.57-11.752zm-83.295 2e-3a114.79 114.79 0 0 0-22.57 11.75 115.53 115.53 0 0 0 17.621 9.6797c3.411-6.5765 4.6944-13.98 4.9492-21.43z" style="fill:#ccc;"/><path d="m99.197 204.97v2e-3l16.302 16.301 16.301-16.301v-2e-3z" style="fill:#fff;"/>', sP[10].head = head, sP[10].mouth = '<path d="m100.19 152.09c2.8726 4.0616 9.8095 4.7232 15.119-0.45432 5.0656 4.5134 11.167 5.6898 15.495 0.31458" style="fill:none;' + str + '5.8949;stroke:#333;"/><path d="m109.67 135.53c-0.9758 0.0743-2.05 0.45327-3.1485 0.99414-4.3235 2.1399-7.3862 4.2557-10.639 7.1406-0.6251 0.5715 0.1168 0.77785 1.4238 0.87304 5.6967 0.0536 14.384 0.41404 15.098-0.875 1.9251-2.0788 1.7969-5.3303-0.1816-7.3008-0.701-0.67533-1.5769-0.90632-2.5527-0.83203zm11.656 0c-0.9758-0.0743-1.8517 0.1567-2.5527 0.83203-1.9785 1.9705-2.1067 5.222-0.1817 7.3008 0.7142 1.289 9.401 0.9286 15.098 0.875 1.307-0.0952 2.0489-0.30154 1.4238-0.87304-3.2524-2.8849-6.3151-5.0007-10.639-7.1406-1.0985-0.54087-2.1727-0.91985-3.1485-0.99414z" style="fill:#333;"/>', sP[10].eyes = '<path d="m97.56 107.84a10.63 10.63 0 0 1-15 0.13l-0.13-0.13" style="fill:none;' + str + '6.3px;stroke:#000;"/><path d="m148.59 107.84a10.63 10.63 0 0 1-15 0.13l-0.13-0.13" style="fill:none;' + str + '6.3px;stroke:#000;"/>', sP[10].top = '<path d="m41.668 87.073c-9.2319-0.0231-11.63 6.5104 2.2676 17.66-14.015 1.1231-4.3662 16.457 4.875 24.66 4.0686 3.0199 6.4647 5.4657 5.5078 1.1348-1.2079-4.9178-1.8184-9.9634-1.8184-15.027 3.26e-4 -7.5692 1.2547-15.016 3.7883-22.183 0.57048-1.7876 1.0689-2.0306-0.37721-2.6839-5.5405-2.4478-10.375-3.5511-14.243-3.5608z" style="fill:#ccc;"/><path d="m185.48 89.513c-2.4418-0.11189-5.4618 0.81187-9.5148 3.2121-1.314 0.81729-0.70075 1.995-0.32301 3.2653 3.194 10.982 3.8215 22.462 1.2538 33.628-0.31613 1.688-0.47649 3.569 2.6953 1.3516 7.7016-5.371 19.17-18.734 16.918-26.105-1.4251-3.9177-11.4-0.35546-11.4-0.35546s4.987-4.2755 5.3437-9.6191c0.20048-3.0057-1.5237-5.2189-4.9726-5.377z" style="fill:#ccc;"/><path d="m91.689 36.108c-3.7298-7.3864-9.5859-10.504-17.578-6.7891-9.5194 4.5907-15.629 18.444-13.416 29.232 0 0-8.5511-4.9878-18.17-3.5625-19.623 8.094-1.4102 29.869 10.817 37.342 2.075 1.297 2.5792 1.7432 3.4291-0.37685 2.6746-6.5374 6.1886-12.722 11.297-17.709 4.1039 8.7427 14.629 4.1809 20.006-0.14062 4.4873 9.6838 10.377 6.3535 15.377 3.4785 4.0764 7.8829 10.756 7.25 17.631 0.0625 4.875 4.5625 14.713 4.1867 15.555-3.426 8.4753 2.6244 14.012 10.437 22.962-1.4764 8.8552 6.8221 14.407 16.853 17.122 27.51 0.34 1.554 1.175 0.85565 2.2212 0.44315 10.255-4.286 22.842-15.749 15.705-23.975-3.5623-3.5623-13.539-2.1387-13.539-2.1387s6.77-7.1233 9.2637-18.168c2.4936-11.043-23.514-4.9883-23.514-4.9883s7.4818-5.6993 12.113-13.537c4.6314-7.8378-2.4943-11.756-11.045-11.043-8.5496 0.71204-17.1 7.4805-17.1 7.4805s3.3946-7.8055-3.5625-12.826c-9.5935-6.9234-23.869 6.4121-23.869 6.4121-4.2562-26.835-24.872-6.386-31.707 8.1953z" style="fill:#ccc;"/>', sP[11] = [], sP[11].env = env, sP[11].clo = '<path d="m116 203.13c-0.12 0-0.25 0.12-0.49 0.12s-0.25-0.12-0.49-0.12zm-27.29-8c0.87-0.25 1.72-0.47 2.56-0.69a32.37 32.37 0 0 0 0.3 8.57 21.5 21.5 0 0 0 7 6.88c6.41-6 16.8-6.64 16.8-6.64s10.5 0.58 17 6.69a21.61 21.61 0 0 0 6.93-6.66 32.34 32.34 0 0 0 0.35-8.84l2.13 0.56a114.79 114.79 0 0 1 38 16.5 115.53 115.53 0 0 1-128.46 0 114.64 114.64 0 0 1 37.38-16.37z" style="fill:#e9e9e9;"/><path d="m126.15 206-3.92 7.83h-13.46l-3.92-7.83a36.59 36.59 0 0 1 10.65-2.7 35.66 35.66 0 0 1 10.65 2.7z" style="fill:#818181;"/><path d="m124.54 230.65-2.18-16.74h-13.47l-2.19 16.76c2.9 0.22 5.84 0.33 8.8 0.33s6.06-0.12 9-0.35z" style="fill:#989898;"/><path d="m134.84 186s0.86 9.8-19.34 17.26c0 0 15.79 0.86 20.57 11.76 0.12 0.49 9.3-23.26-1.23-29z" style="fill:#fff;"/><path d="m96.16 186c-10.41 5.76-1.35 29.39-1.1 29 4.65-10.78 20.56-11.76 20.56-11.76-20.32-7.45-19.46-17.24-19.46-17.24z" style="fill:#fff;"/>', sP[11].head = head, sP[11].mouth = '<path d="m118.57 165.14a8.66 8.66 0 0 0-2.76-4.23h-0.62a8 8 0 0 0-2.76 4.22c-0.52 1.89 2.07 10.61 2.76 12.53h0.62c0.64-1.76 3.19-10.82 2.76-12.52z" style="fill:#333;"/><path d="m102.81 152.24a2.4921 2.4921 0 1 1 1.19-4.84l0.21 0.06a37.1 37.1 0 0 0 5.43 1.12 44.52 44.52 0 0 0 11.76 0 37.1 37.1 0 0 0 5.43-1.12 2.4903 2.4903 0 0 1 1.59 4.72l-0.21 0.06a43.08 43.08 0 0 1-6.15 1.29 48.55 48.55 0 0 1-13.08 0 42.79 42.79 0 0 1-6.17-1.29z" style="fill:#333;"/>', sP[11].eyes = '<path d="m86.851 100.39a4.94 4.94 0 1 0 4.9297 5 5 5 0 0 0-4.9297-5zm57.221 0a4.94 4.94 0 1 0 4.9394 4.9394 4.94 4.94 0 0 0-4.9394-4.9394z" style="fill:#333;"/><path d="m86.207 89.365c-25.504 0-21.503 6.8561-21.035 19.596 0.80177 18.121 17.763 16.514 21.201 16.639 14.758-0.041 20.518-8.227 22.951-22.932 1.8166-10.731-9.251-13.174-23.117-13.303zm58.598 0c-13.866 0.1284-24.936 2.5717-23.119 13.303 2.4332 14.705 8.1936 22.891 22.951 22.932 3.4383-0.125 20.399 1.4828 21.201-16.639 0-18.965-0.47958-19.596-21.033-19.596z" style="fill:#4d4d4d;"/><path d="m169.87 90.255a0.51 0.51 0 0 0-0.43991-0.52 167.64 167.64 0 0 0-22.6-1.6801c-12 0-27.47 3.7601-30.17 3.7601h-2.4c-1.2499 0-5.29-0.80996-10.45-1.6801a124.35 124.35 0 0 0-19.72-2.08 166.18 166.18 0 0 0-19.31 1.24c-1.56 0.17999-2.69 0.35009-3.2899 0.44009a0.51 0.51 0 0 0-0.44007 0.52l-0.091 6.4501a0.57 0.57 0 0 0 0.33012 0.52l0.73994 0.23992c1.08 0.41992 1.0001 19.85 6.78 24.71 3.4401 2.8599 6.51 4.4899 19.42 4.4899 7.4699 0 12.17-1.9999 16.63-8 3.21-4.32 6.0999-14.55 6.0999-14.55 0.82006-4.07 3.7702-4.52 4.43-4.5801h0.12068c0.11078 0 3.66 0.0593 4.57 4.5801 0 0 2.8599 10.22 6.0699 14.54 4.4601 5.9999 9.1601 8 16.63 8 12.91 0 16-1.63 19.42-4.4901 5.7898-4.86 5.6998-24.29 6.78-24.71l0.73994-0.23993a0.57 0.57 0 0 0 0.32996-0.52l-0.12068-6.4501zm-65 23c-1.9101 4.5-6.8 10.29-13.7 10.64-20.7 0.99985-21.65-4.7401-23-9.3201a31.45 31.45 0 0 1-1.2099-13.18c0.53997-4.5799 1.7-7.2699 3.7801-8.6201a9.3 9.3 0 0 1 4.3499-1.51 85.07 85.07 0 0 1 11.4-0.52 59.23 59.23 0 0 1 9.2099 0.69999c7.37 1.2 12.35 3.7001 12.35 6.1601a46.12 46.12 0 0 1-3.23 15.64zm58 1.3201c-1.34 4.5799-2.29 10.36-23 9.3201-6.91-0.3501-11.81-6.1401-13.71-10.64a46.35 46.35 0 0 1-3.22-15.64c0-3.39 9.43-6.8599 21.56-6.8599 12.13 0 14 0.89996 15.75 1.9999 2.08 1.3502 3.2398 4 3.77 8.6201a31.23 31.23 0 0 1-1.1601 13.17z" style="fill:#333;"/>', sP[11].top = '<path d="m156.1 15.879c-0.38556 5.3015-1.7049 9.4762-3.6602 12.76-0.41226 23.773-9.2343 35.229-15.154 42.797l15.062-4.6641c-0.66253 2.8135-2.4628 7.156-0.34766 12.137 1.6334-2.3144 7.9395-5.807 13-3.3477-0.43442 3.5532-0.95271 7.094-1.4512 10.639l8.9648 0.85937c0.83453 3.8792 0.51719 9.3449-0.59961 11.736l5.5508 2.0098c0.20764 2.7646 0.10001 5.4906-0.74609 8.875 8.4545-1.7225 14.213-4.3896 19.641-13.188 2.8639-4.7524 4.9018-10.483 4.7305-17.242-4.1612 4.916-9.6484 7.2485-15.26 10.109 6.507-11.065 8.8648-22.768 8.1367-30.58-7.3456 10.251-11.649 13.06-19.918 16.9 1.2386-11.4 5.5249-18.582 12.461-27.27-11.392-1.3025-16.301 1.4749-24.891 6.4395 4.5466-14.036 2.2208-26.679-5.5195-38.971zm-117.76 28.682c9.3378 3.6366 19.581 9.0234 21.129 18.549-7.6182 0.0414-14.897-3.5072-20.242-7.1894-0.15967 8.2309 2.8451 12.252 6.7734 19.08-7.2127 1.6129-12.084 4.8315-17.471 9.4805 7.2948-0.15715 12.299-1.0502 16.891 4.2793-6.0512 5.0164-11.99 10.79-11.99 19.24 9.257-6.1688 12.495-5.9486 21.137-2.2012 1.2906-8.0996 2.3978-14.872 2.7869-16.435 2.4719-0.73247 3.5247-0.94807 5.9221-1.2938-2.1556-7.4281 1.0996-9.5176 2.4141-11.6l7.543 1.5059c-3.9093-6.1699 2.6565-12.483 7.1445-15.51-4.4474-7.2082-5.6649-11.558-7.377-16.797-11.198-8.2947-23.895-6.2742-34.66-1.1094z" style="fill:#f9f9f9;"/><path d="m101.9 7.6408c-10.047 6.2416-12.441 28.646-12.131 33.289-6.9249-5.8258-7.8992-13.75-7.7695-19.203-9.6235 6.0158-10.666 14.421-9 23.943 1.1061 5.1411 2.3972 10.461 7.377 16.797 2e-3 -1e-3 4e-3 -3e-3 6e-3 -4e-3 2.7742 2.8742 5.4644 5.5941 8.3477 8.3574 0.41187-6.971 0.45449-13.622 7.1856-15.824 3.9532 2.8169 7.4123 5.9388 11.084 9.1035l10.559-10.25c5.6447 3.961 5.4531 6.5652 6.5215 14.104 2.153-1.7546 8.719-9.0037 15.844-10.139 0.98706 4.1261-0.99388 10.308-2.6387 13.621 0 0 14.32-11.846 15.195-27.971 0.33968-6.2599 0.2237-11.146-0.041-14.826-3.2125 5.5652-8.7118 8.7799-13.789 10.15-4.2715-9.2486-2.4785-21.435-0.48047-29.309-12.21 3.0195-20.932 18.337-22.172 25.07-9.2678-7.397-13.605-16.146-14.098-26.91z" style="fill:#f9f9f9;"/>', sP[12] = [], sP[12].env = env, sP[12].clo = '<path d="m141.75 195a114.79 114.79 0 0 1 38 16.5 115.53 115.53 0 0 1-128.46 0 114.79 114.79 0 0 1 38-16.5l26.23 13 26.27-13z" style="fill:#131111;"/><polygon points="115.5 208.03 115.5 207.74 82.72 188.91 80.45 198.86 101.46 222.72" style="fill:#cbcbcb;"/><polygon points="115.5 208.03 115.5 207.74 148.28 188.91 150.55 198.86 129.54 222.72" style="fill:#cbcbcb;"/>', sP[12].head = head, sP[12].mouth = '<path d="m123.07 154.05a10.61 10.61 0 0 1-15 0.14l-0.14-0.14" style="fill:none;' + str + '6.3px;stroke:#000;"/><path d="m120.1 142.22 0.19-0.11c3-1.87 5.45-2.4 7.3-1.46 2.15 1.1 3.12 3.84 4.84 5.5a5.18 5.18 0 0 0 6.68 0.73m-28.21-4.66-0.19-0.11c-3-1.87-5.45-2.4-7.3-1.46-2.15 1.1-3.12 3.84-4.84 5.5a5.18 5.18 0 0 1-6.68 0.73" style="fill:none;' + str + '5.9998px;stroke:#4d4d4d;"/>', sP[12].eyes = '<path d="m161.73 86.016h-92.51c-3.37 0-6.0001 2.3998-6.0001 5.2999v28.45c0 3.0002 2.74 5.3001 6.0001 5.3001h32.36c7.0901 0 7.44-19.43 13.82-19.43s6.8801 19.44 13.83 19.44h32.36c3.37 0 5.9999-2.4 5.9999-5.3001v-28.46c0.14043-2.9001-2.6-5.2999-5.9-5.2999z" style="fill:#8f8f8f;"/><path d="m161.73 86.016h-92.51c-3.37 0-6.0001 2.3998-6.0001 5.2999v28.45l104.55-28.45c0-2.9001-2.74-5.2999-5.9999-5.2999z" style="fill:#e3e3e3;"/><path d="m161.73 86.016h-92.51c-3.37 0-6.0001 2.3998-6.0001 5.2999v28.45c0 3.0002 2.74 5.3001 6.0001 5.3001h32.36c7.0901 0 7.44-19.43 13.82-19.43s6.8801 19.44 13.83 19.44h32.36c3.37 0 5.9999-2.4 5.9999-5.3001v-28.46c0.14043-2.9001-2.6-5.2999-5.9-5.2999z" style="fill:none;' + str + '4.0026px;stroke:#232323;"/>', sP[12].top = '<path d="m69.834 33.826c-8.2001-0.0626-16.444 2.6753-23.152 7.7038-8.5298 6.9899-12.159 19.61-12.329 32.68-0.2041 15.476 1.6092 34.752 1.7464 51.915 0.10414 13.047 0.53485 25.984-2.9197 33.995-2.4994 5.81-9.0955 9.6006-16.196 12.311 7.9599 2.8301 25.009 2.8094 33.58 1.5393 10.8-1.59 17.238-6.5294 17.159-22.699-0.0911-15.93-1.3894-29.23-1.559-45.83-0.3208-11.983-1.569-24.291 4.9774-33.987 4.2139-6.1265 10.452-10.521 17.116-13.588 3.9292-1.8575 8.0384-3.3083 12.263-4.3297-6.8718-13.574-18.732-19.618-30.687-19.709z" style="fill:#b3b3b3;"/><path d="m90.8 76.246c11.918-17.125 31.996-23.218 49.743-17.488 11.81 3.9496 20.692 13.389 22.313 28.237 0.51051 6.2098 0.63413 12.445 0.37007 18.67-0.23973 11.2-0.72946 23.82-1.0995 34.08-0.82005 22.43 0.0593 35.1 24.589 36.3 8.5635 0.32122 17.137-0.22845 25.59-1.6405h-0.0198c-10.74-3.3799-17.98-15.609-19.3-26.289-1.29-10.41-0.6098-23.43-0.7898-38.091-0.1701-14.96 1.0398-29.819 0.28008-42.089-1.414-22.777-14.947-38.505-34.126-45.152-27.813-7.35-51.083 0.091-61.672 17.343-5.4698 8.9112-7.7413 20.07-5.8788 36.121z" style="fill:#b3b3b3;"/>', sP[13] = [], sP[13].env = env, sP[13].clo = '<path d="M61.11,205.59l3.49,3.69-6.26,6.6A115.45,115.45,0,0,0,72,222.51v-22a115.19,115.19,0,0,0-10.85,5.1Z" style="fill:#eee;"/><path d="M93.24,228.85V199l-4-4A114.43,114.43,0,0,0,72,200.49v22a114.43,114.43,0,0,0,21.28,6.34Z" style="fill:#787878;"/><path d="m159 222.51v-22a114.63 114.63 0 0 0-17.25-5.51l-4 4v29.86a114.16 114.16 0 0 0 21.25-6.35z" style="fill:#787878;"/><path d="m169.89 205.59-3.49 3.69 6.26 6.6a115.45 115.45 0 0 1-13.66 6.63v-22a115.19 115.19 0 0 1 10.85 5.1z" style="fill:#eee;"/><path d="M115.5,219.62A28.5,28.5,0,0,1,87.25,195c2.93-.74,5.92-1.36,8.94-1.87a19.41,19.41,0,0,0,38.62,0c3,.51,6,1.13,8.94,1.87a28.49,28.49,0,0,1-28.25,24.63Z" style="fill:#c9c9c9;"/>', sP[13].head = head, sP[13].mouth = '<path d="m115.5 153.93a14 14 0 0 1-10.5-4.69 3.4209 3.4209 0 0 1 5-4.67l0.08 0.08 0.08 0.09a7.35 7.35 0 0 0 10.39 0.37l0.37-0.37a3.4206 3.4206 0 1 1 5.23 4.41l-0.08 0.09a14 14 0 0 1-10.53 4.69z" /><path d="m115.27 127.32c-7.6627-0.03-15.251 1.4419-20.646 5.1465-7.62 5.33-9.9053 11.512-14.127 18.109-3.4379 5.2447-9.326 10.024-13.467 6.334 25.425 29.755 71.409 29.786 96.875 0.0664-6.8104 3.9305-11.545-2.47-13.508-6.4004-10.697-17.605-14.115-22.656-35.127-23.256zm-0.26758 8.3984c7.457 0.0802 14.986 1.2966 17.146 5.9522 2.5765 11.319-7.5878 17.454-16.681 17.515-6.09-0.05-12.2-2.3802-15.26-7.7402-6.36-11.16 3.6349-15.607 14.795-15.727z" style="fill:#404040;"/>', sP[13].eyes = '<path d="m91.72 97.36v11.4m47.56-11.4v11.4" style="fill:none;' + str + '7.9999px;stroke:#333;"/>', sP[13].top = '<path d="m52.107 57.293c-1.3411 14.839-3.8707 52.771 1.3145 72.715-0.67572-43.829 12.389-70.177 62.078-70.187 49.689 0.010061 62.754 26.359 62.078 70.187 5.1852-19.944 2.6556-57.876 1.3145-72.715h-63.393-63.393z" style="fill:#4d4d4d;"/><path d="m52.339 30.629c-1.3825 24.448-2.1216 45.905-1.4497 66.517 9.4643-48.304 112.77-54.916 129.22 0 0.67191-20.612-0.3798-47.256-1.4928-66.517-32.241 14.296-91.346 18.861-126.28 0z" style="fill:#4d4d4d;"/><path d="m115.5 24.92c-22.25 0-44.5 4.2296-56.72 12.69-3.32 2.3-5.0602 6.4392-5.5903 10.269-0.45275 3.23-0.84043 6.7561-1.1785 10.461h126.98c-0.33704-3.7047-0.72492-7.2306-1.1775-10.461-0.53009-3.8301-2.2697-7.9992-5.5897-10.269-12.22-8.4601-34.47-12.69-56.72-12.69z" style="fill:#4d4d4d;"/><path d="m76.521 39.139c21.233 3.3965 33.116-13.392 37.59-31.72 4.3614 17.158 14.175 34.968 36.577 31.584-33.921 20.594-57.646 11.594-74.167 0.1345z" style="fill:#4d4d4d;"/>', sP[14] = [], sP[14].env = env, sP[14].clo = '<path d="m91.92 194.41a101.47 101.47 0 0 1 23.58 17.09 101.47 101.47 0 0 1 23.58-17.09c0.89 0.19 1.78 0.38 2.67 0.59a114.79 114.79 0 0 1 38 16.5 115.53 115.53 0 0 1-128.46 0 114.79 114.79 0 0 1 38-16.5c0.88-0.21 1.78-0.4 2.67-0.59z" style="fill:#757575;"/><path d="m73.65 199.82c16.59 8.23 28.72 18.91 34.27 30.93a114.86 114.86 0 0 1-56.65-19.25 115.06 115.06 0 0 1 22.38-11.68z" style="fill:#d8d8d8;"/><path d="m60.63 205.85c12.35 5.94 21.93 13.44 27.59 21.91a114.7 114.7 0 0 1-36.95-16.26q4.53-3 9.36-5.65z" style="fill:#757575;"/><path d="m157.35 199.82c-16.6 8.23-28.72 18.91-34.27 30.93a114.86 114.86 0 0 0 56.65-19.25 115.06 115.06 0 0 0-22.38-11.68z" style="fill:#d8d8d8;"/><path d="m170.37 205.85c-12.35 5.94-21.93 13.44-27.59 21.91a114.7 114.7 0 0 0 36.95-16.26q-4.53-3-9.36-5.65z" style="fill:#757575;"/>', sP[14].head = head, sP[14].mouth = '<path d="m115.5 131c-17.71 0.65-27 9.41-29.61 23.69-1 5.62-0.43 7.06 2.76 7.17 22.76 0.76 22.23 18.21 26.85 18.89 4.62-0.68 4.09-18.13 26.85-18.89 3.19-0.11 3.79-1.55 2.76-7.17-2.62-14.28-11.9-23-29.61-23.69zm0 29.31c-10 0-18-5-18-11.17s8.08-11.17 18-11.17 18 5 18 11.17-8.08 11.17-18 11.17z" style="fill:#333;"/><path d="m123.54 148.46a11.53 11.53 0 0 1-16.09 0" style="fill:none;' + str + '6.7998px;stroke:#000;"/>', sP[14].eyes = '<path d="m133 108.17h14.17m-63.26 0h14.09m-20.69-8.93a21.31 21.31 0 0 1 27.29 0m21.8 0a21.31 21.31 0 0 1 27.29 0" style="fill:none;' + str + '4.8243px;stroke:#000;"/>', sP[14].top = '<path d="m115.5 51.75c-38.702 5.3101-54.215 18.038-59.863 35.101" style="fill:none;' + str + '12;stroke:#333;"/><path d="m115.5 51.75c-7.8393 3.6337-5.5974 16.583-14.341 23.452" style="fill:none;' + str + '12;stroke:#333;"/><path d="m111.35 48.614c-22.634-6.9181-42.457-3.1988-55.733 2.5105" style="fill:none;' + str + '12;stroke:#333;"/><path d="m115.47 54.008c0.1965-6.7774-0.1436-26.309 0.05-38.184" style="fill:none;' + str + '12;stroke:#333;"/><path d="m68.874 28.177c34.115-3.382 41.987 13.321 45.17 19.602" style="fill:none;' + str + '12;stroke:#333;"/><path d="m116.49 48.69c2.8876-6.3019 10.358-21.518 43.469-22.326" style="fill:none;' + str + '12;stroke:#333;"/><path d="m116.92 51.766c1.5094 6.3991 3.4988 15.595 10.088 23.058" style="fill:none;' + str + '12;stroke:#333;"/><path d="m113.81 51.532c22.03-7.8674 46.709-7.3614 59.444-2.0465" style="fill:none;' + str + '12;stroke:#333;"/><path d="m114.53 52.278c36.226 4.8583 52.414 17.092 59.373 33.347" style="fill:none;' + str + '12;stroke:#333;"/><path d="m55.637 86.851c-4.1213 12.452-2.9877 27.213-1.777 43.084" style="fill:none;' + str + '12;stroke:#333;"/><path d="m55.614 51.124c-13.422 5.5019-21.908 16.409-24.712 28.774-1.8322 8.4632-1.9809 18.156-1.6096 28.486" style="fill:none;' + str + '12;stroke:#333;"/><path d="m173.26 49.486c24.917 10.399 26.707 36.537 27.209 59.62" style="fill:none;' + str + '12;stroke:#333;"/><path d="m173.9 85.625c5.4042 12.625 5.2413 27.675 4.5745 43.58" style="fill:none;' + str + '12;stroke:#333;"/><path d="m53.86 129.93c1.293 16.951 2.6738 35.169-2.1664 53.193" style="fill:none;' + str + '12;stroke:#333;"/><path d="m29.292 108.38c0.6173 17.177 2.6722 36.119 0.8158 54.108" style="fill:none;' + str + '12;stroke:#333;"/><path d="m200.47 109.11c0.3586 18.529-1.2751 36.94 1.9231 48.985" style="fill:none;' + str + '12;stroke:#333;"/><path d="m178.48 129.2c-0.7279 17.362-2.0563 35.743 2.6011 53.099" style="fill:none;' + str + '12;stroke:#333;"/>', sP[15] = [], sP[15].env = env, sP[15].clo = '<path d="m141.75 195a114.79 114.79 0 0 1 38 16.5 115.53 115.53 0 0 1-128.46 0 114.79 114.79 0 0 1 38-16.5 115.77 115.77 0 0 1 15.71-2.53v-14.09a63.8 63.8 0 0 0 21 0v14.09a116.6 116.6 0 0 1 15.75 2.53z" style="fill:#1a1a1a;"/><path d="m60.984 205.66 6.2675 2.2051 3.4074-6.819 2.8018-1.1353-3.9911 7.9907 27.222-3.0857 3.2541-11.739 2.1451-0.2692-3.2833 11.819 20.393-1.6011-14.191-15.945v-2.4379l17.606-5.7274 3.3855-0.473v1.47l-19.167 6.2295 14.731 16.542 19.839-7.7432 3.3636 0.8223-21.371 8.34 20.532 13.842 2.6777-21.687 1.9481 0.5604-2.7726 22.378 0.0584 0.0364 8.5075 4.9923-2.4807 0.85145-6.4718-3.7916-1.2987 6.0622-2.1524 0.53125 1.3425-6.2804-17.037 8.8348-5.0271 0.35661 21.59-11.193-20.962-14.133-7.5006 25.457-2.0721-0.0364 7.6392-25.915-21.05 1.652 9.0109 24.052-1.4155-0.0946-0.49615-0.0437-0.073-7e-3 -0.2043-0.0145-8.3688-22.342-10.127 19.242-1.9846-0.52399 10.514-19.962-26.04 2.9547 13.425 16.418-3.4438-1.0625-12.083-14.781-8.1645 5.9675-1.9043-1.077 8.128-5.9385-6.9898-2.4598 2.3348-1.2881zm92.509-7.2556 14.228 20.093-1.8095 0.89514-15.614-22.043z" style="fill:#b2b2b2;"/>', sP[15].head = head, sP[15].mouth = '<path d="m97.06 144.59a20.15 20.15 0 0 0 36.88 4.53z" style="fill:#fff;' + str + '2.9999px;stroke:#000;"/>', sP[15].eyes = '<line x1="85.29" x2="85.29" y1="98.73" y2="109.79" style="fill:none;' + str + '8.7999px;stroke:#000;"/><path d="m108.28 72.16h62.18c9.19 0 13.32 1.21 14.71 8.52 3.61 18.95 2.2 33.49-0.44 43.75a65.07 65.07 0 0 1-5.89 14.78 73.52 73.52 0 0 1-7.06 10.26c-1.8 2.27-5.17 1.21-4.19-1.09 0.14-0.47 0.27-1 0.4-1.48a14.29 14.29 0 0 0 0.52-6.62 12.52 12.52 0 0 0-3.88-6.3c-4.17-3.9-12.81-8.71-32.53-13.66-6.4-1.6-10.69-2.24-11.76-2.79a7.08 7.08 0 0 1-3.85-6.31v-9c0-2.39 0.18-4.55-1.56-6.57s-4.16-2.13-6.65-2.14a6 6 0 0 1-6-6v-9.35a6 6 0 0 1 6-6z" style="fill:#1a1a1a;"/><path d="m135.9 98.73v9.27m15.22-9.29v9.29" style="fill:none;' + str + '7.7998px;stroke:#b2b2b2;"/>', sP[15].top = '<path d="m109.99 15.57c-13.46 3.6301-19.789 11.95-24.069 24.08-6.9996-7-8.7307-10.82-7.5606-21.43a41 41 0 0 0-9.2698 24.988c0.0366 7.6776 5.6462 13.939 12.697 15.297-13.315 5.8106-15.258 22.033-14.045 33.524 5.7687-11.861 14.254-20.981 27.258-22.951-0.43017 6.6-2.5099 10.22-7.29 17.66 18.29-2.8601 25.119-7.8199 37.15-18.24 0.46001 0 1.0001 0.089 1.4606 0.12058-0.33023 3.5601-1.0906 6.5598-5.0004 12.46 9.5298-1.32 14.721-5.8006 17.539-11.671 8.8862 0.95314 15.836 6.785 21.26 14.818 1.928-15.211-4.4766-26.6-19.807-34.036 1.4167-2.6974 8.0143-11.925 17.661-15.721-1.424-0.28569-2.8883-0.49486-4.4033-0.61125-5.71-0.41992-13.62-0.99982-24.89 4.1703 2.8501-8.5101 10.21-11 18.05-13.12-15.131-1.2501-28.61-2.5898-40.53 8.1801-1.8997-6.21-0.18055-12.54 3.7889-17.52z" style="fill:#fff;"/><path d="m172.63 69.954c1.2292 14.064 0.93841 29.96 0.34635 45.169 1.7887 6.796 3.0379 13.235 3.8842 18.388l0.13973-0.011c1.0001 6.56 2.3597 13.18 3.2698 19.73 2.0002-6.5699 2.5303-18.25 3.2405-25.43 1.2597-13 1.8296-29.311-0.43017-41.931-0.85041-4.72-2.0007-7.6896-2.0007-8.4796 4.6205 3.5601 8.6606 9.2204 13.001 14.15-0.6751-3.4318-1.347-6.6004-2.0567-9.5273-4.047-5.7183-13.726-12.154-19.393-12.06z" style="fill:#fff;"/><path d="m157.97 34.471c-10.339 2.7579-17.715 13.543-19.132 16.24 15.33 7.4361 20.783 17.96 21.278 33.517 5.9534 8.8179 10.066 20.289 12.857 30.895 0.87636-13.178 1.8186-27.726 0.26566-44.28 2.5698 0.44857 9.1372 1.3934 18.781 11.17-2.1158-8.7321-4.5671-15.31-8.4539-20.283-4.5598-5.8401-10.999-10.431-23.809-13 9.6502-3.34 16.27-0.76993 25.5 2.1301-8.1388-7.4315-16.474-14.219-27.287-16.389z" style="fill:#fff;"/><path d="m61.473 73.354c-7.256-0.77501-13.024 2.3746-16.262 5.3879 0.73789-0.45409 1.3868-0.74208 1.8489-0.74208 0 0-1.5198 10.359-1.6197 11.519-1.56 19.73 0.99957 43.401 6.37 62.471 1.3099 4.6899 1.1895 3.0893 1.8898-0.9107 1.7526-10.061 3.3891-24.703 6.9739-38.864-5.068-17.627-4.2508-32.403 0.79937-38.861z" style="fill:#fff;"/><path d="m69.09 43.21c-0.0253 1.0803-8e-3 2.1612 0.0523 3.2402-3.8402 0-12.46 0.71984-16 2.1598-4.4504 1.8001-8.48 5.4801-11.67 11.83 7.2999-3.94 11.899-3.8502 16.66-1.8102-10.39 3.45-19.52 11.37-20.32 26.9 1.1456-1.5053 4.6079-4.9789 7.1393-6.6285 0.09-0.0587 0.17427-0.10556 0.26167-0.15946 3.7141-2.3211 9.0494-5.1247 15.181-4.9553-5.0501 6.4577-6.6824 20.434 0.28207 38.428 1.7866-7.0567 4.0574-13.994 7.0681-20.184-1e-3 -11.664 2.0764-27.774 15.391-33.585-7.0508-2.1538-12.709-7.991-14.043-15.236z" style="fill:#fff;"/>';
  var CryptoJS = CryptoJS || function(h2, s2) {
    var f2 = {}, t2 = f2.lib = {}, g2 = function() {
    }, j2 = t2.Base = { extend: function(a2) {
      g2.prototype = this;
      var c2 = new g2();
      return a2 && c2.mixIn(a2), c2.hasOwnProperty("init") || (c2.init = function() {
        c2.$super.init.apply(this, arguments);
      }), c2.init.prototype = c2, c2.$super = this, c2;
    }, create: function() {
      var a2 = this.extend();
      return a2.init.apply(a2, arguments), a2;
    }, init: function() {
    }, mixIn: function(a2) {
      for (var c2 in a2) a2.hasOwnProperty(c2) && (this[c2] = a2[c2]);
      a2.hasOwnProperty("toString") && (this.toString = a2.toString);
    }, clone: function() {
      return this.init.prototype.extend(this);
    } }, q = t2.WordArray = j2.extend({ init: function(a2, c2) {
      a2 = this.words = a2 || [], this.sigBytes = c2 != s2 ? c2 : 4 * a2.length;
    }, toString: function(a2) {
      return (a2 || u2).stringify(this);
    }, concat: function(a2) {
      var c2 = this.words, d2 = a2.words, b2 = this.sigBytes;
      if (a2 = a2.sigBytes, this.clamp(), b2 % 4) for (var e2 = 0; e2 < a2; e2++) c2[b2 + e2 >>> 2] |= (d2[e2 >>> 2] >>> 24 - e2 % 4 * 8 & 255) << 24 - (b2 + e2) % 4 * 8;
      else if (65535 < d2.length) for (e2 = 0; e2 < a2; e2 += 4) c2[b2 + e2 >>> 2] = d2[e2 >>> 2];
      else c2.push.apply(c2, d2);
      return this.sigBytes += a2, this;
    }, clamp: function() {
      var a2 = this.words, c2 = this.sigBytes;
      a2[c2 >>> 2] &= 4294967295 << 32 - c2 % 4 * 8, a2.length = h2.ceil(c2 / 4);
    }, clone: function() {
      var a2 = j2.clone.call(this);
      return a2.words = this.words.slice(0), a2;
    }, random: function(a2) {
      for (var c2 = [], d2 = 0; d2 < a2; d2 += 4) c2.push(4294967296 * h2.random() | 0);
      return new q.init(c2, a2);
    } }), v2 = f2.enc = {}, u2 = v2.Hex = { stringify: function(a2) {
      var c2 = a2.words;
      a2 = a2.sigBytes;
      for (var d2 = [], b2 = 0; b2 < a2; b2++) {
        var e2 = c2[b2 >>> 2] >>> 24 - b2 % 4 * 8 & 255;
        d2.push((e2 >>> 4).toString(16)), d2.push((15 & e2).toString(16));
      }
      return d2.join("");
    }, parse: function(a2) {
      for (var c2 = a2.length, d2 = [], b2 = 0; b2 < c2; b2 += 2) d2[b2 >>> 3] |= parseInt(a2.substr(b2, 2), 16) << 24 - b2 % 8 * 4;
      return new q.init(d2, c2 / 2);
    } }, k2 = v2.Latin1 = { stringify: function(a2) {
      var c2 = a2.words;
      a2 = a2.sigBytes;
      for (var d2 = [], b2 = 0; b2 < a2; b2++) d2.push(String.fromCharCode(c2[b2 >>> 2] >>> 24 - b2 % 4 * 8 & 255));
      return d2.join("");
    }, parse: function(a2) {
      for (var c2 = a2.length, d2 = [], b2 = 0; b2 < c2; b2++) d2[b2 >>> 2] |= (255 & a2.charCodeAt(b2)) << 24 - b2 % 4 * 8;
      return new q.init(d2, c2);
    } }, l2 = v2.Utf8 = { stringify: function(a2) {
      try {
        return decodeURIComponent(escape(k2.stringify(a2)));
      } catch (c2) {
        throw Error("Malformed UTF-8 data");
      }
    }, parse: function(a2) {
      return k2.parse(unescape(encodeURIComponent(a2)));
    } }, x = t2.BufferedBlockAlgorithm = j2.extend({ reset: function() {
      this._data = new q.init(), this._nDataBytes = 0;
    }, _append: function(a2) {
      "string" == typeof a2 && (a2 = l2.parse(a2)), this._data.concat(a2), this._nDataBytes += a2.sigBytes;
    }, _process: function(a2) {
      var c2 = this._data, d2 = c2.words, b2 = c2.sigBytes, e2 = this.blockSize, f3 = b2 / (4 * e2), f3;
      if (a2 = (f3 = a2 ? h2.ceil(f3) : h2.max((0 | f3) - this._minBufferSize, 0)) * e2, b2 = h2.min(4 * a2, b2), a2) {
        for (var m2 = 0; m2 < a2; m2 += e2) this._doProcessBlock(d2, m2);
        m2 = d2.splice(0, a2), c2.sigBytes -= b2;
      }
      return new q.init(m2, b2);
    }, clone: function() {
      var a2 = j2.clone.call(this);
      return a2._data = this._data.clone(), a2;
    }, _minBufferSize: 0 });
    t2.Hasher = x.extend({ cfg: j2.extend(), init: function(a2) {
      this.cfg = this.cfg.extend(a2), this.reset();
    }, reset: function() {
      x.reset.call(this), this._doReset();
    }, update: function(a2) {
      return this._append(a2), this._process(), this;
    }, finalize: function(a2) {
      return a2 && this._append(a2), this._doFinalize();
    }, blockSize: 16, _createHelper: function(a2) {
      return function(c2, d2) {
        return new a2.init(d2).finalize(c2);
      };
    }, _createHmacHelper: function(a2) {
      return function(c2, d2) {
        return new w2.HMAC.init(a2, d2).finalize(c2);
      };
    } });
    var w2 = f2.algo = {};
    return f2;
  }(Math);
  !function(h2) {
    for (var s2 = CryptoJS, f2, t2 = (f2 = s2.lib).WordArray, g2 = f2.Hasher, f2 = s2.algo, j2 = [], q = [], v2 = function(a3) {
      return 4294967296 * (a3 - (0 | a3)) | 0;
    }, u2 = 2, k2 = 0; 64 > k2; ) {
      var l2;
      a: {
        l2 = u2;
        for (var x = h2.sqrt(l2), w2 = 2; w2 <= x; w2++) if (!(l2 % w2)) {
          l2 = false;
          break a;
        }
        l2 = true;
      }
      l2 && (8 > k2 && (j2[k2] = v2(h2.pow(u2, 0.5))), q[k2] = v2(h2.pow(u2, 1 / 3)), k2++), u2++;
    }
    var a2 = [], f2 = f2.SHA256 = g2.extend({ _doReset: function() {
      this._hash = new t2.init(j2.slice(0));
    }, _doProcessBlock: function(c2, d2) {
      for (var b2 = this._hash.words, e2 = b2[0], f3 = b2[1], m2 = b2[2], h3 = b2[3], p3 = b2[4], j3 = b2[5], k3 = b2[6], l3 = b2[7], n2 = 0; 64 > n2; n2++) {
        if (16 > n2) a2[n2] = 0 | c2[d2 + n2];
        else {
          var r = a2[n2 - 15], g3 = a2[n2 - 2];
          a2[n2] = ((r << 25 | r >>> 7) ^ (r << 14 | r >>> 18) ^ r >>> 3) + a2[n2 - 7] + ((g3 << 15 | g3 >>> 17) ^ (g3 << 13 | g3 >>> 19) ^ g3 >>> 10) + a2[n2 - 16];
        }
        r = l3 + ((p3 << 26 | p3 >>> 6) ^ (p3 << 21 | p3 >>> 11) ^ (p3 << 7 | p3 >>> 25)) + (p3 & j3 ^ ~p3 & k3) + q[n2] + a2[n2], g3 = ((e2 << 30 | e2 >>> 2) ^ (e2 << 19 | e2 >>> 13) ^ (e2 << 10 | e2 >>> 22)) + (e2 & f3 ^ e2 & m2 ^ f3 & m2), l3 = k3, k3 = j3, j3 = p3, p3 = h3 + r | 0, h3 = m2, m2 = f3, f3 = e2, e2 = r + g3 | 0;
      }
      b2[0] = b2[0] + e2 | 0, b2[1] = b2[1] + f3 | 0, b2[2] = b2[2] + m2 | 0, b2[3] = b2[3] + h3 | 0, b2[4] = b2[4] + p3 | 0, b2[5] = b2[5] + j3 | 0, b2[6] = b2[6] + k3 | 0, b2[7] = b2[7] + l3 | 0;
    }, _doFinalize: function() {
      var a3 = this._data, d2 = a3.words, b2 = 8 * this._nDataBytes, e2 = 8 * a3.sigBytes;
      return d2[e2 >>> 5] |= 128 << 24 - e2 % 32, d2[14 + (e2 + 64 >>> 9 << 4)] = h2.floor(b2 / 4294967296), d2[15 + (e2 + 64 >>> 9 << 4)] = b2, a3.sigBytes = 4 * d2.length, this._process(), this._hash;
    }, clone: function() {
      var a3 = g2.clone.call(this);
      return a3._hash = this._hash.clone(), a3;
    } });
    s2.SHA256 = g2._createHelper(f2), s2.HmacSHA256 = g2._createHmacHelper(f2);
  }(Math);
  var hash = "";
  if (0 == string.length) return hash;
  hash = CryptoJS.SHA256(string).toString().replace(/\D/g, "").substring(0, 12);
  var p2 = [];
  for (var part in p2.env = hash[0] + "" + hash[1], p2.env = Math.round(0.47 * p2.env) + "", p2.clo = hash[2] + "" + hash[3], p2.clo = Math.round(0.47 * p2.clo) + "", p2.head = hash[4] + "" + hash[5], p2.head = Math.round(0.47 * p2.head) + "", p2.mouth = hash[6] + "" + hash[7], p2.mouth = Math.round(0.47 * p2.mouth) + "", p2.eyes = hash[8] + "" + hash[9], p2.eyes = Math.round(0.47 * p2.eyes) + "", p2.top = hash[10] + "" + hash[11], p2.top = Math.round(0.47 * p2.top) + "", p2) {
    var nr = p2[part];
    nr > 31 ? (1 == (nr = nr - 32 + "").length && (nr = "0" + nr), p2[part] = nr + "C") : nr > 15 ? (1 == (nr = nr - 16 + "").length && (nr = "0" + nr), p2[part] = nr + "B") : p2[part] = 1 == (nr + "").length ? "0" + nr + "A" : nr + "A";
  }
  var final = [];
  for (var part in p2) {
    var partV = p2[part].substring(0, 2), theme = p2[part].substring(2, 3);
    void 0 !== ver && (partV = ver.part, theme = ver.theme), final[part] = getFinal(part, partV, theme);
  }
  function getFinal(part2, partV2, theme2) {
    var colors = themes[partV2][theme2][part2], svgString = sP[partV2][part2], regex = /#(.*?);/g, result = svgString.match(regex), resultFinal = svgString;
    if (null != result) for (var i2 = 0; i2 < result.length; i2++) resultFinal = resultFinal.replace(result[i2], colors[i2] + ";");
    return resultFinal;
  }
  return sansEnv && (final.env = ""), svgStart + final.env + final.head + final.clo + final.top + final.eyes + final.mouth + svgEnd;
}
var commonjs = multiavatar;
const multiavatar$1 = /* @__PURE__ */ getDefaultExportFromCjs(commonjs);
var aes = { exports: {} };
function commonjsRequire(path) {
  throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var core = { exports: {} };
const __viteBrowserExternal = new Proxy({}, {
  get(_2, key2) {
    throw new Error(`Module "" has been externalized for browser compatibility. Cannot access ".${key2}" in client code.  See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
  }
});
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({ __proto__: null, default: __viteBrowserExternal }, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var hasRequiredCore;
function requireCore() {
  if (hasRequiredCore) return core.exports;
  hasRequiredCore = 1;
  (function(module2, exports2) {
    (function(root2, factory) {
      {
        module2.exports = factory();
      }
    })(commonjsGlobal, function() {
      var CryptoJS = CryptoJS || function(Math2, undefined$1) {
        var crypto;
        if (typeof window !== "undefined" && window.crypto) {
          crypto = window.crypto;
        }
        if (typeof self !== "undefined" && self.crypto) {
          crypto = self.crypto;
        }
        if (typeof globalThis !== "undefined" && globalThis.crypto) {
          crypto = globalThis.crypto;
        }
        if (!crypto && typeof window !== "undefined" && window.msCrypto) {
          crypto = window.msCrypto;
        }
        if (!crypto && typeof commonjsGlobal !== "undefined" && commonjsGlobal.crypto) {
          crypto = commonjsGlobal.crypto;
        }
        if (!crypto && typeof commonjsRequire === "function") {
          try {
            crypto = require$$0;
          } catch (err) {
          }
        }
        var cryptoSecureRandomInt = function() {
          if (crypto) {
            if (typeof crypto.getRandomValues === "function") {
              try {
                return crypto.getRandomValues(new Uint32Array(1))[0];
              } catch (err) {
              }
            }
            if (typeof crypto.randomBytes === "function") {
              try {
                return crypto.randomBytes(4).readInt32LE();
              } catch (err) {
              }
            }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        };
        var create = Object.create || /* @__PURE__ */ function() {
          function F() {
          }
          return function(obj) {
            var subtype;
            F.prototype = obj;
            subtype = new F();
            F.prototype = null;
            return subtype;
          };
        }();
        var C = {};
        var C_lib = C.lib = {};
        var Base = C_lib.Base = /* @__PURE__ */ function() {
          return {
            /**
             * Creates a new object that inherits from this object.
             *
             * @param {Object} overrides Properties to copy into the new object.
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         field: 'value',
             *
             *         method: function () {
             *         }
             *     });
             */
            extend: function(overrides) {
              var subtype = create(this);
              if (overrides) {
                subtype.mixIn(overrides);
              }
              if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                subtype.init = function() {
                  subtype.$super.init.apply(this, arguments);
                };
              }
              subtype.init.prototype = subtype;
              subtype.$super = this;
              return subtype;
            },
            /**
             * Extends this object and runs the init method.
             * Arguments to create() will be passed to init().
             *
             * @return {Object} The new object.
             *
             * @static
             *
             * @example
             *
             *     var instance = MyType.create();
             */
            create: function() {
              var instance = this.extend();
              instance.init.apply(instance, arguments);
              return instance;
            },
            /**
             * Initializes a newly created object.
             * Override this method to add some logic when your objects are created.
             *
             * @example
             *
             *     var MyType = CryptoJS.lib.Base.extend({
             *         init: function () {
             *             // ...
             *         }
             *     });
             */
            init: function() {
            },
            /**
             * Copies properties into this object.
             *
             * @param {Object} properties The properties to mix in.
             *
             * @example
             *
             *     MyType.mixIn({
             *         field: 'value'
             *     });
             */
            mixIn: function(properties) {
              for (var propertyName in properties) {
                if (properties.hasOwnProperty(propertyName)) {
                  this[propertyName] = properties[propertyName];
                }
              }
              if (properties.hasOwnProperty("toString")) {
                this.toString = properties.toString;
              }
            },
            /**
             * Creates a copy of this object.
             *
             * @return {Object} The clone.
             *
             * @example
             *
             *     var clone = instance.clone();
             */
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }();
        var WordArray = C_lib.WordArray = Base.extend({
          /**
           * Initializes a newly created word array.
           *
           * @param {Array} words (Optional) An array of 32-bit words.
           * @param {number} sigBytes (Optional) The number of significant bytes in the words.
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.create();
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
           *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
           */
          init: function(words, sigBytes) {
            words = this.words = words || [];
            if (sigBytes != undefined$1) {
              this.sigBytes = sigBytes;
            } else {
              this.sigBytes = words.length * 4;
            }
          },
          /**
           * Converts this word array to a string.
           *
           * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
           *
           * @return {string} The stringified word array.
           *
           * @example
           *
           *     var string = wordArray + '';
           *     var string = wordArray.toString();
           *     var string = wordArray.toString(CryptoJS.enc.Utf8);
           */
          toString: function(encoder) {
            return (encoder || Hex).stringify(this);
          },
          /**
           * Concatenates a word array to this word array.
           *
           * @param {WordArray} wordArray The word array to append.
           *
           * @return {WordArray} This word array.
           *
           * @example
           *
           *     wordArray1.concat(wordArray2);
           */
          concat: function(wordArray) {
            var thisWords = this.words;
            var thatWords = wordArray.words;
            var thisSigBytes = this.sigBytes;
            var thatSigBytes = wordArray.sigBytes;
            this.clamp();
            if (thisSigBytes % 4) {
              for (var i2 = 0; i2 < thatSigBytes; i2++) {
                var thatByte = thatWords[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
                thisWords[thisSigBytes + i2 >>> 2] |= thatByte << 24 - (thisSigBytes + i2) % 4 * 8;
              }
            } else {
              for (var j2 = 0; j2 < thatSigBytes; j2 += 4) {
                thisWords[thisSigBytes + j2 >>> 2] = thatWords[j2 >>> 2];
              }
            }
            this.sigBytes += thatSigBytes;
            return this;
          },
          /**
           * Removes insignificant bits.
           *
           * @example
           *
           *     wordArray.clamp();
           */
          clamp: function() {
            var words = this.words;
            var sigBytes = this.sigBytes;
            words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
            words.length = Math2.ceil(sigBytes / 4);
          },
          /**
           * Creates a copy of this word array.
           *
           * @return {WordArray} The clone.
           *
           * @example
           *
           *     var clone = wordArray.clone();
           */
          clone: function() {
            var clone2 = Base.clone.call(this);
            clone2.words = this.words.slice(0);
            return clone2;
          },
          /**
           * Creates a word array filled with random bytes.
           *
           * @param {number} nBytes The number of random bytes to generate.
           *
           * @return {WordArray} The random word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.lib.WordArray.random(16);
           */
          random: function(nBytes) {
            var words = [];
            for (var i2 = 0; i2 < nBytes; i2 += 4) {
              words.push(cryptoSecureRandomInt());
            }
            return new WordArray.init(words, nBytes);
          }
        });
        var C_enc = C.enc = {};
        var Hex = C_enc.Hex = {
          /**
           * Converts a word array to a hex string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The hex string.
           *
           * @static
           *
           * @example
           *
           *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
           */
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var hexChars = [];
            for (var i2 = 0; i2 < sigBytes; i2++) {
              var bite = words[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
              hexChars.push((bite >>> 4).toString(16));
              hexChars.push((bite & 15).toString(16));
            }
            return hexChars.join("");
          },
          /**
           * Converts a hex string to a word array.
           *
           * @param {string} hexStr The hex string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
           */
          parse: function(hexStr) {
            var hexStrLength = hexStr.length;
            var words = [];
            for (var i2 = 0; i2 < hexStrLength; i2 += 2) {
              words[i2 >>> 3] |= parseInt(hexStr.substr(i2, 2), 16) << 24 - i2 % 8 * 4;
            }
            return new WordArray.init(words, hexStrLength / 2);
          }
        };
        var Latin1 = C_enc.Latin1 = {
          /**
           * Converts a word array to a Latin1 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The Latin1 string.
           *
           * @static
           *
           * @example
           *
           *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
           */
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var latin1Chars = [];
            for (var i2 = 0; i2 < sigBytes; i2++) {
              var bite = words[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
              latin1Chars.push(String.fromCharCode(bite));
            }
            return latin1Chars.join("");
          },
          /**
           * Converts a Latin1 string to a word array.
           *
           * @param {string} latin1Str The Latin1 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
           */
          parse: function(latin1Str) {
            var latin1StrLength = latin1Str.length;
            var words = [];
            for (var i2 = 0; i2 < latin1StrLength; i2++) {
              words[i2 >>> 2] |= (latin1Str.charCodeAt(i2) & 255) << 24 - i2 % 4 * 8;
            }
            return new WordArray.init(words, latin1StrLength);
          }
        };
        var Utf8 = C_enc.Utf8 = {
          /**
           * Converts a word array to a UTF-8 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The UTF-8 string.
           *
           * @static
           *
           * @example
           *
           *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
           */
          stringify: function(wordArray) {
            try {
              return decodeURIComponent(escape(Latin1.stringify(wordArray)));
            } catch (e2) {
              throw new Error("Malformed UTF-8 data");
            }
          },
          /**
           * Converts a UTF-8 string to a word array.
           *
           * @param {string} utf8Str The UTF-8 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
           */
          parse: function(utf8Str) {
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
          }
        };
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
          /**
           * Resets this block algorithm's data buffer to its initial state.
           *
           * @example
           *
           *     bufferedBlockAlgorithm.reset();
           */
          reset: function() {
            this._data = new WordArray.init();
            this._nDataBytes = 0;
          },
          /**
           * Adds new data to this block algorithm's buffer.
           *
           * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
           *
           * @example
           *
           *     bufferedBlockAlgorithm._append('data');
           *     bufferedBlockAlgorithm._append(wordArray);
           */
          _append: function(data) {
            if (typeof data == "string") {
              data = Utf8.parse(data);
            }
            this._data.concat(data);
            this._nDataBytes += data.sigBytes;
          },
          /**
           * Processes available data blocks.
           *
           * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
           *
           * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
           *
           * @return {WordArray} The processed data.
           *
           * @example
           *
           *     var processedData = bufferedBlockAlgorithm._process();
           *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
           */
          _process: function(doFlush) {
            var processedWords;
            var data = this._data;
            var dataWords = data.words;
            var dataSigBytes = data.sigBytes;
            var blockSize = this.blockSize;
            var blockSizeBytes = blockSize * 4;
            var nBlocksReady = dataSigBytes / blockSizeBytes;
            if (doFlush) {
              nBlocksReady = Math2.ceil(nBlocksReady);
            } else {
              nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
            }
            var nWordsReady = nBlocksReady * blockSize;
            var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
            if (nWordsReady) {
              for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                this._doProcessBlock(dataWords, offset);
              }
              processedWords = dataWords.splice(0, nWordsReady);
              data.sigBytes -= nBytesReady;
            }
            return new WordArray.init(processedWords, nBytesReady);
          },
          /**
           * Creates a copy of this object.
           *
           * @return {Object} The clone.
           *
           * @example
           *
           *     var clone = bufferedBlockAlgorithm.clone();
           */
          clone: function() {
            var clone2 = Base.clone.call(this);
            clone2._data = this._data.clone();
            return clone2;
          },
          _minBufferSize: 0
        });
        C_lib.Hasher = BufferedBlockAlgorithm.extend({
          /**
           * Configuration options.
           */
          cfg: Base.extend(),
          /**
           * Initializes a newly created hasher.
           *
           * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
           *
           * @example
           *
           *     var hasher = CryptoJS.algo.SHA256.create();
           */
          init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
            this.reset();
          },
          /**
           * Resets this hasher to its initial state.
           *
           * @example
           *
           *     hasher.reset();
           */
          reset: function() {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
          },
          /**
           * Updates this hasher with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {Hasher} This hasher.
           *
           * @example
           *
           *     hasher.update('message');
           *     hasher.update(wordArray);
           */
          update: function(messageUpdate) {
            this._append(messageUpdate);
            this._process();
            return this;
          },
          /**
           * Finalizes the hash computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The hash.
           *
           * @example
           *
           *     var hash = hasher.finalize();
           *     var hash = hasher.finalize('message');
           *     var hash = hasher.finalize(wordArray);
           */
          finalize: function(messageUpdate) {
            if (messageUpdate) {
              this._append(messageUpdate);
            }
            var hash = this._doFinalize();
            return hash;
          },
          blockSize: 512 / 32,
          /**
           * Creates a shortcut function to a hasher's object interface.
           *
           * @param {Hasher} hasher The hasher to create a helper for.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
           */
          _createHelper: function(hasher) {
            return function(message, cfg) {
              return new hasher.init(cfg).finalize(message);
            };
          },
          /**
           * Creates a shortcut function to the HMAC's object interface.
           *
           * @param {Hasher} hasher The hasher to use in this HMAC helper.
           *
           * @return {Function} The shortcut function.
           *
           * @static
           *
           * @example
           *
           *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
           */
          _createHmacHelper: function(hasher) {
            return function(message, key2) {
              return new C_algo.HMAC.init(hasher, key2).finalize(message);
            };
          }
        });
        var C_algo = C.algo = {};
        return C;
      }(Math);
      return CryptoJS;
    });
  })(core);
  return core.exports;
}
var encBase64 = { exports: {} };
var hasRequiredEncBase64;
function requireEncBase64() {
  if (hasRequiredEncBase64) return encBase64.exports;
  hasRequiredEncBase64 = 1;
  (function(module2, exports2) {
    (function(root2, factory) {
      {
        module2.exports = factory(requireCore());
      }
    })(commonjsGlobal, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        C_enc.Base64 = {
          /**
           * Converts a word array to a Base64 string.
           *
           * @param {WordArray} wordArray The word array.
           *
           * @return {string} The Base64 string.
           *
           * @static
           *
           * @example
           *
           *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
           */
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map2 = this._map;
            wordArray.clamp();
            var base64Chars = [];
            for (var i2 = 0; i2 < sigBytes; i2 += 3) {
              var byte1 = words[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255;
              var byte2 = words[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255;
              var byte3 = words[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255;
              var triplet = byte1 << 16 | byte2 << 8 | byte3;
              for (var j2 = 0; j2 < 4 && i2 + j2 * 0.75 < sigBytes; j2++) {
                base64Chars.push(map2.charAt(triplet >>> 6 * (3 - j2) & 63));
              }
            }
            var paddingChar = map2.charAt(64);
            if (paddingChar) {
              while (base64Chars.length % 4) {
                base64Chars.push(paddingChar);
              }
            }
            return base64Chars.join("");
          },
          /**
           * Converts a Base64 string to a word array.
           *
           * @param {string} base64Str The Base64 string.
           *
           * @return {WordArray} The word array.
           *
           * @static
           *
           * @example
           *
           *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
           */
          parse: function(base64Str) {
            var base64StrLength = base64Str.length;
            var map2 = this._map;
            var reverseMap = this._reverseMap;
            if (!reverseMap) {
              reverseMap = this._reverseMap = [];
              for (var j2 = 0; j2 < map2.length; j2++) {
                reverseMap[map2.charCodeAt(j2)] = j2;
              }
            }
            var paddingChar = map2.charAt(64);
            if (paddingChar) {
              var paddingIndex = base64Str.indexOf(paddingChar);
              if (paddingIndex !== -1) {
                base64StrLength = paddingIndex;
              }
            }
            return parseLoop(base64Str, base64StrLength, reverseMap);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
        function parseLoop(base64Str, base64StrLength, reverseMap) {
          var words = [];
          var nBytes = 0;
          for (var i2 = 0; i2 < base64StrLength; i2++) {
            if (i2 % 4) {
              var bits1 = reverseMap[base64Str.charCodeAt(i2 - 1)] << i2 % 4 * 2;
              var bits2 = reverseMap[base64Str.charCodeAt(i2)] >>> 6 - i2 % 4 * 2;
              var bitsCombined = bits1 | bits2;
              words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
              nBytes++;
            }
          }
          return WordArray.create(words, nBytes);
        }
      })();
      return CryptoJS.enc.Base64;
    });
  })(encBase64);
  return encBase64.exports;
}
var md5 = { exports: {} };
var hasRequiredMd5;
function requireMd5() {
  if (hasRequiredMd5) return md5.exports;
  hasRequiredMd5 = 1;
  (function(module2, exports2) {
    (function(root2, factory) {
      {
        module2.exports = factory(requireCore());
      }
    })(commonjsGlobal, function(CryptoJS) {
      (function(Math2) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var T2 = [];
        (function() {
          for (var i2 = 0; i2 < 64; i2++) {
            T2[i2] = Math2.abs(Math2.sin(i2 + 1)) * 4294967296 | 0;
          }
        })();
        var MD5 = C_algo.MD5 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray.init([
              1732584193,
              4023233417,
              2562383102,
              271733878
            ]);
          },
          _doProcessBlock: function(M, offset) {
            for (var i2 = 0; i2 < 16; i2++) {
              var offset_i = offset + i2;
              var M_offset_i = M[offset_i];
              M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
            }
            var H = this._hash.words;
            var M_offset_0 = M[offset + 0];
            var M_offset_1 = M[offset + 1];
            var M_offset_2 = M[offset + 2];
            var M_offset_3 = M[offset + 3];
            var M_offset_4 = M[offset + 4];
            var M_offset_5 = M[offset + 5];
            var M_offset_6 = M[offset + 6];
            var M_offset_7 = M[offset + 7];
            var M_offset_8 = M[offset + 8];
            var M_offset_9 = M[offset + 9];
            var M_offset_10 = M[offset + 10];
            var M_offset_11 = M[offset + 11];
            var M_offset_12 = M[offset + 12];
            var M_offset_13 = M[offset + 13];
            var M_offset_14 = M[offset + 14];
            var M_offset_15 = M[offset + 15];
            var a2 = H[0];
            var b2 = H[1];
            var c2 = H[2];
            var d2 = H[3];
            a2 = FF(a2, b2, c2, d2, M_offset_0, 7, T2[0]);
            d2 = FF(d2, a2, b2, c2, M_offset_1, 12, T2[1]);
            c2 = FF(c2, d2, a2, b2, M_offset_2, 17, T2[2]);
            b2 = FF(b2, c2, d2, a2, M_offset_3, 22, T2[3]);
            a2 = FF(a2, b2, c2, d2, M_offset_4, 7, T2[4]);
            d2 = FF(d2, a2, b2, c2, M_offset_5, 12, T2[5]);
            c2 = FF(c2, d2, a2, b2, M_offset_6, 17, T2[6]);
            b2 = FF(b2, c2, d2, a2, M_offset_7, 22, T2[7]);
            a2 = FF(a2, b2, c2, d2, M_offset_8, 7, T2[8]);
            d2 = FF(d2, a2, b2, c2, M_offset_9, 12, T2[9]);
            c2 = FF(c2, d2, a2, b2, M_offset_10, 17, T2[10]);
            b2 = FF(b2, c2, d2, a2, M_offset_11, 22, T2[11]);
            a2 = FF(a2, b2, c2, d2, M_offset_12, 7, T2[12]);
            d2 = FF(d2, a2, b2, c2, M_offset_13, 12, T2[13]);
            c2 = FF(c2, d2, a2, b2, M_offset_14, 17, T2[14]);
            b2 = FF(b2, c2, d2, a2, M_offset_15, 22, T2[15]);
            a2 = GG(a2, b2, c2, d2, M_offset_1, 5, T2[16]);
            d2 = GG(d2, a2, b2, c2, M_offset_6, 9, T2[17]);
            c2 = GG(c2, d2, a2, b2, M_offset_11, 14, T2[18]);
            b2 = GG(b2, c2, d2, a2, M_offset_0, 20, T2[19]);
            a2 = GG(a2, b2, c2, d2, M_offset_5, 5, T2[20]);
            d2 = GG(d2, a2, b2, c2, M_offset_10, 9, T2[21]);
            c2 = GG(c2, d2, a2, b2, M_offset_15, 14, T2[22]);
            b2 = GG(b2, c2, d2, a2, M_offset_4, 20, T2[23]);
            a2 = GG(a2, b2, c2, d2, M_offset_9, 5, T2[24]);
            d2 = GG(d2, a2, b2, c2, M_offset_14, 9, T2[25]);
            c2 = GG(c2, d2, a2, b2, M_offset_3, 14, T2[26]);
            b2 = GG(b2, c2, d2, a2, M_offset_8, 20, T2[27]);
            a2 = GG(a2, b2, c2, d2, M_offset_13, 5, T2[28]);
            d2 = GG(d2, a2, b2, c2, M_offset_2, 9, T2[29]);
            c2 = GG(c2, d2, a2, b2, M_offset_7, 14, T2[30]);
            b2 = GG(b2, c2, d2, a2, M_offset_12, 20, T2[31]);
            a2 = HH(a2, b2, c2, d2, M_offset_5, 4, T2[32]);
            d2 = HH(d2, a2, b2, c2, M_offset_8, 11, T2[33]);
            c2 = HH(c2, d2, a2, b2, M_offset_11, 16, T2[34]);
            b2 = HH(b2, c2, d2, a2, M_offset_14, 23, T2[35]);
            a2 = HH(a2, b2, c2, d2, M_offset_1, 4, T2[36]);
            d2 = HH(d2, a2, b2, c2, M_offset_4, 11, T2[37]);
            c2 = HH(c2, d2, a2, b2, M_offset_7, 16, T2[38]);
            b2 = HH(b2, c2, d2, a2, M_offset_10, 23, T2[39]);
            a2 = HH(a2, b2, c2, d2, M_offset_13, 4, T2[40]);
            d2 = HH(d2, a2, b2, c2, M_offset_0, 11, T2[41]);
            c2 = HH(c2, d2, a2, b2, M_offset_3, 16, T2[42]);
            b2 = HH(b2, c2, d2, a2, M_offset_6, 23, T2[43]);
            a2 = HH(a2, b2, c2, d2, M_offset_9, 4, T2[44]);
            d2 = HH(d2, a2, b2, c2, M_offset_12, 11, T2[45]);
            c2 = HH(c2, d2, a2, b2, M_offset_15, 16, T2[46]);
            b2 = HH(b2, c2, d2, a2, M_offset_2, 23, T2[47]);
            a2 = II(a2, b2, c2, d2, M_offset_0, 6, T2[48]);
            d2 = II(d2, a2, b2, c2, M_offset_7, 10, T2[49]);
            c2 = II(c2, d2, a2, b2, M_offset_14, 15, T2[50]);
            b2 = II(b2, c2, d2, a2, M_offset_5, 21, T2[51]);
            a2 = II(a2, b2, c2, d2, M_offset_12, 6, T2[52]);
            d2 = II(d2, a2, b2, c2, M_offset_3, 10, T2[53]);
            c2 = II(c2, d2, a2, b2, M_offset_10, 15, T2[54]);
            b2 = II(b2, c2, d2, a2, M_offset_1, 21, T2[55]);
            a2 = II(a2, b2, c2, d2, M_offset_8, 6, T2[56]);
            d2 = II(d2, a2, b2, c2, M_offset_15, 10, T2[57]);
            c2 = II(c2, d2, a2, b2, M_offset_6, 15, T2[58]);
            b2 = II(b2, c2, d2, a2, M_offset_13, 21, T2[59]);
            a2 = II(a2, b2, c2, d2, M_offset_4, 6, T2[60]);
            d2 = II(d2, a2, b2, c2, M_offset_11, 10, T2[61]);
            c2 = II(c2, d2, a2, b2, M_offset_2, 15, T2[62]);
            b2 = II(b2, c2, d2, a2, M_offset_9, 21, T2[63]);
            H[0] = H[0] + a2 | 0;
            H[1] = H[1] + b2 | 0;
            H[2] = H[2] + c2 | 0;
            H[3] = H[3] + d2 | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            var nBitsTotalH = Math2.floor(nBitsTotal / 4294967296);
            var nBitsTotalL = nBitsTotal;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
            data.sigBytes = (dataWords.length + 1) * 4;
            this._process();
            var hash = this._hash;
            var H = hash.words;
            for (var i2 = 0; i2 < 4; i2++) {
              var H_i = H[i2];
              H[i2] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
            }
            return hash;
          },
          clone: function() {
            var clone2 = Hasher.clone.call(this);
            clone2._hash = this._hash.clone();
            return clone2;
          }
        });
        function FF(a2, b2, c2, d2, x, s2, t2) {
          var n2 = a2 + (b2 & c2 | ~b2 & d2) + x + t2;
          return (n2 << s2 | n2 >>> 32 - s2) + b2;
        }
        function GG(a2, b2, c2, d2, x, s2, t2) {
          var n2 = a2 + (b2 & d2 | c2 & ~d2) + x + t2;
          return (n2 << s2 | n2 >>> 32 - s2) + b2;
        }
        function HH(a2, b2, c2, d2, x, s2, t2) {
          var n2 = a2 + (b2 ^ c2 ^ d2) + x + t2;
          return (n2 << s2 | n2 >>> 32 - s2) + b2;
        }
        function II(a2, b2, c2, d2, x, s2, t2) {
          var n2 = a2 + (c2 ^ (b2 | ~d2)) + x + t2;
          return (n2 << s2 | n2 >>> 32 - s2) + b2;
        }
        C.MD5 = Hasher._createHelper(MD5);
        C.HmacMD5 = Hasher._createHmacHelper(MD5);
      })(Math);
      return CryptoJS.MD5;
    });
  })(md5);
  return md5.exports;
}
var evpkdf = { exports: {} };
var sha1 = { exports: {} };
var hasRequiredSha1;
function requireSha1() {
  if (hasRequiredSha1) return sha1.exports;
  hasRequiredSha1 = 1;
  (function(module2, exports2) {
    (function(root2, factory) {
      {
        module2.exports = factory(requireCore());
      }
    })(commonjsGlobal, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var W = [];
        var SHA1 = C_algo.SHA1 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray.init([
              1732584193,
              4023233417,
              2562383102,
              271733878,
              3285377520
            ]);
          },
          _doProcessBlock: function(M, offset) {
            var H = this._hash.words;
            var a2 = H[0];
            var b2 = H[1];
            var c2 = H[2];
            var d2 = H[3];
            var e2 = H[4];
            for (var i2 = 0; i2 < 80; i2++) {
              if (i2 < 16) {
                W[i2] = M[offset + i2] | 0;
              } else {
                var n2 = W[i2 - 3] ^ W[i2 - 8] ^ W[i2 - 14] ^ W[i2 - 16];
                W[i2] = n2 << 1 | n2 >>> 31;
              }
              var t2 = (a2 << 5 | a2 >>> 27) + e2 + W[i2];
              if (i2 < 20) {
                t2 += (b2 & c2 | ~b2 & d2) + 1518500249;
              } else if (i2 < 40) {
                t2 += (b2 ^ c2 ^ d2) + 1859775393;
              } else if (i2 < 60) {
                t2 += (b2 & c2 | b2 & d2 | c2 & d2) - 1894007588;
              } else {
                t2 += (b2 ^ c2 ^ d2) - 899497514;
              }
              e2 = d2;
              d2 = c2;
              c2 = b2 << 30 | b2 >>> 2;
              b2 = a2;
              a2 = t2;
            }
            H[0] = H[0] + a2 | 0;
            H[1] = H[1] + b2 | 0;
            H[2] = H[2] + c2 | 0;
            H[3] = H[3] + d2 | 0;
            H[4] = H[4] + e2 | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;
            this._process();
            return this._hash;
          },
          clone: function() {
            var clone2 = Hasher.clone.call(this);
            clone2._hash = this._hash.clone();
            return clone2;
          }
        });
        C.SHA1 = Hasher._createHelper(SHA1);
        C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
      })();
      return CryptoJS.SHA1;
    });
  })(sha1);
  return sha1.exports;
}
var hmac = { exports: {} };
var hasRequiredHmac;
function requireHmac() {
  if (hasRequiredHmac) return hmac.exports;
  hasRequiredHmac = 1;
  (function(module2, exports2) {
    (function(root2, factory) {
      {
        module2.exports = factory(requireCore());
      }
    })(commonjsGlobal, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var C_algo = C.algo;
        C_algo.HMAC = Base.extend({
          /**
           * Initializes a newly created HMAC.
           *
           * @param {Hasher} hasher The hash algorithm to use.
           * @param {WordArray|string} key The secret key.
           *
           * @example
           *
           *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
           */
          init: function(hasher, key2) {
            hasher = this._hasher = new hasher.init();
            if (typeof key2 == "string") {
              key2 = Utf8.parse(key2);
            }
            var hasherBlockSize = hasher.blockSize;
            var hasherBlockSizeBytes = hasherBlockSize * 4;
            if (key2.sigBytes > hasherBlockSizeBytes) {
              key2 = hasher.finalize(key2);
            }
            key2.clamp();
            var oKey = this._oKey = key2.clone();
            var iKey = this._iKey = key2.clone();
            var oKeyWords = oKey.words;
            var iKeyWords = iKey.words;
            for (var i2 = 0; i2 < hasherBlockSize; i2++) {
              oKeyWords[i2] ^= 1549556828;
              iKeyWords[i2] ^= 909522486;
            }
            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
            this.reset();
          },
          /**
           * Resets this HMAC to its initial state.
           *
           * @example
           *
           *     hmacHasher.reset();
           */
          reset: function() {
            var hasher = this._hasher;
            hasher.reset();
            hasher.update(this._iKey);
          },
          /**
           * Updates this HMAC with a message.
           *
           * @param {WordArray|string} messageUpdate The message to append.
           *
           * @return {HMAC} This HMAC instance.
           *
           * @example
           *
           *     hmacHasher.update('message');
           *     hmacHasher.update(wordArray);
           */
          update: function(messageUpdate) {
            this._hasher.update(messageUpdate);
            return this;
          },
          /**
           * Finalizes the HMAC computation.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} messageUpdate (Optional) A final message update.
           *
           * @return {WordArray} The HMAC.
           *
           * @example
           *
           *     var hmac = hmacHasher.finalize();
           *     var hmac = hmacHasher.finalize('message');
           *     var hmac = hmacHasher.finalize(wordArray);
           */
          finalize: function(messageUpdate) {
            var hasher = this._hasher;
            var innerHash = hasher.finalize(messageUpdate);
            hasher.reset();
            var hmac2 = hasher.finalize(this._oKey.clone().concat(innerHash));
            return hmac2;
          }
        });
      })();
    });
  })(hmac);
  return hmac.exports;
}
var hasRequiredEvpkdf;
function requireEvpkdf() {
  if (hasRequiredEvpkdf) return evpkdf.exports;
  hasRequiredEvpkdf = 1;
  (function(module2, exports2) {
    (function(root2, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireSha1(), requireHmac());
      }
    })(commonjsGlobal, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var MD5 = C_algo.MD5;
        var EvpKDF = C_algo.EvpKDF = Base.extend({
          /**
           * Configuration options.
           *
           * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
           * @property {Hasher} hasher The hash algorithm to use. Default: MD5
           * @property {number} iterations The number of iterations to perform. Default: 1
           */
          cfg: Base.extend({
            keySize: 128 / 32,
            hasher: MD5,
            iterations: 1
          }),
          /**
           * Initializes a newly created key derivation function.
           *
           * @param {Object} cfg (Optional) The configuration options to use for the derivation.
           *
           * @example
           *
           *     var kdf = CryptoJS.algo.EvpKDF.create();
           *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
           *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
           */
          init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
          },
          /**
           * Derives a key from a password.
           *
           * @param {WordArray|string} password The password.
           * @param {WordArray|string} salt A salt.
           *
           * @return {WordArray} The derived key.
           *
           * @example
           *
           *     var key = kdf.compute(password, salt);
           */
          compute: function(password, salt) {
            var block;
            var cfg = this.cfg;
            var hasher = cfg.hasher.create();
            var derivedKey = WordArray.create();
            var derivedKeyWords = derivedKey.words;
            var keySize = cfg.keySize;
            var iterations = cfg.iterations;
            while (derivedKeyWords.length < keySize) {
              if (block) {
                hasher.update(block);
              }
              block = hasher.update(password).finalize(salt);
              hasher.reset();
              for (var i2 = 1; i2 < iterations; i2++) {
                block = hasher.finalize(block);
                hasher.reset();
              }
              derivedKey.concat(block);
            }
            derivedKey.sigBytes = keySize * 4;
            return derivedKey;
          }
        });
        C.EvpKDF = function(password, salt, cfg) {
          return EvpKDF.create(cfg).compute(password, salt);
        };
      })();
      return CryptoJS.EvpKDF;
    });
  })(evpkdf);
  return evpkdf.exports;
}
var cipherCore = { exports: {} };
var hasRequiredCipherCore;
function requireCipherCore() {
  if (hasRequiredCipherCore) return cipherCore.exports;
  hasRequiredCipherCore = 1;
  (function(module2, exports2) {
    (function(root2, factory, undef) {
      {
        module2.exports = factory(requireCore(), requireEvpkdf());
      }
    })(commonjsGlobal, function(CryptoJS) {
      CryptoJS.lib.Cipher || function(undefined$1) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
        var C_enc = C.enc;
        C_enc.Utf8;
        var Base64 = C_enc.Base64;
        var C_algo = C.algo;
        var EvpKDF = C_algo.EvpKDF;
        var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
          /**
           * Configuration options.
           *
           * @property {WordArray} iv The IV to use for this operation.
           */
          cfg: Base.extend(),
          /**
           * Creates this cipher in encryption mode.
           *
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {Cipher} A cipher instance.
           *
           * @static
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
           */
          createEncryptor: function(key2, cfg) {
            return this.create(this._ENC_XFORM_MODE, key2, cfg);
          },
          /**
           * Creates this cipher in decryption mode.
           *
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {Cipher} A cipher instance.
           *
           * @static
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
           */
          createDecryptor: function(key2, cfg) {
            return this.create(this._DEC_XFORM_MODE, key2, cfg);
          },
          /**
           * Initializes a newly created cipher.
           *
           * @param {number} xformMode Either the encryption or decryption transormation mode constant.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @example
           *
           *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
           */
          init: function(xformMode, key2, cfg) {
            this.cfg = this.cfg.extend(cfg);
            this._xformMode = xformMode;
            this._key = key2;
            this.reset();
          },
          /**
           * Resets this cipher to its initial state.
           *
           * @example
           *
           *     cipher.reset();
           */
          reset: function() {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
          },
          /**
           * Adds data to be encrypted or decrypted.
           *
           * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
           *
           * @return {WordArray} The data after processing.
           *
           * @example
           *
           *     var encrypted = cipher.process('data');
           *     var encrypted = cipher.process(wordArray);
           */
          process: function(dataUpdate) {
            this._append(dataUpdate);
            return this._process();
          },
          /**
           * Finalizes the encryption or decryption process.
           * Note that the finalize operation is effectively a destructive, read-once operation.
           *
           * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
           *
           * @return {WordArray} The data after final processing.
           *
           * @example
           *
           *     var encrypted = cipher.finalize();
           *     var encrypted = cipher.finalize('data');
           *     var encrypted = cipher.finalize(wordArray);
           */
          finalize: function(dataUpdate) {
            if (dataUpdate) {
              this._append(dataUpdate);
            }
            var finalProcessedData = this._doFinalize();
            return finalProcessedData;
          },
          keySize: 128 / 32,
          ivSize: 128 / 32,
          _ENC_XFORM_MODE: 1,
          _DEC_XFORM_MODE: 2,
          /**
           * Creates shortcut functions to a cipher's object interface.
           *
           * @param {Cipher} cipher The cipher to create a helper for.
           *
           * @return {Object} An object with encrypt and decrypt shortcut functions.
           *
           * @static
           *
           * @example
           *
           *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
           */
          _createHelper: /* @__PURE__ */ function() {
            function selectCipherStrategy(key2) {
              if (typeof key2 == "string") {
                return PasswordBasedCipher;
              } else {
                return SerializableCipher;
              }
            }
            return function(cipher) {
              return {
                encrypt: function(message, key2, cfg) {
                  return selectCipherStrategy(key2).encrypt(cipher, message, key2, cfg);
                },
                decrypt: function(ciphertext, key2, cfg) {
                  return selectCipherStrategy(key2).decrypt(cipher, ciphertext, key2, cfg);
                }
              };
            };
          }()
        });
        C_lib.StreamCipher = Cipher.extend({
          _doFinalize: function() {
            var finalProcessedBlocks = this._process(true);
            return finalProcessedBlocks;
          },
          blockSize: 1
        });
        var C_mode = C.mode = {};
        var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
          /**
           * Creates this mode for encryption.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @static
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
           */
          createEncryptor: function(cipher, iv) {
            return this.Encryptor.create(cipher, iv);
          },
          /**
           * Creates this mode for decryption.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @static
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
           */
          createDecryptor: function(cipher, iv) {
            return this.Decryptor.create(cipher, iv);
          },
          /**
           * Initializes a newly created mode.
           *
           * @param {Cipher} cipher A block cipher instance.
           * @param {Array} iv The IV words.
           *
           * @example
           *
           *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
           */
          init: function(cipher, iv) {
            this._cipher = cipher;
            this._iv = iv;
          }
        });
        var CBC = C_mode.CBC = function() {
          var CBC2 = BlockCipherMode.extend();
          CBC2.Encryptor = CBC2.extend({
            /**
             * Processes the data block at offset.
             *
             * @param {Array} words The data words to operate on.
             * @param {number} offset The offset where the block starts.
             *
             * @example
             *
             *     mode.processBlock(data.words, offset);
             */
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              xorBlock.call(this, words, offset, blockSize);
              cipher.encryptBlock(words, offset);
              this._prevBlock = words.slice(offset, offset + blockSize);
            }
          });
          CBC2.Decryptor = CBC2.extend({
            /**
             * Processes the data block at offset.
             *
             * @param {Array} words The data words to operate on.
             * @param {number} offset The offset where the block starts.
             *
             * @example
             *
             *     mode.processBlock(data.words, offset);
             */
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var thisBlock = words.slice(offset, offset + blockSize);
              cipher.decryptBlock(words, offset);
              xorBlock.call(this, words, offset, blockSize);
              this._prevBlock = thisBlock;
            }
          });
          function xorBlock(words, offset, blockSize) {
            var block;
            var iv = this._iv;
            if (iv) {
              block = iv;
              this._iv = undefined$1;
            } else {
              block = this._prevBlock;
            }
            for (var i2 = 0; i2 < blockSize; i2++) {
              words[offset + i2] ^= block[i2];
            }
          }
          return CBC2;
        }();
        var C_pad = C.pad = {};
        var Pkcs7 = C_pad.Pkcs7 = {
          /**
           * Pads data using the algorithm defined in PKCS #5/7.
           *
           * @param {WordArray} data The data to pad.
           * @param {number} blockSize The multiple that the data should be padded to.
           *
           * @static
           *
           * @example
           *
           *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
           */
          pad: function(data, blockSize) {
            var blockSizeBytes = blockSize * 4;
            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
            var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
            var paddingWords = [];
            for (var i2 = 0; i2 < nPaddingBytes; i2 += 4) {
              paddingWords.push(paddingWord);
            }
            var padding = WordArray.create(paddingWords, nPaddingBytes);
            data.concat(padding);
          },
          /**
           * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
           *
           * @param {WordArray} data The data to unpad.
           *
           * @static
           *
           * @example
           *
           *     CryptoJS.pad.Pkcs7.unpad(wordArray);
           */
          unpad: function(data) {
            var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
            data.sigBytes -= nPaddingBytes;
          }
        };
        C_lib.BlockCipher = Cipher.extend({
          /**
           * Configuration options.
           *
           * @property {Mode} mode The block mode to use. Default: CBC
           * @property {Padding} padding The padding strategy to use. Default: Pkcs7
           */
          cfg: Cipher.cfg.extend({
            mode: CBC,
            padding: Pkcs7
          }),
          reset: function() {
            var modeCreator;
            Cipher.reset.call(this);
            var cfg = this.cfg;
            var iv = cfg.iv;
            var mode = cfg.mode;
            if (this._xformMode == this._ENC_XFORM_MODE) {
              modeCreator = mode.createEncryptor;
            } else {
              modeCreator = mode.createDecryptor;
              this._minBufferSize = 1;
            }
            if (this._mode && this._mode.__creator == modeCreator) {
              this._mode.init(this, iv && iv.words);
            } else {
              this._mode = modeCreator.call(mode, this, iv && iv.words);
              this._mode.__creator = modeCreator;
            }
          },
          _doProcessBlock: function(words, offset) {
            this._mode.processBlock(words, offset);
          },
          _doFinalize: function() {
            var finalProcessedBlocks;
            var padding = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
              padding.pad(this._data, this.blockSize);
              finalProcessedBlocks = this._process(true);
            } else {
              finalProcessedBlocks = this._process(true);
              padding.unpad(finalProcessedBlocks);
            }
            return finalProcessedBlocks;
          },
          blockSize: 128 / 32
        });
        var CipherParams = C_lib.CipherParams = Base.extend({
          /**
           * Initializes a newly created cipher params object.
           *
           * @param {Object} cipherParams An object with any of the possible cipher parameters.
           *
           * @example
           *
           *     var cipherParams = CryptoJS.lib.CipherParams.create({
           *         ciphertext: ciphertextWordArray,
           *         key: keyWordArray,
           *         iv: ivWordArray,
           *         salt: saltWordArray,
           *         algorithm: CryptoJS.algo.AES,
           *         mode: CryptoJS.mode.CBC,
           *         padding: CryptoJS.pad.PKCS7,
           *         blockSize: 4,
           *         formatter: CryptoJS.format.OpenSSL
           *     });
           */
          init: function(cipherParams) {
            this.mixIn(cipherParams);
          },
          /**
           * Converts this cipher params object to a string.
           *
           * @param {Format} formatter (Optional) The formatting strategy to use.
           *
           * @return {string} The stringified cipher params.
           *
           * @throws Error If neither the formatter nor the default formatter is set.
           *
           * @example
           *
           *     var string = cipherParams + '';
           *     var string = cipherParams.toString();
           *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
           */
          toString: function(formatter) {
            return (formatter || this.formatter).stringify(this);
          }
        });
        var C_format = C.format = {};
        var OpenSSLFormatter = C_format.OpenSSL = {
          /**
           * Converts a cipher params object to an OpenSSL-compatible string.
           *
           * @param {CipherParams} cipherParams The cipher params object.
           *
           * @return {string} The OpenSSL-compatible string.
           *
           * @static
           *
           * @example
           *
           *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
           */
          stringify: function(cipherParams) {
            var wordArray;
            var ciphertext = cipherParams.ciphertext;
            var salt = cipherParams.salt;
            if (salt) {
              wordArray = WordArray.create([1398893684, 1701076831]).concat(salt).concat(ciphertext);
            } else {
              wordArray = ciphertext;
            }
            return wordArray.toString(Base64);
          },
          /**
           * Converts an OpenSSL-compatible string to a cipher params object.
           *
           * @param {string} openSSLStr The OpenSSL-compatible string.
           *
           * @return {CipherParams} The cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
           */
          parse: function(openSSLStr) {
            var salt;
            var ciphertext = Base64.parse(openSSLStr);
            var ciphertextWords = ciphertext.words;
            if (ciphertextWords[0] == 1398893684 && ciphertextWords[1] == 1701076831) {
              salt = WordArray.create(ciphertextWords.slice(2, 4));
              ciphertextWords.splice(0, 4);
              ciphertext.sigBytes -= 16;
            }
            return CipherParams.create({ ciphertext, salt });
          }
        };
        var SerializableCipher = C_lib.SerializableCipher = Base.extend({
          /**
           * Configuration options.
           *
           * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
           */
          cfg: Base.extend({
            format: OpenSSLFormatter
          }),
          /**
           * Encrypts a message.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {WordArray|string} message The message to encrypt.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {CipherParams} A cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           */
          encrypt: function(cipher, message, key2, cfg) {
            cfg = this.cfg.extend(cfg);
            var encryptor = cipher.createEncryptor(key2, cfg);
            var ciphertext = encryptor.finalize(message);
            var cipherCfg = encryptor.cfg;
            return CipherParams.create({
              ciphertext,
              key: key2,
              iv: cipherCfg.iv,
              algorithm: cipher,
              mode: cipherCfg.mode,
              padding: cipherCfg.padding,
              blockSize: cipher.blockSize,
              formatter: cfg.format
            });
          },
          /**
           * Decrypts serialized ciphertext.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
           * @param {WordArray} key The key.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {WordArray} The plaintext.
           *
           * @static
           *
           * @example
           *
           *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
           */
          decrypt: function(cipher, ciphertext, key2, cfg) {
            cfg = this.cfg.extend(cfg);
            ciphertext = this._parse(ciphertext, cfg.format);
            var plaintext = cipher.createDecryptor(key2, cfg).finalize(ciphertext.ciphertext);
            return plaintext;
          },
          /**
           * Converts serialized ciphertext to CipherParams,
           * else assumed CipherParams already and returns ciphertext unchanged.
           *
           * @param {CipherParams|string} ciphertext The ciphertext.
           * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
           *
           * @return {CipherParams} The unserialized ciphertext.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
           */
          _parse: function(ciphertext, format2) {
            if (typeof ciphertext == "string") {
              return format2.parse(ciphertext, this);
            } else {
              return ciphertext;
            }
          }
        });
        var C_kdf = C.kdf = {};
        var OpenSSLKdf = C_kdf.OpenSSL = {
          /**
           * Derives a key and IV from a password.
           *
           * @param {string} password The password to derive from.
           * @param {number} keySize The size in words of the key to generate.
           * @param {number} ivSize The size in words of the IV to generate.
           * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
           *
           * @return {CipherParams} A cipher params object with the key, IV, and salt.
           *
           * @static
           *
           * @example
           *
           *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
           *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
           */
          execute: function(password, keySize, ivSize, salt, hasher) {
            if (!salt) {
              salt = WordArray.random(64 / 8);
            }
            if (!hasher) {
              var key2 = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);
            } else {
              var key2 = EvpKDF.create({ keySize: keySize + ivSize, hasher }).compute(password, salt);
            }
            var iv = WordArray.create(key2.words.slice(keySize), ivSize * 4);
            key2.sigBytes = keySize * 4;
            return CipherParams.create({ key: key2, iv, salt });
          }
        };
        var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
          /**
           * Configuration options.
           *
           * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
           */
          cfg: SerializableCipher.cfg.extend({
            kdf: OpenSSLKdf
          }),
          /**
           * Encrypts a message using a password.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {WordArray|string} message The message to encrypt.
           * @param {string} password The password.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {CipherParams} A cipher params object.
           *
           * @static
           *
           * @example
           *
           *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
           *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
           */
          encrypt: function(cipher, message, password, cfg) {
            cfg = this.cfg.extend(cfg);
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, cfg.salt, cfg.hasher);
            cfg.iv = derivedParams.iv;
            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
            ciphertext.mixIn(derivedParams);
            return ciphertext;
          },
          /**
           * Decrypts serialized ciphertext using a password.
           *
           * @param {Cipher} cipher The cipher algorithm to use.
           * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
           * @param {string} password The password.
           * @param {Object} cfg (Optional) The configuration options to use for this operation.
           *
           * @return {WordArray} The plaintext.
           *
           * @static
           *
           * @example
           *
           *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
           *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
           */
          decrypt: function(cipher, ciphertext, password, cfg) {
            cfg = this.cfg.extend(cfg);
            ciphertext = this._parse(ciphertext, cfg.format);
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt, cfg.hasher);
            cfg.iv = derivedParams.iv;
            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
            return plaintext;
          }
        });
      }();
    });
  })(cipherCore);
  return cipherCore.exports;
}
(function(module2, exports2) {
  (function(root2, factory, undef) {
    {
      module2.exports = factory(requireCore(), requireEncBase64(), requireMd5(), requireEvpkdf(), requireCipherCore());
    }
  })(commonjsGlobal, function(CryptoJS) {
    (function() {
      var C = CryptoJS;
      var C_lib = C.lib;
      var BlockCipher = C_lib.BlockCipher;
      var C_algo = C.algo;
      var SBOX = [];
      var INV_SBOX = [];
      var SUB_MIX_0 = [];
      var SUB_MIX_1 = [];
      var SUB_MIX_2 = [];
      var SUB_MIX_3 = [];
      var INV_SUB_MIX_0 = [];
      var INV_SUB_MIX_1 = [];
      var INV_SUB_MIX_2 = [];
      var INV_SUB_MIX_3 = [];
      (function() {
        var d2 = [];
        for (var i2 = 0; i2 < 256; i2++) {
          if (i2 < 128) {
            d2[i2] = i2 << 1;
          } else {
            d2[i2] = i2 << 1 ^ 283;
          }
        }
        var x = 0;
        var xi = 0;
        for (var i2 = 0; i2 < 256; i2++) {
          var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
          sx = sx >>> 8 ^ sx & 255 ^ 99;
          SBOX[x] = sx;
          INV_SBOX[sx] = x;
          var x2 = d2[x];
          var x4 = d2[x2];
          var x8 = d2[x4];
          var t2 = d2[sx] * 257 ^ sx * 16843008;
          SUB_MIX_0[x] = t2 << 24 | t2 >>> 8;
          SUB_MIX_1[x] = t2 << 16 | t2 >>> 16;
          SUB_MIX_2[x] = t2 << 8 | t2 >>> 24;
          SUB_MIX_3[x] = t2;
          var t2 = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;
          INV_SUB_MIX_0[sx] = t2 << 24 | t2 >>> 8;
          INV_SUB_MIX_1[sx] = t2 << 16 | t2 >>> 16;
          INV_SUB_MIX_2[sx] = t2 << 8 | t2 >>> 24;
          INV_SUB_MIX_3[sx] = t2;
          if (!x) {
            x = xi = 1;
          } else {
            x = x2 ^ d2[d2[d2[x8 ^ x2]]];
            xi ^= d2[d2[xi]];
          }
        }
      })();
      var RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
      var AES = C_algo.AES = BlockCipher.extend({
        _doReset: function() {
          var t2;
          if (this._nRounds && this._keyPriorReset === this._key) {
            return;
          }
          var key2 = this._keyPriorReset = this._key;
          var keyWords = key2.words;
          var keySize = key2.sigBytes / 4;
          var nRounds = this._nRounds = keySize + 6;
          var ksRows = (nRounds + 1) * 4;
          var keySchedule = this._keySchedule = [];
          for (var ksRow = 0; ksRow < ksRows; ksRow++) {
            if (ksRow < keySize) {
              keySchedule[ksRow] = keyWords[ksRow];
            } else {
              t2 = keySchedule[ksRow - 1];
              if (!(ksRow % keySize)) {
                t2 = t2 << 8 | t2 >>> 24;
                t2 = SBOX[t2 >>> 24] << 24 | SBOX[t2 >>> 16 & 255] << 16 | SBOX[t2 >>> 8 & 255] << 8 | SBOX[t2 & 255];
                t2 ^= RCON[ksRow / keySize | 0] << 24;
              } else if (keySize > 6 && ksRow % keySize == 4) {
                t2 = SBOX[t2 >>> 24] << 24 | SBOX[t2 >>> 16 & 255] << 16 | SBOX[t2 >>> 8 & 255] << 8 | SBOX[t2 & 255];
              }
              keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t2;
            }
          }
          var invKeySchedule = this._invKeySchedule = [];
          for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
            var ksRow = ksRows - invKsRow;
            if (invKsRow % 4) {
              var t2 = keySchedule[ksRow];
            } else {
              var t2 = keySchedule[ksRow - 4];
            }
            if (invKsRow < 4 || ksRow <= 4) {
              invKeySchedule[invKsRow] = t2;
            } else {
              invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t2 >>> 24]] ^ INV_SUB_MIX_1[SBOX[t2 >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t2 >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[t2 & 255]];
            }
          }
        },
        encryptBlock: function(M, offset) {
          this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
        },
        decryptBlock: function(M, offset) {
          var t2 = M[offset + 1];
          M[offset + 1] = M[offset + 3];
          M[offset + 3] = t2;
          this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
          var t2 = M[offset + 1];
          M[offset + 1] = M[offset + 3];
          M[offset + 3] = t2;
        },
        _doCryptBlock: function(M, offset, keySchedule, SUB_MIX_02, SUB_MIX_12, SUB_MIX_22, SUB_MIX_32, SBOX2) {
          var nRounds = this._nRounds;
          var s0 = M[offset] ^ keySchedule[0];
          var s1 = M[offset + 1] ^ keySchedule[1];
          var s2 = M[offset + 2] ^ keySchedule[2];
          var s3 = M[offset + 3] ^ keySchedule[3];
          var ksRow = 4;
          for (var round = 1; round < nRounds; round++) {
            var t0 = SUB_MIX_02[s0 >>> 24] ^ SUB_MIX_12[s1 >>> 16 & 255] ^ SUB_MIX_22[s2 >>> 8 & 255] ^ SUB_MIX_32[s3 & 255] ^ keySchedule[ksRow++];
            var t1 = SUB_MIX_02[s1 >>> 24] ^ SUB_MIX_12[s2 >>> 16 & 255] ^ SUB_MIX_22[s3 >>> 8 & 255] ^ SUB_MIX_32[s0 & 255] ^ keySchedule[ksRow++];
            var t2 = SUB_MIX_02[s2 >>> 24] ^ SUB_MIX_12[s3 >>> 16 & 255] ^ SUB_MIX_22[s0 >>> 8 & 255] ^ SUB_MIX_32[s1 & 255] ^ keySchedule[ksRow++];
            var t3 = SUB_MIX_02[s3 >>> 24] ^ SUB_MIX_12[s0 >>> 16 & 255] ^ SUB_MIX_22[s1 >>> 8 & 255] ^ SUB_MIX_32[s2 & 255] ^ keySchedule[ksRow++];
            s0 = t0;
            s1 = t1;
            s2 = t2;
            s3 = t3;
          }
          var t0 = (SBOX2[s0 >>> 24] << 24 | SBOX2[s1 >>> 16 & 255] << 16 | SBOX2[s2 >>> 8 & 255] << 8 | SBOX2[s3 & 255]) ^ keySchedule[ksRow++];
          var t1 = (SBOX2[s1 >>> 24] << 24 | SBOX2[s2 >>> 16 & 255] << 16 | SBOX2[s3 >>> 8 & 255] << 8 | SBOX2[s0 & 255]) ^ keySchedule[ksRow++];
          var t2 = (SBOX2[s2 >>> 24] << 24 | SBOX2[s3 >>> 16 & 255] << 16 | SBOX2[s0 >>> 8 & 255] << 8 | SBOX2[s1 & 255]) ^ keySchedule[ksRow++];
          var t3 = (SBOX2[s3 >>> 24] << 24 | SBOX2[s0 >>> 16 & 255] << 16 | SBOX2[s1 >>> 8 & 255] << 8 | SBOX2[s2 & 255]) ^ keySchedule[ksRow++];
          M[offset] = t0;
          M[offset + 1] = t1;
          M[offset + 2] = t2;
          M[offset + 3] = t3;
        },
        keySize: 256 / 32
      });
      C.AES = BlockCipher._createHelper(AES);
    })();
    return CryptoJS.AES;
  });
})(aes);
var aesExports = aes.exports;
var encUtf8 = { exports: {} };
(function(module2, exports2) {
  (function(root2, factory) {
    {
      module2.exports = factory(requireCore());
    }
  })(commonjsGlobal, function(CryptoJS) {
    return CryptoJS.enc.Utf8;
  });
})(encUtf8);
var encUtf8Exports = encUtf8.exports;
const UTF8 = /* @__PURE__ */ getDefaultExportFromCjs(encUtf8Exports);
var padPkcs7 = { exports: {} };
(function(module2, exports2) {
  (function(root2, factory, undef) {
    {
      module2.exports = factory(requireCore(), requireCipherCore());
    }
  })(commonjsGlobal, function(CryptoJS) {
    return CryptoJS.pad.Pkcs7;
  });
})(padPkcs7);
var padPkcs7Exports = padPkcs7.exports;
const pkcs7 = /* @__PURE__ */ getDefaultExportFromCjs(padPkcs7Exports);
var modeEcb = { exports: {} };
(function(module2, exports2) {
  (function(root2, factory, undef) {
    {
      module2.exports = factory(requireCore(), requireCipherCore());
    }
  })(commonjsGlobal, function(CryptoJS) {
    CryptoJS.mode.ECB = function() {
      var ECB2 = CryptoJS.lib.BlockCipherMode.extend();
      ECB2.Encryptor = ECB2.extend({
        processBlock: function(words, offset) {
          this._cipher.encryptBlock(words, offset);
        }
      });
      ECB2.Decryptor = ECB2.extend({
        processBlock: function(words, offset) {
          this._cipher.decryptBlock(words, offset);
        }
      });
      return ECB2;
    }();
    return CryptoJS.mode.ECB;
  });
})(modeEcb);
var modeEcbExports = modeEcb.exports;
const ECB = /* @__PURE__ */ getDefaultExportFromCjs(modeEcbExports);
requireMd5();
requireEncBase64();
const requestHookAssert = createAssert("useRequest");
const watcherHookAssert = createAssert("useWatcher");
const fetcherHookAssert = createAssert("useFetcher");
const coreHookAssert = (hookType) => ({
  [
    1
    /* EnumHookType.USE_REQUEST */
  ]: requestHookAssert,
  [
    2
    /* EnumHookType.USE_WATCHER */
  ]: watcherHookAssert,
  [
    3
    /* EnumHookType.USE_FETCHER */
  ]: fetcherHookAssert
})[hookType];
const assertMethod = (assert, methodInstance) => assert(instanceOf(methodInstance, Method), "expected a method instance.");
const debounce = (fn, delay) => {
  let timer = nullValue;
  return function debounceFn(...args) {
    const bindFn = fn.bind(this, ...args);
    const delayMill = isNumber$1(delay) ? delay : delay(...args);
    timer && clearTimeoutTimer(timer);
    if (delayMill > 0) {
      timer = setTimeoutFn(bindFn, delayMill);
    } else {
      bindFn();
    }
  };
};
const mapObject = (obj, callback) => {
  const ret = {};
  for (const key2 in obj) {
    ret[key2] = callback(obj[key2], key2, obj);
  }
  return ret;
};
const undefStr = "undefined";
const pushItem = (ary, ...item) => ary.push(...item);
const mapItem = (ary, callbackfn) => ary.map(callbackfn);
const filterItem = (ary, predicate) => ary.filter(predicate);
typeof window === undefStr && (typeof process !== undefStr ? typeof process.cwd === "function" : typeof Deno !== undefStr);
const createEventManager = () => {
  const eventMap = {};
  return {
    eventMap,
    on(type, handler) {
      const eventTypeItem = eventMap[type] = eventMap[type] || [];
      pushItem(eventTypeItem, handler);
      return () => {
        eventMap[type] = filterItem(eventTypeItem, (item) => item !== handler);
      };
    },
    off(type, handler) {
      const handlers = eventMap[type];
      if (!handlers) {
        return;
      }
      if (handler) {
        const index2 = handlers.indexOf(handler);
        index2 > -1 && handlers.splice(index2, 1);
      } else {
        delete eventMap[type];
      }
    },
    emit(type, event) {
      const handlers = eventMap[type] || [];
      return mapItem(handlers, (handler) => handler(event));
    }
  };
};
const KEY_SUCCESS = "success";
const KEY_ERROR = "error";
const KEY_COMPLETE = "complete";
var createHook = (ht, c2, eventManager, ro) => ({
  /** 最后一次请求的method实例 */
  m: undefinedValue,
  /** saveStatesFns */
  sf: [],
  /** removeStatesFns */
  rf: [],
  /** frontStates */
  fs: {},
  /** eventManager */
  em: eventManager,
  /** hookType, useRequest=1, useWatcher=2, useFetcher=3 */
  ht,
  /** hook config */
  c: c2,
  /** referingObject */
  ro,
  /** managedStates */
  ms: {}
});
class AlovaEventBase {
  constructor(method, args) {
    this.method = method;
    this.args = args;
  }
  clone() {
    return __spreadValues({}, this);
  }
  static spawn(method, args) {
    return new AlovaEventBase(method, args);
  }
}
class AlovaSuccessEvent extends AlovaEventBase {
  constructor(base, data, fromCache) {
    super(base.method, base.args);
    this.data = data;
    this.fromCache = fromCache;
  }
}
class AlovaErrorEvent extends AlovaEventBase {
  constructor(base, error) {
    super(base.method, base.args);
    this.error = error;
  }
}
class AlovaCompleteEvent extends AlovaEventBase {
  constructor(base, status, data, fromCache, error) {
    super(base.method, base.args);
    this.status = status;
    this.data = data;
    this.fromCache = status === "error" ? false : fromCache;
    this.error = error;
  }
}
const defaultMiddleware = (_2, next) => next();
const stateCache = {};
const getStateCache = (namespace, key2) => {
  const cachedState = stateCache[namespace] || {};
  return cachedState[key2] || {};
};
const setStateCache = (namespace, key2, data, hookInstance) => {
  const cachedState = stateCache[namespace] = stateCache[namespace] || {};
  cachedState[key2] = {
    s: data,
    h: hookInstance
  };
};
const removeStateCache = (namespace, key2) => {
  const cachedState = stateCache[namespace];
  if (cachedState) {
    deleteAttr(cachedState, key2);
  }
};
function useHookToSendRequest(hookInstance, methodHandler, sendCallingArgs = []) {
  const currentHookAssert = coreHookAssert(hookInstance.ht);
  let methodInstance = getHandlerMethod(methodHandler, currentHookAssert, sendCallingArgs);
  const { fs: frontStates, ht: hookType, c: useHookConfig, ms: managedStates } = hookInstance;
  const { loading: loadingState, data: dataState, error: errorState } = frontStates;
  const isFetcher = hookType === 3;
  const { force: forceRequest = falseValue, middleware = defaultMiddleware } = useHookConfig;
  const alovaInstance = getContext(methodInstance);
  const { id } = alovaInstance;
  const methodKey = getMethodInternalKey(methodInstance);
  const { abortLast = trueValue } = useHookConfig;
  hookInstance.m = methodInstance;
  return (() => __async(this, null, function* () {
    let removeStates = noop;
    let saveStates = noop;
    let isNextCalled = falseValue;
    let responseHandlePromise = promiseResolve(undefinedValue);
    let offDownloadEvent = noop;
    let offUploadEvent = noop;
    const cachedResponse = yield queryCache(methodInstance);
    let fromCache = () => !!cachedResponse;
    let controlledLoading = falseValue;
    if (!isFetcher) {
      saveStates = (frontStates2) => setStateCache(id, methodKey, frontStates2, hookInstance);
      saveStates(__spreadValues(__spreadValues({}, frontStates), managedStates));
      removeStates = () => removeStateCache(id, methodKey);
    }
    const guardNext = (guardNextConfig) => {
      isNextCalled = trueValue;
      const { force: guardNextForceRequest = forceRequest, method: guardNextReplacingMethod = methodInstance } = guardNextConfig || {};
      const forceRequestFinally = sloughConfig(guardNextForceRequest, [
        newInstance$1(AlovaEventBase, methodInstance, sendCallingArgs)
      ]);
      const progressUpdater = (stage) => ({ loaded, total }) => {
        frontStates[stage].v = {
          loaded,
          total
        };
      };
      methodInstance = guardNextReplacingMethod;
      pushItem$2(hookInstance.sf, saveStates);
      pushItem$2(hookInstance.rf, removeStates);
      if (!controlledLoading) {
        loadingState.v = !!forceRequestFinally || !cachedResponse;
      }
      const { downloading: enableDownload, uploading: enableUpload } = hookInstance.ro.trackedKeys;
      offDownloadEvent = enableDownload ? methodInstance.onDownload(progressUpdater("downloading")) : offDownloadEvent;
      offUploadEvent = enableUpload ? methodInstance.onUpload(progressUpdater("uploading")) : offUploadEvent;
      responseHandlePromise = methodInstance.send(forceRequestFinally);
      fromCache = () => methodInstance.fromCache || falseValue;
      return responseHandlePromise;
    };
    const commonContext = {
      method: methodInstance,
      cachedResponse,
      config: useHookConfig,
      abort: () => methodInstance.abort()
    };
    const toUpdateResponse = () => hookType !== 2 || !abortLast || hookInstance.m === methodInstance;
    const middlewareCompletePromise = isFetcher ? middleware(__spreadProps(__spreadValues({}, commonContext), {
      args: sendCallingArgs,
      fetch: (methodInstance2, ...args) => {
        assertMethod(currentHookAssert, methodInstance2);
        return useHookToSendRequest(hookInstance, methodInstance2, args);
      },
      proxyStates: omit(frontStates, "data"),
      controlFetching(control = trueValue) {
        controlledLoading = control;
      }
    }), guardNext) : middleware(__spreadProps(__spreadValues({}, commonContext), {
      args: sendCallingArgs,
      send: (...args) => useHookToSendRequest(hookInstance, methodHandler, args),
      proxyStates: frontStates,
      controlLoading(control = trueValue) {
        controlledLoading = control;
      }
    }), guardNext);
    let finallyResponse = undefinedValue;
    const baseEvent = AlovaEventBase.spawn(methodInstance, sendCallingArgs);
    try {
      const middlewareReturnedData = yield middlewareCompletePromise;
      const afterSuccess = (data) => {
        if (!isFetcher) {
          toUpdateResponse() && (dataState.v = data);
        } else if (hookInstance.c.updateState !== falseValue) {
          const cachedState = getStateCache(id, methodKey).s;
          cachedState && (cachedState.data.v = data);
        }
        if (toUpdateResponse()) {
          errorState.v = undefinedValue;
          !controlledLoading && (loadingState.v = falseValue);
          hookInstance.em.emit(KEY_SUCCESS, newInstance$1(AlovaSuccessEvent, baseEvent, data, fromCache()));
          hookInstance.em.emit(KEY_COMPLETE, newInstance$1(AlovaCompleteEvent, baseEvent, KEY_SUCCESS, data, fromCache(), undefinedValue));
        }
        return data;
      };
      finallyResponse = // 中间件中未返回数据或返回undefined时，去获取真实的响应数据
      // 否则使用返回数据并不再等待响应promise，此时也需要调用响应回调
      middlewareReturnedData !== undefinedValue ? afterSuccess(middlewareReturnedData) : isNextCalled ? (
        // 当middlewareCompletePromise为resolve时有两种可能
        // 1. 请求正常
        // 2. 请求错误，但错误被中间件函数捕获了，此时也将调用成功回调，即afterSuccess(undefinedValue)
        yield promiseThen(responseHandlePromise, afterSuccess, () => afterSuccess(undefinedValue))
      ) : (
        // 如果isNextCalled未被调用，则不返回数据
        undefinedValue
      );
      !isNextCalled && !controlledLoading && (loadingState.v = falseValue);
    } catch (error) {
      if (toUpdateResponse()) {
        errorState.v = error;
        !controlledLoading && (loadingState.v = falseValue);
        hookInstance.em.emit(KEY_ERROR, newInstance$1(AlovaErrorEvent, baseEvent, error));
        hookInstance.em.emit(KEY_COMPLETE, newInstance$1(AlovaCompleteEvent, baseEvent, KEY_ERROR, undefinedValue, fromCache(), error));
      }
      throw error;
    }
    offDownloadEvent();
    offUploadEvent();
    return finallyResponse;
  }))();
}
const refCurrent = (ref2) => ref2.current;
function createRequestState(hookType, methodHandler, useHookConfig, initialData, immediate = falseValue, watchingStates, debounceDelay = 0) {
  var _a;
  useHookConfig = __spreadValues({}, useHookConfig);
  const { middleware, __referingObj: referingObject = { trackedKeys: {}, bindError: falseValue } } = useHookConfig;
  let initialLoading = middleware ? falseValue : !!immediate;
  if (immediate && !middleware) {
    try {
      const methodInstance = getHandlerMethod(methodHandler, coreHookAssert(hookType));
      const alovaInstance = getContext(methodInstance);
      const l1CacheResult = alovaInstance.l1Cache.get(buildNamespacedCacheKey(alovaInstance.id, getMethodInternalKey(methodInstance)));
      let cachedResponse = undefinedValue;
      if (l1CacheResult && !instanceOf(l1CacheResult, PromiseCls)) {
        const [data2, expireTimestamp] = l1CacheResult;
        if (!expireTimestamp || expireTimestamp > getTime()) {
          cachedResponse = data2;
        }
      }
      const forceRequestFinally = sloughConfig((_a = useHookConfig.force) !== null && _a !== void 0 ? _a : falseValue);
      initialLoading = !!forceRequestFinally || !cachedResponse;
    } catch (error2) {
    }
  }
  const { create, effectRequest, ref: ref2, objectify, exposeProvider, transformState2Proxy } = statesHookHelper(promiseStatesHook(), referingObject);
  const progress = {
    total: 0,
    loaded: 0
  };
  const { managedStates = {} } = useHookConfig;
  const managedStatesProxy = mapObject(managedStates, (state, key2) => transformState2Proxy(state, key2));
  const data = create(isFn(initialData) ? initialData() : initialData, "data");
  const loading = create(initialLoading, "loading");
  const error = create(undefinedValue, "error");
  const downloading = create(__spreadValues({}, progress), "downloading");
  const uploading = create(__spreadValues({}, progress), "uploading");
  const frontStates = objectify([data, loading, error, downloading, uploading]);
  const eventManager = createEventManager();
  const hookInstance = refCurrent(ref2(createHook(hookType, useHookConfig, eventManager, referingObject)));
  hookInstance.fs = frontStates;
  hookInstance.em = eventManager;
  hookInstance.c = useHookConfig;
  hookInstance.ms = managedStatesProxy;
  const handleRequest = (handler = methodHandler, sendCallingArgs) => useHookToSendRequest(hookInstance, handler, sendCallingArgs);
  const wrapEffectRequest = (ro = referingObject, handler) => promiseCatch(handleRequest(handler), (error2) => {
    if (!ro.bindError && !ro.trackedKeys.error) {
      throw error2;
    }
  });
  ref2(debounce((delay, ro, handler) => wrapEffectRequest(ro, handler), (changedIndex) => isNumber$1(changedIndex) ? isArray$2(debounceDelay) ? debounceDelay[changedIndex] : debounceDelay : 0));
  if (!globalConfigMap.ssr) {
    effectRequest({
      handler: (
        // watchingStates为数组时表示监听状态（包含空数组），为undefined时表示不监听状态
        () => wrapEffectRequest(referingObject)
      ),
      removeStates: () => forEach(hookInstance.rf, (fn) => fn()),
      saveStates: (states) => forEach(hookInstance.sf, (fn) => fn(states)),
      frontStates: __spreadValues(__spreadValues({}, frontStates), managedStatesProxy),
      watchingStates,
      immediate: immediate !== null && immediate !== void 0 ? immediate : trueValue
    });
  }
  return exposeProvider(__spreadProps(__spreadValues({}, objectify([data, loading, error, downloading, uploading])), {
    abort: () => hookInstance.m && hookInstance.m.abort(),
    /**
     * 通过执行该方法来手动发起请求
     * @param sendCallingArgs 调用send函数时传入的参数
     * @param methodInstance 方法对象
     * @param isFetcher 是否为isFetcher调用
     * @returns 请求promise
     */
    send: (sendCallingArgs, methodInstance) => handleRequest(methodInstance, sendCallingArgs),
    onSuccess(handler) {
      eventManager.on(KEY_SUCCESS, handler);
    },
    onError(handler) {
      referingObject.bindError = trueValue;
      eventManager.on(KEY_ERROR, handler);
    },
    onComplete(handler) {
      eventManager.on(KEY_COMPLETE, handler);
    }
  }));
}
function useRequest(handler, config = {}) {
  const { immediate = trueValue, initialData } = config;
  const props = createRequestState(1, handler, config, initialData, !!immediate);
  const { send } = props;
  return objAssign(props, {
    send: (...args) => send(args)
  });
}
function a(e2) {
  return a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e3) {
    return typeof e3;
  } : function(e3) {
    return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
  }, a(e2);
}
function i(e2) {
  var r = function(e3, r2) {
    if ("object" !== a(e3) || null === e3) return e3;
    var t2 = e3[Symbol.toPrimitive];
    if (void 0 !== t2) {
      var n2 = t2.call(e3, r2 || "default");
      if ("object" !== a(n2)) return n2;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r2 ? String : Number)(e3);
  }(e2, "string");
  return "symbol" === a(r) ? r : r + "";
}
function u(e2, r, t2) {
  return (r = i(r)) in e2 ? Object.defineProperty(e2, r, { value: t2, enumerable: true, configurable: true, writable: true }) : e2[r] = t2, e2;
}
var c, l = Symbol("__ROUTER__"), f = Symbol("__ROUTE__");
!function(e2) {
  e2.push = "navigateTo", e2.replace = "redirectTo", e2.replaceAll = "reLaunch", e2.pushTab = "switchTab", e2.back = "navigateBack";
}(c || (c = {}));
var s = ["navigateTo", "redirectTo", "reLaunch", "switchTab", "navigateBack"];
function p(e2) {
  var r = {}, t2 = e2.split("?"), n2 = "", o2 = [];
  t2.length > 1 && (n2 = t2[1]), o2 = n2.split("&");
  for (var a2 = 0; o2.length > a2; a2++) 2 === o2[a2].split("=").length && (r[o2[a2].split("=")[0]] = o2[a2].split("=")[1]);
  return r;
}
function v(e2, r, t2) {
  return e2.replace(RegExp(r, "g"), t2);
}
function h(e2) {
  return e2 = v(e2, "//", "/"), e2 = v(e2, "https:/", "https://"), e2 = v(e2, "http:/", "http://");
}
function b(e2) {
  return null == e2 || 0 === Object.keys(e2).length;
}
function g(e2, r) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e2);
    r && (n2 = n2.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e2, r2).enumerable;
    })), t2.push.apply(t2, n2);
  }
  return t2;
}
function y(e2) {
  for (var r = 1; arguments.length > r; r++) {
    var t2 = null != arguments[r] ? arguments[r] : {};
    r % 2 ? g(Object(t2), true).forEach(function(r2) {
      u(e2, r2, t2[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : g(Object(t2)).forEach(function(r2) {
      Object.defineProperty(e2, r2, Object.getOwnPropertyDescriptor(t2, r2));
    });
  }
  return e2;
}
var d = { navigateTo: index.navigateTo, redirectTo: index.redirectTo, reLaunch: index.reLaunch, switchTab: index.switchTab, navigateBack: index.navigateBack };
function m(e2, r, t2) {
  var n2 = O(e2, r);
  switch (t2) {
    case "push":
      d.navigateTo({ url: n2 });
      break;
    case "replace":
      d.redirectTo({ url: n2 });
      break;
    case "pushTab":
      d.switchTab({ url: n2 });
      break;
    case "replaceAll":
      d.reLaunch({ url: n2 });
      break;
    default:
      throw Error("无效的路由类型，请确保提供正确的路由类型");
  }
}
function O(e2, r) {
  var t2 = "", n2 = {};
  if ("string" == typeof e2) t2 = e2;
  else {
    if (e2.name) {
      var o2 = r.routes.find(function(r2) {
        return r2.name === e2.name;
      });
      if (!o2 || !o2.path) throw Error("您正在尝试访问的路由未在路由表中定义。请检查您的路由配置。");
      t2 = o2.path, n2 = e2.params;
    } else e2.path && (t2 = h("/".concat(e2.path.split("?")[0])), n2 = y(y({}, p(e2.path)), e2.query || {}));
    n2 && (t2 = function(e3, r2) {
      for (var t3 in r2) e3.indexOf("?") > -1 ? e3 += "&".concat(t3, "=").concat(r2[t3]) : e3 += "?".concat(t3, "=").concat(r2[t3]);
      return e3;
    }(t2, n2 = function(e3) {
      var r2 = {};
      if (e3) for (var t3 in e3) {
        var n3 = e3[t3];
        void 0 === n3 && (n3 = ""), r2[t3] = n3;
      }
      return r2;
    }(n2)));
  }
  return t2;
}
function k(e2) {
  var r, t2 = (r = getCurrentPages()).length > 0 ? r[r.length - 1] : void 0;
  if (t2 && t2.route && e2.routes) {
    var n2 = P("/".concat(t2.route), e2);
    return t2.$page && (n2.fullPath = t2.$page.fullPath ? t2.$page.fullPath : "", n2.query = t2.$page.fullPath ? p(t2.$page.fullPath) : {}, n2.params = t2.$page.fullPath ? p(t2.$page.fullPath) : {}), n2;
  }
}
function P(e2, r) {
  e2 = h(e2.split("?")[0]);
  var t2 = r.routes.find(function(r2) {
    return r2.path === e2 || r2.aliasPath === e2;
  });
  return JSON.parse(JSON.stringify(t2));
}
function T(e2, r, t2) {
  e2.guardHooks[r] = [t2];
}
var w = { navigateTo: index.navigateTo, redirectTo: index.redirectTo, reLaunch: index.reLaunch, switchTab: index.switchTab, navigateBack: index.navigateBack };
function j(e2) {
  s.forEach(function(r) {
    d[r] = function(t2) {
      if ("navigateBack" === r) w[r](t2);
      else if (e2.guardHooks.beforeHooks && e2.guardHooks.beforeHooks[0]) {
        var n2 = P(t2.url, e2);
        (function(e3, r2, t3) {
          return new Promise(function(n3, o2) {
            var i2 = function e4(r3) {
              e4._called = true, false === r3 ? o2({}) : n3(void 0 === r3 || true === r3 || r3);
            }, u2 = e3.call(void 0, r2, t3, i2), c2 = Promise.resolve(u2);
            if (3 > e3.length && (c2 = c2.then(i2)), e3.length > 2) {
              var l2 = 'The "next" callback was never called inside of '.concat(e3.name ? '"' + e3.name + '"' : "", ":\n").concat("" + e3, '\n. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.');
              if (null !== u2 && "object" === a(u2) && "then" in u2) c2 = c2.then(function(e4) {
                return i2._called ? e4 : (console.warn(l2), Promise.reject(Error("Invalid navigation guard")));
              });
              else if (!i2._called) return console.warn(l2), void o2(Error("Invalid navigation guard"));
            }
            c2.catch(function(e4) {
              return o2(e4);
            });
          });
        })(e2.guardHooks.beforeHooks[0], n2, e2.route.value).then(function(n3) {
          if (true === n3) w[r](t2);
          else if ("string" == typeof n3) {
            var o2 = O(n3, e2);
            w[r]({ url: o2 });
          } else if ("back" === n3.navType) w.navigateBack(n3);
          else {
            var a2 = O(n3, e2);
            w[n3.navType ? c[n3.navType] : r]({ url: a2 });
          }
        }).catch(function(e3) {
          throw e3;
        });
      } else w[r](t2);
    };
  });
}
function S(e2, r) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e2);
    r && (n2 = n2.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e2, r2).enumerable;
    })), t2.push.apply(t2, n2);
  }
  return t2;
}
function $(e2) {
  for (var r = 1; arguments.length > r; r++) {
    var t2 = null != arguments[r] ? arguments[r] : {};
    r % 2 ? S(Object(t2), true).forEach(function(r2) {
      u(e2, r2, t2[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : S(Object(t2)).forEach(function(r2) {
      Object.defineProperty(e2, r2, Object.getOwnPropertyDescriptor(t2, r2));
    });
  }
  return e2;
}
function _(e2) {
  var r = { routes: e2.routes, guardHooks: { beforeHooks: null, afterHooks: null }, push: function(e3) {
    return m(e3, this, "push");
  }, replace: function(e3) {
    return m(e3, this, "replace");
  }, replaceAll: function(e3) {
    return m(e3, this, "replaceAll");
  }, pushTab: function(e3) {
    return m(e3, this, "pushTab");
  }, back: function(e3) {
    return index.navigateBack(e3);
  }, beforeEach: function(e3) {
    T(r, "beforeHooks", e3);
  }, afterEach: function(e3) {
    T(r, "afterHooks", e3);
  }, install: function(e3) {
    var r2 = this, t2 = this;
    e3.provide(l, this), e3.provide(f, this.route), j(t2), e3.mixin({ beforeCreate: function() {
      if ("page" === this.$mpType && t2.guardHooks.afterHooks && t2.guardHooks.afterHooks[0]) {
        var e4 = t2.route.value, r3 = k(t2);
        t2.guardHooks.afterHooks[0].call(null, r3, e4);
      }
    }, onLoad: function(e4) {
      !b(e4) && b(t2.route.value.query) && b(t2.route.value.params) && (t2.route.value = $($({}, t2.route.value), {}, { query: e4 }));
    }, onShow: function() {
      "page" === this.$mpType && function(e4) {
        e4.route.value = k(e4);
      }(t2);
    } }), Object.defineProperty(e3.config.globalProperties, "$Router", { get: function() {
      return t2;
    } }), Object.defineProperty(e3.config.globalProperties, "$Route", { enumerable: true, get: function() {
      return unref(r2.route);
    } });
  }, route: shallowRef({ path: "/" }) };
  return r;
}
/*!
  * @intlify/shared v9.1.9
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
const inBrowser = typeof window !== "undefined";
let mark;
let measure;
{
  const perf2 = inBrowser && window.performance;
  if (perf2 && perf2.mark && perf2.measure && perf2.clearMarks && perf2.clearMeasures) {
    mark = (tag) => perf2.mark(tag);
    measure = (name, startTag, endTag) => {
      perf2.measure(name, startTag, endTag);
      perf2.clearMarks(startTag);
      perf2.clearMarks(endTag);
    };
  }
}
const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
function format(message, ...args) {
  if (args.length === 1 && isObject$1(args[0])) {
    args = args[0];
  }
  if (!args || !args.hasOwnProperty) {
    args = {};
  }
  return message.replace(RE_ARGS, (match, identifier) => {
    return args.hasOwnProperty(identifier) ? args[identifier] : "";
  });
}
const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
const makeSymbol = (name) => hasSymbol ? Symbol(name) : name;
const generateFormatCacheKey = (locale, key2, source) => friendlyJSONstringify({ l: locale, k: key2, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
const assign = Object.assign;
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function escapeHtml(rawText) {
  return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function hasOwn$1(obj, key2) {
  return hasOwnProperty$1.call(obj, key2);
}
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isObject$1 = (val) => (
  // eslint-disable-line
  val !== null && typeof val === "object"
);
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
const RANGE = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
  const lines = source.split(/\r?\n/);
  let count = 0;
  const res = [];
  for (let i2 = 0; i2 < lines.length; i2++) {
    count += lines[i2].length + 1;
    if (count >= start) {
      for (let j2 = i2 - RANGE; j2 <= i2 + RANGE || end > count; j2++) {
        if (j2 < 0 || j2 >= lines.length)
          continue;
        const line = j2 + 1;
        res.push(`${line}${" ".repeat(3 - String(line).length)}|  ${lines[j2]}`);
        const lineLength = lines[j2].length;
        if (j2 === i2) {
          const pad = start - (count - lineLength) + 1;
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
        } else if (j2 > i2) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + "^".repeat(length));
          }
          count += lineLength + 1;
        }
      }
      break;
    }
  }
  return res.join("\n");
}
function createEmitter() {
  const events = /* @__PURE__ */ new Map();
  const emitter2 = {
    events,
    on(event, handler) {
      const handlers = events.get(event);
      const added = handlers && handlers.push(handler);
      if (!added) {
        events.set(event, [handler]);
      }
    },
    off(event, handler) {
      const handlers = events.get(event);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },
    emit(event, payload) {
      (events.get(event) || []).slice().map((handler) => handler(payload));
      (events.get("*") || []).slice().map((handler) => handler(event, payload));
    }
  };
  return emitter2;
}
/*!
 * @intlify/message-resolver v9.1.9
 * (c) 2021 kazuya kawaguchi
 * Released under the MIT License.
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key2) {
  return hasOwnProperty.call(obj, key2);
}
const isObject = (val) => (
  // eslint-disable-line
  val !== null && typeof val === "object"
);
const pathStateMachine = [];
pathStateMachine[
  0
  /* BEFORE_PATH */
] = {
  [
    "w"
    /* WORKSPACE */
  ]: [
    0
    /* BEFORE_PATH */
  ],
  [
    "i"
    /* IDENT */
  ]: [
    3,
    0
    /* APPEND */
  ],
  [
    "["
    /* LEFT_BRACKET */
  ]: [
    4
    /* IN_SUB_PATH */
  ],
  [
    "o"
    /* END_OF_FAIL */
  ]: [
    7
    /* AFTER_PATH */
  ]
};
pathStateMachine[
  1
  /* IN_PATH */
] = {
  [
    "w"
    /* WORKSPACE */
  ]: [
    1
    /* IN_PATH */
  ],
  [
    "."
    /* DOT */
  ]: [
    2
    /* BEFORE_IDENT */
  ],
  [
    "["
    /* LEFT_BRACKET */
  ]: [
    4
    /* IN_SUB_PATH */
  ],
  [
    "o"
    /* END_OF_FAIL */
  ]: [
    7
    /* AFTER_PATH */
  ]
};
pathStateMachine[
  2
  /* BEFORE_IDENT */
] = {
  [
    "w"
    /* WORKSPACE */
  ]: [
    2
    /* BEFORE_IDENT */
  ],
  [
    "i"
    /* IDENT */
  ]: [
    3,
    0
    /* APPEND */
  ],
  [
    "0"
    /* ZERO */
  ]: [
    3,
    0
    /* APPEND */
  ]
};
pathStateMachine[
  3
  /* IN_IDENT */
] = {
  [
    "i"
    /* IDENT */
  ]: [
    3,
    0
    /* APPEND */
  ],
  [
    "0"
    /* ZERO */
  ]: [
    3,
    0
    /* APPEND */
  ],
  [
    "w"
    /* WORKSPACE */
  ]: [
    1,
    1
    /* PUSH */
  ],
  [
    "."
    /* DOT */
  ]: [
    2,
    1
    /* PUSH */
  ],
  [
    "["
    /* LEFT_BRACKET */
  ]: [
    4,
    1
    /* PUSH */
  ],
  [
    "o"
    /* END_OF_FAIL */
  ]: [
    7,
    1
    /* PUSH */
  ]
};
pathStateMachine[
  4
  /* IN_SUB_PATH */
] = {
  [
    "'"
    /* SINGLE_QUOTE */
  ]: [
    5,
    0
    /* APPEND */
  ],
  [
    '"'
    /* DOUBLE_QUOTE */
  ]: [
    6,
    0
    /* APPEND */
  ],
  [
    "["
    /* LEFT_BRACKET */
  ]: [
    4,
    2
    /* INC_SUB_PATH_DEPTH */
  ],
  [
    "]"
    /* RIGHT_BRACKET */
  ]: [
    1,
    3
    /* PUSH_SUB_PATH */
  ],
  [
    "o"
    /* END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* ELSE */
  ]: [
    4,
    0
    /* APPEND */
  ]
};
pathStateMachine[
  5
  /* IN_SINGLE_QUOTE */
] = {
  [
    "'"
    /* SINGLE_QUOTE */
  ]: [
    4,
    0
    /* APPEND */
  ],
  [
    "o"
    /* END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* ELSE */
  ]: [
    5,
    0
    /* APPEND */
  ]
};
pathStateMachine[
  6
  /* IN_DOUBLE_QUOTE */
] = {
  [
    '"'
    /* DOUBLE_QUOTE */
  ]: [
    4,
    0
    /* APPEND */
  ],
  [
    "o"
    /* END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* ELSE */
  ]: [
    6,
    0
    /* APPEND */
  ]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a2 = str.charCodeAt(0);
  const b2 = str.charCodeAt(str.length - 1);
  return a2 === b2 && (a2 === 34 || a2 === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code = ch.charCodeAt(0);
  switch (code) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return ch;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse(path) {
  const keys2 = [];
  let index2 = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c2;
  let key2;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[
    0
    /* APPEND */
  ] = () => {
    if (key2 === void 0) {
      key2 = newChar;
    } else {
      key2 += newChar;
    }
  };
  actions[
    1
    /* PUSH */
  ] = () => {
    if (key2 !== void 0) {
      keys2.push(key2);
      key2 = void 0;
    }
  };
  actions[
    2
    /* INC_SUB_PATH_DEPTH */
  ] = () => {
    actions[
      0
      /* APPEND */
    ]();
    subPathDepth++;
  };
  actions[
    3
    /* PUSH_SUB_PATH */
  ] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[
        0
        /* APPEND */
      ]();
    } else {
      subPathDepth = 0;
      if (key2 === void 0) {
        return false;
      }
      key2 = formatSubPath(key2);
      if (key2 === false) {
        return false;
      } else {
        actions[
          1
          /* PUSH */
        ]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index2 + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index2++;
      newChar = "\\" + nextChar;
      actions[
        0
        /* APPEND */
      ]();
      return true;
    }
  }
  while (mode !== null) {
    index2++;
    c2 = path[index2];
    if (c2 === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c2);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap[
      "l"
      /* ELSE */
    ] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c2;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys2;
    }
  }
}
const cache = /* @__PURE__ */ new Map();
function resolveValue(obj, path) {
  if (!isObject(obj)) {
    return null;
  }
  let hit = cache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      cache.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len2 = hit.length;
  let last = obj;
  let i2 = 0;
  while (i2 < len2) {
    const val = last[hit[i2]];
    if (val === void 0) {
      return null;
    }
    last = val;
    i2++;
  }
  return last;
}
function handleFlatJson(obj) {
  if (!isObject(obj)) {
    return obj;
  }
  for (const key2 in obj) {
    if (!hasOwn(obj, key2)) {
      continue;
    }
    if (!key2.includes(
      "."
      /* DOT */
    )) {
      if (isObject(obj[key2])) {
        handleFlatJson(obj[key2]);
      }
    } else {
      const subKeys = key2.split(
        "."
        /* DOT */
      );
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      for (let i2 = 0; i2 < lastIndex; i2++) {
        if (!(subKeys[i2] in currentObj)) {
          currentObj[subKeys[i2]] = {};
        }
        currentObj = currentObj[subKeys[i2]];
      }
      currentObj[subKeys[lastIndex]] = obj[key2];
      delete obj[key2];
      if (isObject(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
/*!
 * @intlify/runtime v9.1.9
 * (c) 2021 kazuya kawaguchi
 * Released under the MIT License.
 */
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values2) => values2.length === 0 ? "" : values2.join("");
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index2 = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index2 : index2;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject$1(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject$1(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages) => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
  const _list = options.list || [];
  const list = (index2) => _list[index2];
  const _named = options.named || {};
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key2) => _named[key2];
  function message(key2) {
    const msg = isFunction(options.messages) ? options.messages(key2) : isObject$1(options.messages) ? options.messages[key2] : false;
    return !msg ? options.parent ? options.parent.message(key2) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const ctx = {
    [
      "list"
      /* LIST */
    ]: list,
    [
      "named"
      /* NAMED */
    ]: named,
    [
      "plural"
      /* PLURAL */
    ]: plural,
    [
      "linked"
      /* LINKED */
    ]: (key2, modifier) => {
      const msg = message(key2)(ctx);
      return isString(modifier) ? _modifier(modifier)(msg) : msg;
    },
    [
      "message"
      /* MESSAGE */
    ]: message,
    [
      "type"
      /* TYPE */
    ]: type,
    [
      "interpolate"
      /* INTERPOLATE */
    ]: interpolate,
    [
      "normalize"
      /* NORMALIZE */
    ]: normalize
  };
  return ctx;
}
/*!
 * @intlify/message-compiler v9.1.9
 * (c) 2021 kazuya kawaguchi
 * Released under the MIT License.
 */
const errorMessages$2 = {
  // tokenizer error messages
  [
    0
    /* EXPECTED_TOKEN */
  ]: `Expected token: '{0}'`,
  [
    1
    /* INVALID_TOKEN_IN_PLACEHOLDER */
  ]: `Invalid token in placeholder: '{0}'`,
  [
    2
    /* UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER */
  ]: `Unterminated single quote in placeholder`,
  [
    3
    /* UNKNOWN_ESCAPE_SEQUENCE */
  ]: `Unknown escape sequence: \\{0}`,
  [
    4
    /* INVALID_UNICODE_ESCAPE_SEQUENCE */
  ]: `Invalid unicode escape sequence: {0}`,
  [
    5
    /* UNBALANCED_CLOSING_BRACE */
  ]: `Unbalanced closing brace`,
  [
    6
    /* UNTERMINATED_CLOSING_BRACE */
  ]: `Unterminated closing brace`,
  [
    7
    /* EMPTY_PLACEHOLDER */
  ]: `Empty placeholder`,
  [
    8
    /* NOT_ALLOW_NEST_PLACEHOLDER */
  ]: `Not allowed nest placeholder`,
  [
    9
    /* INVALID_LINKED_FORMAT */
  ]: `Invalid linked format`,
  // parser error messages
  [
    10
    /* MUST_HAVE_MESSAGES_IN_PLURAL */
  ]: `Plural must have messages`,
  [
    11
    /* UNEXPECTED_EMPTY_LINKED_MODIFIER */
  ]: `Unexpected empty linked modifier`,
  [
    12
    /* UNEXPECTED_EMPTY_LINKED_KEY */
  ]: `Unexpected empty linked key`,
  [
    13
    /* UNEXPECTED_LEXICAL_ANALYSIS */
  ]: `Unexpected lexical analysis in token: '{0}'`
};
function createCompileError(code, loc, options = {}) {
  const { domain, messages, args } = options;
  const msg = format((messages || errorMessages$2)[code] || "", ...args || []);
  const error = new SyntaxError(String(msg));
  error.code = code;
  error.domain = domain;
  return error;
}
/*!
 * @intlify/devtools-if v9.1.9
 * (c) 2021 kazuya kawaguchi
 * Released under the MIT License.
 */
const IntlifyDevToolsHooks = {
  I18nInit: "i18n:init",
  FunctionTranslate: "function:translate"
};
/*!
* @intlify/core-base v9.1.9
* (c) 2021 kazuya kawaguchi
* Released under the MIT License.
*/
let devtools = null;
function setDevToolsHook(hook) {
  devtools = hook;
}
function initI18nDevTools(i18n, version2, meta) {
  devtools && devtools.emit(IntlifyDevToolsHooks.I18nInit, {
    timestamp: Date.now(),
    i18n,
    version: version2,
    meta
  });
}
const translateDevTools = /* @__PURE__ */ createDevToolsHook(IntlifyDevToolsHooks.FunctionTranslate);
function createDevToolsHook(hook) {
  return (payloads) => devtools && devtools.emit(hook, payloads);
}
const warnMessages$1 = {
  [
    0
    /* NOT_FOUND_KEY */
  ]: `Not found '{key}' key in '{locale}' locale messages.`,
  [
    1
    /* FALLBACK_TO_TRANSLATE */
  ]: `Fall back to translate '{key}' key with '{target}' locale.`,
  [
    2
    /* CANNOT_FORMAT_NUMBER */
  ]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
  [
    3
    /* FALLBACK_TO_NUMBER_FORMAT */
  ]: `Fall back to number format '{key}' key with '{target}' locale.`,
  [
    4
    /* CANNOT_FORMAT_DATE */
  ]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
  [
    5
    /* FALLBACK_TO_DATE_FORMAT */
  ]: `Fall back to datetime format '{key}' key with '{target}' locale.`
};
function getWarnMessage$1(code, ...args) {
  return format(warnMessages$1[code], ...args);
}
const VERSION$1 = "9.1.9";
const NOT_REOSLVED = -1;
const MISSING_RESOLVE_VALUE = "";
function getDefaultLinkedModifiers() {
  return {
    upper: (val) => isString(val) ? val.toUpperCase() : val,
    lower: (val) => isString(val) ? val.toLowerCase() : val,
    // prettier-ignore
    capitalize: (val) => isString(val) ? `${val.charAt(0).toLocaleUpperCase()}${val.substr(1)}` : val
  };
}
let _compiler;
let _additionalMeta = null;
const setAdditionalMeta = (meta) => {
  _additionalMeta = meta;
};
const getAdditionalMeta = () => _additionalMeta;
let _cid = 0;
function createCoreContext(options = {}) {
  const version2 = isString(options.version) ? options.version : VERSION$1;
  const locale = isString(options.locale) ? options.locale : "en-US";
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
  const messages = isPlainObject(options.messages) ? options.messages : { [locale]: {} };
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [locale]: {} };
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [locale]: {} };
  const modifiers = assign({}, options.modifiers || {}, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || {};
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const internalOptions = options;
  const __datetimeFormatters = isObject$1(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject$1(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject$1(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version: version2,
    cid: _cid,
    locale,
    fallbackLocale,
    messages,
    datetimeFormats,
    numberFormats,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    onWarn,
    __datetimeFormatters,
    __numberFormatters,
    __meta
  };
  {
    context.__v_emitter = internalOptions.__v_emitter != null ? internalOptions.__v_emitter : void 0;
  }
  {
    initI18nDevTools(context, version2, __meta);
  }
  return context;
}
function isTranslateFallbackWarn(fallback, key2) {
  return fallback instanceof RegExp ? fallback.test(key2) : fallback;
}
function isTranslateMissingWarn(missing, key2) {
  return missing instanceof RegExp ? missing.test(key2) : missing;
}
function handleMissing(context, key2, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  {
    const emitter2 = context.__v_emitter;
    if (emitter2) {
      emitter2.emit("missing", {
        locale,
        key: key2,
        type,
        groupId: `${type}:${key2}`
      });
    }
  }
  if (missing !== null) {
    const ret = missing(context, locale, key2, type);
    return isString(ret) ? ret : key2;
  } else {
    if (isTranslateMissingWarn(missingWarn, key2)) {
      onWarn(getWarnMessage$1(0, { key: key2, locale }));
    }
    return key2;
  }
}
function getLocaleChain(ctx, fallback, start) {
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(start);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray(fallback) ? fallback : isPlainObject(fallback) ? fallback["default"] ? fallback["default"] : null : fallback;
    block = isString(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(start, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i2 = 0; i2 < block.length && isBoolean(follow); i2++) {
    const locale = block[i2];
    if (isString(locale)) {
      follow = appendLocaleToChain(chain, block[i2], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  getLocaleChain(ctx, fallback, locale);
}
function createCoreError(code) {
  return createCompileError(code, null, { messages: errorMessages$1 });
}
const errorMessages$1 = {
  [
    14
    /* INVALID_ARGUMENT */
  ]: "Invalid arguments",
  [
    15
    /* INVALID_DATE_ARGUMENT */
  ]: "The date provided is an invalid Date object.Make sure your Date represents a valid date.",
  [
    16
    /* INVALID_ISO_DATE_ARGUMENT */
  ]: "The argument provided is not a valid ISO date string"
};
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val) => isFunction(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, fallbackLocale, messages } = context;
  const [key2, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : key2 : fallbackFormat ? key2 : "";
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
  const locale = isString(options.locale) ? options.locale : context.locale;
  escapeParameter && escapeParams(options);
  let [format2, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key2, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key2,
    locale,
    messages[locale] || {}
  ];
  let cacheBaseKey = key2;
  if (!resolvedMessage && !(isString(format2) || isMessageFunction(format2))) {
    if (enableDefaultMsg) {
      format2 = defaultMsgOrKey;
      cacheBaseKey = format2;
    }
  }
  if (!resolvedMessage && (!(isString(format2) || isMessageFunction(format2)) || !isString(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key2;
  }
  if (isString(format2) && context.messageCompiler == null) {
    warn(`The message format compilation is not supported in this build. Because message compiler isn't included. You need to pre-compilation all message format. So translate function return '${key2}'.`);
    return key2;
  }
  let occurred = false;
  const errorDetector = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key2, targetLocale, format2, cacheBaseKey, errorDetector) : format2;
  if (occurred) {
    return format2;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  const ret = postTranslation ? postTranslation(messaged) : messaged;
  {
    const payloads = {
      timestamp: Date.now(),
      key: isString(key2) ? key2 : isMessageFunction(format2) ? format2.key : "",
      locale: targetLocale || (isMessageFunction(format2) ? format2.locale : ""),
      format: isString(format2) ? format2 : isMessageFunction(format2) ? format2.source : "",
      message: ret
    };
    payloads.meta = assign({}, context.__meta, getAdditionalMeta() || {});
    translateDevTools(payloads);
  }
  return ret;
}
function escapeParams(options) {
  if (isArray(options.list)) {
    options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
  } else if (isObject$1(options.named)) {
    Object.keys(options.named).forEach((key2) => {
      if (isString(options.named[key2])) {
        options.named[key2] = escapeHtml(options.named[key2]);
      }
    });
  }
}
function resolveMessageFormat(context, key2, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages, onWarn } = context;
  const locales = getLocaleChain(context, fallbackLocale, locale);
  let message = {};
  let targetLocale;
  let format2 = null;
  let from = locale;
  let to = null;
  const type = "translate";
  for (let i2 = 0; i2 < locales.length; i2++) {
    targetLocale = to = locales[i2];
    if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key2)) {
      onWarn(getWarnMessage$1(1, {
        key: key2,
        target: targetLocale
      }));
    }
    if (locale !== targetLocale) {
      const emitter2 = context.__v_emitter;
      if (emitter2) {
        emitter2.emit("fallback", {
          type,
          key: key2,
          from,
          to,
          groupId: `${type}:${key2}`
        });
      }
    }
    message = messages[targetLocale] || {};
    let start = null;
    let startTag;
    let endTag;
    if (inBrowser) {
      start = window.performance.now();
      startTag = "intlify-message-resolve-start";
      endTag = "intlify-message-resolve-end";
      mark && mark(startTag);
    }
    if ((format2 = resolveValue(message, key2)) === null) {
      format2 = message[key2];
    }
    if (inBrowser) {
      const end = window.performance.now();
      const emitter2 = context.__v_emitter;
      if (emitter2 && start && format2) {
        emitter2.emit("message-resolve", {
          type: "message-resolve",
          key: key2,
          message: format2,
          time: end - start,
          groupId: `${type}:${key2}`
        });
      }
      if (startTag && endTag && mark && measure) {
        mark(endTag);
        measure("intlify message resolve", startTag, endTag);
      }
    }
    if (isString(format2) || isFunction(format2))
      break;
    const missingRet = handleMissing(context, key2, targetLocale, missingWarn, type);
    if (missingRet !== key2) {
      format2 = missingRet;
    }
    from = to;
  }
  return [format2, targetLocale, message];
}
function compileMessageFormat(context, key2, targetLocale, format2, cacheBaseKey, errorDetector) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format2)) {
    const msg2 = format2;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key2;
    return msg2;
  }
  let start = null;
  let startTag;
  let endTag;
  if (inBrowser) {
    start = window.performance.now();
    startTag = "intlify-message-compilation-start";
    endTag = "intlify-message-compilation-end";
    mark && mark(startTag);
  }
  const msg = messageCompiler(format2, getCompileOptions(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, errorDetector));
  if (inBrowser) {
    const end = window.performance.now();
    const emitter2 = context.__v_emitter;
    if (emitter2 && start) {
      emitter2.emit("message-compilation", {
        type: "message-compilation",
        message: format2,
        time: end - start,
        groupId: `${"translate"}:${key2}`
      });
    }
    if (startTag && endTag && mark && measure) {
      mark(endTag);
      measure("intlify message compilation", startTag, endTag);
    }
  }
  msg.locale = targetLocale;
  msg.key = key2;
  msg.source = format2;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  let start = null;
  let startTag;
  let endTag;
  if (inBrowser) {
    start = window.performance.now();
    startTag = "intlify-message-evaluation-start";
    endTag = "intlify-message-evaluation-end";
    mark && mark(startTag);
  }
  const messaged = msg(msgCtx);
  if (inBrowser) {
    const end = window.performance.now();
    const emitter2 = context.__v_emitter;
    if (emitter2 && start) {
      emitter2.emit("message-evaluation", {
        type: "message-evaluation",
        value: messaged,
        time: end - start,
        groupId: `${"translate"}:${msg.key}`
      });
    }
    if (startTag && endTag && mark && measure) {
      mark(endTag);
      measure("intlify message evaluation", startTag, endTag);
    }
  }
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = {};
  if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1)) {
    throw createCoreError(
      14
      /* INVALID_ARGUMENT */
    );
  }
  const key2 = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
    assign(options, arg3);
  }
  return [key2, options];
}
function getCompileOptions(context, locale, key2, source, warnHtmlMessage, errorDetector) {
  return {
    warnHtmlMessage,
    onError: (err) => {
      errorDetector && errorDetector(err);
      {
        const message = `Message compilation error: ${err.message}`;
        const codeFrame = err.location && generateCodeFrame(source, err.location.start.offset, err.location.end.offset);
        const emitter2 = context.__v_emitter;
        if (emitter2) {
          emitter2.emit("compile-error", {
            message: source,
            error: err.message,
            start: err.location && err.location.start.offset,
            end: err.location && err.location.end.offset,
            groupId: `${"translate"}:${key2}`
          });
        }
        console.error(codeFrame ? `${message}
${codeFrame}` : message);
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key2, source2)
  };
}
function getMessageContextOptions(context, locale, message, options) {
  const { modifiers, pluralRules } = context;
  const resolveMessage = (key2) => {
    const val = resolveValue(message, key2);
    if (isString(val)) {
      let occurred = false;
      const errorDetector = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key2, locale, val, key2, errorDetector);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
const intlDefined = typeof Intl !== "undefined";
const Availabilities = {
  dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== "undefined",
  numberFormat: intlDefined && typeof Intl.NumberFormat !== "undefined"
};
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn } = context;
  const { __datetimeFormatters } = context;
  if (!Availabilities.dateTimeFormat) {
    onWarn(getWarnMessage$1(
      4
      /* CANNOT_FORMAT_DATE */
    ));
    return MISSING_RESOLVE_VALUE;
  }
  const [key2, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = isString(options.locale) ? options.locale : context.locale;
  const locales = getLocaleChain(context, fallbackLocale, locale);
  if (!isString(key2) || key2 === "") {
    return new Intl.DateTimeFormat(locale).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format2 = null;
  let from = locale;
  let to = null;
  const type = "datetime format";
  for (let i2 = 0; i2 < locales.length; i2++) {
    targetLocale = to = locales[i2];
    if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key2)) {
      onWarn(getWarnMessage$1(5, {
        key: key2,
        target: targetLocale
      }));
    }
    if (locale !== targetLocale) {
      const emitter2 = context.__v_emitter;
      if (emitter2) {
        emitter2.emit("fallback", {
          type,
          key: key2,
          from,
          to,
          groupId: `${type}:${key2}`
        });
      }
    }
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format2 = datetimeFormat[key2];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key2, targetLocale, missingWarn, type);
    from = to;
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key2;
  }
  let id = `${targetLocale}__${key2}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides));
    __datetimeFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  let options = {};
  let overrides = {};
  let value;
  if (isString(arg1)) {
    if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(arg1)) {
      throw createCoreError(
        16
        /* INVALID_ISO_DATE_ARGUMENT */
      );
    }
    value = new Date(arg1);
    try {
      value.toISOString();
    } catch (e2) {
      throw createCoreError(
        16
        /* INVALID_ISO_DATE_ARGUMENT */
      );
    }
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(
        15
        /* INVALID_DATE_ARGUMENT */
      );
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(
      14
      /* INVALID_ARGUMENT */
    );
  }
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    options = arg2;
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key2 in format2) {
    const id = `${locale}__${key2}`;
    if (!context.__datetimeFormatters.has(id)) {
      continue;
    }
    context.__datetimeFormatters.delete(id);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn } = context;
  const { __numberFormatters } = context;
  if (!Availabilities.numberFormat) {
    onWarn(getWarnMessage$1(
      2
      /* CANNOT_FORMAT_NUMBER */
    ));
    return MISSING_RESOLVE_VALUE;
  }
  const [key2, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = isString(options.locale) ? options.locale : context.locale;
  const locales = getLocaleChain(context, fallbackLocale, locale);
  if (!isString(key2) || key2 === "") {
    return new Intl.NumberFormat(locale).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format2 = null;
  let from = locale;
  let to = null;
  const type = "number format";
  for (let i2 = 0; i2 < locales.length; i2++) {
    targetLocale = to = locales[i2];
    if (locale !== targetLocale && isTranslateFallbackWarn(fallbackWarn, key2)) {
      onWarn(getWarnMessage$1(3, {
        key: key2,
        target: targetLocale
      }));
    }
    if (locale !== targetLocale) {
      const emitter2 = context.__v_emitter;
      if (emitter2) {
        emitter2.emit("fallback", {
          type,
          key: key2,
          from,
          to,
          groupId: `${type}:${key2}`
        });
      }
    }
    numberFormat = numberFormats[targetLocale] || {};
    format2 = numberFormat[key2];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key2, targetLocale, missingWarn, type);
    from = to;
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key2;
  }
  let id = `${targetLocale}__${key2}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides));
    __numberFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  let options = {};
  let overrides = {};
  if (!isNumber(arg1)) {
    throw createCoreError(
      14
      /* INVALID_ARGUMENT */
    );
  }
  const value = arg1;
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    options = arg2;
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key2 in format2) {
    const id = `${locale}__${key2}`;
    if (!context.__numberFormatters.has(id)) {
      continue;
    }
    context.__numberFormatters.delete(id);
  }
}
/*!
 * @intlify/vue-devtools v9.1.9
 * (c) 2021 kazuya kawaguchi
 * Released under the MIT License.
 */
const VueDevToolsLabels = {
  [
    "vue-devtools-plugin-vue-i18n"
    /* PLUGIN */
  ]: "Vue I18n devtools",
  [
    "vue-i18n-resource-inspector"
    /* CUSTOM_INSPECTOR */
  ]: "I18n Resources",
  [
    "vue-i18n-timeline"
    /* TIMELINE */
  ]: "Vue I18n"
};
const VueDevToolsPlaceholders = {
  [
    "vue-i18n-resource-inspector"
    /* CUSTOM_INSPECTOR */
  ]: "Search for scopes ..."
};
const VueDevToolsTimelineColors = {
  [
    "vue-i18n-timeline"
    /* TIMELINE */
  ]: 16764185
};
/*!
* vue-i18n v9.1.9
* (c) 2022 kazuya kawaguchi
* Released under the MIT License.
*/
const VERSION = "9.1.9";
function initFeatureFlags() {
  let needWarn = false;
  {
    needWarn = true;
  }
  if (needWarn) {
    console.warn(`You are running the esm-bundler build of vue-i18n. It is recommended to configure your bundler to explicitly replace feature flag globals with boolean literals to get proper tree-shaking in the final bundle.`);
  }
}
const warnMessages = {
  [
    6
    /* FALLBACK_TO_ROOT */
  ]: `Fall back to {type} '{key}' with root locale.`,
  [
    7
    /* NOT_SUPPORTED_PRESERVE */
  ]: `Not supported 'preserve'.`,
  [
    8
    /* NOT_SUPPORTED_FORMATTER */
  ]: `Not supported 'formatter'.`,
  [
    9
    /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
  ]: `Not supported 'preserveDirectiveContent'.`,
  [
    10
    /* NOT_SUPPORTED_GET_CHOICE_INDEX */
  ]: `Not supported 'getChoiceIndex'.`,
  [
    11
    /* COMPONENT_NAME_LEGACY_COMPATIBLE */
  ]: `Component name legacy compatible: '{name}' -> 'i18n'`,
  [
    12
    /* NOT_FOUND_PARENT_SCOPE */
  ]: `Not found parent scope. use the global scope.`
};
function getWarnMessage(code, ...args) {
  return format(warnMessages[code], ...args);
}
function createI18nError(code, ...args) {
  return createCompileError(code, null, { messages: errorMessages, args });
}
const errorMessages = {
  [
    14
    /* UNEXPECTED_RETURN_TYPE */
  ]: "Unexpected return type in composer",
  [
    15
    /* INVALID_ARGUMENT */
  ]: "Invalid argument",
  [
    16
    /* MUST_BE_CALL_SETUP_TOP */
  ]: "Must be called at the top of a `setup` function",
  [
    17
    /* NOT_INSLALLED */
  ]: "Need to install with `app.use` function",
  [
    22
    /* UNEXPECTED_ERROR */
  ]: "Unexpected error",
  [
    18
    /* NOT_AVAILABLE_IN_LEGACY_MODE */
  ]: "Not available in legacy mode",
  [
    19
    /* REQUIRED_VALUE */
  ]: `Required in value: {0}`,
  [
    20
    /* INVALID_VALUE */
  ]: `Invalid value`,
  [
    21
    /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */
  ]: `Cannot setup vue-devtools plugin`
};
const DEVTOOLS_META = "__INTLIFY_META__";
const TransrateVNodeSymbol = makeSymbol("__transrateVNode");
const DatetimePartsSymbol = makeSymbol("__datetimeParts");
const NumberPartsSymbol = makeSymbol("__numberParts");
const EnableEmitter = makeSymbol("__enableEmitter");
const DisableEmitter = makeSymbol("__disableEmitter");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
const InejctWithOption = makeSymbol("__injectWithOption");
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key2, type) => {
    return missing(locale, key2, getCurrentInstance() || void 0, type);
  };
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n } = options;
  const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? {} : { [locale]: {} };
  if (isArray(__i18n)) {
    __i18n.forEach(({ locale: locale2, resource }) => {
      if (locale2) {
        ret[locale2] = ret[locale2] || {};
        deepCopy(resource, ret[locale2]);
      } else {
        deepCopy(resource, ret);
      }
    });
  }
  if (options.flatJson) {
    for (const key2 in ret) {
      if (hasOwn$1(ret, key2)) {
        handleFlatJson(ret[key2]);
      }
    }
  }
  return ret;
}
const isNotObjectOrIsArray = (val) => !isObject$1(val) || isArray(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw createI18nError(
      20
      /* INVALID_VALUE */
    );
  }
  for (const key2 in src) {
    if (hasOwn$1(src, key2)) {
      if (isNotObjectOrIsArray(src[key2]) || isNotObjectOrIsArray(des[key2])) {
        des[key2] = src[key2];
      } else {
        deepCopy(src[key2], des[key2]);
      }
    }
  }
}
const getMetaInfo = () => {
  const instance = getCurrentInstance();
  return instance && instance.type[DEVTOOLS_META] ? { [DEVTOOLS_META]: instance.type[DEVTOOLS_META] } : null;
};
function createComposer(options = {}) {
  const { __root } = options;
  const _isGlobal = __root === void 0;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : "en-US"
  );
  const _fallbackLocale = ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  function getCoreContext() {
    return createCoreContext({
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      messageCompiler: function compileToFunction(source) {
        return (ctx) => {
          return ctx.normalize([source]);
        };
      },
      datetimeFormats: _datetimeFormats.value,
      numberFormats: _numberFormats.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      __datetimeFormatters: isPlainObject(_context) ? _context.__datetimeFormatters : void 0,
      __numberFormatters: isPlainObject(_context) ? _context.__numberFormatters : void 0,
      __v_emitter: isPlainObject(_context) ? _context.__v_emitter : void 0,
      __meta: { framework: "vue" }
    });
  }
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = computed(() => _datetimeFormats.value);
  const numberFormats = computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  function isResolvedTranslateMessage(type, arg) {
    return type !== "translate" || !!arg.resolvedMessage === false;
  }
  function wrapWithDeps(fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) {
    trackReactivityValues();
    let ret;
    {
      try {
        setAdditionalMeta(getMetaInfo());
        ret = fn(_context);
      } finally {
        setAdditionalMeta(null);
      }
    }
    if (isNumber(ret) && ret === NOT_REOSLVED) {
      const [key2, arg2] = argumentParser();
      if (__root && isString(key2) && isResolvedTranslateMessage(warnType, arg2)) {
        if (_fallbackRoot && (isTranslateFallbackWarn(_fallbackWarn, key2) || isTranslateMissingWarn(_missingWarn, key2))) {
          warn(getWarnMessage(6, {
            key: key2,
            type: warnType
          }));
        }
        {
          const { __v_emitter: emitter2 } = _context;
          if (emitter2 && _fallbackRoot) {
            emitter2.emit("fallback", {
              type: warnType,
              key: key2,
              to: "global",
              groupId: `${warnType}:${key2}`
            });
          }
        }
      }
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key2);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(
        14
        /* UNEXPECTED_RETURN_TYPE */
      );
    }
  }
  function t2(...args) {
    return wrapWithDeps((context) => translate(context, ...args), () => parseTranslateArgs(...args), "translate", (root2) => root2.t(...args), (key2) => key2, (val) => isString(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject$1(arg3)) {
      throw createI18nError(
        15
        /* INVALID_ARGUMENT */
      );
    }
    return t2(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d2(...args) {
    return wrapWithDeps((context) => datetime(context, ...args), () => parseDateTimeArgs(...args), "datetime format", (root2) => root2.d(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function n2(...args) {
    return wrapWithDeps((context) => number(context, ...args), () => parseNumberArgs(...args), "number format", (root2) => root2.n(...args), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function normalize(values2) {
    return values2.map((val) => isString(val) ? createVNode() : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function transrateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = translate(_context2, ...args);
        } finally {
          _context2.processor = null;
        }
        return ret;
      },
      () => parseTranslateArgs(...args),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root2) => root2[TransrateVNodeSymbol](...args),
      (key2) => [createVNode()],
      (val) => isArray(val)
    );
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => number(context, ...args),
      () => parseNumberArgs(...args),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root2) => root2[NumberPartsSymbol](...args),
      () => [],
      (val) => isString(val) || isArray(val)
    );
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => datetime(context, ...args),
      () => parseDateTimeArgs(...args),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root2) => root2[DatetimePartsSymbol](...args),
      () => [],
      (val) => isString(val) || isArray(val)
    );
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key2, locale2) {
    const targetLocale = isString(locale2) ? locale2 : _locale.value;
    const message = getLocaleMessage(targetLocale);
    return resolveValue(message, key2) !== null;
  }
  function resolveMessages(key2) {
    let messages2 = null;
    const locales = getLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i2 = 0; i2 < locales.length; i2++) {
      const targetLocaleMessages = _messages.value[locales[i2]] || {};
      const messageValue = resolveValue(targetLocaleMessages, key2);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key2) {
    const messages2 = resolveMessages(key2);
    return messages2 != null ? messages2 : __root ? __root.tm(key2) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  if (__root) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    datetimeFormats,
    numberFormats,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t: t2,
    rt,
    d: d2,
    n: n2,
    te,
    tm,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getDateTimeFormat,
    setDateTimeFormat,
    mergeDateTimeFormat,
    getNumberFormat,
    setNumberFormat,
    mergeNumberFormat,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [TransrateVNodeSymbol]: transrateVNode,
    [NumberPartsSymbol]: numberParts,
    [DatetimePartsSymbol]: datetimeParts,
    [SetPluralRulesSymbol]: setPluralRules,
    [InejctWithOption]: options.__injectWithOption
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
  {
    composer[EnableEmitter] = (emitter2) => {
      _context.__v_emitter = emitter2;
    };
    composer[DisableEmitter] = () => {
      _context.__v_emitter = void 0;
    };
  }
  return composer;
}
function convertComposerOptions(options) {
  const locale = isString(options.locale) ? options.locale : "en-US";
  const fallbackLocale = isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
  const missing = isFunction(options.missing) ? options.missing : void 0;
  const missingWarn = isBoolean(options.silentTranslationWarn) || isRegExp(options.silentTranslationWarn) ? !options.silentTranslationWarn : true;
  const fallbackWarn = isBoolean(options.silentFallbackWarn) || isRegExp(options.silentFallbackWarn) ? !options.silentFallbackWarn : true;
  const fallbackRoot = isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  const fallbackFormat = !!options.formatFallbackMessages;
  const modifiers = isPlainObject(options.modifiers) ? options.modifiers : {};
  const pluralizationRules = options.pluralizationRules;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : void 0;
  const warnHtmlMessage = isString(options.warnHtmlInMessage) ? options.warnHtmlInMessage !== "off" : true;
  const escapeParameter = !!options.escapeParameterHtml;
  const inheritLocale = isBoolean(options.sync) ? options.sync : true;
  if (options.formatter) {
    warn(getWarnMessage(
      8
      /* NOT_SUPPORTED_FORMATTER */
    ));
  }
  if (options.preserveDirectiveContent) {
    warn(getWarnMessage(
      9
      /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
    ));
  }
  let messages = options.messages;
  if (isPlainObject(options.sharedMessages)) {
    const sharedMessages = options.sharedMessages;
    const locales = Object.keys(sharedMessages);
    messages = locales.reduce((messages2, locale2) => {
      const message = messages2[locale2] || (messages2[locale2] = {});
      assign(message, sharedMessages[locale2]);
      return messages2;
    }, messages || {});
  }
  const { __i18n, __root, __injectWithOption } = options;
  const datetimeFormats = options.datetimeFormats;
  const numberFormats = options.numberFormats;
  const flatJson = options.flatJson;
  return {
    locale,
    fallbackLocale,
    messages,
    flatJson,
    datetimeFormats,
    numberFormats,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackRoot,
    fallbackFormat,
    modifiers,
    pluralRules: pluralizationRules,
    postTranslation,
    warnHtmlMessage,
    escapeParameter,
    inheritLocale,
    __i18n,
    __root,
    __injectWithOption
  };
}
function createVueI18n(options = {}) {
  const composer = createComposer(convertComposerOptions(options));
  const vueI18n = {
    // id
    id: composer.id,
    // locale
    get locale() {
      return composer.locale.value;
    },
    set locale(val) {
      composer.locale.value = val;
    },
    // fallbackLocale
    get fallbackLocale() {
      return composer.fallbackLocale.value;
    },
    set fallbackLocale(val) {
      composer.fallbackLocale.value = val;
    },
    // messages
    get messages() {
      return composer.messages.value;
    },
    // datetimeFormats
    get datetimeFormats() {
      return composer.datetimeFormats.value;
    },
    // numberFormats
    get numberFormats() {
      return composer.numberFormats.value;
    },
    // availableLocales
    get availableLocales() {
      return composer.availableLocales;
    },
    // formatter
    get formatter() {
      warn(getWarnMessage(
        8
        /* NOT_SUPPORTED_FORMATTER */
      ));
      return {
        interpolate() {
          return [];
        }
      };
    },
    set formatter(val) {
      warn(getWarnMessage(
        8
        /* NOT_SUPPORTED_FORMATTER */
      ));
    },
    // missing
    get missing() {
      return composer.getMissingHandler();
    },
    set missing(handler) {
      composer.setMissingHandler(handler);
    },
    // silentTranslationWarn
    get silentTranslationWarn() {
      return isBoolean(composer.missingWarn) ? !composer.missingWarn : composer.missingWarn;
    },
    set silentTranslationWarn(val) {
      composer.missingWarn = isBoolean(val) ? !val : val;
    },
    // silentFallbackWarn
    get silentFallbackWarn() {
      return isBoolean(composer.fallbackWarn) ? !composer.fallbackWarn : composer.fallbackWarn;
    },
    set silentFallbackWarn(val) {
      composer.fallbackWarn = isBoolean(val) ? !val : val;
    },
    // modifiers
    get modifiers() {
      return composer.modifiers;
    },
    // formatFallbackMessages
    get formatFallbackMessages() {
      return composer.fallbackFormat;
    },
    set formatFallbackMessages(val) {
      composer.fallbackFormat = val;
    },
    // postTranslation
    get postTranslation() {
      return composer.getPostTranslationHandler();
    },
    set postTranslation(handler) {
      composer.setPostTranslationHandler(handler);
    },
    // sync
    get sync() {
      return composer.inheritLocale;
    },
    set sync(val) {
      composer.inheritLocale = val;
    },
    // warnInHtmlMessage
    get warnHtmlInMessage() {
      return composer.warnHtmlMessage ? "warn" : "off";
    },
    set warnHtmlInMessage(val) {
      composer.warnHtmlMessage = val !== "off";
    },
    // escapeParameterHtml
    get escapeParameterHtml() {
      return composer.escapeParameter;
    },
    set escapeParameterHtml(val) {
      composer.escapeParameter = val;
    },
    // preserveDirectiveContent
    get preserveDirectiveContent() {
      warn(getWarnMessage(
        9
        /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
      ));
      return true;
    },
    set preserveDirectiveContent(val) {
      warn(getWarnMessage(
        9
        /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */
      ));
    },
    // pluralizationRules
    get pluralizationRules() {
      return composer.pluralRules || {};
    },
    // for internal
    __composer: composer,
    // t
    t(...args) {
      const [arg1, arg2, arg3] = args;
      const options2 = {};
      let list = null;
      let named = null;
      if (!isString(arg1)) {
        throw createI18nError(
          15
          /* INVALID_ARGUMENT */
        );
      }
      const key2 = arg1;
      if (isString(arg2)) {
        options2.locale = arg2;
      } else if (isArray(arg2)) {
        list = arg2;
      } else if (isPlainObject(arg2)) {
        named = arg2;
      }
      if (isArray(arg3)) {
        list = arg3;
      } else if (isPlainObject(arg3)) {
        named = arg3;
      }
      return composer.t(key2, list || named || {}, options2);
    },
    rt(...args) {
      return composer.rt(...args);
    },
    // tc
    tc(...args) {
      const [arg1, arg2, arg3] = args;
      const options2 = { plural: 1 };
      let list = null;
      let named = null;
      if (!isString(arg1)) {
        throw createI18nError(
          15
          /* INVALID_ARGUMENT */
        );
      }
      const key2 = arg1;
      if (isString(arg2)) {
        options2.locale = arg2;
      } else if (isNumber(arg2)) {
        options2.plural = arg2;
      } else if (isArray(arg2)) {
        list = arg2;
      } else if (isPlainObject(arg2)) {
        named = arg2;
      }
      if (isString(arg3)) {
        options2.locale = arg3;
      } else if (isArray(arg3)) {
        list = arg3;
      } else if (isPlainObject(arg3)) {
        named = arg3;
      }
      return composer.t(key2, list || named || {}, options2);
    },
    // te
    te(key2, locale) {
      return composer.te(key2, locale);
    },
    // tm
    tm(key2) {
      return composer.tm(key2);
    },
    // getLocaleMessage
    getLocaleMessage(locale) {
      return composer.getLocaleMessage(locale);
    },
    // setLocaleMessage
    setLocaleMessage(locale, message) {
      composer.setLocaleMessage(locale, message);
    },
    // mergeLocaleMessage
    mergeLocaleMessage(locale, message) {
      composer.mergeLocaleMessage(locale, message);
    },
    // d
    d(...args) {
      return composer.d(...args);
    },
    // getDateTimeFormat
    getDateTimeFormat(locale) {
      return composer.getDateTimeFormat(locale);
    },
    // setDateTimeFormat
    setDateTimeFormat(locale, format2) {
      composer.setDateTimeFormat(locale, format2);
    },
    // mergeDateTimeFormat
    mergeDateTimeFormat(locale, format2) {
      composer.mergeDateTimeFormat(locale, format2);
    },
    // n
    n(...args) {
      return composer.n(...args);
    },
    // getNumberFormat
    getNumberFormat(locale) {
      return composer.getNumberFormat(locale);
    },
    // setNumberFormat
    setNumberFormat(locale, format2) {
      composer.setNumberFormat(locale, format2);
    },
    // mergeNumberFormat
    mergeNumberFormat(locale, format2) {
      composer.mergeNumberFormat(locale, format2);
    },
    // getChoiceIndex
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getChoiceIndex(choice, choicesLength) {
      warn(getWarnMessage(
        10
        /* NOT_SUPPORTED_GET_CHOICE_INDEX */
      ));
      return -1;
    },
    // for internal
    __onComponentInstanceCreated(target) {
      const { componentInstanceCreatedListener } = options;
      if (componentInstanceCreatedListener) {
        componentInstanceCreatedListener(target, vueI18n);
      }
    }
  };
  {
    vueI18n.__enableEmitter = (emitter2) => {
      const __composer = composer;
      __composer[EnableEmitter] && __composer[EnableEmitter](emitter2);
    };
    vueI18n.__disableEmitter = () => {
      const __composer = composer;
      __composer[DisableEmitter] && __composer[DisableEmitter]();
    };
  }
  return vueI18n;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
  },
  i18n: {
    type: Object
  }
};
const Translation = {
  /* eslint-disable */
  name: "i18n-t",
  props: assign({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  /* eslint-enable */
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    const keys2 = Object.keys(slots).filter((key2) => key2 !== "_");
    return () => {
      const options = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys2);
      i18n[TransrateVNodeSymbol](props.keypath, arg, options);
      assign({}, attrs);
      return isString(props.tag) ? h$1(props.tag) : isObject$1(props.tag) ? h$1(props.tag) : h$1(Fragment);
    };
  }
};
function getInterpolateArg({ slots }, keys2) {
  if (keys2.length === 1 && keys2[0] === "default") {
    return slots.default ? slots.default() : [];
  } else {
    return keys2.reduce((arg, key2) => {
      const slot = slots[key2];
      if (slot) {
        arg[key2] = slot();
      }
      return arg;
    }, {});
  }
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString(props.format)) {
      options.key = props.format;
    } else if (isObject$1(props.format)) {
      if (isString(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    [options.key];
    if (isArray(parts)) {
      parts.map((part, index2) => {
        const slot = slots[part.type];
        return slot ? slot({ [part.type]: part.value, index: index2, parts }) : [part.value];
      });
    }
    assign({}, attrs);
    return isString(props.tag) ? h$1(props.tag) : isObject$1(props.tag) ? h$1(props.tag) : h$1(Fragment);
  };
}
const NUMBER_FORMAT_KEYS = [
  "localeMatcher",
  "style",
  "unit",
  "unitDisplay",
  "currency",
  "currencyDisplay",
  "useGrouping",
  "numberingSystem",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "notation",
  "formatMatcher"
];
const NumberFormat = {
  /* eslint-disable */
  name: "i18n-n",
  props: assign({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  setup(props, context) {
    const i18n = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
    return renderFormatter(props, context, NUMBER_FORMAT_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[NumberPartsSymbol](...args)
    ));
  }
};
const DATETIME_FORMAT_KEYS = [
  "dateStyle",
  "timeStyle",
  "fractionalSecondDigits",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "localeMatcher",
  "timeZone",
  "hour12",
  "hourCycle",
  "formatMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName"
];
const DatetimeFormat = {
  /* eslint-disable */
  name: "i18n-d",
  props: assign({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  setup(props, context) {
    const i18n = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
    return renderFormatter(props, context, DATETIME_FORMAT_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[DatetimePartsSymbol](...args)
    ));
  }
};
function getComposer$2(i18n, instance) {
  const i18nInternal = i18n;
  if (i18n.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
  }
}
function vTDirective(i18n) {
  const bind = (el, { instance, value, modifiers }) => {
    if (!instance || !instance.$) {
      throw createI18nError(
        22
        /* UNEXPECTED_ERROR */
      );
    }
    const composer = getComposer$2(i18n, instance.$);
    if (modifiers.preserve) {
      warn(getWarnMessage(
        7
        /* NOT_SUPPORTED_PRESERVE */
      ));
    }
    const parsedValue = parseValue(value);
    el.textContent = composer.t(...makeParams(parsedValue));
  };
  return {
    beforeMount: bind,
    beforeUpdate: bind
  };
}
function parseValue(value) {
  if (isString(value)) {
    return { path: value };
  } else if (isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(19, "path");
    }
    return value;
  } else {
    throw createI18nError(
      20
      /* INVALID_VALUE */
    );
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const useI18nComponentName = !!pluginOptions.useI18nComponentName;
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall && useI18nComponentName) {
    warn(getWarnMessage(11, {
      name: Translation.name
    }));
  }
  if (globalInstall) {
    app.component(!useI18nComponentName ? Translation.name : "i18n", Translation);
    app.component(NumberFormat.name, NumberFormat);
    app.component(DatetimeFormat.name, DatetimeFormat);
  }
  app.directive("t", vTDirective(i18n));
}
const VUE_I18N_COMPONENT_TYPES = "vue-i18n: composer properties";
let devtoolsApi;
function enableDevTools(app, i18n) {
  return __async(this, null, function* () {
    return new Promise((resolve2, reject) => {
      try {
        setupDevtoolsPlugin({
          id: "vue-devtools-plugin-vue-i18n",
          label: VueDevToolsLabels[
            "vue-devtools-plugin-vue-i18n"
            /* PLUGIN */
          ],
          packageName: "vue-i18n",
          homepage: "https://vue-i18n.intlify.dev",
          logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
          componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
          app
        }, (api) => {
          devtoolsApi = api;
          api.on.visitComponentTree(({ componentInstance, treeNode }) => {
            updateComponentTreeTags(componentInstance, treeNode, i18n);
          });
          api.on.inspectComponent(({ componentInstance, instanceData }) => {
            if (componentInstance.vnode.el.__VUE_I18N__ && instanceData) {
              if (i18n.mode === "legacy") {
                if (componentInstance.vnode.el.__VUE_I18N__ !== i18n.global.__composer) {
                  inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
                }
              } else {
                inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
              }
            }
          });
          api.addInspector({
            id: "vue-i18n-resource-inspector",
            label: VueDevToolsLabels[
              "vue-i18n-resource-inspector"
              /* CUSTOM_INSPECTOR */
            ],
            icon: "language",
            treeFilterPlaceholder: VueDevToolsPlaceholders[
              "vue-i18n-resource-inspector"
              /* CUSTOM_INSPECTOR */
            ]
          });
          api.on.getInspectorTree((payload) => {
            if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
              registerScope(payload, i18n);
            }
          });
          api.on.getInspectorState((payload) => {
            if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
              inspectScope(payload, i18n);
            }
          });
          api.on.editInspectorState((payload) => {
            if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
              editScope(payload, i18n);
            }
          });
          api.addTimelineLayer({
            id: "vue-i18n-timeline",
            label: VueDevToolsLabels[
              "vue-i18n-timeline"
              /* TIMELINE */
            ],
            color: VueDevToolsTimelineColors[
              "vue-i18n-timeline"
              /* TIMELINE */
            ]
          });
          resolve2(true);
        });
      } catch (e2) {
        console.error(e2);
        reject(false);
      }
    });
  });
}
function updateComponentTreeTags(instance, treeNode, i18n) {
  const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  if (instance && instance.vnode.el.__VUE_I18N__) {
    if (instance.vnode.el.__VUE_I18N__ !== global2) {
      const label = instance.type.name || instance.type.displayName || instance.type.__file;
      const tag = {
        label: `i18n (${label} Scope)`,
        textColor: 0,
        backgroundColor: 16764185
      };
      treeNode.tags.push(tag);
    }
  }
}
function inspectComposer(instanceData, composer) {
  const type = VUE_I18N_COMPONENT_TYPES;
  instanceData.state.push({
    type,
    key: "locale",
    editable: true,
    value: composer.locale.value
  });
  instanceData.state.push({
    type,
    key: "availableLocales",
    editable: false,
    value: composer.availableLocales
  });
  instanceData.state.push({
    type,
    key: "fallbackLocale",
    editable: true,
    value: composer.fallbackLocale.value
  });
  instanceData.state.push({
    type,
    key: "inheritLocale",
    editable: true,
    value: composer.inheritLocale
  });
  instanceData.state.push({
    type,
    key: "messages",
    editable: false,
    value: getLocaleMessageValue(composer.messages.value)
  });
  instanceData.state.push({
    type,
    key: "datetimeFormats",
    editable: false,
    value: composer.datetimeFormats.value
  });
  instanceData.state.push({
    type,
    key: "numberFormats",
    editable: false,
    value: composer.numberFormats.value
  });
}
function getLocaleMessageValue(messages) {
  const value = {};
  Object.keys(messages).forEach((key2) => {
    const v2 = messages[key2];
    if (isFunction(v2) && "source" in v2) {
      value[key2] = getMessageFunctionDetails(v2);
    } else if (isObject$1(v2)) {
      value[key2] = getLocaleMessageValue(v2);
    } else {
      value[key2] = v2;
    }
  });
  return value;
}
const ESC = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "&": "&amp;"
};
function escape$1(s2) {
  return s2.replace(/[<>"&]/g, escapeChar);
}
function escapeChar(a2) {
  return ESC[a2] || a2;
}
function getMessageFunctionDetails(func) {
  const argString = func.source ? `("${escape$1(func.source)}")` : `(?)`;
  return {
    _custom: {
      type: "function",
      display: `<span>ƒ</span> ${argString}`
    }
  };
}
function registerScope(payload, i18n) {
  payload.rootNodes.push({
    id: "global",
    label: "Global Scope"
  });
  const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  for (const [keyInstance, instance] of i18n.__instances) {
    const composer = i18n.mode === "composition" ? instance : instance.__composer;
    if (global2 === composer) {
      continue;
    }
    const label = keyInstance.type.name || keyInstance.type.displayName || keyInstance.type.__file;
    payload.rootNodes.push({
      id: composer.id.toString(),
      label: `${label} Scope`
    });
  }
}
function getComposer$1(nodeId, i18n) {
  if (nodeId === "global") {
    return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  } else {
    const instance = Array.from(i18n.__instances.values()).find((item) => item.id.toString() === nodeId);
    if (instance) {
      return i18n.mode === "composition" ? instance : instance.__composer;
    } else {
      return null;
    }
  }
}
function inspectScope(payload, i18n) {
  const composer = getComposer$1(payload.nodeId, i18n);
  if (composer) {
    payload.state = makeScopeInspectState(composer);
  }
}
function makeScopeInspectState(composer) {
  const state = {};
  const localeType = "Locale related info";
  const localeStates = [
    {
      type: localeType,
      key: "locale",
      editable: true,
      value: composer.locale.value
    },
    {
      type: localeType,
      key: "fallbackLocale",
      editable: true,
      value: composer.fallbackLocale.value
    },
    {
      type: localeType,
      key: "availableLocales",
      editable: false,
      value: composer.availableLocales
    },
    {
      type: localeType,
      key: "inheritLocale",
      editable: true,
      value: composer.inheritLocale
    }
  ];
  state[localeType] = localeStates;
  const localeMessagesType = "Locale messages info";
  const localeMessagesStates = [
    {
      type: localeMessagesType,
      key: "messages",
      editable: false,
      value: getLocaleMessageValue(composer.messages.value)
    }
  ];
  state[localeMessagesType] = localeMessagesStates;
  const datetimeFormatsType = "Datetime formats info";
  const datetimeFormatsStates = [
    {
      type: datetimeFormatsType,
      key: "datetimeFormats",
      editable: false,
      value: composer.datetimeFormats.value
    }
  ];
  state[datetimeFormatsType] = datetimeFormatsStates;
  const numberFormatsType = "Datetime formats info";
  const numberFormatsStates = [
    {
      type: numberFormatsType,
      key: "numberFormats",
      editable: false,
      value: composer.numberFormats.value
    }
  ];
  state[numberFormatsType] = numberFormatsStates;
  return state;
}
function addTimelineEvent(event, payload) {
  if (devtoolsApi) {
    let groupId;
    if (payload && "groupId" in payload) {
      groupId = payload.groupId;
      delete payload.groupId;
    }
    devtoolsApi.addTimelineEvent({
      layerId: "vue-i18n-timeline",
      event: {
        title: event,
        groupId,
        time: Date.now(),
        meta: {},
        data: payload || {},
        logType: event === "compile-error" ? "error" : event === "fallback" || event === "missing" ? "warning" : "default"
      }
    });
  }
}
function editScope(payload, i18n) {
  const composer = getComposer$1(payload.nodeId, i18n);
  if (composer) {
    const [field] = payload.path;
    if (field === "locale" && isString(payload.state.value)) {
      composer.locale.value = payload.state.value;
    } else if (field === "fallbackLocale" && (isString(payload.state.value) || isArray(payload.state.value) || isObject$1(payload.state.value))) {
      composer.fallbackLocale.value = payload.state.value;
    } else if (field === "inheritLocale" && isBoolean(payload.state.value)) {
      composer.inheritLocale = payload.state.value;
    }
  }
}
function defineMixin(vuei18n, composer, i18n) {
  return {
    beforeCreate() {
      const instance = getCurrentInstance();
      if (!instance) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      const options = this.$options;
      if (options.i18n) {
        const optionsI18n = options.i18n;
        if (options.__i18n) {
          optionsI18n.__i18n = options.__i18n;
        }
        optionsI18n.__root = composer;
        if (this === this.$root) {
          this.$i18n = mergeToRoot(vuei18n, optionsI18n);
        } else {
          optionsI18n.__injectWithOption = true;
          this.$i18n = createVueI18n(optionsI18n);
        }
      } else if (options.__i18n) {
        if (this === this.$root) {
          this.$i18n = mergeToRoot(vuei18n, options);
        } else {
          this.$i18n = createVueI18n({
            __i18n: options.__i18n,
            __injectWithOption: true,
            __root: composer
          });
        }
      } else {
        this.$i18n = vuei18n;
      }
      vuei18n.__onComponentInstanceCreated(this.$i18n);
      i18n.__setInstance(instance, this.$i18n);
      this.$t = (...args) => this.$i18n.t(...args);
      this.$rt = (...args) => this.$i18n.rt(...args);
      this.$tc = (...args) => this.$i18n.tc(...args);
      this.$te = (key2, locale) => this.$i18n.te(key2, locale);
      this.$d = (...args) => this.$i18n.d(...args);
      this.$n = (...args) => this.$i18n.n(...args);
      this.$tm = (key2) => this.$i18n.tm(key2);
    },
    mounted() {
      {
        this.$el.__VUE_I18N__ = this.$i18n.__composer;
        const emitter2 = this.__v_emitter = createEmitter();
        const _vueI18n = this.$i18n;
        _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter2);
        emitter2.on("*", addTimelineEvent);
      }
    },
    beforeUnmount() {
      const instance = getCurrentInstance();
      if (!instance) {
        throw createI18nError(
          22
          /* UNEXPECTED_ERROR */
        );
      }
      {
        if (this.__v_emitter) {
          this.__v_emitter.off("*", addTimelineEvent);
          delete this.__v_emitter;
        }
        const _vueI18n = this.$i18n;
        _vueI18n.__disableEmitter && _vueI18n.__disableEmitter();
        delete this.$el.__VUE_I18N__;
      }
      delete this.$t;
      delete this.$rt;
      delete this.$tc;
      delete this.$te;
      delete this.$d;
      delete this.$n;
      delete this.$tm;
      i18n.__deleteInstance(instance);
      delete this.$i18n;
    }
  };
}
function mergeToRoot(root2, options) {
  root2.locale = options.locale || root2.locale;
  root2.fallbackLocale = options.fallbackLocale || root2.fallbackLocale;
  root2.missing = options.missing || root2.missing;
  root2.silentTranslationWarn = options.silentTranslationWarn || root2.silentFallbackWarn;
  root2.silentFallbackWarn = options.silentFallbackWarn || root2.silentFallbackWarn;
  root2.formatFallbackMessages = options.formatFallbackMessages || root2.formatFallbackMessages;
  root2.postTranslation = options.postTranslation || root2.postTranslation;
  root2.warnHtmlInMessage = options.warnHtmlInMessage || root2.warnHtmlInMessage;
  root2.escapeParameterHtml = options.escapeParameterHtml || root2.escapeParameterHtml;
  root2.sync = options.sync || root2.sync;
  root2.__composer[SetPluralRulesSymbol](options.pluralizationRules || root2.pluralizationRules);
  const messages = getLocaleMessages(root2.locale, {
    messages: options.messages,
    __i18n: options.__i18n
  });
  Object.keys(messages).forEach((locale) => root2.mergeLocaleMessage(locale, messages[locale]));
  if (options.datetimeFormats) {
    Object.keys(options.datetimeFormats).forEach((locale) => root2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]));
  }
  if (options.numberFormats) {
    Object.keys(options.numberFormats).forEach((locale) => root2.mergeNumberFormat(locale, options.numberFormats[locale]));
  }
  return root2;
}
function createI18n(options = {}) {
  const __legacyMode = isBoolean(options.legacy) ? options.legacy : true;
  const __globalInjection = !!options.globalInjection;
  const __instances = /* @__PURE__ */ new Map();
  const __global = __legacyMode ? createVueI18n(options) : createComposer(options);
  const symbol = makeSymbol("vue-i18n");
  const i18n = {
    // mode
    get mode() {
      return __legacyMode ? "legacy" : "composition";
    },
    // install plugin
    install(app, ...options2) {
      return __async(this, null, function* () {
        {
          app.__VUE_I18N__ = i18n;
        }
        app.__VUE_I18N_SYMBOL__ = symbol;
        app.provide(app.__VUE_I18N_SYMBOL__, i18n);
        if (!__legacyMode && __globalInjection) {
          injectGlobalFields(app, i18n.global);
        }
        {
          apply(app, i18n, ...options2);
        }
        if (__legacyMode) {
          app.mixin(defineMixin(__global, __global.__composer, i18n));
        }
        {
          const ret = yield enableDevTools(app, i18n);
          if (!ret) {
            throw createI18nError(
              21
              /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */
            );
          }
          const emitter2 = createEmitter();
          if (__legacyMode) {
            const _vueI18n = __global;
            _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter2);
          } else {
            const _composer = __global;
            _composer[EnableEmitter] && _composer[EnableEmitter](emitter2);
          }
          emitter2.on("*", addTimelineEvent);
        }
      });
    },
    // global accessor
    get global() {
      return __global;
    },
    // @internal
    __instances,
    // @internal
    __getInstance(component) {
      return __instances.get(component) || null;
    },
    // @internal
    __setInstance(component, instance) {
      __instances.set(component, instance);
    },
    // @internal
    __deleteInstance(component) {
      __instances.delete(component);
    }
  };
  return i18n;
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(
      16
      /* MUST_BE_CALL_SETUP_TOP */
    );
  }
  if (!instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(
      17
      /* NOT_INSLALLED */
    );
  }
  const i18n = inject(instance.appContext.app.__VUE_I18N_SYMBOL__);
  if (!i18n) {
    throw createI18nError(
      22
      /* UNEXPECTED_ERROR */
    );
  }
  const global2 = i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
  const scope = isEmptyObject(options) ? "__i18n" in instance.type ? "local" : "global" : !options.useScope ? "local" : options.useScope;
  if (scope === "global") {
    let messages = isObject$1(options.messages) ? options.messages : {};
    if ("__i18nGlobal" in instance.type) {
      messages = getLocaleMessages(global2.locale.value, {
        messages,
        __i18n: instance.type.__i18nGlobal
      });
    }
    const locales = Object.keys(messages);
    if (locales.length) {
      locales.forEach((locale) => {
        global2.mergeLocaleMessage(locale, messages[locale]);
      });
    }
    if (isObject$1(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject$1(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
    return global2;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n, instance, options.__useComponent);
    if (composer2 == null) {
      {
        warn(getWarnMessage(
          12
          /* NOT_FOUND_PARENT_SCOPE */
        ));
      }
      composer2 = global2;
    }
    return composer2;
  }
  if (i18n.mode === "legacy") {
    throw createI18nError(
      18
      /* NOT_AVAILABLE_IN_LEGACY_MODE */
    );
  }
  const i18nInternal = i18n;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const type = instance.type;
    const composerOptions = assign({}, options);
    if (type.__i18n) {
      composerOptions.__i18n = type.__i18n;
    }
    if (global2) {
      composerOptions.__root = global2;
    }
    composer = createComposer(composerOptions);
    setupLifeCycle(i18nInternal, instance, composer);
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function getComposer(i18n, target, useComponent = false) {
  let composer = null;
  const root2 = target.root;
  let current = target.parent;
  while (current != null) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    } else {
      const vueI18n = i18nInternal.__getInstance(current);
      if (vueI18n != null) {
        composer = vueI18n.__composer;
      }
      if (useComponent && composer && !composer[InejctWithOption]) {
        composer = null;
      }
    }
    if (composer != null) {
      break;
    }
    if (root2 === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function setupLifeCycle(i18n, target, composer) {
  let emitter2 = null;
  onMounted(() => {
    if (target.vnode.el) {
      target.vnode.el.__VUE_I18N__ = composer;
      emitter2 = createEmitter();
      const _composer = composer;
      _composer[EnableEmitter] && _composer[EnableEmitter](emitter2);
      emitter2.on("*", addTimelineEvent);
    }
  }, target);
  onUnmounted(() => {
    if (target.vnode.el && target.vnode.el.__VUE_I18N__) {
      emitter2 && emitter2.off("*", addTimelineEvent);
      const _composer = composer;
      _composer[DisableEmitter] && _composer[DisableEmitter]();
      delete target.vnode.el.__VUE_I18N__;
    }
    i18n.__deleteInstance(target);
  }, target);
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm"];
function injectGlobalFields(app, composer) {
  const i18n = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(
        22
        /* UNEXPECTED_ERROR */
      );
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(
        22
        /* UNEXPECTED_ERROR */
      );
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
}
{
  initFeatureFlags();
}
{
  const target = getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
exports.A = AdapterUniapp;
exports.B = defineComponent;
exports.C = onLaunch;
exports.D = onShow;
exports.E = ECB;
exports.F = onHide;
exports.G = createSSRApp;
exports.H = _export_sfc;
exports.I = unref;
exports.J = o;
exports.K = resolveComponent;
exports.L = p$1;
exports.M = f$1;
exports.N = reactive;
exports.O = sr;
exports.P = e;
exports.Q = s$1;
exports.R = t;
exports.S = n;
exports.T = shallowRef;
exports.U = UTF8;
exports._ = _;
exports.a = createAlovaMockAdapter;
exports.b = random;
exports.c = createI18n;
exports.d = defineMock;
exports.e = multiavatar$1;
exports.f = isString$1;
exports.g = startsWith;
exports.h = isEmpty;
exports.i = index;
exports.j = join;
exports.k = isObject$2;
exports.l = isNil;
exports.m = mockResponseHandler;
exports.n = createPinia;
exports.o = defineStore;
exports.p = ref;
exports.q = computed;
exports.r = requestAdapter;
exports.s = sampleSize;
exports.t = nextTick$1;
exports.u = useRequest;
exports.v = encUtf8Exports;
exports.w = pkcs7;
exports.x = aesExports;
exports.y = createAlova;
exports.z = assign$1;
//# sourceMappingURL=vendor.js.map
