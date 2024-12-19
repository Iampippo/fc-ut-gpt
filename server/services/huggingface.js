import fetch from 'node-fetch';
import { ENV } from '../config/environment.js';
import { AppError } from '../utils/errors.js';

const API_CONFIG = ENV.API_CONFIG.huggingface;

export async function generateAIResponse(message) {
  if (!ENV.HUGGINGFACE_API_KEY) {
    throw new AppError('HuggingFace API key not configured', 500);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  try {
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
      const error = await response.json().catch(() => ({}));
      throw new AppError(error.error || 'HuggingFace API request failed', response.status);
    }

    const data = await response.json();
    return data[0].generated_text;
  } catch (error) {
    console.error('HuggingFace API Error:', error);
    if (error.name === 'AbortError') {
      throw new AppError('请求超时，请稍后重试', 408);
    }
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError('AI服务暂时不可用', 503);
  } finally {
    clearTimeout(timeout);
  }
}