export function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  
  // CORS错误处理
  if (err.message.includes('Not allowed by CORS')) {
    return res.status(403).json({
      error: true,
      message: 'CORS policy violation',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
  
  // 通用错误处理
  const statusCode = err.statusCode || 500;
  const message = err.message || '服务器内部错误';
  
  res.status(statusCode).json({
    error: true,
    message: process.env.NODE_ENV === 'production' ? '服务器错误，请稍后再试' : message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
}