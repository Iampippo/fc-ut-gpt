export function errorHandler(err, req, res, next) {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || '服务器内部错误';
  
  res.status(statusCode).json({
    error: true,
    message: process.env.NODE_ENV === 'production' ? '服务器错误，请稍后再试' : message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
}

export function notFoundHandler(req, res) {
  res.status(404).json({
    error: true,
    message: '未找到请求的资源'
  });
}