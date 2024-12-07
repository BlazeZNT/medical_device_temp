export var ZIMErrorCode;
(function (ZIMErrorCode) {
    // MARK: - Main
    ZIMErrorCode[ZIMErrorCode["Success"] = 0] = "Success";
    ZIMErrorCode[ZIMErrorCode["Failed"] = 1] = "Failed";
    ZIMErrorCode[ZIMErrorCode["CommonModuleParamInvalid"] = 6000001] = "CommonModuleParamInvalid";
    ZIMErrorCode[ZIMErrorCode["CommonModuleNotInit"] = 6000002] = "CommonModuleNotInit";
    ZIMErrorCode[ZIMErrorCode["CommonModuleInvalidAppID"] = 6000003] = "CommonModuleInvalidAppID";
    ZIMErrorCode[ZIMErrorCode["CommonModuleTriggerSDKFrequencyLimit"] = 6000004] = "CommonModuleTriggerSDKFrequencyLimit";
    ZIMErrorCode[ZIMErrorCode["CommonModuleTriggerServerFrequencyLimit"] = 6000005] = "CommonModuleTriggerServerFrequencyLimit";
    ZIMErrorCode[ZIMErrorCode["CommonModuleSwitchServerError"] = 6000006] = "CommonModuleSwitchServerError";
    ZIMErrorCode[ZIMErrorCode["CommonModuleIMServerError"] = 6000007] = "CommonModuleIMServerError";
    ZIMErrorCode[ZIMErrorCode["CommonModuleIMDatabaseError"] = 6000008] = "CommonModuleIMDatabaseError";
    ZIMErrorCode[ZIMErrorCode["CommonModuleIMServerDisconnect"] = 6000009] = "CommonModuleIMServerDisconnect";
    ZIMErrorCode[ZIMErrorCode["CommonModuleUploadLogError"] = 6000010] = "CommonModuleUploadLogError";
    ZIMErrorCode[ZIMErrorCode["CommonModuleUserIsNotExist"] = 6000011] = "CommonModuleUserIsNotExist";
    // MARK: - Login
    ZIMErrorCode[ZIMErrorCode["NetworkModuleCommonError"] = 6000101] = "NetworkModuleCommonError";
    ZIMErrorCode[ZIMErrorCode["NetworkModuleServerError"] = 6000102] = "NetworkModuleServerError";
    ZIMErrorCode[ZIMErrorCode["NetworkModuleTokenInvalid"] = 6000103] = "NetworkModuleTokenInvalid";
    ZIMErrorCode[ZIMErrorCode["NetworkModuleNetworkError"] = 6000104] = "NetworkModuleNetworkError";
    ZIMErrorCode[ZIMErrorCode["NetworkModuleTokenExpired"] = 6000106] = "NetworkModuleTokenExpired";
    ZIMErrorCode[ZIMErrorCode["NetworkModuleTokenVersionError"] = 6000107] = "NetworkModuleTokenVersionError";
    ZIMErrorCode[ZIMErrorCode["NetworkModuleTokenTimeIsTooShort"] = 6000108] = "NetworkModuleTokenTimeIsTooShort";
    ZIMErrorCode[ZIMErrorCode["NetworkModuleUserHasAlreadyLogged"] = 6000111] = "NetworkModuleUserHasAlreadyLogged";
    ZIMErrorCode[ZIMErrorCode["NetworkModuleUserIsNotLogged"] = 6000121] = "NetworkModuleUserIsNotLogged";
    // MARK: - Conversation
    ZIMErrorCode[ZIMErrorCode["MessageModuleCommonError"] = 6000201] = "MessageModuleCommonError";
    ZIMErrorCode[ZIMErrorCode["MessageModuleServerError"] = 6000202] = "MessageModuleServerError";
    ZIMErrorCode[ZIMErrorCode["MessageModuleSendMessageFailed"] = 6000203] = "MessageModuleSendMessageFailed";
    ZIMErrorCode[ZIMErrorCode["MessageModuleTargetDoesNotExist"] = 6000204] = "MessageModuleTargetDoesNotExist";
    ZIMErrorCode[ZIMErrorCode["MessageModuleCallError"] = 6000270] = "MessageModuleCallError";
    ZIMErrorCode[ZIMErrorCode["MessageModuleCancelCallError"] = 6000271] = "MessageModuleCancelCallError";
    ZIMErrorCode[ZIMErrorCode["MessageModuleCallServerError"] = 6000272] = "MessageModuleCallServerError";
    ZIMErrorCode[ZIMErrorCode["MessageModuleIsNotInvitor"] = 6000273] = "MessageModuleIsNotInvitor";
    ZIMErrorCode[ZIMErrorCode["MessageModuleIsNotInvitee"] = 6000274] = "MessageModuleIsNotInvitee";
    ZIMErrorCode[ZIMErrorCode["MessageModuleCallAlreadyExists"] = 6000275] = "MessageModuleCallAlreadyExists";
    ZIMErrorCode[ZIMErrorCode["MessageModuleCallDoesNotExist"] = 6000276] = "MessageModuleCallDoesNotExist";
    ZIMErrorCode[ZIMErrorCode["MessageModuleAuditRejected"] = 6000221] = "MessageModuleAuditRejected";
    ZIMErrorCode[ZIMErrorCode["MessageModuleAuditFailed"] = 6000222] = "MessageModuleAuditFailed";
    ZIMErrorCode[ZIMErrorCode["ConversationModuleCommonError"] = 6000601] = "ConversationModuleCommonError";
    ZIMErrorCode[ZIMErrorCode["ConversationModuleServerError"] = 6000602] = "ConversationModuleServerError";
    ZIMErrorCode[ZIMErrorCode["ConversationModuleConversationDoesNotExist"] = 6000603] = "ConversationModuleConversationDoesNotExist";
    // MARK: - Room
    ZIMErrorCode[ZIMErrorCode["RoomModuleCommonError"] = 6000301] = "RoomModuleCommonError";
    ZIMErrorCode[ZIMErrorCode["RoomModuleServerError"] = 6000302] = "RoomModuleServerError";
    ZIMErrorCode[ZIMErrorCode["RoomModuleCreateRoomError"] = 6000303] = "RoomModuleCreateRoomError";
    ZIMErrorCode[ZIMErrorCode["RoomModuleJoinRoomError"] = 6000304] = "RoomModuleJoinRoomError";
    ZIMErrorCode[ZIMErrorCode["RoomModuleLeaveRoomError"] = 6000306] = "RoomModuleLeaveRoomError";
    ZIMErrorCode[ZIMErrorCode["RoomModuleUserIsNotInTheRoom"] = 6000321] = "RoomModuleUserIsNotInTheRoom";
    ZIMErrorCode[ZIMErrorCode["RoomModuleTheRoomDoesNotExist"] = 6000322] = "RoomModuleTheRoomDoesNotExist";
    ZIMErrorCode[ZIMErrorCode["RoomModuleTheRoomAlreadyExists"] = 6000323] = "RoomModuleTheRoomAlreadyExists";
    ZIMErrorCode[ZIMErrorCode["RoomModuleTheNumberOfExistingRoomsHasReachedLimit"] = 6000324] = "RoomModuleTheNumberOfExistingRoomsHasReachedLimit";
    ZIMErrorCode[ZIMErrorCode["RoomModuleTheNumberOfJoinedRoomsHasReachedLimit"] = 6000325] = "RoomModuleTheNumberOfJoinedRoomsHasReachedLimit";
    ZIMErrorCode[ZIMErrorCode["RoomModuleRoomAttributesCommonError"] = 6000330] = "RoomModuleRoomAttributesCommonError";
    ZIMErrorCode[ZIMErrorCode["RoomModuleRoomAttributesOperationFailedCompletely"] = 6000331] = "RoomModuleRoomAttributesOperationFailedCompletely";
    ZIMErrorCode[ZIMErrorCode["RoomModuleRoomAttributesQueryFailed"] = 6000333] = "RoomModuleRoomAttributesQueryFailed";
    ZIMErrorCode[ZIMErrorCode["RoomModuleTheNumberOfRoomAttributesExceedsLimit"] = 6000334] = "RoomModuleTheNumberOfRoomAttributesExceedsLimit";
    ZIMErrorCode[ZIMErrorCode["RoomModuleTheLengthOfRoomAttributeKeyExceedsLimit"] = 6000335] = "RoomModuleTheLengthOfRoomAttributeKeyExceedsLimit";
    ZIMErrorCode[ZIMErrorCode["RoomModuleTheLengthOfRoomAttributeValueExceedsLimit"] = 6000336] = "RoomModuleTheLengthOfRoomAttributeValueExceedsLimit";
    ZIMErrorCode[ZIMErrorCode["RoomModuleTheTotalLengthOfRoomAttributesValueExceedsLimit"] = 6000337] = "RoomModuleTheTotalLengthOfRoomAttributesValueExceedsLimit";
    ZIMErrorCode[ZIMErrorCode["RoomModuleRoomMemberAttributesCommonError"] = 6000350] = "RoomModuleRoomMemberAttributesCommonError";
    ZIMErrorCode[ZIMErrorCode["RoomModuleTheTotalLengthOfRoomMemberAttributesExceedsLimit"] = 6000351] = "RoomModuleTheTotalLengthOfRoomMemberAttributesExceedsLimit";
    ZIMErrorCode[ZIMErrorCode["RoomModuleTheLengthOfRoomMemberAttributesKeyExceedsLimit"] = 6000352] = "RoomModuleTheLengthOfRoomMemberAttributesKeyExceedsLimit";
    ZIMErrorCode[ZIMErrorCode["RoomModuleTheLengthOfRoomMemberAttributesValueExceedsLimit"] = 6000353] = "RoomModuleTheLengthOfRoomMemberAttributesValueExceedsLimit";
    ZIMErrorCode[ZIMErrorCode["RoomModuleTheMemberNumberOfRoomMemberAttributesExceedsLimit"] = 6000357] = "RoomModuleTheMemberNumberOfRoomMemberAttributesExceedsLimit";
    // MARK: - Group
    ZIMErrorCode[ZIMErrorCode["GroupModuleCommonError"] = 6000501] = "GroupModuleCommonError";
    ZIMErrorCode[ZIMErrorCode["GroupModuleServerError"] = 6000502] = "GroupModuleServerError";
    ZIMErrorCode[ZIMErrorCode["GroupModuleCreateGroupError"] = 6000503] = "GroupModuleCreateGroupError";
    ZIMErrorCode[ZIMErrorCode["GroupModuleDismissGroupError"] = 6000504] = "GroupModuleDismissGroupError";
    ZIMErrorCode[ZIMErrorCode["GroupModuleJoinGroupError"] = 6000505] = "GroupModuleJoinGroupError";
    ZIMErrorCode[ZIMErrorCode["GroupModuleLeaveGroupError"] = 6000506] = "GroupModuleLeaveGroupError";
    ZIMErrorCode[ZIMErrorCode["GroupModuleKickoutGroupMemberError"] = 6000507] = "GroupModuleKickoutGroupMemberError";
    ZIMErrorCode[ZIMErrorCode["GroupModuleInviteUserIntoGroupError"] = 6000508] = "GroupModuleInviteUserIntoGroupError";
    ZIMErrorCode[ZIMErrorCode["GroupModuleTransferOwnerError"] = 6000509] = "GroupModuleTransferOwnerError";
    ZIMErrorCode[ZIMErrorCode["GroupModuleUpdateGroupInfoError"] = 6000510] = "GroupModuleUpdateGroupInfoError";
    ZIMErrorCode[ZIMErrorCode["GroupModuleQueryGroupInfoError"] = 6000511] = "GroupModuleQueryGroupInfoError";
    ZIMErrorCode[ZIMErrorCode["GroupModuleGroupAttributesOperationFailed"] = 6000512] = "GroupModuleGroupAttributesOperationFailed";
    ZIMErrorCode[ZIMErrorCode["GroupModuleGroupAttributesQueryFailed"] = 6000513] = "GroupModuleGroupAttributesQueryFailed";
    ZIMErrorCode[ZIMErrorCode["GroupModuleUpdateGroupMemberInfoError"] = 6000514] = "GroupModuleUpdateGroupMemberInfoError";
    ZIMErrorCode[ZIMErrorCode["GroupModuleQueryGroupMemberInfoError"] = 6000515] = "GroupModuleQueryGroupMemberInfoError";
    ZIMErrorCode[ZIMErrorCode["GroupModuleQueryGroupListError"] = 6000516] = "GroupModuleQueryGroupListError";
    ZIMErrorCode[ZIMErrorCode["GroupModuleQueryGroupMemberListError"] = 6000517] = "GroupModuleQueryGroupMemberListError";
    ZIMErrorCode[ZIMErrorCode["GroupModuleUserIsNotInTheGroup"] = 6000521] = "GroupModuleUserIsNotInTheGroup";
    ZIMErrorCode[ZIMErrorCode["GroupModuleMemberIsAlreadyInTheGroup"] = 6000522] = "GroupModuleMemberIsAlreadyInTheGroup";
    ZIMErrorCode[ZIMErrorCode["GroupModuleGroupDoesNotExist"] = 6000523] = "GroupModuleGroupDoesNotExist";
    ZIMErrorCode[ZIMErrorCode["GroupModuleGroupAlreadyExists"] = 6000524] = "GroupModuleGroupAlreadyExists";
    ZIMErrorCode[ZIMErrorCode["GroupModuleGroupMemberHasReachedLimit"] = 6000525] = "GroupModuleGroupMemberHasReachedLimit";
    ZIMErrorCode[ZIMErrorCode["GroupModuleGroupAttributeDoesNotExist"] = 6000526] = "GroupModuleGroupAttributeDoesNotExist";
    ZIMErrorCode[ZIMErrorCode["GroupModuleTheNumberOfGroupAttributesExceedsLimit"] = 6000531] = "GroupModuleTheNumberOfGroupAttributesExceedsLimit";
    ZIMErrorCode[ZIMErrorCode["GroupModuleTheLengthOfGroupAttributeKeyExceedsLimit"] = 6000532] = "GroupModuleTheLengthOfGroupAttributeKeyExceedsLimit";
    ZIMErrorCode[ZIMErrorCode["GroupModuleTheLengthOfGroupAttributeValueExceedsLimit"] = 6000533] = "GroupModuleTheLengthOfGroupAttributeValueExceedsLimit";
    ZIMErrorCode[ZIMErrorCode["GroupModuleTheTotalLengthOfGroupAttributesValueExceedsLimit"] = 6000534] = "GroupModuleTheTotalLengthOfGroupAttributesValueExceedsLimit";
    ZIMErrorCode[ZIMErrorCode["GroupModuleNoCorrespondingOperationAuthority"] = 6000541] = "GroupModuleNoCorrespondingOperationAuthority";
    ZIMErrorCode[ZIMErrorCode["GroupModuleForbidJoinGroupError"] = 6000542] = "GroupModuleForbidJoinGroupError";
    ZIMErrorCode[ZIMErrorCode["GroupModuleNeedApplyJoinGroupError"] = 6000543] = "GroupModuleNeedApplyJoinGroupError";
    ZIMErrorCode[ZIMErrorCode["GroupModuleNeedApplyInviteGroupError"] = 6000544] = "GroupModuleNeedApplyInviteGroupError";
})(ZIMErrorCode || (ZIMErrorCode = {}));
