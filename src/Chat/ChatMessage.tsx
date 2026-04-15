import type { Message } from '@/types/chat'
import SendOther from '@Chat/SendOther'
import SendMe from '@Chat/SendMe'

interface Props {
  message: Message
  showTime: boolean
  showTail: boolean
}

function ChatMessage({ message, showTail, showTime }: Props) {
  const isMe = message.sender === 'me'

  if (isMe) {
    return (
      <div className="flex flex-row-reverse items-end gap-1">
        <SendMe
          message={message.text}
          time={message.time}
          unreadCount={message.unreadCount}
          showTail={showTail}
          showTime={showTime}
        />
      </div>
    )
  }

  return (
    <SendOther
      name={message.senderName ?? ''}
      message={message.text}
      time={message.time}
      unreadCount={message.unreadCount}
      showTail={showTail}
      showTime={showTime}
    />
  )
}

export default ChatMessage
