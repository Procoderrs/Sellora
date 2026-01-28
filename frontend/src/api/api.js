
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  withCredentials: true // important
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;


/* https://sellora-drab.vercel.app

http://localhost:5000

*/






