import { memo, useRef, useState } from "react";

import EmojiIcon from "@/assets/icons/icon_emoji_regular.svg?react";
import FileIcon from "@/assets/icons/icon_file_regular.svg?react";
import SendMessageIcon from "@/assets/icons/icon_send_message_fill.svg?react";
import VoiceMessageIcon from "@/assets/icons/icon_voice_message_fill.svg?react";
import { MAX_TEXTAREA_HEIGHT } from "@/constants/chatRoom";
import { cn } from "@/utils/cn";

interface TextFieldProps {
  onSend?: (message: string) => void;
  onTyping?: () => void;
  onFile?: (file: File) => void;
  onHeightChange?: (delta: number) => void;
}

const TextField = ({ onSend, onTyping, onFile, onHeightChange }: TextFieldProps) => {
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
    const prevHeight = el.offsetHeight;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
    const newHeight = el.offsetHeight;
    setIsMultiline(newHeight > 40 || el.value.includes("\n"));
    setValue(el.value);
    onTyping?.();
    if (newHeight !== prevHeight) onHeightChange?.(newHeight - prevHeight);
  };

  const handleSend = () => {
    if (!value.trim()) return;
    onSend?.(value);
    resetTextarea();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile?.(file);
    e.target.value = "";
  };

  return (
    <div className="px-4 py-2.5">
      <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
      <div className="rounded-24 flex w-full items-center gap-2 bg-gray-100 p-2">
        <button type="button" className={cn("shrink-0", isMultiline ? "self-end" : "self-center")}>
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
        <div
          className={cn(
            "flex shrink-0 items-center gap-3",
            isMultiline ? "self-end" : "self-center",
          )}
        >
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

export default memo(TextField);
