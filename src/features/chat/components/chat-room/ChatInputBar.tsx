import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { compressImageFiles } from "@/features/chat/utils/imageCompression";
import { isHangulJamoOnlyText } from "@/features/chat/utils/hangulJamo";
import PlusIconSvg from "@/assets/icons/chat/ic_Plus.svg";
import EmojiIconSvg from "@/assets/icons/chat/ic_Emoji.svg";
import HashIconSvg from "@/assets/icons/chat/ic_Hash.svg";
import SendIconSvg from "@/assets/icons/chat/ic_Send.svg";

type ChatInputBarProps = {
  onSendText: (text: string) => void;
  onSendImages: (imageUrls: string[]) => void;
};

const TEXTAREA_MAX_HEIGHT = 157;

export default function ChatInputBar({
  onSendText,
  onSendImages,
}: ChatInputBarProps) {
  const [input, setInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const hasText = input.trim().length > 0;
  const shouldUseJamoFix = isHangulJamoOnlyText(input);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      TEXTAREA_MAX_HEIGHT
    )}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > TEXTAREA_MAX_HEIGHT ? "auto" : "hidden";
  }, [input]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    onSendText(trimmed);
    setInput("");
  };

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    try {
      setIsUploading(true);
      const imageUrls = await compressImageFiles(files);
      onSendImages(imageUrls);
    } catch (error) {
      console.error(error);
      alert("이미지를 처리하는 중 문제가 발생했습니다.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="flex w-full items-end justify-center gap-[8px] self-stretch bg-chat-white px-[16px] pt-[8px] pb-[12px]">
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="flex shrink-0 items-center rounded-[100px] bg-chat-gray-50 p-[4px] transition-colors hover:bg-chat-gray-150 disabled:opacity-50"
      >
        <img
          src={PlusIconSvg}
          alt="사진 추가 아이콘"
          className="svg-icon h-[24px] w-[24px]"
        />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex min-w-0 flex-[1_1_auto] items-end justify-between rounded-[20px] bg-chat-gray-50 pt-[4px] pr-[6px] pb-[4px] pl-[12px]">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;

            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={isUploading ? "이미지 준비 중..." : "메시지 입력"}
          disabled={isUploading}
          rows={1}
          className={`typo-sub-body max-h-[157px] min-h-[22.4px] min-w-0 flex-1 resize-none bg-transparent text-chat-black outline-none placeholder:text-chat-gray-300 disabled:opacity-60 ${shouldUseJamoFix ? "hangul-jamo-input" : ""
            }`}
        />

        <button
          type="button"
          className="ml-[8px] flex h-[24px] w-[24px] shrink-0 items-center justify-center"
        >
          <img
            src={EmojiIconSvg}
            alt="이모지 아이콘"
            className="svg-icon h-[24px] w-[24px]"
          />
        </button>
      </div>

      <button
        type="button"
        onClick={hasText ? handleSend : undefined}
        className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[100px] transition-colors ${hasText
          ? "bg-chat-yellow-200 pt-[2px] pr-[2px] pb-0 pl-0"
          : "bg-chat-gray-50"
          }`}
      >
        <img
          src={hasText ? SendIconSvg : HashIconSvg}
          alt={hasText ? "전송 아이콘" : "샵 버튼 아이콘"}
          className={`svg-icon ${hasText ? "h-[16px] w-[16px]" : "h-[24px] w-[24px]"
            }`}
        />
      </button>
    </div>
  );
}
