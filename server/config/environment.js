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
    'http://localhost:5173',
    'http://localhost:4173',
    'https://fc-ut-gpt.stackblitz.io'
  ].filter(Boolean),
  API_CONFIG: {
    huggingface: {
      baseUrl: 'https://api-inference.huggingface.co',
      model: 'THUDM/chatglm3-6b',
      timeout: 30000
    }
  }
};