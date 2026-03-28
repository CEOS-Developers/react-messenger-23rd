import { useEffect, useState } from "react";
import type { Message } from "../types/chat";

import ChatHeader from "../components/ChatRoom/ChatHeader";
import MessageInput from "../components/ChatRoom/MessageInput";
import NoticeBar from "../components/ChatRoom/NoticeBar";
import ReceivedBubble from "../components/ChatRoom/ReceivedBubble";
import SentBubble from "../components/ChatRoom/Sentbubble";

export default function ChatRoomPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const currentUserId = "user-1"; //나=이우림=user-1 로 가정

  useEffect(() => {
    fetch("/data/messages.json")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  return (
    <main className="bg-black flex flex-col h-screen">
      <ChatHeader />
      <NoticeBar />
      {/* 메세지 리스트 */}
      <div className="flex flex-col flex-1 overflow-y-auto px-3">
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.senderId === currentUserId ? (
              <SentBubble message={msg} />
            ) : (
              <ReceivedBubble message={msg} />
            )}
          </div>
        ))}
      </div>

      <MessageInput />
    </main>
  );
}
