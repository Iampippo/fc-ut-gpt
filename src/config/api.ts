const isDev = import.meta.env.DEV;
const API_URL = import.meta.env.VITE_API_URL || 
  (isDev ? 'http://localhost:3000/api' : 'https://fc-ut-gpt-api.onrender.com/api');

export const API_CONFIG = {
  baseUrl: API_URL,
  timeout: 10000,
  retryAttempts: 3,
  retryDelay: 1000,
  headers: {
    'Content-Type': 'application/json'
  }
};