import ZegoUIKit, { DefaultExpressEventHandler, ZegoUIKitScenario } from "@/uni_modules/zego-UIKitCore";
import { ZegoCallEndReason } from "../../config/ZegoCallEndReason";
import { ErrorEventsListenerCodes } from "../../event/ErrorEventsListener";
import { ZegoUIKitPrebuiltCallService } from "../../services/ZegoUIKitPrebuiltCallService";
import { CallInvitationState } from "./CallInvitationState";
import { CallState } from "./CallState";
export class CallInvitationServiceImpl {
    static instance = null;
    constructor() {
        // constructor implementation
    }
    static getInstance() {
        if (CallInvitationServiceImpl.instance === null) {
            CallInvitationServiceImpl.instance = new CallInvitationServiceImpl();
        }
        return CallInvitationServiceImpl.instance;
    }
    callState = CallState.None;
    callInvitationData = null; // 确保ZegoCallInvitationData已被定义或引入
    callUserStates = new Map(); // 假设CallInvitationState已定义
    callStateListeners = []; // 确保CallStateListener已被定义或引入
    alreadyInit = false;
    alreadyLogin = false;
    inRoom = false;
    appID = 0;
    appSign = null;
    invitationConfig = null;
    callConfig = null;
    elapsedTime = 0;
    startTimeLocal = 0;
    updateListener;
    callResourceID;
    expressEventHandler = new DefaultExpressEventHandler({
        roomStateChanged(roomID, reason, errorCode, extendedData) {
            const callEndListener = ZegoUIKitPrebuiltCallService.events.callEvents.getCallEndListener();
            // if (reason == ZegoRoomStateChangedReason.KickOut) {
            //     CallInvitationServiceImpl.getInstance().leaveRoom();
            //     if (callEndListener != null) {
            //         callEndListener.onCallEnd(ZegoCallEndReason.KickOut);
            //     }
            // }
        },
        IMRecvCustomCommand(roomID, fromUser, command) {
            const localUser = ZegoUIKit.getLocalUser();
            if (!localUser) {
                return;
            }
            try {
                const jsonObject = JSON.parse(command);
                if ("zego_remove_user" in jsonObject) {
                    const userIDArray = jsonObject.zego_remove_user;
                    for (const userID of userIDArray) {
                        if (userID === localUser.userID) {
                            CallInvitationServiceImpl.getInstance().leaveRoom();
                            const callEndListener = ZegoUIKitPrebuiltCallService.events.callEvents.getCallEndListener();
                            if (callEndListener != null) {
                                callEndListener.onCallEnd(ZegoCallEndReason.KickOut, fromUser.userID);
                            }
                        }
                    }
                }
            }
            catch (e) {
                console.error('Error parsing command:', e);
            }
        },
    });
    openCamera(open) {
        ZegoUIKit.openCamera(open);
    }
    openMicrophone(open) {
        ZegoUIKit.openMicrophone(open);
    }
    isMicrophoneOn(userID) {
        if (userID) {
            return ZegoUIKit.isMicrophoneOn(userID);
        }
        const localUser = ZegoUIKit.getLocalUser();
        return localUser !== null && ZegoUIKit.isMicrophoneOn(localUser.userID);
    }
    isCameraOn(userID) {
        if (userID) {
            return ZegoUIKit.isCameraOn(userID);
        }
        else {
            const localUser = ZegoUIKit.getLocalUser();
            return localUser !== null && ZegoUIKit.isCameraOn(localUser.userID);
        }
    }
    getLocalUser() {
        return ZegoUIKit.getLocalUser() || null;
    }
    getCallInvitationData() {
        return this.callInvitationData || null;
    }
    async init(appID, appSign, token) {
        if (this.alreadyInit) {
            const errorEvents = ZegoUIKitPrebuiltCallService.events.getErrorEventsListener();
            if (errorEvents) {
                errorEvents.onError(ErrorEventsListenerCodes.INIT_ALREADY, "ZEGO Express Engine is already initialized, do not initialize again");
            }
            return true;
        }
        const result = await ZegoUIKit.init(appID, appSign, ZegoUIKitScenario.Default);
        if (result) {
            console.log(`Call init() called with:  appID = [${appID}], appSign.isEmpty() = [${!appSign}], token.isEmpty() = [${!token}]`);
            this.alreadyInit = true;
            this.appID = appID;
            this.appSign = appSign;
            // MMKV.initialize(application);
            if (token) {
                ZegoUIKit.renewToken(token);
            }
            ZegoUIKit.addEventHandler(this.expressEventHandler, false);
            // ZegoUIKit.getSignalingPlugin().addInvitationListener(invitationListener);
            // this.registerLifeCycleCallback(application);
            // ZegoSignalingPlugin.getInstance().registerZIMEventHandler(zimEventHandler);
        }
        else {
            const errorEvents = ZegoUIKitPrebuiltCallService.events.getErrorEventsListener();
            if (errorEvents) {
                errorEvents.onError(ErrorEventsListenerCodes.INIT_PARAM_ERROR, "Create engine error, please check if your AppID and AppSign is correct");
            }
        }
        return result;
    }
    setCallInvitationConfig(invitationConfig) {
        if (this.invitationConfig == null) {
            this.invitationConfig = invitationConfig;
            // initRingtoneManager(application, invitationConfig);
            // offline channel need ringtone
            // callNotificationManager.createCallNotificationChannel(application);
        }
        else {
            this.invitationConfig = invitationConfig;
        }
    }
    getCallInvitationConfig() {
        return this.invitationConfig;
    }
    setCallConfig(callConfig) {
        this.callConfig = callConfig;
    }
    getCallConfig() {
        return this.callConfig;
    }
    endCallAndInvokeCallback() {
        const callEndListener = ZegoUIKitPrebuiltCallService.events.callEvents.getCallEndListener();
        if (callEndListener) {
            callEndListener.onCallEnd(ZegoCallEndReason.LocalHangup);
        }
        // if (zegoUIKitPrebuiltCallFragment != null) {
        //     zegoUIKitPrebuiltCallFragment.endCall();
        //     zegoUIKitPrebuiltCallFragment = null;
        // }
        CallInvitationServiceImpl.getInstance().leaveRoom();
    }
    /**
     * 登录用户到系统。
     *
     * @param userID 用户ID字符串。
     * @param userName 用户名字符串。
     *
     * 如果用户尚未登录（`alreadyLogin`为`false`），则尝试使用提供的用户ID和用户名登录。
     * 成功登录后，会尝试启用和注册推送通知服务。登录失败则重置登录状态。
     */
    loginUser(userID, userName) {
        console.log(`loginUser() 被调用，参数：userID = [${userID}]，userName = [${userName}]，当前登录状态：${this.alreadyLogin}`);
        if (this.alreadyLogin) {
            return;
        }
        this.alreadyLogin = true;
        // 使用ZegoUIKit登录
        ZegoUIKit.login(userID, userName);
        // 登录到ZegoUIKit的信号插件部分，并提供回调处理登录结果
        // ZegoUIKit.getSignalingPlugin().login(userID, userName, {
        //     onResult(errorCode: number, message: string) {
        //         console.log(`登录回调：errorCode = [${errorCode}]，message = [${message}]`);
        //         if (errorCode === 0) {
        //             // 登录成功，检查并启用其他推送服务（例如FCM）
        //             if (!this.isOtherPushEnable()) {
        //                 this.enableFCMPush();
        //             }
        //             this.registerPush();
        //         } else {
        //             // 登录失败，重置登录状态
        //             this.alreadyLogin = false;
        //         }
        //     }
        // });
        //         MMKV mmkv = MMKV.defaultMMKV(MMKV.SINGLE_PROCESS_MODE, getClass().getName());
        // mmkv.putString("userID", userID);
        // mmkv.putString("userName", userName);
    }
    /**
     * 反初始化接收离线邀请的功能。
     * 清理与离线邀请相关的监听器、数据及状态，重置关键变量至初始状态。
     */
    unInitToReceiveOffline() {
        console.log("unInitToReceiveOffline() 被调用"); // 替换原生日志记录为console.log
        // 移除邀请监听器并销毁信号插件实例
        // ZegoUIKit.getSignalingPlugin().removeInvitationListener(this.invitationListener);
        // ZegoUIKit.getSignalingPlugin().destroy();
        // 设置通话状态为无（NONE），具体状态类型需根据实际情况定义
        this.setCallState(CallState.None);
        // 清理邀请数据和推送消息
        this.clearInvitationData();
        // this.clearPushMessage();
        // 清空通话状态监听器列表（如果已初始化）
        this.callStateListeners.length = 0;
        // 释放预建通话片段的引用
        // this.zegoUIKitPrebuiltCallFragment = null;
        // 重置关键状态标识
        this.alreadyInit = false;
        this.alreadyLogin = false;
        this.inRoom = false;
        // 重置应用ID、签名、配置等
        this.appID = 0;
        this.appSign = null;
        this.invitationConfig = null;
        this.callConfig = null;
        // 重置计时相关变量
        this.elapsedTime = 0;
        this.startTimeLocal = 0;
    }
    /**
     * 反初始化方法，用于清理通话相关的资源与状态。
     * 包括离开房间、结束通话、移除事件处理器、注销登录等操作。
     */
    async unInit() {
        console.log("unInit() 被调用");
        await this.leaveRoom();
        //     // 获取预建通话片段实例，如果存在则结束通话
        //     const callFragment = ZegoUIKitPrebuiltCallService.getPrebuiltCallFragment();
        //     if(callFragment !== null) {
        //     callFragment.endCall();
        // }
        // 移除expressEventHandler的事件处理
        ZegoUIKit.removeEventHandler(this.expressEventHandler);
        // 注销ZIM事件处理器
        // const zimEventHandler = ZegoSignalingPlugin.getInstance().unregisterZIMEventHandler(this.zimEventHandler);
        // 如果邀请配置存在，登出ZegoUIKit及Signaling插件
        if (this.invitationConfig !== null) {
            ZegoUIKit.logout();
            // ZegoUIKit.getSignalingPlugin().logout();
        }
        // 处理离线接收的反初始化
        this.unInitToReceiveOffline();
        ZegoUIKit.unInit();
    }
    /**
     * 获取ZegoUIKit预构建通话配置提供器。
     *
     * 如果`invitationConfig`为`null`，则返回`null`；否则，返回`invitationConfig`中的配置提供器。
     *
     * @returns ZegoUIKitPrebuiltCallConfigProvider实例或null。
     */
    getProvider() {
        return this.invitationConfig?.provider;
    }
    getCallState() {
        return this.callState;
    }
    /**
     * 设置当前通话状态。
     *
     * @param callState 新的通话状态。
     *
     * 此方法首先记录当前通话状态，然后更新状态值。如果新的通话状态小于等于0，
     * 将清空邀请数据。通过日志记录状态变更前后的情况，并通知所有注册的通话状态监听器。
     */
    setCallState(callState) {
        const before = this.callState; // 记录变更前的通话状态
        this.callState = callState; // 更新通话状态
        // 如果通话状态变为非活动状态（例如小于等于0），清除邀请数据
        if (callState <= 0) {
            this.clearInvitationData();
        }
        console.log(`setCallState() 被调用，变更前状态：[${before}]，变更后状态：[${callState}]`);
        // 检查状态是否有变更且监听器列表不为空，则遍历并通知所有监听器
        if (before !== callState && this.callStateListeners !== null) {
            for (const listener of this.callStateListeners) {
                listener.onStateChanged(before, callState);
            }
        }
    }
    /**
     * 清理邀请数据。
     *
     * 将通话邀请数据设为`null`，并清空通话用户状态列表（如果已初始化）。
     */
    clearInvitationData() {
        this.callInvitationData = null; // 将通话邀请数据设为null，表示清除
        // 如果通话用户状态列表已初始化，则清空它
        if (this.callUserStates !== null) {
            this.callUserStates.clear();
        }
    }
    addCallStateListener(callStateListener) {
        this.callStateListeners.push(callStateListener);
    }
    /**
     * 从通话状态监听器列表中移除指定的监听器。
     *
     * @param callStateListener 要移除的通话状态监听器实例。
     */
    removeCallStateListener(callStateListener) {
        // 从通话状态监听器列表中移除指定的监听器
        this.callStateListeners = this.callStateListeners.filter(listener => listener !== callStateListener);
    }
    /** 检查是否已在房间内 */
    isInRoom() {
        return this.inRoom;
    }
    /** 开始房间内的计时 */
    startTimeCount() {
        this.startTimeLocal = Date.now(); // 使用Date.now()获取当前时间戳
        // this.handler.post(this.checkTimeRunnable); // 假设handler和checkTimeRunnable已正确定义
    }
    /** 停止房间内的计时 */
    stopRoomTimeCount() {
        // this.handler.removeCallbacks(this.checkTimeRunnable); // 移除计划的任务
    }
    /** 设置时长更新的监听器 */
    setDurationUpdateListener(updateListener) {
        this.updateListener = updateListener; // 保存传入的监听器实例
    }
    // public void parsePayload() {
    //     try {
    //         JSONObject jsonObject = new JSONObject(pushMessage.payLoad);
    //         ZegoCallInvitationData invitationData;
    //         if (jsonObject.has("data")) {
    //             invitationData = ZegoCallInvitationData.parseString(getStringFromJson(jsonObject, "data"));
    //             if (jsonObject.has("type")) {
    //                 int type = jsonObject.getInt("type");
    //                 invitationData.type = type;
    //             }
    //             if (jsonObject.has("inviter_name")) {
    //                 String inviter_name = jsonObject.getString("inviter_name");
    //                 invitationData.inviter = new ZegoUIKitUser(inviter_name, inviter_name);
    //             }
    //             invitationData.invitationID = pushMessage.invitationID;
    //             callInvitationData = invitationData;
    //         }
    //     } catch (JSONException e) {
    //         throw new RuntimeException(e);
    //     }
    // }
    getStartTimeLocal() {
        return this.startTimeLocal;
    }
    /**
     * 加入房间。
     *
     * @param roomID 房间ID字符串。
     * @param callback 加入房间操作的回调函数。
     */
    joinRoom(roomID, callback) {
        ZegoUIKit.joinRoom(roomID, false, (errorCode) => {
            // 根据错误码判断是否成功加入房间
            this.inRoom = errorCode === 0;
            if (this.inRoom) {
                // 若成功加入房间，开始计时并清理推送消息
                this.startTimeCount();
                // this.clearPushMessage();
            }
            // 如果外部传入了回调函数，则调用该回调函数并传递错误码
            if (callback) {
                callback(errorCode);
            }
        });
    }
    /**
     * 离开房间。
     */
    async leaveRoom() {
        console.log("leaveRoom() 被调用，已初始化状态：", this.alreadyInit, "，通话状态：", this.callState); // 类似于Timber的日志输出
        if (this.alreadyInit) {
            if (this.callState === CallState.Outgoing) {
                if (this.callInvitationData !== null) {
                    const waitedUserIDs = []; // 初始化等待用户的ID列表
                    for (const invitee of this.callInvitationData.invitees) {
                        if (this.callUserStates.get(invitee) === CallInvitationState.Waiting) {
                            waitedUserIDs.push(invitee.userID);
                        }
                    }
                    // !important
                    // if (waitedUserIDs.length > 0) {
                    //     CallInvitationServiceImpl.getInstance().cancelInvitation(waitedUserIDs, null);
                    // }
                }
            }
        }
        if (this.getCallState() > 0) {
            this.setCallState(CallState.None);
        }
        this.clearInvitationData();
        this.inRoom = false;
        this.stopRoomTimeCount();
        this.updateListener = null;
        // this.clearPushMessage();
        await ZegoUIKit.leaveRoom();
    }
    /**
     * 生成通话ID。
     *
     * @returns 生成的通话ID字符串。
     */
    generateCallID() {
        let callID = null;
        const userID = ZegoUIKit.getLocalUser()?.userID;
        if (userID !== null) {
            // 构造通话ID格式为 "call_{userID}_{当前时间戳}"
            callID = `call_${userID}_${Date.now()}`;
        }
        return callID;
    }
}
