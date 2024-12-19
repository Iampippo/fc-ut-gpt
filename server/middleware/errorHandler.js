import { ENV } from '../config/environment.js';

export function errorHandler(err, req, res, next) {
  // 记录错误详情
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString(),
    requestUrl: req.originalUrl,
    requestMethod: req.method,
    origin: req.get('origin')
  });
  
  // CORS错误处理
  if (err.message.includes('Not allowed by CORS')) {
    return res.status(403).json({
      error: true,
      message: 'CORS policy violation',
      details: ENV.NODE_ENV === 'development' ? {
        origin: req.get('origin'),
        allowedOrigins: ENV.ALLOWED_ORIGINS
      } : undefined
    });
  }
  
  // API密钥错误
  if (err.message.includes('API key not configured')) {
    return res.status(500).json({
      error: true,
      message: 'Service configuration error'
    });
  }
  
  // 通用错误处理
  const statusCode = err.statusCode || 500;
  const message = ENV.NODE_ENV === 'production' 
    ? '服务器错误，请稍后再试'
    : err.message || '服务器内部错误';
  
  res.status(statusCode).json({
    error: true,
    message,
    stack: ENV.NODE_ENV === 'development' ? err.stack : undefined
  });
}