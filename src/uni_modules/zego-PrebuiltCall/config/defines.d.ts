/// <reference types="@dcloudio/types" />
import { ZegoPresetResolution, ZegoVideoConfig } from "@/uni_modules/zego-UIKitCore";
/**
 * 定义直播菜单栏按钮名称的枚举类型。
 */
export declare enum ZegoMenuBarButtonName {
    /**
     * 切换摄像头按钮
     */
    ToggleCameraButton = 0,
    /**
     * 切换麦克风按钮
     */
    ToggleMicrophoneButton = 1,
    /**
     * 切换音频输出按钮
     */
    SwitchAudioOutputButton = 2,
    /**
     * 挂断按钮
     */
    HangUpButton = 3,
    /**
     * 切换前后置摄像头按钮
     */
    SwitchCameraButton = 4
}
export declare enum ZegoMenuBarStyle {
    Light = 0,
    Dark = 1
}
/**
 * 通话界面下方的 buttonbar 配置
 */
export declare class ZegoBottomMenuBarConfig {
    buttons: ZegoMenuBarButtonName[];
    maxCount?: number;
    hideAutomatically?: boolean;
    hideByClick?: boolean;
}
/**
 * 各种按钮的图片自定义, 不传就用默认的
 */
export interface ZegoMenuBarButtonConfig {
    toggleCameraOnImage: string;
    toggleCameraOffImage: string;
    toggleMicrophoneOnImage: string;
    toggleMicrophoneOffImage: string;
    hangUpButtonImage: string;
    switchCameraFrontImage: string;
    switchCameraBackImage: string;
    showMemberListButtonImage: string;
    audioOutputSpeakerImage: string;
    audioOutputHeadphoneImage: string;
    audioOutputBluetoothImage: string;
}
export declare class ZegoPrebuiltVideoConfig {
    resolution: ZegoPresetResolution;
    config?: ZegoVideoConfig;
}
/**
 * 挂点电话的弹框配置
 */
export interface ZegoHangUpConfirmInfo {
    title?: string;
    message?: string;
    cancelButtonName?: string;
    confirmButtonName?: string;
}
export type ZegoHangUpListener = (seconds: number) => void;
export type NetworkType = 'wifi' | '2g' | '3g' | '4g' | '5g' | 'ethernet' | 'unknown' | 'none';
export type NetworkStatusChangeListener = (res: UniNamespace.OnNetworkStatusChangeSuccess) => void;
export type ZegoHangUpConfirmListener = () => Promise<boolean>;
export type ZegoDurationUpdateListener = (seconds: number) => void;
export interface ZegoCallDurationConfig {
    showDuration?: boolean;
    onDurationUpdate?: ZegoDurationUpdateListener;
}
