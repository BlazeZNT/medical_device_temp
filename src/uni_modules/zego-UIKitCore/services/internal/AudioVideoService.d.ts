import { ZegoAudioRoute } from "../express/ZegoExpressUniApp";
import { UIKitCoreUser } from './UIKitCoreUser';
import { ZegoAudioOutputDeviceChangedListener, ZegoCameraStateChangeListener, ZegoMicrophoneStateChangeListener, ZegoSoundLevelUpdateListener, ZegoTurnOnYourCameraRequestListener, ZegoTurnOnYourMicrophoneRequestListener, ZegoUIKitUser } from '../defines';
export declare class AudioVideoService {
    private micStateListeners;
    private cameraStateListeners;
    private audioOutputListeners;
    private soundLevelListeners;
    private turnOnYourCameraRequestListeners;
    private turnOnYourMicrophoneRequestListeners;
    addMicrophoneStateListener(listenerID: string, listener: ZegoMicrophoneStateChangeListener): void;
    removeMicrophoneStateListener(listenerID: string): void;
    addCameraStateListener(listenerID: string, listener: ZegoCameraStateChangeListener): void;
    removeCameraStateListener(listenerID: string): void;
    addAudioOutputDeviceChangedListener(listenerID: string, listener: ZegoAudioOutputDeviceChangedListener): Promise<void>;
    removeAudioOutputDeviceChangedListener(listenerID: string): void;
    addTurnOnYourCameraRequestListener(listenerID: string, listener: ZegoTurnOnYourCameraRequestListener): void;
    removeTurnOnYourCameraRequestListener(listenerID: string): void;
    addTurnOnYourMicrophoneRequestListener(listenerID: string, listener: ZegoTurnOnYourMicrophoneRequestListener): void;
    removeTurnOnYourMicrophoneRequestListener(listenerID: string): void;
    addSoundLevelUpdatedListener(listenerID: string, listener: ZegoSoundLevelUpdateListener): void;
    removeSoundLevelUpdatedListener(listenerID: string): void;
    clear(): void;
    notifyAudioRouteChange(zegoAudioRoute: ZegoAudioRoute): void;
    notifyMicStateChange(coreUser: UIKitCoreUser, on: boolean): void;
    notifyCameraStateChange(coreUser: UIKitCoreUser, on: boolean): void;
    notifySoundLevelUpdate(userID: string, soundLevel: number): void;
    useFrontFacingCamera(isFrontFacing: boolean): void;
    setAudioOutputToSpeaker(enable: boolean): void;
    turnMicrophoneOn(userID: string, on: boolean): void;
    turnCameraOn(userID: string, on: boolean): void;
    startPlayingAllAudioVideo(): void;
    stopPlayingAllAudioVideo(): void;
    notifyTurnMicrophoneCommand(uiKitUser: ZegoUIKitUser, turnOn: boolean): void;
    notifyTurnCameraCommand(uiKitUser: ZegoUIKitUser, turnOn: boolean): void;
    openCamera(open: boolean): void;
    openMicrophone(open: boolean): void;
}