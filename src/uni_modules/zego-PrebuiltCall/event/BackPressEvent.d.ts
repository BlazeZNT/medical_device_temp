export interface BackPressEvent {
    /**
     * 默认的返回键事件是立即结束通话，重写此事件以更改默认事件。
     *
     * 如果您正在使用最小化功能，您可以返回true并在回调中调用ZegoUIKitPrebuiltCallInvitationService.minimizeCall()来最小化通话。
     * 或者，您也可以仅在回调中返回true以防止用户通过后退按钮结束通话。
     *
     * @returns 返回false表示将执行默认操作；如果返回true，则表示您将在按下后退按钮时执行某些操作，默认操作将被阻止。
     */
    onBackPressed(): boolean;
}
