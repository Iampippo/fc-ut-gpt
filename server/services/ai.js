import { generateAIResponse } from './huggingface.js';
import { findAnswer } from './knowledgeService.js';

const DEFAULT_RESPONSE = "抱歉，我暂时无法回答这个问题。您可以尝试问我关于球员、SBC、进化或者卡包的问题。";

export async function generateResponse(message) {
  try {
    console.log('收到用户消息:', message);
    
    // 1. 先尝试从本地知识库匹配
    const localAnswer = await findAnswer(message);
    if (localAnswer) {
      console.log('使用本地知识库的回答');
      return localAnswer;
    }

    // 2. 如果本地没有答案，使用HuggingFace API
    console.log('尝试使用AI服务生成回答');
    const aiResponse = await generateAIResponse(message);
    if (aiResponse) {
      console.log('AI服务生成了回答');
      return aiResponse;
    }

    // 3. 如果没有得到有效回答，返回默认回复
    console.log('返回默认回复');
    return DEFAULT_RESPONSE;
  } catch (error) {
    console.error('生成回答时出错:', error);
    return DEFAULT_RESPONSE; // 确保总是返回一个回答
  }
}