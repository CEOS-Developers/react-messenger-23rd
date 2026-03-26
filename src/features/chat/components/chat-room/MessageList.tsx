import type { Message, User } from "../../types/chat";
import { groupMessages } from "../../utils/groupMessages";
import MessageBubble from "./MessageBubble";
import MessageItem from "./MessageItem";

type MessageListProps = {
  messages: Message[];
  users: User[];
  bottomRef: React.RefObject<HTMLDivElement | null>;
};

export default function MessageList({
  messages,
  users,
  bottomRef,
}: MessageListProps) {
  const groups = groupMessages(messages);

  return (
    <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
      <div className="flex w-full flex-col items-start gap-[24px] pb-[24px] pt-[8px]">
        {groups.map((group, groupIndex) => {
          const sender = users.find((user) => user.id === group.senderId);
          if (!sender) return null;

          const isMine = !!sender.isMe;

          if (isMine) {
            return (
              <section
                key={`group-${groupIndex}`}
                className={`flex w-full flex-col items-end gap-[4px] pr-[8px] ${
                  groupIndex === 0 ? "pt-[32px]" : ""
                }`}
              >
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
                  />
                ))}
              </section>
            );
          }

          return (
            <section
              key={`group-${groupIndex}`}
              className={`flex flex-col items-start gap-[4px] ${
                groupIndex === 0 ? "pt-[32px]" : ""
              }`}
            >
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
                  />
                ))}
              </MessageItem>
            </section>
          );
        })}

        <div ref={bottomRef} />
      </div>
    </main>
  );
}