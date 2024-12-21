import ApiService from './api';
import { ChatResponse } from '../types/api';
import { handleApiError } from '../utils/errorHandling';

export async function sendMessage(message: string): Promise<string> {
  try {
    // 添加错误处理和重试逻辑
    let retries = 3;
    while (retries > 0) {
      try {
        const response = await ApiService.post<ChatResponse>('/chat', { message });
        if (response && response.response) {
          return response.response;
        }
        throw new Error('Invalid response format');
      } catch (error) {
        retries--;
        if (retries === 0) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    throw new Error('Maximum retries exceeded');
  } catch (error) {
    console.error('Chat service error:', error);
    throw handleApiError(error);
  }
}