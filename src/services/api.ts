import { API_CONFIG } from '../config/api';

/**
 * 基础API请求配置
 */
const baseConfig: RequestInit = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
};

/**
 * API请求工具类
 */
class ApiService {
  private static async handleResponse(response: Response) {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  private static async fetchWithRetry(url: string, config: RequestInit, retries = 3) {
    try {
      const response = await fetch(url, config);
      return await this.handleResponse(response);
    } catch (error) {
      if (retries > 0) {
        console.log(`重试请求... 剩余次数: ${retries - 1}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.fetchWithRetry(url, config, retries - 1);
      }
      throw error;
    }
  }

  static async post<T>(endpoint: string, data: any): Promise<T> {
    const config = {
      ...baseConfig,
      method: 'POST',
      body: JSON.stringify(data)
    };

    return this.fetchWithRetry(`${API_CONFIG.baseUrl}${endpoint}`, config);
  }
}

export default ApiService;