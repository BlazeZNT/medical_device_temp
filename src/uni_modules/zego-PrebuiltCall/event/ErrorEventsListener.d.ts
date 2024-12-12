export interface ErrorEventsListener {
    /**
     * 当发生错误时调用此方法。
     *
     * @param errorCode 错误代码，具体错误代码定义见ErrorEventsListenerCodes类。
     * @param message   错误信息，对错误的详细描述。
     */
    onError(errorCode: number, message: string): void;
}
export declare class ErrorEventsListenerCodes {
    static readonly SUCCESS = 0;
    static readonly INIT_PARAM_ERROR = -1;
    static readonly INIT_ALREADY = -2;
}
