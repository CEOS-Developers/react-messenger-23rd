import { useEffect, useState } from "react";
import type { User, Message } from "../types/chat";

import ChatHeader from "../components/ChatRoom/ChatHeader";
import MessageInput from "../components/ChatRoom/MessageInput";
import NoticeBar from "../components/ChatRoom/NoticeBar";
import ReceivedBubble from "../components/ChatRoom/ReceivedBubble";
import SentBubble from "../components/ChatRoom/Sentbubble";

export default function ChatRoomPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const currentUserId = "user-1"; //나=이우림=user-1 로 가정
  const opponentId = "user-2"; //상대방=김지원=user-2 로 가정

  useEffect(() => {
    fetch("/data/messages.json")
      .then((res) => res.json())
      .then((data) => setMessages(data));

    fetch("/data/users.json")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const opponent = users.find((u) => u.id === opponentId);

  return (
    <main className="bg-black flex flex-col h-screen">
      <ChatHeader name={opponent?.name || "알 수 없음"} />
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
