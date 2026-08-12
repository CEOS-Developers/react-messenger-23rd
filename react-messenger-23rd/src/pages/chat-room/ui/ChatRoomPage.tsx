// 전체 페이지
// 헤더, 메지지 영역, 입력창을 조립하는 파일.
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import rawChatRooms from '@/entities/chat-room/model/chatRooms.json';
import type { ChatRoom } from '@/entities/chat-room/model/types';
import rawMessages from '@/entities/message/model/messages.json';
import type { Message } from '@/entities/message/model/types';
import ChatRoomHeader from '@/widgets/chat-room/ui/ChatRoomHeader';
import MessageInputBar from '@/widgets/chat-room/ui/MessageInputBar';
import MessageList from '@/widgets/chat-room/ui/MessageList';

const MESSAGE_STORAGE_KEY = 'chat-messages';
const CHAT_ROOMS_STORAGE_KEY = 'chat-rooms';

const initialMessages = rawMessages as Message[];
const initialChatRooms = rawChatRooms as ChatRoom[];

const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const period = hours < 12 ? 'am' : 'pm';
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;

  return `${displayHour}:${minutes}${period}`;
};

const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();

  return `${year}년 ${month}월 ${date}일`;
};

const getInitialMessages = (): Message[] => {
  const storedMessages = localStorage.getItem(MESSAGE_STORAGE_KEY);

  if (storedMessages) {
    return JSON.parse(storedMessages) as Message[];
  }

  return initialMessages;
};

const getStoredChatRooms = (): ChatRoom[] => {
  const storedRooms = localStorage.getItem(CHAT_ROOMS_STORAGE_KEY);

  if (storedRooms) {
    return JSON.parse(storedRooms) as ChatRoom[];
  }

  return initialChatRooms;
};

const ChatRoomPage = () => {
  const { id } = useParams();
  const currentRoomId = id ?? '';

  const [allMessages, setAllMessages] = useState<Message[]>(getInitialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const currentRoom = getStoredChatRooms().find((room) => room.id === currentRoomId);

  const roomMessages = useMemo(
    () => allMessages.filter((message) => message.chatRoomId === currentRoomId),
    [allMessages, currentRoomId],
  );

  // messsages가 바뀔 때 LocalStorage에 저장
  useEffect(() => {
    localStorage.setItem(MESSAGE_STORAGE_KEY, JSON.stringify(allMessages));
  }, [allMessages]);

  // 채팅방에 들어가면 해당 방의 unreadCount를 0으로 저장
  useEffect(() => {
    const storedRooms = getStoredChatRooms();

    const updatedRooms = storedRooms.map((room) => (room.id === currentRoomId ? { ...room, unreadCount: 0 } : room));

    localStorage.setItem(CHAT_ROOMS_STORAGE_KEY, JSON.stringify(updatedRooms));
  }, [currentRoomId]);

  // messages가 바뀔 때 맨 아래로 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [roomMessages]);

  const handleSendMessage = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    const newMessage: Message = {
      id: String(Date.now()),
      chatRoomId: currentRoomId,
      userId: isFlipped ? 'other' : 'me',
      messages: trimmedValue,
      time: getCurrentTime(),
      date: getCurrentDate(),
    };

    setAllMessages((prev) => [...prev, newMessage]);
    setInputValue('');
  };

  return (
    <main className="flex h-full flex-col bg-bg">
      <ChatRoomHeader
        onFlip={() => setIsFlipped((prev) => !prev)}
        isFlipped={isFlipped}
        title={currentRoom?.name ?? '채팅방'}
      />
      <MessageList
        messages={roomMessages}
        bottomRef={bottomRef}
        isFlipped={isFlipped}
        roomName={currentRoom?.name ?? '채팅방'}
      />
      <MessageInputBar value={inputValue} onChange={setInputValue} onSend={handleSendMessage} />
    </main>
  );
};

export default ChatRoomPage;
