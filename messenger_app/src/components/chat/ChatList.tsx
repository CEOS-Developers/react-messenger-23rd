import { useChatStore } from '@/store/useChatStore';
import { useNavigate } from 'react-router-dom';
import { formatChatListTime } from '@/utils/formatChatListTime';
import { imageMap } from '@/utils/imageMaps';

export const ChatList = () => {
  const { chatRooms, currentUser, setCurrentRoom } = useChatStore();
  const navigate = useNavigate();

  const handleRoomClick = (roomId: string) => {
    setCurrentRoom(roomId);
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="flex-1 w-full overflow-y-auto pb-20">
      {chatRooms.map((room) => {
        const lastMessage = room.messages[room.messages.length - 1];
        if (!lastMessage) return null;
        const otherParticipant = room.participants.find(
          (p) => p.id !== currentUser.id
        );
        const roomTitle = room.title || otherParticipant?.name || '알 수 없음';
        const roomImage =
          (otherParticipant?.profileKey &&
            imageMap[otherParticipant.profileKey]) ||
          imageMap['profile_default'];

        return (
          <div
            key={room.id}
            onClick={() => handleRoomClick(room.id)}
            className="flex h-19 items-center px-4 py-2.5 cursor-pointer hover:bg-gray-50 active:bg-gray-100"
          >
            <img
              src={roomImage}
              alt={roomTitle}
              className="w-14 h-14 rounded-full object-cover shrink-0 bg-gray-200"
            />

            <div className="ml-3 flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex items-center mb-0.5">
                <span className="text-body-01 truncate">{roomTitle}</span>
                {room.isGroup && (
                  <span className="ml-1 text-body-02 text-Gray600">
                    {room.participants.length}
                  </span>
                )}
              </div>
              <p className="text-body-sub text-Gray600 truncate">
                {lastMessage.text}
              </p>
            </div>

            {/* 3. 우측 정보 영역 (시간, 안 읽음 뱃지) */}
            <div className="ml-3 flex flex-col h-10.5 items-end shrink-0 min-w-13.5 gap-1.5">
              <span className="text-caption-12 text-Gray600">
                {formatChatListTime(lastMessage.timestamp)}
              </span>

              {room.unreadCount > 0 && (
                <div className="flex bg-green200 text-caption-01 rounded-[15px] px-1.5 min-w-5 h-5 items-center justify-center">
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
