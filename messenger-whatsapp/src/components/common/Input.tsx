import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import PlusIcon from "@/assets/Plus.svg?react";
import EmojiIcon from "@/assets/emoji.svg?react";
import SendIcon from "@/assets/send.svg?react";

interface InputBoxProps {
  onSend: (message: string) => void;
}

const MAX_HEIGHT = 160; // max-h-40 = 160px

export default function InputBox({ onSend }: InputBoxProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasText = value.trim().length > 0;

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const newHeight = Math.min(el.scrollHeight, MAX_HEIGHT);
    el.style.height = `${newHeight}px`;
    el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
  }, [value]);

  const handleSend = () => {
    if (!hasText) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2.5 px-4 py-3 bg-white">
      <button className="w-8 h-8 rounded-full bg-gray-01 flex items-center justify-center shrink-0">
        <PlusIcon />
      </button>

      <div className="flex-1 bg-gray-01 rounded-lg w-full px-3 py-1 flex items-end gap-4">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          className="flex-1 bg-transparent resize-none outline-none items-end text-body-02 text-gray-06 max-h-40 overflow-hidden"
        />
        <button className="mb-1">
          <EmojiIcon />
        </button>
      </div>

      {hasText && (
        <button
          onClick={handleSend}
          className={clsx(
            "w-8 h-8 rounded-full bg-main-green",
            "flex items-center justify-center shrink-0 cursor-pointer",
          )}
        >
          <SendIcon />
        </button>
      )}
    </div>
  );
}
