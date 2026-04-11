import add from '@/icons/icon_add.svg';
import shapes from '@/icons/icon_shapes.svg';
import send from '@/icons/icon_send.svg';
import { useChatStore } from '@/store/useChatStore';
import { useState, useRef } from 'react';

export const ChatFooter = () => {
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null); // textarea 높이 조절을 위한 ref
  const { sendMessage } = useChatStore();

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');

      // 전송 후 textarea 높이 초기화
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  // 엔터키 처리: Enter는 전송, Shift + Enter는 줄바꿈
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 한글 입력 시 조합 중 엔터 쳐지는 현상 방지 (e.nativeEvent.isComposing)
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault(); // 기본 줄바꿈 방지
      handleSubmit();
    }
  };

  // 텍스트 입력 시 textarea 높이 자동 조절
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 높이 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 스크롤 높이만큼 늘림
    }
  };

  return (
    <div>
      {/* 기존 고정 높이(h-20)를 제거하고 min-h-[80px]로 변경하여 
        줄바꿈 시 입력창이 위로 자연스럽게 늘어나도록 함 
      */}
      <div className="w-full min-h-20 px-4 py-3 shrink-0 bg-Ivory z-10 transition-all duration-200">
        {/* 입력창이 길어질 때 아이콘들이 아래쪽(바닥)에 정렬되도록 items-end 사용 */}
        <div className="w-full flex items-end mb-2">
          {/* 왼쪽 추가 버튼 */}
          <img
            src={add}
            alt="추가"
            className="w-9 h-9 mr-2 mb-1 shrink-0 cursor-pointer"
          />

          {/* 중앙 채팅 입력창 영역 */}
          <div className="flex flex-1 items-end bg-white rounded-[13.5px] px-4 py-2.5">
            <textarea
              ref={textareaRef}
              placeholder="메시지 입력"
              rows={1}
              value={inputText}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              className="outline-none w-full bg-transparent resize-none overflow-y-auto max-h-24 text-body-02 leading-relaxed [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              style={{ minHeight: '24px' }}
            />
            {/* shapes 아이콘은 항상 입력창 우측 하단에 고정 */}
            <img
              src={shapes}
              alt="이모티콘"
              className="w-7 h-7 shrink-0 ml-2 cursor-pointer"
            />
          </div>

          {/* 텍스트가 있을 때만 입력창 바깥 우측에 8px(ml-2) 간격으로 전송 버튼 렌더링 */}
          {inputText.trim() && (
            <button
              type="button"
              onClick={handleSubmit}
              className="shrink-0 ml-2 mb-2 cursor-pointer animate-fade-in"
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={(e) => e.preventDefault()}
            >
              <img src={send} alt="전송" className="w-8 h-8" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
