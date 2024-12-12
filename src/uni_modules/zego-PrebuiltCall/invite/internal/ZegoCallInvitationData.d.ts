import { ZegoUIKitUser } from "@/uni_modules/zego-UIKitCore";
import { ZegoInvitationType } from "../ZegoInvitationType";
export declare class ZegoCallInvitationData {
    callID: string;
    type: ZegoInvitationType;
    invitees: ZegoUIKitUser[];
    inviter: ZegoUIKitUser;
    customData: string;
    invitationID?: string;
    constructor(callID: string, type: ZegoInvitationType, invitees: ZegoUIKitUser[], inviter: ZegoUIKitUser, customData: string, invitationID?: string);
}
