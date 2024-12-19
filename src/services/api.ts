import { API_CONFIG } from '../config/api';
import { ApiError } from '../types/api';
import toast from 'react-hot-toast';

class ApiService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<T> {
    const url = `${API_CONFIG.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        credentials: 'include',
        headers: {
          ...API_CONFIG.headers,
          ...options.headers,
          'Origin': window.location.origin
        },
        mode: 'cors'
      });

      if (!response.ok) {
        const error = await response.json() as ApiError;
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('请求超时');
        }
        throw error;
      }
      throw new Error('未知错误');
    } finally {
      clearTimeout(timeoutId);
    }
  }

  static async post<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      return await this.request<T>(endpoint, {
        method: 'POST',
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error('API Error:', error);
      toast.error(error instanceof Error ? error.message : '请求失败');
      throw error;
    }
  }
}

export default ApiService;