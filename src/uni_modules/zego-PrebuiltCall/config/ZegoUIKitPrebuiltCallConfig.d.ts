import { ZegoAudioVideoViewConfig, ZegoLayout } from "@/uni_modules/zego-UIKitCore";
import { ZegoHangUpConfirmInfo, ZegoHangUpConfirmListener, ZegoHangUpListener, ZegoBottomMenuBarConfig, ZegoCallDurationConfig, ZegoPrebuiltVideoConfig, NetworkStatusChangeListener } from "./defines";
export declare class ZegoUIKitPrebuiltCallConfig {
    turnOnCameraWhenJoining?: boolean;
    turnOnMicrophoneWhenJoining?: boolean;
    useSpeakerWhenJoining?: boolean;
    audioVideoViewConfig: ZegoAudioVideoViewConfig;
    layout?: ZegoLayout;
    bottomMenuBarConfig: ZegoBottomMenuBarConfig;
    videoConfig: ZegoPrebuiltVideoConfig;
    hangUpConfirmInfo?: ZegoHangUpConfirmInfo;
    onHangUpConfirmation?: ZegoHangUpConfirmListener;
    onHangUp?: ZegoHangUpListener;
    onNetworkStatusChange?: NetworkStatusChangeListener;
    durationConfig?: ZegoCallDurationConfig;
    static oneOnOneVideoCall(): ZegoUIKitPrebuiltCallConfig;
    static oneOnOneVoiceCall(): ZegoUIKitPrebuiltCallConfig;
}
