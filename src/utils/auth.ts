import axios from '@/utils/axios';

const sendLoginRequest = (phoneNumber: string) => {
  return axios.post('/login', { phoneNumber });
};

const getDoctors  = () => {
  return axios.get('/doctors/list');
};

const getAppointments  = () => {
  return axios.get('/appointments/list');
};




export { sendLoginRequest, getDoctors, getAppointments};
