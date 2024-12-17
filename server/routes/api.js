import express from 'express';
import { handleChatMessage } from '../controllers/chatController.js';

export const router = express.Router();

router.post('/chat', handleChatMessage);