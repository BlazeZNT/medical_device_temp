import axios from '@/utils/axios';

// Send login request with phone number
const sendLoginRequest = (phoneNumber: string) => {
  return axios.post('/login', { phoneNumber });
};

// Get list of doctors
const getDoctors = () => {
  return axios.get('/doctors/list');
};

// Get list of appointments
const getAppointments = () => {
  return axios.get('/appointments/list');
};

// Create a new appointment (including an image file upload)
const createAppointment = (name: string, specialization: string, date: string, time: string, year: string, image: File) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('specialization', specialization);
  formData.append('date', date);
  formData.append('time', time);
  formData.append('year', year);
  formData.append('image', image); // This appends the image as a file
  
  return axios.post('/appointments/add', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',  // Ensure we send the request as form data
    },
  });
};

export { sendLoginRequest, getDoctors, getAppointments, createAppointment };
