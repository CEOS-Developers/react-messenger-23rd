import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useChatStore } from "@/stores/useChatStore";
import { useUserStore } from "@/stores/useUserStore";
import StatusBar from "@/components/StatusBar";
import ChatHeader from "@/components/ChatHeader";
import MessageBubble from "@/components/MessageBubble";
import MessageInput from "@/components/MessageInput";
import DateSeparator from "@/components/DateSeparator";
import { formatDate } from "@/utils/formatDate";

export default function ChatRoomPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const chatRoomId = id ? parseInt(id, 10) : null;

  const {
    chatRooms,
    setActiveChatRoom,
    getMessagesByChatRoomId,
    sendMessage,
    addReaction,
  } = useChatStore();
  const { currentUserId, switchUser, getUserById } = useUserStore();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRoomId !== null) {
      setActiveChatRoom(chatRoomId);
    }
    return () => {
      setActiveChatRoom(null);
    };
  }, [chatRoomId, setActiveChatRoom]);

  const room = chatRooms.find((r) => r.id === chatRoomId);
  const messages = chatRoomId ? getMessagesByChatRoomId(chatRoomId) : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  if (!room || chatRoomId === null) return null;

  const handleSend = (content: string) => {
    sendMessage(chatRoomId, currentUserId, content);
  };

  const handleReaction = (messageId: number) => {
    addReaction(messageId, "❤️");
  };

  return (
    <div className="flex flex-col h-full bg-surface-muted">
      <StatusBar />
      <ChatHeader
        name={room.name}
        onBack={() => navigate("/chat")}
        onProfileClick={() => {
          const otherUserId = room.participantIds.find((id) => id !== currentUserId);
          if (otherUserId !== undefined) switchUser(otherUserId);
        }}
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <div className="flex flex-col gap-3">
          {messages.map((msg, index) => {
            const isMine = msg.senderId === currentUserId;
            const sender = getUserById(msg.senderId);
            const msgDate = formatDate(msg.timestamp);
            const prevMsg = messages[index - 1];
            const nextMsg = messages[index + 1];
            const prevDate = prevMsg ? formatDate(prevMsg.timestamp) : "";
            const showDate = msgDate !== prevDate;

            const showSender =
              !isMine && (!prevMsg || prevMsg.senderId !== msg.senderId || showDate);

            const isLastInGroup =
              !nextMsg ||
              nextMsg.senderId !== msg.senderId ||
              formatDate(nextMsg.timestamp) !== msgDate;

            const isConsecutive =
              !showDate && prevMsg?.senderId === msg.senderId;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isConsecutive ? "-mt-2" : ""}`}
              >
                {showDate && <div className="mb-3"><DateSeparator date={msgDate} /></div>}
                <MessageBubble
                  content={msg.content}
                  timestamp={msg.timestamp}
                  isMine={isMine}
                  senderName={sender?.name}
                  senderImage={sender?.profileImage}
                  showSender={showSender}
                  showTime={isLastInGroup}
                  reactions={msg.reactions}
                  onDoubleClick={() => handleReaction(msg.id)}
                  onReactionClick={() => handleReaction(msg.id)}
                />
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
}
