import { Events } from "../event/Events";
import { ZegoUIKitPrebuiltCallInvitationConfig } from "../invite/ZegoUIKitPrebuiltCallInvitationConfig";
export declare class ZegoUIKitPrebuiltCallService {
    static events: Events;
    static init(appID: number, appSign: string, userID: string, userName: string, config: ZegoUIKitPrebuiltCallInvitationConfig): void;
    static unInit(): void;
    static endCall(): void;
    static openCamera(enable: boolean): void;
    static openMicrophone(enable: boolean): void;
    static isMicrophoneOn(): boolean;
    static isCameraOn(): boolean;
}
