import express from 'express';
import { corsMiddleware } from './cors.js';
import { requestLogger } from './requestLogger.js';
import { securityMiddleware } from './security.js';
import { errorHandler } from './errorHandler.js';

export function setupMiddleware(app) {
  // 1. 基础中间件
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // 2. CORS中间件 (必须在其他中间件之前)
  app.use(corsMiddleware);
  
  // 3. 安全中间件
  app.use(securityMiddleware);
  
  // 4. 日志中间件
  app.use(requestLogger);
  
  // 5. 错误处理 (最后添加)
  app.use(errorHandler);
}