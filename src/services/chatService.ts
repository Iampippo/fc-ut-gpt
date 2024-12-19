import ApiService from './api';
import { ChatResponse } from '../types/api';
import { handleApiError } from '../utils/errorHandling';

export async function sendMessage(message: string): Promise<string> {
  try {
    const response = await ApiService.post<ChatResponse>('/chat', { message });
    return response.response;
  } catch (error) {
    console.error('聊天服务错误:', error);
    throw handleApiError(error);
  }
}