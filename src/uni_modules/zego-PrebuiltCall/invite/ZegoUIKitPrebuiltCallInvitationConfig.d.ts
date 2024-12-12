import { ZegoUIKitPrebuiltCallConfig } from "../config/ZegoUIKitPrebuiltCallConfig";
import { ZegoCallInvitationData } from "./internal/ZegoCallInvitationData";
import { ZegoUIKitPrebuiltCallConfigProvider } from "./internal/ZegoUIKitPrebuiltCallConfigProvider";
export declare class ZegoUIKitPrebuiltCallInvitationConfig {
    provider?: ZegoUIKitPrebuiltCallConfigProvider;
    showDeclineButton: boolean;
    static generateDefaultConfig(invitationData: ZegoCallInvitationData): ZegoUIKitPrebuiltCallConfig;
}
