import { useRef, useState } from "react";
import PlusIcon from "../../../../assets/icons/chat/ic_Plus.svg";
import EmojiIcon from "../../../../assets/icons/chat/ic_Emoji.svg";
import HashIcon from "../../../../assets/icons/chat/ic_Hash.svg";
import SendIcon from "../../../../assets/icons/chat/ic_Send.svg";

type ChatInputBarProps = {
  onSendText: (text: string) => void;
  onSendImage: (imageUrl: string) => void;
};

export default function ChatInputBar({
  onSendText,
  onSendImage,
}: ChatInputBarProps) {
  const [input, setInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const hasText = input.trim().length > 0;

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    onSendText(trimmed);
    setInput("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    onSendImage(imageUrl);
    event.target.value = "";
  };

  return (
    <div className="flex w-full items-center justify-center gap-[8px] self-stretch bg-white px-[16px] pt-[8px] pb-[12px]">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex shrink-0 items-center rounded-[100px] bg-[#F5F5F7] p-[4px] transition-colors hover:bg-[#EDEDEF]"
        aria-label="사진 추가"
      >
        <img src={PlusIcon} alt="" className="h-[24px] w-[24px] shrink-0" />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex min-w-0 flex-[1_1_auto] items-center justify-between rounded-[100px] bg-[#F5F5F7] pt-[4px] pr-[6px] pb-[4px] pl-[12px]">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="메시지 입력"
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#A2A2A4]"
          style={{
            fontFamily:
              '"Kakao Small Sans", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
            fontFeatureSettings: '"liga" off, "clig" off',
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "160%",
            letterSpacing: "-0.56px",
            color: "#191919",
          }}
        />

        <button
          type="button"
          aria-label="이모지"
          className="ml-[8px] flex h-[24px] w-[24px] shrink-0 items-center justify-center"
        >
          <img src={EmojiIcon} alt="" className="h-[24px] w-[24px]" />
        </button>
      </div>

      <button
        type="button"
        onClick={hasText ? handleSend : undefined}
        aria-label={hasText ? "전송" : "샵 버튼"}
        className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[100px] transition-colors ${
          hasText 
            ? "bg-[#FFE000] pt-[2px] pr-[2px] pb-0 pl-0" 
            : "bg-[#F5F5F7]"
        }`}
      >
        <img
          src={hasText ? SendIcon : HashIcon}
          alt=""
          className={hasText ? "h-[16px] w-[16px] shrink-0" : "h-[24px] w-[24px] shrink-0"}
        />
      </button>
    </div>
  );
}