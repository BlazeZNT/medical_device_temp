export class NotifyList {
    listeners = [];
    addListener(key, data) {
        this.listeners.push({ key, data });
    }
    removeListener(key) {
        this.listeners = this.listeners.filter(listener => listener.key !== key);
    }
    notifyAllListener(notifier) {
        this.listeners.forEach(listener => {
            notifier(listener.data);
        });
    }
    clear() {
        this.listeners = [];
    }
}
