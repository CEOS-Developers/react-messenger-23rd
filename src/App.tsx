import { useState } from 'react'

import NavigationBar from '@/components/layout/NavigationBar'
import PageFrame from '@/components/layout/PageFrame'
import ChatListPage from '@/pages/ChatListPage'
import ChatRoomPage from '@/pages/ChatRoomPage'

type NavigationKey = 'home' | 'dm' | 'alarm' | 'more'

function App() {
  const [activeTab, setActiveTab] = useState<NavigationKey | undefined>()
  const [selectedChat, setSelectedChat] = useState<{ id: string; name: string; memberCount?: number } | null>(null)

  if (selectedChat) {
    return (
      <ChatRoomPage
        chatRoomId={selectedChat.id}
        chatName={selectedChat.name}
        memberCount={selectedChat.memberCount}
        onBack={() => setSelectedChat(null)}
      />
    )
  }

  if (activeTab === 'dm') {
    return (
      <ChatListPage
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onChatSelect={(id, name, memberCount) => setSelectedChat({ id, name, memberCount })}
      />
    )
  }

  return (
    <PageFrame>
      <div className="flex h-full flex-col bg-white">
        <div className="flex-1 bg-white" />
        <NavigationBar active={activeTab} onTabChange={setActiveTab} />
      </div>
    </PageFrame>
  )
}

export default App
