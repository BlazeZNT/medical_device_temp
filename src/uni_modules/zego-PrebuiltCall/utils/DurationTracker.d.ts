import { ZegoDurationUpdateListener } from "../config/defines";
export declare class DurationTracker {
    private static _instance;
    private _durationStart;
    private _duration;
    private readonly _listeners;
    private constructor();
    static getInstance(): DurationTracker;
    initialize(): void;
    reset(): void;
    advance(): void;
    currentDuration(): number;
    addListener(listenerID: string, listener: ZegoDurationUpdateListener): void;
    removeListener(listenerID: string): void;
    private notifyListeners;
}
export declare function durationFormat(duration: number): string;
