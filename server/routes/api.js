import express from 'express';
import { generateResponse } from '../services/ai.js';

export const router = express.Router();

router.post('/chat', async (req, res, next) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: '消息不能为空' });
  }
  
  try {
    const response = await generateResponse(message);
    res.json({ response });
  } catch (error) {
    next(error);
  }
});