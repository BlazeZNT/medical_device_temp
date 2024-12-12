let isIos = false;
let isAndroid = false;
// #ifdef APP-PLUS
isIos = (plus.os.name == "iOS");
isAndroid = (plus.os.name == "Android");
// #endif
export default {
    isIos,
    isAndroid
};
