import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/code` : 'http://localhost:5000/api/code';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const executeCode = async (problemId: number, code: string, language: string, token: string) => {
  return api.post('/execute', { problemId, code, language }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const submitCode = async (problemId: number, code: string, language: string, token: string) => {
  return api.post('/submit', { problemId, code, language }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProblems = async (token: string) => {
  return api.get('/problems', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProblem = async (problemId: number, token: string) => {
  return api.get(`/problems/${problemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default api;
