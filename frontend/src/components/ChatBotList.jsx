import { Bot, SendIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";

export default function ChatBotList({ setOpenChatBot, openChatBot }) {
    const [messages, setMessages] = useState([
        { from: "bot", text: "أهلًا بيك في مُسعف" },
        { from: "bot", text: "أقدر أساعدك ازاي؟" },
    ]);

    const [inputValue, setInputValue] = useState("");

    const botReply = () => {
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { from: "bot", text: "تمام، جاري المعالجة" },
            ]);
        }, 1000);
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;
        setMessages((prev) => [...prev, { from: "user", text: inputValue }]);
        setInputValue("");
        botReply();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Card className="w-64 h-[300px] bg-[#f1f1f1] rounded-[24px_24px_0px_24px] border-0 shadow-md">
            <CardContent className="p-2 flex flex-col h-full">
                <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto mr-1  p-1 hover:bg-transparent"
                    onClick={() => setOpenChatBot(!openChatBot)}
                >
                    <XIcon className="w-4 h-4 text-[#7d5260]"   />
                </Button>
                <div className="flex-1 overflow-y-auto px-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex items-end gap-1 ${message.from === "bot" ? "justify-start" : "justify-end"
                                }`}
                        >
                            {message.from === "bot" && (
                                <Bot className="w-4 h-4 text-Blue-900" />
                            )}
                            <div
                                className={`px-3 py-1 rounded-2xl text-xs font-Cairo ${message.from === "bot"
                                        ? "bg-blue-50 text-Blue-900 rounded-tl-none"
                                        : "bg-Green text-[#152211] rounded-tr-none"
                                    }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                </div>

                
                <div className= "  mt-2 flex items-center bg-[#e1eedd] rounded-[20px] border border-[#ccc] px-2 py-1">
                    <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="اكتب استفسارك..."
                        className="[direction:rtl] border-0 bg-transparent p-0 text-xs font-Cairo focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 p-0 hover:bg-transparent"
                        onClick={handleSend}
                    >
                        <SendIcon className="w-6 h-6" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
