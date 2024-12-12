export class ExpressEngineEventHandler {
    apiCalledResult(errorCode, funcName, info) {
    }
    onLocalCameraStateUpdate(open) {
    }
    onLocalMicrophoneStateUpdate(open) {
    }
    engineStateUpdate(state) {
    }
    roomStateUpdate(roomID, state, errorCode, extendedData) {
    }
    roomStateChanged(roomID, reason, errorCode, extendedData) {
    }
    roomUserUpdate(roomID, updateType, userList) {
    }
    roomOnlineUserCountUpdate(roomID, count) {
    }
    roomStreamUpdate(roomID, updateType, streamList, extendedData) {
    }
    roomStreamExtraInfoUpdate(roomID, streamList) {
    }
    roomExtraInfoUpdate(roomID, roomExtraInfoList) {
    }
    roomTokenWillExpire(roomID, remainTimeInSecond) {
    }
    publisherStateUpdate(streamID, state, errorCode, extendedData) {
    }
    publisherQualityUpdate(streamID, quality) {
    }
    publisherCapturedAudioFirstFrame() {
    }
    publisherCapturedVideoFirstFrame(channel) {
    }
    publisherRenderVideoFirstFrame(channel) {
    }
    publisherVideoSizeChanged(width, height, channel) {
    }
    publisherRelayCDNStateUpdate(streamID, infoList) {
    }
    playerStateUpdate(streamID, state, errorCode, extendedData) {
    }
    playerQualityUpdate(streamID, quality) {
    }
    playerMediaEvent(streamID, event) {
    }
    playerRecvAudioFirstFrame(streamID) {
    }
    playerRecvVideoFirstFrame(streamID) {
    }
    playerRenderVideoFirstFrame(streamID) {
    }
    playerVideoSizeChanged(streamID, width, height) {
    }
    mixerRelayCDNStateUpdate(taskID, infoList) {
    }
    mixerSoundLevelUpdate(soundLevels) {
    }
    autoMixerSoundLevelUpdate(soundLevels) {
    }
    capturedSoundLevelInfoUpdate(soundLevelInfo) {
    }
    remoteSoundLevelUpdate(soundLevelInfos) {
    }
    localDeviceExceptionOccurred(exceptionType, deviceType, deviceID) {
    }
    remoteCameraStateUpdate(streamID, state) {
    }
    remoteMicStateUpdate(streamID, state) {
    }
    remoteSpeakerStateUpdate(streamID, state) {
    }
    audioRouteChange(audioRoute) {
    }
    IMRecvBroadcastMessage(roomID, messageList) {
    }
    IMRecvBarrageMessage(roomID, messageList) {
    }
    IMRecvCustomCommand(roomID, fromUser, command) {
    }
    capturedDataRecordStateUpdate(state, errorCode, config, channel) {
    }
    capturedDataRecordProgressUpdate(progress, config, channel) {
    }
}
