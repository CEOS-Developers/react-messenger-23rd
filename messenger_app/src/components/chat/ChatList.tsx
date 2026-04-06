// src/components/chat/ChatList.tsx
import React from 'react';
// import { useNavigate } from 'react-router-dom'; // 라우터 사용 시 주석 해제
import { useChatStore } from '../../store/useChatStore';
import { useNavigate } from 'react-router-dom';

// 시간에 따라 '오후 9:01', '어제', '월요일', '3월 14일' 등으로 변환해주는 유틸 함수
const formatChatListTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  
  const isToday = date.toDateString() === now.toDateString();
  
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (isToday) {
    return new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  } else if (isYesterday) {
    return '어제';
  } else if (diffDays < 7) {
    return new Intl.DateTimeFormat('ko-KR', { weekday: 'long' }).format(date);
  } else {
    return new Intl.DateTimeFormat('ko-KR', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  }
};

export const ChatList = () => {
  const { chatRooms, currentUser, setCurrentRoom } = useChatStore();
  const navigate = useNavigate();

  const handleRoomClick = (roomId: string) => {
    setCurrentRoom(roomId);
    navigate(`/chat/${roomId}`); // 클릭 시 해당 채팅방 페이지로 이동
  };

  return (
    // NavBar 위로 스크롤되도록 flex-1과 overflow-y-auto 적용, 하단 여백 확보
    <div className="flex-1 w-full overflow-y-auto pb-20">
      {chatRooms.map((room) => {
        // 방의 가장 마지막 메시지를 가져옴
        const lastMessage = room.messages[room.messages.length - 1];
        if (!lastMessage) return null;

        // 상대방 정보 찾기 (나를 제외한 참여자)
        const otherParticipant = room.participants.find(p => p.id !== currentUser.id);

        // 방 이름: title이 있으면 우선 사용, 없으면 상대방 이름
        const roomTitle = room.title || otherParticipant?.name || '알 수 없음';
        // 프로필 사진: 상대방 프사 사용 (그룹일 경우 별도 로직 추가 가능)
        const roomImage = otherParticipant?.profileImage || '/src/assets/default_profile.png';

        return (
          <div
            key={room.id}
            onClick={() => handleRoomClick(room.id)}
            className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 active:bg-gray-100"
          >
            {/* 1. 프로필 이미지 영역 */}
            <img
              src={roomImage}
              alt={roomTitle}
              className="w-12 h-12 rounded-full object-cover shrink-0 bg-gray-200"
            />

            {/* 2. 중앙 텍스트 영역 (이름, 마지막 메시지) */}
            <div className="ml-4 flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex items-center mb-0.5">
                <span className="text-base font-semibold text-gray-900 truncate">
                  {roomTitle}
                </span>
                {/* 그룹 채팅일 경우 참여자 수 표시 (스크린샷 참고) */}
                {room.isGroup && (
                  <span className="ml-1.5 text-sm text-gray-400">
                    {room.participants.length}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 truncate">
                {lastMessage.text}
              </p>
            </div>

            {/* 3. 우측 정보 영역 (시간, 안 읽음 뱃지) */}
            <div className="ml-3 flex flex-col items-end shrink-0 min-w-[50px]">
              <span className="text-xs text-gray-400 mb-1.5">
                {formatChatListTime(lastMessage.timestamp)}
              </span>
              
              {room.unreadCount > 0 && (
                <div className="bg-[#2DCE89] text-white text-[10px] font-bold rounded-full px-1.5 min-w-[20px] h-5 flex items-center justify-center">
                  {/* 안 읽은 메시지가 99개 이상이면 99+로 표시 */}
                  {room.unreadCount > 99 ? '99+' : room.unreadCount}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};