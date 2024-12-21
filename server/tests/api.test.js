import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

const API_URL = process.env.PORT ? `http://localhost:${process.env.PORT}` : 'http://localhost:3000';

async function testAPI() {
  console.log('开始测试 API...');
  
  try {
    // 1. 测试健康检查端点
    console.log('\n测试健康检查端点...');
    const healthResponse = await fetch(`${API_URL}/healthz`);
    console.log('健康检查状态:', healthResponse.status);
    console.log('响应:', await healthResponse.json());

    // 2. 测试聊天端点
    console.log('\n测试聊天端点...');
    const chatResponse = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: '你好'
      })
    });
    
    console.log('聊天请求状态:', chatResponse.status);
    const chatData = await chatResponse.json();
    console.log('响应:', chatData);

  } catch (error) {
    console.error('测试失败:', error);
  }
}

// 运行测试
testAPI();