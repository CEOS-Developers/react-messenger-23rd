import { useEffect, useRef } from "react";
import profile from "../../assets/chat-page/profile.svg";

export type ChatMessage = {
  id: number;
  text: string;
  sender: "me" | "other";
  profileImage?: string;
  sentAt: number;
};

type MessageSendProps = {
  messages: ChatMessage[];
};

function MessageSend({ messages }: MessageSendProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="flex-1 w-full overflow-y-auto px-[var(--space-12)] py-[var(--space-12)]">
      <div className="flex w-full flex-col">
        {messages.map((message, index) => {
          const isMe = message.sender === "me";
          const previousMessage = index > 0 ? messages[index - 1] : null;

          const isSameSenderAsPrevious =
            previousMessage?.sender === message.sender;

          const isWithinOneMinute =
            previousMessage != null &&
            Math.abs(message.sentAt - previousMessage.sentAt) < 60 * 1000;

          const topSpacing =
            index === 0
              ? ""
              : isSameSenderAsPrevious && isWithinOneMinute
                ? "pt-[var(--space-1)]"
                : "pt-[var(--space-12)] pb-[var(--space-1)]";

          if (isMe) {
            return (
              <div
                key={message.id}
                className={`flex w-full justify-end ${topSpacing}`}
              >
                <div className="max-w-[var(--width-message-max)] rounded-[var(--radius-bubble)] bg-[var(--color-bubble-me)] pl-[var(--space-10)] pr-[var(--space-12)] py-[var(--space-12)] text-[var(--text-sm)] leading-[var(--line-height-tight)] text-white break-words">
                  {message.text}
                </div>
              </div>
            );
          }

          return (
            <div
              key={message.id}
              className={`flex w-full self-stretch items-end gap-[var(--space-10)] pl-[var(--space-12)] ${topSpacing}`}
            >
              <div className="flex items-center py-[4px]">
                <img
                  src={message.profileImage || profile}
                  alt="profile"
                  className="h-[var(--size-28)] w-[var(--size-28)] shrink-0"
                />
              </div>

              <div className="max-w-[var(--width-message-max)] rounded-[var(--radius-bubble)] bg-[var(--color-bubble-other)] pl-[var(--space-10)] pr-[var(--space-12)] py-[var(--space-12)] text-[var(--text-sm)] leading-[var(--line-height-tight)] text-[var(--color-text-primary)] break-words">
                {message.text}
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>
    </main>
  );
}

export default MessageSend;
