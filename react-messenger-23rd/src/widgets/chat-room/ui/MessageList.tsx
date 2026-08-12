// 메시지 목록 전체.
import type { RefObject } from 'react';

import type { Message } from '@/entities/message/model/types';
import MessageBubble from '@/entities/message/ui/MessageBubble';
import type { User } from '@/entities/user/model/types';
import rawUsers from '@/entities/user/model/users.json';

import DateDivider from './DateDivider';

interface MessageListProps {
  messages: Message[];
  bottomRef: RefObject<HTMLDivElement | null>;
  isFlipped: boolean;
  roomName: string;
}

const users = rawUsers as User[];

const getMarginClass = (currentUserId: string, nextUserId: string | undefined, isFlipped: boolean) => {
  const toIsMe = (id: string) => (isFlipped ? id !== 'me' : id === 'me');

  const currentIsMe = toIsMe(currentUserId);
  const nextIsMe = nextUserId ? toIsMe(nextUserId) : null;

  if (nextIsMe === null) return 'mb-2';
  if (currentIsMe && nextIsMe) return 'mb-2';
  if (currentIsMe && !nextIsMe) return 'mb-3';
  if (!currentIsMe && nextIsMe) return 'mb-4';
  return 'mb-2';
};

const MessageList = ({ messages, bottomRef, isFlipped, roomName }: MessageListProps) => {
  return (
    <section className="flex-1 scrollbar-hide overflow-y-auto bg-section-bg px-4 py-3">
      {messages.map((message, index) => {
        const prevMessage = messages[index - 1];
        const nextMessage = messages[index + 1];

        const showDate = index === 0 || prevMessage.date !== message.date;

        const showTime =
          !nextMessage ||
          nextMessage.userId !== message.userId ||
          nextMessage.time !== message.time ||
          nextMessage.date !== message.date;

        const showProfile = index === 0 || prevMessage.userId !== message.userId || prevMessage.time !== message.time;

        const marginClass = getMarginClass(message.userId, nextMessage?.userId, isFlipped);

        const user = users.find((item) => item.id === message.userId);
        if (!user) return null;

        const resolvedUser: User = {
          ...user,
          name: message.userId === 'other' ? roomName : user.name,
        };

        return (
          <div key={message.id}>
            {showDate && <DateDivider date={message.date} />}
            <MessageBubble
              message={message}
              user={resolvedUser}
              showTime={showTime}
              showProfile={showProfile}
              isFlipped={isFlipped}
              marginClass={marginClass}
            />
          </div>
        );
      })}
      <div ref={bottomRef} />
    </section>
  );
};

export default MessageList;
