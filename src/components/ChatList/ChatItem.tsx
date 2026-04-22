// components/ChatList/ChatItem.tsx
import { useNavigate } from "react-router-dom";
import type { User, Message } from "../../types/chat";
import type { Room } from "../../types/room";
import { formatListTime } from "../../utils/formatTime";
import { BsPinAngleFill } from "react-icons/bs";

interface ChatItemProps {
  room: Room;
  opponent?: User;
  unreadCount: number;
  onContextMenu: (e: React.MouseEvent, roomId: string) => void;
}

export default function ChatItem({
  room,
  opponent,
  unreadCount,
  onContextMenu,
}: ChatItemProps) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/chatroom/${room.id}`)}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu(e, room.id);
      }}
      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
        room.isPinned ? "bg-gray70" : "" // 핀 고정 시 배경색 차이
      }`}
    >
      {/* 프로필 이미지 영역 */}
      <div className="relative">
        <img
          src={opponent?.profileImage || "/default-profile.png"}
          className="w-12 h-12 rounded-lg object-cover"
          alt={opponent?.name}
        />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-[#FF5F5F] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full px-1">
            {unreadCount > 99 ? "99+" : unreadCount}
          </div>
        )}
      </div>

      {/* 채팅방 정보 영역 */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            {/* 상단 고정일 때만 핀 아이콘 표시 */}
            {room.isPinned && (
              <BsPinAngleFill className="text-main2 w-3.5 h-3.5" />
            )}
            <span className="text-body-02 text-gray10 truncate">
              {opponent?.name || "알 수 없음"}
            </span>
          </div>
          <span className="text-caption-02 text-gray50">
            {formatListTime(room.updatedAt)}
          </span>
        </div>
        <p className="text-caption-02 text-gray40 truncate mt-1">
          {room.lastMessage || "대화 내용이 없습니다."}
        </p>
      </div>
    </li>
  );
}
