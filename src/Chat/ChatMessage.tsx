import type { Message } from '@/types/chat'

interface Props {
  message: Message
}

//채팅방에 말풍선
function ChatMessage({ message, showTime }: Props & { showTime: boolean }) {
  const isMe = message.sender === 'me'

  return (
    <div
      className={`flex ${isMe ? 'justify-end' : 'justify-start'} items-end gap-1`}
    >
      {/* 시간 (왼쪽 메시지일 경우) */}
      {isMe && showTime && (
        <span className="text-[10px] text-gray-400">{message.time}</span>
      )}

      {/* 말풍선 */}
      <div
        className={`max-w-[70%] px-3 py-2 rounded-2xl ${
          isMe ? 'bg-[var(--blue-20)]' : 'bg-[var(--gray-5)]'
        }`}
      >
        <div className="text-[16px] leading-[22px]">{message.text}</div>
      </div>

      {/* 시간 (내 메시지일 경우 오른쪽) */}
      {!isMe && showTime && (
        <span className="text-[10px] text-gray-400 ml-1 mb-1">
          {message.time}
        </span>
      )}
    </div>
  )
}

export default ChatMessage
