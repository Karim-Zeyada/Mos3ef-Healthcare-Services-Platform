/** @format */

import React, { useState } from "react";
import { Bot, MessageSquareMore, Sparkles, X } from "lucide-react";
import ChatBotList from "./ChatBotList";

const ChatBotButton = () => {
  const [openChatBot, setOpenChatBot] = useState(false);

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!openChatBot && (
          <div
            dir="rtl"
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-Blue-900 text-xs font-bold font-Cairo shadow-lg border border-Blue-100 select-none animate-in fade-in slide-in-from-right-3 duration-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>المساعد الطبي الذكي</span>
          </div>
        )}

        <button
          onClick={() => setOpenChatBot(!openChatBot)}
          aria-label="فتح المساعد الطبي الذكي"
          className="relative flex justify-center items-center rounded-full w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-Blue-900 to-[#0e3b54] text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/40"
        >
          {openChatBot ? (
            <X className="w-6 h-6 sm:w-7 sm:h-7" />
          ) : (
            <>
              <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-300" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Window Modal */}
      {openChatBot && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 max-w-[calc(100vw-2rem)]">
          <ChatBotList openChatBot={openChatBot} setOpenChatBot={setOpenChatBot} />
        </div>
      )}
    </>
  );
};

export default ChatBotButton;
