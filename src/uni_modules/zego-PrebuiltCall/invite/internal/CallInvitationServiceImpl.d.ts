import { ZegoUIKitCallback, ZegoUIKitUser } from "@/uni_modules/zego-UIKitCore";
import { ZegoUIKitPrebuiltCallConfig } from "../../config/ZegoUIKitPrebuiltCallConfig";
import { ZegoUIKitPrebuiltCallInvitationConfig } from "../ZegoUIKitPrebuiltCallInvitationConfig";
import { CallState } from "./CallState";
import { CallStateListener } from "./CallStateListener";
import { ZegoCallInvitationData } from "./ZegoCallInvitationData";
import { ZegoUIKitPrebuiltCallConfigProvider } from "./ZegoUIKitPrebuiltCallConfigProvider";
import { ZegoDurationUpdateListener } from "../../config/defines";
export declare class CallInvitationServiceImpl {
    private static instance;
    private constructor();
    static getInstance(): CallInvitationServiceImpl;
    private callState;
    private callInvitationData;
    private callUserStates;
    private callStateListeners;
    private alreadyInit;
    private alreadyLogin;
    private inRoom;
    private appID;
    private appSign;
    private invitationConfig;
    private callConfig;
    private elapsedTime;
    private startTimeLocal;
    private updateListener?;
    private callResourceID?;
    private expressEventHandler;
    openCamera(open: boolean): void;
    openMicrophone(open: boolean): void;
    isMicrophoneOn(userID?: string): boolean;
    isCameraOn(userID?: string): boolean;
    getLocalUser(): ZegoUIKitUser | null;
    getCallInvitationData(): ZegoCallInvitationData | null;
    init(appID: number, appSign: string, token?: string): Promise<boolean>;
    setCallInvitationConfig(invitationConfig: ZegoUIKitPrebuiltCallInvitationConfig): void;
    getCallInvitationConfig(): ZegoUIKitPrebuiltCallInvitationConfig | null;
    setCallConfig(callConfig: ZegoUIKitPrebuiltCallConfig): void;
    getCallConfig(): ZegoUIKitPrebuiltCallConfig | null;
    endCallAndInvokeCallback(): void;
    /**
     * 登录用户到系统。
     *
     * @param userID 用户ID字符串。
     * @param userName 用户名字符串。
     *
     * 如果用户尚未登录（`alreadyLogin`为`false`），则尝试使用提供的用户ID和用户名登录。
     * 成功登录后，会尝试启用和注册推送通知服务。登录失败则重置登录状态。
     */
    loginUser(userID: string, userName: string): void;
    /**
     * 反初始化接收离线邀请的功能。
     * 清理与离线邀请相关的监听器、数据及状态，重置关键变量至初始状态。
     */
    unInitToReceiveOffline(): void;
    /**
     * 反初始化方法，用于清理通话相关的资源与状态。
     * 包括离开房间、结束通话、移除事件处理器、注销登录等操作。
     */
    unInit(): Promise<void>;
    /**
     * 获取ZegoUIKit预构建通话配置提供器。
     *
     * 如果`invitationConfig`为`null`，则返回`null`；否则，返回`invitationConfig`中的配置提供器。
     *
     * @returns ZegoUIKitPrebuiltCallConfigProvider实例或null。
     */
    getProvider(): ZegoUIKitPrebuiltCallConfigProvider | undefined;
    getCallState(): CallState;
    /**
     * 设置当前通话状态。
     *
     * @param callState 新的通话状态。
     *
     * 此方法首先记录当前通话状态，然后更新状态值。如果新的通话状态小于等于0，
     * 将清空邀请数据。通过日志记录状态变更前后的情况，并通知所有注册的通话状态监听器。
     */
    setCallState(callState: CallState): void;
    /**
     * 清理邀请数据。
     *
     * 将通话邀请数据设为`null`，并清空通话用户状态列表（如果已初始化）。
     */
    private clearInvitationData;
    addCallStateListener(callStateListener: CallStateListener): void;
    /**
     * 从通话状态监听器列表中移除指定的监听器。
     *
     * @param callStateListener 要移除的通话状态监听器实例。
     */
    removeCallStateListener(callStateListener: CallStateListener): void;
    /** 检查是否已在房间内 */
    isInRoom(): boolean;
    /** 开始房间内的计时 */
    private startTimeCount;
    /** 停止房间内的计时 */
    private stopRoomTimeCount;
    /** 设置时长更新的监听器 */
    setDurationUpdateListener(updateListener: ZegoDurationUpdateListener): void;
    getStartTimeLocal(): number;
    /**
     * 加入房间。
     *
     * @param roomID 房间ID字符串。
     * @param callback 加入房间操作的回调函数。
     */
    joinRoom(roomID: string, callback: ZegoUIKitCallback): void;
    /**
     * 离开房间。
     */
    leaveRoom(): Promise<void>;
    /**
     * 生成通话ID。
     *
     * @returns 生成的通话ID字符串。
     */
    private generateCallID;
}
