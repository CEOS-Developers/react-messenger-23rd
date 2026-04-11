import type { RefObject } from "react";
import DateDivider from "@/features/chat/components/chat-room/DateDivider";
import MessageBubble from "@/features/chat/components/chat-room/MessageBubble";
import MessageItem from "@/features/chat/components/chat-room/MessageItem";
import { groupMessages } from "@/features/chat/utils/groupMessages";
import type { Message, User } from "@/features/chat/types/chat";

type MessageListProps = {
  messages: Message[];
  users: User[];
  bottomRef: RefObject<HTMLDivElement | null>;
};

function formatDateDividerLabel(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) return dateString;

  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
}

export default function MessageList({
  messages,
  users,
  bottomRef,
}: MessageListProps) {
  const groups = groupMessages(messages);

  return (
    <main className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
      <div className="flex w-full flex-col items-start justify-end gap-[24px] pt-[120px] pb-[34px]">
        {groups.map((group, groupIndex) => {
          const sender = users.find((user) => user.id === group.senderId);
          if (!sender) return null;

          const isMine = !!sender.isMe;
          const prevGroup = groups[groupIndex - 1];
          const shouldShowDateDivider =
            groupIndex !== 0 && prevGroup.createdDate !== group.createdDate;

          return (
            <div
              key={`group-wrapper-${groupIndex}`}
              className="flex w-full flex-col gap-[24px]"
            >
              {shouldShowDateDivider ? (
                <DateDivider label={formatDateDividerLabel(group.createdDate)} />
              ) : null}

              {isMine ? (
                <section className="flex w-full flex-col items-end gap-[4px] pr-[8px]">
                  {group.messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      text={message.text}
                      time={message.createdAt}
                      showTime={message.showTime}
                      unreadCount={message.unreadCount}
                      isMine
                      type={message.type}
                      imageUrl={message.imageUrl}
                      imageUrls={message.imageUrls}
                    />
                  ))}
                </section>
              ) : (
                <section className="flex flex-col items-start gap-[4px]">
                  <MessageItem sender={sender}>
                    {group.messages.map((message) => (
                      <MessageBubble
                        key={message.id}
                        text={message.text}
                        time={message.createdAt}
                        showTime={message.showTime}
                        unreadCount={message.unreadCount}
                        isMine={false}
                        type={message.type}
                        imageUrl={message.imageUrl}
                        imageUrls={message.imageUrls}
                      />
                    ))}
                  </MessageItem>
                </section>
              )}
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>
    </main>
  );
}
