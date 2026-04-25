import { Link } from 'react-router-dom';

import { formatChatRoomListTime } from '@/entities/chat-room/lib/formatChatRoomListTime';
import type { ChatRoom } from '@/entities/chat-room/model/types';
import type { Message } from '@/entities/message/model/types';
import pinIcon from '@/shared/assets/icons/chat-list/pin-01.svg';
import profileIcon from '@/shared/assets/icons/chat-list/user-02.svg';

interface ChatRoomItemProps {
  room: ChatRoom;
  lastMessage?: Message;
  onTogglePin: (roomId: string) => void;
}

const ChatRoomItem = ({ room, lastMessage, onTogglePin }: ChatRoomItemProps) => {
  return (
    <Link to={`/chat/${room.id}`} className="flex items-center gap-3 rounded-lg px-4 py-3">
      {/*프로필영역*/}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-main-light2 px-1 pt-[5.5px] pb-[2.5px]">
        <img src={profileIcon} alt={`${room.name} 프로필`} className="h-9 w-9" />
      </div>
      {/*텍스트영역*/}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {/*위쪽 (이름 + 멤버수)*/}
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 max-h-6 items-center gap-1">
            <p className="truncate Body01SB text-gray-80">{room.name}</p>

            {room.memberCount && <span className="Body03M text-gray-50">{room.memberCount}</span>}

          {/*핀 아이콘*/}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onTogglePin(room.id);
            }}
            className="-ml-1 flex items-center justify-center"
          >
            <img
              src={pinIcon}
              alt={room.isPinned ? '핀 해제' : '핀 고정'}
              className={room.isPinned ? 'opacity-100' : 'opacity-0'}
            />
          </button>
          </div>
          {/*시간*/}
          <span className="shrink-0 py-0.5 Caption02R text-gray-60">{formatChatRoomListTime(lastMessage, room)}</span>
        </div>
        {/*아래쪽 (메시지 + unread)*/}
        <div className="flex items-end justify-between gap-2">
          {/*마지막 메시지*/}
          <p className="max-w-[198px] h-4 Caption01R text-gray-60">{lastMessage?.messages ?? room.lastMessage}</p>
          {/*unread badge(지금은 고정값)*/}
          {room.unreadCount > 0 ? (
            <div className="inline-flex items-center justify-center rounded-[24px] bg-main px-1.5">
              <span className="Caption01M text-white leading-5">{room.unreadCount}</span>
            </div>
          ) : (
            <div className="inline-flex items-center justify-center rounded-[24px] px-1.5 opacity-0">
              <span className="Caption01M text-white leading-5">0</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChatRoomItem;
