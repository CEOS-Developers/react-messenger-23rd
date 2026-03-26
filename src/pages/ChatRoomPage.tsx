import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BackIcon from "@/assets/icons/back.svg?react";
import CallIcon from "@/assets/icons/call.svg?react";
import Message from "@/components/ChatRoom/Message";
import MessageDate from "@/components/ChatRoom/MessageDate";
import TextField from "@/components/ChatRoom/TextField";
import Header from "@/components/Common/Header";
import useScrolled from "@/hooks/useScrolled";
import { useChatStore } from "@/store/chatStore";
import { formatISODate } from "@/utils/formatDate";
import { formatDisplayTime } from "@/utils/formatTime";
import { getPointedCornerSet, getShowReadStatusSet, groupMessages } from "@/utils/messageGroup";

const ChatRoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const chatRoomId = Number(id);
  const navigate = useNavigate();
  const { scrolled, handleScroll } = useScrolled();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { togglePerspective, markMessagesRead, sendMessage, getChatRoom } = useChatStore();
  const chatRoom = getChatRoom(chatRoomId);

  const perspective = chatRoom?.perspective ?? "my";
  const messages = chatRoom?.messages ?? [];
  const myName = chatRoom?.myName ?? "";
  const friendName = chatRoom?.friendName ?? "";
  const headerTitle = perspective === "my" ? friendName : myName;

  const groups = groupMessages(messages);
  const pointedCornerSet = getPointedCornerSet(messages);
  const showReadStatusSet = getShowReadStatusSet(messages);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const getDisplayType = (type: "my" | "friend") => {
    if (perspective === "my") return type;
    return type === "my" ? "friend" : "my";
  };

  const handleSend = (text: string) => {
    const now = new Date();
    sendMessage(chatRoomId, text, formatISODate(now), formatDisplayTime(now));
    setTimeout(scrollToBottom, 0);
  };

  return (
    <div className="flex h-full flex-col">
      <Header
        leftIcon={<BackIcon />}
        text={headerTitle}
        rightIcon={<CallIcon />}
        scrolled={scrolled}
        onLeftIconClick={() => navigate("/chat")}
        onTextClick={() => {
          markMessagesRead(chatRoomId, perspective);
          togglePerspective(chatRoomId);
        }}
      />
      <main ref={scrollRef} className="flex-1 overflow-y-auto" onScroll={handleScroll}>
        <div className="flex flex-col gap-5 pt-2 pb-5.5">
          {(() => {
            let absoluteIndex = 0;
            return groups.map((group, groupIndex) => {
              const prevGroup = groups[groupIndex - 1];
              const showDate = !prevGroup || prevGroup[0].date !== group[0].date;
              return (
                <React.Fragment key={groupIndex}>
                  {showDate && (
                    <div className="flex justify-center">
                      <MessageDate date={group[0].date} />
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    {group.map((msg, msgIndex) => {
                      const currentIndex = absoluteIndex++;
                      const displayType = getDisplayType(msg.type);
                      const name =
                        displayType === "friend"
                          ? perspective === "my"
                            ? friendName
                            : myName
                          : "";
                      return (
                        <Message
                          key={msgIndex}
                          type={displayType}
                          name={name}
                          message={msg.message}
                          time={msg.time}
                          isRead={msg.isRead}
                          isFirst={msgIndex === 0}
                          isFirstInTimeGroup={pointedCornerSet.has(currentIndex)}
                          showReadStatus={showReadStatusSet.has(currentIndex)}
                        />
                      );
                    })}
                  </div>
                </React.Fragment>
              );
            });
          })()}
        </div>
      </main>
      <div className="mb-10.5">
        <TextField onTyping={scrollToBottom} onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatRoomPage;
