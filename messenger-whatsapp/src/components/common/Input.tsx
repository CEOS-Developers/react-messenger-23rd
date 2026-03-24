import { useEffect, useRef, useState } from "react";

interface InputBoxProps {
  onSend: (message: string) => void;
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M18.7542 11.0394H12.961V5.24618C12.961 4.71788 12.5287 4.28564 12.0004 4.28564C11.4721 4.28564 11.0399 4.71788 11.0399 5.24618V11.0394H5.24667C4.71837 11.0394 4.28613 11.4716 4.28613 11.9999C4.28613 12.2641 4.39419 12.5042 4.56829 12.6783C4.74239 12.8524 4.98252 12.9605 5.24667 12.9605H11.0399V18.7537C11.0399 19.0178 11.1479 19.258 11.322 19.4321C11.4961 19.6062 11.7363 19.7142 12.0004 19.7142C12.5287 19.7142 12.961 19.282 12.961 18.7537V12.9605H18.7542C19.2825 12.9605 19.7147 12.5282 19.7147 11.9999C19.7147 11.4716 19.2825 11.0394 18.7542 11.0394Z"
        fill="#4E5968"
      />
    </svg>
  );
}

function EmojiIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_5024_2880)">
        <path
          d="M8 16C6.41775 16 4.87104 15.5308 3.55544 14.6518C2.23985 13.7727 1.21447 12.5233 0.608967 11.0615C0.00346629 9.59966 -0.15496 7.99113 0.153721 6.43928C0.462403 4.88743 1.22433 3.46197 2.34315 2.34315C3.46197 1.22433 4.88743 0.462403 6.43928 0.153721C7.99113 -0.15496 9.59966 0.00346629 11.0615 0.608967C12.5233 1.21447 13.7727 2.23985 14.6518 3.55544C15.5308 4.87104 16 6.41775 16 8C15.9977 10.121 15.1541 12.1545 13.6543 13.6543C12.1545 15.1541 10.121 15.9977 8 16ZM8 1.33334C6.68146 1.33334 5.39253 1.72433 4.2962 2.45687C3.19987 3.18942 2.34539 4.23061 1.84081 5.44878C1.33622 6.66695 1.2042 8.0074 1.46144 9.30061C1.71867 10.5938 2.35361 11.7817 3.28596 12.714C4.21831 13.6464 5.4062 14.2813 6.6994 14.5386C7.99261 14.7958 9.33305 14.6638 10.5512 14.1592C11.7694 13.6546 12.8106 12.8001 13.5431 11.7038C14.2757 10.6075 14.6667 9.31855 14.6667 8C14.6647 6.23249 13.9617 4.53792 12.7119 3.2881C11.4621 2.03828 9.76752 1.33528 8 1.33334ZM11.7773 10.4973C11.9094 10.3798 11.9894 10.2145 11.9996 10.038C12.0099 9.86146 11.9496 9.68808 11.832 9.556C11.7144 9.42393 11.5492 9.34397 11.3727 9.33371C11.1961 9.32346 11.0227 9.38376 10.8907 9.50134C10.0757 10.1875 9.06302 10.5958 8 10.6667C6.93761 10.5958 5.92548 10.1881 5.11067 9.50267C4.97877 9.38491 4.80549 9.32438 4.62896 9.33438C4.45242 9.34438 4.28709 9.4241 4.16934 9.556C4.05158 9.68791 3.99105 9.86118 4.00105 10.0377C4.01105 10.2143 4.09077 10.3796 4.22267 10.4973C5.28125 11.4017 6.60948 11.9301 8 12C9.39053 11.9301 10.7188 11.4017 11.7773 10.4973ZM4 6.66667C4 7.33334 4.59667 7.33334 5.33334 7.33334C6.07 7.33334 6.66667 7.33334 6.66667 6.66667C6.66667 6.31305 6.52619 5.97391 6.27615 5.72386C6.0261 5.47381 5.68696 5.33334 5.33334 5.33334C4.97972 5.33334 4.64058 5.47381 4.39053 5.72386C4.14048 5.97391 4 6.31305 4 6.66667ZM9.33334 6.66667C9.33334 7.33334 9.93 7.33334 10.6667 7.33334C11.4033 7.33334 12 7.33334 12 6.66667C12 6.31305 11.8595 5.97391 11.6095 5.72386C11.3594 5.47381 11.0203 5.33334 10.6667 5.33334C10.313 5.33334 9.97391 5.47381 9.72386 5.72386C9.47381 5.97391 9.33334 6.31305 9.33334 6.66667Z"
          fill="#4E5968"
        />
      </g>
      <defs>
        <clipPath id="clip0_5024_2880">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
    >
      <path
        d="M19.1826 10.7024L14.5318 6.05161C14.1255 5.64542 13.5745 5.41724 13 5.41724C12.4254 5.41724 11.8744 5.64542 11.4681 6.05161L6.81738 10.7024L8.34922 12.2342L11.9166 8.66677V20.5834H14.0833V8.66677L17.6507 12.2342L19.1826 10.7024Z"
        fill="white"
      />
    </svg>
  );
}

export default function InputBox({ onSend }: InputBoxProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasText = value.trim().length > 0;

  const MAX_HEIGHT = 160; // max-h-40 = 160px

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const newHeight = Math.min(el.scrollHeight, MAX_HEIGHT);
    el.style.height = `${newHeight}px`;
    el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
  }, [value]);

  const handleSend = () => {
    if (!hasText) return;
    onSend(value.trim());
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2.5 px-4 py-3 bg-white">
      {/* + 버튼 */}
      <button className="w-8 h-8 rounded-full bg-gray-01 flex items-center justify-center shrink-0">
        <PlusIcon />
      </button>

      {/* 입력창 */}
      <div className="flex-1 bg-gray-01 rounded-lg w-full px-3 py-1 flex items-end gap-4">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          className="flex-1 bg-transparent resize-none outline-none items-end typo-body-02 text-gray-06 max-h-40 overflow-hidden"
        />
        <button className="my-auto">
          <EmojiIcon />
        </button>
      </div>

      {/* 전송 버튼 */}
      {hasText && (
        <button
          onClick={handleSend}
          className="w-8 h-8 rounded-full bg-main-green flex items-center justify-center shrink-0"
        >
          <SendIcon />
        </button>
      )}
    </div>
  );
}
