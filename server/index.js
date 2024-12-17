import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());

// 加载知识库
let knowledgeBase;
async function loadKnowledge() {
  try {
    const data = await readFile(join(__dirname, 'data/knowledge.json'), 'utf-8');
    knowledgeBase = JSON.parse(data);
    console.log('知识库加载成功');
  } catch (error) {
    console.error('加载知识库失败:', error);
    knowledgeBase = { base_knowledge: [] };
  }
}

// 使用HuggingFace的免费API
async function getAIResponse(message) {
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/THUDM/chatglm2-6b',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `你是一个EA FC 25游戏的专业助手，名叫卡卡。请用专业的角度回答以下问题：${message}`,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('AI API request failed');
    }

    const data = await response.json();
    return data[0].generated_text;
  } catch (error) {
    console.error('AI API Error:', error);
    return null;
  }
}

// 处理聊天请求
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  
  try {
    // 先尝试从知识库匹配
    const match = knowledgeBase.base_knowledge.find(
      entry => entry.question.toLowerCase().includes(message.toLowerCase())
    );
    
    if (match) {
      res.json({ response: match.answer });
      return;
    }

    // 如果知识库没有匹配，使用AI API
    const aiResponse = await getAIResponse(message);
    
    if (aiResponse) {
      res.json({ response: aiResponse });
    } else {
      // 如果AI API失败，返回默认回复
      res.json({
        response: "抱歉，我目前无法回答这个问题。我正在不断学习中，希望以后能为您提供更好的帮助。您可以问我一些关于热门球员、SBC任务、球员进化或者卡包的问题。"
      });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: '处理请求时出错' });
  }
});

// 启动服务器
async function startServer() {
  try {
    await loadKnowledge();
    
    app.listen(3000, () => {
      console.log('服务器运行在端口 3000');
    });
  } catch (error) {
    console.error('启动服务器失败:', error);
  }
}

startServer();