// 전체 페이지
// 헤더, 메지지 영역, 입력창을 조립하는 파일.
import { useEffect, useRef, useState } from 'react';

import rawMessages from '@/entities/message/model/messages.json';
import type { Message } from '@/entities/message/model/types';
import StatusBar from '@/shared/ui/StatusBar';
import ChatRoomHeader from '@/widgets/chat-room/ui/ChatRoomHeader';
import MessageInputBar from '@/widgets/chat-room/ui/MessageInputBar';
import MessageList from '@/widgets/chat-room/ui/MessageList';

const STORAGE_KEY = 'chat-messages';

const initialMessages = rawMessages as Message[];

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
  const storedMessages = localStorage.getItem(STORAGE_KEY);

  if (storedMessages) {
    return JSON.parse(storedMessages) as Message[];
  }

  return initialMessages;
};

const ChatRoomPage = () => {
  const [messages, setMessages] = useState<Message[]>(getInitialMessages);
  const [inputValue, setInputValue] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // messsages가 바뀔 때 LocalStorage에 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // messages가 바뀔 때 맨 아래로 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    const newMessage: Message = {
      id: String(Date.now()),
      userId: isFlipped ? 'other' : 'me',
      messages: trimmedValue,
      time: getCurrentTime(),
      date: getCurrentDate(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
  };

  return (
    <main className="flex h-full flex-col bg-[var(--color-gray-20)]">
      <StatusBar />
      <ChatRoomHeader onFlip={() => setIsFlipped((prev) => !prev)} isFlipped={isFlipped} />
      <MessageList messages={messages} bottomRef={bottomRef} isFlipped={isFlipped} />
      <MessageInputBar value={inputValue} onChange={setInputValue} onSend={handleSendMessage} />
    </main>
  );
};

export default ChatRoomPage;
