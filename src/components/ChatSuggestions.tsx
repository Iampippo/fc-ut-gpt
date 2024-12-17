import React from 'react';
import { Trophy, Sparkles, Package, Star } from 'lucide-react';

interface SuggestionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

const SuggestionCard = ({ icon, title, description, onClick }: SuggestionProps) => (
  <button
    onClick={onClick}
    className="flex items-start gap-3 p-4 bg-gradient-to-r from-black to-gray-900 rounded-xl border border-green-500/20 hover:border-green-400/40 hover:from-black hover:to-gray-800 transition-all group text-left w-full"
  >
    <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
      {icon}
    </div>
    <div>
      <h3 className="text-green-100 font-semibold mb-1">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </button>
);

export default function ChatSuggestions({ onSuggestionClick }: { onSuggestionClick: (text: string) => void }) {
  const suggestions = [
    {
      icon: <Trophy className="text-yellow-400" size={24} />,
      title: "热门球员推荐",
      description: "查看当前版本最受欢迎的球员和他们的市场价值",
      query: "有哪些当前版本最值得购买的球员？"
    },
    {
      icon: <Sparkles className="text-purple-400" size={24} />,
      title: "热门SBC任务",
      description: "了解最新的SBC任务及完成攻略",
      query: "最新的SBC任务有哪些？哪些值得完成？"
    },
    {
      icon: <Star className="text-cyan-400" size={24} />,
      title: "球员进化指南",
      description: "发现最具性价比的球员进化路线",
      query: "现在有哪些值得做的球员进化？"
    },
    {
      icon: <Package className="text-green-400" size={24} />,
      title: "热门卡包分析",
      description: "最新卡包开启概率和性价比分析",
      query: "现在商店里哪些卡包最值得开？"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {suggestions.map((suggestion, index) => (
        <SuggestionCard
          key={index}
          {...suggestion}
          onClick={() => onSuggestionClick(suggestion.query)}
        />
      ))}
    </div>
  );
}