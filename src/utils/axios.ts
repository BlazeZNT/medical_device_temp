// src/utils/axios.js
import axios from 'axios';

// Set up default configuration for Axios
axios.defaults.baseURL = 'http://localhost:8080/api'; // Replace with your API's base URL
axios.defaults.timeout = 10000; // Optional: Set timeout for requests

// Optionally, handle request/response interceptors if needed
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Error in response: ', error);
    return Promise.reject(error);
  }
);

export default axios;
