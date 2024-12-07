// MARK: - enum
export var ZIMGeofencingType;
(function (ZIMGeofencingType) {
    ZIMGeofencingType[ZIMGeofencingType["None"] = 0] = "None";
    ZIMGeofencingType[ZIMGeofencingType["Include"] = 1] = "Include";
    ZIMGeofencingType[ZIMGeofencingType["Exclude"] = 2] = "Exclude";
})(ZIMGeofencingType || (ZIMGeofencingType = {}));
export var ZIMCXHandleType;
(function (ZIMCXHandleType) {
    ZIMCXHandleType[ZIMCXHandleType["Generic"] = 1] = "Generic";
    ZIMCXHandleType[ZIMCXHandleType["PhoneNumber"] = 2] = "PhoneNumber";
    ZIMCXHandleType[ZIMCXHandleType["EmailAddress"] = 3] = "EmailAddress";
})(ZIMCXHandleType || (ZIMCXHandleType = {}));
export var ZIMConnectionState;
(function (ZIMConnectionState) {
    ZIMConnectionState[ZIMConnectionState["Disconnected"] = 0] = "Disconnected";
    ZIMConnectionState[ZIMConnectionState["Connecting"] = 1] = "Connecting";
    ZIMConnectionState[ZIMConnectionState["Connected"] = 2] = "Connected";
    ZIMConnectionState[ZIMConnectionState["Reconnecting"] = 3] = "Reconnecting";
})(ZIMConnectionState || (ZIMConnectionState = {}));
export var ZIMConnectionEvent;
(function (ZIMConnectionEvent) {
    ZIMConnectionEvent[ZIMConnectionEvent["Success"] = 0] = "Success";
    ZIMConnectionEvent[ZIMConnectionEvent["ActiveLogin"] = 1] = "ActiveLogin";
    ZIMConnectionEvent[ZIMConnectionEvent["LoginTimeout"] = 2] = "LoginTimeout";
    ZIMConnectionEvent[ZIMConnectionEvent["LoginInterrupted"] = 3] = "LoginInterrupted";
    ZIMConnectionEvent[ZIMConnectionEvent["KickedOut"] = 4] = "KickedOut";
})(ZIMConnectionEvent || (ZIMConnectionEvent = {}));
export var ZIMUserOnlineStatus;
(function (ZIMUserOnlineStatus) {
    ZIMUserOnlineStatus[ZIMUserOnlineStatus["Online"] = 0] = "Online";
    ZIMUserOnlineStatus[ZIMUserOnlineStatus["Offline"] = 1] = "Offline";
    ZIMUserOnlineStatus[ZIMUserOnlineStatus["Logout"] = 2] = "Logout";
})(ZIMUserOnlineStatus || (ZIMUserOnlineStatus = {}));
export var ZIMConversationType;
(function (ZIMConversationType) {
    ZIMConversationType[ZIMConversationType["Peer"] = 0] = "Peer";
    ZIMConversationType[ZIMConversationType["Room"] = 1] = "Room";
    ZIMConversationType[ZIMConversationType["Group"] = 2] = "Group";
})(ZIMConversationType || (ZIMConversationType = {}));
export var ZIMConversationEvent;
(function (ZIMConversationEvent) {
    ZIMConversationEvent[ZIMConversationEvent["Added"] = 0] = "Added";
    ZIMConversationEvent[ZIMConversationEvent["Updated"] = 1] = "Updated";
    ZIMConversationEvent[ZIMConversationEvent["Disabled"] = 2] = "Disabled";
    ZIMConversationEvent[ZIMConversationEvent["Deleted"] = 3] = "Deleted";
})(ZIMConversationEvent || (ZIMConversationEvent = {}));
export var ZIMConversationNotificationStatus;
(function (ZIMConversationNotificationStatus) {
    ZIMConversationNotificationStatus[ZIMConversationNotificationStatus["Notify"] = 1] = "Notify";
    ZIMConversationNotificationStatus[ZIMConversationNotificationStatus["DoNotDisturb"] = 2] = "DoNotDisturb";
})(ZIMConversationNotificationStatus || (ZIMConversationNotificationStatus = {}));
export var ZIMMessagePriority;
(function (ZIMMessagePriority) {
    ZIMMessagePriority[ZIMMessagePriority["Low"] = 1] = "Low";
    ZIMMessagePriority[ZIMMessagePriority["Medium"] = 2] = "Medium";
    ZIMMessagePriority[ZIMMessagePriority["High"] = 3] = "High";
})(ZIMMessagePriority || (ZIMMessagePriority = {}));
export var ZIMMessageType;
(function (ZIMMessageType) {
    ZIMMessageType[ZIMMessageType["Unknown"] = 0] = "Unknown";
    ZIMMessageType[ZIMMessageType["Text"] = 1] = "Text";
    ZIMMessageType[ZIMMessageType["Command"] = 2] = "Command";
    ZIMMessageType[ZIMMessageType["Image"] = 11] = "Image";
    ZIMMessageType[ZIMMessageType["File"] = 12] = "File";
    ZIMMessageType[ZIMMessageType["Audio"] = 13] = "Audio";
    ZIMMessageType[ZIMMessageType["Video"] = 14] = "Video";
    ZIMMessageType[ZIMMessageType["Barrage"] = 20] = "Barrage";
    ZIMMessageType[ZIMMessageType["System"] = 30] = "System";
    ZIMMessageType[ZIMMessageType["Revoke"] = 31] = "Revoke";
    ZIMMessageType[ZIMMessageType["Tips"] = 32] = "Tips";
    ZIMMessageType[ZIMMessageType["Combine"] = 100] = "Combine";
    ZIMMessageType[ZIMMessageType["Custom"] = 200] = "Custom";
})(ZIMMessageType || (ZIMMessageType = {}));
export var ZIMMessageSentStatus;
(function (ZIMMessageSentStatus) {
    ZIMMessageSentStatus[ZIMMessageSentStatus["Sending"] = 0] = "Sending";
    ZIMMessageSentStatus[ZIMMessageSentStatus["Success"] = 1] = "Success";
    ZIMMessageSentStatus[ZIMMessageSentStatus["Failed"] = 2] = "Failed";
})(ZIMMessageSentStatus || (ZIMMessageSentStatus = {}));
export var ZIMMessageDirection;
(function (ZIMMessageDirection) {
    ZIMMessageDirection[ZIMMessageDirection["Send"] = 0] = "Send";
    ZIMMessageDirection[ZIMMessageDirection["Receive"] = 1] = "Receive";
})(ZIMMessageDirection || (ZIMMessageDirection = {}));
export var ZIMMessageOrder;
(function (ZIMMessageOrder) {
    ZIMMessageOrder[ZIMMessageOrder["Descending"] = 0] = "Descending";
    ZIMMessageOrder[ZIMMessageOrder["Ascending"] = 1] = "Ascending";
})(ZIMMessageOrder || (ZIMMessageOrder = {}));
export var ZIMMessageReceiptStatus;
(function (ZIMMessageReceiptStatus) {
    ZIMMessageReceiptStatus[ZIMMessageReceiptStatus["None"] = 0] = "None";
    ZIMMessageReceiptStatus[ZIMMessageReceiptStatus["Processing"] = 1] = "Processing";
    ZIMMessageReceiptStatus[ZIMMessageReceiptStatus["Done"] = 2] = "Done";
    ZIMMessageReceiptStatus[ZIMMessageReceiptStatus["Expired"] = 3] = "Expired";
    ZIMMessageReceiptStatus[ZIMMessageReceiptStatus["Failed"] = 4] = "Failed";
})(ZIMMessageReceiptStatus || (ZIMMessageReceiptStatus = {}));
export var ZIMMessageRevokeStatus;
(function (ZIMMessageRevokeStatus) {
    ZIMMessageRevokeStatus[ZIMMessageRevokeStatus["Unknown"] = -1] = "Unknown";
    ZIMMessageRevokeStatus[ZIMMessageRevokeStatus["SelfRevoke"] = 0] = "SelfRevoke";
    ZIMMessageRevokeStatus[ZIMMessageRevokeStatus["SystemRevoke"] = 1] = "SystemRevoke";
    ZIMMessageRevokeStatus[ZIMMessageRevokeStatus["ServiceAPIRevoke"] = 2] = "ServiceAPIRevoke";
    ZIMMessageRevokeStatus[ZIMMessageRevokeStatus["GroupAdminRevoke"] = 3] = "GroupAdminRevoke";
    ZIMMessageRevokeStatus[ZIMMessageRevokeStatus["GroupOwnerRevoke"] = 4] = "GroupOwnerRevoke";
})(ZIMMessageRevokeStatus || (ZIMMessageRevokeStatus = {}));
export var ZIMRevokeType;
(function (ZIMRevokeType) {
    ZIMRevokeType[ZIMRevokeType["TwoWay"] = 0] = "TwoWay";
    ZIMRevokeType[ZIMRevokeType["OneWay"] = 1] = "OneWay";
})(ZIMRevokeType || (ZIMRevokeType = {}));
export var ZIMMediaFileType;
(function (ZIMMediaFileType) {
    ZIMMediaFileType[ZIMMediaFileType["OriginalFile"] = 1] = "OriginalFile";
    ZIMMediaFileType[ZIMMediaFileType["LargeImage"] = 2] = "LargeImage";
    ZIMMediaFileType[ZIMMediaFileType["Thumbnail"] = 3] = "Thumbnail";
    ZIMMediaFileType[ZIMMediaFileType["VideoFirstFrame"] = 4] = "VideoFirstFrame";
})(ZIMMediaFileType || (ZIMMediaFileType = {}));
export var ZIMMessageRepliedInfoState;
(function (ZIMMessageRepliedInfoState) {
    ZIMMessageRepliedInfoState[ZIMMessageRepliedInfoState["Normal"] = 0] = "Normal";
    ZIMMessageRepliedInfoState[ZIMMessageRepliedInfoState["Deleted"] = 1] = "Deleted";
    ZIMMessageRepliedInfoState[ZIMMessageRepliedInfoState["NotFound"] = 2] = "NotFound";
})(ZIMMessageRepliedInfoState || (ZIMMessageRepliedInfoState = {}));
export var ZIMRoomState;
(function (ZIMRoomState) {
    ZIMRoomState[ZIMRoomState["Disconnected"] = 0] = "Disconnected";
    ZIMRoomState[ZIMRoomState["Connecting"] = 1] = "Connecting";
    ZIMRoomState[ZIMRoomState["Connected"] = 2] = "Connected";
})(ZIMRoomState || (ZIMRoomState = {}));
export var ZIMRoomEvent;
(function (ZIMRoomEvent) {
    ZIMRoomEvent[ZIMRoomEvent["Success"] = 0] = "Success";
    ZIMRoomEvent[ZIMRoomEvent["NetworkInterrupted"] = 1] = "NetworkInterrupted";
    ZIMRoomEvent[ZIMRoomEvent["NetworkDisconnected"] = 2] = "NetworkDisconnected";
    ZIMRoomEvent[ZIMRoomEvent["RoomNotExist"] = 3] = "RoomNotExist";
    ZIMRoomEvent[ZIMRoomEvent["ActiveCreate"] = 4] = "ActiveCreate";
    ZIMRoomEvent[ZIMRoomEvent["CreateFailed"] = 5] = "CreateFailed";
    ZIMRoomEvent[ZIMRoomEvent["ActiveEnter"] = 6] = "ActiveEnter";
    ZIMRoomEvent[ZIMRoomEvent["EnterFailed"] = 7] = "EnterFailed";
    ZIMRoomEvent[ZIMRoomEvent["KickedOut"] = 8] = "KickedOut";
    ZIMRoomEvent[ZIMRoomEvent["ConnectTimeout"] = 9] = "ConnectTimeout";
    ZIMRoomEvent[ZIMRoomEvent["KickedOutByOtherDevice"] = 10] = "KickedOutByOtherDevice";
})(ZIMRoomEvent || (ZIMRoomEvent = {}));
export var ZIMRoomAttributesUpdateAction;
(function (ZIMRoomAttributesUpdateAction) {
    ZIMRoomAttributesUpdateAction[ZIMRoomAttributesUpdateAction["Set"] = 0] = "Set";
    ZIMRoomAttributesUpdateAction[ZIMRoomAttributesUpdateAction["Delete"] = 1] = "Delete";
})(ZIMRoomAttributesUpdateAction || (ZIMRoomAttributesUpdateAction = {}));
export var ZIMGroupMessageNotificationStatus;
(function (ZIMGroupMessageNotificationStatus) {
    ZIMGroupMessageNotificationStatus[ZIMGroupMessageNotificationStatus["Notify"] = 1] = "Notify";
    ZIMGroupMessageNotificationStatus[ZIMGroupMessageNotificationStatus["Disturb"] = 2] = "Disturb";
})(ZIMGroupMessageNotificationStatus || (ZIMGroupMessageNotificationStatus = {}));
export var ZIMGroupState;
(function (ZIMGroupState) {
    ZIMGroupState[ZIMGroupState["Quit"] = 0] = "Quit";
    ZIMGroupState[ZIMGroupState["Enter"] = 1] = "Enter";
})(ZIMGroupState || (ZIMGroupState = {}));
export var ZIMGroupEvent;
(function (ZIMGroupEvent) {
    ZIMGroupEvent[ZIMGroupEvent["Created"] = 1] = "Created";
    ZIMGroupEvent[ZIMGroupEvent["Dismissed"] = 2] = "Dismissed";
    ZIMGroupEvent[ZIMGroupEvent["Joined"] = 3] = "Joined";
    ZIMGroupEvent[ZIMGroupEvent["Invited"] = 4] = "Invited";
    ZIMGroupEvent[ZIMGroupEvent["Left"] = 5] = "Left";
    ZIMGroupEvent[ZIMGroupEvent["KickedOut"] = 6] = "KickedOut";
})(ZIMGroupEvent || (ZIMGroupEvent = {}));
export var ZIMGroupMemberState;
(function (ZIMGroupMemberState) {
    ZIMGroupMemberState[ZIMGroupMemberState["Quit"] = 0] = "Quit";
    ZIMGroupMemberState[ZIMGroupMemberState["Enter"] = 1] = "Enter";
})(ZIMGroupMemberState || (ZIMGroupMemberState = {}));
export var ZIMGroupMemberEvent;
(function (ZIMGroupMemberEvent) {
    ZIMGroupMemberEvent[ZIMGroupMemberEvent["Joined"] = 1] = "Joined";
    ZIMGroupMemberEvent[ZIMGroupMemberEvent["Left"] = 2] = "Left";
    ZIMGroupMemberEvent[ZIMGroupMemberEvent["KickedOut"] = 4] = "KickedOut";
    ZIMGroupMemberEvent[ZIMGroupMemberEvent["Invited"] = 5] = "Invited";
})(ZIMGroupMemberEvent || (ZIMGroupMemberEvent = {}));
export var ZIMGroupMemberRole;
(function (ZIMGroupMemberRole) {
    ZIMGroupMemberRole[ZIMGroupMemberRole["Owner"] = 1] = "Owner";
    ZIMGroupMemberRole[ZIMGroupMemberRole["Member"] = 3] = "Member";
})(ZIMGroupMemberRole || (ZIMGroupMemberRole = {}));
export var ZIMGroupAttributesUpdateAction;
(function (ZIMGroupAttributesUpdateAction) {
    ZIMGroupAttributesUpdateAction[ZIMGroupAttributesUpdateAction["Set"] = 0] = "Set";
    ZIMGroupAttributesUpdateAction[ZIMGroupAttributesUpdateAction["Delete"] = 1] = "Delete";
})(ZIMGroupAttributesUpdateAction || (ZIMGroupAttributesUpdateAction = {}));
export var ZIMCallInvitationMode;
(function (ZIMCallInvitationMode) {
    ZIMCallInvitationMode[ZIMCallInvitationMode["Unknown"] = -1] = "Unknown";
    ZIMCallInvitationMode[ZIMCallInvitationMode["General"] = 0] = "General";
    ZIMCallInvitationMode[ZIMCallInvitationMode["Advanced"] = 1] = "Advanced";
})(ZIMCallInvitationMode || (ZIMCallInvitationMode = {}));
export var ZIMCallState;
(function (ZIMCallState) {
    ZIMCallState[ZIMCallState["Unknown"] = -1] = "Unknown";
    ZIMCallState[ZIMCallState["Started"] = 1] = "Started";
    ZIMCallState[ZIMCallState["Ended"] = 2] = "Ended";
})(ZIMCallState || (ZIMCallState = {}));
export var ZIMCallUserState;
(function (ZIMCallUserState) {
    ZIMCallUserState[ZIMCallUserState["Unknown"] = -1] = "Unknown";
    ZIMCallUserState[ZIMCallUserState["Inviting"] = 0] = "Inviting";
    ZIMCallUserState[ZIMCallUserState["Accepted"] = 1] = "Accepted";
    ZIMCallUserState[ZIMCallUserState["Rejected"] = 2] = "Rejected";
    ZIMCallUserState[ZIMCallUserState["Cancelled"] = 3] = "Cancelled";
    ZIMCallUserState[ZIMCallUserState["Offline"] = 4] = "Offline";
    ZIMCallUserState[ZIMCallUserState["Received"] = 5] = "Received";
    ZIMCallUserState[ZIMCallUserState["Timeout"] = 6] = "Timeout";
    ZIMCallUserState[ZIMCallUserState["Quit"] = 7] = "Quit";
    ZIMCallUserState[ZIMCallUserState["Ended"] = 8] = "Ended";
    ZIMCallUserState[ZIMCallUserState["NotYetReceived"] = 9] = "NotYetReceived";
    ZIMCallUserState[ZIMCallUserState["BeCancelled"] = 10] = "BeCancelled";
})(ZIMCallUserState || (ZIMCallUserState = {}));
export var ZIMMessageMentionedType;
(function (ZIMMessageMentionedType) {
    ZIMMessageMentionedType[ZIMMessageMentionedType["MentionMe"] = 1] = "MentionMe";
    ZIMMessageMentionedType[ZIMMessageMentionedType["MentionAll"] = 2] = "MentionAll";
    ZIMMessageMentionedType[ZIMMessageMentionedType["MentionAllAndMe"] = 3] = "MentionAllAndMe";
})(ZIMMessageMentionedType || (ZIMMessageMentionedType = {}));
export var ZIMTipsMessageEvent;
(function (ZIMTipsMessageEvent) {
    ZIMTipsMessageEvent[ZIMTipsMessageEvent["Unknown"] = 0] = "Unknown";
    ZIMTipsMessageEvent[ZIMTipsMessageEvent["GroupCreated"] = 1] = "GroupCreated";
    ZIMTipsMessageEvent[ZIMTipsMessageEvent["GroupDismissed"] = 2] = "GroupDismissed";
    ZIMTipsMessageEvent[ZIMTipsMessageEvent["GroupJoined"] = 3] = "GroupJoined";
    ZIMTipsMessageEvent[ZIMTipsMessageEvent["GroupInvited"] = 4] = "GroupInvited";
    ZIMTipsMessageEvent[ZIMTipsMessageEvent["GroupLeft"] = 5] = "GroupLeft";
    ZIMTipsMessageEvent[ZIMTipsMessageEvent["GroupKickedOut"] = 6] = "GroupKickedOut";
    // 群资料更新（名称、头像、公告、禁言）
    ZIMTipsMessageEvent[ZIMTipsMessageEvent["GroupInfoChanged"] = 7] = "GroupInfoChanged";
    // 群成员资料变更（角色、禁言）
    ZIMTipsMessageEvent[ZIMTipsMessageEvent["GroupMemberInfoChanged"] = 8] = "GroupMemberInfoChanged";
})(ZIMTipsMessageEvent || (ZIMTipsMessageEvent = {}));
export var ZIMTipsMessageChangeInfoType;
(function (ZIMTipsMessageChangeInfoType) {
    // 0-9 群资料
    ZIMTipsMessageChangeInfoType[ZIMTipsMessageChangeInfoType["GroupDataChanged"] = 1] = "GroupDataChanged";
    ZIMTipsMessageChangeInfoType[ZIMTipsMessageChangeInfoType["GroupNoticeChanged"] = 2] = "GroupNoticeChanged";
    ZIMTipsMessageChangeInfoType[ZIMTipsMessageChangeInfoType["GroupNameChanged"] = 3] = "GroupNameChanged";
    ZIMTipsMessageChangeInfoType[ZIMTipsMessageChangeInfoType["GroupAvatarUrlChanged"] = 4] = "GroupAvatarUrlChanged";
    ZIMTipsMessageChangeInfoType[ZIMTipsMessageChangeInfoType["GroupMuteChanged"] = 5] = "GroupMuteChanged";
    // 10-19 群成员资料
    ZIMTipsMessageChangeInfoType[ZIMTipsMessageChangeInfoType["GroupOwnerTransferred"] = 10] = "GroupOwnerTransferred";
    ZIMTipsMessageChangeInfoType[ZIMTipsMessageChangeInfoType["GroupMemberRoleChanged"] = 11] = "GroupMemberRoleChanged";
    ZIMTipsMessageChangeInfoType[ZIMTipsMessageChangeInfoType["GroupMemberMuteChanged"] = 12] = "GroupMemberMuteChanged";
})(ZIMTipsMessageChangeInfoType || (ZIMTipsMessageChangeInfoType = {}));
export var ZIMGroupEnterType;
(function (ZIMGroupEnterType) {
    ZIMGroupEnterType[ZIMGroupEnterType["Unknown"] = 0] = "Unknown";
    ZIMGroupEnterType[ZIMGroupEnterType["Created"] = 1] = "Created";
    ZIMGroupEnterType[ZIMGroupEnterType["JoinApply"] = 2] = "JoinApply";
    ZIMGroupEnterType[ZIMGroupEnterType["Joined"] = 3] = "Joined";
    ZIMGroupEnterType[ZIMGroupEnterType["Invited"] = 4] = "Invited";
    ZIMGroupEnterType[ZIMGroupEnterType["InviteApply"] = 5] = "InviteApply";
})(ZIMGroupEnterType || (ZIMGroupEnterType = {}));
export var ZIMGroupMuteMode;
(function (ZIMGroupMuteMode) {
    ZIMGroupMuteMode[ZIMGroupMuteMode["None"] = 0] = "None";
    ZIMGroupMuteMode[ZIMGroupMuteMode["Normal"] = 1] = "Normal";
    ZIMGroupMuteMode[ZIMGroupMuteMode["All"] = 2] = "All";
    ZIMGroupMuteMode[ZIMGroupMuteMode["Custom"] = 3] = "Custom";
})(ZIMGroupMuteMode || (ZIMGroupMuteMode = {}));
export var ZIMFriendApplicationType;
(function (ZIMFriendApplicationType) {
    ZIMFriendApplicationType[ZIMFriendApplicationType["None"] = 0] = "None";
    ZIMFriendApplicationType[ZIMFriendApplicationType["Received"] = 1] = "Received";
    ZIMFriendApplicationType[ZIMFriendApplicationType["Sent"] = 2] = "Sent";
    ZIMFriendApplicationType[ZIMFriendApplicationType["Both"] = 3] = "Both";
})(ZIMFriendApplicationType || (ZIMFriendApplicationType = {}));
export var ZIMFriendApplicationState;
(function (ZIMFriendApplicationState) {
    ZIMFriendApplicationState[ZIMFriendApplicationState["Waiting"] = 1] = "Waiting";
    ZIMFriendApplicationState[ZIMFriendApplicationState["Accepted"] = 2] = "Accepted";
    ZIMFriendApplicationState[ZIMFriendApplicationState["Rejected"] = 3] = "Rejected";
    ZIMFriendApplicationState[ZIMFriendApplicationState["Expired"] = 4] = "Expired";
    ZIMFriendApplicationState[ZIMFriendApplicationState["Disabled"] = 5] = "Disabled";
})(ZIMFriendApplicationState || (ZIMFriendApplicationState = {}));
export var ZIMFriendDeleteType;
(function (ZIMFriendDeleteType) {
    ZIMFriendDeleteType[ZIMFriendDeleteType["Both"] = 0] = "Both";
    ZIMFriendDeleteType[ZIMFriendDeleteType["Single"] = 1] = "Single";
})(ZIMFriendDeleteType || (ZIMFriendDeleteType = {}));
export var ZIMFriendRelationCheckType;
(function (ZIMFriendRelationCheckType) {
    ZIMFriendRelationCheckType[ZIMFriendRelationCheckType["Both"] = 0] = "Both";
    ZIMFriendRelationCheckType[ZIMFriendRelationCheckType["Single"] = 1] = "Single";
})(ZIMFriendRelationCheckType || (ZIMFriendRelationCheckType = {}));
export var ZIMUserRelationType;
(function (ZIMUserRelationType) {
    /** 单向校验 - A 的好友表中没有 B，但无法确定 B 的好友表中是否有 A  */
    ZIMUserRelationType[ZIMUserRelationType["SingleNo"] = 1] = "SingleNo";
    /** 单向校验 - A 的好友表中有 B，但无法确定 B 的好友表中是否有 A  */
    ZIMUserRelationType[ZIMUserRelationType["SingleHave"] = 2] = "SingleHave";
    /** 双向校验 - A 的好友表中没有 B，B 的好友表中也没有 A */
    ZIMUserRelationType[ZIMUserRelationType["BothAllNo"] = 3] = "BothAllNo";
    /** 双向校验 - A 的好友表中有 B，但 B 的好友表中没有 A */
    ZIMUserRelationType[ZIMUserRelationType["BothSelfHave"] = 4] = "BothSelfHave";
    /** 双向校验 - A 的好友表中没有 B，但 B 的好友表中有 A */
    ZIMUserRelationType[ZIMUserRelationType["BothOtherHave"] = 5] = "BothOtherHave";
    /** 双向校验 - A 的好友表中有 B，B 的好友表中也有 A */
    ZIMUserRelationType[ZIMUserRelationType["BothAllHave"] = 6] = "BothAllHave";
})(ZIMUserRelationType || (ZIMUserRelationType = {}));
export var ZIMGroupJoinMode;
(function (ZIMGroupJoinMode) {
    ZIMGroupJoinMode[ZIMGroupJoinMode["Any"] = 0] = "Any";
    ZIMGroupJoinMode[ZIMGroupJoinMode["Auth"] = 1] = "Auth";
    ZIMGroupJoinMode[ZIMGroupJoinMode["Forbid"] = 2] = "Forbid";
})(ZIMGroupJoinMode || (ZIMGroupJoinMode = {}));
export var ZIMGroupInviteMode;
(function (ZIMGroupInviteMode) {
    ZIMGroupInviteMode[ZIMGroupInviteMode["Any"] = 0] = "Any";
    ZIMGroupInviteMode[ZIMGroupInviteMode["Admin"] = 1] = "Admin";
})(ZIMGroupInviteMode || (ZIMGroupInviteMode = {}));
export var ZIMGroupBeInviteMode;
(function (ZIMGroupBeInviteMode) {
    ZIMGroupBeInviteMode[ZIMGroupBeInviteMode["None"] = 0] = "None";
    ZIMGroupBeInviteMode[ZIMGroupBeInviteMode["Auth"] = 1] = "Auth";
})(ZIMGroupBeInviteMode || (ZIMGroupBeInviteMode = {}));
export var ZIMGroupApplicationType;
(function (ZIMGroupApplicationType) {
    ZIMGroupApplicationType[ZIMGroupApplicationType["None"] = 0] = "None";
    ZIMGroupApplicationType[ZIMGroupApplicationType["Join"] = 1] = "Join";
    ZIMGroupApplicationType[ZIMGroupApplicationType["Invite"] = 2] = "Invite";
    ZIMGroupApplicationType[ZIMGroupApplicationType["BeInvite"] = 3] = "BeInvite";
})(ZIMGroupApplicationType || (ZIMGroupApplicationType = {}));
export var ZIMGroupApplicationState;
(function (ZIMGroupApplicationState) {
    ZIMGroupApplicationState[ZIMGroupApplicationState["Waiting"] = 1] = "Waiting";
    ZIMGroupApplicationState[ZIMGroupApplicationState["Accepted"] = 2] = "Accepted";
    ZIMGroupApplicationState[ZIMGroupApplicationState["Rejected"] = 3] = "Rejected";
    ZIMGroupApplicationState[ZIMGroupApplicationState["Expired"] = 4] = "Expired";
    ZIMGroupApplicationState[ZIMGroupApplicationState["Disabled"] = 5] = "Disabled";
})(ZIMGroupApplicationState || (ZIMGroupApplicationState = {}));
export var ZIMGroupVerifyType;
(function (ZIMGroupVerifyType) {
    ZIMGroupVerifyType[ZIMGroupVerifyType["Join"] = 0] = "Join";
    ZIMGroupVerifyType[ZIMGroupVerifyType["Invite"] = 1] = "Invite";
    ZIMGroupVerifyType[ZIMGroupVerifyType["BeInvite"] = 2] = "BeInvite";
})(ZIMGroupVerifyType || (ZIMGroupVerifyType = {}));
export var ZIMPlatformType;
(function (ZIMPlatformType) {
    ZIMPlatformType[ZIMPlatformType["Win"] = 1] = "Win";
    ZIMPlatformType[ZIMPlatformType["IPhoneOS"] = 2] = "IPhoneOS";
    ZIMPlatformType[ZIMPlatformType["Android"] = 3] = "Android";
    ZIMPlatformType[ZIMPlatformType["MacOS"] = 4] = "MacOS";
    ZIMPlatformType[ZIMPlatformType["Linux"] = 5] = "Linux";
    ZIMPlatformType[ZIMPlatformType["Web"] = 6] = "Web";
    ZIMPlatformType[ZIMPlatformType["MiniIProgram"] = 7] = "MiniIProgram";
    ZIMPlatformType[ZIMPlatformType["IPadOS"] = 9] = "IPadOS";
    ZIMPlatformType[ZIMPlatformType["Unknown"] = 32] = "Unknown";
})(ZIMPlatformType || (ZIMPlatformType = {}));
export var ZIMGroupApplicationListChangeAction;
(function (ZIMGroupApplicationListChangeAction) {
    ZIMGroupApplicationListChangeAction[ZIMGroupApplicationListChangeAction["Added"] = 0] = "Added";
})(ZIMGroupApplicationListChangeAction || (ZIMGroupApplicationListChangeAction = {}));
export var ZIMBlacklistChangeAction;
(function (ZIMBlacklistChangeAction) {
    ZIMBlacklistChangeAction[ZIMBlacklistChangeAction["Added"] = 0] = "Added";
    ZIMBlacklistChangeAction[ZIMBlacklistChangeAction["Removed"] = 1] = "Removed";
})(ZIMBlacklistChangeAction || (ZIMBlacklistChangeAction = {}));
export var ZIMFriendListChangeAction;
(function (ZIMFriendListChangeAction) {
    ZIMFriendListChangeAction[ZIMFriendListChangeAction["Added"] = 0] = "Added";
    ZIMFriendListChangeAction[ZIMFriendListChangeAction["Deleted"] = 1] = "Deleted";
})(ZIMFriendListChangeAction || (ZIMFriendListChangeAction = {}));
export var ZIMFriendApplicationListChangeAction;
(function (ZIMFriendApplicationListChangeAction) {
    ZIMFriendApplicationListChangeAction[ZIMFriendApplicationListChangeAction["Added"] = 0] = "Added";
})(ZIMFriendApplicationListChangeAction || (ZIMFriendApplicationListChangeAction = {}));
