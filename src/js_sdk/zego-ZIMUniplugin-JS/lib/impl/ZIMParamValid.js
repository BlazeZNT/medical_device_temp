import { ZIMConversationNotificationStatus, ZIMConversationType, ZIMGroupMuteMode, ZIMMediaFileType, ZIMMessageDirection, ZIMMessagePriority, ZIMMessageReceiptStatus, ZIMMessageSentStatus, ZIMMessageType, ZIMPlatformType, } from '../index';
import { ZIMLogAction, ZIMLogTag } from './ZIMLogger';
const ZIMConstant = {
    MAX_ID_SIZE: 1024,
    MAX_NAME_SIZE: 2 * 1024,
    MAX_MESSAGE_SIZE: 48 * 1024,
};
const encodeString = (str) => {
    return typeof str == 'string'
        ? // TypedArray.from has problem on some Safari
            new Uint8Array(Array.from(unescape(encodeURIComponent(str || ''))).map((val) => val.charCodeAt(0)))
        : str;
};
const decodeString = (u8arr) => {
    if (typeof u8arr == 'string')
        return u8arr;
    if (!u8arr || !u8arr.length)
        return '';
    const str = String.fromCharCode(...Array.from(u8arr));
    try {
        return decodeURIComponent(escape(str));
    }
    catch (error) {
        return decodeURIComponent(str);
    }
};
const transError = (code, message) => {
    return { code, message };
};
/**
 * byte length <= 1024
 * not start with '#' when create
 */
const isValidID = (str, isCreate) => {
    return (!!str &&
        typeof str == 'string' &&
        str.length <= ZIMConstant.MAX_ID_SIZE &&
        (!isCreate || (isCreate && str[0] != '#')));
};
const ParamInvalid = 6000001;
const LogTagDB = ZIMLogTag.Database;
const LogTagUser = ZIMLogTag.User;
const LogTagConv = ZIMLogTag.Conversation;
const LogTagRoom = ZIMLogTag.Room;
const LogTagGroup = ZIMLogTag.Group;
const LogTagCall = ZIMLogTag.Call;
const LogTagFriend = ZIMLogTag.Friend;
export const NotInitError = {
    code: 6000002,
    message: 'The SDK is not initialized.',
};
/**
 * Valid API params
 *
 * Used for Web and RN and uni-app
 */
