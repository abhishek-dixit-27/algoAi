import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const register = async (name: string, email: string, password: string) => {
  return api.post('/register', { name, email, password });
};

export const login = async (email: string, password: string) => {
  return api.post('/login', { email, password });
};

export const getProfile = async (token: string) => {
  return api.get('/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default api;
