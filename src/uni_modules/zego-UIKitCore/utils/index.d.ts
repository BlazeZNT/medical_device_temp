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
export declare function makeStreamID(roomID: string, userID: string, channel?: string): string;
export declare function makeListenerID(): string;
/**
 * 辅助函数：合并默认配置和用户配置
 * @param defaultConfig
 * @param userConfig
 * @returns
 */
export declare function mergeConfigs<T>(defaultConfig: T, userConfig: Partial<T> | null | undefined): T;
