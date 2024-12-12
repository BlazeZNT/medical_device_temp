import { ZegoMixerTask, ZegoPlayerConfig, ZegoPublishChannel, ZegoVideoConfig } from "../express/ZegoExpressUniApp";
import { UIKitCoreUser } from './UIKitCoreUser';
import { RoomStateChangedListener, ZegoAudioOutputDeviceChangedListener, ZegoAudioVideoResourceMode, ZegoAudioVideoUpdateListener, ZegoCameraStateChangeListener, ZegoInRoomCommandListener, ZegoInRoomMessage, ZegoInRoomMessageListener, ZegoInRoomMessageSendStateListener, ZegoMeRemovedFromRoomListener, ZegoMicrophoneStateChangeListener, ZegoMixerStartCallback, ZegoMixerStopCallback, ZegoOnlySelfInRoomListener, ZegoPresetResolution, ZegoRoomPropertyUpdateListener, ZegoSendInRoomCommandCallback, ZegoSoundLevelUpdateListener, ZegoTurnOnYourCameraRequestListener, ZegoTurnOnYourMicrophoneRequestListener, ZegoUIKitCallback, ZegoUIKitRoom, ZegoUIKitScenario, ZegoUIKitTokenExpireListener, ZegoUIKitUser, ZegoUserCountOrPropertyChangedListener, ZegoUserUpdateListener } from '../defines';
import { ExpressEngineEventHandler } from '../express/ExpressEngineEventHandler';
/**
 * for internal use,DO NOT call it directly.
 */
