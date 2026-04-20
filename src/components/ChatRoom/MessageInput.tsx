import { useState } from "react";

interface MessageInputProps {
  onSend: (text: string) => void;
}

export default function MessageInput({ onSend }: MessageInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputValue.trim() !== "") {
        //빈 메세지가 아닐 때만 전송
        onSend(inputValue);
        setInputValue("");
      }
    }
  };
  return (
    <footer className="flex sticky w-full bottom-0 bg-gray80 text-white items-center justify-between h-21.5 px-4 pt-2 pb-8 gap-2">
      <div className="flex justify-center w-7 h-7 shrink-0">
        <button>
          <img src="/images/icons/voice.png" className="w-full" alt="voice" />
        </button>
      </div>
      {/* 입력창 */}
      <div className="flex flex-1 justify-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder=""
          className="bg-gray70 rounded-sm h-9 w-full outline-none text-base"
        />
      </div>
      <div className="flex justify-center w-12 h-7 shrink-0">
        <button>
          <img src="/images/icons/emojis.png" className="w-full" alt="emojis" />
        </button>
        <button>
          <img src="/images/icons/plus.png" className="w-full" alt="plus" />
        </button>
      </div>
    </footer>
  );
}
