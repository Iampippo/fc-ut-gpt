import fetch from 'node-fetch';

const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/THUDM/chatglm2-6b';

export async function generateAIResponse(message) {
  try {
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `你是一个EA FC 25游戏的专业助手，名叫卡卡。请用专业的角度回答以下问题：${message}`,
        parameters: {
          max_length: 2048,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true
        }
      }),
    });

    if (!response.ok) {
      throw new Error('AI API request failed');
    }

    const data = await response.json();
    return data[0].generated_text;
  } catch (error) {
    console.error('HuggingFace API Error:', error);
    return null;
  }
}