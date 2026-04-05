import { Link } from 'react-router-dom';

import type { ChatRoom } from '@/entities/chat-room/model/types';
import type { Message } from '@/entities/message/model/types';
import profileIcon from '@/shared/assets/icons/chat-list/user-02.svg';

interface ChatRoomItemProps {
  room: ChatRoom;
  lastMessage?: Message;
}

const ChatRoomItem = ({ room, lastMessage }: ChatRoomItemProps) => {
  return (
    <Link to={`/chat/${room.id}`} className="flex items-center gap-3 rounded-lg px-4 py-3">
      {/*프로필영역*/}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-main-light2">
        <img src={profileIcon} alt={`${room.name} 프로필`} className="h-9 w-9 text-main-light" />
      </div>
      {/*텍스트영역*/}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {/*위쪽 (이름 + 시간)*/}
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1">
            <p className="truncate Body01SB">{room.name}</p>

            {room.memberCount && <span className="Body03M">{room.memberCount}</span>}
          </div>
          {/*시간*/}
          <span className="shrink-0 py-0.5 Caption02R text-gray-60">{lastMessage?.time ?? ''}</span>
        </div>
        {/*아래쪽 (메시지 + unread)*/}
        <div className="flex items-end justify-between gap-2">
          {/*마지막 메시지*/}
          <p className="max-w-[198px] truncate Caption01R text-gray-60">{lastMessage?.messages ?? room.lastMessage}</p>
          {/*unread badge(지금은 고정값)*/}
          {room.unreadCount > 0 ? (
            <div className="rounded-3xl bg-main px-1.5">
              <span className="text-center Caption01M text-white">{room.unreadCount}</span>
            </div>
          ) : (
            <div className="px-2 opacity-0">
              <span className="text-xs">0</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ChatRoomItem;
