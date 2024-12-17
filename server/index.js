import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateResponse } from './services/ai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 处理聊天请求
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  try {
    const response = await generateResponse(message);
    res.json({ response });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: '处理请求时出错',
      message: error.message 
    });
  }
});

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});