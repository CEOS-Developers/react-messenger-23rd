import { useEffect, useState } from "react";
import type { User, Message } from "../types/chat";
import type { Room } from "../types/room";
import ChatItem from "../components/ChatList/ChatItem";

export default function ChatListPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    roomId: string;
  } | null>(null);

  useEffect(() => {
    const savedRooms = localStorage.getItem("rooms");
    const savedUsers = localStorage.getItem("users");
    const savedMessages = localStorage.getItem("messages");

    if (savedRooms) {
      const parsedRooms: Room[] = JSON.parse(savedRooms);

      // updatedAt으로 내림차순 정렬
      const sortedRooms = parsedRooms.sort((a: Room, b: Room) => {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });

      setRooms(sortedRooms);
    }

    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedMessages) setAllMessages(JSON.parse(savedMessages));
  }, []);

  //채팅방 상단 고정하기
  // 1. 우클릭 시 메뉴 띄우기
  const handleContextMenu = (e: React.MouseEvent, roomId: string) => {
    e.preventDefault(); // 브라우저 기본 메뉴 방지
    setContextMenu({ x: e.pageX, y: e.pageY, roomId });
  };

  // 2. 고정 토글 함수
  const togglePin = (roomId: string) => {
    const updatedRooms = rooms.map((room) =>
      room.id === roomId ? { ...room, isPinned: !room.isPinned } : room
    );
    setRooms(updatedRooms);
    localStorage.setItem("rooms", JSON.stringify(updatedRooms));
    setContextMenu(null); // 메뉴 닫기
  };

  // 3. 목록 분리 (고정된 방 vs 일반 방)
  const pinnedRooms = rooms
    .filter((r) => r.isPinned)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  const normalRooms = rooms
    .filter((r) => !r.isPinned)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

  return (
    <main className="flex flex-col">
      {/* chatListHeader */}
      <header className="p-4 text-center font-bold text-lg">채팅 목록</header>

      {/* 검색창 등 상단 UI 생략 (나중에 추가) */}

      {/* 상단고정 채팅방 */}
      {pinnedRooms.length > 0 && (
        <ul className="flex flex-col">
          {pinnedRooms.map((room) => {
            const opponentId = room.participants.find((id) => id !== "user-1");
            const opponent = users.find((u) => u.id === opponentId);
            const unreadCount = allMessages.filter(
              (m) =>
                m.roomId === room.id && m.senderId !== "user-1" && !m.isRead
            ).length;

            return (
              <ChatItem
                key={room.id}
                room={room}
                opponent={opponent}
                unreadCount={unreadCount}
                onContextMenu={handleContextMenu}
              />
            );
          })}
        </ul>
      )}

      {/* 일반 채팅방 */}
      <ul className="flex flex-col">
        {normalRooms.map((room) => {
          const opponentId = room.participants.find((id) => id !== "user-1");
          const opponent = users.find((u) => u.id === opponentId);
          const unreadCount = allMessages.filter(
            (m) => m.roomId === room.id && m.senderId !== "user-1" && !m.isRead
          ).length;

          return (
            <ChatItem
              key={room.id}
              room={room}
              opponent={opponent}
              unreadCount={unreadCount}
              onContextMenu={handleContextMenu}
            />
          );
        })}
      </ul>

      {/* 우클릭(고정설정) 메뉴 */}
      {contextMenu && (
        <div
          className="fixed z-50 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-1 w-40"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm"
            onClick={() => togglePin(contextMenu.roomId)}
          >
            {rooms.find((r) => r.id === contextMenu.roomId)?.isPinned
              ? "상단 고정 해제하기"
              : "상단에 고정하기"}
          </button>
        </div>
      )}
    </main>
  );
}
