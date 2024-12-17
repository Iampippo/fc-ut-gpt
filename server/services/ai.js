import { generateAIResponse } from './huggingface.js';
import { findAnswer } from './knowledgeService.js';

export async function generateResponse(message) {
  try {
    // 1. 先尝试从本地知识库匹配
    const localAnswer = await findAnswer(message);
    if (localAnswer) {
      return localAnswer;
    }

    // 2. 如果本地没有答案，使用HuggingFace API
    const aiResponse = await generateAIResponse(message);
    if (aiResponse) {
      return aiResponse;
    }

    // 3. 如果API也失败了，返回默认回复
    return "抱歉，我目前无法回答这个问题。我正在不断学习中，希望以后能为您提供更好的帮助。";
  } catch (error) {
    console.error('生成回答时出错:', error);
    throw error;
  }
}