import { useEffect, useMemo, useState } from "react";
import AppBarChatRoom from "../components/chat-page/AppBarChatRoom";
import MessageNavBar from "../components/chat-page/MessageNavBar";
import MessageSend, {
  type ChatMessage,
} from "../components/chat-page/MessageSend";
import profile from "../assets/chat-page/profile.svg";
import rawMessages from "../data/messages.json";
import rawUsers from "../data/users.json";
import rawChatRooms from "../data/chatRooms.json";
import { useParams } from "react-router-dom";

type RawMessage = {
  id: number;
  chatRoomId: number;
  text: string;
  senderID: string;
  sentAt: number;
};

type RawUser = {
  id: string;
  name: string;
  profileImage: string;
};

type RawChatRoom = {
  id: number;
  type: "direct" | "group";
  participantIds: string[];
  title?: string;
  subtitle?: string;
};

function ChatRoomPage() {
  const { chatRoomId } = useParams();
  const roomId = Number(chatRoomId);

  const users = rawUsers as RawUser[];
  const chatRooms = rawChatRooms as RawChatRoom[];
  const messagesData = rawMessages as RawMessage[];

  const currentRoom = chatRooms.find((room) => room.id === roomId);

  if (!chatRoomId || !currentRoom) {
    return <div>채팅방을 찾을 수 없습니다.</div>;
  }

  const STORAGE_KEY = `chat-messages-${roomId}`;

  const initialMessages: ChatMessage[] = messagesData
    .filter((message) => message.chatRoomId === roomId)
    .map((message) => {
      const matchedUser = users.find((user) => user.id === message.senderID);

      return {
        id: message.id,
        text: message.text,
        sender: message.senderID === "me" ? "me" : "other",
        profileImage: matchedUser?.profileImage === "profile" ? profile : "",
        sentAt: message.sentAt,
      };
    });

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
  }, [messages, STORAGE_KEY]);

  const headerInfo = useMemo(() => {
    if (currentRoom.type === "group") {
      return {
        headerId: currentRoom.title ?? "그룹 채팅방",
        headerName: currentRoom.subtitle ?? "",
      };
    }

    const otherUserId = currentRoom.participantIds.find((id) => id !== "me");
    const otherUser = users.find((user) => user.id === otherUserId);

    return {
      headerId: otherUser?.id ?? "",
      headerName: otherUser?.name ?? "",
    };
  }, [currentRoom, users]);

  const handleSendMessage = (text: string) => {
    const now = Date.now();

    const newMessage: ChatMessage = {
      id: now,
      text,
      sender: "me",
      sentAt: now,
      profileImage: "",
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <AppBarChatRoom
        headerId={headerInfo.headerId}
        headerName={headerInfo.headerName}
      />
      <MessageSend messages={messages} />
      <MessageNavBar onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatRoomPage;
