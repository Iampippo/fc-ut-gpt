import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="h-16 bg-[#12141a] border-b border-green-500/10 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索球员、SBC、进化..."
            className="w-96 bg-[#1a1c23] border border-green-500/20 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:border-green-500/40"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-green-500/60" size={18} />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-sm">
          <div className="stats-card">
            <span className="text-green-400">市场更新</span>
            <span className="font-mono">12:30:45</span>
          </div>
          <div className="stats-card">
            <span className="text-green-400">在线人数</span>
            <span className="font-mono">1.2M</span>
          </div>
        </div>
        <button className="relative p-2 hover:bg-green-500/10 rounded-lg transition-colors">
          <Bell size={20} className="text-green-400" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
        </button>
      </div>
    </div>
  );
}