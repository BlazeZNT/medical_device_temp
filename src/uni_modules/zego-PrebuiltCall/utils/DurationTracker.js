export class DurationTracker {
    static _instance = null;
    _durationStart = Date.now();
    _duration = 0;
    _listeners = new Map(); // 将_callbacks更改为_listeners
    constructor() { }
    static getInstance() {
        if (!this._instance) {
            this._instance = new DurationTracker();
        }
        return this._instance;
    }
    initialize() {
        this.reset();
    }
    reset() {
        this._duration = 0;
        this._durationStart = Date.now();
    }
    advance() {
        const realDuration = Math.floor((Date.now() - this._durationStart) / 1000);
        const duration = this._duration + 1;
        if (realDuration >= duration + 1) {
            this._duration = realDuration;
        }
        else {
            this._duration = duration;
        }
        this.notifyListeners(duration);
    }
    currentDuration() {
        const realDuration = Math.floor((Date.now() - this._durationStart) / 1000);
        if (realDuration - this._duration > 2) {
            return realDuration;
        }
        return this._duration;
    }
    addListener(listenerID, listener) {
        this._listeners.set(listenerID, listener);
    }
    removeListener(listenerID) {
        this._listeners.delete(listenerID);
    }
    notifyListeners(newDuration) {
        this._listeners.forEach((listener) => listener(newDuration));
    }
}
export function durationFormat(duration) {
    const totalSeconds = duration || 0;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    // 使用padStart方法自动补零
    const formatTime = (time) => time.toString().padStart(2, '0');
    // 构建格式化的时间字符串
    return `${hours > 0 ? `${formatTime(hours)}:` : ''}${formatTime(minutes)}:${formatTime(seconds)}`;
}
