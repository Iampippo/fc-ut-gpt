import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

// 验证必需的环境变量
const requiredEnvVars = ['PORT', 'HUGGINGFACE_API_KEY', 'NODE_ENV'];
const missingEnvVars = requiredEnvVars.filter(key => !process.env[key]);
if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '10000', 10),
  HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY,
  ALLOWED_ORIGINS: [
    'http://localhost:5173',
    'http://localhost:4173',
    'https://fc-ut-gpt-front.onrender.com'  // 更新为正确的前端域名
  ].filter(Boolean),
  API_CONFIG: {
    huggingface: {
      baseUrl: 'https://api-inference.huggingface.co',
      model: 'THUDM/chatglm2-6b',
      timeout: 30000
    }
  }
};