import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { router as apiRouter } from './routes/api.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 健康检查端点
app.get('/healthz', (req, res) => {
  res.json({ status: 'healthy' });
});

// 根路由
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

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: '服务器内部错误',
    message: process.env.NODE_ENV === 'development' ? err.message : '请稍后再试'
  });
});

// 404处理
app.use((req, res) => {
  res.status(404).json({
    error: '未找到请求的资源',
    message: '请检查URL是否正确'
  });
});

app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});