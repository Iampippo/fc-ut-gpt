import React, { useState } from 'react';
import ChatWindow from '../chat/ChatWindow';
import MarketTrends from '../market/MarketTrends';
import LiveSbcs from '../sbc/LiveSbcs';
import { Maximize2 } from 'lucide-react';

export default function MainContent() {
  const [isFullChat, setIsFullChat] = useState(false);

  return (
    <div className="flex-1 p-6 overflow-auto bg-[#0a0b0e]">
      <div className={`grid ${isFullChat ? 'grid-cols-1' : 'grid-cols-12'} gap-6`}>
        <div className={`${isFullChat ? 'col-span-1' : 'col-span-9'} relative`}>
          <button
            onClick={() => setIsFullChat(!isFullChat)}
            className="absolute top-4 right-4 z-20 p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 transition-colors"
          >
            <Maximize2 size={18} />
          </button>
          <ChatWindow />
        </div>
        {!isFullChat && (
          <div className="col-span-3 space-y-6">
            <MarketTrends />
            <LiveSbcs />
          </div>
        )}
      </div>
    </div>
  );
}