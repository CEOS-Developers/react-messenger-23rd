import { useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import DateDivider from '@/components/chatRoom/DateDivider'
import MessageInput from '@/components/chatRoom/MessageInput'
import MessageLine from '@/components/chatRoom/MessageLine'
import HomeIndicator from '@/components/common/HomeIndicator'
import ChatRoomHeader from '@/components/layout/ChatRoomHeader'
import PageFrame from '@/components/layout/PageFrame'
import chatRoomsData from '@/data/chatRooms.json'
import messagesData from '@/data/messages.json'
import usersData from '@/data/users.json'
import { colors } from '@/styles/tokens'
import type { Message } from '@/types/message'
import {
  formatDateDivider,
  formatMessageTime,
  isSameDay,
  isSameMinute,
} from '@/utils/formatChatTime'

function ChatRoomPage() {
  const { roomId } = useParams<{ roomId: string }>()
  const navigate = useNavigate()
  const chatRoom = chatRoomsData.find((r) => r.id === roomId)

  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<Message[]>(() => {
    if (!roomId) return []
    const stored = localStorage.getItem(`messages-${roomId}`)
    if (stored) return JSON.parse(stored)
    return messagesData.filter((m) => m.chatRoomId === roomId)
  })
  const [currentUserId, setCurrentUserId] = useState('me')
  const scrollRef = useRef<HTMLDivElement>(null)
  const userMap = Object.fromEntries(usersData.map((u) => [u.id, u]))
  const otherMemberIds = chatRoom?.memberIds.filter((id) => id !== 'me') ?? []

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }

  useEffect(() => {
    if (!roomId) return
    scrollToBottom()
    localStorage.setItem(`messages-${roomId}`, JSON.stringify(messages))
  }, [messages, roomId])

  if (!roomId || !chatRoom) {
    return <Navigate to="/dms" replace />
  }

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
      chatRoomId: roomId,
      senderId: currentUserId,
      text: inputValue.trim(),
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue('')
  }

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
        const sender = userMap[msg.senderId]
        elements.push(
          <MessageLine
            key={msg.id}
            type="recipient"
            senderName={sender?.name ?? '알 수 없음'}
            messages={[msg.text]}
            isFirstLine={isFirstLine}
            showTime={showTime}
            time={formatMessageTime(msg.timestamp)}
            status={sender?.status as 'active' | 'away' | 'sleeping'}
          />
        )
      }
    }

    return elements
  }

  const memberCount = chatRoom.isGroup ? chatRoom.memberIds.length : undefined

  return (
    <PageFrame>
      <div className="flex h-full flex-col bg-white">
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto"
          style={{ background: colors.grey200 }}
        >
          <div className="sticky top-0 z-10">
            <div className="h-[48px] shrink-0 bg-white" />
            <ChatRoomHeader
              title={chatRoom.name}
              memberCount={memberCount}
              onBack={() => navigate('/dms')}
              onSwitchUser={handleSwitchUser}
            />
          </div>
          <div className="flex flex-col gap-[6px] pb-[8px]">
            {renderMessages()}
          </div>
        </div>
        <div style={{ background: colors.grey200 }}>
          <MessageInput value={inputValue} onChange={setInputValue} onSend={handleSend} />
          <div className="flex h-[34px] items-center justify-center">
            <HomeIndicator />
          </div>
        </div>
      </div>
    </PageFrame>
  )
}

export default ChatRoomPage
