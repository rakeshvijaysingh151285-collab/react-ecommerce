import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('REACT_ECOMMERCE_TOKEN');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Server error';
    if (error.response?.status === 401) {
      localStorage.removeItem('REACT_ECOMMERCE_TOKEN');
      localStorage.removeItem('REACT_ECOMMERCE_USER');
    }
    toast.error(message);
    return Promise.reject(error);
  }
);

export default api;
