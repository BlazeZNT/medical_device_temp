import { ZIMCallInviteConfig, ZIMCombineMessage, ZIMConversationBaseInfo, ZIMConversationNotificationStatus, ZIMConversationSearchConfig, ZIMConversationType, ZIMError, ZIMFriendAddConfig, ZIMFriendApplicationAcceptConfig, ZIMGroupAdvancedConfig, ZIMGroupInfo, ZIMGroupMessageReceiptMemberQueryConfig, ZIMGroupMuteConfig, ZIMMediaFileType, ZIMMediaMessage, ZIMMediaMessageBase, ZIMMessage, ZIMMessageBase, ZIMMessageDeleteConfig, ZIMMessageQueryConfig, ZIMMessageSearchConfig, ZIMMessageSendConfig, ZIMRoomAdvancedConfig, ZIMRoomInfo, ZIMUserOfflinePushRule } from '../index';
import { ZIMLogAction, ZIMLogTag, ZIMLogger } from './ZIMLogger';
export declare const NotInitError: ZIMError;
/**
 * Valid API params
 *
 * Used for Web and RN and uni-app
 */
export declare class ZIMParamValid {
    private logger;
    constructor(logger: ZIMLogger);
    validID(field: string, value: string, tag: ZIMLogTag, action: ZIMLogAction): ZIMError | void;
    validCallID(callID: string, action: ZIMLogAction): ZIMError | void;
    validName(field: string, value: string, tag: ZIMLogTag, action: ZIMLogAction): ZIMError | void;
    validTwoID(field1: string, value1: string, field2: string, value2: string, tag: ZIMLogTag, action: ZIMLogAction | string): ZIMError | void;
    validTwoName(field1: string, value1: string, field2: string, value2: string, tag: ZIMLogTag, action: ZIMLogAction): ZIMError | void;
    validIDAndName(field1: string, value1: string, field2: string, value2: string, tag: ZIMLogTag, action: ZIMLogAction): ZIMError | void;
    validCount(config: {
        count: number;
    }, tag: ZIMLogTag, action: ZIMLogAction, field?: string, value?: string): ZIMError | void;
    validArray(field: string, value: string[], tag: ZIMLogTag, action: ZIMLogAction, max?: number): ZIMError | void;
    validIDAndArray(field1: string, value1: string, field2: string, value2: string[], tag: ZIMLogTag, action: ZIMLogAction, max?: number): ZIMError | void;
    updateUserOfflinePushRule(offlinePushRule: ZIMUserOfflinePushRule): ZIMError | void;
    downloadMediaFile(message: ZIMMediaMessage, fileType: ZIMMediaFileType): ZIMError | void;
    validConvIDAndType(conversationID: string, conversationType: ZIMConversationType, action: ZIMLogAction): ZIMError | void;
    validSDKMessage(message: ZIMMessage, action: ZIMLogAction): ZIMError | void;
    setNotificationStatus(status: ZIMConversationNotificationStatus, conversationID: string, conversationType: ZIMConversationType): ZIMError | void;
    setConversationDraft(conversationID: string, conversationType: ZIMConversationType, draft: string): ZIMError | void;
    setConvMark(markType: number, infos: ZIMConversationBaseInfo[]): ZIMError | void;
    sendMessage(message: ZIMMessageBase, toConversationID: string, conversationType: ZIMConversationType, config: ZIMMessageSendConfig): ZIMError | void;
    sendMediaMessage(message: ZIMMediaMessageBase, toConversationID: string, conversationType: ZIMConversationType, config: ZIMMessageSendConfig): ZIMError | void;
    deleteMessages(messageList: ZIMMessage[], conversationID: string, conversationType: ZIMConversationType, config: ZIMMessageDeleteConfig): ZIMError | void;
    queryHistoryMessage(conversationID: string, conversationType: ZIMConversationType, config: ZIMMessageQueryConfig): ZIMError | void;
    insertMessageToLocalDB(message: ZIMMessageBase | ZIMMediaMessageBase, conversationID: string, conversationType: ZIMConversationType, senderUserID: string): ZIMError | void;
    updateMessageLocalExtendedData(localExtendedData: string, message: ZIMMessage): ZIMError | void;
    sendCombineMessage(message: ZIMCombineMessage, titLen: number, sumLen: number): ZIMError | void;
    queryCombineMessageDetail(message: ZIMCombineMessage): ZIMError | void;
    sendReceiptRead(conversationID: string, conversationType: ZIMConversationType): ZIMError | void;
    sendMessageReceiptsRead(messageList: ZIMMessage[], conversationID: string, conversationType: ZIMConversationType): ZIMError | void;
    queryReceiptsInfo(messageList: ZIMMessage[], conversationID: string, conversationType: ZIMConversationType): ZIMError | void;
    queryReceiptMemberList(message: ZIMMessage, groupID: string, config: ZIMGroupMessageReceiptMemberQueryConfig, read: boolean, loginUserID: string): ZIMError | void;
    messageReaction(reactionType: string, message: ZIMMessage, add?: boolean): ZIMError | void;
    queryMessageBase(message: ZIMMessage, config: {
        count: number;
    }, action: ZIMLogAction): ZIMError | void;
    replyMsg(message: ZIMMessageBase | ZIMMediaMessageBase, originMessage: ZIMMessage, config: ZIMMessageSendConfig, titleLength: number, summaryLength: number): ZIMError | void;
    createRoom(action: ZIMLogAction, roomInfo: ZIMRoomInfo, config?: ZIMRoomAdvancedConfig): ZIMError | void;
    setRoomAttributes(roomAttributes: Record<string, string>, roomID: string): ZIMError | void;
    setRoomMembersAttributes(attributes: Record<string, string>, userIDs: string[], roomID: string): ZIMError | void;
    createGroup(groupInfo: ZIMGroupInfo, userIDs: string[], config: ZIMGroupAdvancedConfig): ZIMError | void;
    muteGroup(groupID: string, config: ZIMGroupMuteConfig, isMute: boolean): ZIMError | void;
    setGroupAttributes(groupAttributes: Record<string, string>, groupID: string): ZIMError | void;
    queryGroupAttributes(groupID: string, keys?: string[]): ZIMError | void;
    setGroupMemberNickname(nickname: string, forUserID: string, groupID: string): ZIMError | void;
    setGroupMemberRole(role: number, forUserID: string, groupID: string): ZIMError | void;
    updateGroupVerifyMode(mode: number, groupID: string, type: number): ZIMError | void;
    callInvite(invitees: string[], config: ZIMCallInviteConfig): ZIMError | void;
    searchConversations(config: ZIMConversationSearchConfig): ZIMError | void;
    searchMessages(config: ZIMMessageSearchConfig, action: ZIMLogAction): ZIMError | void;
    searchBase(config: {
        count: number;
        keywords: string[];
    }, action: ZIMLogAction): ZIMError | void;
    addFriend(userID: string, config: ZIMFriendAddConfig): ZIMError | void;
    updateFriendAlias(friendAlias: string, userID: string): ZIMError | void;
    updateFriendAttributes(friendAttributes: Record<string, string>, userID: string): ZIMError | void;
    acceptFriendApplication(userID: string, config: ZIMFriendApplicationAcceptConfig): ZIMError | void;
    private _checkMediaFileType;
    /**
     * Message content
     *
     * 1. not empty
     * 2. cannot be a string of all spaces
     * 3. byte <= 48K
     */
    private _checkMesageContent;
    private _checkMesagePriority;
    private _checkMesageType;
    private _checkMediaMesageType;
    private _checkInsertMesageType;
    private _checkInsertMesageContent;
    private _checkConvType;
    private _checkMessageReceipt;
    private _isValidName;
    private _isValidAttribute;
    private _checkSubType;
    private _isInvalidBizMsgType;
    private _checkSDKMessage;
    private _checkSubMessage;
}
