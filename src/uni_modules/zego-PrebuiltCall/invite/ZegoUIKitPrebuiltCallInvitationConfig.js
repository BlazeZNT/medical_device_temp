// TypeScript Version
import { ZegoUIKitPrebuiltCallConfig } from "../config/ZegoUIKitPrebuiltCallConfig";
import { ZegoInvitationType } from "./ZegoInvitationType";
export class ZegoUIKitPrebuiltCallInvitationConfig {
    // incomingCallRingtone?: string;
    // outgoingCallRingtone?: string;
    provider; // Assuming ZegoUIKitPrebuiltCallConfigProvider is defined elsewhere or should be replaced with actual type
    // incomingCallBackground: any; // Replace 'any' with the actual type of Drawable in your TypeScript context
    // outgoingCallBackground: any; // Replace 'any' with the actual type of Drawable in your TypeScript context
    // Indicates if the reject button is displayed. Default is true
    showDeclineButton = true;
    static generateDefaultConfig(invitationData) {
        let config;
        const isVideoCall = invitationData.type === ZegoInvitationType.VideoCall;
        const isGroupCall = invitationData.invitees.length > 1;
        /*if (isVideoCall && isGroupCall) {
            config = ZegoUIKitPrebuiltCallConfig.groupVideoCall();
        } else if (!isVideoCall && isGroupCall) {
            config = ZegoUIKitPrebuiltCallConfig.groupVoiceCall();
        } else */ if (!isVideoCall) {
            config = ZegoUIKitPrebuiltCallConfig.oneOnOneVoiceCall();
        }
        else {
            config = ZegoUIKitPrebuiltCallConfig.oneOnOneVideoCall();
        }
        return config;
    }
}
