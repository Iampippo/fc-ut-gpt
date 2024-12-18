import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

export function useErrorHandler() {
  const handleError = useCallback((error: Error) => {
    console.error('应用错误:', error);
    
    // 根据错误类型显示不同的提示
    if (error.message.includes('Failed to fetch')) {
      toast.error('网络连接失败，请检查您的网络设置');
    } else if (error.message.includes('CORS')) {
      toast.error('跨域请求失败，请联系管理员');
    } else {
      toast.error(error.message || '发生未知错误，请稍后重试');
    }
  }, []);

  return { handleError };
}