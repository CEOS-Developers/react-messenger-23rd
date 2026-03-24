import { useState } from "react";
import Bubble from "../components/Bubble";
import InputBox from "../components/common/Input";

const initialMessages = [
  { id: 1, text: "동해물과 백두산이", isSent: true },
  {
    id: 2,
    text: "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세",
    isSent: false,
  },
];

export default function ChatRoom() {
  const [messages, setMessages] = useState(initialMessages);

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text, isSent: true },
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-main-bg">
      <div className="flex-1 flex flex-col justify-end py-2 overflow-y-auto">
        {messages.map((msg) => (
          <Bubble key={msg.id} message={msg.text} isSent={msg.isSent} />
        ))}
      </div>
      <InputBox onSend={handleSend} />
    </div>
  );
}
