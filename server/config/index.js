import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

export const config = {
  port: process.env.PORT || 3000,
  huggingfaceApiKey: process.env.HUGGINGFACE_API_KEY,
  nodeEnv: process.env.NODE_ENV || 'development',
  cors: {
    origin: ['https://fc-ut-gpt-front.onrender.com', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
};