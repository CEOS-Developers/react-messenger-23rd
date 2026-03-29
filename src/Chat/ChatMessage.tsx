import type { Message } from '@/types/chat'
import SendOther from '@Chat/SendOther'
interface Props {
  message: Message
  showTime: boolean
  showTail: boolean
}

function ChatMessage({ message, showTime, showTail }: Props) {
  const isMe = message.sender === 'me'

  if (!isMe) {
    return (
      <SendOther
        name="정다샘"
        message={message.text}
        time={message.time}
        unreadCount={message.unreadCount}
        showTail={showTail}
      />
    )
  }

  return (
    <div className="flex flex-row-reverse items-end gap-1 mb-[2px]">
      {/* 말풍선 */}
      <div
        className={`
          relative max-w-[70%] px-3 py-2 text-[16px] leading-[22px] mx-3
          bg-[var(--blue-20)]
          ${showTail ? 'rounded-2xl rounded-tr-none' : 'rounded-2xl'}
        `}
      >
        {showTail && (
          <div
            className="
              absolute top-0 left-full
              w-0 h-0 border-[6px] border-transparent
              border-t-[var(--blue-20)] border-l-[var(--blue-20)]
            "
          />
        )}

        <div className="break-all">{message.text}</div>
      </div>

      {/* 시간 + unread */}
      {showTime && (
        <div className="flex flex-col text-[10px] mb-[2px] items-end min-w-fit">
          {Number(message.unreadCount) > 0 && (
            <span className="text-[var(--gray-80)] font-bold mb-[1px]">
              {message.unreadCount}
            </span>
          )}
          <span className="text-[var(--gray-70)] leading-none">
            {message.time}
          </span>
        </div>
      )}
    </div>
  )
}

export default ChatMessage
