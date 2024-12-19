import express from 'express';
import { handleChatMessage } from '../controllers/chatController.js';

export const router = express.Router();

// 移除单独的CORS处理，因为已经有全局CORS中间件
router.post('/chat', handleChatMessage);