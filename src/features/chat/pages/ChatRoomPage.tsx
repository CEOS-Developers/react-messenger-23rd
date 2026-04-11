import { useEffect, useMemo, useState } from "react";
import MobileLayout from "@/layouts/MobileLayout";
import StatusBar from "@/features/chat/components/chat-room/StatusBar";
import ChatRoomHeader from "@/features/chat/components/chat-room/ChatRoomHeader";
import MessageList from "@/features/chat/components/chat-room/MessageList";
import ChatInputBar from "@/features/chat/components/chat-room/ChatInputBar";
import IosHomeIndicator from "@/features/chat/components/chat-room/IosHomeIndicator";
import useAutoScroll from "@/features/chat/hooks/useAutoScroll";
import usersData from "@/features/chat/data/users.json";
import messagesData from "@/features/chat/data/messages.json";
import type { Message, User } from "@/features/chat/types/chat";

const LOCAL_STORAGE_KEY = "chat-room-messages-v2";

function mergeMessages(seedMessages: Message[], savedMessages: Message[]) {
  const map = new Map<number, Message>();

  [...seedMessages, ...savedMessages].forEach((message) => {
    map.set(message.id, message);
  });

  return Array.from(map.values());
}

function getNextMessageId(messages: Message[]) {
  const maxId = messages.reduce((max, message) => Math.max(max, message.id), 0);
  return maxId + 1;
}

export default function ChatRoomPage() {
  const [users] = useState<User[]>(usersData as User[]);
  const [messages, setMessages] = useState<Message[]>([]);

  const bottomRef = useAutoScroll(messages);
  const me = useMemo(() => users.find((user) => user.isMe), [users]);

  useEffect(() => {
    const seedMessages = messagesData as Message[];
    const savedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages) as Message[];
        setMessages(mergeMessages(seedMessages, parsed));
        return;
      } catch (error) {
        console.error("저장된 메시지를 불러오지 못했습니다.", error);
      }
    }

    setMessages(seedMessages);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error("메시지를 저장하지 못했습니다.", error);
    }
  }, [messages]);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const date = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${date}`;
  };

  const handleSendText = (text: string) => {
    if (!me) return;

    const senderId = me.id;

    setMessages((prev) => {
      const newMessage: Message = {
        id: getNextMessageId(prev),
        senderId,
        type: "text",
        text,
        createdAt: getCurrentTime(),
        createdDate: getCurrentDate(),
        unreadCount: 1,
      };

      return [...prev, newMessage];
    });
  };

  const handleSendImages = (imageUrls: string[]) => {
    if (!me || imageUrls.length === 0) return;

    const senderId = me.id;

    setMessages((prev) => {
      const newMessage: Message = {
        id: getNextMessageId(prev),
        senderId,
        type: "image",
        imageUrls,
        createdAt: getCurrentTime(),
        createdDate: getCurrentDate(),
        unreadCount: 1,
      };

      return [...prev, newMessage];
    });
  };

  return (
    <MobileLayout>
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-chat-blue-100">
        <div className="absolute left-0 right-0 top-0 z-20">
          <StatusBar />
          <ChatRoomHeader title="김철수" />
        </div>

        <MessageList messages={messages} users={users} bottomRef={bottomRef} />

        <div className="shrink-0 bg-chat-white">
          <ChatInputBar
            onSendText={handleSendText}
            onSendImages={handleSendImages}
          />
          <IosHomeIndicator />
        </div>
      </div>
    </MobileLayout>
  );
}
