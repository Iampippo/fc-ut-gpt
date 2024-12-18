import { useState, useCallback } from 'react';
import { Message } from '../types';
import { sendMessage } from '../services/chatService';
import { useChatStore } from '../store/chatStore';
import { v4 as uuidv4 } from 'uuid';
import { useErrorHandler } from './useErrorHandler';

const DEFAULT_GREETING = "你好，我是你的助手卡卡！作为一名传奇球星，我很高兴能为你解答关于 EA FC 25 Ultimate Team 的任何问题。";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content: DEFAULT_GREETING,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { handleError } = useErrorHandler();
  const { addToHistory } = useChatStore();

  const addMessage = useCallback((content: string, isUser: boolean) => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      isUser,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    addToHistory(newMessage);
  }, [addToHistory]);

  const handleSend = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    try {
      addMessage(text, true);
      setIsTyping(true);
      
      const response = await sendMessage(text);
      addMessage(response, false);
    } catch (error) {
      handleError(error as Error);
      addMessage('抱歉，我现在无法回答你的问题。请稍后再试。', false);
    } finally {
      setIsTyping(false);
    }
  }, [addMessage, handleError]);

  return {
    messages,
    isTyping,
    handleSend
  };
}