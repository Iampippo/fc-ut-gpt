import express from 'express';
import { handleChatMessage } from '../controllers/chatController.js';

export const router = express.Router();

// 确保路由处理器正确处理CORS
router.post('/chat', async (req, res, next) => {
  try {
    // 添加CORS头
    res.header('Access-Control-Allow-Origin', 'https://fc-ut-gpt-front.onrender.com');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    await handleChatMessage(req, res, next);
  } catch (error) {
    next(error);
  }
});