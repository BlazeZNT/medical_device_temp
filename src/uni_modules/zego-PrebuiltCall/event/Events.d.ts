import { ZegoOnlySelfInRoomListener } from "@/uni_modules/zego-UIKitCore";
import { BackPressEvent } from "./BackPressEvent";
import { CallEvents } from "./CallEvents";
import { ErrorEventsListener } from "./ErrorEventsListener";
/**
 * 事件管理类，用于集中处理通话相关的事件设置。
 */
export declare class Events {
    callEvents: CallEvents;
    private errorEventsListener;
    /**
     * 设置返回按钮事件监听器。
     *
     * @deprecated 请使用`ZegoUIKitPrebuiltCallService.events.callEvents.setBackPressEvent()`代替。
     * @param backPressEvent 返回按钮事件监听器实例。
     */
    setBackPressEvent(backPressEvent: BackPressEvent): void;
    /**
     * 设置房间内仅剩自己时的监听器。
     *
     * @deprecated 请使用`ZegoUIKitPrebuiltCallService.events.callEvents.setOnlySelfInRoomListener()`代替。
     * @param onlySelfInRoomListener 房间内仅剩自己的监听器实例。
     */
    setOnlySelfInRoomListener(onlySelfInRoomListener: ZegoOnlySelfInRoomListener): void;
    /**
     * 获取错误事件监听器。
     *
     * @returns 错误事件监听器实例。
     */
    getErrorEventsListener(): ErrorEventsListener | null;
    /**
     * 设置错误事件监听器。
     *
     * @param errorEventsListener 新的错误事件监听器实例。
     */
    setErrorEventsListener(errorEventsListener: ErrorEventsListener | null): void;
}
