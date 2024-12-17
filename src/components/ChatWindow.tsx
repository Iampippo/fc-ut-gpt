import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, User, Loader2 } from 'lucide-react';
import { defaultGreeting, getRandomResponse } from '../utils/chatResponses';
import ChatSuggestions from './ChatSuggestions';

interface Message {
  content: string;
  isUser: boolean;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { content: defaultGreeting, isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { content: text, isUser: true }]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const response = getRandomResponse();
      setMessages(prev => [...prev, { content: response, isUser: false }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (text: string) => {
    handleSend(text);
  };

  return (
    <div className="flex flex-col h-[700px] bg-gradient-to-b from-black via-gray-900 to-black rounded-xl shadow-2xl border border-green-500/20 relative overflow-hidden">
      {/* Decorative elements */}
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
        {messages.length === 1 && (
          <ChatSuggestions onSuggestionClick={handleSuggestionClick} />
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            {!message.isUser && (
              <div className="p-1 rounded-lg bg-green-500/20">
                <Cpu className="text-green-400" size={20} />
              </div>
            )}
            <div
              className={`max-w-[80%] p-4 rounded-xl ${
                message.isUser
                  ? 'bg-green-900/80 text-white backdrop-blur-sm'
                  : 'bg-black/80 text-gray-100 backdrop-blur-sm border border-green-500/20'
              } shadow-lg`}
            >
              {message.content}
            </div>
            {message.isUser && (
              <div className="p-1 rounded-lg bg-green-500/20">
                <User className="text-green-400" size={20} />
              </div>
            )}
          </div>
        ))}
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
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="请告诉我你的问题..."
            className="flex-1 p-4 bg-black/80 text-white rounded-xl border border-green-500/20 focus:outline-none focus:ring-2 focus:ring-green-500/50 placeholder-gray-500 backdrop-blur-sm"
          />
          <button
            onClick={() => handleSend()}
            className="p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}