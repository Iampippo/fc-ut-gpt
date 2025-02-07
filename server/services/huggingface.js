import fetch from 'node-fetch';
import { ENV } from '../config/environment.js';
import { AppError } from '../utils/errors.js';

const API_CONFIG = ENV.API_CONFIG.huggingface;

export async function generateAIResponse(message) {
  if (!ENV.HUGGINGFACE_API_KEY) {
    console.error('HuggingFace API key not configured');
    throw new AppError('API key not configured');
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
      throw new AppError(`HuggingFace API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('HuggingFace API response received');
    return data[0]?.generated_text;
  } catch (error) {
    console.error('HuggingFace API Error:', error);
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}