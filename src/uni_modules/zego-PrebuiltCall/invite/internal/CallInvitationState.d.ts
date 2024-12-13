/**
 * 呼叫邀请状态枚举。
 */
export declare enum CallInvitationState {
    /**
     * 错误状态，表示邀请过程中发生了错误。
     */
    Error = 0,
    /**
     * 等待状态，表示邀请已发出，正在等待对方响应。
     */
    Waiting = 1,
    /**
     * 接受状态，表示对方接受了邀请。
     */
    Accept = 2,
    /**
     * 拒绝状态，表示对方拒绝了邀请。
     */
    Refuse = 3,
    /**
     * 取消状态，表示邀请被发起方取消。
     */
    Cancel = 4,
    /**
     * 超时状态，表示邀请等待响应超时。
     */
    Timeout = 5
}