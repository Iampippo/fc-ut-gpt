import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message } from '../types';

interface ChatStore {
  chatHistory: Message[];
  addToHistory: (message: Message) => void;
  clearHistory: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chatHistory: [],
      addToHistory: (message) =>
        set((state) => ({
          chatHistory: [...state.chatHistory, message]
        })),
      clearHistory: () => set({ chatHistory: [] })
    }),
    {
      name: 'chat-storage'
    }
  )
);