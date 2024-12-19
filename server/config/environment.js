import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

// 验证必需的环境变量
const requiredEnvVars = ['PORT', 'HUGGINGFACE_API_KEY', 'NODE_ENV', 'CORS_ORIGIN'];
const missingEnvVars = requiredEnvVars.filter(key => !process.env[key]);
if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
}

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '10000', 10),
  HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  ALLOWED_ORIGINS: [
    'http://localhost:5173',
    'http://localhost:4173',
    process.env.CORS_ORIGIN
  ].filter(Boolean),
  API_CONFIG: {
    huggingface: {
      baseUrl: 'https://api-inference.huggingface.co',
      model: 'THUDM/chatglm2-6b',
      timeout: 30000
    }
  }
};

// 验证配置
console.log('Environment Configuration:', {
  nodeEnv: ENV.NODE_ENV,
  port: ENV.PORT,
  corsOrigin: ENV.CORS_ORIGIN,
  allowedOrigins: ENV.ALLOWED_ORIGINS,
  huggingfaceConfigured: !!ENV.HUGGINGFACE_API_KEY
});