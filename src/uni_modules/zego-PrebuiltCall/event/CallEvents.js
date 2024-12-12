import ZegoUIKit from "@/uni_modules/zego-UIKitCore";
// import { ZegoMenuBarButtonClickListener } from "./ZegoMenuBarButtonClickListener";
/**
 * 通话事件管理类，负责设置和获取与通话相关的各种事件监听器。
 */
export class CallEvents {
    expressEngineEventHandler = null;
    backPressEvent = null;
    onlySelfInRoomListener = null;
    callEndListener = null;
    // private buttonClickListener: ZegoMenuBarButtonClickListener | null = null;
    /**
     * 设置返回按钮事件监听器。
     * 默认行为是立即结束通话，可以通过覆盖此事件来改变默认行为。
     *
     * @param backPressEvent 返回按钮事件监听器实例。
     */
    setBackPressEvent(backPressEvent) {
        this.backPressEvent = backPressEvent;
    }
    /**
     * 获取返回按钮事件监听器。
     *
     * @returns 返回按钮事件监听器实例。
     */
    getBackPressEvent() {
        return this.backPressEvent;
    }
    /**
     * 获取房间内仅剩自己时的监听器。
     *
     * @returns 房间内仅剩自己监听器实例。
     */
    getOnlySelfInRoomListener() {
        return this.onlySelfInRoomListener;
    }
    /**
     * 设置房间内仅剩自己时的监听器。
     * 默认行为是立即结束通话，可以通过覆盖此事件来改变默认行为。
     *
     * @param onlySelfInRoomListener 房间内仅剩自己监听器实例。
     */
    setOnlySelfInRoomListener(onlySelfInRoomListener) {
        this.onlySelfInRoomListener = onlySelfInRoomListener;
    }
    /**
     * 获取通话结束监听器。
     *
     * @returns 通话结束监听器实例。
     */
    getCallEndListener() {
        return this.callEndListener;
    }
    /**
     * 设置通话结束监听器。
     *
     * @param callEndListener 通话结束监听器实例。
     */
    setCallEndListener(callEndListener) {
        this.callEndListener = callEndListener;
    }
    /**
     * 设置引擎事件处理器。
     * 如果之前已有处理器，会先移除，然后添加新的处理器。
     *
     * @param eventHandler 引擎事件处理器实例。
     */
    setExpressEngineEventHandler(eventHandler) {
        if (this.expressEngineEventHandler !== null) {
            ZegoUIKit.removeEventHandler(this.expressEngineEventHandler);
        }
        this.expressEngineEventHandler = eventHandler;
        if (eventHandler !== null) {
            ZegoUIKit.addEventHandler(eventHandler);
        }
    }
}
