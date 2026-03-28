import { Fragment, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Bubble from "../components/chat/Bubble";
import InputBox from "../components/common/Input";
import ChipDate from "../components/chip/ChatDate";
import ChatHeader from "../components/chat/ChatHeader";
import { useChatStore } from "../store/useChatStore";
import TopBar from "../components/common/TopBar";

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
  const { roomId } = useParams();
  const roomIdNum = Number(roomId);
  const { messages: allMessages, chatRooms, users, currentUserId, sendMessage } = useChatStore();
  const messages = allMessages.filter((m) => m.chatRoomId === roomIdNum);
  const room = chatRooms.find((r) => r.id === roomIdNum);
  const participantIds = room?.participantIds ?? [];
  const chatPartner = users.find((u) => u.id !== currentUserId && participantIds.includes(u.id));

  const getUnreadCount = (msg: typeof messages[number]) =>
    participantIds.filter(
      (id) => id !== msg.senderId && !msg.readBy.includes(id)
    ).length;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-main-bg no-scrollbar">
      <TopBar />
      <ChatHeader
        chatName={chatPartner?.name ?? ""}
        profileImage={chatPartner?.profileImage}
      />
      <div ref={scrollRef} className="flex-1 flex flex-col gap-1.5 overflow-y-auto pt-2 pb-2 no-scrollbar">
        {messages.map((msg, index) => {
          const isSent = msg.senderId === currentUserId;
          const prev = messages[index - 1];
          const nextMsg = messages[index + 1];
          const showDate =
            index === 0 || !isSameDay(prev.timestamp, msg.timestamp);
          const senderChanged =
            prev && (prev.senderId === currentUserId) !== isSent;
          const showTime =
            !nextMsg ||
            (nextMsg.senderId === currentUserId) !== isSent ||
            formatMinute(nextMsg.timestamp) !== formatMinute(msg.timestamp);

          return (
            <Fragment key={msg.id}>
              <div className="gap-5">
                {showDate && (
                  <div className="flex items-center justify-center my-5">
                    <ChipDate date={new Date(msg.timestamp)} />
                  </div>
                )}
                <div className={senderChanged ? "mt-2" : ""}>
                  <Bubble
                    message={msg.text}
                    timestamp={msg.timestamp}
                    showTime={showTime}
                    isSent={isSent}
                    unreadCount={getUnreadCount(msg)}
                  />
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
      <InputBox onSend={(text) => sendMessage(text, roomIdNum)} />
    </div>
  );
}
