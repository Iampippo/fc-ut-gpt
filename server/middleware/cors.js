import cors from 'cors';
import { ENV } from '../config/environment.js';

export const corsMiddleware = cors({
  origin: '*', // 临时允许所有来源，用于调试
  credentials: false, // 关闭 credentials
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  maxAge: 86400 // 24 hours
});