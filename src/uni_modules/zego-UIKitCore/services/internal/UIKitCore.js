import { ZegoAudioRoute, ZegoPublishChannel, ZegoUpdateType, ZegoUser, ZegoPublisherState, ZegoRemoteDeviceState, ZegoDeviceType, ZegoRoomStateChangedReason, } from "../express/ZegoExpressUniApp";
import { ExpressEngineProxy } from '../express/ExpressEngineProxy';
import ZegoExpressEngine from "../express/ZegoExpressUniApp";
import { zlogerror, zloginfo, zlogwarning } from '../../utils/logger';
import TextUtils from '../../utils/TextUtils';
import RoomService from './RoomService';
import UserService from './UserService';
import { UIKitCoreUser } from './UIKitCoreUser';
import { ZegoAudioVideoResourceMode, ZegoInRoomMessageState } from '../defines';
import ZegoUIKit from '../../ZegoUIKit';
import { MessageService } from './MessageService';
import { AudioVideoService } from './AudioVideoService';
import { DefaultExpressEventHandler } from '../express/DefaultExpressEventHandler';
import { EventHandlerList } from '../express/EventHandlerList';
const TAG = '[UIKitCore]';
/**
 * for internal use,DO NOT call it directly.
 */
export default class UIKitCore {
    static instance = null;
    constructor() {
        // constructor implementation
    }
    static getInstance() {
        if (UIKitCore.instance === null) {
            UIKitCore.instance = new UIKitCore();
        }
        return UIKitCore.instance;
    }
    roomService = new RoomService();
    userService = new UserService();
    audioVideoService = new AudioVideoService();
    messageService = new MessageService();
    localUser = null;
    zegoUIKitRoom = { roomID: "" };
    isFrontFacing = true;
    enableAudioVideoAutoPlaying = true;
    remoteUserList = [];
    inRoomMessages = [];
    roomExtraInfoMap = new Map();
    isLargeRoom = false;
    markAsLargeRoom = false;
    roomMemberCount = 0;
    lastNotifyTokenTime = 0;
    isUIKitInited = false;
    token = '';
    tokenExpireListener = null;
    resourceMode = ZegoAudioVideoResourceMode.Default;
    eventHandlerList = new EventHandlerList();
    // ! 未实现
    // private signalingPlugin: ZegoUIKitSignalingPluginImpl = new ZegoUIKitSignalingPluginImpl();
    initEventHandler = new DefaultExpressEventHandler({
        roomUserUpdate(roomID, updateType, userList) {
            zloginfo(`${TAG} roomUserUpdate: ${roomID} ${updateType} ${userList}`);
            const that = UIKitCore.getInstance();
            const userInfoList = userList.map((user) => {
                return new UIKitCoreUser(user.userID, user.userName);
            });
            if (updateType == ZegoUpdateType.Add) {
                for (const uiKitCoreUser of userInfoList) {
                    if (!that.containsUser(uiKitCoreUser)) {
                        that.remoteUserList.push(uiKitCoreUser);
                    }
                }
                that.roomMemberCount += userList.length;
                if (that.roomMemberCount > 500) {
                    that.isLargeRoom = true;
                }
                that.dispatchUserJoin(userInfoList);
            }
            else {
                for (const uiKitCoreUser of userInfoList) {
                    that.removeUser(uiKitCoreUser);
                }
                that.roomMemberCount -= userList.length;
                that.dispatchUserLeave(userInfoList);
                if (that.remoteUserList.length === 0) {
                    that.dispatchOnlySelfInRoom();
                }
            }
            that.dispatchRoomUserCountOrPropertyChanged(that.getAllUsers());
        },
        roomStreamUpdate(roomID, updateType, streamList, extendedData) {
            zloginfo(TAG, 'roomStreamUpdate', roomID, updateType, JSON.stringify(streamList), extendedData);
            const that = UIKitCore.getInstance();
            if (updateType == ZegoUpdateType.Add) {
                for (const zegoStream of streamList) {
                    const uiKitUser = that.getUserByUserID(zegoStream.user.userID);
                    if (uiKitUser) {
                        uiKitUser.setStreamID(zegoStream.streamID);
                        // zlogerror(TAG, 'add user=', JSON.stringify(uiKitUser))
                    }
                    else {
                        const user = UIKitCoreUser.createFromStream(zegoStream);
                        that.remoteUserList.push(user);
                        // zlogerror(TAG, 'add user=', JSON.stringify(user))
                    }
                    if (zegoStream.streamID.includes("main")) {
                        if (!that.resourceMode) {
                            zloginfo(TAG, 'roomStreamUpdate', 'startPlayingStream', zegoStream.streamID);
                            ExpressEngineProxy.startPlayingStream(zegoStream.streamID);
                        }
                        else {
                            const config = { resourceMode: that.resourceMode };
                            ExpressEngineProxy.startPlayingStream(zegoStream.streamID, config);
                        }
                    }
                }
            }
            if (updateType == ZegoUpdateType.Delete) {
                for (const zegoStream of streamList) {
                    const uiKitUser = that.getUserByUserID(zegoStream.user.userID);
                    if (uiKitUser) {
                        uiKitUser.deleteStream(zegoStream.streamID);
                        if (zegoStream.streamID.includes("main")) {
                            if (uiKitUser.isCameraOn || uiKitUser.isMicrophoneOn) {
                                if (uiKitUser.isCameraOn) {
                                    uiKitUser.isCameraOn = false;
                                    that.dispatchRemoteCameraStateUpdate(uiKitUser, false);
                                }
                                if (uiKitUser.isMicrophoneOn) {
                                    uiKitUser.isMicrophoneOn = false;
                                    that.dispatchRemoteMicStateUpdate(uiKitUser, false);
                                }
                            }
                            uiKitUser.soundLevel = 0;
                        }
                        that.dispatchRoomUserCountOrPropertyChanged(that.getAllUsers());
                    }
                    ExpressEngineProxy.stopPlayingStream(zegoStream.streamID);
                }
            }
            that.dispatchStreamUpdate(roomID, updateType, streamList, extendedData);
            if (updateType == ZegoUpdateType.Add) {
                this.roomStreamExtraInfoUpdate?.(roomID, streamList);
            }
        },
        publisherStateUpdate(streamID, state, errorCode, extendedData) {
            zloginfo(TAG, "publisherStateUpdate", streamID, state, errorCode, extendedData);
            const that = UIKitCore.getInstance();
            if (state == ZegoPublisherState.Publishing) {
                const streamList = [];
                if (that.localUser != null) {
                    that.localUser.setStreamID(streamID);
                    const zegoStream = {
                        user: new ZegoUser(that.localUser.userID, that.localUser.userName),
                        streamID,
                        extraInfo: ""
                    };
                    streamList.push(zegoStream);
                }
                that.dispatchStreamUpdate(that.getRoom().roomID, ZegoUpdateType.Add, streamList, extendedData);
            }
            else if (state == ZegoPublisherState.NoPublish) {
                const streamList = [];
                if (that.localUser != null) {
                    const zegoStream = {
                        user: new ZegoUser(that.localUser.userID, that.localUser.userName),
                        streamID,
                        extraInfo: ""
                    };
                    streamList.push(zegoStream);
                    that.localUser.deleteStream(zegoStream.streamID);
                }
                that.dispatchStreamUpdate(that.getRoom().roomID, ZegoUpdateType.Delete, streamList, extendedData);
            }
        },
        publisherQualityUpdate(streamID, quality) {
            zloginfo(TAG, "publisherQualityUpdate", streamID, quality);
        },
        playerStateUpdate(streamID, state, errorCode, extendedData) {
            zloginfo(TAG, "playerStateUpdate", streamID, state, errorCode, extendedData);
        },
        playerQualityUpdate(streamID, quality) {
            zloginfo(TAG, "playerQualityUpdate", streamID, quality);
        },
        roomStateChanged(roomID, reason, errorCode, extendedData) {
            zloginfo(`${TAG} roomStateChanged: reason=${reason}`);
            const that = UIKitCore.getInstance();
            that.dispatchRoomStateUpdate(roomID, reason, errorCode, extendedData);
            if (reason == ZegoRoomStateChangedReason.KickOut) {
                that.userService.notifyRemovedFromRoomCommand();
            }
        },
        localDeviceExceptionOccurred(exceptionType, deviceType, deviceID) {
            zlogerror(`${TAG} localDeviceExceptionOccurred: ${exceptionType}`);
            const that = UIKitCore.getInstance();
            const localCoreUser = that.getLocalCoreUser();
            if (localCoreUser != null) {
                if (deviceType == ZegoDeviceType.Camera) {
                    if (localCoreUser.isCameraOn) {
                        that.turnCameraOn(localCoreUser.userID, false);
                        that.dispatchRoomUserCountOrPropertyChanged(that.getAllUsers());
                    }
                }
                else if (deviceType == ZegoDeviceType.Microphone) {
                    if (localCoreUser.isMicrophoneOn) {
                        that.turnMicrophoneOn(localCoreUser.userID, false);
                        that.dispatchRoomUserCountOrPropertyChanged(that.getAllUsers());
                    }
                }
            }
        },
        remoteCameraStateUpdate(streamID, state) {
            zloginfo(`${TAG} remoteCameraStateUpdate: ${state}`);
            // 若不支持获取状态，则不进行改动（采用流额外信息的状态）
            if (state === ZegoRemoteDeviceState.NotSupport)
                return;
            const that = UIKitCore.getInstance();
            const coreUser = that.getUserFromStreamID(streamID);
            if (coreUser) {
                const open = state == ZegoRemoteDeviceState.Open;
                coreUser.isCameraOn = open;
                that.dispatchRemoteCameraStateUpdate(coreUser, open);
                that.dispatchRoomUserCountOrPropertyChanged(that.getAllUsers());
            }
        },
        remoteMicStateUpdate(streamID, state) {
            zloginfo(`${TAG} remoteMicStateUpdate: ${state}`);
            const that = UIKitCore.getInstance();
            const coreUser = that.getUserFromStreamID(streamID);
            if (coreUser) {
                const open = state == ZegoRemoteDeviceState.Open;
                zloginfo(`${TAG} remoteMicStateUpdate from ${coreUser.isMicrophoneOn} to ${open}, has change=${coreUser.isMicrophoneOn !== open}`);
                coreUser.isMicrophoneOn = open;
                that.dispatchRemoteMicStateUpdate(coreUser, open);
                that.dispatchRoomUserCountOrPropertyChanged(that.getAllUsers());
            }
        },
        audioRouteChange(audioRoute) {
            zloginfo(`${TAG} audioRouteChange: ${audioRoute}`);
            const that = UIKitCore.getInstance();
            that.audioVideoService.notifyAudioRouteChange(audioRoute);
        },
        remoteSoundLevelUpdate(soundLevelInfos) {
            // zloginfo(`${TAG} remoteSoundLevelUpdate: ${JSON.stringify(soundLevelInfos)}`)
            const that = UIKitCore.getInstance();
            for (const [streamID, soundLevelInfo] of Object.entries(soundLevelInfos)) {
                const coreUser = that.getUserFromStreamID(streamID);
                if (coreUser) {
                    coreUser.soundLevel = soundLevelInfo.soundLevel ?? 0;
                    that.dispatchSoundLevelUpdate(coreUser.userID, coreUser.soundLevel);
                }
            }
        },
        capturedSoundLevelInfoUpdate(soundLevelInfo) {
            // zloginfo(`${TAG} capturedSoundLevelInfoUpdate: ${soundLevelInfo}`)
            const that = UIKitCore.getInstance();
            if (that.localUser != null) {
                that.localUser.soundLevel = soundLevelInfo.soundLevel;
                that.dispatchSoundLevelUpdate(that.localUser.userID, that.localUser.soundLevel);
            }
        },
        IMRecvCustomCommand(roomID, fromUser, command) {
            zloginfo(`${TAG} IMRecvCustomCommand: ${roomID} ${fromUser} ${command}`);
            const that = UIKitCore.getInstance();
            that.roomService.notifyIMRecvCustomCommand(roomID, fromUser, command);
            const localUser = that.getLocalCoreUser();
            if (!localUser) {
                zlogerror(`${TAG} [IMRecvCustomCommand] wrong! localUser is null!`);
                return;
            }
            try {
                const commandObj = JSON.parse(command);
                if ("zego_remove_user" in commandObj) {
                    const userList = commandObj.zego_remove_user;
                    for (const userID of userList) {
                        if (userID === localUser.userID) {
                            that.notifyRemovedFromRoomCommand();
                            that.leaveRoom();
                            break;
                        }
                    }
                }
                else if ("zego_turn_camera_on" in commandObj) {
                    const userList = commandObj.zego_turn_camera_on;
                    for (const userID of userList) {
                        if (userID === localUser.userID && !that.isCameraOn(userID)) {
                            that.notifyTurnCameraOnCommand({ userID: fromUser.userID, userName: fromUser.userName });
                            break;
                        }
                    }
                }
                else if ("zego_turn_microphone_on" in commandObj) {
                    const userList = commandObj.zego_turn_microphone_on;
                    for (const userID of userList) {
                        if (userID === localUser.userID && !that.isMicrophoneOn(userID)) {
                            that.notifyTurnMicrophoneOnCommand({ userID: fromUser.userID, userName: fromUser.userName });
                            break;
                        }
                    }
                }
                else if ("zego_turn_camera_off" in commandObj) {
                    const userList = commandObj.zego_turn_camera_off;
                    for (const userID of userList) {
                        if (userID === localUser.userID) {
                            that.turnCameraOn(userID, false);
                            that.notifyTurnCameraOffCommand({ userID: fromUser.userID, userName: fromUser.userName });
                            break;
                        }
                    }
                }
                else if ("zego_turn_microphone_off" in commandObj) {
                    const userList = commandObj.zego_turn_microphone_off;
                    for (const userID of userList) {
                        if (userID === localUser.userID) {
                            that.turnMicrophoneOn(userID, false);
                            that.notifyTurnMicrophoneOffCommand({ userID: fromUser.userID, userName: fromUser.userName });
                            break;
                        }
                    }
                }
            }
            catch (e) {
                console.error('Error parsing command:', e);
            }
        },
        IMRecvBroadcastMessage(roomID, messageList) {
            zloginfo(`${TAG} IMRecvBroadcastMessage: ${roomID} ${messageList}`);
            const that = UIKitCore.getInstance();
            const list = messageList.map((zegoBroadcastMessageInfo) => {
                const { userID, userName } = zegoBroadcastMessageInfo.fromUser;
                const user = { userID, userName };
                return {
                    message: zegoBroadcastMessageInfo.message,
                    messageID: zegoBroadcastMessageInfo.messageID,
                    timestamp: zegoBroadcastMessageInfo.sendTime,
                    state: ZegoInRoomMessageState.Idle,
                    user,
                };
            });
            that.inRoomMessages.push(...list);
            that.dispatchBroadcastMessages(roomID, list);
        },
        roomStreamExtraInfoUpdate(roomID, streamList) {
            zloginfo(`${TAG} roomStreamExtraInfoUpdate: ${roomID} ${JSON.stringify(streamList)}`);
            const that = UIKitCore.getInstance();
            for (const zegoStream of streamList) {
                let extraInfoObj = {};
                if (zegoStream.extraInfo) {
                    try {
                        extraInfoObj = JSON.parse(zegoStream.extraInfo);
                    }
                    catch (e) {
                        zlogerror('Error parsing extraInfo or updating user state:', e);
                    }
                }
                let coreUser = that.getUserByUserID(zegoStream.user.userID);
                if (!coreUser) {
                    coreUser = new UIKitCoreUser(zegoStream.user.userID, zegoStream.user.userName);
                }
                if ('isCameraOn' in extraInfoObj) {
                    const isCameraOn = extraInfoObj.isCameraOn;
                    if (coreUser.isCameraOn !== isCameraOn) {
                        coreUser.isCameraOn = isCameraOn;
                        that.dispatchRemoteCameraStateUpdate(coreUser, coreUser.isCameraOn);
                        that.dispatchRoomUserCountOrPropertyChanged(that.getAllUsers());
                    }
                }
                if ('isMicrophoneOn' in extraInfoObj) {
                    const isMicrophoneOn = extraInfoObj.isMicrophoneOn;
                    if (coreUser.isMicrophoneOn !== isMicrophoneOn) {
                        coreUser.isMicrophoneOn = isMicrophoneOn;
                        that.dispatchRemoteMicStateUpdate(coreUser, coreUser.isMicrophoneOn);
                        that.dispatchRoomUserCountOrPropertyChanged(that.getAllUsers());
                    }
                }
            }
        },
        roomExtraInfoUpdate(roomID, roomExtraInfoList) {
            zloginfo(`${TAG} roomExtraInfoUpdate: ${roomID} ${JSON.stringify(roomExtraInfoList)}`);
            const that = UIKitCore.getInstance();
            for (const roomExtraInfo of roomExtraInfoList) {
                const oldRoomExtraInfo = that.roomExtraInfoMap.get(roomExtraInfo.key);
                if (oldRoomExtraInfo != null) {
                    if (roomExtraInfo.updateUser.userID === that.getLocalCoreUser().userID) {
                        continue;
                    }
                    if (roomExtraInfo.updateTime < oldRoomExtraInfo.updateTime) {
                        continue;
                    }
                }
                that.roomExtraInfoMap.set(roomExtraInfo.key, roomExtraInfo);
                if ("extra_info" === roomExtraInfo.key) {
                    const updateKeys = [];
                    const oldProperties = that.roomExtraInfoValueToMap(oldRoomExtraInfo);
                    const currentProperties = that.roomExtraInfoValueToMap(roomExtraInfo);
                    for (const key in currentProperties) {
                        const value = currentProperties[key];
                        const oldValue = oldProperties[key];
                        if (value === oldValue) {
                            continue;
                        }
                        updateKeys.push(key);
                    }
                    for (const updateKey of updateKeys) {
                        that.dispatchRoomPropertyUpdated(updateKey, oldProperties[updateKey], currentProperties[updateKey]);
                    }
                    if (updateKeys.length > 0) {
                        that.dispatchRoomPropertiesFullUpdated(updateKeys, oldProperties, currentProperties);
                    }
                }
            }
        },
        roomTokenWillExpire(roomID, remainTimeInSecond) {
            zloginfo(`${TAG} roomTokenWillExpire: ${roomID} ${remainTimeInSecond}`);
            const that = UIKitCore.getInstance();
            that.notifyTokenWillExpire(remainTimeInSecond);
        },
    });
    async init(appID, appSign, scenario) {
        if (!this.isUIKitInited) {
            this.isUIKitInited = true;
            await this.createExpressEngine(appID, appSign, scenario);
            if (ExpressEngineProxy.getEngine() === null) {
                return false;
            }
            // express will open camera by default
            ExpressEngineProxy.enableCamera(false);
            zloginfo(TAG, `init() called with: appID = [${appID}], isEmpty(appSign) = [${TextUtils.isEmpty(appSign)}]`);
        }
        //  ! this.signalingPlugin.init(appID, appSign); // 先不要插件
        return true;
    }
    containsUser(uiKitCoreUser) {
        return this.remoteUserList.some(user => user.userID === uiKitCoreUser.userID);
    }
    removeUser(uiKitCoreUser) {
        this.remoteUserList = this.remoteUserList.filter(user => user.userID !== uiKitCoreUser.userID);
    }
    async createExpressEngine(appID, appSign, scenario) {
        const config = {
            advancedConfig: {
                // @ts-ignore
                "notify_remote_device_unknown_status": "true",
                "notify_remote_device_init_status": "true"
            }
        };
        await ExpressEngineProxy.createEngine(appID, appSign, scenario, config);
        ExpressEngineProxy.addEventHandler(this.initEventHandler);
    }
    async destroyEngine() {
        ExpressEngineProxy.removeEventHandler(this.initEventHandler);
        ExpressEngineProxy.destroyEngine();
    }
    notifyTokenWillExpire(seconds) {
        if (Date.now() - this.lastNotifyTokenTime > 5 * 60 * 1000) {
            if (this.tokenExpireListener != null) {
                this.tokenExpireListener.onTokenWillExpire?.(seconds);
            }
        }
        this.lastNotifyTokenTime = Date.now();
    }
    addEventHandler(eventHandler, autoDelete) {
        this.eventHandlerList.addEventHandler(eventHandler, autoDelete);
        ExpressEngineProxy.addEventHandler(eventHandler);
    }
    removeEventHandler(eventHandler) {
        this.eventHandlerList.removeEventHandler(eventHandler);
        ExpressEngineProxy.removeEventHandler(eventHandler);
    }
    removeAutoDeleteRoomListeners() {
        ExpressEngineProxy.removeEventHandlerList(this.eventHandlerList.getAutoDeleteHandlerList());
        this.eventHandlerList.removeAutoDeleteRoomListeners();
    }
    notifyTurnMicrophoneOffCommand(uiKitUser) {
        this.audioVideoService.notifyTurnMicrophoneCommand(uiKitUser, false);
    }
    notifyTurnCameraOffCommand(uiKitUser) {
        this.audioVideoService.notifyTurnCameraCommand(uiKitUser, false);
    }
    notifyTurnMicrophoneOnCommand(uiKitUser) {
        this.audioVideoService.notifyTurnMicrophoneCommand(uiKitUser, true);
    }
    notifyTurnCameraOnCommand(uiKitUser) {
        this.audioVideoService.notifyTurnCameraCommand(uiKitUser, true);
    }
    notifyRemovedFromRoomCommand() {
        this.userService.notifyRemovedFromRoomCommand();
    }
    renewToken(token) {
        if (token !== this.token) {
            if (!TextUtils.isEmpty(this.zegoUIKitRoom.roomID)) {
                ExpressEngineProxy.renewToken(this.zegoUIKitRoom.roomID, token);
            }
        }
        // !暂时不支持
        // getSignalingPlugin().renewToken(token);
        this.token = token;
    }
    dispatchBroadcastMessages(roomID, messageList) {
        this.messageService.notifyInRoomMessageReceived(roomID, messageList);
    }
    async getVersion() {
        return "2.5.0(" + (await ZegoExpressEngine.getVersion()) + ")";
    }
    setPresetVideoConfig(preset) {
        ExpressEngineProxy.setVideoConfig(preset, ZegoPublishChannel.Main);
    }
    setVideoConfig(config) {
        ExpressEngineProxy.setVideoConfig(config, ZegoPublishChannel.Main);
    }
    dispatchOnlySelfInRoom() {
        this.userService.notifyOnlySelfInRoom();
    }
    dispatchSoundLevelUpdate(userID, soundLevel) {
        this.audioVideoService.notifySoundLevelUpdate(userID, soundLevel);
    }
    dispatchRemoteCameraStateUpdate(coreUser, open) {
        this.audioVideoService.notifyCameraStateChange(coreUser, open);
    }
    dispatchRemoteMicStateUpdate(coreUser, open) {
        this.audioVideoService.notifyMicStateChange(coreUser, open);
    }
    dispatchRoomStateUpdate(roomID, reason, errorCode, jsonObject) {
        this.roomService.notifyRoomStateUpdate(roomID, reason, errorCode, jsonObject);
    }
    dispatchStreamUpdate(roomID, zegoUpdateType, streamList, jsonObject) {
        this.roomService.notifyStreamUpdate(roomID, zegoUpdateType, streamList, jsonObject);
    }
    dispatchUserLeave(userInfoList) {
        this.userService.notifyUserLeave(userInfoList);
    }
    dispatchUserJoin(userInfoList) {
        this.userService.notifyUserJoin(userInfoList);
    }
    dispatchRoomUserCountOrPropertyChanged(userList) {
        this.userService.notifyRoomUserCountOrPropertyChanged(userList);
    }
    getLocalCoreUser() {
        return this.localUser;
    }
    checkIsLargeRoom() {
        return this.isLargeRoom || this.markAsLargeRoom;
    }
    isLocalUser(userID) {
        if (this.localUser == null) {
            return false;
        }
        return userID === this.localUser.userID;
    }
    getUserFromStreamID(streamID) {
        if (this.getLocalCoreUser() == null) {
            return null;
        }
        if (this.getLocalCoreUser()?.mainStreamID === streamID) {
            return this.getLocalCoreUser();
        }
        for (let uiKitUser of this.remoteUserList) {
            if (uiKitUser.mainStreamID === streamID) {
                return uiKitUser;
            }
        }
        return null;
    }
    getUserByUserID(userID) {
        if (this.getLocalCoreUser() == null) {
            return null;
        }
        if (this.getLocalCoreUser()?.userID === userID) {
            return this.getLocalCoreUser();
        }
        for (let uiKitUser of this.remoteUserList) {
            if (uiKitUser.userID === userID) {
                return uiKitUser;
            }
        }
        return null;
    }
    useFrontFacingCamera(isFrontFacing) {
        this.isFrontFacing = isFrontFacing;
        this.audioVideoService.useFrontFacingCamera(isFrontFacing);
    }
    isUseFrontCamera() {
        return this.isFrontFacing;
    }
    isMicrophoneOn(userID) {
        if (!userID) {
            return this.localUser?.isMicrophoneOn ?? false;
        }
        const uiKitCoreUser = this.getUserByUserID(userID);
        if (uiKitCoreUser != null) {
            return uiKitCoreUser.isMicrophoneOn;
        }
        return false;
    }
    isCameraOn(userID) {
        if (!userID) {
            return this.localUser?.isCameraOn ?? false;
        }
        const uiKitCoreUser = this.getUserByUserID(userID);
        if (uiKitCoreUser != null) {
            return uiKitCoreUser.isCameraOn;
        }
        return false;
    }
    setAudioOutputToSpeaker(enable) {
        this.audioVideoService.setAudioOutputToSpeaker(enable);
    }
    /**
     * is speaker or other output:Receiver/Bluetooth/Headphone.
     *
     * @return
     */
    async isSpeakerOn() {
        return (await ExpressEngineProxy.getAudioRouteType()) == ZegoAudioRoute.Speaker;
    }
    static generateCameraStreamID(roomID, userID) {
        return roomID + "_" + userID + "_main";
    }
    static generateScreenShareStreamID(roomID, userID) {
        return roomID + "_" + userID + "_screensharing";
    }
    turnMicrophoneOn(userID, on) {
        zloginfo(TAG, "turnMicrophoneOn: " + userID + " " + on);
        const localCoreUser = UIKitCore.getInstance().getLocalCoreUser();
        if (localCoreUser && localCoreUser.userID === userID) {
            const stateChanged = (localCoreUser.isMicrophoneOn !== on);
            this.audioVideoService.turnMicrophoneOn(userID, on);
            if (stateChanged) {
                this.eventHandlerList.notifyAllListener(eventHandler => {
                    eventHandler.onLocalMicrophoneStateUpdate(on);
                });
            }
        }
        else {
            this.audioVideoService.turnMicrophoneOn(userID, on);
        }
    }
    /**
     * 打开/关闭指定用户的摄像头, 自己的会触发 onLocalCameraStateUpdate
     * @param userID
     * @param on
     */
    turnCameraOn(userID, on) {
        zloginfo(TAG, "turnCameraOn: " + userID + " " + on);
        const localCoreUser = UIKitCore.getInstance().getLocalCoreUser();
        if (localCoreUser && localCoreUser.userID === userID) {
            const stateChanged = (localCoreUser.isCameraOn !== on);
            this.audioVideoService.turnCameraOn(userID, on);
            if (stateChanged) {
                this.eventHandlerList.notifyAllListener(eventHandler => {
                    eventHandler.onLocalCameraStateUpdate(on);
                });
            }
        }
        else {
            this.audioVideoService.turnCameraOn(userID, on);
        }
    }
    startPlayingAllAudioVideo() {
        this.audioVideoService.startPlayingAllAudioVideo();
    }
    stopPlayingAllAudioVideo() {
        this.audioVideoService.stopPlayingAllAudioVideo();
    }
    mutePlayStreamAudio(streamID, mute) {
        return ExpressEngineProxy.mutePlayStreamAudio(streamID, mute);
    }
    mutePlayStreamVideo(streamID, mute) {
        return ExpressEngineProxy.mutePlayStreamVideo(streamID, mute);
    }
    async startMixerTask(task, callback) {
        const result = await ExpressEngineProxy.startMixerTask(task);
        if (callback) {
            callback.onMixerStartResult?.(result.errorCode, result.extendedData);
        }
    }
    async stopMixerTask(task, callback) {
        const result = await ExpressEngineProxy.stopMixerTask(task);
        if (callback) {
            callback.onMixerStopResult?.(result.errorCode);
        }
    }
    startPlayingStream(streamID, config) {
        return ExpressEngineProxy.startPlayingStream(streamID, config);
    }
    addMicrophoneStateListener(listenerID, listener) {
        this.audioVideoService.addMicrophoneStateListener(listenerID, listener);
    }
    removeMicrophoneStateListener(listenerID) {
        this.audioVideoService.removeMicrophoneStateListener(listenerID);
    }
    addCameraStateListener(listenerID, listener) {
        this.audioVideoService.addCameraStateListener(listenerID, listener);
    }
    removeCameraStateListener(listenerID) {
        this.audioVideoService.removeCameraStateListener(listenerID);
    }
    addAudioOutputDeviceChangedListener(listenerID, listener) {
        this.audioVideoService.addAudioOutputDeviceChangedListener(listenerID, listener);
    }
    removeAudioOutputDeviceChangedListener(listenerID) {
        this.audioVideoService.removeAudioOutputDeviceChangedListener(listenerID);
    }
    addSoundLevelUpdatedListener(listenerID, listener) {
        this.audioVideoService.addSoundLevelUpdatedListener(listenerID, listener);
    }
    removeSoundLevelUpdatedListener(listenerID) {
        this.audioVideoService.removeSoundLevelUpdatedListener(listenerID);
    }
    addTurnOnYourCameraRequestListener(listenerID, listener) {
        this.audioVideoService.addTurnOnYourCameraRequestListener(listenerID, listener);
    }
    removeTurnOnYourCameraRequestListener(listenerID) {
        this.audioVideoService.removeTurnOnYourCameraRequestListener(listenerID);
    }
    addTurnOnYourMicrophoneRequestListener(listenerID, listener) {
        this.audioVideoService.addTurnOnYourMicrophoneRequestListener(listenerID, listener);
    }
    removeTurnOnYourMicrophoneRequestListener(listenerID) {
        this.audioVideoService.removeTurnOnYourMicrophoneRequestListener(listenerID);
    }
    setAudioVideoResourceMode(mode) {
        this.resourceMode = mode;
    }
    getAudioVideoResourceMode() {
        return this.resourceMode;
    }
    stopPlayingStream(streamID) {
        return ExpressEngineProxy.stopPlayingStream(streamID);
    }
    startPreview(channel) {
        return ExpressEngineProxy.startPreview(channel);
    }
    stopPreview(channel) {
        ExpressEngineProxy.stopPreview(channel);
    }
    startPublishingStream(streamID, channel) {
        return ExpressEngineProxy.startPublishingStream(streamID, channel);
    }
    stopPublishingStream(channel) {
        return ExpressEngineProxy.stopPublishingStream(channel);
    }
    /**
     * 打开/关闭自己的麦克风, 会触发 onLocalMicrophoneStateUpdate
     * @param open
     */
    openMicrophone(open) {
        const localCoreUser = UIKitCore.getInstance().getLocalCoreUser();
        if (localCoreUser != null) {
            const stateChanged = (localCoreUser.isMicrophoneOn != open);
            // localCoreUser.isMicrophoneOn = open
            this.audioVideoService.openMicrophone(open);
            if (stateChanged) {
                this.eventHandlerList.notifyAllListener(eventHandler => {
                    eventHandler.onLocalMicrophoneStateUpdate(open);
                });
            }
        }
    }
    /**
     * 打开/关闭自己的摄像头, 会触发摄像头状态变更事件 onLocalCameraStateUpdate
     * @param open
     */
    openCamera(open) {
        const localCoreUser = UIKitCore.getInstance().getLocalCoreUser();
        if (localCoreUser != null) {
            const stateChanged = (localCoreUser.isCameraOn != open);
            // localCoreUser.isCameraOn = open
            this.audioVideoService.openCamera(open);
            if (stateChanged) {
                this.eventHandlerList.notifyAllListener(eventHandler => {
                    eventHandler.onLocalCameraStateUpdate(open);
                });
            }
        }
    }
    async joinRoom(roomID, markAsLargeRoom, callback) {
        if (!ExpressEngineProxy.getEngine()) {
            zlogerror(`ExpressEngineProxy is null!`);
            return;
        }
        this.zegoUIKitRoom.roomID = roomID;
        this.markAsLargeRoom = markAsLargeRoom;
        zloginfo(`${TAG} joinRoom for '${roomID}'`);
        // 先之前的房
        await this.roomService.leaveRoom();
        await this.roomService.joinRoom(roomID, this.token, (errorCode) => {
            if (errorCode !== 0) {
                zlogerror(`${TAG} joinRoom '${roomID}' error, code=${errorCode}`);
                this.zegoUIKitRoom.roomID = "";
            }
            else {
                const localUser = UIKitCore.getInstance().getLocalCoreUser();
                const streamID = UIKitCore.generateCameraStreamID(roomID, localUser.userID);
                localUser?.setStreamID(streamID);
                ExpressEngineProxy.startSoundLevelMonitor();
                // tryStartPublishStream
                // ExpressEngineProxy.startPublishingStream(streamID, ZegoPublishChannel.Main);
                // ExpressEngineProxy.startPreview(ZegoPublishChannel.Main)
                // this.roomService.notifyAudioVideoAvailable([localUser!.getUIKitUser()])
            }
            if (callback) {
                callback(errorCode);
            }
        });
    }
    async leaveRoom() {
        if (!ExpressEngineProxy.getEngine()) {
            return;
        }
        const roomID = this.zegoUIKitRoom.roomID;
        this.resetRoomData();
        zloginfo(`${TAG} leaveRoom roomID: `, roomID);
        if (!roomID) {
            zlogwarning(`${TAG} leaveRoom roomID is null`);
            return;
        }
        this.audioVideoService.openMicrophone(false);
        this.audioVideoService.openCamera(false);
        ExpressEngineProxy.stopPreview();
        ExpressEngineProxy.stopSoundLevelMonitor();
        ExpressEngineProxy.useFrontCamera(true);
        ExpressEngineProxy.setAudioRouteToSpeaker(true);
        await this.stopPublishingStream();
        // const localCoreUser = UIKitCore.getInstance().getLocalCoreUser();
        // if(localCoreUser){
        //     zloginfo(`${TAG} leaveRoom try turnoff mic and camera, userid: `, localCoreUser.userID)
        //     this.audioVideoService.turnMicrophoneOn(localCoreUser.userID, false)
        //     this.audioVideoService.turnCameraOn(localCoreUser.userID, false)
        // }
        await this.roomService.leaveRoom(roomID);
    }
    /**
     * clear data,not device
     */
    resetRoomData() {
        this.userService.clear();
        this.audioVideoService.clear();
        this.roomService.clear();
        this.messageService.clear();
        this.remoteUserList = [];
        this.inRoomMessages = [];
        this.zegoUIKitRoom.roomID = "";
        this.roomExtraInfoMap.clear();
        this.isFrontFacing = true;
        this.markAsLargeRoom = false;
        this.isLargeRoom = false;
        this.roomMemberCount = 0;
        this.removeAutoDeleteRoomListeners();
    }
    getRoom() {
        return this.zegoUIKitRoom;
    }
    setRoomProperty(key, value) {
        const map = {};
        map[key] = value;
        this.updateRoomProperties(map);
    }
    getRoomProperties() {
        if (this.roomExtraInfoMap.has('extra_info')) {
            return this.roomExtraInfoValueToMap(this.roomExtraInfoMap.get("extra_info"));
        }
        else {
            return {};
        }
    }
    roomExtraInfoValueToMap(roomExtraInfo) {
        let map = {};
        if (!roomExtraInfo || roomExtraInfo.value === '') {
            return map;
        }
        try {
            map = JSON.parse(roomExtraInfo.value);
        }
        catch (e) {
            // 在TypeScript中，通常我们会使用console.error来处理错误打印，而不是e.printStackTrace()
            console.error('Error parsing room extra info:', e);
        }
        return map;
    }
    updateRoomProperties(map) {
        const key = 'extra_info';
        const currentProperties = this.roomExtraInfoValueToMap(this.roomExtraInfoMap.get(key));
        const tempProperties = { ...currentProperties };
        for (const key in map) {
            tempProperties[key] = map[key];
        }
        const roomID = this.zegoUIKitRoom.roomID;
        if (!roomID) {
            return;
        }
        try {
            this.roomService.setRoomProperty(roomID, key, JSON.stringify(tempProperties), (errorCode) => {
                if (errorCode === 0) {
                    const oldProperties = { ...currentProperties };
                    const updateTime = Date.now();
                    for (const [key, value] of Object.entries(map)) {
                        currentProperties[key] = value;
                    }
                    let roomExtraInfo = this.roomExtraInfoMap.get(key);
                    if (!roomExtraInfo) {
                        roomExtraInfo = {
                            key,
                            value: JSON.stringify(currentProperties),
                            updateUser: {
                                userID: this.getLocalCoreUser().userID,
                                userName: this.getLocalCoreUser().userName,
                            },
                            updateTime,
                        };
                    }
                    this.roomExtraInfoMap.set(roomExtraInfo.key, roomExtraInfo);
                    const updateKeys = Object.keys(map);
                    for (const updateKey of updateKeys) {
                        this.dispatchRoomPropertyUpdated(updateKey, oldProperties[updateKey], currentProperties[updateKey]);
                    }
                    this.dispatchRoomPropertiesFullUpdated(updateKeys, oldProperties, currentProperties);
                }
            });
        }
        catch (error) {
            console.error('Error updating room properties:', error);
        }
    }
    dispatchRoomPropertiesFullUpdated(keys, oldProperties, roomProperties) {
        this.roomService.notifyRoomPropertiesFullUpdated(keys, oldProperties, roomProperties);
    }
    dispatchRoomPropertyUpdated(key, oldValue, value) {
        this.roomService.notifyRoomPropertyUpdate(key, oldValue, value);
    }
    addRoomPropertyUpdateListener(listenerID, listener) {
        this.roomService.addRoomPropertyUpdatedListener(listenerID, listener);
    }
    removeRoomPropertyUpdateListener(listenerID) {
        this.roomService.removeRoomPropertyUpdatedListener(listenerID);
    }
    addRoomStateUpdatedListener(listenerID, listener) {
        this.roomService.addRoomStateUpdatedListener(listenerID, listener);
    }
    removeRoomStateUpdatedListener(listenerID) {
        this.roomService.removeRoomStateUpdatedListener(listenerID);
    }
    setTokenWillExpireListener(listener) {
        this.tokenExpireListener = listener;
    }
    getTokenExpireListener() {
        return this.tokenExpireListener;
    }
    addAudioVideoUpdateListener(listenerID, listener) {
        this.roomService.addAudioVideoUpdateListener(listenerID, listener);
    }
    removeAudioVideoUpdateListener(listenerID) {
        this.roomService.removeAudioVideoUpdateListener(listenerID);
    }
    sendInRoomCommand(command, toUserList, callback) {
        this.roomService.sendInRoomCommand(this.getRoom().roomID, command, toUserList, callback);
    }
    addInRoomCommandListener(listenerID, listener) {
        this.roomService.addInRoomCommandListener(listenerID, listener);
    }
    removeInRoomCommandListener(listenerID) {
        this.roomService.removeInRoomCommandListener(listenerID);
    }
    addUserUpdateListener(listenerID, listener) {
        this.userService.addUserUpdateListener(listenerID, listener);
    }
    removeUserUpdateListener(listenerID) {
        this.userService.removeUserUpdateListener(listenerID);
    }
    addUserCountOrPropertyChangedListener(listenerID, listener) {
        this.userService.addUserCountOrPropertyChangedListener(listenerID, listener);
    }
    removeUserCountOrPropertyChangedListener(listenerID) {
        this.userService.removeUserCountOrPropertyChangedListener(listenerID);
    }
    /**
     * 移除用户出房间。
     *
     * @param userIDs 要移除的用户ID列表。
     */
    removeUserFromRoom(userIDs) {
        const command = {
            'zego_remove_user': userIDs
        };
        if (this.isLargeRoom || this.markAsLargeRoom) {
            ZegoUIKit.sendInRoomCommand(JSON.stringify(command), [], {
                onSend(errorCode) {
                },
            });
        }
        else {
            ZegoUIKit.sendInRoomCommand(JSON.stringify(command), userIDs, {
                onSend(errorCode) {
                },
            });
        }
    }
    addOnMeRemovedFromRoomListener(listenerID, listener) {
        this.userService.addOnMeRemovedFromRoomListener(listenerID, listener);
    }
    removeOnMeRemovedFromRoomListener(listenerID) {
        this.userService.removeOnMeRemovedFromRoomListener(listenerID);
    }
    // public removeUserCountOrPropertyChangedListenerInternal(listenerID: string,listener: ZegoUserCountOrPropertyChangedListener) {
    //     this.userService.removeUserCountOrPropertyChangedListener(listener, true);
    // }
    // public removeUserUpdateListenerInternal(listenerID: string,listener: ZegoUserUpdateListener) {
    //     this.userService.removeUserUpdateListener(listener, true);
    // }
    login(userID, userName, callback) {
        this.localUser = new UIKitCoreUser(userID, userName);
        if (callback != null) {
            callback(0);
        }
    }
    logout() {
        this.resetRoomData();
        // this.roomService.clearRoomStateListeners();
        this.localUser = null;
        this.token = null;
    }
    getUser(userID) {
        const coreUser = this.getUserByUserID(userID);
        if (coreUser != null) {
            return coreUser.getUIKitUser();
        }
        else {
            return null;
        }
    }
    getLocalUser() {
        const localCoreUser = this.getLocalCoreUser();
        if (localCoreUser == null) {
            return null;
        }
        return localCoreUser?.getUIKitUser();
    }
    getAllUsers() {
        // 使用Array.map来转换remoteUserList
        const uiKitUsers = this.remoteUserList.map(user => user.getUIKitUser());
        // 在数组前端添加localUser
        const localUIKitUser = this.localUser.getUIKitUser();
        return [localUIKitUser, ...uiKitUsers];
    }
    getRemoteUsers() {
        // 创建一个新数组来复制远程用户列表
        const remoteUsersCopy = [...this.remoteUserList];
        return remoteUsersCopy;
    }
    addOnOnlySelfInRoomListener(listenerID, listener) {
        this.userService.addOnOnlySelfInRoomListener(listenerID, listener);
    }
    removeOnOnlySelfInRoomListener(listenerID) {
        this.userService.removeOnOnlySelfInRoomListener(listenerID);
    }
    getInRoomMessages() {
        return this.inRoomMessages;
    }
    sendInRoomMessage(message, listener) {
        this.messageService.sendInRoomMessage(message, listener);
    }
    resendInRoomMessage(message, listener) {
        this.messageService.resendInRoomMessage(message, listener);
    }
    addInRoomMessageReceivedListener(listenerID, listener) {
        this.messageService.addInRoomMessageReceivedListener(listenerID, listener);
    }
    removeInRoomMessageReceivedListener(listenerID) {
        this.messageService.removeInRoomMessageReceivedListener(listenerID);
    }
    static sortUsers(userList) {
        const sortUsers = [];
        const self = UIKitCore.getInstance().getLocalCoreUser().getUIKitUser();
        const selfIndex = userList.indexOf(self);
        if (selfIndex !== -1) {
            userList.splice(selfIndex, 1); // Remove self from the list
        }
        userList.reverse(); // Reverse the list
        sortUsers.push(self); // Add self back to the beginning
        sortUsers.push(...userList); // Add the remaining users
        return sortUsers;
    }
}
