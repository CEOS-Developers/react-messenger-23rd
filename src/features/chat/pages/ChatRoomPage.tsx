import { useEffect, useMemo, useState } from "react";
import MobileLayout from "../../../layouts/MobileLayout";
import StatusBar from "../components/chat-room/StatusBar";
import ChatRoomHeader from "../components/chat-room/ChatRoomHeader";
import MessageList from "../components/chat-room/MessageList";
import ChatInputBar from "../components/chat-room/ChatInputBar";
import IosHomeIndicator from "../components/chat-room/IosHomeIndicator";
import useAutoScroll from "../hooks/useAutoScroll";
import usersData from "../data/users.json";
import messagesData from "../data/messages.json";
import type { Message, User } from "../types/chat";

const LOCAL_STORAGE_KEY = "chat-room-messages";

export default function ChatRoomPage() {
  const [users] = useState<User[]>(usersData as User[]);
  const [messages, setMessages] = useState<Message[]>([]);

  const bottomRef = useAutoScroll(messages);
  const me = useMemo(() => users.find((user) => user.isMe), [users]);

  useEffect(() => {
    const savedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages) as Message[];
        setMessages(parsed);
        return;
      } catch (error) {
        console.error("저장된 메시지를 불러오지 못했습니다.", error);
      }
    }

    setMessages(messagesData as Message[]);
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSendText = (text: string) => {
    if (!me) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      senderId: me.id,
      type: "text",
      text,
      createdAt: getCurrentTime(),
      unreadCount: 1,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendImage = (imageUrl: string) => {
    if (!me) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      senderId: me.id,
      type: "image",
      imageUrl,
      createdAt: getCurrentTime(),
      unreadCount: 1,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <MobileLayout>
      <div className="flex h-full w-full flex-col overflow-x-hidden bg-[#A7C8E8]">
        <div className="sticky top-0 z-20">
          <StatusBar />
          <ChatRoomHeader title="김철수" />
        </div>

        <MessageList messages={messages} users={users} bottomRef={bottomRef} />

        <div className="shrink-0 bg-white">
          <ChatInputBar
            onSendText={handleSendText}
            onSendImage={handleSendImage}
          />
          <IosHomeIndicator />
        </div>
      </div>
    </MobileLayout>
  );
}