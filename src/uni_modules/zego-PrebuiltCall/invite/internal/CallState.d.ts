/**
 * 呼叫状态枚举。
 */
export declare enum CallState {
    /**
     * 无通话 - 未回复
     */
    NoneCallNoReply = -5,
    /**
     * 无通话 - 错过接听
     */
    NoneReceiveMissed = -4,
    /**
     * 无通话 - 被拒绝
     */
    NoneRejected = -3,
    /**
     * 无通话 - 已取消
     */
    NoneCanceled = -2,
    /**
     * 无通话 - 已挂断
     */
    NoneHangUp = -1,
    /**
     * 无通话
     */
    None = 0,
    /**
     * 呼出中
     */
    Outgoing = 1,
    /**
     * 通话中
     */
    Connected = 2,
    /**
     * 呼入中
     */
    Incoming = 3
}
