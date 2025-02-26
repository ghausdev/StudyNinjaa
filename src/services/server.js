// server.js - Axios base configuration
import axios from "axios";

const BASE_URL = "http://localhost:9001/api";
export const URL = BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("currentRole");
      
      // Redirect to home page
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api;
