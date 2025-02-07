import { generateAIResponse } from './huggingface.js';

export async function generateResponse(message) {
  try {
    console.log('收到用户消息:', message);
    
    // 直接使用HuggingFace API生成回答
    const aiResponse = await generateAIResponse(message);
    if (aiResponse) {
      console.log('AI服务生成了回答');
      return aiResponse;
    }

    return '抱歉，我暂时无法回答这个问题。请稍后再试。';
  } catch (error) {
    console.error('生成回答时出错:', error);
    throw error;
  }
}