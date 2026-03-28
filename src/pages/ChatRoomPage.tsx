import { useState } from 'react'

import DateDivider from '@/components/chatRoom/DateDivider'
import MessageInput from '@/components/chatRoom/MessageInput'
import MessageLine from '@/components/chatRoom/MessageLine'
import HomeIndicator from '@/components/common/HomeIndicator'
import ChatRoomHeader from '@/components/layout/ChatRoomHeader'
import PageFrame from '@/components/layout/PageFrame'
import { colors } from '@/styles/tokens'
import messagesData from '@/data/messages.json'
import usersData from '@/data/users.json'
import {
  formatDateDivider,
  formatMessageTime,
  isSameDay,
  isSameMinute,
} from '@/utils/formatChatTime'

type ChatRoomPageProps = {
  chatRoomId: string
  chatName: string
  memberCount?: number
  onBack: () => void
}

function ChatRoomPage({ chatRoomId, chatName, memberCount, onBack }: ChatRoomPageProps) {
  const [inputValue, setInputValue] = useState('')

  const messages = messagesData.filter((m) => m.chatRoomId === chatRoomId)
  const userMap = Object.fromEntries(usersData.map((u) => [u.id, u]))

  const handleSend = () => {
    if (inputValue.trim()) {
      setInputValue('')
    }
  }

  const renderMessages = () => {
    const elements: React.ReactNode[] = []

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i]
      const prevMsg = i > 0 ? messages[i - 1] : null

      // 날짜 구분선: 이전 메시지와 날짜가 다르거나 첫 메시지
      if (!prevMsg || !isSameDay(prevMsg.timestamp, msg.timestamp)) {
        elements.push(
          <DateDivider key={`date-${msg.id}`} date={formatDateDivider(msg.timestamp)} />
        )
      }

      const isMe = msg.senderId === 'me'
      const isFirstLine = !prevMsg ||
        prevMsg.senderId !== msg.senderId ||
        !isSameDay(prevMsg.timestamp, msg.timestamp)

      // 시간 표시: 다음 메시지와 같은 발신자+같은 분이면 숨김
      const nextMsg = i < messages.length - 1 ? messages[i + 1] : null
      const showTime = !nextMsg ||
        nextMsg.senderId !== msg.senderId ||
        !isSameMinute(msg.timestamp, nextMsg.timestamp)

      if (isMe) {
        elements.push(
          <MessageLine
            key={msg.id}
            type="me"
            messages={[msg.text]}
            isFirstLine={isFirstLine}
            showTime={showTime}
            time={formatMessageTime(msg.timestamp)}
          />
        )
      } else {
        const senderName = userMap[msg.senderId]?.name ?? '알 수 없음'
        elements.push(
          <MessageLine
            key={msg.id}
            type="recipient"
            senderName={senderName}
            messages={[msg.text]}
            isFirstLine={isFirstLine}
            showTime={showTime}
            time={formatMessageTime(msg.timestamp)}
          />
        )
      }
    }

    return elements
  }

  return (
    <PageFrame>
      <div className="flex h-full flex-col bg-white">
        <div className="h-[48px] shrink-0" />
        <ChatRoomHeader title={chatName} memberCount={memberCount} onBack={onBack} />
        <div className="flex-1 overflow-y-auto" style={{ background: colors.grey200 }}>
          <div className="flex flex-col gap-[6px] pb-[8px]">
            {renderMessages()}
          </div>
        </div>
        <MessageInput value={inputValue} onChange={setInputValue} onSend={handleSend} />
        <div className="flex h-[34px] items-center justify-center">
          <HomeIndicator />
        </div>
      </div>
    </PageFrame>
  )
}

export default ChatRoomPage
