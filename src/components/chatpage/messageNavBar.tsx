import plusFile from "../../img/chatpage/plusFile.svg";
import sendImg from "../../img/chatpage/sendImg.svg";
import mic from "../../img/chatpage/mic.svg";
import sendChat from "../../img/chatpage/sendChat.svg";
import { useState } from "react";

function MessageNavBar() {
  const [message, setMessage] = useState("");
  const isTyping = message.trim().length > 0;

  return (
    <div className="w-[375px] inline-flex items-center gap-[8px] px-[12px] pt-[10px] pb-[40px]">
      <section>
        <button className="flex w-[34px] h-[34px] items-center justify-center gap-[10px] rounded-full bg-[#F3F4F6]">
          <img
            src={plusFile}
            alt="plusFile"
            className="w-[24px] h-[24px] shrink-0 aspect-square"
          />
        </button>
      </section>

      <section className="flex w-[309px] h-[43px] items-center justify-between rounded-full pr-[4px] pl-[12px] backdrop-blur-[18px] bg-[rgba(238,238,238,0.35)]">
        <section>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지 보내기..."
          ></input>
        </section>

        <section className="flex items-center justify-center gap-[4px]">
          <button className="flex w-[34px] h-[34px] items-center justify-center gap-[10px]">
            <img
              src={sendImg}
              alt="sendImg"
              className="w-[24px] h-[24px] shrink-0 aspect-square"
            />
          </button>

          {isTyping ? (
            <button className="flex w-[34px] h-[34px] items-center justify-center gap-[10px] rounded-full bg-[#5F4CFF]">
              <img
                src={sendChat}
                alt="sendChat"
                className="w-[20px] h-[20px] shrink-0 aspect-square"
              />
            </button>
          ) : (
            <button className="flex w-[34px] h-[34px] items-center justify-center gap-[10px]">
              <img
                src={mic}
                alt="mic"
                className="w-[24px] h-[24px] shrink-0 aspect-square"
              />
            </button>
          )}
        </section>
      </section>
    </div>
  );
}
export default MessageNavBar;
