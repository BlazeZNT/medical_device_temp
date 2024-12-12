export declare class NotifyList<T> {
    private listeners;
    addListener(key: string, data: T): void;
    removeListener(key: string): void;
    notifyAllListener(notifier: (data: T) => void): void;
    clear(): void;
}
