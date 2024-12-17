const API_URL = 'https://fc-ut-gpt-api.onrender.com/api';  // 替换为你的 Render.com 服务地址

export async function sendMessage(message: string): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error:', error);
    return '抱歉，我现在无法回答你的问题。请稍后再试。';
  }
}