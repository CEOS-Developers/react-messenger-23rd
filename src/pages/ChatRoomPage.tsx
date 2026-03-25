import React from "react";
import { useNavigate } from "react-router-dom";

import BackIcon from "@/assets/icons/back.svg?react";
import CallIcon from "@/assets/icons/call.svg?react";
import Message from "@/components/ChatRoom/Message";
import MessageDate from "@/components/ChatRoom/MessageDate";
import TextField from "@/components/ChatRoom/TextField";
import Header from "@/components/Common/Header";
import messagesJson from "@/data/messages.json";
import userJson from "@/data/user.json";
import useScrolled from "@/hooks/useScrolled";
import type { MessageItem } from "@/types/message";

const MESSAGES: MessageItem[] = messagesJson as MessageItem[];

const groupMessages = (messages: readonly MessageItem[]) => {
  const groups: MessageItem[][] = [];
  messages.forEach(msg => {
    const last = groups[groups.length - 1];
    if (last && last[0].type === msg.type) {
      last.push(msg);
    } else {
      groups.push([msg]);
    }
  });
  return groups;
};

const ChatRoomPage = () => {
  const navigate = useNavigate();
  const { scrolled, handleScroll } = useScrolled();
  const groups = groupMessages(MESSAGES);

  return (
    <div className="flex h-full flex-col">
      <Header
        leftIcon={<BackIcon />}
        text="김예지"
        rightIcon={<CallIcon />}
        scrolled={scrolled}
        onLeftIconClick={() => navigate("/chat")}
      />
      <div className="flex-1 overflow-y-auto" onScroll={handleScroll}>
        <div className="flex flex-col gap-5 pt-2">
          {groups.map((group, groupIndex) => {
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
                  {group.map((msg, msgIndex) => (
                    <Message
                      key={msgIndex}
                      type={msg.type}
                      name={msg.type === "friend" ? userJson.name : ""}
                      message={msg.message}
                      time={msg.time}
                      isRead={msg.isRead}
                      isFirst={msgIndex === 0}
                      showReadStatus={msg.showReadStatus}
                    />
                  ))}
                </div>
              </React.Fragment>
            );
          })}
        </div>
        <TextField />
      </div>
    </div>
  );
};

export default ChatRoomPage;
