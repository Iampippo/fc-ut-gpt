# FC UT GPT AI Assistant

一个基于HuggingFace的FIFA Ultimate Team AI助手，由传奇球星卡卡为您提供专业的游戏建议。

## 项目部署步骤

### 1. 前端部署 (Render.com)

1. 在GitHub上创建仓库并上传代码
2. 在Render.com创建新的Web Service
3. 选择GitHub仓库
4. 配置部署设置:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`
   - 环境变量:
     - `VITE_API_URL`: 后端API地址

### 2. 后端部署 (Render.com)

1. 在Render.com创建另一个Web Service
2. 选择同一个GitHub仓库
3. 配置部署设置:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `node index.js`
   - 环境变量:
     - `HUGGINGFACE_API_KEY`: HuggingFace API密钥
     - `PORT`: 3000

### 3. HuggingFace API设置

1. 注册HuggingFace账号
2. 获取API密钥: https://huggingface.co/settings/tokens
3. 将API密钥添加到后端服务的环境变量

## 本地开发

1. 克隆仓库
\`\`\`bash
git clone https://github.com/yourusername/fc-ut-gpt.git
cd fc-ut-gpt
\`\`\`

2. 安装依赖
\`\`\`bash
# 前端依赖
npm install

# 后端依赖
cd server
npm install
cd ..
\`\`\`

3. 配置环境变量
\`\`\`bash
# 根目录 .env
VITE_API_URL=http://localhost:3000/api

# server/.env
HUGGINGFACE_API_KEY=your_api_key_here
PORT=3000
\`\`\`

4. 启动开发服务器
\`\`\`bash
# 启动前端 (新终端)
npm run dev

# 启动后端 (新终端)
cd server
node index.js
\`\`\`

## 技术栈

- 前端: React + TypeScript + Tailwind CSS
- 后端: Node.js + Express
- AI: HuggingFace API (chatglm2-6b)
- 部署: Render.com

## 注意事项

1. 确保所有环境变量正确配置
2. HuggingFace API有免费使用限制
3. Render.com免费套餐有一些限制:
   - 自动休眠
   - 带宽限制
   - 构建时间限制