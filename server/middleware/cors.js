import cors from 'cors';
import { ENV } from '../config/environment.js';

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // 允许没有origin的请求（比如同源请求）
    if (!origin) {
      return callback(null, true);
    }
    
    if (ENV.ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Request-Id'],
  maxAge: 86400 // 24 hours
});