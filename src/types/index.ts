import { LucideIcon } from 'lucide-react';

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export interface Suggestion {
  icon: React.ComponentType<any>;
  iconColor: string;
  title: string;
  description: string;
  query: string;
}

export interface Player {
  id: string;
  name: string;
  rating: number;
  position: string;
  imageUrl: string;
  price: string;
  priceChange?: {
    value: string;
    trend: 'up' | 'down';
  };
}

export interface SBC {
  id: string;
  name: string;
  cost: string;
  timeLeft: string;
  rating: number;
  reward: string;
}