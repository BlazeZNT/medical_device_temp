import { NotifyList } from './NotifyList';
import { ZegoUpdateType } from "../express/ZegoExpressUniApp";
import { ExpressEngineProxy } from '../express/ExpressEngineProxy';
import UIKitCore from './UIKitCore';
import { zlogerror, zloginfo } from '../../utils';
const TAG = '[RoomService]';
export default class RoomService {
    mainStreamUpdateListeners = new NotifyList();
    shareStreamUpdateListeners = new NotifyList();
    roomStateChangedListeners = new NotifyList();
    roomPropertyUpdateListeners = new NotifyList();
    inRoomCommandListenerNotifyList = new NotifyList();
    addRoomStateUpdatedListener(listenerID, listener) {
        this.roomStateChangedListeners.addListener(listenerID, listener);
    }
    removeRoomStateUpdatedListener(listenerID) {
        this.roomStateChangedListeners.removeListener(listenerID);
    }
    addRoomPropertyUpdatedListener(listenerID, listener) {
        this.roomPropertyUpdateListeners.addListener(listenerID, listener);
    }
    removeRoomPropertyUpdatedListener(listenerID) {
        this.roomPropertyUpdateListeners.removeListener(listenerID);
    }
    addInRoomCommandListener(listenerID, listener) {
        this.inRoomCommandListenerNotifyList.addListener(listenerID, listener);
    }
    removeInRoomCommandListener(listenerID) {
        this.inRoomCommandListenerNotifyList.removeListener(listenerID);
    }
    addScreenSharingUpdateListener(listenerID, listener) {
        this.shareStreamUpdateListeners.addListener(listenerID, listener);
    }
    removeScreenSharingUpdateListener(listenerID) {
        this.shareStreamUpdateListeners.removeListener(listenerID);
    }
    clear() {
        this.clearOtherListeners();
        this.clearRoomStateListeners();
    }
    clearOtherListeners() {
        this.mainStreamUpdateListeners.clear();
        this.roomPropertyUpdateListeners.clear();
        this.inRoomCommandListenerNotifyList.clear();
        this.shareStreamUpdateListeners.clear();
    }
    clearRoomStateListeners() {
        this.roomStateChangedListeners.clear();
    }
    notifyStreamUpdate(roomID, zegoUpdateType, streamList, jsonObject) {
        const mainStreamList = streamList.filter(stream => stream.streamID.includes("main"));
        const shareStreamList = streamList.filter(stream => !stream.streamID.includes("main"));
        const mainUserList = mainStreamList.map(stream => ({
            userID: stream.user.userID,
            userName: stream.user.userName,
            streamID: stream.streamID,
        }));
        const shareUserList = shareStreamList.map(stream => ({
            userID: stream.user.userID,
            userName: stream.user.userName,
            streamID: stream.streamID,
        }));
        if (zegoUpdateType === ZegoUpdateType.Add) {
            if (mainUserList.length > 0) {
                this.mainStreamUpdateListeners.notifyAllListener(audioVideoUpdateListener => {
                    audioVideoUpdateListener.onAudioVideoAvailable?.(mainUserList);
                });
            }
            if (shareUserList.length > 0) {
                this.shareStreamUpdateListeners.notifyAllListener(screenSharingUpdateListener => {
                    screenSharingUpdateListener.onScreenSharingAvailable?.(shareUserList);
                });
            }
        }
        else {
            if (mainUserList.length > 0) {
                this.mainStreamUpdateListeners.notifyAllListener(audioVideoUpdateListener => {
                    audioVideoUpdateListener.onAudioVideoUnAvailable?.(mainUserList);
                });
            }
            if (shareUserList.length > 0) {
                this.shareStreamUpdateListeners.notifyAllListener(screenSharingUpdateListener => {
                    screenSharingUpdateListener.onScreenSharingUnAvailable?.(shareUserList);
                });
            }
        }
    }
    notifyRoomStateUpdate(roomID, reason, errorCode, jsonObject) {
        this.roomStateChangedListeners.notifyAllListener(roomStateChangedListener => {
            roomStateChangedListener.onRoomStateChanged?.(roomID, reason, errorCode, jsonObject);
        });
    }
    addAudioVideoUpdateListener(listenerID, listener) {
        this.mainStreamUpdateListeners.addListener(listenerID, listener);
    }
    removeAudioVideoUpdateListener(listenerID) {
        this.mainStreamUpdateListeners.removeListener(listenerID);
    }
    notifyAudioVideoAvailable(mainUserList) {
        if (mainUserList.length > 0) {
            this.mainStreamUpdateListeners.notifyAllListener(audioVideoUpdateListener => {
                audioVideoUpdateListener.onAudioVideoAvailable?.(mainUserList);
            });
        }
    }
    async joinRoom(roomID, token, callback) {
        const localUser = UIKitCore.getInstance().getLocalCoreUser();
        zloginfo(`${TAG} joinRoom for ${roomID}, localUser=${JSON.stringify(localUser)}`);
        if (localUser) {
            const user = {
                userID: localUser.userID,
                userName: localUser.userName
            };
            const config = {
                maxMemberCount: 0,
                isUserStatusNotify: true,
                token: ''
            };
            if (token) {
                config.token = token;
            }
            const result = await ExpressEngineProxy.loginRoom(roomID, user, config);
            if (!result) {
                zlogerror(`${TAG} loginRoom fail! ${JSON.stringify(result)}`);
            }
            else {
                zloginfo(`${TAG} loginRoom success`);
            }
            if (callback) {
                callback(result?.errorCode ?? 0);
            }
        }
    }
    async leaveRoom(roomID, callback) {
        const result = await ExpressEngineProxy.logoutRoom(roomID);
        zloginfo(`${TAG} leaveRoom for ${roomID}, result:`, result);
        if (callback) {
            callback.onRoomLogoutResult?.(result?.errorCode ?? 0, result?.extendedData);
        }
    }
    async setRoomProperty(roomID, key, value, callback) {
        const result = await ExpressEngineProxy.setRoomExtraInfo(roomID, key, value);
        if (callback) {
            callback(result?.errorCode ?? 0);
        }
    }
    notifyRoomPropertyUpdate(key, oldValue, value) {
        this.roomPropertyUpdateListeners.notifyAllListener(roomPropertyUpdateListener => {
            roomPropertyUpdateListener.onRoomPropertyUpdated?.(key, oldValue, value);
        });
    }
    notifyRoomPropertiesFullUpdated(keys, oldProperties, roomProperties) {
        this.roomPropertyUpdateListeners.notifyAllListener(roomPropertyUpdateListener => {
            roomPropertyUpdateListener.onRoomPropertiesFullUpdated?.(keys, oldProperties, roomProperties);
        });
    }
    async sendInRoomCommand(roomID, command, toUserList, callback) {
        const zegoUserList = toUserList
            .map(userID => UIKitCore.getInstance().getUser(userID))
            .filter(user => !!user)
            .map(uiKitUser => ({
            userID: uiKitUser.userID,
            userName: uiKitUser.userName
        }));
        const result = await ExpressEngineProxy.sendCustomCommand(roomID, command, zegoUserList);
        if (callback) {
            callback.onSend?.(result.errorCode);
        }
    }
    notifyIMRecvCustomCommand(roomID, fromUser, command) {
        this.inRoomCommandListenerNotifyList.notifyAllListener(zegoInRoomCommandListener => {
            const uiKitUser = {
                userID: fromUser.userID,
                userName: fromUser.userName
            };
            zegoInRoomCommandListener.onInRoomCommandReceived?.(uiKitUser, command);
        });
    }
}
