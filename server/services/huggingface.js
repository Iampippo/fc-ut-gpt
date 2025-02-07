import fetch from 'node-fetch';
import { ENV } from '../config/environment.js';
import { AppError } from '../utils/errors.js';

const API_CONFIG = {
  baseUrl: 'https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-R1',
  timeout: 30000
};

export async function generateAIResponse(message) {
  if (!ENV.HUGGINGFACE_API_KEY) {
    console.error('HuggingFace API key not configured');
    throw new AppError('API key not configured');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    console.log('Sending request to HuggingFace API...');
    const response = await fetch(API_CONFIG.baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ENV.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "你是一个EA FC 25游戏的专业助手，名叫卡卡。你是一位传奇球星，对足球和游戏都有深入的理解。"
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7,
        top_p: 0.9
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('HuggingFace API error response:', errorText);
      throw new AppError(`HuggingFace API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('HuggingFace API response received:', data);
    
    // DeepSeek-R1 的响应格式处理
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content;
    }
    
    return '抱歉，我现在无法回答这个问题。';
  } catch (error) {
    console.error('HuggingFace API Error:', error);
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}