// server.js - Axios base configuration
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://studyninja-backend.onrender.com/api',
  headers: {
    'Accept': 'application/json',
  }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;