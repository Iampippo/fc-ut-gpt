import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const KNOWLEDGE_DIR = join(__dirname, '../data/knowledge');

// 缓存加载的知识库数据
let knowledgeCache = null;

// 加载所有知识库文件
async function loadKnowledgeBase() {
  if (knowledgeCache) {
    return knowledgeCache;
  }

  try {
    const files = ['players.json', 'sbc.json', 'evolution.json', 'packs.json'];
    const knowledge = {};

    for (const file of files) {
      const content = await readFile(join(KNOWLEDGE_DIR, file), 'utf-8');
      Object.assign(knowledge, JSON.parse(content));
    }

    knowledgeCache = knowledge;
    return knowledge;
  } catch (error) {
    console.error('加载知识库失败:', error);
    return {};
  }
}

// 从知识库中查找答案
export async function findAnswer(message) {
  const knowledge = await loadKnowledgeBase();
  
  // 遍历所有知识条目
  for (const [key, entry] of Object.entries(knowledge)) {
    // 检查主关键词
    if (message.toLowerCase().includes(key.toLowerCase())) {
      return entry.content;
    }
    
    // 检查额外关键词
    if (entry.keywords?.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    )) {
      return entry.content;
    }
  }
  
  return null;
}

// 重新加载知识库
export function clearCache() {
  knowledgeCache = null;
}