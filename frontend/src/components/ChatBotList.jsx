/** @format */

import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  Send,
  X,
  RotateCcw,
  Sparkles,
  Loader2,
  PhoneCall,
  HeartPulse,
  Hospital,
  AlertTriangle,
  Stethoscope,
  ChevronLeft,
  Flame,
  Baby,
  Activity,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { sendChatMessageToGemini } from "../services/aiService";
import { Link } from "react-router-dom";

// Quick Prompt Cards Data with Icons and Descriptions
const quickPrompts = [
  {
    label: "ألم بالصدر وضيق تنفس",
    shortDesc: "اشتباه أزمة قلبية وطوارئ فورية",
    icon: HeartPulse,
    color: "text-rose-600 bg-rose-50 border-rose-100",
    text: "أشعر بألم ضاغط في الصدر مع ضيق في التنفس وتعرق، ما الإجراء الصحيح؟",
  },
  {
    label: "إسعافات الحروق المنزلية",
    shortDesc: "التعامل السريع مع حروق الماء والحرارة",
    icon: Flame,
    color: "text-amber-600 bg-amber-50 border-amber-100",
    text: "ما هي الإسعافات الأولية لحرق من الدرجة الأولى بالماء الساخن؟",
  },
  {
    label: "حمى شديدة لطفل رضيع",
    shortDesc: "ارتفاع الحرارة وتحديد التخصص",
    icon: Baby,
    color: "text-teal-600 bg-teal-50 border-teal-100",
    text: "طفلي عمره 6 أشهر وحرارته 39 درجة مع خمول، ما هو التخصص المناسب؟",
  },
  {
    label: "صداع حاد مفاجئ وزغللة",
    shortDesc: "أعراض الصداع النصفي والدوار",
    icon: Activity,
    color: "text-blue-600 bg-blue-50 border-blue-100",
    text: "أعاني من صداع نصفي حاد ومفاجئ مع زغللة في الرؤية ودوخة",
  },
];

