import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY,
  ALLOWED_ORIGINS: '*', // 临时允许所有来源
  API_CONFIG: {
    huggingface: {
      model: 'deepseek-ai/DeepSeek-R1',
      baseUrl: 'https://api-inference.huggingface.co/models/deepseek-ai/DeepSeek-R1',
      timeout: 30000
    }
  }
};

// 验证必要的环境变量
if (!process.env.HUGGINGFACE_API_KEY) {
  console.error('警告: 未配置 HUGGINGFACE_API_KEY 环境变量');
}