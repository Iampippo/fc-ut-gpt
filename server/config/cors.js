// CORS配置
export const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:4173',
    'https://fc-ut-gpt-front.onrender.com'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 预检请求缓存24小时
};