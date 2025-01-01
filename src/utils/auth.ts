// src/utils/auth.js

// Base URL for all API requests
const BASE_URL = 'http://192.168.1.113:8080/api'; // Replace with your actual base URL
const OPENAI_API_URL = 'https://api.openai.com/v1/audio/transcriptions';
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY.trim();



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
          // console.error(`Error: ${res.statusCode} - ${JSON.stringify(res.data)}`);
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

const transcribeAudio = (audioPath) => {
  return new Promise((resolve, reject) => {
	console.log('API Key:', OPENAI_API_KEY);
	console.log('API Key Length:', OPENAI_API_KEY.length);  
    uni.uploadFile({
      url: OPENAI_API_URL,
      filePath: audioPath, // Path to the audio file
      name: 'file', // Key for the uploaded file
      header: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`, // OpenAI API key
        'Content-Type': 'multipart/form-data',
      },
      formData: {
        model: 'whisper-1', // Specify the Whisper model
        language: 'en', // Optional: Specify the language (adjust as needed)
      },
      success: (res) => {
        if (res.statusCode === 200) {
          const responseData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
          resolve(responseData.text); // Return the transcription text
        } else {
          reject(new Error(`Transcription failed with status code ${res.statusCode}`));
        }
      },
      fail: (err) => {
        console.error('Audio upload failed:', err);
        reject(new Error('Audio upload failed'));
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

const getLiveDoctors = () => {
  return makeRequest('GET', '/doctors/live');
};

const updateAppointment = (id, appointmentData) => {
	return makeRequest('PUT', `/appointments/${id}`, appointmentData, {
      'Content-Type': 'application/json',
    });
  };
  
  const cancelAppointment = (id) => {
  	return makeRequest('DELETE', `/appointments/${id}`, {
        'Content-Type': 'application/json',
      });
    };

// Create a new appointment (using a Base64 image string)
const createAppointment = (name, specialization, date, time, year, imageBase64) => {
	return makeRequest('POST', '/appointments/add', {name, specialization, date, time, year, imageBase64}, {
    'Content-Type': 'application/json', 
  });
  

  
};

export { sendLoginRequest, getDoctors, getAppointments, createAppointment, getLiveDoctors, updateAppointment, cancelAppointment, transcribeAudio};
