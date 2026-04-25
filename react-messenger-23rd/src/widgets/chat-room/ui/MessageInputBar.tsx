// 하단 채팅 입력창 전체 레이아웃, button부분은 enter로 채팅이 보내지게 수정해야됨.
import type { KeyboardEvent } from 'react';
import { useRef, useState } from 'react';

import smileIcon from '@/shared/assets/icons/chat-room/face-smile.svg';
import microPhoneIcon from '@/shared/assets/icons/chat-room/microphone-01.svg';
import plusIcon from '@/shared/assets/icons/chat-room/plus.svg';
import sendIcon from '@/shared/assets/icons/chattingRoom/arrow-narrow-up.svg';

interface MessageInputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

const MessageInputBar = ({ value, onChange, onSend }: MessageInputBarProps) => {
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (isComposing || e.nativeEvent.isComposing || e.keyCode === 229) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();

      //전송 후 높이 초기화
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const hasText = value.trim().length > 0;

  return (
    <div className="bg-white px-4 pt-2 pb-8">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-30 transition-colors hover:bg-gray-50"
        >
          <img src={plusIcon} alt="추가" className="h-6 w-6" />
        </button>

        <div className="flex flex-1 items-center gap-2 pr-2 rounded-xl border border-gray-30">
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder=""
            className="flex-1 resize-none bg-transparent outline-none px-3 py-2 text-base focus:outline-none max-h-[120px] overflow-y-auto"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />

          {hasText ? (
            <button
              type="button"
              onClick={onSend}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full p-1 bg-main hover:bg-pressed"
            >
              <img src={sendIcon} alt="전송" />
            </button>
          ) : (
            <>
              <button
                type="button"
                className="flex items-center justify-center rounded-full p-1 transition-colors hover:bg-gray-20"
              >
                <img src={microPhoneIcon} alt="음성메세지" className="h-6 w-6" />
              </button>
              <button
                type="button"
                className="flex items-center justify-center rounded-full p-1 transition-colors hover:bg-gray-20"
              >
                <img src={smileIcon} alt="이모티콘" className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageInputBar;
