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
    <main className="flex-1 w-full overflow-y-auto px-[12px] py-[12px]">
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
                ? "mt-[1px]"
                : "mt-[12px]";

          if (isMe) {
            return (
              <div
                key={message.id}
                className={`flex w-full justify-end ${topSpacing}`}
              >
                <div className="max-w-[240px] rounded-[24px] bg-[#D91CF2] px-[16px] py-[12px] text-[14px] leading-[140%] text-white break-words">
                  {message.text}
                </div>
              </div>
            );
          }

          return (
            <div
              key={message.id}
              className={`flex w-full self-stretch items-end gap-[10px] pl-[12px] ${topSpacing}`}
            >
              <img
                src={message.profileImage || profile}
                alt="profile"
                className="w-[32px] h-[32px] shrink-0"
              />

              <div className="max-w-[240px] rounded-[24px] bg-[#F3F4F6] px-[16px] py-[12px] text-[14px] leading-[140%] text-[#0A1014] break-words">
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
