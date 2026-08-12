import { useState } from 'react';

import rawChatRooms from '@/entities/chat-room/model/chatRooms.json';
import type { ChatRoom } from '@/entities/chat-room/model/types';
import type { Message } from '@/entities/message/model/types';

import ChatRoomItem from './ChatRoomItem';

const initialChatRooms = rawChatRooms as ChatRoom[];

const MESSAGE_STORAGE_KEY = 'chat-messages';
const CHAT_ROOMS_STORAGE_KEY = 'chat-rooms';

const getMessages = (): Message[] => {
  const stored = localStorage.getItem(MESSAGE_STORAGE_KEY);
  if (!stored) return [];
  return JSON.parse(stored) as Message[];
};

const getChatRooms = (): ChatRoom[] => {
  const stored = localStorage.getItem(CHAT_ROOMS_STORAGE_KEY);
  if (!stored) return initialChatRooms;
  return JSON.parse(stored) as ChatRoom[];
};

const ChatRoomList = () => {
  const [, setRefresh] = useState(false);

  const allMessages = getMessages();
  const chatRooms = getChatRooms();

  const handleTogglePin = (roomId: string) => {
    const now = Date.now();

    const updatedRooms = chatRooms.map((room) => {
      if (room.id !== roomId) return room;

      if (!room.isPinned) {
        return {
          ...room,
          isPinned: true,
          pinOrder: now,
          recentUnpinned: null,
        };
      }

      return {
        ...room,
        isPinned: false,
        pinOrder: null,
        recentUnpinned: now,
      };
    });

    localStorage.setItem(CHAT_ROOMS_STORAGE_KEY, JSON.stringify(updatedRooms));
    setRefresh((prev) => !prev);
  };

  const sortedRooms = [...chatRooms].sort((a, b) => {
    // 핀된 방이 먼저
    if (a.isPinned !== b.isPinned) {
      return a.isPinned ? -1 : 1;
    }

    // 둘 다 핀된 경우: 최근에 핀한 방이 위
    if (a.isPinned && b.isPinned) {
      return (b.pinOrder ?? 0) - (a.pinOrder ?? 0);
    }

    // 둘 다 핀이 안 된 경우: 최근에 핀 해제한 방이 위
    const aRecentUnpinned = a.recentUnpinned ?? 0;
    const bRecentUnpinned = b.recentUnpinned ?? 0;

    if (aRecentUnpinned !== bRecentUnpinned) {
      return bRecentUnpinned - aRecentUnpinned;
    }

    // 나머지는 기존 순서
    return 0;
  });

  const getLastMessage = (roomId: string): Message | undefined => {
    const roomMessages = allMessages.filter((message) => message.chatRoomId === roomId);

    if (roomMessages.length === 0) return undefined;

    return roomMessages[roomMessages.length - 1];
  };

  return (
    <section className="flex-1 overflow-y-auto scrollbar-hide">
      <ul className="flex flex-col">
        {sortedRooms.map((room) => {
          const lastMessage = getLastMessage(room.id);

          return (
            <li key={room.id}>
              <ChatRoomItem room={room} lastMessage={lastMessage} onTogglePin={handleTogglePin} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ChatRoomList;
