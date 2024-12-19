const isDev = import.meta.env.DEV;
const API_URL = isDev 
  ? 'http://localhost:3000/api'
  : 'https://fc-ut-gpt-api.onrender.com/api';

export const API_CONFIG = {
  baseUrl: API_URL,
  timeout: 30000, // 增加超时时间到30秒，匹配后端
  retryAttempts: 3,
  retryDelay: 1000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};