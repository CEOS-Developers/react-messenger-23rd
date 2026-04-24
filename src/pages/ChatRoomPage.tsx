import { useCallback, useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BackIcon from "@/assets/icons/icon_arrow_left_regular.svg?react";
import CallIcon from "@/assets/icons/icon_call_fill.svg?react";
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
  const markMessagesRead = useChatStore(state => state.markMessagesRead);
  const sendMessage = useChatStore(state => state.sendMessage);
  const sendImage = useChatStore(state => state.sendImage);

  const perspective = chatRoom?.perspective ?? chatRoom?.myUserId ?? 0;

  useEffect(() => {
    if (chatRoomId && perspective) {
      markMessagesRead(chatRoomId, perspective);
    }
  }, [chatRoomId, perspective, markMessagesRead]);
  const otherIds = chatRoom
    ? [chatRoom.myUserId, ...chatRoom.friendUserIds].filter(id => id !== perspective)
    : [];
  const headerTitle = otherIds
    .map(id => getUserById(id)?.name ?? "")
    .filter(Boolean)
    .join(", ");

  // 메시지 그룹 및 메타데이터를 단일 메모이제이션으로 계산
  const { dateGrouped, pointedCornerSet, showReadStatusSet } = useMemo(() => {
    const messages = chatRoom ? chatRoom.messages : [];
    const groups = groupMessages(messages);
    const { pointedCornerSet, showReadStatusSet } = computeMessageMeta(messages);

    let flatIdx = 0;
    const dateGrouped: {
      date: string;
      groups: { msg: (typeof messages)[0]; msgIdx: number; idx: number }[][];
    }[] = [];
    groups.forEach((group, groupIdx) => {
      const isNewDate = groupIdx === 0 || groups[groupIdx - 1][0].date !== group[0].date;
      const msgItems = group.map((msg, msgIdx) => ({ msg, msgIdx, idx: flatIdx++ }));
      if (isNewDate) {
        dateGrouped.push({ date: group[0].date, groups: [msgItems] });
      } else {
        dateGrouped[dateGrouped.length - 1].groups.push(msgItems);
      }
    });

    return { dateGrouped, pointedCornerSet, showReadStatusSet };
  }, [chatRoom]);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  const handleTextareaHeightChange = useCallback((delta: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop += delta;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatRoomId, perspective, scrollToBottom]);

  const handleSend = useCallback(
    (text: string) => {
      const now = new Date();
      sendMessage(chatRoomId, text, formatISODate(now), formatDisplayTime(now));
      setTimeout(scrollToBottom, 0);
    },
    [sendMessage, chatRoomId, scrollToBottom],
  );

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = e => {
        const imageUrl = e.target?.result as string;
        const now = new Date();
        sendImage(chatRoomId, imageUrl, formatISODate(now), formatDisplayTime(now));
        setTimeout(scrollToBottom, 0);
      };
      reader.readAsDataURL(file);
    },
    [sendImage, chatRoomId, scrollToBottom],
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
          {dateGrouped.map(({ date, groups }, dateIdx) => (
            <div key={dateIdx} className="flex flex-col gap-5">
              <div className="flex justify-center">
                <MessageDate date={date} />
              </div>
              <div className="flex flex-col">
                {groups.map((msgItems, groupIdx) => (
                  <div key={groupIdx} className="flex flex-col">
                    {msgItems.map(({ msg, msgIdx, idx }) => {
                      const isMyMsg = msg.userId === perspective;
                      const displayType = isMyMsg ? "my" : "friend";
                      const isFriend = displayType === "friend";
                      const isNewTimeGroup = pointedCornerSet.has(idx) && msgIdx !== 0;
                      const isMultiFriend = otherIds.length >= 2;
                      let mt: string;
                      if (msgIdx === 0) {
                        if (groupIdx === 0) {
                          mt = "";
                        } else {
                          const prevIsMyMsg = groups[groupIdx - 1][0].msg.userId === perspective;
                          mt = !isMyMsg && !prevIsMyMsg && isMultiFriend ? "mt-3" : "mt-8";
                        }
                      } else {
                        mt = isFriend && isNewTimeGroup ? "mt-3" : "mt-1";
                      }
                      const sender = isFriend ? getUserById(msg.userId) : null;
                      return (
                        <div key={msgIdx} className={mt}>
                          <Message
                            type={displayType}
                            name={sender?.name ?? ""}
                            profileColor={sender?.profileColor ?? ""}
                            message={msg.message}
                            imageUrl={msg.imageUrl}
                            time={msg.time}
                            isRead={msg.isRead}
                            isFirst={msgIdx === 0}
                            isFirstInTimeGroup={pointedCornerSet.has(idx)}
                            showReadStatus={showReadStatusSet.has(idx)}
                          />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <div className="mb-10.5">
        <TextField
          key={perspective}
          onSend={handleSend}
          onFile={handleFile}
          onHeightChange={handleTextareaHeightChange}
        />
      </div>
    </div>
  );
};

export default ChatRoomPage;
