import React, { useState } from 'react';
import { Home, Users, ShoppingCart, Trophy, Star, Package, Settings, HelpCircle, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { NavLink } from './NavLink';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div 
      className={`${isCollapsed ? 'w-20' : 'w-64'} bg-[#12141a] border-r border-green-500/10 p-4 flex flex-col fixed h-full transition-all duration-300 z-50`}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-6`}>
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
            <Trophy className="text-white" size={24} />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        </div>
        {!isCollapsed && (
          <div>
            <h1 className="font-bold text-lg text-green-400">FC UT GPT</h1>
            <p className="text-xs text-green-500/80">by KAKA</p>
          </div>
        )}
      </div>

      <nav className="mt-8 space-y-2">
        <NavLink icon={<Home size={20} />} label="主页" collapsed={isCollapsed} />
        <NavLink 
          icon={<MessageSquare size={20} />} 
          label="UTAI助手对话" 
          badge="热"
          collapsed={isCollapsed} 
          onClick={() => window.dispatchEvent(new CustomEvent('openAIChat'))}
        />
        <NavLink icon={<Users size={20} />} label="球员数据库" collapsed={isCollapsed} />
        <NavLink icon={<ShoppingCart size={20} />} label="转会市场" collapsed={isCollapsed} />
        <NavLink icon={<Trophy size={20} />} label="比赛模式" collapsed={isCollapsed} />
        <NavLink icon={<Star size={20} />} label="球员进化" collapsed={isCollapsed} />
        <NavLink icon={<Package size={20} />} label="开包模拟器" collapsed={isCollapsed} />
      </nav>

      <div className="mt-auto space-y-2">
        <NavLink icon={<Settings size={20} />} label="设置" collapsed={isCollapsed} />
        <NavLink icon={<HelpCircle size={20} />} label="帮助" collapsed={isCollapsed} />
      </div>
    </div>
  );
}