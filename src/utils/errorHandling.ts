import { ApiError } from '../types/api';

export function handleApiError(error: unknown): Error {
  if (error instanceof Error) {
    // API配置错误
    if (error.message.includes('API key not configured')) {
      return new Error('系统维护中，请稍后再试');
    }
    
    // 服务不可用
    if (error.message.includes('Service unavailable')) {
      return new Error('服务暂时不可用，请稍后重试');
    }
    
    // 网络错误
    if (error.message.includes('Failed to fetch')) {
      return new Error('网络连接失败，请检查您的网络设置');
    }
    
    return error;
  }
  
  return new Error('未知错误，请稍后重试');
}