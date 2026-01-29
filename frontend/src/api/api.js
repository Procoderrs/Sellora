
// api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL+'/api/',
  withCredentials:true,
});
 
 // Request interceptor to attach auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // jo tum login me save kiya tha
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
}); 

export default api;

/* https://sellora-drab.vercel.app

http://localhost:5000

*/






