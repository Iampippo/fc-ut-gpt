import { Message } from '../types';

export async function sendMessage(message: string): Promise<string> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error:', error);
    return '抱歉，我现在无法回答你的问题。请稍后再试。';
  }
}