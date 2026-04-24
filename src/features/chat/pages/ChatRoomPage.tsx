import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import MobileLayout from "@/layouts/MobileLayout";
import StatusBar from "@/features/chat/components/chat-room/StatusBar";
import ChatRoomHeader from "@/features/chat/components/chat-room/ChatRoomHeader";
import MessageList from "@/features/chat/components/chat-room/MessageList";
import ChatInputBar from "@/features/chat/components/chat-room/ChatInputBar";
import IosHomeIndicator from "@/features/chat/components/chat-room/IosHomeIndicator";
import useAutoScroll from "@/features/chat/hooks/useAutoScroll";
import usersData from "@/features/chat/data/users.json";
import messagesData from "@/features/chat/data/messages.json";
import groupUsersData from "@/features/chat/data/groupUsers.json";
import groupMessagesData from "@/features/chat/data/groupMessages.json";
import {
  DIRECT_CHAT_ROOM_MESSAGES_STORAGE_KEY,
  GROUP_CHAT_ROOM_MESSAGES_STORAGE_KEY,
} from "@/features/chat/constants/chatStorage";
import type { Message, User } from "@/features/chat/types/chat";

type ChatRoomConfig = {
  title: string;
  participantCount?: number;
  users: User[];
  messages: Message[];
  localStorageKey: string;
};

const DIRECT_ROOM_CONFIG: ChatRoomConfig = {
  title: "김철수",
  users: usersData as User[],
  messages: messagesData as Message[],
  localStorageKey: DIRECT_CHAT_ROOM_MESSAGES_STORAGE_KEY,
};

const GROUP_ROOM_CONFIG: ChatRoomConfig = {
  title: "떡잎마을방범대",
  participantCount: 4,
  users: groupUsersData as User[],
  messages: groupMessagesData as Message[],
  localStorageKey: GROUP_CHAT_ROOM_MESSAGES_STORAGE_KEY,
};

function getRoomConfig(roomId: number) {
  return roomId === 2 ? GROUP_ROOM_CONFIG : DIRECT_ROOM_CONFIG;
}

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

function saveMessagesToStorage(storageKey: string, messages: Message[]) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  } catch (error) {
    console.error("메시지를 저장하지 못했습니다.", error);
  }
}

function loadMessagesFromStorage(roomConfig: ChatRoomConfig) {
  const seedMessages = roomConfig.messages;

  try {
    const savedMessages = localStorage.getItem(roomConfig.localStorageKey);
    if (!savedMessages) return seedMessages;

    const parsed = JSON.parse(savedMessages) as Message[];
    return mergeMessages(seedMessages, parsed);
  } catch (error) {
    console.error("저장된 메시지를 불러오지 못했습니다.", error);
    return seedMessages;
  }
}

type ChatRoomPageProps = {
  roomId?: number;
  onBack?: () => void;
};

export default function ChatRoomPage({
  roomId = 1,
  onBack,
}: ChatRoomPageProps) {
  const roomConfig = useMemo(() => getRoomConfig(roomId), [roomId]);
  const [messages, setMessages] = useState<Message[]>(() =>
    loadMessagesFromStorage(roomConfig)
  );
  const [loadedStorageKey, setLoadedStorageKey] = useState(
    roomConfig.localStorageKey
  );

  const users = roomConfig.users;
  const bottomRef = useAutoScroll(messages);
  const me = useMemo(() => users.find((user) => user.isMe), [users]);

  useLayoutEffect(() => {
    setMessages(loadMessagesFromStorage(roomConfig));
    setLoadedStorageKey(roomConfig.localStorageKey);
  }, [roomConfig]);

  useEffect(() => {
    if (loadedStorageKey !== roomConfig.localStorageKey) {
      return;
    }

    saveMessagesToStorage(roomConfig.localStorageKey, messages);
  }, [loadedStorageKey, messages, roomConfig]);

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

      const nextMessages = [...prev, newMessage];
      saveMessagesToStorage(roomConfig.localStorageKey, nextMessages);

      return nextMessages;
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

      const nextMessages = [...prev, newMessage];
      saveMessagesToStorage(roomConfig.localStorageKey, nextMessages);

      return nextMessages;
    });
  };

  return (
    <MobileLayout>
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-chat-blue-100">
        <div className="absolute left-0 right-0 top-0 z-20">
          <StatusBar />
          <ChatRoomHeader
            title={roomConfig.title}
            participantCount={roomConfig.participantCount}
            onBack={onBack}
          />
        </div>

        <MessageList messages={messages} users={users} bottomRef={bottomRef} />

        <div className="shrink-0 bg-chat-blue-100">
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
