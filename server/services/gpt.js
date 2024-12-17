import { GPT4All } from 'gpt4all';

const gpt = new GPT4All('mistral-7b-openorca');
let modelLoaded = false;

async function initModel() {
  if (!modelLoaded) {
    console.log('正在加载AI模型...');
    await gpt.load();
    modelLoaded = true;
    console.log('AI模型加载完成！');
  }
}

export async function generateResponse(message) {
  await initModel();
  
  const prompt = `你是一个EA FC 25游戏的专业助手，名叫卡卡。请用专业的角度回答以下问题：${message}`;
  
  const response = await gpt.generate(prompt, {
    temp: 0.7,
    maxTokens: 500,
    topK: 40,
    topP: 0.9,
  });
  
  return response;
}