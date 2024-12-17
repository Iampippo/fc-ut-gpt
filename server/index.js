import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { router as apiRouter } from './routes/api.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';

const app = express();

// CORS配置
app.use(cors(config.cors));

// 中间件
app.use(express.json());
app.use(requestLogger);

// 预检请求处理
app.options('*', cors(config.cors));

// 健康检查
app.get('/healthz', (req, res) => {
  res.json({ status: 'healthy' });
});

// API文档
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'FC UT GPT API is running',
    version: '1.0.0',
    endpoints: {
      chat: '/api/chat',
      health: '/healthz'
    }
  });
});

// API路由
app.use('/api', apiRouter);

// 错误处理
app.use(notFoundHandler);
app.use(errorHandler);

// 启动服务器
app.listen(config.port, () => {
  console.log(`服务器运行在端口 ${config.port}`);
  console.log(`环境: ${config.nodeEnv}`);
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('收到 SIGTERM 信号，准备关闭服务器...');
  process.exit(0);
});