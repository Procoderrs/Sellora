import axios from "axios";

// Check if running on Vercel
const isProduction = import.meta.env.PROD;

const api = axios.create({
  baseURL: isProduction 
    ? 'https://sellora-drab.vercel.app'  // Production backend
    : 'http://localhost:5000',           // Local backend
  
  withCredentials: true, // Important for CORS with credentials
  
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  
  timeout: 10000 // 10 second timeout
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Log for debugging
  console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  
  return config;
}, (error) => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    
    // Handle CORS specific errors
    if (error.message.includes('Network Error') || error.message.includes('CORS')) {
      console.error('CORS Issue Detected!');
    }
    
    return Promise.reject(error);
  }
);

export default api;

/* https://sellora-drab.vercel.app

http://localhost:5000

*/






