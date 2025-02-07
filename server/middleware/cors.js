import cors from 'cors';
import { ENV } from '../config/environment.js';

export const corsMiddleware = cors({
  origin: function(origin, callback) {
    // 允许没有origin的请求（比如同源请求）
    if (!origin) return callback(null, true);
    
    // 检查origin是否在允许列表中
    if (ENV.ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Blocked request from unauthorized origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 hours
});