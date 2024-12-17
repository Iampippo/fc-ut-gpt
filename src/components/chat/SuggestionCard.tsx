import React from 'react';
import { Suggestion } from '../../types';

interface SuggestionCardProps extends Omit<Suggestion, 'query'> {
  onClick: () => void;
}

export function SuggestionCard({ icon: Icon, iconColor, title, description, onClick }: SuggestionCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-3 p-3 bg-gradient-to-r from-black/90 to-gray-900/90 rounded-xl border border-green-500/20 hover:border-green-400/40 transition-all group text-left w-full relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="p-1.5 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg group-hover:from-green-500/30 group-hover:to-green-600/30 transition-colors relative">
        <Icon className={iconColor} size={20} />
      </div>
      <div className="relative">
        <h3 className="text-green-400 font-semibold text-sm mb-1">{title}</h3>
        <p className="text-gray-400 text-xs">{description}</p>
      </div>
    </button>
  );
}