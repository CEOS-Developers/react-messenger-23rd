import { useRef, useState } from "react";

import EmojiIcon from "@/assets/icons/emoji.svg?react";
import FileIcon from "@/assets/icons/file.svg?react";
import SendMessageIcon from "@/assets/icons/send_message.svg?react";
import VoiceMessageIcon from "@/assets/icons/voice_message.svg?react";
import { MAX_TEXTAREA_HEIGHT } from "@/constants/chatRoom";

interface TextFieldProps {
  onSend?: (message: string) => void;
  onTyping?: () => void;
  onFile?: (file: File) => void;
}

const TextField = ({ onSend, onTyping, onFile }: TextFieldProps) => {
  const [value, setValue] = useState("");
  const [isMultiline, setIsMultiline] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasText = value.length > 0;

  const resetTextarea = () => {
    setValue("");
    setIsMultiline(false);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
    setIsMultiline(el.scrollHeight > 40 || el.value.includes("\n"));
    setValue(el.value);
    onTyping?.();
  };

  const handleSend = () => {
    if (!value.trim()) return;
    onSend?.(value);
    resetTextarea();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile?.(file);
    e.target.value = "";
  };

  const alignClass = isMultiline ? "self-end" : "self-center";

  return (
    <div className="px-4 py-2.5">
      <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
      <div className="rounded-24 flex w-full items-center gap-2 bg-gray-100 p-2">
        <button type="button" className={`shrink-0 ${alignClass}`}>
          <EmojiIcon className="size-6 cursor-pointer text-gray-400" />
        </button>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="메세지"
          rows={1}
          className="scrollbar-hide flex-1 resize-none overflow-y-auto bg-transparent py-0 text-gray-600 placeholder:text-gray-400 focus:outline-none"
          style={{ maxHeight: `${MAX_TEXTAREA_HEIGHT}px` }}
        />
        <div className={`flex shrink-0 items-center gap-3 ${alignClass}`}>
          {!hasText && (
            <button type="button" onClick={() => fileInputRef.current?.click()}>
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
