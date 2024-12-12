export * from "./logger";
export * as Types from "./types";
import Platform from "./platform";
export { Platform };
/**
 * 生成推流ID
 * @param roomID
 * @param userID
 * @param channel
 * @returns
 */
export function makeStreamID(roomID, userID, channel = 'main') {
    return `${roomID}_${userID}_${channel}`;
}
let listenerSeed = 0;
export function makeListenerID() {
    return `listener_${Date.now()}_${listenerSeed++}`;
}
// 深度合并函数
function mergeDeep(target, source) {
    for (const key in source) {
        if (source[key] instanceof Object && key in target) {
            Object.assign(source[key], mergeDeep(target[key], source[key]));
        }
    }
    return Object.assign({}, target, source);
}
/**
 * 辅助函数：合并默认配置和用户配置
 * @param defaultConfig
 * @param userConfig
 * @returns
 */
export function mergeConfigs(defaultConfig, userConfig) {
    // 如果用户配置为 null 或 undefined，则直接返回默认配置
    if (!userConfig) {
        return defaultConfig;
    }
    // 使用深度合并函数合并默认配置和用户配置
    return mergeDeep(defaultConfig, userConfig);
}
