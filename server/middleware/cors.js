import cors from 'cors';
import { corsOptions } from '../config/cors.js';

export const corsMiddleware = cors(corsOptions);

// 处理预检请求的中间件
export const handlePreflight = (req, res, next) => {
  // 添加必要的CORS头
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // 处理预检请求
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
};