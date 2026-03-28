import { useEffect, useState } from "react";
import type { User, Message } from "../types/chat";
import { formatTime } from "../utils/formatTime";

import ChatHeader from "../components/ChatRoom/ChatHeader";
import MessageInput from "../components/ChatRoom/MessageInput";
import NoticeBar from "../components/ChatRoom/NoticeBar";
import ReceivedBubble from "../components/ChatRoom/ReceivedBubble";
import SentBubble from "../components/ChatRoom/Sentbubble";
import TimeDivider from "../components/ChatRoom/TimeDivider";

export default function ChatRoomPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const currentUserId = "user-1"; //나=이우림=user-1 로 가정
  const opponentId = "user-2"; //상대방=김지원=user-2 로 가정

  useEffect(() => {
    fetch("/data/messages.json")
      .then((res) => res.json())
      .then((data) => setMessages(data));

    fetch("/data/users.json")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const opponent = users.find((u) => u.id === opponentId);

  return (
    <main className="bg-black flex flex-col h-screen">
      <ChatHeader name={opponent?.name || "알 수 없음"} />
      <NoticeBar />
      {/* 메세지 리스트 */}
      <div className="flex flex-col flex-1 overflow-y-auto px-3">
        {messages.map((msg, index) => {
          const prevMsg = messages[index - 1];
          let showTimeDivider = false;

          //5분 계산
          if (!prevMsg) {
            showTimeDivider = true;
          } else {
            const currentTime = new Date(msg.createdAt).getTime();
            const prevTime = new Date(prevMsg.createdAt).getTime();
            const diffInMinutes = (currentTime - prevTime) / (1000 * 60);

            if (diffInMinutes >= 5) {
              showTimeDivider = true;
            }
          }

          return (
            <div key={msg.id} className="flex flex-col">
              {/* 5분 이상 차이 날 때만 시간 텍스트 출력 */}
              {showTimeDivider && (
                <TimeDivider time={formatTime(msg.createdAt)} />
              )}

              {/* 말풍선 출력 */}
              {msg.senderId === currentUserId ? (
                <SentBubble message={msg} />
              ) : (
                <ReceivedBubble message={msg} />
              )}
            </div>
          );
        })}
      </div>

      <MessageInput />
    </main>
  );
}