export class ZIMParamValid {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    // MARK: - Common
    validID(field, value, tag, action) {
        if (!isValidID(field)) {
            const error = transError(ParamInvalid, field + ' is invalid.');
            this.logger.warn(tag, action, { error, [field]: value });
            return error;
        }
    }
    validCallID(callID, action) {
        if (!callID || typeof callID != 'string' || callID.length > 20) {
            const error = transError(ParamInvalid, 'callID is invalid or its length exceeds 20.');
            this.logger.warn(LogTagCall, action, { error, callID });
            return error;
        }
    }
    validName(field, value, tag, action) {
        if (!this._isValidName(value)) {
            const error = transError(ParamInvalid, field + ' is invalid.');
            this.logger.warn(tag, action, { error, [field]: value });
            return error;
        }
    }
    validTwoID(field1, value1, field2, value2, tag, action) {
        let msg = '';
        if ((!isValidID(value1) && (msg = field1 + ' is invalid.')) ||
            (!isValidID(value2) && (msg = field2 + ' is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(tag, action, { error, [field1]: value1, [field2]: value2 });
            return error;
        }
    }
    validTwoName(field1, value1, field2, value2, tag, action) {
        let msg = '';
        if ((!this._isValidName(value1) && (msg = field1 + ' is invalid.')) ||
            (!this._isValidName(value2) && (msg = field2 + ' is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(tag, action, { error, [field1]: value1, [field2]: value2 });
            return error;
        }
    }
    validIDAndName(field1, value1, field2, value2, tag, action) {
        let msg = '';
        if ((!isValidID(value1) && (msg = field1 + ' is invalid.')) ||
            (!this._isValidName(value2) && (msg = field2 + ' is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(tag, action, { error, [field1]: value1, [field2]: value2 });
            return error;
        }
    }
    validCount(config, tag, action, field, value) {
        let msg = '';
        if (((!config || typeof config.count != 'number' || config.count < 0) &&
            (msg = 'The config or its count is invalid.')) ||
            (field && !isValidID(value) && (msg = field + ' is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(tag, action, { error, config });
            return error;
        }
    }
    validArray(field, value, tag, action, max) {
        if (!Array.isArray(value) ||
            !value.length ||
            value.some((item) => !item || typeof item !== 'string') ||
            (max && value.length > max)) {
            let msg = field + ' is invalid';
            if (max && value.length > max)
                msg += ' or its length exceeds ' + max;
            msg += ' or each of its elements must be a valid string type.';
            const error = transError(ParamInvalid, msg);
            this.logger.warn(tag, action, { error, [field]: value });
            return error;
        }
    }
    validIDAndArray(field1, value1, field2, value2, tag, action, max) {
        let msg = '';
        if ((!isValidID(value1) && (msg = field1 + ' is invalid.')) ||
            ((!Array.isArray(value2) ||
                !value2.length ||
                value2.some((item) => !item || typeof item !== 'string') ||
                (max && value2.length > max)) &&
                (msg = field2 + ' is invalid or each of its elements must be a valid string type.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(tag, action, { error, [field1]: value1, [field2]: value2 });
            return error;
        }
    }
    // MARK: - Main
    updateUserOfflinePushRule(offlinePushRule) {
        if (!offlinePushRule ||
            !Array.isArray(offlinePushRule.notToReceiveOfflinePushPlatforms) ||
            !Array.isArray(offlinePushRule.onlinePlatforms) ||
            offlinePushRule.notToReceiveOfflinePushPlatforms.some((item) => !ZIMPlatformType[item]) ||
            offlinePushRule.onlinePlatforms.some((item) => !ZIMPlatformType[item])) {
            const msg = 'The onlinePlatforms or notToReceiveOfflinePushPlatforms is invalid.';
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagUser, ZIMLogAction.UpdateUserOfflinePushRule, { error, offlinePushRule });
            return error;
        }
    }
    // MARK: - Conversation
    downloadMediaFile(message, fileType) {
        let msg = '';
        if ((!message && (msg = 'message is invalid.')) ||
            (!message.fileDownloadUrl && (msg = 'The message instance of fileDownloadUrl is empty.')) ||
            (!this._checkMediaMesageType(message.type) && (msg = 'message type is invalid.')) ||
            (!this._checkMediaFileType(fileType) && (msg = 'fileType is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            const log = { error, fileType, message };
            this.logger.warn(LogTagConv, ZIMLogAction.DownloadMediaFile, log);
            return error;
        }
    }
    validConvIDAndType(conversationID, conversationType, action) {
        let msg = '';
        if ((!isValidID(conversationID) && (msg = 'conversationID is invalid.')) ||
            (conversationType !== ZIMConversationType.Peer &&
                conversationType !== ZIMConversationType.Group &&
                (msg = 'conversationType is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagConv, action, { error, conversationID, conversationType });
            return error;
        }
    }
    validSDKMessage(message, action) {
        const msg = this._checkSDKMessage(message);
        if (msg) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagConv, action, { error, message });
            return error;
        }
    }
    setNotificationStatus(status, conversationID, conversationType) {
        let msg = '';
        if ((!isValidID(conversationID) && (msg = 'conversationID is invalid.')) ||
            (conversationType !== ZIMConversationType.Group &&
                conversationType !== ZIMConversationType.Peer &&
                (msg = 'conversationType is not support.')) ||
            (status !== ZIMConversationNotificationStatus.Notify &&
                status !== ZIMConversationNotificationStatus.DoNotDisturb &&
                (msg = 'status is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            const log = { error, conversationID, conversationType, status };
            this.logger.warn(LogTagConv, ZIMLogAction.SetNotificationStatus, log);
            return error;
        }
    }
    setConversationDraft(conversationID, conversationType, draft) {
        const action = ZIMLogAction.SetConvDraft;
        const error = this.validConvIDAndType(conversationID, conversationType, action);
        if (error)
            return error;
        if (typeof draft !== 'string') {
            const error = transError(ParamInvalid, 'draft is invalid.');
            const log = { error, conversationID, conversationType, draft };
            this.logger.warn(LogTagConv, action, log);
            return error;
        }
    }
    setConvMark(markType, infos) {
        let msg = '';
        if (((typeof markType != 'number') && (msg = 'markType is invalid.')) ||
            ((!Array.isArray(infos) || !infos.length) && (msg = 'infos is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            const log = { error, markType, infos };
            this.logger.warn(LogTagConv, ZIMLogAction.SetConvMark, log);
            return error;
        }
    }
    // MARK: - Message
    sendMessage(message, toConversationID, conversationType, config) {
        let msg = '';
        if ((!isValidID(toConversationID) && (msg = 'toConversationID is invalid.')) ||
            (!this._checkConvType(conversationType) && (msg = 'conversationType is invalid.')) ||
            (!message && (msg = 'message is invalid.')) ||
            (!config && (msg = 'config is invalid.')) ||
            (!this._checkMesageType(message.type, conversationType) && (msg = 'message type is invalid.')) ||
            (!this._checkMesagePriority(config.priority) && (msg = 'config priority is invalid.')) ||
            (!this._checkMesageContent(conversationType, message.type, message.message) &&
                (msg = 'The message instance of message is invalid.')) ||
            (!this._checkMessageReceipt(conversationType, message.type, config.hasReceipt) &&
                (msg = 'The message type is not support setting receipt.')) ||
            (!this._checkSubType(message) && (msg = 'The message subType is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            const log = { error, toConversationID, conversationType, message, config };
            this.logger.warn(LogTagConv, ZIMLogAction.SendMessage, log);
            return error;
        }
    }
    sendMediaMessage(message, toConversationID, conversationType, config) {
        let msg = '';
        if ((!isValidID(toConversationID) && (msg = 'toConversationID is invalid.')) ||
            (!this._checkConvType(conversationType) && (msg = 'conversationType is invalid.')) ||
            (!message && (msg = 'message is invalid.')) ||
            (!config && (msg = 'config is invalid.')) ||
            (!this._checkMediaMesageType(message.type) && (msg = 'message type is invalid.')) ||
            (!this._checkMesagePriority(config.priority) && (msg = 'config priority is invalid.')) ||
            (!this._checkMessageReceipt(conversationType, message.type, config.hasReceipt) &&
                (msg = 'The message type is not support setting receipt.')) ||
            (!message.fileLocalPath &&
                !message.fileDownloadUrl &&
                (msg = 'The message instance of fileLocalPath and fileDownloadUrl is empty.'))) {
            const error = transError(ParamInvalid, msg);
            const log = { error, toConversationID, conversationType, message, config };
            this.logger.warn(LogTagConv, ZIMLogAction.SendMediaMessage, log);
            return error;
        }
    }
    deleteMessages(messageList, conversationID, conversationType, config) {
        const error = this.validConvIDAndType(conversationID, conversationType, ZIMLogAction.DeleteMessages);
        if (error)
            return error;
        let msg = '';
        if (!Array.isArray(messageList) || messageList.length == 0) {
            msg = 'messageList is invalid.';
        }
        else if (messageList.some((item) => {
            return (!item.messageID ||
                item.conversationID != conversationID ||
                item.conversationType != conversationType);
        })) {
            msg = 'Some messages int the message list in the conversationID are illegal messages.';
        }
        if (msg) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagConv, ZIMLogAction.DeleteMessages, { error, messageList, config });
            return error;
        }
    }
    queryHistoryMessage(conversationID, conversationType, config) {
        let msg = '';
        if ((!isValidID(conversationID) && (msg = 'conversationID is invalid.')) ||
            (!this._checkConvType(conversationType) && (msg = 'conversationType is invalid.')) ||
            ((!config || typeof config.count != 'number' || config.count < 0) &&
                (msg = 'The config or its count is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            const log = { error, conversationID, conversationType };
            this.logger.warn(LogTagConv, ZIMLogAction.QueryHistoryMessage, log);
            return error;
        }
    }
    insertMessageToLocalDB(message, conversationID, conversationType, senderUserID) {
        let msg = '';
        if ((!isValidID(conversationID) && (msg = 'conversationID is invalid.')) ||
            (!this._checkConvType(conversationType) && (msg = 'conversationType is invalid.')) ||
            (!isValidID(senderUserID) && (msg = 'senderUserID is invalid.')) ||
            (!message && (msg = 'message is invalid.')) ||
            (!this._checkInsertMesageType(message.type) && (msg = 'message type is invalid.')) ||
            (!this._checkInsertMesageContent(message) &&
                (msg = 'The message instance of message is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            const log = { error, conversationID, conversationType, senderUserID, message };
            this.logger.warn(LogTagConv, ZIMLogAction.InsertMessageToLocalDB, log);
            return error;
        }
    }
    updateMessageLocalExtendedData(localExtendedData, message) {
        let msg = '';
        if ((!this._isValidName(localExtendedData) && (msg = 'localExtendedData is invalid.')) ||
            ((!message || !message.conversationID || !message.messageID) && (msg = 'message is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            const log = { error, localExtendedData, message };
            this.logger.warn(LogTagConv, ZIMLogAction.UpdateMessageLocalExtendedData, log);
            return error;
        }
    }
    sendCombineMessage(message, titLen, sumLen) {
        if (message.type !== ZIMMessageType.Combine)
            return;
        let msg = '';
        if (((typeof message.title != 'string' || !message.title) &&
            (msg = 'The combine message title is invalid.')) ||
            ((typeof message.summary != 'string' || !message.summary) &&
                (msg = 'The combine message summary is invalid.')) ||
            ((!Array.isArray(message.messageList) || (!message.messageID && message.messageList.length == 0)) &&
                (msg = 'The combine message list is invalid.')) ||
            (message.messageList.some((item) => this._checkSubMessage(item)) &&
                (msg = 'The combine message list includes invalid message.'))) {
            const error = transError(ParamInvalid, msg);
            const log = { error, message, tl: titLen, sl: sumLen };
            this.logger.warn(LogTagConv, ZIMLogAction.SendMessage, log);
            return error;
        }
    }
    queryCombineMessageDetail(message) {
        if (!message || message.type != ZIMMessageType.Combine || !message.combineID) {
            const error = transError(ParamInvalid, 'The combine message is invalid.');
            this.logger.warn(LogTagConv, ZIMLogAction.QueryCombineMessage, { error, message });
            return error;
        }
    }
    // MARK: - Message receipt
    sendReceiptRead(conversationID, conversationType) {
        let msg = '';
        if ((!isValidID(conversationID) && (msg = 'conversationID is invalid.')) ||
            (conversationType !== ZIMConversationType.Peer && (msg = 'conversationType is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            const log = { error, conversationID, conversationType };
            this.logger.warn(LogTagConv, ZIMLogAction.SendReceiptRead, log);
            return error;
        }
    }
    sendMessageReceiptsRead(messageList, conversationID, conversationType) {
        const error = this.validConvIDAndType(conversationID, conversationType, ZIMLogAction.SendMessageReceiptsRead);
        if (error)
            return error;
        let msg = '';
        if (!Array.isArray(messageList) || messageList.length == 0) {
            msg = 'messageList is invalid.';
        }
        else if (messageList.every((item) => {
            return (item.direction != ZIMMessageDirection.Receive ||
                item.receiptStatus != ZIMMessageReceiptStatus.Processing ||
                !item.messageID ||
                !item.messageSeq ||
                item.conversationID != conversationID ||
                item.conversationType != conversationType);
        })) {
            msg = 'Every message in the conversationID is not received receipt message.';
        }
        if (msg) {
            const error = transError(ParamInvalid, msg);
            const log = { error, conversationID, conversationType, messageList };
            this.logger.warn(LogTagConv, ZIMLogAction.SendMessageReceiptsRead, log);
            return error;
        }
    }
    queryReceiptsInfo(messageList, conversationID, conversationType) {
        const error = this.validConvIDAndType(conversationID, conversationType, ZIMLogAction.QueryReceiptsInfo);
        if (error)
            return error;
        let msg = '';
        if (!Array.isArray(messageList) || messageList.length == 0) {
            msg = 'messageList is invalid.';
        }
        else if (messageList.every((item) => {
            return (!item.receiptStatus ||
                !item.messageID ||
                !item.messageSeq ||
                item.conversationID != conversationID ||
                item.conversationType != conversationType);
        })) {
            msg = 'Every messages in the conversationID is not receipt message.';
        }
        if (msg) {
            const error = transError(ParamInvalid, msg);
            const log = { error, conversationID, conversationType, messageList };
            this.logger.warn(LogTagConv, ZIMLogAction.QueryReceiptsInfo, log);
            return error;
        }
    }
    queryReceiptMemberList(message, groupID, config, read, loginUserID) {
        let msg = '';
        if ((!isValidID(groupID) && (msg = 'groupID is invalid.')) ||
            ((!config || typeof config.count != 'number' || config.count < 0) &&
                (msg = 'The config or its count is invalid.')) ||
            ((!message ||
                message.senderUserID != loginUserID ||
                message.sentStatus != ZIMMessageSentStatus.Success ||
                !message.receiptStatus) &&
                (msg = 'The message instance is not a successful receipt message sent by self.')) ||
            (this._isInvalidBizMsgType(message.type) && (msg = 'The message type is not support.')) ||
            ((message.conversationID !== groupID || message.conversationType !== ZIMConversationType.Group) &&
                (msg = 'The message instance is not belong the groupID.'))) {
            const error = transError(ParamInvalid, msg);
            const action = read ? ZIMLogAction.QueryReceiptReadMemberList : ZIMLogAction.QueryReceiptUnreadMemberList;
            this.logger.warn(LogTagConv, action, { error, groupID, message, config });
            return error;
        }
    }
    // MARK: - Message reaction
    messageReaction(reactionType, message, add) {
        const action = add ? ZIMLogAction.AddReaction : ZIMLogAction.DeleteReaction;
        let msg = '';
        if ((typeof reactionType !== 'string' && (msg = 'reactionType is invalid.')) ||
            (msg = this._checkSDKMessage(message))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagConv, action, { error, message });
            return error;
        }
    }
    queryMessageBase(message, config, action) {
        let msg = '';
        if (((!config || typeof config.count != 'number') &&
            (msg = 'The config or its count is invalid.')) ||
            (msg = this._checkSDKMessage(message))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagConv, action, { error, message, config });
            return error;
        }
    }
    // MARK: - Message reply
    replyMsg(message, originMessage, config, titleLength, summaryLength) {
        let msg = '';
        if ((msg = this._checkSDKMessage(originMessage)) ||
            (!message && (msg = 'message is invalid.')) ||
            (this._isInvalidBizMsgType(message.type) && (msg = 'The message type is not suppor.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagConv, ZIMLogAction.ReplyMsg, { error, message });
            return error;
        }
        const error = this._checkMediaMesageType(message.type)
            ? this.sendMediaMessage(message, originMessage.conversationID, originMessage.conversationType, config)
            : this.sendMessage(message, originMessage.conversationID, originMessage.conversationType, config) || this.sendCombineMessage(message, titleLength, summaryLength);
        return error;
    }
    // MARK: - Room
    createRoom(action, roomInfo, config) {
        let msg = '';
        if ((!roomInfo && (msg = 'roomInfo is invalid.')) ||
            (!isValidID(roomInfo.roomID) && (msg = 'The roomInfo instance of roomID is invalid.')) ||
            (!this._isValidName(roomInfo.roomName) && (msg = 'The roomInfo instance of roomName is invalid.')) ||
            (config &&
                config.roomAttributes &&
                !this._isValidAttribute(config.roomAttributes, true) &&
                (msg =
                    'The Key and Value of the roomAttributes property of the config instance only support string types.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagRoom, action, { error, roomInfo, config });
            return error;
        }
    }
    setRoomAttributes(roomAttributes, roomID) {
        let msg = '';
        if ((!isValidID(roomID) && (msg = 'roomID is invalid.')) ||
            (!this._isValidAttribute(roomAttributes) &&
                (msg = 'The Key and Value of the roomAttributes only support string types.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagRoom, ZIMLogAction.SetRoomAttributes, { error, roomID, roomAttributes });
            return error;
        }
    }
    setRoomMembersAttributes(attributes, userIDs, roomID) {
        let msg = '';
        if ((!isValidID(roomID) && (msg = 'roomID is invalid.')) ||
            (!this._isValidAttribute(attributes) &&
                (msg = 'The Key and Value of the attributes only support string types.')) ||
            ((!Array.isArray(userIDs) ||
                !userIDs.length ||
                userIDs.some((item) => !item || typeof item !== 'string')) &&
                (msg = 'Every one of userIDs must be a valid string type.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagRoom, ZIMLogAction.SetRoomMembersAttributes, { error, roomID, attributes });
            return error;
        }
    }
    // MARK: - Group
    createGroup(groupInfo, userIDs, config) {
        const groupID = String(groupInfo.groupID || '').trim();
        let msg = '';
        const paramInvalid = (groupID && !isValidID(groupID, true) && (msg = 'The groupInfo instance of groupID is invalid.')) ||
            (!this._isValidName(groupInfo.groupName) && (msg = 'The groupInfo instance of groupName is invalid.')) ||
            (!this._isValidName(groupInfo.groupAvatarUrl) &&
                (msg = 'The groupInfo instance of groupAvatarUrl is invalid.')) ||
            (!this._isValidName(config.groupNotice) && (msg = 'The config instance of groupNotice is invalid.')) ||
            (userIDs && !Array.isArray(userIDs) && (msg = 'Every one of userIDs must be a valid string type.')) ||
            (!this._isValidAttribute(config.groupAttributes, true) &&
                (msg =
                    'The Key and Value of the groupAttributes property of the config instance only support string types.'));
        if (paramInvalid) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagGroup, ZIMLogAction.CreateGroup, { error, groupInfo, config, userIDs });
            return error;
        }
    }
    muteGroup(groupID, config, isMute) {
        let msg = '';
        if ((!isValidID(groupID) && (msg = 'groupID is invalid.')) ||
            (((isMute && (!config.mode || !config.duration)) || [0, 1, 2, 3].indexOf(config.mode) == -1) &&
                (msg = 'The config instance or its mode is invalid.')) ||
            ((typeof config.duration != 'number' || config.duration < -1) &&
                (msg = 'The config instance of duration is invalid.')) ||
            (config.mode == ZIMGroupMuteMode.Custom &&
                (!Array.isArray(config.roles) || !config.roles.length || config.roles.join() == '3') &&
                (msg = 'The config instance of roles is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagGroup, ZIMLogAction.MuteGroup, { error, groupID, isMute, config });
            return error;
        }
    }
    setGroupAttributes(groupAttributes, groupID) {
        let msg = '';
        if ((!isValidID(groupID) && (msg = 'groupID is invalid.')) ||
            (!this._isValidAttribute(groupAttributes) &&
                (msg = 'The Key and Value of the groupAttributes only support string types.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagGroup, ZIMLogAction.SetGroupAttributes, { error, groupID, groupAttributes });
            return error;
        }
    }
    queryGroupAttributes(groupID, keys) {
        let msg = '';
        if ((!isValidID(groupID) && (msg = 'groupID is invalid.')) ||
            (Array.isArray(keys) &&
                (!keys.length || keys.some((item) => !item || typeof item !== 'string')) &&
                (msg = 'Every one of kyes must be a valid string type.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagGroup, ZIMLogAction.QueryGroupAttributes, { error, groupID, keys });
            return error;
        }
    }
    setGroupMemberNickname(nickname, forUserID, groupID) {
        let msg = '';
        if ((!this._isValidName(nickname) && (msg = 'nickname is invalid.')) ||
            (!isValidID(forUserID) && (msg = 'forUserID is invalid.')) ||
            (!isValidID(groupID) && (msg = 'groupID is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            const log = { error, groupID, forUserID, nickname };
            this.logger.warn(LogTagGroup, ZIMLogAction.SetGroupMemberNickname, log);
            return error;
        }
    }
    setGroupMemberRole(role, forUserID, groupID) {
        let msg = '';
        if ((typeof role !== 'number' && (msg = 'role is invalid.')) ||
            (!isValidID(forUserID) && (msg = 'forUserID is invalid.')) ||
            (!isValidID(groupID) && (msg = 'groupID is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagGroup, ZIMLogAction.SetGroupMemberRole, { error, groupID, forUserID, role });
            return error;
        }
    }
    updateGroupVerifyMode(mode, groupID, type) {
        let msg = '';
        if ((!isValidID(groupID) && (msg = 'groupID is invalid.')) ||
            typeof mode !== 'number' ||
            (((type == 0 && (mode < 0 || mode > 2)) || (type != 0 && (mode < 0 || mode > 1))) &&
                (msg = 'mode is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagGroup, ZIMLogAction.UpdateGroupVerifyMode, { error, groupID, mode, type });
            return error;
        }
    }
    // MARK: - Call
    callInvite(invitees, config) {
        let msg = '';
        if (((!Array.isArray(invitees) || !invitees.length) && (msg = 'invitees is invalid.')) ||
            (config &&
                typeof config.timeout == 'number' &&
                (config.timeout % 1 != 0 || config.timeout < 1 || config.timeout > 600) &&
                (msg = 'The config of timeout is invalid or its size exceeds 600.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagCall, ZIMLogAction.CallInvite, { error, invitees, config });
            return error;
        }
    }
    // MARK: - DB Search
    searchConversations(config) {
        let msg = '';
        if ((!config && (msg = 'config is invalid.')) ||
            ((typeof config.totalConversationCount != 'number' || config.totalConversationCount < 1) &&
                (msg = 'The config instance of totalConversationCount is invalid.')) ||
            ((typeof config.conversationMessageCount != 'number' || config.conversationMessageCount < 1) &&
                (msg = 'The config instance of count is invalid.')) ||
            (Array.isArray(config.keywords) &&
                (config.keywords.length > 5 || config.keywords.some((item) => !item)) &&
                (msg = 'The config instance of keywords is invalid or its length exceeds 5.')) ||
            (Array.isArray(config.senderUserIDs) &&
                (config.senderUserIDs.length > 5 || config.senderUserIDs.some((item) => !item)) &&
                (msg = 'The config instance of senderUserIDs is invalid or its length exceeds 5.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagDB, ZIMLogAction.SearchConvs, { config, error });
            return error;
        }
    }
    searchMessages(config, action) {
        let msg = '';
        if ((!config && (msg = 'config is invalid.')) ||
            ((typeof config.count != 'number' || config.count < 1) &&
                (msg = 'The config instance of count is invalid.')) ||
            (Array.isArray(config.keywords) &&
                (config.keywords.length > 5 || config.keywords.some((item) => !item)) &&
                (msg = 'The config instance of keywords is invalid or its length exceeds 5.')) ||
            (Array.isArray(config.senderUserIDs) &&
                (config.senderUserIDs.length > 5 || config.senderUserIDs.some((item) => !item)) &&
                (msg = 'The config instance of senderUserIDs is invalid or its length exceeds 5.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagDB, action, { config, error });
            return error;
        }
    }
    searchBase(config, action) {
        let msg = '';
        if ((!config && (msg = 'config is invalid.')) ||
            ((typeof config.count != 'number' || config.count < 1) &&
                (msg = 'The config instance of count is invalid.')) ||
            ((!Array.isArray(config.keywords) ||
                !config.keywords.length ||
                config.keywords.length > 5 ||
                config.keywords.some((item) => !item)) &&
                (msg = 'The config instance of keywords is invalid or its length exceeds 5.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagDB, action, { error, config });
            return error;
        }
    }
    // MARK: - Friend
    addFriend(userID, config) {
        let msg = '';
        if ((!isValidID(userID) && (msg = 'userID is invalid.')) ||
            (!config && (msg = 'config is invalid.')) ||
            (typeof config.wording == 'string' &&
                config.wording.length > 1024 &&
                (msg = 'The config instance of wording is invalid or its length exceeds 1024.')) ||
            (typeof config.friendAlias == 'string' &&
                config.friendAlias.length > 256 &&
                (msg = 'The config instance of friendAlias is invalid or its length exceeds 256.')) ||
            (config.friendAttributes &&
                !this._isValidAttribute(config.friendAttributes, true) &&
                (msg = 'The config instance of friendAttributes is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagFriend, ZIMLogAction.AddFriend, { error, userID, config });
            return error;
        }
    }
    updateFriendAlias(friendAlias, userID) {
        let msg = '';
        if ((!isValidID(userID) && (msg = 'userID is invalid.')) ||
            (typeof friendAlias !== 'string' && (msg = 'friendAlias is invalid.')) ||
            (typeof friendAlias == 'string' &&
                friendAlias.length > 256 &&
                (msg = 'friendAlias is invalid or its length exceeds 256.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagFriend, ZIMLogAction.UpdateFriendAlias, { error, userID, friendAlias });
            return error;
        }
    }
    updateFriendAttributes(friendAttributes, userID) {
        let msg = '';
        if ((!isValidID(userID) && (msg = 'userID is invalid.')) ||
            (friendAttributes &&
                !this._isValidAttribute(friendAttributes, true) &&
                (msg = 'The config instance of friendAttributes is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagFriend, ZIMLogAction.UpdateFriendAlias, { error, userID, friendAttributes });
            return error;
        }
    }
    acceptFriendApplication(userID, config) {
        let msg = '';
        if ((!isValidID(userID) && (msg = 'userID is invalid.')) ||
            (config &&
                typeof config.friendAlias == 'string' &&
                config.friendAlias.length > 256 &&
                (msg = 'The config instance of friendAlias is invalid or its length exceeds 256.')) ||
            (config &&
                config.friendAttributes &&
                !this._isValidAttribute(config.friendAttributes, true) &&
                (msg = 'The config instance of friendAttributes is invalid.'))) {
            const error = transError(ParamInvalid, msg);
            this.logger.warn(LogTagFriend, ZIMLogAction.AcceptFriendApp, { error, userID, config });
            return error;
        }
    }
    // MARK: - Private help function
    _checkMediaFileType(fileType) {
        return (fileType === ZIMMediaFileType.OriginalFile ||
            fileType === ZIMMediaFileType.LargeImage ||
            fileType === ZIMMediaFileType.Thumbnail ||
            fileType === ZIMMediaFileType.VideoFirstFrame);
    }
    /**
     * Message content
     *
     * 1. not empty
     * 2. cannot be a string of all spaces
     * 3. byte <= 48K
     */
    _checkMesageContent(convType, msgType, content) {
        if ((msgType === ZIMMessageType.Text ||
            msgType === ZIMMessageType.Custom ||
            (msgType === ZIMMessageType.Barrage && convType === ZIMConversationType.Room)) &&
            (typeof content !== 'string' ||
                !content ||
                !content.trim() ||
                encodeString(content).length > ZIMConstant.MAX_MESSAGE_SIZE)) {
            return false;
        }
        if (msgType === ZIMMessageType.Command &&
            (!(content instanceof Uint8Array) ||
                !content.length ||
                content.length > ZIMConstant.MAX_MESSAGE_SIZE ||
                !decodeString(content).trim())) {
            return false;
        }
        return true;
    }
    _checkMesagePriority(priority) {
        return (priority === ZIMMessagePriority.Low ||
            priority === ZIMMessagePriority.Medium ||
            priority === ZIMMessagePriority.High);
    }
    _checkMesageType(msgType, convType) {
        return (msgType === ZIMMessageType.Text ||
            msgType === ZIMMessageType.Custom ||
            msgType === ZIMMessageType.Combine ||
            msgType === ZIMMessageType.Command ||
            (convType === ZIMConversationType.Room && msgType === ZIMMessageType.Barrage));
    }
    _checkMediaMesageType(msgType) {
        return (msgType === ZIMMessageType.Image ||
            msgType === ZIMMessageType.File ||
            msgType === ZIMMessageType.Audio ||
            msgType === ZIMMessageType.Video);
    }
    _checkInsertMesageType(msgType) {
        return (msgType === ZIMMessageType.Text ||
            msgType === ZIMMessageType.System ||
            msgType === ZIMMessageType.Custom ||
            msgType === ZIMMessageType.Image ||
            msgType === ZIMMessageType.File ||
            msgType === ZIMMessageType.Audio ||
            msgType === ZIMMessageType.Video);
    }
    _checkInsertMesageContent(msg) {
        const content = msg.message;
        if ((msg.type === ZIMMessageType.Text ||
            msg.type === ZIMMessageType.System ||
            msg.type === ZIMMessageType.Custom) &&
            (typeof content !== 'string' ||
                !content ||
                !content.trim() ||
                encodeString(content).length > ZIMConstant.MAX_MESSAGE_SIZE)) {
            return false;
        }
        if (msg.type >= ZIMMessageType.Image &&
            msg.type <= ZIMMessageType.Video &&
            !msg.fileLocalPath &&
            !msg.fileDownloadUrl) {
            return false;
        }
        if (msg.type == ZIMMessageType.Combine &&
            (!msg.title || !msg.summary))
            return false;
        return true;
    }
    _checkConvType(type) {
        return (type === ZIMConversationType.Peer || type === ZIMConversationType.Room || type === ZIMConversationType.Group);
    }
    // Room message unsupport receipt
    _checkMessageReceipt(type, msgType, hasReceipt) {
        if (!hasReceipt ||
            (type != ZIMConversationType.Room && msgType != ZIMMessageType.Command && msgType != ZIMMessageType.Barrage)) {
            return true;
        }
        return false;
    }
    // byte length <= 2048
    _isValidName = (str) => {
        return typeof str == 'string' && str.length <= ZIMConstant.MAX_NAME_SIZE;
    };
    // Key,Value must be string
    _isValidAttribute = (attr, canEmpty) => {
        if (!attr || Object.prototype.toString.call(attr) !== '[object Object]')
            return false;
        const values = Object.values(attr);
        if (!canEmpty && !values.length)
            return false;
        return values.every((v) => typeof v == 'string');
    };
    _checkSubType(message) {
        return (message.type !== ZIMMessageType.Custom ||
            (message.type == ZIMMessageType.Custom && message.subType >= 0 && message.subType <= 200));
    }
    _isInvalidBizMsgType(type) {
        return (!type ||
            type == ZIMMessageType.Command ||
            type == ZIMMessageType.Barrage ||
            type == ZIMMessageType.Tips ||
            type == ZIMMessageType.Revoke);
    }
    _checkSDKMessage(message) {
        let msg = '';
        if (((!message ||
            !message.conversationID ||
            message.isUserInserted ||
            message.isBroadcastMessage ||
            message.sentStatus != ZIMMessageSentStatus.Success) &&
            (msg = 'The message instance is not a successful message.')) ||
            (this._isInvalidBizMsgType(message.type) && (msg = 'The message type is not support.')) ||
            (message.conversationType !== ZIMConversationType.Peer &&
                message.conversationType !== ZIMConversationType.Group &&
                (msg = 'The message conversation type is not support.')))
            return msg;
        return msg;
    }
    _checkSubMessage(message) {
        let msg = '';
        if (((!message || message.isUserInserted || message.isBroadcastMessage) &&
            (msg = 'The message instance is not a successful message.')) ||
            (this._isInvalidBizMsgType(message.type) && (msg = 'The message type is not support.')))
            return msg;
        return msg;
    }
}
