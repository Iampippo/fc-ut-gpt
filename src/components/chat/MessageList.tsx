import React from 'react';
import { Message } from '../../types';
import { Cpu, User } from 'lucide-react';
import { formatTimestamp } from '../../utils/date';

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <>
      {messages.map((message) => (
        <div
          key={message.id}
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
            } shadow-lg relative group`}
          >
            {message.content}
            <span className="absolute -bottom-5 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
              {formatTimestamp(message.timestamp)}
            </span>
          </div>
          {message.isUser && (
            <div className="p-1 rounded-lg bg-green-500/20">
              <User className="text-green-400" size={20} />
            </div>
          )}
        </div>
      ))}
    </>
  );
}