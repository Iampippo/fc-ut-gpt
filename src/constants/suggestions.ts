import { Trophy, Sparkles, Package, Star } from 'lucide-react';
import type { Suggestion } from '../types';

export const CHAT_SUGGESTIONS: Suggestion[] = [
  {
    icon: Trophy,
    iconColor: "text-yellow-400",
    title: "热门球员推荐",
    description: "查看当前版本最受欢迎的球员和他们的市场价值",
    query: "有哪些当前版本最值得购买的球员？"
  },
  {
    icon: Sparkles,
    iconColor: "text-purple-400",
    title: "热门SBC任务",
    description: "了解最新的SBC任务及完成攻略",
    query: "最新的SBC任务有哪些？哪些值得完成？"
  },
  {
    icon: Star,
    iconColor: "text-cyan-400",
    title: "球员进化指南",
    description: "发现最具性价比的球员进化路线",
    query: "现在有哪些值得做的球员进化？"
  },
  {
    icon: Package,
    iconColor: "text-green-400",
    title: "热门卡包分析",
    description: "最新卡包开启概率和性价比分析",
    query: "现在商店里哪些卡包最值得开？"
  }
];