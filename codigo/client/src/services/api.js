import axios from 'axios';

// Guardar el JWT en memoria (no en localStorage por seguridad)
let inMemoryToken = null;

export const setToken = (token) => {
  inMemoryToken = token;
};

export const getToken = () => inMemoryToken;

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  if (inMemoryToken) {
    config.headers.Authorization = `Bearer ${inMemoryToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
