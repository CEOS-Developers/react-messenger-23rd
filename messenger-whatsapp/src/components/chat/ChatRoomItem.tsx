import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ChatRoom } from "@/store/useChatStore";
import { useChatStore } from "@/store/useChatStore";
import { useFriendsStore } from "@/store/useFriendsStore";
import { formatLastMessageTime } from "@/utils/formatTime";
import ChatThumbnail from "@/components/chat/ChatThumbnail";
import FavoriateDefault from "@/assets/chat_fav.svg?react";
import FavoriateActive from "@/assets/chat_fav_filled.svg?react";

const ACTION_WIDTH = 51;
const SWIPE_THRESHOLD = 25;

interface ChatRoomItemProps {
  chatRoom: ChatRoom;
  onSwipeOpen?: (id: number) => void;
  openId?: number | null;
}

const ChatRoomItem = ({ chatRoom, onSwipeOpen, openId }: ChatRoomItemProps) => {
  const navigate = useNavigate();
  const { messages, currentUserId, favorites, toggleFavorite } = useChatStore();
  const { friends } = useFriendsStore();

  const participants = friends.filter(
    (f) => f.id !== currentUserId && chatRoom.participantIds.includes(f.id),
  );
  const roomMessages = messages.filter((m) => m.chatRoomId === chatRoom.id);
  const lastMessage = roomMessages[roomMessages.length - 1];
  const roomName = participants.map((f) => f.name).join(", ");
  const unreadCount = roomMessages.filter((m) => !m.readBy.includes(1)).length;
  const isFavorite = favorites.includes(chatRoom.id);

  const [offsetX, setOffsetX] = useState(0);
  const [animating, setAnimating] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const isHorizontal = useRef<boolean | null>(null);
  const baseOffset = useRef(0);
  const dragged = useRef(false); // 클릭과 드래그 구분용
  const offsetRef = useRef(0); // mouseup에서 최신 offsetX 참조용
  offsetRef.current = offsetX;

  // 다른 아이템 열리면 이 아이템 닫기
  useEffect(() => {
    if (openId !== chatRoom.id && offsetRef.current !== 0) {
      setAnimating(true);
      setOffsetX(0);
    }
  }, [openId]);

  // 공통 드래그 시작
  const dragStart = (clientX: number, clientY: number) => {
    startX.current = clientX;
    startY.current = clientY;
    isHorizontal.current = null;
    baseOffset.current = offsetX;
    dragged.current = false;
    setAnimating(false);
  };

  // 공통 드래그 이동
  const dragMove = (clientX: number, clientY: number) => {
    const dx = clientX - startX.current;
    const dy = clientY - startY.current;

    if (isHorizontal.current === null) {
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 5)
        isHorizontal.current = true;
      else if (Math.abs(dy) > 5) isHorizontal.current = false;
    }

    if (isHorizontal.current) {
      dragged.current = true;
      const newX = Math.max(
        -ACTION_WIDTH,
        Math.min(0, baseOffset.current + dx),
      );
      setOffsetX(newX);
    }
  };

  // 공통 드래그 종료
  const dragEnd = (currentOffsetX: number) => {
    if (!isHorizontal.current) return;
    setAnimating(true);
    if (currentOffsetX < -SWIPE_THRESHOLD) {
      setOffsetX(-ACTION_WIDTH);
      onSwipeOpen?.(chatRoom.id);
    } else {
      setOffsetX(0);
    }
  };

  // 터치 핸들러
  const handleTouchStart = (e: React.TouchEvent) =>
    dragStart(e.touches[0].clientX, e.touches[0].clientY);
  const handleTouchMove = (e: React.TouchEvent) =>
    dragMove(e.touches[0].clientX, e.touches[0].clientY);
  const handleTouchEnd = () => dragEnd(offsetRef.current);

  // 마우스 핸들러 (window에 move/up 등록해서 요소 밖에서도 동작)
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStart(e.clientX, e.clientY);

    const onMove = (ev: MouseEvent) => dragMove(ev.clientX, ev.clientY);
    const onUp = () => {
      dragEnd(offsetRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const handleContentClick = () => {
    if (dragged.current) return; // 드래그면 클릭 무시
    if (offsetRef.current !== 0) {
      setAnimating(true);
      setOffsetX(0);
      return;
    }
    navigate(`/chat/${chatRoom.id}`);
  };

  const handleFavoriteClick = () => {
    toggleFavorite(chatRoom.id);
    setAnimating(true);
    setOffsetX(0);
  };

  return (
    <div className="relative overflow-hidden">
      {/* 즐겨찾기 버튼 (스와이프로 노출) */}
      <div className="absolute right-0 top-0 bottom-0 w-[51px] flex items-center justify-center bg-gray-02">
        <button
          onClick={handleFavoriteClick}
          className="flex items-center justify-center w-10 h-10"
        >
          {isFavorite ? (
            <FavoriateActive className="w-6 h-6 " />
          ) : (
            <FavoriateDefault className="w-6 h-6 " />
          )}
        </button>
      </div>

      {/* 슬라이딩 콘텐츠 */}
      <div
        style={{
          transform: `translateX(${offsetX}px)`,
          transition: animating ? "transform 0.2s ease" : "none",
          userSelect: "none",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onClick={handleContentClick}
        className="relative flex items-center gap-3 px-4 py-3 border-b border-gray-02 bg-white cursor-pointer active:bg-gray-01"
      >
        <ChatThumbnail participants={participants} />

        {/* 중앙: 이름 + 마지막 메시지 */}
        <div className="flex-1 min-w-0">
          <span className="block text-body-01 text-gray-06 truncate">
            {roomName}
          </span>
          <p className="text-body-04 text-gray-04 truncate mt-0.5">
            {lastMessage?.text ?? ""}
          </p>
        </div>

        {/* 우측: 날짜(위) + 뱃지(아래) */}
        <div className="flex flex-col items-end justify-between self-stretch shrink-0">
          {lastMessage && (
            <span className="text-caption-2 text-gray-04">
              {formatLastMessageTime(lastMessage.timestamp)}
            </span>
          )}
          {unreadCount > 0 ? (
            <span className="min-w-5 h-5 px-1 rounded-full bg-main-green text-white text-caption-2 flex items-center justify-center">
              {unreadCount}
            </span>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatRoomItem;
