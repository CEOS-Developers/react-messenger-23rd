import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BackIcon from "@/assets/icons/back.svg?react";
import CallIcon from "@/assets/icons/call.svg?react";
import Message from "@/components/ChatRoom/Message";
import MessageDate from "@/components/ChatRoom/MessageDate";
import TextField from "@/components/ChatRoom/TextField";
import Header from "@/components/Common/Header";
import { useChatStore } from "@/store/chatStore";
import { formatISODate } from "@/utils/formatDate";
import { formatDisplayTime } from "@/utils/formatTime";
import { getUserById } from "@/utils/getUser";
import { computeMessageMeta, groupMessages } from "@/utils/messageGroup";

const ChatRoomPage = () => {
  const { id } = useParams<{ id: string }>();
  const chatRoomId = Number(id);
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const chatRoom = useChatStore(state => state.chatRooms[chatRoomId]);
  const switchPerspective = useChatStore(state => state.switchPerspective);
  const sendMessage = useChatStore(state => state.sendMessage);

  const perspective = chatRoom?.perspective ?? "my";
  const myUser = getUserById(chatRoom?.myUserId ?? 0);
  const friendUser = getUserById(chatRoom?.friendUserId ?? 0);
  const headerTitle = perspective === "my" ? (friendUser?.name ?? "") : (myUser?.name ?? "");
  const friendDisplayUser = perspective === "my" ? friendUser : myUser;

  // 메시지 그룹 및 메타데이터를 단일 메모이제이션으로 계산
  const { renderable, pointedCornerSet, showReadStatusSet } = useMemo(() => {
    const messages = chatRoom ? chatRoom.messages : [];
    const groups = groupMessages(messages);
    const { pointedCornerSet, showReadStatusSet } = computeMessageMeta(messages);

    let flatIdx = 0;
    const renderable = groups.map((group, groupIdx) => ({
      showDate: groupIdx === 0 || groups[groupIdx - 1][0].date !== group[0].date,
      date: group[0].date,
      messages: group.map((msg, msgIdx) => {
        const idx = flatIdx++;
        return { msg, msgIdx, idx };
      }),
    }));

    return { renderable, pointedCornerSet, showReadStatusSet };
  }, [chatRoom]);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatRoomId, scrollToBottom]);

  const handleSend = useCallback(
    (text: string) => {
      const now = new Date();
      sendMessage(chatRoomId, text, formatISODate(now), formatDisplayTime(now));
      setTimeout(scrollToBottom, 0);
    },
    [sendMessage, chatRoomId, scrollToBottom],
  );

  const handlePerspectiveToggle = useCallback(() => {
    switchPerspective(chatRoomId);
  }, [switchPerspective, chatRoomId]);

  return (
    <div className="flex h-full flex-col">
      <Header
        leftIcon={<BackIcon />}
        text={headerTitle}
        rightIcon={<CallIcon />}
        onLeftIconClick={() => navigate("/chat")}
        onTextClick={handlePerspectiveToggle}
      />
      <main ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-5 pt-2 pb-5.5">
          {renderable.map(({ showDate, date, messages: msgItems }, groupIdx) => (
            <React.Fragment key={groupIdx}>
              {showDate && (
                <div className="flex justify-center">
                  <MessageDate date={date} />
                </div>
              )}
              <div className="flex flex-col gap-1">
                {msgItems.map(({ msg, msgIdx, idx }) => {
                  const displayType = msg.type === perspective ? "my" : "friend";
                  const isFriend = displayType === "friend";
                  return (
                    <Message
                      key={msgIdx}
                      type={displayType}
                      name={isFriend ? (friendDisplayUser?.name ?? "") : ""}
                      profileColor={isFriend ? (friendDisplayUser?.profileColor ?? "") : ""}
                      message={msg.message}
                      time={msg.time}
                      isRead={msg.isRead}
                      isFirst={msgIdx === 0}
                      isFirstInTimeGroup={pointedCornerSet.has(idx)}
                      showReadStatus={showReadStatusSet.has(idx)}
                    />
                  );
                })}
              </div>
            </React.Fragment>
          ))}
        </div>
      </main>
      <div className="mb-10.5">
        <TextField onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatRoomPage;
