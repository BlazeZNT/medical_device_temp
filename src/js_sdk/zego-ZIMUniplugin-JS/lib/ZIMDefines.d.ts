export declare enum ZIMGeofencingType {
    None = 0,
    Include = 1,
    Exclude = 2
}
export declare enum ZIMCXHandleType {
    Generic = 1,
    PhoneNumber = 2,
    EmailAddress = 3
}
export declare enum ZIMConnectionState {
    Disconnected = 0,
    Connecting = 1,
    Connected = 2,
    Reconnecting = 3
}
export declare enum ZIMConnectionEvent {
    Success = 0,
    ActiveLogin = 1,
    LoginTimeout = 2,
    LoginInterrupted = 3,
    KickedOut = 4
}
export declare enum ZIMUserOnlineStatus {
    Online = 0,
    Offline = 1,
    Logout = 2
}
export declare enum ZIMConversationType {
    Peer = 0,
    Room = 1,
    Group = 2
}
export declare enum ZIMConversationEvent {
    Added = 0,
    Updated = 1,
    Disabled = 2,
    Deleted = 3
}
export declare enum ZIMConversationNotificationStatus {
    Notify = 1,
    DoNotDisturb = 2
}
export declare enum ZIMMessagePriority {
    Low = 1,
    Medium = 2,
    High = 3
}
export declare enum ZIMMessageType {
    Unknown = 0,
    Text = 1,
    Command = 2,
    Image = 11,
    File = 12,
    Audio = 13,
    Video = 14,
    Barrage = 20,
    System = 30,
    Revoke = 31,
    Tips = 32,
    Combine = 100,
    Custom = 200
}
export declare enum ZIMMessageSentStatus {
    Sending = 0,
    Success = 1,
    Failed = 2
}
export declare enum ZIMMessageDirection {
    Send = 0,
    Receive = 1
}
export declare enum ZIMMessageOrder {
    Descending = 0,
    Ascending = 1
}
export declare enum ZIMMessageReceiptStatus {
    None = 0,
    Processing = 1,
    Done = 2,
    Expired = 3,
    Failed = 4
}
export declare enum ZIMMessageRevokeStatus {
    Unknown = -1,
    SelfRevoke = 0,
    SystemRevoke = 1,
    ServiceAPIRevoke = 2,
    GroupAdminRevoke = 3,
    GroupOwnerRevoke = 4
}
export declare enum ZIMRevokeType {
    TwoWay = 0,
    OneWay = 1
}
export declare enum ZIMMediaFileType {
    OriginalFile = 1,
    LargeImage = 2,
    Thumbnail = 3,
    VideoFirstFrame = 4
}
export declare enum ZIMMessageRepliedInfoState {
    Normal = 0,
    Deleted = 1,
    NotFound = 2
}
export declare enum ZIMRoomState {
    Disconnected = 0,
    Connecting = 1,
    Connected = 2
}
export declare enum ZIMRoomEvent {
    Success = 0,
    NetworkInterrupted = 1,
    NetworkDisconnected = 2,
    RoomNotExist = 3,
    ActiveCreate = 4,
    CreateFailed = 5,
    ActiveEnter = 6,
    EnterFailed = 7,
    KickedOut = 8,
    ConnectTimeout = 9,
    KickedOutByOtherDevice = 10
}
export declare enum ZIMRoomAttributesUpdateAction {
    Set = 0,
    Delete = 1
}
export declare enum ZIMGroupMessageNotificationStatus {
    Notify = 1,
    Disturb = 2
}
export declare enum ZIMGroupState {
    Quit = 0,
    Enter = 1
}
export declare enum ZIMGroupEvent {
    Created = 1,
    Dismissed = 2,
    Joined = 3,
    Invited = 4,
    Left = 5,
    KickedOut = 6
}
export declare enum ZIMGroupMemberState {
    Quit = 0,
    Enter = 1
}
export declare enum ZIMGroupMemberEvent {
    Joined = 1,
    Left = 2,
    KickedOut = 4,
    Invited = 5
}
export declare enum ZIMGroupMemberRole {
    Owner = 1,
    Member = 3
}
export declare enum ZIMGroupAttributesUpdateAction {
    Set = 0,
    Delete = 1
}
export declare enum ZIMCallInvitationMode {
    Unknown = -1,
    General = 0,
    Advanced = 1
}
export declare enum ZIMCallState {
    Unknown = -1,
    Started = 1,
    Ended = 2
}
export declare enum ZIMCallUserState {
    Unknown = -1,
    Inviting = 0,
    Accepted = 1,
    Rejected = 2,
    Cancelled = 3,
    Offline = 4,
    Received = 5,
    Timeout = 6,
    Quit = 7,
    Ended = 8,
    NotYetReceived = 9,
    BeCancelled = 10
}
export interface ZIMAppConfig {
    appID: number;
    appSign: string;
}
export interface ZIMLoginConfig {
    userName: string;
    token: string;
    isOfflineLogin: boolean;
}
export interface ZIMLogConfig {
    logPath: string;
    logSize: number;
}
export interface ZIMCacheConfig {
    cachePath: string;
}
export interface ZIMUserInfo {
    userID: string;
    userName: string;
    userAvatarUrl: string;
}
export interface ZIMUserFullInfo {
    baseInfo: ZIMUserInfo;
    extendedData: string;
}
export interface ZIMErrorUserInfo {
    userID: string;
    reason: number;
}
export interface ZIMUserStatus {
    userID: string;
    onlineStatus: ZIMUserOnlineStatus;
    lastUpdateTime: number;
    onlinePlatforms: ZIMPlatformType[];
}
export interface ZIMUserStatusSubscription {
    userStatus: ZIMUserStatus;
    subscribeExpiredTime: number;
}
export interface ZIMTokenRenewedResult {
    token: string;
}
export interface ZIMUsersInfoQueriedResult {
    userList: ZIMUserFullInfo[];
    errorUserList: ZIMErrorUserInfo[];
}
export interface ZIMUserNameUpdatedResult {
    userName: string;
}
export interface ZIMUserAvatarUrlUpdatedResult {
    userAvatarUrl: string;
}
export interface ZIMUserExtendedDataUpdatedResult {
    extendedData: string;
}
export interface ZIMUsersInfoQueryConfig {
    isQueryFromServer: boolean;
}
export declare enum ZIMMessageMentionedType {
    MentionMe = 1,
    MentionAll = 2,
    MentionAllAndMe = 3
}
export interface ZIMMessageMentionedInfo {
    type: ZIMMessageMentionedType;
    fromUserID: string;
    messageID: string;
    messageSeq: number;
}
export interface ZIMConversation {
    conversationID: string;
    conversationName: string;
    conversationAvatarUrl: string;
    conversationAlias: string;
    type: ZIMConversationType;
    unreadMessageCount: number;
    orderKey: number;
    notificationStatus: ZIMConversationNotificationStatus;
    isPinned: boolean;
    draft: string;
    lastMessage?: ZIMMessage;
    mentionedInfoList: ZIMMessageMentionedInfo[];
    marks: number[];
}
export interface ZIMGroupConversation extends ZIMConversation {
    isDisabled: boolean;
    mutedExpiredTime: number;
}
export interface ZIMConversationChangeInfo {
    event: ZIMConversationEvent;
    conversation: ZIMConversation;
}
export interface ZIMConversationBaseInfo {
    conversationID: string;
    conversationType: ZIMConversationType;
}
export interface ZIMMessageBase {
    type: ZIMMessageType;
    message: string | Uint8Array;
    extendedData?: string;
    localExtendedData?: string;
    mentionedUserIDs?: string[];
    isMentionAll?: boolean;
}
export interface ZIMMediaMessageBase {
    type: ZIMMessageType.Image | ZIMMessageType.File | ZIMMessageType.Audio | ZIMMessageType.Video;
    extendedData?: string;
    localExtendedData?: string;
    mentionedUserIDs?: string[];
    isMentionAll?: boolean;
    fileLocalPath: string;
    fileDownloadUrl?: string;
    thumbnailDownloadUrl?: string;
    largeImageDownloadUrl?: string;
    videoFirstFrameDownloadUrl?: string;
    audioDuration?: number;
    videoDuration?: number;
}
export interface ZIMMessage extends ZIMMessageBase {
    localMessageID: string;
    messageID: string;
    senderUserID: string;
    timestamp: number;
    conversationID: string;
    conversationType: ZIMConversationType;
    direction: ZIMMessageDirection;
    sentStatus: ZIMMessageSentStatus;
    orderKey: number;
    conversationSeq: number;
    messageSeq: number;
    receiptStatus: ZIMMessageReceiptStatus;
    reactions: ZIMMessageReaction[];
    isUserInserted: boolean;
    isBroadcastMessage: boolean;
    rootRepliedCount: number;
    repliedInfo?: ZIMMessageRepliedInfo;
}
export interface ZIMMediaMessage extends ZIMMediaMessageBase, ZIMMessage {
    type: ZIMMessageType.Image | ZIMMessageType.File | ZIMMessageType.Audio | ZIMMessageType.Video;
    fileLocalPath: string;
    fileDownloadUrl: string;
    fileUID: string;
    fileName: string;
    fileSize: number;
}
export interface ZIMTextMessage extends ZIMMessage {
    type: ZIMMessageType.Text;
    message: string;
}
export interface ZIMCommandMessage extends ZIMMessage {
    type: ZIMMessageType.Command;
    message: Uint8Array;
}
export interface ZIMBarrageMessage extends ZIMMessage {
    type: ZIMMessageType.Barrage;
    message: string;
}
export interface ZIMRevokeMessage extends ZIMMessage {
    type: ZIMMessageType.Revoke;
    message: string;
    revokeType: ZIMRevokeType;
    revokeStatus: ZIMMessageRevokeStatus;
    revokeTimestamp: number;
    operatedUserID: string;
    revokeExtendedData: string;
    originalMessageType: ZIMMessageType;
    originalTextMessageContent: string;
}
export interface ZIMCustomMessage extends ZIMMessage {
    type: ZIMMessageType.Custom;
    message: string;
    subType: number;
    searchedContent: string;
}
export interface ZIMCombineMessage extends ZIMMessage {
    type: ZIMMessageType.Combine;
    title: string;
    summary: string;
    combineID: string;
    messageList: ZIMMessage[];
}
export interface ZIMImageMessage extends ZIMMediaMessage {
    type: ZIMMessageType.Image;
    thumbnailDownloadUrl: string;
    largeImageDownloadUrl: string;
    thumbnailLocalPath: string;
    largeImageLocalPath: string;
    originalImageWidth: number;
    originalImageHeight: number;
    thumbnailWidth: number;
    thumbnailHeight: number;
    largeImageWidth: number;
    largeImageHeight: number;
}
export declare enum ZIMTipsMessageEvent {
    Unknown = 0,
    GroupCreated = 1,
    GroupDismissed = 2,
    GroupJoined = 3,
    GroupInvited = 4,
    GroupLeft = 5,
    GroupKickedOut = 6,
    GroupInfoChanged = 7,
    GroupMemberInfoChanged = 8
}
export declare enum ZIMTipsMessageChangeInfoType {
    GroupDataChanged = 1,
    GroupNoticeChanged = 2,
    GroupNameChanged = 3,
    GroupAvatarUrlChanged = 4,
    GroupMuteChanged = 5,
    GroupOwnerTransferred = 10,
    GroupMemberRoleChanged = 11,
    GroupMemberMuteChanged = 12
}
export interface ZIMTipsMessageChangeInfo {
    type: ZIMTipsMessageChangeInfoType;
}
export interface ZIMTipsMessageGroupChangeInfo extends ZIMTipsMessageChangeInfo {
    groupDataFlag: number;
    groupName: string;
    groupAvatarUrl: string;
    groupNotice: string;
    groupMutedInfo: ZIMGroupMuteInfo;
}
export interface ZIMTipsMessageGroupMemberChangeInfo extends ZIMTipsMessageChangeInfo {
    memberRole: number;
    muteExpiredTime: number;
}
export interface ZIMTipsMessage extends ZIMMessage {
    type: ZIMMessageType.Tips;
    event: ZIMTipsMessageEvent;
    operatedUser: ZIMUserInfo;
    targetUserList: ZIMUserInfo[];
    changeInfo?: ZIMTipsMessageChangeInfo;
}
export interface ZIMFileMessage extends ZIMMediaMessage {
    type: ZIMMessageType.File;
}
export interface ZIMAudioMessage extends ZIMMediaMessage {
    type: ZIMMessageType.Audio;
    audioDuration: number;
}
export interface ZIMVideoMessage extends ZIMMediaMessage {
    type: ZIMMessageType.Video;
    videoDuration: number;
    videoFirstFrameDownloadUrl: string;
    videoFirstFrameLocalPath: string;
    videoFirstFrameWidth: number;
    videoFirstFrameHeight: number;
}
export interface ZIMMessageLiteInfo {
    type: ZIMMessageType;
}
export interface ZIMMediaMessageLiteInfo extends ZIMMessageLiteInfo {
    type: ZIMMessageType.Image | ZIMMessageType.File | ZIMMessageType.Audio | ZIMMessageType.Video;
    fileSize: number;
    fileName: string;
    fileDownloadUrl: string;
    fileLocalPath: string;
}
export interface ZIMTextMessageLiteInfo extends ZIMMessageLiteInfo {
    type: ZIMMessageType.Text;
    message: string;
}
export interface ZIMRevokeMessageLiteInfo extends ZIMMessageLiteInfo {
    type: ZIMMessageType.Revoke;
}
export interface ZIMCustomMessageLiteInfo extends ZIMMessageLiteInfo {
    type: ZIMMessageType.Custom;
    message: string;
    subType: number;
}
export interface ZIMCombineMessageLiteInfo extends ZIMMessageLiteInfo {
    type: ZIMMessageType.Combine;
    title: string;
    summary: string;
}
export interface ZIMImageMessageLiteInfo extends ZIMMediaMessageLiteInfo {
    type: ZIMMessageType.Image;
    thumbnailDownloadUrl: string;
    thumbnailLocalPath: string;
    largeImageDownloadUrl: string;
    largeImageLocalPath: string;
    originalImageWidth: number;
    originalImageHeight: number;
    thumbnailWidth: number;
    thumbnailHeight: number;
    largeImageWidth: number;
    largeImageHeight: number;
}
export interface ZIMFileMessageLiteInfo extends ZIMMediaMessageLiteInfo {
    type: ZIMMessageType.File;
}
export interface ZIMAudioMessageLiteInfo extends ZIMMediaMessageLiteInfo {
    type: ZIMMessageType.Audio;
    audioDuration: number;
}
export interface ZIMVideoMessageLiteInfo extends ZIMMediaMessageLiteInfo {
    type: ZIMMessageType.Video;
    videoDuration: number;
    videoFirstFrameDownloadUrl: string;
    videoFirstFrameLocalPath: string;
    videoFirstFrameWidth: number;
    videoFirstFrameHeight: number;
}
export interface ZIMMessageReceivedInfo {
    isOfflineMessage: boolean;
}
export interface ZIMMessageReceiptInfo {
    conversationID: string;
    conversationType: ZIMConversationType;
    messageID: string;
    status: ZIMMessageReceiptStatus;
    readMemberCount: number;
    unreadMemberCount: number;
    isSelfOperated: boolean;
}
export interface ZIMMessageReaction {
    conversationID: string;
    conversationType: ZIMConversationType;
    messageID: string;
    reactionType: string;
    isSelfIncluded: boolean;
    totalCount: number;
    userList: ZIMMessageReactionUserInfo[];
}
export interface ZIMMessageReactionUserInfo {
    userID: string;
}
export interface ZIMMessageSentStatusChangeInfo {
    reason: string;
    status: ZIMMessageSentStatus;
    message: ZIMMessage;
}
export interface ZIMMessageRepliedInfo {
    state: ZIMMessageRepliedInfoState;
    messageSeq: number;
    messageID: string;
    senderUserID: string;
    sentTime: number;
    messageInfo: ZIMMessageLiteInfo;
}
export interface ZIMMessageRootRepliedInfo {
    state: ZIMMessageRepliedInfoState;
    repliedCount: number;
    senderUserID: string;
    sentTime: number;
    message?: ZIMMessage;
}
export interface ZIMMessageRootRepliedCountInfo {
    conversationID: string;
    conversationType: ZIMConversationType;
    count: number;
    messageID: string;
}
export interface ZIMConversationQueryConfig {
    count: number;
    nextConversation?: ZIMConversation;
}
export interface ZIMConversationTotalUnreadMessageCountQueryConfig {
    marks?: number[];
    conversationTypes?: ZIMConversationType[];
}
export interface ZIMConversationFilterOption {
    marks: number[];
    conversationTypes: ZIMConversationType[];
    isOnlyUnreadConversation: boolean;
}
export interface ZIMConversationDeleteConfig {
    isAlsoDeleteServerConversation: boolean;
}
export interface ZIMVoIPConfig {
    iOSVoIPHandleType: ZIMCXHandleType;
    iOSVoIPHandleValue: string;
    iOSVoIPHasVideo: boolean;
}
export interface ZIMPushConfig {
    title: string;
    content: string;
    payload?: string;
    resourcesID?: string;
    badgeIncrement?: number;
    enableBadge?: boolean;
    voIPConfig?: ZIMVoIPConfig;
}
export interface ZIMMessageSendConfig {
    priority: ZIMMessagePriority;
    hasReceipt?: boolean;
    isNotifyMentionedUsers?: boolean;
    pushConfig?: ZIMPushConfig;
}
export interface ZIMMessageDeleteConfig {
    isAlsoDeleteServerMessage: boolean;
}
export interface ZIMMessageQueryConfig {
    count: number;
    reverse: boolean;
    nextMessage?: ZIMMessage;
}
export interface ZIMGroupMessageReceiptMemberQueryConfig {
    count: number;
    nextFlag: number;
}
export interface ZIMMessageRevokeConfig {
    revokeExtendedData: string;
    pushConfig?: ZIMPushConfig;
}
export interface ZIMMessageReactionUserQueryConfig {
    reactionType: string;
    count: number;
    nextFlag: number;
}
export interface ZIMMessageReactionAddedResult {
    reaction: ZIMMessageReaction;
}
export interface ZIMMessageReactionDeletedResult {
    reaction: ZIMMessageReaction;
}
export interface ZIMMessageReactionUserListQueriedResult {
    totalCount: number;
    nextFlag: number;
    reactionType: string;
    userList: ZIMMessageReactionUserInfo[];
    message: ZIMMessage;
}
export interface ZIMMessageRepliedListQueryConfig {
    count: number;
    nextFlag: number;
}
export interface ZIMMessageRepliedListQueriedResult {
    nextFlag: number;
    rootRepliedInfo: ZIMMessageRootRepliedInfo;
    messageList: ZIMMessage[];
}
export interface ZIMConversationQueriedResult {
    conversation: ZIMConversation;
}
export interface ZIMConversationListQueriedResult {
    conversationList: ZIMConversation[];
}
export interface ZIMConversationPinnedListQueriedResult {
    conversationList: ZIMConversation[];
}
export interface ZIMConversationDeletedResult {
    conversationID: string;
    conversationType: ZIMConversationType;
}
export interface ZIMConversationNotificationStatusSetResult {
    conversationID: string;
    conversationType: ZIMConversationType;
}
export interface ZIMConversationPinnedStateUpdatedResult {
    conversationID: string;
    conversationType: ZIMConversationType;
}
export interface ZIMConversationUnreadMessageCountClearedResult {
    conversationID: string;
    conversationType: ZIMConversationType;
}
export interface ZIMConversationMarkSetResult {
    failedConversationInfos: ZIMConversationBaseInfo[];
}
export interface ZIMConversationTotalUnreadMessageCountQueriedResult {
    unreadMessageCount: number;
}
export interface ZIMMessageDeletedResult {
    conversationID: string;
    conversationType: ZIMConversationType;
}
export interface ZIMMessageSentResult {
    message: ZIMMessage;
}
export interface ZIMMessageQueriedResult {
    conversationID: string;
    conversationType: ZIMConversationType;
    messageList: ZIMMessage[];
}
export interface ZIMMediaMessageSentResult {
    message: ZIMMediaMessage;
}
export declare type ZIMMediaDownloadingProgress = (message: ZIMMediaMessage, currentFileSize: number, totalFileSize: number) => void;
export interface ZIMMediaDownloadedResult {
    message: ZIMMediaMessage;
}
export interface ZIMMessageSendNotification {
    onMessageAttached: (message: ZIMMessage) => void;
    onMediaUploadingProgress: (message: ZIMMessage, currentFileSize: number, totalFileSize: number) => void;
}
export interface ZIMMediaMessageSendNotification {
    onMessageAttached: (message: ZIMMediaMessage) => void;
    onMediaUploadingProgress: (message: ZIMMediaMessage, currentFileSize: number, totalFileSize: number) => void;
}
export interface ZIMMessageInsertedResult {
    message: ZIMMessage;
}
export interface ZIMMessageLocalExtendedDataUpdatedResult {
    message: ZIMMessage;
}
export interface ZIMConversationMessageReceiptReadSentResult {
    conversationID: string;
    conversationType: ZIMConversationType;
}
export interface ZIMMessageReceiptsReadSentResult {
    conversationID: string;
    conversationType: ZIMConversationType;
    errorMessageIDs: string[];
}
export interface ZIMMessageReceiptsInfoQueriedResult {
    infos: ZIMMessageReceiptInfo[];
    errorMessageIDs: string[];
}
export interface ZIMGroupMessageReceiptMemberListQueriedResult {
    groupID: string;
    userList: ZIMGroupMemberInfo[];
    nextFlag: number;
}
export interface ZIMMessageRevokedResult {
    message: ZIMRevokeMessage;
}
export interface ZIMRoomMemberQueriedResult {
    roomID: string;
    memberList: ZIMUserInfo[];
    nextFlag: string;
}
export interface ZIMRoomMembersQueriedResult {
    roomID: string;
    memberList: ZIMRoomMemberInfo[];
    errorUserList: ZIMErrorUserInfo[];
}
export interface ZIMRoomSwitchedResult {
    roomInfo: ZIMRoomFullInfo;
}
export interface ZIMRoomInfo {
    roomID: string;
    roomName: string;
}
export interface ZIMRoomFullInfo {
    baseInfo: ZIMRoomInfo;
}
export interface ZIMRoomMemberInfo extends ZIMUserInfo {
}
export interface ZIMRoomAttributesUpdateInfo {
    action: ZIMRoomAttributesUpdateAction;
    roomAttributes: Record<string, string>;
}
export interface ZIMRoomMemberQueryConfig {
    count: number;
    nextFlag: string;
}
export interface ZIMRoomAdvancedConfig {
    roomAttributes: Record<string, string>;
    roomDestroyDelayTime: number;
}
export interface ZIMRoomAttributesDeleteConfig {
    isForce: boolean;
}
export interface ZIMRoomAttributesSetConfig {
    isForce: boolean;
    isUpdateOwner: boolean;
    isDeleteAfterOwnerLeft: boolean;
}
export interface ZIMRoomAttributesBatchOperationConfig {
    isForce: boolean;
    isUpdateOwner: boolean;
    isDeleteAfterOwnerLeft: boolean;
}
export interface ZIMRoomCreatedResult {
    roomInfo: ZIMRoomFullInfo;
}
export interface ZIMRoomEnteredResult {
    roomInfo: ZIMRoomFullInfo;
}
export interface ZIMRoomJoinedResult {
    roomInfo: ZIMRoomFullInfo;
}
export interface ZIMRoomLeftResult {
    roomID: string;
}
export interface ZIMRoomAttributesBatchOperatedResult {
    roomID: string;
}
export interface ZIMRoomOnlineMemberCountQueriedResult {
    roomID: string;
    count: number;
}
export interface ZIMRoomAttributesOperatedResult {
    roomID: string;
    errorKeys: string[];
}
export interface ZIMRoomAttributesQueriedResult {
    roomID: string;
    roomAttributes: Record<string, string>;
}
export interface ZIMRoomMemberAttributesInfo {
    userID: string;
    attributes: Record<string, string>;
}
export interface ZIMRoomMemberAttributesOperatedInfo {
    attributesInfo: ZIMRoomMemberAttributesInfo;
    errorKeys: string[];
}
export interface ZIMRoomMemberAttributesUpdateInfo {
    attributesInfo: ZIMRoomMemberAttributesInfo;
}
export interface ZIMRoomMemberAttributesSetConfig {
    isDeleteAfterOwnerLeft: boolean;
}
export interface ZIMRoomMemberAttributesQueryConfig {
    count: number;
    nextFlag: string;
}
export interface ZIMRoomOperatedInfo {
    userID: string;
}
export interface ZIMRoomMembersAttributesOperatedResult {
    roomID: string;
    infos: ZIMRoomMemberAttributesOperatedInfo[];
    errorUserList: string[];
}
export interface ZIMRoomMembersAttributesQueriedResult {
    roomID: string;
    infos: ZIMRoomMemberAttributesInfo[];
}
export interface ZIMRoomMemberAttributesListQueriedResult {
    roomID: string;
    infos: ZIMRoomMemberAttributesInfo[];
    nextFlag: string;
}
export interface ZIMGroupInfo {
    groupID: string;
    groupName: string;
    groupAvatarUrl: string;
}
export interface ZIMGroupFullInfo {
    baseInfo: ZIMGroupInfo;
    groupNotice: string;
    groupAttributes: Record<string, string>;
    groupAlias: string;
    notificationStatus: ZIMGroupMessageNotificationStatus;
    createTime: number;
    maxMemberCount: number;
    mutedInfo: ZIMGroupMuteInfo;
    verifyInfo: ZIMGroupVerifyInfo;
}
export interface ZIMGroup {
    baseInfo: ZIMGroupInfo;
    groupAlias: string;
    notificationStatus: ZIMGroupMessageNotificationStatus;
}
export interface ZIMGroupMemberInfo extends ZIMUserInfo {
    memberNickname: string;
    memberRole: number;
    memberAvatarUrl: string;
    groupEnterInfo: ZIMGroupEnterInfo;
}
export interface ZIMGroupEnterInfo {
    enterTime: number;
    enterType: ZIMGroupEnterType;
    operatedUser?: ZIMGroupMemberSimpleInfo;
}
export declare enum ZIMGroupEnterType {
    Unknown = 0,
    Created = 1,
    JoinApply = 2,
    Joined = 3,
    Invited = 4,
    InviteApply = 5
}
export interface ZIMGroupOperatedInfo {
    /**
     * @deprecated
     */
    operatedUserInfo: ZIMGroupMemberInfo;
    userID: string;
    userName: string;
    memberNickname: string;
    memberRole: number;
}
export interface ZIMGroupAttributesUpdateInfo {
    action: ZIMGroupAttributesUpdateAction;
    groupAttributes: Record<string, string>;
}
export interface ZIMGroupAdvancedConfig {
    groupNotice: string;
    groupAttributes: Record<string, string>;
    maxMemberCount: number;
    joinMode: ZIMGroupJoinMode;
    inviteMode: ZIMGroupInviteMode;
    beInviteMode: ZIMGroupBeInviteMode;
}
export interface ZIMGroupMemberQueryConfig {
    count: number;
    nextFlag: number;
}
export interface ZIMGroupLeftResult {
    groupID: string;
}
export interface ZIMGroupDismissedResult {
    groupID: string;
}
export interface ZIMGroupCreatedResult {
    groupInfo: ZIMGroupFullInfo;
    userList: ZIMGroupMemberInfo[];
    errorUserList: ZIMErrorUserInfo[];
}
export interface ZIMGroupJoinedResult {
    groupInfo: ZIMGroupFullInfo;
}
export interface ZIMGroupInfoQueriedResult {
    groupInfo: ZIMGroupFullInfo;
}
export interface ZIMGroupListQueriedResult {
    groupList: ZIMGroup[];
}
export interface ZIMGroupNameUpdatedResult {
    groupID: string;
    groupName: string;
}
export interface ZIMGroupAvatarUrlUpdatedResult {
    groupID: string;
    groupAvatarUrl: string;
}
export interface ZIMGroupNoticeUpdatedResult {
    groupID: string;
    groupNotice: string;
}
export interface ZIMGroupAliasUpdatedResult {
    groupID: string;
    groupAlias: string;
}
export interface ZIMGroupAttributesOperatedResult {
    groupID: string;
    errorKeys: string[];
}
export interface ZIMGroupAttributesQueriedResult {
    groupID: string;
    groupAttributes: Record<string, string>;
}
export interface ZIMGroupUsersInvitedResult {
    groupID: string;
    userList: ZIMGroupMemberInfo[];
    errorUserList: ZIMErrorUserInfo[];
}
export interface ZIMGroupOwnerTransferredResult {
    groupID: string;
    toUserID: string;
}
export interface ZIMGroupMemberKickedResult {
    groupID: string;
    kickedUserIDs: string[];
    errorUserList: ZIMErrorUserInfo[];
}
export interface ZIMGroupMemberListQueriedResult {
    groupID: string;
    userList: ZIMGroupMemberInfo[];
    nextFlag: number;
}
export interface ZIMGroupMemberInfoQueriedResult {
    groupID: string;
    userInfo: ZIMGroupMemberInfo;
}
export interface ZIMGroupMemberNicknameUpdatedResult {
    groupID: string;
    forUserID: string;
    nickname: string;
}
export interface ZIMGroupMemberRoleUpdatedResult {
    groupID: string;
    forUserID: string;
    role: number;
}
export interface ZIMGroupMemberCountQueriedResult {
    groupID: string;
    count: number;
}
export interface ZIMCallUserInfo {
    userID: string;
    state: ZIMCallUserState;
    extendedData: string;
}
export interface ZIMCallInfo {
    callID: string;
    caller: string;
    inviter: string;
    mode: ZIMCallInvitationMode;
    state: ZIMCallState;
    extendedData: string;
    createTime: number;
    endTime: number;
    callUserList: ZIMCallUserInfo[];
}
export interface ZIMCallInviteConfig {
    mode: ZIMCallInvitationMode;
    timeout: number;
    extendedData: string;
    pushConfig?: ZIMPushConfig;
    enableNotReceivedCheck?: boolean;
}
export interface ZIMCallCancelConfig {
    extendedData: string;
    pushConfig?: ZIMPushConfig;
}
export interface ZIMCallAcceptConfig {
    extendedData: string;
}
export interface ZIMCallRejectConfig {
    extendedData: string;
}
export interface ZIMCallingInviteConfig {
    pushConfig?: ZIMPushConfig;
}
export interface ZIMCallQuitConfig {
    extendedData: string;
    pushConfig?: ZIMPushConfig;
}
export interface ZIMCallEndConfig {
    extendedData: string;
    pushConfig?: ZIMPushConfig;
}
export interface ZIMCallJoinConfig {
    extendedData: string;
}
export interface ZIMCallInvitationQueryConfig {
    count: number;
    nextFlag?: number;
}
export interface ZIMCallInvitationSentResult {
    callID: string;
    timeout: number;
    errorUserList: ZIMErrorUserInfo[];
    /**
     * @deprecated
     */
    errorInvitees: ZIMCallUserInfo[];
}
export interface ZIMCallCancelSentResult {
    callID: string;
    errorInvitees: string[];
}
export interface ZIMCallAcceptanceSentResult {
    callID: string;
}
export interface ZIMCallRejectionSentResult {
    callID: string;
}
export interface ZIMCallingInvitationSentResult {
    callID: string;
    errorUserList: ZIMErrorUserInfo[];
}
export interface ZIMCallQuitSentResult {
    callID: string;
    createTime: number;
    acceptTime: number;
    quitTime: number;
}
export interface ZIMCallEndSentResult {
    callID: string;
    createTime: number;
    acceptTime: number;
    endTime: number;
}
export interface ZIMCallJoinSentResult {
    callID: string;
    createTime: number;
    joinTime: number;
    extendedData: string;
    callUserList: ZIMCallUserInfo[];
}
export interface ZIMCallInvitationListQueriedResult {
    callList: ZIMCallInfo[];
    nextFlag: number;
}
export interface ZIMConversationSearchConfig {
    keywords: string[];
    senderUserIDs: string[];
    messageTypes: ZIMMessageType[];
    subMessageTypes: number[];
    startTime: number;
    endTime: number;
    totalConversationCount: number;
    conversationMessageCount: number;
    nextFlag?: number;
}
export interface ZIMMessageSearchConfig {
    keywords: string[];
    senderUserIDs: string[];
    messageTypes: ZIMMessageType[];
    subMessageTypes: number[];
    startTime: number;
    endTime: number;
    order: ZIMMessageOrder;
    count: number;
    nextMessage?: ZIMMessage;
}
export interface ZIMGroupSearchConfig {
    keywords: string[];
    isAlsoMatchGroupMemberUserName: boolean;
    isAlsoMatchGroupMemberNickname: boolean;
    count: number;
    nextFlag: number;
}
export interface ZIMGroupMemberSearchConfig {
    keywords: string[];
    isAlsoMatchGroupMemberNickname: boolean;
    count: number;
    nextFlag: number;
}
export interface ZIMConversationSearchInfo {
    conversationID: string;
    conversationType: ZIMConversationType;
    totalMessageCount: number;
    messageList: ZIMMessage[];
}
export interface ZIMGroupSearchInfo {
    groupInfo: ZIMGroupInfo;
    userList: ZIMGroupMemberInfo[];
}
export interface ZIMConversationsSearchedResult {
    conversationSearchInfoList: ZIMConversationSearchInfo[];
    nextFlag?: number;
}
export interface ZIMMessagesGlobalSearchedResult {
    messageList: ZIMMessage[];
    nextMessage?: ZIMMessage;
}
export interface ZIMMessagesSearchedResult {
    conversationID: string;
    conversationType: ZIMConversationType;
    messageList: ZIMMessage[];
    nextMessage?: ZIMMessage;
}
export interface ZIMGroupsSearchedResult {
    groupSearchInfoList: ZIMGroupSearchInfo[];
    nextFlag: number;
}
export interface ZIMGroupMembersSearchedResult {
    groupID: string;
    userList: ZIMGroupMemberInfo[];
    nextFlag: number;
}
export interface ZIMCombineMessageDetailQueriedResult {
    message: ZIMCombineMessage;
}
export interface ZIMConversationDraftSetResult {
    conversationID: string;
    conversationType: ZIMConversationType;
}
export declare enum ZIMGroupMuteMode {
    None = 0,
    Normal = 1,
    All = 2,
    Custom = 3
}
export interface ZIMGroupMuteConfig {
    mode: ZIMGroupMuteMode;
    duration: number;
    roles: number[];
}
export interface ZIMGroupMuteInfo {
    mode: ZIMGroupMuteMode;
    expiredTime: number;
    roles: number[];
}
export interface ZIMGroupMutedResult {
    groupID: string;
    isMute: boolean;
    mutedInfo: ZIMGroupMuteInfo;
}
export interface ZIMGroupMemberMuteConfig {
    duration: number;
}
export interface ZIMGroupMembersMutedResult {
    groupID: string;
    isMute: boolean;
    duration: number;
    mutedUserIDs: string[];
    errorUserList: ZIMErrorUserInfo[];
}
export interface ZIMFriendInfo extends ZIMUserInfo {
    wording: string;
    friendAlias: string;
    friendAttributes: Record<string, string>;
    createTime: number;
}
export declare enum ZIMFriendApplicationType {
    None = 0,
    Received = 1,
    Sent = 2,
    Both = 3
}
export declare enum ZIMFriendApplicationState {
    Waiting = 1,
    Accepted = 2,
    Rejected = 3,
    Expired = 4,
    Disabled = 5
}
export interface ZIMFriendApplicationInfo {
    applyUser: ZIMUserInfo;
    wording: string;
    createTime: number;
    updateTime: number;
    type: ZIMFriendApplicationType;
    state: ZIMFriendApplicationState;
}
export interface ZIMFriendAddConfig {
    wording: string;
    friendAlias: string;
    friendAttributes: Record<string, string>;
}
export interface ZIMFriendAddedResult {
    friendInfo: ZIMFriendInfo;
}
export interface ZIMFriendApplicationSendConfig {
    wording: string;
    friendAlias: string;
    friendAttributes: Record<string, string>;
    pushConfig?: ZIMPushConfig;
}
export interface ZIMFriendApplicationSentResult {
    applicationInfo: ZIMFriendApplicationInfo;
}
export declare enum ZIMFriendDeleteType {
    Both = 0,
    Single = 1
}
export interface ZIMFriendDeleteConfig {
    type: ZIMFriendDeleteType;
}
export interface ZIMFriendsDeletedResult {
    errorUserList: ZIMErrorUserInfo[];
}
export declare enum ZIMFriendRelationCheckType {
    Both = 0,
    Single = 1
}
export interface ZIMFriendRelationCheckConfig {
    type: ZIMFriendRelationCheckType;
}
export declare enum ZIMUserRelationType {
    /** 单向校验 - A 的好友表中没有 B，但无法确定 B 的好友表中是否有 A  */
    SingleNo = 1,
    /** 单向校验 - A 的好友表中有 B，但无法确定 B 的好友表中是否有 A  */
    SingleHave = 2,
    /** 双向校验 - A 的好友表中没有 B，B 的好友表中也没有 A */
    BothAllNo = 3,
    /** 双向校验 - A 的好友表中有 B，但 B 的好友表中没有 A */
    BothSelfHave = 4,
    /** 双向校验 - A 的好友表中没有 B，但 B 的好友表中有 A */
    BothOtherHave = 5,
    /** 双向校验 - A 的好友表中有 B，B 的好友表中也有 A */
    BothAllHave = 6
}
export interface ZIMFriendRelationInfo {
    userID: string;
    type: ZIMUserRelationType;
}
export interface ZIMFriendsRelationCheckedResult {
    relationInfos: ZIMFriendRelationInfo[];
    errorUserList: ZIMErrorUserInfo[];
}
export interface ZIMFriendAliasUpdatedResult {
    friendInfo: ZIMFriendInfo;
}
export interface ZIMFriendAttributesUpdatedResult {
    friendInfo: ZIMFriendInfo;
}
export interface ZIMFriendApplicationAcceptConfig {
    friendAlias: string;
    friendAttributes: Record<string, string>;
    pushConfig?: ZIMPushConfig;
}
export interface ZIMFriendApplicationAcceptedResult {
    friendInfo: ZIMFriendInfo;
}
export interface ZIMFriendApplicationRejectConfig {
    pushConfig?: ZIMPushConfig;
}
export interface ZIMFriendApplicationRejectedResult {
    userInfo: ZIMUserInfo;
}
export interface ZIMFriendListQueryConfig {
    count: number;
    nextFlag?: number;
}
export interface ZIMFriendsInfoQueriedResult {
    friendInfos: ZIMFriendInfo[];
    errorUserList: ZIMErrorUserInfo[];
}
export interface ZIMFriendListQueriedResult {
    nextFlag: number;
    friendList: ZIMFriendInfo[];
}
export interface ZIMFriendApplicationListQueryConfig {
    count: number;
    nextFlag?: number;
}
export interface ZIMFriendApplicationListQueriedResult {
    nextFlag: number;
    applicationList: ZIMFriendApplicationInfo[];
}
export interface ZIMFriendSearchConfig {
    count: number;
    nextFlag?: number;
    keywords: string[];
    isAlsoMatchFriendAlias: boolean;
}
export interface ZIMFriendsSearchedResult {
    friendInfos: ZIMFriendInfo[];
    nextFlag: number;
}
export interface ZIMBlacklistUsersAddedResult {
    errorUserList: ZIMErrorUserInfo[];
}
export interface ZIMBlacklistUsersRemovedResult {
    errorUserList: ZIMErrorUserInfo[];
}
export interface ZIMBlacklistQueryConfig {
    count: number;
    nextFlag?: number;
}
export interface ZIMBlacklistQueriedResult {
    nextFlag: number;
    blacklist: ZIMUserInfo[];
}
export interface ZIMBlacklistCheckedResult {
    isUserInBlacklist: boolean;
}
export declare enum ZIMGroupJoinMode {
    Any = 0,
    Auth = 1,
    Forbid = 2
}
export declare enum ZIMGroupInviteMode {
    Any = 0,
    Admin = 1
}
export declare enum ZIMGroupBeInviteMode {
    None = 0,
    Auth = 1
}
export interface ZIMGroupJoinApplicationSendConfig {
    wording: string;
    pushConfig?: ZIMPushConfig;
}
export interface ZIMGroupJoinApplicationSentResult {
    groupID: string;
}
export interface ZIMGroupJoinApplicationAcceptConfig {
    pushConfig?: ZIMPushConfig;
}
export interface ZIMGroupJoinApplicationAcceptedResult {
    groupID: string;
    userID: string;
}
export interface ZIMGroupInviteApplicationAcceptedResult {
    groupInfo: ZIMGroupFullInfo;
    inviterUserID: string;
}
export interface ZIMGroupJoinApplicationRejectConfig {
    pushConfig?: ZIMPushConfig;
}
export interface ZIMGroupJoinApplicationRejectedResult {
    groupID: string;
    userID: string;
}
export interface ZIMGroupInviteApplicationRejectedResult {
    groupID: string;
    inviterUserID: string;
}
export interface ZIMGroupInviteApplicationSendConfig {
    wording: string;
    pushConfig?: ZIMPushConfig;
}
export interface ZIMGroupInviteApplicationsSentResult {
    groupID: string;
    errorUserList: ZIMErrorUserInfo[];
}
export interface ZIMGroupInviteApplicationAcceptConfig {
    pushConfig?: ZIMPushConfig;
}
export interface ZIMGroupInviteApplicationAcceptedResult {
    groupInfo: ZIMGroupFullInfo;
    inviterUserID: string;
}
export interface ZIMGroupInviteApplicationRejectConfig {
    pushConfig?: ZIMPushConfig;
}
export interface ZIMGroupInviteApplicationRejectedResult {
    groupID: string;
    inviterUserID: string;
}
export declare enum ZIMGroupApplicationType {
    None = 0,
    Join = 1,
    Invite = 2,
    BeInvite = 3
}
export declare enum ZIMGroupApplicationState {
    Waiting = 1,
    Accepted = 2,
    Rejected = 3,
    Expired = 4,
    Disabled = 5
}
export interface ZIMGroupMemberSimpleInfo extends ZIMUserInfo {
    memberNickname: string;
    memberRole: number;
}
export interface ZIMGroupApplicationListQueryConfig {
    count: number;
    nextFlag: number;
}
export interface ZIMGroupApplicationListQueriedResult {
    nextFlag: number;
    applicationList: ZIMGroupApplicationInfo[];
}
export interface ZIMGroupJoinModeUpdatedResult {
    groupID: string;
    mode: ZIMGroupJoinMode;
}
export declare enum ZIMGroupVerifyType {
    Join = 0,
    Invite = 1,
    BeInvite = 2
}
export interface ZIMGroupBeInviteModeUpdatedResult {
    groupID: string;
    mode: ZIMGroupBeInviteMode;
}
export interface ZIMGroupInviteModeUpdatedResult {
    groupID: string;
    mode: ZIMGroupInviteMode;
}
export declare enum ZIMPlatformType {
    Win = 1,
    IPhoneOS = 2,
    Android = 3,
    MacOS = 4,
    Linux = 5,
    Web = 6,
    MiniIProgram = 7,
    IPadOS = 9,
    Unknown = 32
}
export interface ZIMUserOfflinePushRule {
    onlinePlatforms: ZIMPlatformType[];
    notToReceiveOfflinePushPlatforms: ZIMPlatformType[];
}
export interface ZIMUserOfflinePushRuleUpdatedResult {
    offlinePushRule: ZIMUserOfflinePushRule;
}
export interface ZIMUserRule {
    offlinePushRule: ZIMUserOfflinePushRule;
}
export interface ZIMSelfUserInfo {
    userRule: ZIMUserRule;
    userFullInfo: ZIMUserFullInfo;
    userStatus: ZIMUserStatus;
}
export interface ZIMSelfUserInfoQueriedResult {
    selfUserInfo: ZIMSelfUserInfo;
}
export interface ZIMUserStatusSubscribeConfig {
    subscriptionDuration: number;
}
export interface ZIMSubscribedUserStatusQueryConfig {
    userIDs?: string[];
}
export interface ZIMUsersStatusSubscribedResult {
    errorUserList: ZIMErrorUserInfo[];
}
export interface ZIMUsersStatusUnsubscribedResult {
    errorUserList: ZIMErrorUserInfo[];
}
export interface ZIMUsersStatusQueriedResult {
    userStatusList: ZIMUserStatus[];
    errorUserList: ZIMErrorUserInfo[];
}
export interface ZIMSubscribedUserStatusListQueriedResult {
    userStatusSubscriptionList: ZIMUserStatusSubscription[];
}
export interface ZIMRoomAllLeftResult {
    roomIDs: string[];
}
export interface ZIMGroupVerifyInfo {
    joinMode: ZIMGroupJoinMode;
    inviteMode: ZIMGroupInviteMode;
    beInviteMode: ZIMGroupBeInviteMode;
}
export interface ZIMGroupApplicationInfo {
    type: ZIMGroupApplicationType;
    state: ZIMGroupApplicationState;
    createTime: number;
    updateTime: number;
    wording: string;
    applyUser: ZIMUserInfo;
    groupInfo: ZIMGroupInfo;
    operatedUser?: ZIMGroupMemberSimpleInfo;
}
export declare enum ZIMGroupApplicationListChangeAction {
    Added = 0
}
export declare enum ZIMBlacklistChangeAction {
    Added = 0,
    Removed = 1
}
export declare enum ZIMFriendListChangeAction {
    Added = 0,
    Deleted = 1
}
export interface ZIMFriendInfo extends ZIMUserInfo {
    wording: string;
    friendAlias: string;
    friendAttributes: Record<string, string>;
    createTime: number;
}
export declare enum ZIMFriendApplicationListChangeAction {
    Added = 0
}
export interface ZIMFriendApplicationInfo {
    applyUser: ZIMUserInfo;
    wording: string;
    createTime: number;
    updateTime: number;
    type: ZIMFriendApplicationType;
    state: ZIMFriendApplicationState;
}
export interface ZIMMessageExportConfig {
}
export interface ZIMMessageImportConfig {
}
export declare type ZIMMessageExportingProgress = (exportedMessageCount: number, totalMessageCount: number) => void;
export declare type ZIMMessageImportingProgress = (importedMessageCount: number, totalMessageCount: number) => void;
export interface ZIMFileCacheQueryConfig {
    endTime?: number;
}
export interface ZIMFileCacheClearConfig {
    endTime?: number;
}
export interface ZIMFileCacheInfo {
    totalFileSize: number;
}
export interface ZIMFileCacheQueriedResult {
    fileCacheInfo: ZIMFileCacheInfo;
}
