import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY,
  ALLOWED_ORIGINS: [
    'https://fc-ut-gpt-front.onrender.com',
    'http://localhost:5173',
    'http://localhost:4173'
  ],
  API_CONFIG: {
    huggingface: {
      model: 'deepseek-ai/DeepSeek-R1',
      baseUrl: 'https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-R1',
      timeout: 30000
    }
  }
};

// 验证环境变量
if (!ENV.HUGGINGFACE_API_KEY) {
  console.error('警告: 未配置 HUGGINGFACE_API_KEY 环境变量');
}

// 打印允许的域名（不显示在生产环境）
if (ENV.NODE_ENV !== 'production') {
  console.log('允许的域名:', ENV.ALLOWED_ORIGINS);
}