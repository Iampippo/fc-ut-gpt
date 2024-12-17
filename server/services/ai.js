import { generateAIResponse } from './huggingface.js';
import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// 加载本地知识库
async function loadKnowledgeBase() {
  try {
    const data = await readFile(join(__dirname, '../data/knowledge.json'), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('加载知识库失败:', error);
    return { base_knowledge: [] };
  }
}

// 从知识库匹配回答
async function findInKnowledgeBase(message) {
  const knowledgeBase = await loadKnowledgeBase();
  return knowledgeBase.base_knowledge.find(
    entry => entry.question.toLowerCase().includes(message.toLowerCase())
  );
}

// 生成AI回答
export async function generateResponse(message) {
  try {
    // 先从知识库匹配
    const knowledgeMatch = await findInKnowledgeBase(message);
    if (knowledgeMatch) {
      return knowledgeMatch.answer;
    }

    // 使用HuggingFace API
    const aiResponse = await generateAIResponse(message);
    if (aiResponse) {
      return aiResponse;
    }

    // 默认回复
    return "抱歉，我目前无法回答这个问题。我正在不断学习中，希望以后能为您提供更好的帮助。";
  } catch (error) {
    console.error('生成回答时出错:', error);
    throw error;
  }
}