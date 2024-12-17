import React from 'react';
import { LineChart } from 'lucide-react';
import { TrendItem } from './TrendItem';

export default function MarketTrends() {
  return (
    <div className="bg-[#12141a] rounded-xl border border-green-500/10 overflow-hidden">
      <div className="p-4 border-b border-green-500/10 flex items-center gap-2">
        <LineChart size={20} className="text-green-400" />
        <h2 className="text-lg font-bold text-green-400">市场趋势</h2>
      </div>
      <div className="p-4 space-y-4">
        <TrendItem
          name="Mbappé"
          price="3,150,000"
          change="+2.5%"
          trending="up"
        />
        <TrendItem
          name="Haaland"
          price="2,480,000"
          change="-1.2%"
          trending="down"
        />
        <TrendItem
          name="De Bruyne"
          price="1,890,000"
          change="+0.8%"
          trending="up"
        />
      </div>
    </div>
  );
}