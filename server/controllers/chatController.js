import { generateAIResponse } from '../services/huggingface.js';
import { findAnswer } from '../services/knowledgeService.js';
import { AppError } from '../utils/errors.js';

export async function handleChatMessage(req, res, next) {
  try {
    const { message } = req.body;
    
    if (!message?.trim()) {
      throw new AppError('消息不能为空', 400);
    }
    
    // 1. 先尝试从本地知识库匹配
    const localAnswer = await findAnswer(message);
    if (localAnswer) {
      return res.json({ response: localAnswer });
    }

    // 2. 如果本地没有答案，使用HuggingFace API
    try {
      const aiResponse = await generateAIResponse(message);
      return res.json({ response: aiResponse });
    } catch (error) {
      // 如果AI服务失败，返回友好的错误信息
      if (error.message.includes('API key not configured')) {
        throw new AppError('AI服务未正确配置，请联系管理员', 503);
      }
      throw error;
    }
  } catch (error) {
    next(error);
  }
}