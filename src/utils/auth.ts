import axios from '@/utils/axios';

const sendLoginRequest = (phoneNumber: string) => {
  return axios.post('/login', { phoneNumber });
};

const getDoctors  = () => {
  return axios.get('/doctors/list');
};



export { sendLoginRequest, getDoctors };
