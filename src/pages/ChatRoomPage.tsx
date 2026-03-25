import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import BackIcon from "@/assets/icons/back.svg?react";
import CallIcon from "@/assets/icons/call.svg?react";
import Message from "@/components/ChatRoom/Message";
import MessageDate from "@/components/ChatRoom/MessageDate";
import TextField from "@/components/ChatRoom/TextField";
import Header from "@/components/Common/Header";
import { CHAT_STORAGE_KEY } from "@/constants/chatRoom";
import messagesJson from "@/data/messages.json";
import userJson from "@/data/user.json";
import useScrolled from "@/hooks/useScrolled";
import type { MessageItem } from "@/types/message";
import { formatISODate } from "@/utils/formatDate";
import { formatDisplayTime } from "@/utils/formatTime";
import { getPointedCornerSet, getShowReadStatusSet, groupMessages } from "@/utils/messageGroup";

const ChatRoomPage = () => {
  const navigate = useNavigate();
  const { scrolled, handleScroll } = useScrolled();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<MessageItem[]>(() => {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as MessageItem[]) : (messagesJson as MessageItem[]);
  });

  const groups = groupMessages(messages);
  const pointedCornerSet = getPointedCornerSet(messages);
  const showReadStatusSet = getShowReadStatusSet(messages);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const handleSend = (text: string) => {
    const now = new Date();
    const newMsg: MessageItem = {
      type: "my",
      message: text,
      date: formatISODate(now),
      time: formatDisplayTime(now),
      isRead: false,
      showReadStatus: false,
    };
    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updated));
    setTimeout(scrollToBottom, 0);
  };

  return (
    <div className="flex h-full flex-col">
      <Header
        leftIcon={<BackIcon />}
        text="김예지"
        rightIcon={<CallIcon />}
        scrolled={scrolled}
        onLeftIconClick={() => navigate("/chat")}
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
                      return (
                        <Message
                          key={msgIndex}
                          type={msg.type}
                          name={msg.type === "friend" ? userJson.name : ""}
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
