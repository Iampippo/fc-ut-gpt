import ApiService from './api';
import { ChatResponse } from '../types/api';
import { handleApiError } from '../utils/errorHandling';

export async function sendMessage(message: string): Promise<string> {
  try {
    const response = await ApiService.post<ChatResponse>('/chat', { message });
    if (response && response.response) {
      return response.response;
    }
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Chat service error:', error);
    throw handleApiError(error);
  }
}