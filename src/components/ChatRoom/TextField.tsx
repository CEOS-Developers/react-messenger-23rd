import { useRef, useState } from "react";

import EmojiIcon from "@/assets/icons/emoji.svg?react";
import FileIcon from "@/assets/icons/file.svg?react";
import SendMessageIcon from "@/assets/icons/send_message.svg?react";
import VoiceMessageIcon from "@/assets/icons/voice_message.svg?react";

interface TextFieldProps {
  onSend?: (message: string) => void;
}

const TextField = ({ onSend }: TextFieldProps) => {
  const [value, setValue] = useState("");
  const [isMultiline, setIsMultiline] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasText = value.length > 0;

  const handleSend = () => {
    if (!value.trim()) return;
    onSend?.(value);
    setValue("");
    setIsMultiline(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-4 py-2.5">
      <div className="rounded-24 flex w-full items-center gap-2 bg-gray-100 p-2">
        <button type="button" className={`shrink-0 ${isMultiline ? "self-end" : "self-center"}`}>
          <EmojiIcon className="size-6 cursor-pointer text-gray-400" />
        </button>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={e => {
            const el = e.currentTarget;
            el.style.height = "auto";
            el.style.height = `${el.scrollHeight}px`;
            setIsMultiline(
              el.scrollHeight > el.clientHeight || el.value.includes("\n") || el.scrollHeight > 40,
            );
          }}
          placeholder="메세지"
          rows={1}
          className="scrollbar-hide flex-1 resize-none overflow-y-auto bg-transparent py-0 text-gray-600 placeholder:text-gray-400 focus:outline-none"
          style={{ maxHeight: "120px" }}
        />
        <div
          className={`flex shrink-0 items-center gap-3 ${isMultiline ? "self-end" : "self-center"}`}
        >
          {!hasText && (
            <button type="button">
              <FileIcon className="size-6 cursor-pointer text-gray-400" />
            </button>
          )}
          <button type="button" onClick={handleSend}>
            {hasText ? (
              <SendMessageIcon className="size-8 cursor-pointer" />
            ) : (
              <VoiceMessageIcon className="size-8 cursor-pointer" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextField;
