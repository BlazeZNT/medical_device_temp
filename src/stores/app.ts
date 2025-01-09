import { defineStore } from 'pinia';

interface AppState {
  sys?: string | number;
  notifications: Array<{ id: string; name: string; message: string; source: string }>; // Add notifications
  patient: Array<{ id: number; name: string; age: number; gender: string; dateOfBirth: string; phoneNumber: string }>; // Add patient
  loggedout: boolean; // Add loggedout state
}

export const useAppStore = defineStore({
  id: 'app-store',
  state: (): AppState => ({
    sys: undefined,
    notifications: [], // Initialize notifications
    patient: [], // Initialize patient
	loggedout: true, // Default to true (logged out)
	
  }),
  getters: {
    allNotifications: (state) => state.notifications, // Getter for notifications
    getPatient: (state) => state.patient, // Getter for patient
	isLoggedOut: (state) => state.loggedout,
  },
  actions: {
    addNotification(notification: { id: string; name: string; message: string; source: string }) {
      this.notifications.unshift(notification); // Add a new notification
    },
    setPatient(patient: { id: number; name: string; age: number; gender: string; dateOfBirth: string; phoneNumber: string }) {
      this.patient.unshift(patient); // Add a new patient
    },
	logIn() {
	      this.loggedout = false; // Set loggedout to false
	},
	logOut() {
	      this.loggedout = true; // Set loggedout to true
	},
  },
  // persist: true, // Enable persistence
});