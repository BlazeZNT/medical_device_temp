/// <reference types="@dcloudio/types" />
type PermissionConfig = {
    authorizedKey: keyof UniApp.GetAppAuthorizeSettingResult;
    permissionName: string;
    settings?: boolean;
    modalTitle?: string;
    modalContent?: string;
};
type Permission = 'Camera' | 'Microphone';
declare function ensureAndroidPermission(config: PermissionConfig): Promise<boolean>;
declare const _default: {
    AuthInfo: Record<Permission, PermissionConfig>;
    ensureAndroidPermission: typeof ensureAndroidPermission;
};
export default _default;
