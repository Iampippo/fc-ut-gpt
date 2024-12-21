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
  
  // 如果是简单的问候语，返回默认回复
  if (isGreeting(message)) {
    return "你好！我是卡卡，很高兴为您服务。您可以问我关于球员、SBC、进化或者卡包的问题。";
  }
  
  // 遍历所有知识条目
  for (const [key, entry] of Object.entries(knowledge)) {
    // 检查主关键词（不区分大小写）
    if (message.toLowerCase().includes(key.toLowerCase())) {
      console.log(`找到匹配的知识条目: ${key}`);
      return entry.content;
    }
    
    // 检查额外关键词
    if (entry.keywords?.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    )) {
      console.log(`通过关键词匹配到知识条目: ${key}`);
      return entry.content;
    }
  }
  
  // 如果没有找到匹配的答案，返回null让AI服务处理
  console.log('本地知识库没有找到匹配的答案');
  return null;
}

// 检查是否是问候语
function isGreeting(message) {
  const greetings = ['你好', '您好', 'hi', 'hello', '嗨', '在吗'];
  return greetings.some(greeting => 
    message.toLowerCase().includes(greeting.toLowerCase())
  );
}

// 重新加载知识库
export function clearCache() {
  knowledgeCache = null;
}