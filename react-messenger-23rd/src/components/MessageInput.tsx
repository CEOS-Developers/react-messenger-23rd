import { useState, useRef, useCallback } from "react";
import plusIcon from "@/assets/icons/plus.svg";
import emojiIcon from "@/assets/icons/emoji.svg";
import thumbsupIcon from "@/assets/icons/thumbs-up.svg";
import sendIcon from "@/assets/icons/send.svg";

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
    <div className="bg-white pb-[34px]">
      <div className="flex items-center justify-between p-3 gap-[7px]">
        <img src={plusIcon} alt="추가" className="w-8 h-8 shrink-0" />
        <div className="flex items-center justify-between flex-1 bg-surface-input border border-line-subtle rounded-3xl pl-4 pr-2 py-1 gap-2.5">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력해주세요"
            maxLength={192}
            rows={1}
            className="flex-1 bg-transparent text-[13px] font-normal leading-[140%] text-content-primary placeholder-line outline-none resize-none max-h-[72px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          />
          <img src={emojiIcon} alt="이모지" className="w-8 h-8 shrink-0" />
        </div>
        {text.trim() ? (
          <button onClick={handleSubmit}>
            <img src={sendIcon} alt="보내기" className="w-8 h-8 shrink-0" />
          </button>
        ) : (
          <button>
            <img src={thumbsupIcon} alt="좋아요" className="w-8 h-8 shrink-0" />
          </button>
        )}
      </div>
    </div>
  );
}
