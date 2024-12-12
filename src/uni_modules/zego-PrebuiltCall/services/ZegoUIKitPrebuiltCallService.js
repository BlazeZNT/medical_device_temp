import { Events } from "../event/Events";
import { CallInvitationServiceImpl } from "../invite/internal/CallInvitationServiceImpl";
// 还没有实现
export class ZegoUIKitPrebuiltCallService {
    static events = new Events();
    static init(appID, appSign, userID, userName, config) {
        CallInvitationServiceImpl.getInstance().init(appID, appSign);
        CallInvitationServiceImpl.getInstance().loginUser(userID, userName);
        CallInvitationServiceImpl.getInstance().setCallInvitationConfig(config);
    }
    static unInit() {
        CallInvitationServiceImpl.getInstance().unInit();
    }
    static endCall() {
        CallInvitationServiceImpl.getInstance().endCallAndInvokeCallback();
    }
    static openCamera(enable) {
        CallInvitationServiceImpl.getInstance().openCamera(enable);
    }
    static openMicrophone(enable) {
        CallInvitationServiceImpl.getInstance().openMicrophone(enable);
    }
    static isMicrophoneOn() {
        return CallInvitationServiceImpl.getInstance().isMicrophoneOn();
    }
    static isCameraOn() {
        return CallInvitationServiceImpl.getInstance().isCameraOn();
    }
}
