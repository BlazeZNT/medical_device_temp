// src/utils/auth.js

// Base URL for all API requests
const BASE_URL = 'http://192.168.1.105:8080/api'; // Replace with your actual base URL

// Helper function for making a request
const makeRequest = (method, url, data = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header: headers,
      success: (res) => {
        if (res.statusCode === 200) {
          // If the response is a string, parse it to a JSON object
          const responseData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
          resolve(responseData);
        } else {
          // Log error response for better debugging
          console.error(`Error: ${res.statusCode} - ${JSON.stringify(res.data)}`);
          reject(new Error(`API request failed with status code ${res.statusCode}`));
        }
      },
      fail: (err) => {
        console.error('Request failed:', err);
        reject(new Error('Network request failed'));
      },
    });
  });
};

// Send login request with phone number
const sendLoginRequest = (phoneNumber) => {
  return makeRequest('POST', '/login', { phoneNumber });
};

// Get list of doctors
const getDoctors = () => {
  return makeRequest('GET', '/doctors/list');
};

// Get list of appointments
const getAppointments = () => {
  return makeRequest('GET', '/appointments/list');
};

// Create a new appointment (including an image file upload)
const createAppointment = (name, specialization, date, time, year, image) => {
  console.log('Uploading image:', image); // Log the image file path
  
  const formData = {
    name,
    specialization,
    date,
    time,
    year,
  };

  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: `${BASE_URL}/appointments/add`,
      filePath: image,
      name: 'image', // The form field name for the file
      formData,
      header: {
        'Content-Type': 'multipart/form-data',
      },
      success: (res) => {
        if (res.statusCode === 200) {
          const responseData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
          resolve(responseData);
        } else {
          console.error(`Error: ${res.statusCode} - ${JSON.stringify(res.data)}`);
          reject(new Error(`Appointment creation failed with status code ${res.statusCode}`));
        }
      },
      fail: (err) => {
        console.error('Upload failed:', err);
        reject(new Error('Image upload failed'));
      },
    });
  });
};

export { sendLoginRequest, getDoctors, getAppointments, createAppointment };
