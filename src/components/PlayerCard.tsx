import React from 'react';
import { Star, TrendingUp, Trophy } from 'lucide-react';

interface PlayerCardProps {
  name: string;
  rating: number;
  position: string;
  imageUrl: string;
  price: string;
}

export default function PlayerCard({ name, rating, position, imageUrl, price }: PlayerCardProps) {
  return (
    <div className="group relative bg-gradient-to-br from-gray-900 to-blue-900 rounded-xl shadow-xl overflow-hidden border border-blue-500/20 hover:scale-105 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
      <div className="relative">
        <img src={imageUrl} alt={name} className="w-full h-56 object-cover" />
        <div className="absolute top-2 right-2 z-20">
          <div className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-full font-bold">
            <Star size={16} />
            {rating}
          </div>
        </div>
        <div className="absolute top-2 left-2 z-20">
          <div className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-full">
            {position}
          </div>
        </div>
      </div>
      <div className="relative z-20 p-4 text-white">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold">{name}</h3>
          <Trophy className="text-yellow-400" size={20} />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-green-400">
            <TrendingUp size={16} />
            <span className="font-medium">{price} 币</span>
          </div>
          <button className="px-3 py-1 bg-blue-600 rounded-lg text-sm hover:bg-blue-700 transition-colors">
            查看详情
          </button>
        </div>
      </div>
    </div>
  );
}