import BackIcon from "@/assets/icons/back.svg?react";
import CallIcon from "@/assets/icons/call.svg?react";
import Message from "@/components/ChatRoom/Message";
import MessageDate from "@/components/ChatRoom/MessageDate";
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
  const { scrolled, handleScroll } = useScrolled();
  const groups = groupMessages(MESSAGES);

  return (
    <div className="flex h-full flex-col">
      <Header leftIcon={<BackIcon />} text="김예지" rightIcon={<CallIcon />} scrolled={scrolled} />
      <div className="flex-1 overflow-y-auto" onScroll={handleScroll}>
        <div className="flex flex-col gap-5 pt-2">
          <div className="flex justify-center">
            <MessageDate date={new Date()} />
          </div>
          <div className="flex flex-col gap-8">
            {groups.map((group, gi) => (
              <div key={gi} className="flex flex-col gap-1">
                {group.map((msg, mi) => (
                  <Message
                    key={mi}
                    type={msg.type}
                    name={msg.type === "friend" ? userJson.name : ""}
                    message={msg.message}
                    time={msg.time}
                    isRead={msg.isRead}
                    isFirst={mi === 0}
                    showReadStatus={msg.showReadStatus}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;
