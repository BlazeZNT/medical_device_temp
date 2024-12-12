import { ZegoOnlySelfInRoomListener } from "@/uni_modules/zego-UIKitCore";
import { ExpressEngineEventHandler } from "@/uni_modules/zego-UIKitCore";
import { BackPressEvent } from "./BackPressEvent";
import { CallEndListener } from "./CallEndListener";
/**
 * 通话事件管理类，负责设置和获取与通话相关的各种事件监听器。
 */
export declare class CallEvents {
    private expressEngineEventHandler;
    private backPressEvent;
    private onlySelfInRoomListener;
    private callEndListener;
    /**
     * 设置返回按钮事件监听器。
     * 默认行为是立即结束通话，可以通过覆盖此事件来改变默认行为。
     *
     * @param backPressEvent 返回按钮事件监听器实例。
     */
    setBackPressEvent(backPressEvent: BackPressEvent): void;
    /**
     * 获取返回按钮事件监听器。
     *
     * @returns 返回按钮事件监听器实例。
     */
    getBackPressEvent(): BackPressEvent | null;
    /**
     * 获取房间内仅剩自己时的监听器。
     *
     * @returns 房间内仅剩自己监听器实例。
     */
    getOnlySelfInRoomListener(): ZegoOnlySelfInRoomListener | null;
    /**
     * 设置房间内仅剩自己时的监听器。
     * 默认行为是立即结束通话，可以通过覆盖此事件来改变默认行为。
     *
     * @param onlySelfInRoomListener 房间内仅剩自己监听器实例。
     */
    setOnlySelfInRoomListener(onlySelfInRoomListener: ZegoOnlySelfInRoomListener): void;
    /**
     * 获取通话结束监听器。
     *
     * @returns 通话结束监听器实例。
     */
    getCallEndListener(): CallEndListener | null;
    /**
     * 设置通话结束监听器。
     *
     * @param callEndListener 通话结束监听器实例。
     */
    setCallEndListener(callEndListener: CallEndListener): void;
    /**
     * 设置引擎事件处理器。
     * 如果之前已有处理器，会先移除，然后添加新的处理器。
     *
     * @param eventHandler 引擎事件处理器实例。
     */
    setExpressEngineEventHandler(eventHandler: ExpressEngineEventHandler | null): void;
}
