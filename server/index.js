import express from 'express';
import { config } from './config/index.js';
import { setupMiddleware } from './middleware/index.js';
import { router } from './routes/index.js';

const app = express();

// 设置中间件
setupMiddleware(app);

// 设置路由
app.use(router);

// 启动服务器
const server = app.listen(config.port, () => {
  console.log(`服务器运行在端口 ${config.port}`);
  console.log(`环境: ${config.nodeEnv}`);
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