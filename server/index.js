import express from 'express';
import { ENV } from './config/environment.js';
import { setupMiddleware } from './middleware/index.js';
import { router } from './routes/index.js';

const app = express();

// 验证环境配置
console.log('Environment Configuration:', {
  nodeEnv: ENV.NODE_ENV,
  port: ENV.PORT,
  allowedOrigins: ENV.ALLOWED_ORIGINS,
  huggingfaceConfigured: !!ENV.HUGGINGFACE_API_KEY
});

// 设置中间件
setupMiddleware(app);

// API路由
app.use('/', router);

// 启动服务器
const server = app.listen(ENV.PORT, () => {
  console.log(`服务器运行在端口 ${ENV.PORT}`);
  console.log(`环境: ${ENV.NODE_ENV}`);
  console.log(`允许的域名: ${ENV.ALLOWED_ORIGINS.join(', ')}`);
  console.log('HuggingFace API 已配置');
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('收到 SIGTERM 信号，准备关闭服务器...');
  server.close(() => {
    console.log('服务器已关闭');
    process.exit(0);
  });
});

export default app;