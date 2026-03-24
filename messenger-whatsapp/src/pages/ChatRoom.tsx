import { Fragment, useState } from "react";
import SentBubble from "../components/chat/SentBubble";
import ReceivedBubble from "../components/chat/ReceivedBubble";
import InputBox from "../components/common/Input";
import ChipDate from "../components/chip/ChatDate";
import TopBar from "../assets/topbar.svg?react";
import ChatHeader from "../components/chat/ChatHeader";

type Message = {
  id: number;
  text: string;
  isSent: boolean;
  timestamp: number;
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: "동해물과 백두산이",
    isSent: true,
    timestamp: new Date("2026-03-18T09:30:00").getTime(),
  },
  {
    id: 2,
    text: "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세",
    isSent: false,
    timestamp: new Date("2026-03-18T09:31:00").getTime(),
  },
];

const formatMinute = (ts: number) => {
  const d = new Date(ts);
  return `${d.getHours()}:${d.getMinutes()}`;
};

const isSameDay = (a: number, b: number) => {
  const da = new Date(a);
  const db = new Date(b);
  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  );
};

export default function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSend = (text: string) => {
    const now = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: now, text, isSent: true, timestamp: now },
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-main-bg">
      <TopBar />
      <ChatHeader chatName="세오스" />
      <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto pt-2 pb-2">
        {messages.map((msg, index) => {
          const prev = messages[index - 1];
          const nextMsg = messages[index + 1];
          const showDate =
            index === 0 || !isSameDay(prev.timestamp, msg.timestamp);
          const senderChanged = prev && prev.isSent !== msg.isSent;
          const showTime =
            !nextMsg ||
            nextMsg.isSent !== msg.isSent ||
            formatMinute(nextMsg.timestamp) !== formatMinute(msg.timestamp);
          return (
            <Fragment key={msg.id}>
              <div className="gap-5">
                {showDate && (
                  <div className="flex items-center justify-center mt-5">
                    <ChipDate date={new Date(msg.timestamp)} />
                  </div>
                )}
                <div className={senderChanged ? "mt-2" : ""}>
                  {msg.isSent ? (
                    <SentBubble
                      message={msg.text}
                      timestamp={msg.timestamp}
                      showTime={showTime}
                    />
                  ) : (
                    <ReceivedBubble
                      message={msg.text}
                      timestamp={msg.timestamp}
                      showTime={showTime}
                    />
                  )}
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
      <InputBox onSend={handleSend} />
    </div>
  );
}