export default class UIKitCore {
    private static instance;
    private constructor();
    static getInstance(): UIKitCore;
    private roomService;
    private userService;
    private audioVideoService;
    private messageService;
    private localUser;
    private readonly zegoUIKitRoom;
    private isFrontFacing;
    private enableAudioVideoAutoPlaying;
    private remoteUserList;
    private inRoomMessages;
    private roomExtraInfoMap;
    private isLargeRoom;
    private markAsLargeRoom;
    private roomMemberCount;
    private lastNotifyTokenTime;
    private isUIKitInited;
    private token;
    private tokenExpireListener;
    private resourceMode;
    private eventHandlerList;
    private initEventHandler;
    init(appID: number, appSign: string, scenario: ZegoUIKitScenario): Promise<boolean>;
    private containsUser;
    private removeUser;
    private createExpressEngine;
    destroyEngine(): Promise<void>;
    notifyTokenWillExpire(seconds: number): void;
    addEventHandler(eventHandler: ExpressEngineEventHandler, autoDelete: boolean): void;
    removeEventHandler(eventHandler: ExpressEngineEventHandler): void;
    private removeAutoDeleteRoomListeners;
    private notifyTurnMicrophoneOffCommand;
    private notifyTurnCameraOffCommand;
    private notifyTurnMicrophoneOnCommand;
    private notifyTurnCameraOnCommand;
    private notifyRemovedFromRoomCommand;
    renewToken(token: string): void;
    private dispatchBroadcastMessages;
    getVersion(): Promise<string>;
    setPresetVideoConfig(preset: ZegoPresetResolution): void;
    setVideoConfig(config: ZegoVideoConfig): void;
    private dispatchOnlySelfInRoom;
    private dispatchSoundLevelUpdate;
    private dispatchRemoteCameraStateUpdate;
    private dispatchRemoteMicStateUpdate;
    private dispatchRoomStateUpdate;
    private dispatchStreamUpdate;
    private dispatchUserLeave;
    private dispatchUserJoin;
    dispatchRoomUserCountOrPropertyChanged(userList: ZegoUIKitUser[]): void;
    getLocalCoreUser(): UIKitCoreUser | null;
    checkIsLargeRoom(): boolean;
    isLocalUser(userID: string): boolean;
    getUserFromStreamID(streamID: string): UIKitCoreUser | null;
    getUserByUserID(userID: string): UIKitCoreUser | null;
    useFrontFacingCamera(isFrontFacing: boolean): void;
    isUseFrontCamera(): boolean;
    isMicrophoneOn(userID?: string): boolean;
    isCameraOn(userID?: string): boolean;
    setAudioOutputToSpeaker(enable: boolean): void;
    /**
     * is speaker or other output:Receiver/Bluetooth/Headphone.
     *
     * @return
     */
    isSpeakerOn(): Promise<boolean>;
    static generateCameraStreamID(roomID: string, userID: string): string;
    static generateScreenShareStreamID(roomID: string, userID: string): string;
    turnMicrophoneOn(userID: string, on: boolean): void;
    /**
     * 打开/关闭指定用户的摄像头, 自己的会触发 onLocalCameraStateUpdate
     * @param userID
     * @param on
     */
    turnCameraOn(userID: string, on: boolean): void;
    startPlayingAllAudioVideo(): void;
    stopPlayingAllAudioVideo(): void;
    mutePlayStreamAudio(streamID: string, mute: boolean): Promise<void>;
    mutePlayStreamVideo(streamID: string, mute: boolean): Promise<void>;
    startMixerTask(task: ZegoMixerTask, callback?: ZegoMixerStartCallback): Promise<void>;
    stopMixerTask(task: ZegoMixerTask, callback?: ZegoMixerStopCallback): Promise<void>;
    startPlayingStream(streamID: string, config?: ZegoPlayerConfig): Promise<void>;
    addMicrophoneStateListener(listenerID: string, listener: ZegoMicrophoneStateChangeListener): void;
    removeMicrophoneStateListener(listenerID: string): void;
    addCameraStateListener(listenerID: string, listener: ZegoCameraStateChangeListener): void;
    removeCameraStateListener(listenerID: string): void;
    addAudioOutputDeviceChangedListener(listenerID: string, listener: ZegoAudioOutputDeviceChangedListener): void;
    removeAudioOutputDeviceChangedListener(listenerID: string): void;
    addSoundLevelUpdatedListener(listenerID: string, listener: ZegoSoundLevelUpdateListener): void;
    removeSoundLevelUpdatedListener(listenerID: string): void;
    addTurnOnYourCameraRequestListener(listenerID: string, listener: ZegoTurnOnYourCameraRequestListener): void;
    removeTurnOnYourCameraRequestListener(listenerID: string): void;
    addTurnOnYourMicrophoneRequestListener(listenerID: string, listener: ZegoTurnOnYourMicrophoneRequestListener): void;
    removeTurnOnYourMicrophoneRequestListener(listenerID: string): void;
    setAudioVideoResourceMode(mode: ZegoAudioVideoResourceMode): void;
    getAudioVideoResourceMode(): ZegoAudioVideoResourceMode | null;
    stopPlayingStream(streamID: string): Promise<void>;
    startPreview(channel?: ZegoPublishChannel): Promise<void>;
    stopPreview(channel?: ZegoPublishChannel): void;
    startPublishingStream(streamID: string, channel?: ZegoPublishChannel): Promise<void>;
    stopPublishingStream(channel?: ZegoPublishChannel): Promise<void>;
    /**
     * 打开/关闭自己的麦克风, 会触发 onLocalMicrophoneStateUpdate
     * @param open
     */
    openMicrophone(open: boolean): void;
    /**
     * 打开/关闭自己的摄像头, 会触发摄像头状态变更事件 onLocalCameraStateUpdate
     * @param open
     */
    openCamera(open: boolean): void;
    joinRoom(roomID: string, markAsLargeRoom: boolean, callback?: ZegoUIKitCallback): Promise<void>;
    leaveRoom(): Promise<void>;
    /**
     * clear data,not device
     */
    private resetRoomData;
    getRoom(): ZegoUIKitRoom;
    setRoomProperty(key: string, value: string): void;
    getRoomProperties(): Record<string, string>;
    private roomExtraInfoValueToMap;
    updateRoomProperties(map: Record<string, string>): void;
    private dispatchRoomPropertiesFullUpdated;
    private dispatchRoomPropertyUpdated;
    addRoomPropertyUpdateListener(listenerID: string, listener: ZegoRoomPropertyUpdateListener): void;
    removeRoomPropertyUpdateListener(listenerID: string): void;
    addRoomStateUpdatedListener(listenerID: string, listener: RoomStateChangedListener): void;
    removeRoomStateUpdatedListener(listenerID: string): void;
    setTokenWillExpireListener(listener: ZegoUIKitTokenExpireListener): void;
    getTokenExpireListener(): ZegoUIKitTokenExpireListener | null;
    addAudioVideoUpdateListener(listenerID: string, listener: ZegoAudioVideoUpdateListener): void;
    removeAudioVideoUpdateListener(listenerID: string): void;
    sendInRoomCommand(command: string, toUserList: string[], callback?: ZegoSendInRoomCommandCallback): void;
    addInRoomCommandListener(listenerID: string, listener: ZegoInRoomCommandListener): void;
    removeInRoomCommandListener(listenerID: string): void;
    addUserUpdateListener(listenerID: string, listener: ZegoUserUpdateListener): void;
    removeUserUpdateListener(listenerID: string): void;
    addUserCountOrPropertyChangedListener(listenerID: string, listener: ZegoUserCountOrPropertyChangedListener): void;
    removeUserCountOrPropertyChangedListener(listenerID: string): void;
    /**
     * 移除用户出房间。
     *
     * @param userIDs 要移除的用户ID列表。
     */
    removeUserFromRoom(userIDs: string[]): void;
    addOnMeRemovedFromRoomListener(listenerID: string, listener: ZegoMeRemovedFromRoomListener): void;
    removeOnMeRemovedFromRoomListener(listenerID: string): void;
    login(userID: string, userName: string, callback?: ZegoUIKitCallback): void;
    logout(): void;
    getUser(userID: string): ZegoUIKitUser | null;
    getLocalUser(): ZegoUIKitUser | null;
    getAllUsers(): ZegoUIKitUser[];
    getRemoteUsers(): UIKitCoreUser[];
    addOnOnlySelfInRoomListener(listenerID: string, listener: ZegoOnlySelfInRoomListener): void;
    removeOnOnlySelfInRoomListener(listenerID: string): void;
    getInRoomMessages(): ZegoInRoomMessage[];
    sendInRoomMessage(message: string, listener?: ZegoInRoomMessageSendStateListener): void;
    resendInRoomMessage(message: ZegoInRoomMessage, listener: ZegoInRoomMessageSendStateListener): void;
    addInRoomMessageReceivedListener(listenerID: string, listener: ZegoInRoomMessageListener): void;
    removeInRoomMessageReceivedListener(listenerID: string): void;
    static sortUsers(userList: ZegoUIKitUser[]): ZegoUIKitUser[];
}
