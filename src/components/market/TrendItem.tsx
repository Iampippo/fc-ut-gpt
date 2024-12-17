import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TrendItemProps {
  name: string;
  price: string;
  change: string;
  trending: 'up' | 'down';
}

export function TrendItem({ name, price, change, trending }: TrendItemProps) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-green-500/5 transition-colors">
      <div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-gray-400">{price} 币</p>
      </div>
      <div className={`flex items-center gap-1 ${trending === 'up' ? 'text-green-400' : 'text-red-400'}`}>
        {trending === 'up' ? (
          <TrendingUp size={16} />
        ) : (
          <TrendingDown size={16} />
        )}
        <span className="text-sm font-medium">{change}</span>
      </div>
    </div>
  );
}