import { Fragment, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CameraIcon from "@/assets/camera.svg?react";
import CallIcon from "@/assets/call.svg?react";
import Bubble from "@/components/chat/Bubble";
import InputBox from "@/components/common/Input";
import ChipDate from "@/components/chip/ChatDate";
import PageHeader from "@/components/common/PageHeader";
import TopBar from "@/components/common/TopBar";
import { useChatStore } from "@/store/useChatStore";
import { useFriendsStore } from "@/store/useFriendsStore";
import { useMemo } from "react";
import { groupMessages } from "@/hooks/useMessageGrouping";

export default function ChatRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const roomIdNum = Number(roomId);
  const {
    messages: allMessages,
    chatRooms,
    currentUserId,
    sendMessage,
    markAsRead,
    swapPerspective,
    resetPerspective,
  } = useChatStore();
  const { friends } = useFriendsStore();
  const messages = allMessages.filter((m) => m.chatRoomId === roomIdNum);
  const room = chatRooms.find((r) => r.id === roomIdNum);
  const participantIds = room?.participantIds ?? [];
  const roomName = friends
    .filter((f) => f.id !== currentUserId && participantIds.includes(f.id))
    .map((f) => f.name)
    .join(", ");
  const groupedMessages = useMemo(
    () => groupMessages(messages, currentUserId, participantIds, friends),
    [messages, currentUserId, participantIds, friends],
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    resetPerspective();
    markAsRead(roomIdNum);
    return () => resetPerspective();
  }, [roomIdNum]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-main-bg no-scrollbar">
      <TopBar />
      <PageHeader
        title={roomName}
        isTitle={false}
        showBack
        onBack={() => navigate(-1)}
        onTitleClick={() => swapPerspective(roomIdNum)}
        right={
          <>
            <CameraIcon />
            <CallIcon />
          </>
        }
      />
      <div
        ref={scrollRef}
        className="flex-1 flex flex-col gap-1.5 overflow-y-auto pt-2 pb-2 no-scrollbar"
      >
        {groupedMessages.map(({ msg, isSent, showDate, showTime, senderName, unreadCount }, index) => {
          const prev = groupedMessages[index - 1];
          const senderChanged = prev && prev.isSent !== isSent;

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
                    unreadCount={unreadCount}
                    senderName={senderName}
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
