import express from 'express';
import { corsMiddleware, handlePreflight } from './cors.js';
import { requestLogger } from './requestLogger.js';
import { securityMiddleware } from './security.js';
import { errorHandler, notFoundHandler } from './errorHandler.js';

export function setupMiddleware(app) {
  // 基础中间件
  app.use(corsMiddleware);
  app.use(handlePreflight);
  app.use(express.json());
  
  // 安全中间件
  securityMiddleware.forEach(middleware => app.use(middleware));
  
  // 日志中间件
  app.use(requestLogger);
  
  // 错误处理中间件 (应在最后添加)
  app.use(notFoundHandler);
  app.use(errorHandler);
}