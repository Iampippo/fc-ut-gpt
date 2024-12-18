import ApiService from './api';
import { ChatResponse } from '../types/api';

export async function sendMessage(message: string): Promise<string> {
  try {
    const response = await ApiService.post<ChatResponse>('/chat', { message });
    return response.response;
  } catch (error) {
    console.error('聊天服务错误:', error);
    throw new Error('发送消息失败，请稍后重试');
  }
}