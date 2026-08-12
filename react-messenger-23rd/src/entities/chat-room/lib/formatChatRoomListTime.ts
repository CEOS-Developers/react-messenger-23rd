import type { Message } from '@/entities/message/model/types';

import type { ChatRoom } from '../model/types';

const parseKoreanDate = (dateText: string): Date | null => {
  const match = dateText.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
  if (!match) return null;
  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
};

const formatKoreanTime = (timeText: string): string => {
  const match = timeText.match(/(\d{1,2}):(\d{2})(am|pm)/i);
  if (!match) return timeText;

  const [, hourText, minute, meridiem] = match;
  const hour = Number(hourText);
  const period = meridiem.toLowerCase() === 'am' ? '오전' : '오후';

  return `${period} ${hour}시 ${minute}분`;
};

const isSameDay = (a: Date, b: Date): boolean => {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
};

export const formatChatRoomListTime = (lastMessage?: Message, room?: ChatRoom): string => {
  if (!lastMessage) {
    return room?.time ?? '';
  }

  const parsedDate = parseKoreanDate(lastMessage.date);

  if (!parsedDate) {
    return room?.time ?? '';
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(parsedDate, today)) {
    return formatKoreanTime(lastMessage.time);
  }

  if (isSameDay(parsedDate, yesterday)) {
    return '어제';
  }

  return `${parsedDate.getMonth() + 1}월 ${parsedDate.getDate()}일`;
};
