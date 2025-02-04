import { ZegoAudioVideoUpdateListener, ZegoScreenSharingUpdateListener, RoomStateChangedListener, ZegoRoomPropertyUpdateListener, ZegoInRoomCommandListener, ZegoSendInRoomCommandCallback, ZegoUIKitCallback, ZegoUIKitUser, ZegoRoomLogoutCallback } from '../defines';
import { ZegoUpdateType, ZegoStream, ZegoUser, ZegoRoomStateChangedReason } from "../express/ZegoExpressUniApp";
export default class RoomService {
    private mainStreamUpdateListeners;
    private shareStreamUpdateListeners;
    private roomStateChangedListeners;
    private roomPropertyUpdateListeners;
    private inRoomCommandListenerNotifyList;
    addRoomStateUpdatedListener(listenerID: string, listener: RoomStateChangedListener): void;
    removeRoomStateUpdatedListener(listenerID: string): void;
    addRoomPropertyUpdatedListener(listenerID: string, listener: ZegoRoomPropertyUpdateListener): void;
    removeRoomPropertyUpdatedListener(listenerID: string): void;
    addInRoomCommandListener(listenerID: string, listener: ZegoInRoomCommandListener): void;
    removeInRoomCommandListener(listenerID: string): void;
    addScreenSharingUpdateListener(listenerID: string, listener: ZegoScreenSharingUpdateListener): void;
    removeScreenSharingUpdateListener(listenerID: string): void;
    clear(): void;
    clearOtherListeners(): void;
    clearRoomStateListeners(): void;
    notifyStreamUpdate(roomID: string, zegoUpdateType: ZegoUpdateType, streamList: ZegoStream[], jsonObject: any): void;
    notifyRoomStateUpdate(roomID: string, reason: ZegoRoomStateChangedReason, errorCode: number, jsonObject: any): void;
    addAudioVideoUpdateListener(listenerID: string, listener: ZegoAudioVideoUpdateListener): void;
    removeAudioVideoUpdateListener(listenerID: string): void;
    notifyAudioVideoAvailable(mainUserList: ZegoUIKitUser[]): void;
    joinRoom(roomID: string, token: string, callback?: ZegoUIKitCallback): Promise<void>;
    leaveRoom(roomID?: string, callback?: ZegoRoomLogoutCallback): Promise<void>;
    setRoomProperty(roomID: string, key: string, value: string, callback?: ZegoUIKitCallback): Promise<void>;
    notifyRoomPropertyUpdate(key: string, oldValue: string, value: string): void;
    notifyRoomPropertiesFullUpdated(keys: string[], oldProperties: Record<string, string>, roomProperties: Record<string, string>): void;
    sendInRoomCommand(roomID: string, command: string, toUserList: string[], callback?: ZegoSendInRoomCommandCallback): Promise<void>;
    notifyIMRecvCustomCommand(roomID: string, fromUser: ZegoUser, command: string): void;
}
