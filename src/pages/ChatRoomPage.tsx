import { useEffect, useState } from "react";
import AppBar from "../components/chat-page/AppBar";
import MessageNavBar from "../components/chat-page/MessageNavBar";
import MessageSend, {
  type ChatMessage,
} from "../components/chat-page/MessageSend";
import profile from "../assets/chat-page/profile.svg";
import rawMessages from "../data/messages.json";
import rawUsers from "../data/users.json";
import { useParams } from "react-router-dom";

const STORAGE_KEY = "chat-messages";

const initialMessages: ChatMessage[] = rawMessages.map((message) => {
  const matchedUser = rawUsers.find((user) => user.id === message.userId);

  return {
    id: message.id,
    text: message.text,
    sender: message.sender as "me" | "other",
    profileImage: matchedUser?.profileImage === "profile" ? profile : "",
    sentAt: message.sentAt,
  };
});

function ChatRoomPage() {
  const { chatId } = useParams();

  if (!chatId) {
    return <div>채팅방을 찾을 수 없습니다.</div>;
  }

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
    console.log("현재 채팅방 ID", chatId);
  }, [chatId]);

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
