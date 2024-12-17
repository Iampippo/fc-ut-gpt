import React from 'react';
import { Gamepad2, Trophy } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-8">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1920')] opacity-10 bg-cover bg-center" />
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-500 rounded-lg animate-pulse">
              <Gamepad2 size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              EA FC 25 Ultimate Team
            </h1>
          </div>
          <Trophy size={32} className="text-yellow-400" />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="stats-card">
            <span className="text-blue-300">在线玩家</span>
            <span className="text-2xl font-bold">1.2M+</span>
          </div>
          <div className="stats-card">
            <span className="text-blue-300">市场交易</span>
            <span className="text-2xl font-bold">8.5M+</span>
          </div>
        </div>
      </div>
    </header>
  );
}