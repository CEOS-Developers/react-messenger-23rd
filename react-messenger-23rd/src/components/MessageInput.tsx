import { useState } from "react";
import plusIcon from "@/assets/icons/plus.svg";
import emojiIcon from "@/assets/icons/emoji.svg";
import thumbsupIcon from "@/assets/icons/thumbs-up.svg";
import sendIcon from "@/assets/icons/send.svg";

interface MessageInputProps {
  onSend: (content: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-white pb-[34px]">
      <div className="flex items-center justify-between px-3 pt-3 pb-2.5 gap-[7px]">
        <img src={plusIcon} alt="추가" className="w-8 h-8 shrink-0" />
        <div className="flex items-center justify-between flex-1 h-10 bg-surface-input border border-line-subtle rounded-3xl pl-4 pr-1 py-1">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 192))}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력해주세요"
            maxLength={192}
            className="flex-1 bg-transparent text-[13px] font-normal leading-[140%] text-content-primary placeholder-line outline-none"
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
