const isDev = import.meta.env.DEV;
const API_URL = isDev 
  ? 'http://localhost:3000/api'
  : 'https://fc-ut-gpt.onrender.com/api';

export const API_CONFIG = {
  baseUrl: API_URL,
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};