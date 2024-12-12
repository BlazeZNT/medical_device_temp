import { ExpressEngineProxy } from "./services/express/ExpressEngineProxy";
import UIKitCore from "./services/internal/UIKitCore";
export default class ZegoUIKit {
    static init(appID, appSign, scenario) {
        return UIKitCore.getInstance().init(appID, appSign, scenario);
    }
    static unInit() {
        UIKitCore.getInstance().destroyEngine();
    }
    static useFrontFacingCamera(isFrontFacing) {
        UIKitCore.getInstance().useFrontFacingCamera(isFrontFacing);
    }
    static isMicrophoneOn(userID) {
        return UIKitCore.getInstance().isMicrophoneOn(userID);
    }
    static isCameraOn(userID) {
        return UIKitCore.getInstance().isCameraOn(userID);
    }
    static setAudioOutputToSpeaker(enable) {
        UIKitCore.getInstance().setAudioOutputToSpeaker(enable);
    }
    static turnMicrophoneOn(userID, on) {
        UIKitCore.getInstance().turnMicrophoneOn(userID, on);
    }
    static turnCameraOn(userID, on) {
        UIKitCore.getInstance().turnCameraOn(userID, on);
    }
    static addMicrophoneStateListener(listenerID, listener) {
        UIKitCore.getInstance().addMicrophoneStateListener(listenerID, listener);
    }
    static removeMicrophoneStateListener(listenerID) {
        UIKitCore.getInstance().removeMicrophoneStateListener(listenerID);
    }
    static addCameraStateListener(listenerID, listener) {
        UIKitCore.getInstance().addCameraStateListener(listenerID, listener);
    }
    static removeCameraStateListener(listenerID) {
        UIKitCore.getInstance().removeCameraStateListener(listenerID);
    }
    static addAudioOutputDeviceChangedListener(listenerID, listener) {
        UIKitCore.getInstance().addAudioOutputDeviceChangedListener(listenerID, listener);
    }
    static removeAudioOutputDeviceChangedListener(listenerID) {
        UIKitCore.getInstance().removeAudioOutputDeviceChangedListener(listenerID);
    }
    static setAppOrientation(orientation) {
        ExpressEngineProxy.setAppOrientation(orientation);
    }
    static addSoundLevelUpdatedListener(listenerID, listener) {
        UIKitCore.getInstance().addSoundLevelUpdatedListener(listenerID, listener);
    }
    static removeSoundLevelUpdatedListener(listenerID) {
        UIKitCore.getInstance().removeSoundLevelUpdatedListener(listenerID);
    }
    static joinRoom(roomID, markAsLargeRoom = false, callback) {
        UIKitCore.getInstance().joinRoom(roomID, markAsLargeRoom, callback);
    }
    static leaveRoom() {
        return UIKitCore.getInstance().leaveRoom();
    }
    static getRoom() {
        return UIKitCore.getInstance().getRoom();
    }
    static setRoomProperty(key, value) {
        UIKitCore.getInstance().setRoomProperty(key, value);
    }
    static updateRoomProperties(newProperties) {
        UIKitCore.getInstance().updateRoomProperties(newProperties);
    }
    static getRoomProperties() {
        return UIKitCore.getInstance().getRoomProperties();
    }
    static addRoomPropertyUpdateListener(listenerID, listener) {
        UIKitCore.getInstance().addRoomPropertyUpdateListener(listenerID, listener);
    }
    static removeRoomPropertyUpdateListener(listenerID) {
        UIKitCore.getInstance().removeRoomPropertyUpdateListener(listenerID);
    }
    static login(userID, userName, callback) {
        UIKitCore.getInstance().login(userID, userName, callback);
    }
    static logout() {
        UIKitCore.getInstance().logout();
    }
    static getUser(userID) {
        return UIKitCore.getInstance().getUser(userID);
    }
    static getAllUsers() {
        return UIKitCore.getInstance().getAllUsers();
    }
    static isLocalUser(userID) {
        return UIKitCore.getInstance().isLocalUser(userID);
    }
    static addUserUpdateListener(listenerID, listener) {
        UIKitCore.getInstance().addUserUpdateListener(listenerID, listener);
    }
    static removeUserUpdateListener(listenerID) {
        UIKitCore.getInstance().removeUserUpdateListener(listenerID);
    }
    static addOnOnlySelfInRoomListener(listenerID, listener) {
        UIKitCore.getInstance().addOnOnlySelfInRoomListener(listenerID, listener);
    }
    static removeOnOnlySelfInRoomListener(listenerID) {
        UIKitCore.getInstance().removeOnOnlySelfInRoomListener(listenerID);
    }
    static addAudioVideoUpdateListener(listenerID, listener) {
        UIKitCore.getInstance().addAudioVideoUpdateListener(listenerID, listener);
    }
    static removeAudioVideoUpdateListener(listenerID) {
        UIKitCore.getInstance().removeAudioVideoUpdateListener(listenerID);
    }
    static getVersion() {
        return UIKitCore.getInstance().getVersion();
    }
    static getInRoomMessages() {
        return UIKitCore.getInstance().getInRoomMessages();
    }
    static sendInRoomMessage(message, listener) {
        UIKitCore.getInstance().sendInRoomMessage(message, listener);
    }
    static addInRoomMessageReceivedListener(listenerID, listener) {
        UIKitCore.getInstance().addInRoomMessageReceivedListener(listenerID, listener);
    }
    static removeInRoomMessageReceivedListener(listenerID) {
        UIKitCore.getInstance().removeInRoomMessageReceivedListener(listenerID);
    }
    static getLocalUser() {
        return UIKitCore.getInstance().getLocalUser();
    }
    // public static IZegoUIKitSignalingPlugin getSignalingPlugin() {
    //     uiKitCore = UIKitCore.getInstance();
    //     return uiKitCore.getSignalingPlugin();
    // }
    static startPlayingAllAudioVideo() {
        UIKitCore.getInstance().startPlayingAllAudioVideo();
    }
    static stopPlayingAllAudioVideo() {
        UIKitCore.getInstance().stopPlayingAllAudioVideo();
    }
    static sendInRoomCommand(command, toUserList, callback) {
        UIKitCore.getInstance().sendInRoomCommand(command, toUserList, callback);
    }
    static addInRoomCommandListener(listenerID, listener) {
        UIKitCore.getInstance().addInRoomCommandListener(listenerID, listener);
    }
    static removeInRoomCommandListener(listenerID) {
        UIKitCore.getInstance().removeInRoomCommandListener(listenerID);
    }
    static removeUserFromRoom(userIDs) {
        UIKitCore.getInstance().removeUserFromRoom(userIDs);
    }
    static addOnMeRemovedFromRoomListener(listenerID, listener) {
        UIKitCore.getInstance().addOnMeRemovedFromRoomListener(listenerID, listener);
    }
    static removeOnMeRemovedFromRoomListener(listenerID) {
        UIKitCore.getInstance().removeOnMeRemovedFromRoomListener(listenerID);
    }
    static addRoomStateChangedListener(listenerID, listener) {
        UIKitCore.getInstance().addRoomStateUpdatedListener(listenerID, listener);
    }
    static removeRoomStateChangedListener(listenerID) {
        UIKitCore.getInstance().removeRoomStateUpdatedListener(listenerID);
    }
    static addUserCountOrPropertyChangedListener(listenerID, listener) {
        UIKitCore.getInstance().addUserCountOrPropertyChangedListener(listenerID, listener);
    }
    static removeUserCountOrPropertyChangedListener(listenerID) {
        UIKitCore.getInstance().removeUserCountOrPropertyChangedListener(listenerID);
    }
    static addTurnOnYourCameraRequestListener(listenerID, listener) {
        UIKitCore.getInstance().addTurnOnYourCameraRequestListener(listenerID, listener);
    }
    static removeTurnOnYourCameraRequestListener(listenerID) {
        UIKitCore.getInstance().removeTurnOnYourCameraRequestListener(listenerID);
    }
    static addTurnOnYourMicrophoneRequestListener(listenerID, listener) {
        UIKitCore.getInstance().addTurnOnYourMicrophoneRequestListener(listenerID, listener);
    }
    static removeTurnOnYourMicrophoneRequestListener(listenerID) {
        UIKitCore.getInstance().removeTurnOnYourMicrophoneRequestListener(listenerID);
    }
    static setAudioVideoResourceMode(mode) {
        UIKitCore.getInstance().setAudioVideoResourceMode(mode);
    }
    static setPresetVideoConfig(preset) {
        UIKitCore.getInstance().setPresetVideoConfig(preset);
    }
    static mutePlayStreamAudio(streamID, mute) {
        UIKitCore.getInstance().mutePlayStreamAudio(streamID, mute);
    }
    static mutePlayStreamVideo(streamID, mute) {
        UIKitCore.getInstance().mutePlayStreamVideo(streamID, mute);
    }
    static startMixerTask(task, callback) {
        UIKitCore.getInstance().startMixerTask(task, callback);
    }
    static stopMixerTask(task, callback) {
        UIKitCore.getInstance().stopMixerTask(task, callback);
    }
    static addEventHandler(eventHandler, autoDelete = true) {
        UIKitCore.getInstance().addEventHandler(eventHandler, autoDelete);
    }
    static removeEventHandler(eventHandler) {
        UIKitCore.getInstance().removeEventHandler(eventHandler);
    }
    static startPlayingStream(streamID, config) {
        UIKitCore.getInstance().startPlayingStream(streamID, config);
    }
    static stopPlayingStream(streamID) {
        UIKitCore.getInstance().stopPlayingStream(streamID);
    }
    static startPublishingStream(streamID) {
        UIKitCore.getInstance().startPublishingStream(streamID);
    }
    static stopPublishingStream() {
        UIKitCore.getInstance().stopPublishingStream();
    }
    static startPreview(channel) {
        UIKitCore.getInstance().startPreview(channel);
    }
    static stopPreview() {
        UIKitCore.getInstance().stopPreview();
    }
    static openMicrophone(open) {
        UIKitCore.getInstance().openMicrophone(open);
    }
    static openCamera(open) {
        UIKitCore.getInstance().openCamera(open);
    }
    static renewToken(token) {
        UIKitCore.getInstance().renewToken(token);
    }
    static setTokenWillExpireListener(listener) {
        UIKitCore.getInstance().setTokenWillExpireListener(listener);
    }
}
