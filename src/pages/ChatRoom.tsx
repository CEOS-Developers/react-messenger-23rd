import { useEffect, useState, useRef } from "react";
import type { User, Message } from "../types/chat";
import type { Room } from "../types/room";

import { formatChatTime } from "../utils/formatTime";
import { useParams } from "react-router-dom";

import ChatHeader from "../components/ChatRoom/ChatHeader";
import MessageInput from "../components/ChatRoom/MessageInput";
import NoticeBar from "../components/ChatRoom/NoticeBar";
import ReceivedBubble from "../components/ChatRoom/ReceivedBubble";
import SentBubble from "../components/ChatRoom/Sentbubble";
import TimeDivider from "../components/ChatRoom/TimeDivider";

export default function ChatRoomPage() {
  const { id: currentRoomId } = useParams<{ id: string }>();

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("messages");
    return saved ? JSON.parse(saved) : []; //데이터 있으면 문자열을 객체로 변환
  });
  const [users, setUsers] = useState<User[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  const [currentUserId, setCurrentUserId] = useState("user-1"); //화자 기본값 = 이우림

  useEffect(() => {
    const savedMessages = localStorage.getItem("messages");
    const savedUsers = localStorage.getItem("users");
    const savedRooms = localStorage.getItem("rooms");

    if (savedMessages) setMessages(JSON.parse(savedMessages));
    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedRooms) setRooms(JSON.parse(savedRooms));
  }, []);

  const currentRoom = rooms.find((r) => r.id === currentRoomId);

  const defaultOpponentId =
    currentRoom?.participants.find((p) => p !== "user-1") || "user-2";

  //화자 전환 로직
  const opponentId = currentUserId === "user-1" ? defaultOpponentId : "user-1";
  const opponent = users.find((u) => u.id === opponentId);

  const handleToggleUser = () => {
    setCurrentUserId((prev) =>
      prev === "user-1" ? defaultOpponentId : "user-1"
    );
  };

  //현재 방 메세지만 뜨도록
  const roomMessages = messages.filter((msg) => msg.roomId === currentRoomId);

  // 메시지 전송 로직
  const handleSendMessage = (text: string) => {
    const now = new Date().toISOString();

    const newMessage = {
      id: Date.now().toString(),
      text,
      roomId: currentRoomId,
      senderId: currentUserId,
      recieverId: opponentId,
      createdAt: now,
    };

    // 메시지 업데이트
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));

    // 방 업데이트
    const savedRooms = localStorage.getItem("rooms");
    if (savedRooms) {
      const allRooms: Room[] = JSON.parse(savedRooms);

      //현재 방 찾기
      const updatedRooms = allRooms.map((room: Room) => {
        if (room.id === currentRoomId) {
          return { ...room, lastMessage: text, updatedAt: now };
        }
        return room;
      });

      localStorage.setItem("rooms", JSON.stringify(updatedRooms));
      setRooms(updatedRooms);
    }
  };
  //로컬스토리지에는 하나의 데이터만 넣을 수 있어서 최근 메세지를 추가한 새로운 하나의 데이터를 넣어줘야 함

  // 가장 하단 메세지 기준 레퍼런스
  const scrollRef = useRef<HTMLDivElement>(null);

  // 가장 하단으로 이동
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [roomMessages]);

  //채팅방에 들어오면 안읽음->읽음으로 상태 변경
  useEffect(() => {
    if (!currentRoomId) return;

    const hasUnread = messages.some(
      (m) =>
        m.roomId === currentRoomId && m.senderId !== currentUserId && !m.isRead
    );

    if (hasUnread) {
      const updatedMessages = messages.map((m) => {
        if (
          m.roomId === currentRoomId &&
          m.senderId !== currentUserId &&
          !m.isRead
        ) {
          return { ...m, isRead: true };
        }
        return m;
      });

      setMessages(updatedMessages);
      localStorage.setItem("messages", JSON.stringify(updatedMessages));
    }
  }, [currentRoomId, currentUserId, messages]);

  return (
    <main className="flex flex-col h-screen">
      <ChatHeader
        name={opponent?.name || "알 수 없음"}
        onNameClick={handleToggleUser}
      />
      <NoticeBar />

      {/* 메세지 리스트 */}
      <div className="flex flex-col flex-1 overflow-y-auto px-3 pb-5">
        {roomMessages.map((msg, index) => {
          const prevMsg = roomMessages[index - 1];
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
                <TimeDivider time={formatChatTime(msg.createdAt)} />
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
        {/* "가장 하단" 기준 */}
        <div ref={scrollRef} />
      </div>

      <MessageInput onSend={handleSendMessage} />
    </main>
  );
}
