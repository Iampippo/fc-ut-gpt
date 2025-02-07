import { API_CONFIG } from '../config/api';
import { ApiError } from '../types/api';
import toast from 'react-hot-toast';

class ApiService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<T> {
    const url = `${API_CONFIG.baseUrl}${endpoint}`;
    console.log('Sending request to:', url);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          ...API_CONFIG.headers,
          ...options.headers
        },
        mode: 'cors'
      });

      clearTimeout(timeoutId);
      console.log('Response status:', response.status);

      if (!response.ok) {
        console.error('Response not OK:', response.status);
        const text = await response.text();
        console.error('Error response:', text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      return data;
    } catch (error) {
      console.error('Request error:', error);
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('请求超时，请稍后重试');
        }
        throw error;
      }
      throw new Error('未知错误');
    }
  }

  static async post<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      return await this.request<T>(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors'
      });
    } catch (error) {
      console.error('API Error:', error);
      toast.error(error instanceof Error ? error.message : '请求失败');
      throw error;
    }
  }
}

export default ApiService;