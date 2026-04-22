import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/chat";
import type { Room } from "../types/room";
import { formatListTime } from "../utils/formatTime";

export default function ChatListPage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  useEffect(() => {
    const savedRooms = localStorage.getItem("rooms");
    const savedUsers = localStorage.getItem("users");
    const savedMessages = localStorage.getItem("messages");

    if (savedRooms) {
      const parsedRooms: Room[] = JSON.parse(savedRooms);

      // updatedAt으로 내림차순 정렬
      const sortedRooms = parsedRooms.sort((a, b) => {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });

      setRooms(sortedRooms);
    }

    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedMessages) setAllMessages(JSON.parse(savedMessages));
  }, []);

  return (
    <main className="flex flex-col">
      {/* chatListHeader */}
      <header className="p-4 text-center font-bold text-lg">채팅 목록</header>

      {/* 검색창 등 상단 UI 생략 (나중에 추가) */}

      <ul className="flex flex-col">
        {rooms.map((room) => {
          const opponentId = room.participants.find((id) => id !== "user-1"); //user-1 기준 화면으로 가정
          const opponent = users.find((u) => u.id === opponentId);

          //안읽은 메세지 세기
          const unreadCount = allMessages.filter(
            (m) => m.roomId === room.id && m.senderId !== "user-1" && !m.isRead
          ).length;

          return (
            <li
              key={room.id}
              onClick={() => navigate(`/chatroom/${room.id}`)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-900 cursor-pointer"
            >
              {/* 상대방 프로필 이미지 */}
              <div className="relative">
                <img
                  src={opponent?.profileImage || "/default-profile.png"}
                  className="w-12 h-12 rounded-lg object-cover"
                  alt={opponent?.name}
                />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-[#FF5F5F] text-white text-caption-02 w-4 h-4 flex items-center justify-center rounded-full px-1">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </div>
                )}
              </div>

              {/* 채팅방 정보 */}
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-body-02 text-gray10 truncate">
                    {opponent?.name || "알 수 없음"}
                  </span>
                  <span className="text-body-02 text-gray50">
                    {formatListTime(room.updatedAt)}
                  </span>
                </div>
                <p className="text-caption-02 text-gray40 truncate mt-1">
                  {room.lastMessage || "대화 내용이 없습니다."}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
