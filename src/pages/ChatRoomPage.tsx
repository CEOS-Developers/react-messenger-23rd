import { useEffect, useRef, useState } from 'react'

import DateDivider from '@/components/chatRoom/DateDivider'
import MessageInput from '@/components/chatRoom/MessageInput'
import MessageLine from '@/components/chatRoom/MessageLine'
import HomeIndicator from '@/components/common/HomeIndicator'
import ChatRoomHeader from '@/components/layout/ChatRoomHeader'
import PageFrame from '@/components/layout/PageFrame'
import { colors } from '@/styles/tokens'
import chatRoomsData from '@/data/chatRooms.json'
import messagesData from '@/data/messages.json'
import usersData from '@/data/users.json'
import type { Message } from '@/types/message'
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
  const [messages, setMessages] = useState<Message[]>(() =>
    messagesData.filter((m) => m.chatRoomId === chatRoomId)
  )
  const [currentUserId, setCurrentUserId] = useState('me')
  const scrollRef = useRef<HTMLDivElement>(null)
  const userMap = Object.fromEntries(usersData.map((u) => [u.id, u]))
  const chatRoom = chatRoomsData.find((r) => r.id === chatRoomId)
  const otherMemberIds = chatRoom?.memberIds.filter((id) => id !== 'me') ?? []

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSwitchUser = () => {
    const allIds = ['me', ...otherMemberIds]
    const currentIndex = allIds.indexOf(currentUserId)
    const nextIndex = (currentIndex + 1) % allIds.length
    setCurrentUserId(allIds[nextIndex])
  }

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: `m-${Date.now()}`,
      chatRoomId,
      senderId: currentUserId,
      text: inputValue.trim(),
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue('')
  }

  const currentUserName = currentUserId === 'me' ? '나' : userMap[currentUserId]?.name ?? '알 수 없음'

  const renderMessages = () => {
    const elements: React.ReactNode[] = []

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i]
      const prevMsg = i > 0 ? messages[i - 1] : null

      if (!prevMsg || !isSameDay(prevMsg.timestamp, msg.timestamp)) {
        elements.push(
          <DateDivider key={`date-${msg.id}`} date={formatDateDivider(msg.timestamp)} />
        )
      }

      const isMe = msg.senderId === currentUserId
      const isFirstLine = !prevMsg ||
        prevMsg.senderId !== msg.senderId ||
        !isSameDay(prevMsg.timestamp, msg.timestamp)

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
        <ChatRoomHeader
          title={chatName}
          memberCount={memberCount}
          onBack={onBack}
          onSwitchUser={handleSwitchUser}
        />
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto"
          style={{ background: colors.grey200 }}
        >
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
