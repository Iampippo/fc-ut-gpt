import React, { useState } from 'react';
import { Send, Cpu, User, Loader2 } from 'lucide-react';
import ChatSuggestions from './ChatSuggestions';
import { useChat } from '../../hooks/useChat';
import { useScrollToBottom } from '../../hooks/useScrollToBottom';
import MessageList from './MessageList';

export default function ChatWindow() {
  const { messages, isTyping, handleSend } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useScrollToBottom<HTMLDivElement>([messages]);

  const onSend = async (text: string = input) => {
    if (!text.trim()) return;
    await handleSend(text);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[700px] bg-gradient-to-b from-black via-gray-900 to-black rounded-xl shadow-2xl border border-green-500/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,255,0,0.1),transparent_80%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(0,255,0,0.05),transparent_50%)]" />
      
      <div className="p-4 border-b border-green-500/20 backdrop-blur-sm bg-black/20 flex items-center gap-2 z-10">
        <div className="relative">
          <Cpu className="text-green-400 animate-pulse" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping" />
        </div>
        <span className="text-green-100 font-bold">FC UT GPT AI (KAKA)</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <MessageList messages={messages} />
        
        {isTyping && (
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-green-500/20">
              <Cpu className="text-green-400" size={20} />
            </div>
            <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 text-green-400 flex items-center gap-2 border border-green-500/20">
              <Loader2 className="animate-spin" size={16} />
              卡卡正在思考...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-green-500/20 backdrop-blur-sm bg-black/20 z-10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSend()}
            placeholder="请告诉我你的问题..."
            className="flex-1 p-4 bg-black/80 text-white rounded-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 placeholder-gray-500 backdrop-blur-sm"
          />
          <button
            onClick={() => onSend()}
            className="p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}