import plusFile from "../../assets/chat-page/plus-file.svg";
import sendImg from "../../assets/chat-page/send-img.svg";
import mic from "../../assets/chat-page/mic.svg";
import sendChat from "../../assets/chat-page/send-chat.svg";
import { useState } from "react";

type MessageNavBarProps = {
  onSendMessage: (text: string) => void;
};

function MessageNavBar({ onSendMessage }: MessageNavBarProps) {
  const [message, setMessage] = useState("");
  const isTyping = message.trim().length > 0;

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    onSendMessage(trimmedMessage);
    setMessage("");
  };

  return (
    <div className="inline-flex w-[var(--screen-width)] items-center gap-[var(--space-8)] px-[var(--space-12)] pt-[var(--space-10)] pb-[var(--space-40)]">
      <section>
        <button className="flex h-[var(--size-34)] w-[var(--size-34)] items-center justify-center gap-[var(--space-10)] rounded-[var(--radius-full)] bg-[var(--color-gray-100)]">
          <img
            src={plusFile}
            alt="plusFile"
            className="aspect-square h-[var(--size-24)] w-[var(--size-24)] shrink-0"
          />
        </button>
      </section>

      <section className="flex h-[var(--size-43)] w-[var(--width-input)] items-center justify-between rounded-[var(--radius-full)] pr-[var(--space-4)] pl-[var(--space-12)] backdrop-blur-[var(--blur-input)] bg-[var(--color-input-surface)]">
        <section>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.nativeEvent.isComposing) return;
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="메시지 보내기..."
            className="text-[var(--text-sm)] font-medium leading-[var(--line-height-tight)] text-[var(--color-grey-600)]"
          ></input>
        </section>

        <section className="flex items-center justify-center gap-[var(--space-4)]">
          <button className="flex h-[var(--size-34)] w-[var(--size-34)] items-center justify-center gap-[var(--space-10)]">
            <img
              src={sendImg}
              alt="sendImg"
              className="aspect-square h-[var(--size-24)] w-[var(--size-24)] shrink-0"
            />
          </button>

          {isTyping ? (
            <button
              onClick={handleSend}
              className="flex h-[var(--size-34)] w-[var(--size-34)] items-center justify-center gap-[var(--space-10)] rounded-[var(--radius-full)] bg-[var(--color-action-primary)]"
            >
              <img
                src={sendChat}
                alt="sendChat"
                className="aspect-square h-[var(--size-20)] w-[var(--size-20)] shrink-0"
              />
            </button>
          ) : (
            <button className="flex h-[var(--size-34)] w-[var(--size-34)] items-center justify-center gap-[var(--space-10)]">
              <img
                src={mic}
                alt="mic"
                className="aspect-square h-[var(--size-24)] w-[var(--size-24)] shrink-0"
              />
            </button>
          )}
        </section>
      </section>
    </div>
  );
}
export default MessageNavBar;
