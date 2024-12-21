import fetch from 'node-fetch';
import { ENV } from '../config/environment.js';
import { AppError } from '../utils/errors.js';

const API_CONFIG = ENV.API_CONFIG.huggingface;

export async function generateAIResponse(message) {
  if (!ENV.HUGGINGFACE_API_KEY) {
    console.error('HuggingFace API key not configured');
    return null; // 返回null而不是抛出错误，允许回退到默认回复
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
    console.log('Sending request to HuggingFace API...');
    const response = await fetch(`${API_CONFIG.baseUrl}/models/${API_CONFIG.model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ENV.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `你是一个EA FC 25游戏的专业助手，名叫卡卡。请用专业的角度回答以下问题：${message}`,
        parameters: {
          max_length: 2048,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true
        }
      }),
      signal: controller.signal
    });

    if (!response.ok) {
      console.error('HuggingFace API error:', response.status);
      return null; // 返回null而不是抛出错误
    }

    const data = await response.json();
    console.log('HuggingFace API response received');
    return data[0]?.generated_text || null;
  } catch (error) {
    console.error('HuggingFace API Error:', error);
    return null; // 返回null而不是抛出错误
  } finally {
    clearTimeout(timeout);
  }
}