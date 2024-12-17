import React from 'react';
import { Timer, Star } from 'lucide-react';

export default function LiveSbcs() {
  return (
    <div className="bg-[#12141a] rounded-xl border border-green-500/10 overflow-hidden">
      <div className="p-4 border-b border-green-500/10">
        <h2 className="text-lg font-bold text-green-400">热门SBC</h2>
      </div>
      <div className="p-4 space-y-4">
        <SbcItem
          name="Icon Moments Pick"
          cost="850,000"
          timeLeft="1天 2小时"
          rating={92}
        />
        <SbcItem
          name="87+ 球员精选"
          cost="120,000"
          timeLeft="4小时"
          rating={87}
        />
        <SbcItem
          name="TOTW 升级"
          cost="65,000"
          timeLeft="6天"
          rating={84}
        />
      </div>
    </div>
  );
}

function SbcItem({ name, cost, timeLeft, rating }: {
  name: string;
  cost: string;
  timeLeft: string;
  rating: number;
}) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-green-500/5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
          <Star className="text-white" size={20} />
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-400">{cost} 币</p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-sm text-gray-400">
        <Timer size={14} />
        <span>{timeLeft}</span>
      </div>
    </div>
  );
}