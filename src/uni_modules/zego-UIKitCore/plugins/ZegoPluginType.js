/**
 * 定义 Zego 插件类型枚举，用于区分不同的插件功能。
 */
export var ZegoPluginType;
(function (ZegoPluginType) {
    /**
     * 信号处理插件，用于消息传递和通知。
     */
    ZegoPluginType[ZegoPluginType["Signling"] = 0] = "Signling";
    /**
     * 呼叫界面插件，提供系统级的呼叫界面集成。
     */
    ZegoPluginType[ZegoPluginType["CallKit"] = 1] = "CallKit";
    /**
     * 美颜插件，用于视频美化功能。
     */
    // Beauty,
    /**
     * 白板插件，支持在线协作和内容共享。
     */
    // Whiteboard
})(ZegoPluginType || (ZegoPluginType = {}));
