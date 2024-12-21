import { generateResponse } from '../services/ai.js';
import { AppError } from '../utils/errors.js';

export async function handleChatMessage(req, res, next) {
  try {
    const { message } = req.body;
    
    if (!message?.trim()) {
      throw new AppError('消息不能为空', 400);
    }
    
    console.log('收到聊天请求:', message);
    
    const response = await generateResponse(message);
    console.log('生成的回答:', response);
    
    return res.json({ response });
  } catch (error) {
    console.error('处理聊天消息时出错:', error);
    next(error);
  }
}