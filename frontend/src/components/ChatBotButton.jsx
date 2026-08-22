import React, { useState } from "react";
import { Bot, MessageSquareMore } from "lucide-react";
import ChatBotList from "./ChatBotList";

const ChatBotButton = () => {
    const [ openChatBot, setOpenChatBot ] = useState(false);

    return (
        <>
           

            <button onClick={() => setOpenChatBot(!openChatBot)}
            className="flex justify-center items-center fixed  bottom-6 right-6 p-3 rounded-full w-[72px] h-[72px] bg-Blue-900 text-white shadow-lg hover:bg-Blue  transition z-50">
                {
                    openChatBot ? <MessageSquareMore size={34} /> : <Bot size={34} />
                }
            </button>
            { openChatBot && <div className="fixed bottom-20 right-24 z-50">
                <ChatBotList openChatBot={openChatBot} setOpenChatBot={setOpenChatBot}  />
            </div> }
            
        </>
    );
};

export default ChatBotButton;
