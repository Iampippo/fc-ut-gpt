# FC UT GPT AI Assistant

## 项目概述

FC UT GPT AI Assistant 是一个专业的 EA FC 25 Ultimate Team 游戏助手系统，由传奇球星卡卡担任 AI 顾问角色。该系统通过结合本地知识库和大语言模型，为玩家提供专业、准确的游戏建议。

## 技术架构

### 前端 (Netlify)
- React + TypeScript
- Tailwind CSS
- Zustand (状态管理)
- Lucide React (图标)
- React Hot Toast (通知)

### 后端 (Render.com)
- Node.js + Express
- HuggingFace API 集成
- 本地知识库系统
- CORS 安全配置
- 错误处理中间件

## 核心功能

1. **AI 对话系统**
   - 实时对话界面
   - 打字机效果反馈
   - 智能建议卡片
   - 历史记录保存

2. **专业知识库**
   - 球员推荐
   - SBC 任务攻略
   - 球员进化指南
   - 卡包开启建议

3. **市场分析**
   - 实时价格追踪
   - 市场趋势分析
   - 投资建议

4. **用户界面**
   - 响应式设计
   - 暗色主题
   - 动态加载
   - 流畅动画

## 部署需求

### 前端部署 (Netlify)
- 需要配置环境变量：
  ```
  VITE_API_URL=你的后端API地址
  ```

### 后端部署 (Render.com)
- 需要配置环境变量：
  ```
  PORT=3000
  NODE_ENV=production
  HUGGINGFACE_API_KEY=你的HuggingFace API密钥
  ```

## API 集成

### HuggingFace API
- 模型：THUDM/chatglm3-6b
- 用途：处理复杂问题和个性化建议
- 配置：需要有效的 API 密钥

## 本地知识库

包含四个主要领域：
1. 球员数据库
2. SBC 任务信息
3. 进化策略指南
4. 卡包分析数据

## 安全措施

1. CORS 保护
2. API 速率限制
3. 错误处理机制
4. 数据验证

## 扩展计划

1. 多语言支持
2. 实时市场数据集成
3. 个性化推荐系统
4. 社区互动功能

## 维护要求

1. API 密钥定期更新
2. 知识库内容更新
3. 性能监控
4. 错误日志分析

## 项目依赖

### 前端依赖
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.344.0",
    "react-hot-toast": "^2.4.1",
    "zustand": "^4.5.2"
  }
}
```

### 后端依赖
```json
{
  "dependencies": {
    "express": "^4.18.3",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "dotenv": "^16.4.5"
  }
}
```

## 启动说明

1. 前端开发
```bash
npm install
npm run dev
```

2. 后端开发
```bash
cd server
npm install
npm run dev
```

## 注意事项

1. HuggingFace API 密钥必须保密
2. 本地知识库需要定期更新
3. 确保 CORS 配置正确
4. 监控 API 调用限制

## 联系方式

如有任何问题，请通过以下方式联系：
- 项目仓库：[GitHub 地址]
- 技术支持：[邮箱]