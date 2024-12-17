import React from 'react';
import { CHAT_SUGGESTIONS } from '../../constants/suggestions';
import { SuggestionCard } from './SuggestionCard';

interface ChatSuggestionsProps {
  onSuggestionClick: (text: string) => void;
}

export default function ChatSuggestions({ onSuggestionClick }: ChatSuggestionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {CHAT_SUGGESTIONS.map((suggestion, index) => (
        <SuggestionCard
          key={index}
          {...suggestion}
          onClick={() => onSuggestionClick(suggestion.query)}
        />
      ))}
    </div>
  );
}