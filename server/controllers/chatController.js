import { generateResponse } from '../services/ai.js';
import { ValidationError } from '../utils/errors.js';

export async function handleChatMessage(req, res, next) {
  try {
    const { message } = req.body;
    
    if (!message?.trim()) {
      throw new ValidationError('消息不能为空');
    }
    
    const response = await generateResponse(message);
    res.json({ response });
  } catch (error) {
    next(error);
  }
}