import { gotoAppPermissionSetting, requestAndroidPermission } from "@/uni_modules/zego-UIKitCore/utils/permission";
import { t } from "../lang";
function getMajorVersion(versionStr) {
    // 首先尝试将整个字符串转换为整数
    const majorVersion = parseInt(versionStr, 10);
    // 如果转换成功并且是一个有效的整数，则返回
    if (!isNaN(majorVersion)) {
        return majorVersion;
    }
    // 使用正则表达式匹配主版本号
    const match = versionStr.match(/^(\d+)\./);
    if (match && match[1]) {
        // 转换匹配到的第一个数字为整数并返回
        return parseInt(match[1], 10);
    }
    // 如果没有找到匹配项，则返回0
    return 0;
}
const AuthInfo = {
    Camera: {
        authorizedKey: 'cameraAuthorized',
        permissionName: 'android.permission.CAMERA',
        settings: true,
        modalContent: t("AuthConfirmation.cameraDeny")
    },
    Microphone: {
        authorizedKey: 'microphoneAuthorized',
        permissionName: 'android.permission.RECORD_AUDIO',
        settings: true,
        modalContent: t("AuthConfirmation.microphoneDeny")
    }
};
async function ensureAndroidPermission(config) {
    const appAuthorizeSetting = uni.getAppAuthorizeSetting();
    let isAuthorized = appAuthorizeSetting[config.authorizedKey] === 'authorized';
    // const isDenied = appAuthorizeSetting[config.authorizedKey] === 'denied';
    if (isAuthorized) {
        // 已经有权限
        return true;
    }
    const result = await requestAndroidPermission(config.permissionName);
    if (result.code === 1) { // 通过授权
        // 但是这里有坑, 低端机, 比如 android 6, 不会有弹窗, 且会直接告诉你授权通过了, 这里要再确认一下
        // https://project.feishu.cn/uikit/issue/detail/4876382986
        const appAuthorizeSetting = uni.getAppAuthorizeSetting();
        isAuthorized = appAuthorizeSetting[config.authorizedKey] === 'authorized';
        if (isAuthorized) {
            // 是真的授权了
            return true;
        }
        // 假授权, 需要跳转到设置页
        // run over
    }
    // 其他情况, 跳转到设置页
    if (config.settings) {
        const { modalTitle = t("AuthConfirmation.permissionTitle"), modalContent = "" } = config;
        const { confirm } = await uni.showModal({
            title: modalTitle,
            content: modalContent,
            showCancel: true,
            confirmText: t("AuthConfirmation.confirmButton")
        });
        if (confirm) {
            // 确认要跳转
            gotoAppPermissionSetting();
        }
    }
    // 不管调不跳转, 这次的权限申请都是失败了
    return false;
}
export default {
    AuthInfo,
    ensureAndroidPermission,
};
