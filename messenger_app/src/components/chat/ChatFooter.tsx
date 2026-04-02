import add from '../../icons/icon_add.svg';
import shapes from '../../icons/icon_shapes.svg';
import send from '../../icons/icon_send.svg';
import { useChatStore } from '../../store/useChatStore';
import { useState } from 'react';

export const ChatFooter = () => {
  const [inputText, setInputText] = useState('');

  const { sendMessage } = useChatStore();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (inputText.trim()) {
      sendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div>
      {/* 하단 메뉴 및 채팅 입력창 */}
      <div className="w-full h-20 px-4 py-3 shrink-0 bg-Ivory z-10">
        <div className="w-full h-full flex items-start mb-5">
          <img src={add} alt="" className="w-9 h-9 mr-2" />
          <div className="w-full h-11">
            <form
              onSubmit={handleSubmit}
              className="flex justify-between bg-white w-full h-full rounded-[13.5px] px-4 py-2.5"
            >
              <input
                type="text"
                placeholder="메시지 입력"
                className="outline-none w-full bg-transparent"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button
                type="submit"
                className="shrink-0 ml-2"
                onMouseDown={(e) => e.preventDefault()}
                onTouchStart={(e) => e.preventDefault()}
              >
                {inputText ? (
                  <img src={send} alt="" className="w-7 h-7" />
                ) : (
                  <img src={shapes} className="w-7 h-7" />
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
