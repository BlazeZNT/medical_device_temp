import { CallEvents } from "./CallEvents";
/**
 * 事件管理类，用于集中处理通话相关的事件设置。
 */
export class Events {
    callEvents = new CallEvents(); // 通话事件实例
    // public invitationEvents = new InvitationEvents(); // 邀请事件实例，示例中已被注释
    errorEventsListener = null; // 错误事件监听器
    /**
     * 设置返回按钮事件监听器。
     *
     * @deprecated 请使用`ZegoUIKitPrebuiltCallService.events.callEvents.setBackPressEvent()`代替。
     * @param backPressEvent 返回按钮事件监听器实例。
     */
    setBackPressEvent(backPressEvent) {
        this.callEvents.setBackPressEvent(backPressEvent);
    }
    /**
     * 设置房间内仅剩自己时的监听器。
     *
     * @deprecated 请使用`ZegoUIKitPrebuiltCallService.events.callEvents.setOnlySelfInRoomListener()`代替。
     * @param onlySelfInRoomListener 房间内仅剩自己的监听器实例。
     */
    setOnlySelfInRoomListener(onlySelfInRoomListener) {
        this.callEvents.setOnlySelfInRoomListener(onlySelfInRoomListener);
    }
    /**
     * 获取错误事件监听器。
     *
     * @returns 错误事件监听器实例。
     */
    getErrorEventsListener() {
        return this.errorEventsListener;
    }
    /**
     * 设置错误事件监听器。
     *
     * @param errorEventsListener 新的错误事件监听器实例。
     */
    setErrorEventsListener(errorEventsListener) {
        this.errorEventsListener = errorEventsListener;
    }
}
