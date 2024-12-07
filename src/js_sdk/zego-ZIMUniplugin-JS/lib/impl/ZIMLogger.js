import { ZIMEngine } from "./ZIMEngine";
const ZIMNativeModule = uni.requireNativePlugin('zego-ZIMUniPlugin_ZIMUniEngine');
export class ZIMLogger {
    warn(tag, action, msg) {
        const log = msg && typeof msg != 'string' ? this.stringify(msg) : msg || '';
        if (log) {
            console.log(action, log);
            tag && ZIMEngine._callMethod('writeCustomLog', { customLog: log, moduleName: action });
        }
    }
    /**
     * Format the log to reduce a large number of invalid logs
     *
     * 1. Uint8Array           ->  b=length
     * 2. Array.length > 2     ->  [length, Array[first], Array[last]]
     * 3. String.length > 100  ->  s=length
     * 4. ZIMMessage.message   ->  s=length
     *
     */
    stringify(obj) {
        let msgObj = null;
        const str = JSON.stringify(obj, (key, value) => {
            if (value instanceof Uint8Array)
                return 'b=' + value.length;
            if (value instanceof Array && value.length > 2) {
                const len = value.length;
                return [len, value[0], value[len - 1]];
            }
            if (value && typeof value == 'object' && value.type && value.message)
                msgObj = value;
            if (typeof value == 'string') {
                if (value.length > 100)
                    return 's=' + value.length;
                if (key == 'message' && msgObj && msgObj.type) {
                    msgObj = null;
                    return 's=' + value.length;
                }
            }
            return value;
        });
        return str.replace(/\"(\w+)\":/g, '$1:');
    }
}
export var ZIMLogTag;
(function (ZIMLogTag) {
    ZIMLogTag["Database"] = "DB";
    ZIMLogTag["User"] = "User";
    ZIMLogTag["Conversation"] = "Conv";
    ZIMLogTag["Room"] = "Room";
    ZIMLogTag["Group"] = "Group";
    ZIMLogTag["Call"] = "Call";
    ZIMLogTag["Friend"] = "Friend";
})(ZIMLogTag || (ZIMLogTag = {}));
export var ZIMLogAction;
(function (ZIMLogAction) {
    // API - Main
    ZIMLogAction["Login"] = "JSAPI.login";
    // API - User
    ZIMLogAction["UpdateUserName"] = "JSAPI.updateUserName";
    ZIMLogAction["UpdateUserAvatarUrl"] = "JSAPI.updateUserAvatarUrl";
    ZIMLogAction["UpdateUserExtendedData"] = "JSAPI.updateUserExtendedData";
    ZIMLogAction["UpdateUserOfflinePushRule"] = "API.updateUserOfflinePushRule";
    ZIMLogAction["QueryUsersInfo"] = "JSAPI.queryUsersInfo";
    ZIMLogAction["QuerySelfUserRule"] = "API.querySelfUserRule";
    ZIMLogAction["QueryLocalFileCache"] = "API.queryLocalFileCache";
    ZIMLogAction["ClearLocalFileCache"] = "API.clearLocalFileCache";
    ZIMLogAction["SubscribeStatus"] = "API.subscribeUsersStatus";
    ZIMLogAction["QueryStatus"] = "API.queryUsersStatus";
    // API - Conversation
    ZIMLogAction["QueryConv"] = "JSAPI.queryConversation";
    ZIMLogAction["QueryConvList"] = "JSAPI.queryConversationList";
    ZIMLogAction["QueryPinnedList"] = "JSAPI.queryConversationPinnedList";
    ZIMLogAction["DeleteConv"] = "JSAPI.deleteConversation";
    ZIMLogAction["DeleteAllConv"] = "JSAPI.deleteAllConversations";
    ZIMLogAction["ClearUnreadCount"] = "JSAPI.clearConversationUnreadMessageCount";
    ZIMLogAction["ClearAllUnreadCount"] = "JSAPI.clearConversationTotalUnreadMessageCount";
    ZIMLogAction["DelAllConvMessages"] = "JSAPI.deleteAllConversationMessages";
    ZIMLogAction["UpdatePinnedState"] = "JSAPI.updateConversationPinnedState";
    ZIMLogAction["SetNotificationStatus"] = "JSAPI.setConversationNotificationStatus";
    ZIMLogAction["SetConvDraft"] = "JSAPI.setConversationDraft";
    ZIMLogAction["SetConvMark"] = "JSAPI.setConversationMark";
    // API - Message
    ZIMLogAction["SendMessage"] = "JSAPI.sendMessage";
    ZIMLogAction["SendMediaMessage"] = "JSAPI.sendMediaMessage";
    ZIMLogAction["DeleteMessages"] = "JSAPI.deleteMessages";
    ZIMLogAction["DeleteAllMessage"] = "JSAPI.deleteAllMessage";
    ZIMLogAction["QueryHistoryMessage"] = "JSAPI.queryHistoryMessage";
    ZIMLogAction["DownloadMediaFile"] = "JSAPI.downloadMediaFile";
    ZIMLogAction["ImportLocalMessages"] = "JSAPI.importLocalMessages";
    ZIMLogAction["ExportLocalMessages"] = "JSAPI.exportLocalMessages";
    ZIMLogAction["InsertMessageToLocalDB"] = "JSAPI.insertMessageToLocalDB";
    ZIMLogAction["UpdateMessageLocalExtendedData"] = "JSAPI.updateMessageLocalExtendedData";
    ZIMLogAction["RevokeMessage"] = "JSAPI.RevokeMessage";
    ZIMLogAction["QueryCombineMessage"] = "JSAPI.queryCombineMessageDetail";
    // API - Message receipt
    ZIMLogAction["SendReceiptRead"] = "JSAPI.sendConversationMessageReceiptRead";
    ZIMLogAction["SendMessageReceiptsRead"] = "JSAPI.sendMessageReceiptsRead";
    ZIMLogAction["QueryReceiptsInfo"] = "JSAPI.queryMessageReceiptsInfo";
    ZIMLogAction["QueryReceiptReadMemberList"] = "JSAPI.queryGroupMessageReceiptReadMemberList";
    ZIMLogAction["QueryReceiptUnreadMemberList"] = "JSAPI.queryGroupMessageReceiptUnreadMemberList";
    // API - Message reaction
    ZIMLogAction["AddReaction"] = "JSAPI.addMessageReaction";
    ZIMLogAction["DeleteReaction"] = "JSAPI.deleteMessageReaction";
    ZIMLogAction["QueryReaction"] = "JSAPI.queryMessageReactionUserList";
    // API - Message reply
    ZIMLogAction["ReplyMsg"] = "API.replyMessage";
    ZIMLogAction["QueryReplyMsg"] = "API.queryMessageRepliedList";
    ZIMLogAction["QueryMsgs"] = "API.queryMessages";
    // API - Room
    ZIMLogAction["CreateRoom"] = "JSAPI.createRoom";
    ZIMLogAction["EnterRoom"] = "JSAPI.enterRoom";
    ZIMLogAction["JoinRoom"] = "JSAPI.joinRoom";
    ZIMLogAction["SwitchRoom"] = "JSAPI.switchRoom";
    ZIMLogAction["LeaveRoom"] = "JSAPI.leaveRoom";
    ZIMLogAction["LeaveAllRoom"] = "API.leaveAllRoom";
    ZIMLogAction["QueryRoomMemberList"] = "JSAPI.queryRoomMemberList";
    ZIMLogAction["QueryRoomMembers"] = "JSAPI.queryRoomMembers";
    ZIMLogAction["QueryRoomOnlineMemberCount"] = "JSAPI.queryRoomOnlineMemberCount";
    ZIMLogAction["SetRoomAttributes"] = "JSAPI.setRoomAttributes";
    ZIMLogAction["DeleteRoomAttributes"] = "JSAPI.deleteRoomAttributes";
    ZIMLogAction["QueryRoomAllAttributes"] = "JSAPI.queryRoomAllAttributes";
    ZIMLogAction["BeginRoomAttributesBatchOperation"] = "JSAPI.beginRoomAttributesBatchOperation";
    ZIMLogAction["EndRoomAttributesBatchOperation"] = "JSAPI.endRoomAttributesBatchOperation";
    ZIMLogAction["SetRoomMembersAttributes"] = "JSAPI.setRoomMembersAttributes";
    ZIMLogAction["QueryRoomMembersAttributes"] = "JSAPI.queryRoomMembersAttributes";
    ZIMLogAction["QueryRoomMemberAttributesList"] = "JSAPI.queryRoomMemberAttributesList";
    // API - Group
    ZIMLogAction["CreateGroup"] = "JSAPI.createGroup";
    ZIMLogAction["JoinGroup"] = "JSAPI.joinGroup";
    ZIMLogAction["LeaveGroup"] = "JSAPI.leaveGroup";
    ZIMLogAction["DismissGroup"] = "JSAPI.dismissGroup";
    ZIMLogAction["QueryGroupList"] = "JSAPI.queryGroupList";
    // API - Group info
    ZIMLogAction["UpdateGroupInfo"] = "JSAPI.updateGroupInfo";
    ZIMLogAction["MuteGroup"] = "JSAPI.muteGroup";
    ZIMLogAction["QueryGroupInfo"] = "JSAPI.queryGroupInfo";
    // API - Group attribute
    ZIMLogAction["SetGroupAttributes"] = "JSAPI.setGroupAttributes";
    ZIMLogAction["DeleteGroupAttributes"] = "JSAPI.deleteGroupAttributes";
    ZIMLogAction["QueryGroupAttributes"] = "JSAPI.queryGroupAttributes";
    // API - Group member list
    ZIMLogAction["TransferGroupOwner"] = "JSAPI.transferGroupOwner";
    ZIMLogAction["InviteUsersIntoGroup"] = "JSAPI.inviteUsersIntoGroup";
    ZIMLogAction["KickGroupMembers"] = "JSAPI.kickGroupMembers";
    ZIMLogAction["QueryGroupMemberList"] = "JSAPI.queryGroupMemberList";
    ZIMLogAction["QueryGroupMemberCount"] = "JSAPI.queryGroupMemberCount";
    ZIMLogAction["MuteGroupMembers"] = "JSAPI.muteGroupMembers";
    ZIMLogAction["QueryGroupMemberMutedList"] = "JSAPI.queryGroupMemberMutedList";
    // API - Group member info
    ZIMLogAction["UpdateGroupAlias"] = "API.updateGroupAlias";
    ZIMLogAction["SetGroupMemberNickname"] = "JSAPI.setGroupMemberNickname";
    ZIMLogAction["SetGroupMemberRole"] = "JSAPI.setGroupMemberRole";
    ZIMLogAction["QueryGroupMemberInfo"] = "JSAPI.queryGroupMemberInfo";
    // API - Group apply
    ZIMLogAction["UpdateGroupVerifyMode"] = "API.updateGroupVerifyMode";
    ZIMLogAction["SendGroupJoinApp"] = "API.sendGroupJoinApplication";
    ZIMLogAction["AcceptGroupJoinApp"] = "API.acceptGroupJoinApplication";
    ZIMLogAction["RejectGroupJoinApp"] = "API.rejectGroupJoinApplication";
    ZIMLogAction["SendGroupInviteApp"] = "API.sendGroupInviteApplications";
    ZIMLogAction["AcceptGroupInviteApp"] = "API.acceptGroupInviteApplication";
    ZIMLogAction["RejectGroupInviteApp"] = "API.rejectGroupInviteApplication";
    ZIMLogAction["QueryGroupApp"] = "API.queryGroupApplicationList";
    // API - Call
    ZIMLogAction["CallInvite"] = "JSAPI.callInvite";
    ZIMLogAction["CallCancel"] = "JSAPI.callCancel";
    ZIMLogAction["CallAccept"] = "JSAPI.callAccept";
    ZIMLogAction["CallReject"] = "JSAPI.callReject";
    ZIMLogAction["CallQuit"] = "JSAPI.callQuit";
    ZIMLogAction["CallEnd"] = "JSAPI.callEnd";
    ZIMLogAction["CallJoin"] = "JSAPI.callJoin";
    ZIMLogAction["CallingInvite"] = "JSAPI.callingInvite";
    ZIMLogAction["QueryCallList"] = "JSAPI.queryCallInvitationList";
    // API - Friend
    ZIMLogAction["AddFriend"] = "JSAPI.addFriend";
    ZIMLogAction["SendFriendApp"] = "JSAPI.sendFriendApplication";
    ZIMLogAction["DeleteFriends"] = "JSAPI.deleteFriends";
    ZIMLogAction["CheckFriends"] = "JSAPI.checkFriendsRelation";
    ZIMLogAction["UpdateFriendAlias"] = "JSAPI.updateFriendAlias";
    ZIMLogAction["UpdateFriendAttr"] = "JSAPI.updateFriendAttributes";
    ZIMLogAction["AcceptFriendApp"] = "JSAPI.acceptFriendApplication";
    ZIMLogAction["RejectFriendApp"] = "JSAPI.rejectFriendApplication";
    ZIMLogAction["QueryFriendsInfo"] = "JSAPI.queryFriendsInfo";
    ZIMLogAction["QueryFriendList"] = "JSAPI.queryFriendList";
    ZIMLogAction["QueryFriendAppList"] = "JSAPI.queryFriendApplicationList";
    // API - Blacklis
    ZIMLogAction["AddUserToBlacklist"] = "JSAPI.addUsersToBlacklist";
    ZIMLogAction["RemoveUsersFromBlacklist"] = "JSAPI.removeUsersFromBlacklist";
    ZIMLogAction["CheckUserIsInBlacklist"] = "JSAPI.checkUserIsInBlacklist";
    ZIMLogAction["QueryBlacklist"] = "JSAPI.queryBlacklist";
    // API - DB Search
    ZIMLogAction["SearchConvs"] = "JSAPI.searchLocalConversations";
    ZIMLogAction["SearchGlobalMessages"] = "JSAPI.searchGlobalLocalMessages";
    ZIMLogAction["SearchMessages"] = "JSAPI.searchLocalMessages";
    ZIMLogAction["SearchGroups"] = "JSAPI.searchLocalGroups";
    ZIMLogAction["SearchGroupMembers"] = "JSAPI.searchLocalGroupMembers";
    ZIMLogAction["SearchFriends"] = "JSAPI.searchLocalFriends";
})(ZIMLogAction || (ZIMLogAction = {}));
