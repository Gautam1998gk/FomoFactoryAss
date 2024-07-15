// axiosConfig.js
import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    const currentUser = JSON.parse(localStorage.getItem('cpauser') || '{}');
    if (currentUser?.token) {
      config.headers.Authorization = `Bearer ${currentUser?.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
