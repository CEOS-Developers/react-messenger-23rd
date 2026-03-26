import { useRef, useState } from "react";
import PlusIcon from "../../../../assets/icons/chat/ic_Plus.svg";
import EmojiIcon from "../../../../assets/icons/chat/ic_Emoji.svg";
import HashIcon from "../../../../assets/icons/chat/ic_Hash.svg";

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
        className="flex items-center rounded-[100px] bg-[#F5F5F7] p-[4px]"
        aria-label="사진 추가"
      >
        <img src={PlusIcon} alt="" className="h-[24px] w-[24px]" />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex flex-[1_0_0] items-center justify-between rounded-[100px] bg-[#F5F5F7] pt-[4px] pr-[6px] pb-[4px] pl-[12px]">
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
            fontWeight: 700,
            lineHeight: "160%",
            letterSpacing: "-0.56px",
            color: "Grayscale/gray300",
          }}
        />

        <button
          type="button"
          onClick={handleSend}
          aria-label="전송 또는 이모지"
          className="ml-[8px] flex h-[24px] w-[24px] items-center justify-center"
        >
          <img src={EmojiIcon} alt="" className="h-[24px] w-[24px]" />
        </button>
      </div>

      <button
        type="button"
        aria-label="샵 버튼"
        className="flex items-center gap-[10px] rounded-[100px] bg-[#F5F5F7] p-[4px]"
      >
        <img src={HashIcon} alt="" className="h-[24px] w-[24px]" />
      </button>
    </div>
  );
}