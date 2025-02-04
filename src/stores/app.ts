// import { defineStore } from 'pinia';

// interface AppState {
//   sys?: string | number
// }

// export const useAppStore = defineStore({
//   id: 'app-store',
//   state: (): AppState => ({}),
//   getters: {},
//   actions: {},
// });

import { defineStore } from 'pinia';

interface AppState {
  sys?: string | number;
  notifications: Array<{ id: string; name: string; message: string; source: string }>; // Add notifications
}

export const useAppStore = defineStore({
  id: 'app-store',
  state: (): AppState => ({
    sys: undefined,
    notifications: [], // Initialize notifications
  }),
  getters: {
    allNotifications: (state) => state.notifications, // Getter for notifications
  },
  actions: {
    addNotification(notification: { id: string; name: string; message: string; source: string }) {
      this.notifications.unshift(notification); // Add a new notification
    },
  },
});
