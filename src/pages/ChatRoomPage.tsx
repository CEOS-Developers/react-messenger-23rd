import { useEffect, useState } from "react";
import AppBar from "../components/chat-page/AppBar";
import MessageNavBar from "../components/chat-page/MessageNavBar";
import MessageSend, {
  type ChatMessage,
} from "../components/chat-page/MessageSend";
import profile from "../assets/chat-page/profile.svg";

const STORAGE_KEY = "chat-messages";

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    text: "나는 지금 홍문관이야",
    sender: "other",
    profileImage: profile,
    sentAt: Date.now() - 1000 * 60 * 5,
  },
  {
    id: 2,
    text: "예스예스~~",
    sender: "me",
    sentAt: Date.now() - 1000 * 60 * 4,
  },
];

function ChatRoomPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);

    if (!savedMessages) return initialMessages;

    try {
      return JSON.parse(savedMessages) as ChatMessage[];
    } catch (error) {
      console.error("메시지 불러오기 실패:", error);
      return initialMessages;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const now = Date.now();

    const newMessage: ChatMessage = {
      id: now,
      text,
      sender: "me",
      sentAt: now,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <AppBar />
      <MessageSend messages={messages} />
      <MessageNavBar onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatRoomPage;
