import { useNavigate } from 'react-router-dom'
import ChatroomProfile from '@assets/ChatListProfile.svg'
import Pin from '@assets/Pin.svg'
import type { Chatroom } from '@/types/chatroom'

interface Props {
  chatroom: Chatroom
}

function ChatListProfile({ chatroom }: Props) {
  const navigate = useNavigate()
  const { id, name, memberCount, lastMessageTime, unreadCount, isPinned, messages } = chatroom
  const lastMessage = messages.at(-1)?.text ?? ''

  return (
    <div
      className="flex flex-row justify-between px-4 py-3 border-b border-gray-20 cursor-pointer active:bg-gray-10"
      onClick={() => navigate(`/chat/${id}`)}
    >
      <div className="flex flex-row gap-3 flex-1 min-w-0">
        <img
          src={ChatroomProfile}
          alt="채팅방 프로필"
          className="w-12 h-12 shrink-0"
        />
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex flex-row items-center gap-1">
            <p className="text-body2_sb antialiased truncate">{name}</p>
            <p className="text-body3_r text-gray-60 antialiased shrink-0">
              {memberCount}
            </p>
            {isPinned && (
              <img
                src={Pin}
                alt="핀"
                className="shrink-0"
              />
            )}
          </div>
          <p className="text-body3_r text-gray-60 antialiased line-clamp-2">
            {lastMessage}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between shrink-0 self-stretch pl-2">
        <p className="text-caption1 text-gray-60 antialiased">
          {lastMessageTime}
        </p>
        {unreadCount > 0 && (
          <span className="bg-blue-50 text-white text-caption2_sb rounded-full min-w-5 h-5 flex items-center justify-center px-1.5">
            {unreadCount}
          </span>
        )}
      </div>
    </div>
  )
}

export default ChatListProfile
