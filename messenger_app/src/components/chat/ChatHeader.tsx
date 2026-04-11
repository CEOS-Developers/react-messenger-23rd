import arrow_right from '@/icons/icon_arrow_right.svg';
import video from '@/icons/icon_video.svg';
import call from '@/icons/icon_callOff.svg';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '@/store/useChatStore';
import { imageMap } from '@/utils/imageMaps';

export const ChatHeader = () => {
  const navigate = useNavigate();

  // 1. 스토어에서 현재 방 ID, 전체 방 목록, 내 정보를 가져옵니다.
  const { currentRoomId, chatRooms, currentUser } = useChatStore();

  // 2. 현재 열려있는 방 객체를 찾습니다.
  const currentRoom = chatRooms.find((room) => room.id === currentRoomId);

  if (!currentRoom) {
    return <header className="w-full px-4 h-12 flex bg-Ivory shrink-0" />;
  }

  const otherParticipant = currentRoom.participants.find(
    (p) => p.id !== currentUser.id
  );

  const headerTitle =
    currentRoom.title || otherParticipant?.name || '알 수 없음';
  const headerImage =
    (otherParticipant?.profileKey && imageMap[otherParticipant.profileKey]) ||
    imageMap['profile_default'];
  const totalUnreadCount = chatRooms.reduce(
    (acc, room) => acc + room.unreadCount,
    0
  );

  return (
    <div>
      {/* 상단바(헤더) */}
      <header className="w-full px-4 h-12 flex flex-row shrink-0 items-center justify-between bg-Ivory">
        <div
          className="flex h-7 items-center cursor-pointer"
          onClick={() => navigate('/chat')}
        >
          <img src={arrow_right} alt="뒤로가기" />
          <span className="text-body-02">
            {totalUnreadCount > 0 ? totalUnreadCount : ''}
          </span>
        </div>

        <img
          src={headerImage}
          alt={headerTitle}
          className="w-8 h-8 rounded-full object-cover ml-5 mr-2 bg-gray-200 shrink-0"
        />
        <p className="text-body-01 mr-auto truncate">{headerTitle}</p>

        <div className="flex items-center">
          <img
            src={video}
            alt="영상통화"
            className="w-6 h-6 mr-3 cursor-pointer"
          />
          <img src={call} alt="음성통화" className="w-6 h-6 cursor-pointer" />
        </div>
      </header>
    </div>
  );
};
