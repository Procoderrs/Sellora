import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api/admin', // use Vite env variable
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token && !config.url.includes('/login')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