export default function ChatBotList({ setOpenChatBot, openChatBot }) {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("mos3ef_chat_history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing chat history:", e);
      }
    }
    return [
      {
        from: "bot",
        text: "أهلاً بك! أنا **مسعف AI** 🩺، مساعدك الطبي والفرز الذكي.\n\nأنا هنا لمساعدتك في فحص الأعراض، تقييم درجة الخطورة، وتوجيهك للتخصص الطبي المناسب من بين 18 تخصصاً في منصة مسعف.\n\nكيف تشعر اليوم؟ أو ما هو استفسارك الطبي؟",
      },
    ];
  });

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    try {
      localStorage.setItem("mos3ef_chat_history", JSON.stringify(messages));
    } catch (e) {
      console.error("Error saving chat:", e);
    }
  }, [messages, isLoading]);

  // Handle Send Message
  const handleSend = async (customText = null) => {
    const textToSend = customText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = { from: "user", text: textToSend };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const botResponse = await sendChatMessageToGemini(updatedMessages);
      setMessages((prev) => [...prev, { from: "bot", text: botResponse }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "عذراً، حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مرة أخرى أو الاتصال بالإسعاف 123 للحالات الطارئة.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    const initial = [
      {
        from: "bot",
        text: "تم بدء محادثة طبية جديدة. كيف يمكنني مساعدتك الآن؟",
      },
    ];
    setMessages(initial);
    localStorage.removeItem("mos3ef_chat_history");
  };

  // Helper to format text with bold and line breaks safely
  const renderFormattedText = (text) => {
    const isEmergency =
      text.includes("123") ||
      text.includes("طوارئ قصوى") ||
      text.includes("الإسعاف") ||
      text.includes("ER");

    // Replace markdown bold **text** with <strong>
    const formatted = text.split("\n").map((line, idx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);

      return (
        <p key={idx} className={line.startsWith("-") || line.startsWith("•") ? "mr-2 mb-1" : "mb-1.5"}>
          {parts.map((part, pIdx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={pIdx} className="font-bold text-Blue-950">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });

    return (
      <div>
        <div className="leading-relaxed">{formatted}</div>
        {isEmergency && (
          <div className="mt-3 pt-2 border-t border-rose-100 flex items-center gap-2 flex-wrap">
            <Link
              to="/emergency"
              onClick={() => setOpenChatBot(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>مركز الطوارئ (123)</span>
            </Link>
            <Link
              to="/services"
              onClick={() => setOpenChatBot(false)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-Blue-100 hover:bg-Blue-200 text-Blue-900 text-xs font-semibold transition-all"
            >
              <Hospital className="w-3.5 h-3.5" />
              <span>دليل المستشفيات</span>
            </Link>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="w-[340px] sm:w-[400px] h-[550px] max-h-[85vh] bg-white rounded-3xl border border-Blue-100 shadow-2xl flex flex-col overflow-hidden font-Cairo [direction:rtl] animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-Blue-900 via-[#0e3b54] to-Blue-900 text-white px-4 py-3.5 flex items-center justify-between shadow-xs shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="relative w-9 h-9 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20">
            <Bot className="w-5 h-5 text-emerald-300" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-white leading-none">مُسعف AI</h3>
              <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                Gemini 2.5
              </span>
            </div>
            <p className="text-[11px] text-Blue-100/80 font-medium">المساعد الطبي والفرز الذكي</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleResetChat}
            className="p-1.5 rounded-xl hover:bg-white/15 text-Blue-100 hover:text-white transition-colors"
            title="محادثة جديدة"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setOpenChatBot(false)}
            className="p-1.5 rounded-xl hover:bg-white/15 text-Blue-100 hover:text-white transition-colors"
            title="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-slate-50/60 scrollbar-thin scrollbar-thumb-slate-200">
        {messages.map((message, index) => {
          const isBot = message.from === "bot";

          return (
            <div
              key={index}
              className={`flex items-start gap-2 ${isBot ? "justify-start" : "justify-end"}`}
            >
              {isBot && (
                <div className="w-7 h-7 rounded-xl bg-Blue-100 text-Blue flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Stethoscope className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium shadow-xs max-w-[84%] ${
                  isBot
                    ? "bg-white text-slate-800 rounded-tr-none border border-slate-200/70"
                    : "bg-Blue-900 text-white rounded-tl-none"
                }`}
              >
                {isBot ? renderFormattedText(message.text) : <p className="leading-relaxed">{message.text}</p>}
              </div>
            </div>
          );
        })}

        {/* Stacked Quick Suggestion Cards inside Chat Flow */}
        {messages.length === 1 && !isLoading && (
          <div className="pt-2 animate-in fade-in duration-300">
            <div className="flex items-center gap-1.5 text-xs font-bold text-Blue-900 mb-2 px-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>استشارات مقترحة سريعة:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickPrompts.map((card, idx) => {
                const Icon = card.icon;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSend(card.text)}
                    className="text-right p-2.5 rounded-2xl bg-white hover:bg-Blue-50/60 border border-slate-200/80 hover:border-Blue-300 text-slate-800 transition-all shadow-xs hover:shadow-sm flex items-start gap-2.5 group"
                  >
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border ${card.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-Blue-900 group-hover:text-Blue flex items-center justify-between">
                        <span className="truncate">{card.label}</span>
                        <ChevronLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-Blue group-hover:-translate-x-0.5 transition-transform shrink-0" />
                      </div>
                      <p className="text-[10px] text-gray-500 truncate mt-0.5">
                        {card.shortDesc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-2 text-slate-500 text-xs py-2 px-1">
            <div className="w-7 h-7 rounded-xl bg-Blue-100 text-Blue flex items-center justify-center shrink-0">
              <Bot className="w-3.5 h-3.5 animate-spin text-Blue" />
            </div>
            <div className="bg-white px-3.5 py-2 rounded-2xl border border-slate-200/70 shadow-xs flex items-center gap-2">
              <span className="text-xs text-slate-600 font-semibold">جاري الفحص الطبي والتفكير...</span>
              <span className="flex space-x-1 space-x-reverse">
                <span className="w-1.5 h-1.5 bg-Blue rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-Blue rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-Blue rounded-full animate-bounce"></span>
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t border-slate-100 shrink-0">
        <div className="flex items-center gap-2 bg-slate-50 rounded-2xl border border-slate-200 px-3 py-1.5 focus-within:border-Blue-900 focus-within:bg-white transition-all">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="اكتب الأعراض أو استفسارك الطبي..."
            className="flex-1 bg-transparent border-0 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none [direction:rtl]"
          />
          <Button
            size="icon"
            disabled={!inputValue.trim() || isLoading}
            onClick={() => handleSend()}
            className="w-8 h-8 rounded-xl bg-Blue-900 hover:bg-Blue text-white shrink-0 disabled:opacity-40 transition-colors"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
          </Button>
        </div>

        <p className="text-[10px] text-gray-400 text-center mt-2 leading-tight">
          الردود للتوجيه الطبي السريع ولا تغني عن استشارة الطبيب أو الاتصال بـ 123
        </p>
      </div>
    </Card>
  );
}
