import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';
import TopBar from './components/layout/TopBar';
import ChatWindow from './components/chat/ChatWindow';

function App() {
  const [showAIChat, setShowAIChat] = useState(false);

  useEffect(() => {
    const handleOpenAIChat = () => setShowAIChat(true);
    window.addEventListener('openAIChat', handleOpenAIChat);
    return () => window.removeEventListener('openAIChat', handleOpenAIChat);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-white">
      <Sidebar />
      <div className="pl-20 flex flex-col min-h-screen">
        <TopBar />
        {showAIChat ? (
          <div className="flex-1 p-6">
            <div className="relative">
              <button
                onClick={() => setShowAIChat(false)}
                className="absolute top-4 right-4 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 transition-colors z-20"
              >
                返回主页
              </button>
              <ChatWindow />
            </div>
          </div>
        ) : (
          <MainContent />
        )}
      </div>
    </div>
  );
}

export default App;