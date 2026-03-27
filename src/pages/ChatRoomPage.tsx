import { useState } from 'react'

import MessageInput from '@/components/chatRoom/MessageInput'
import ChatRoomHeader from '@/components/layout/ChatRoomHeader'
import HomeIndicator from '@/components/common/HomeIndicator'
import PageFrame from '@/components/layout/PageFrame'

type ChatRoomPageProps = {
  chatName: string
  memberCount?: number
  onBack: () => void
}

function ChatRoomPage({ chatName, memberCount, onBack }: ChatRoomPageProps) {
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    if (inputValue.trim()) {
      setInputValue('')
    }
  }

  return (
    <PageFrame>
      <div className="flex h-full flex-col bg-white">
        <div className="h-[48px] shrink-0" />
        <ChatRoomHeader title={chatName} memberCount={memberCount} onBack={onBack} />
        <div className="flex-1 bg-white" />
        <MessageInput value={inputValue} onChange={setInputValue} onSend={handleSend} />
        <div className="flex h-[34px] items-center justify-center">
          <HomeIndicator />
        </div>
      </div>
    </PageFrame>
  )
}

export default ChatRoomPage
