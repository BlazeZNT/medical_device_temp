import { ZegoCallEndReason } from "../config/ZegoCallEndReason";
/**
 * 通话结束监听器接口。
 */
export interface CallEndListener {
    /**
     * 当通话结束时被调用的回调函数。
     *
     * @param callEndReason 结束原因，具体原因参考{@link ZegoCallEndReason}枚举。
     * @param jsonObject   当结束原因是KICK_OUT时，此值表示谁将您踢出了通话。
     *                     如果值为空，表示您被服务器踢出。
     */
    onCallEnd(callEndReason: ZegoCallEndReason, jsonObject?: string): void;
}
