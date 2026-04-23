import { useState, useRef, useCallback } from "react";
import IconPlus from "@/assets/icons/icon_plus.svg?react";
import IconEmoji from "@/assets/icons/icon_emoji.svg?react";
import IconThumbsUp from "@/assets/icons/icon_thumbs_up.svg?react";
import IconSend from "@/assets/icons/icon_send.svg?react";

interface MessageInputProps {
  onSend: (content: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 86)}px`;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value.slice(0, 192));
    adjustHeight();
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-white pb-8.5">
      <div className="flex items-center justify-between p-3 gap-1.75">
        <IconPlus className="w-8 h-8 shrink-0" aria-label="추가" />
        <div className="flex items-center justify-between flex-1 bg-surface-input border border-line-subtle rounded-3xl pl-4 pr-2 py-1 gap-2.5">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력해주세요"
            maxLength={192}
            rows={1}
            className="flex-1 bg-transparent text-body3-m text-content-primary placeholder-line outline-none resize-none max-h-18 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          />
          <IconEmoji className="w-8 h-8 shrink-0" aria-label="이모지" />
        </div>
        {text.trim() ? (
          <button onClick={handleSubmit}>
            <IconSend className="w-8 h-8 shrink-0" aria-label="보내기" />
          </button>
        ) : (
          <button>
            <IconThumbsUp className="w-8 h-8 shrink-0" aria-label="좋아요" />
          </button>
        )}
      </div>
    </div>
  );
}
