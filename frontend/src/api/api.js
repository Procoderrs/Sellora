
// api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials:true,
});
console.log(api);
 
 // Request interceptor to attach auth token
api.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("adminToken");
  const customerToken = localStorage.getItem("customerToken"); // ✅ FIXED

  if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  } else if (customerToken) {
    config.headers.Authorization = `Bearer ${customerToken}`;
  }

  return config;
});

export default api;

/* https://sellora-rz68.vercel.app

http://localhost:5000

*/






