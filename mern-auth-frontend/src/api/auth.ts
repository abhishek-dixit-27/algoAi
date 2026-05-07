import axios from 'axios';

const rawApiUrl = import.meta.env.VITE_API_URL as string | undefined;

// Normalize deployed env value.
// Supported forms:
// - https://backend.com/api/auth
// - https://backend.com/api
// - https://backend.com (backend base)
const API_URL = rawApiUrl
  ? rawApiUrl.endsWith('/api/auth')
    ? rawApiUrl
    : rawApiUrl.endsWith('/api')
      ? `${rawApiUrl}/auth`
      : rawApiUrl.endsWith('/')
        ? `${rawApiUrl}api/auth`
        : `${rawApiUrl}/api/auth`
  : '/api/auth';


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
