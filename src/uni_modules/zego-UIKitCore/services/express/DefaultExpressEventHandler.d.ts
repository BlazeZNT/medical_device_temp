import { ZegoEngineState, ZegoRoomState, ZegoUpdateType, ZegoUser, ZegoStream, ZegoRoomExtraInfo, ZegoPublisherState, ZegoPublishStreamQuality, ZegoPublishChannel, ZegoStreamRelayCDNInfo, ZegoPlayerState, ZegoPlayStreamQuality, ZegoPlayerMediaEvent, ZegoSoundLevelInfo, ZegoDeviceExceptionType, ZegoDeviceType, ZegoRemoteDeviceState, ZegoAudioRoute, ZegoBroadcastMessageInfo, ZegoBarrageMessageInfo, ZegoDataRecordState, ZegoDataRecordConfig, ZegoDataRecordProgress, ZegoRoomStateChangedReason } from "./ZegoExpressUniApp";
import { ExpressEngineEventHandler } from "./ExpressEngineEventHandler";
/**
 * 提供 ExpressEngineEventHandler 的默认实现
 */
export declare class DefaultExpressEventHandler extends ExpressEngineEventHandler {
    handler: Partial<ExpressEngineEventHandler>;
    constructor(handler: Partial<ExpressEngineEventHandler>);
    apiCalledResult(errorCode: number, funcName: string, info: string): void;
    onLocalCameraStateUpdate(open: boolean): void;
    onLocalMicrophoneStateUpdate(open: boolean): void;
    engineStateUpdate(state: ZegoEngineState): void;
    roomStateUpdate(roomID: string, state: ZegoRoomState, errorCode: number, extendedData: string): void;
    roomStateChanged(roomID: string, reason: ZegoRoomStateChangedReason, errorCode: number, extendedData: string): void;
    roomUserUpdate(roomID: string, updateType: ZegoUpdateType, userList: ZegoUser[]): void;
    roomOnlineUserCountUpdate(roomID: string, count: number): void;
    roomStreamUpdate(roomID: string, updateType: ZegoUpdateType, streamList: ZegoStream[], extendedData: string): void;
    roomStreamExtraInfoUpdate(roomID: string, streamList: ZegoStream[]): void;
    roomExtraInfoUpdate(roomID: string, roomExtraInfoList: ZegoRoomExtraInfo[]): void;
    roomTokenWillExpire(roomID: string, remainTimeInSecond: number): void;
    publisherStateUpdate(streamID: string, state: ZegoPublisherState, errorCode: number, extendedData: string): void;
    publisherQualityUpdate(streamID: string, quality: ZegoPublishStreamQuality): void;
    publisherCapturedAudioFirstFrame(): void;
    publisherCapturedVideoFirstFrame(channel: ZegoPublishChannel): void;
    publisherRenderVideoFirstFrame(channel: ZegoPublishChannel): void;
    publisherVideoSizeChanged(width: number, height: number, channel: ZegoPublishChannel): void;
    publisherRelayCDNStateUpdate(streamID: string, infoList: ZegoStreamRelayCDNInfo[]): void;
    playerStateUpdate(streamID: string, state: ZegoPlayerState, errorCode: number, extendedData: string): void;
    playerQualityUpdate(streamID: string, quality: ZegoPlayStreamQuality): void;
    playerMediaEvent(streamID: string, event: ZegoPlayerMediaEvent): void;
    playerRecvAudioFirstFrame(streamID: string): void;
    playerRecvVideoFirstFrame(streamID: string): void;
    playerRenderVideoFirstFrame(streamID: string): void;
    playerVideoSizeChanged(streamID: string, width: number, height: number): void;
    mixerRelayCDNStateUpdate(taskID: string, infoList: ZegoStreamRelayCDNInfo[]): void;
    mixerSoundLevelUpdate(soundLevels: Map<number, number>): void;
    autoMixerSoundLevelUpdate(soundLevels: Map<string, number>): void;
    capturedSoundLevelInfoUpdate(soundLevelInfo: ZegoSoundLevelInfo): void;
    remoteSoundLevelUpdate(soundLevelInfos: Map<string, ZegoSoundLevelInfo>): void;
    localDeviceExceptionOccurred(exceptionType: ZegoDeviceExceptionType, deviceType: ZegoDeviceType, deviceID: string): void;
    remoteCameraStateUpdate(streamID: string, state: ZegoRemoteDeviceState): void;
    remoteMicStateUpdate(streamID: string, state: ZegoRemoteDeviceState): void;
    remoteSpeakerStateUpdate(streamID: string, state: ZegoRemoteDeviceState): void;
    audioRouteChange(audioRoute: ZegoAudioRoute): void;
    IMRecvBroadcastMessage(roomID: string, messageList: ZegoBroadcastMessageInfo[]): void;
    IMRecvBarrageMessage(roomID: string, messageList: ZegoBarrageMessageInfo[]): void;
    IMRecvCustomCommand(roomID: string, fromUser: ZegoUser, command: string): void;
    capturedDataRecordStateUpdate(state: ZegoDataRecordState, errorCode: number, config: ZegoDataRecordConfig, channel: ZegoPublishChannel): void;
    capturedDataRecordProgressUpdate(progress: ZegoDataRecordProgress, config: ZegoDataRecordConfig, channel: ZegoPublishChannel): void;
}
