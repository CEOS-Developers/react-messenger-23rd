import { useState } from 'react'

import NavigationBar from '@/components/layout/NavigationBar'
import PageFrame from '@/components/layout/PageFrame'
import ChatListPage from '@/pages/ChatListPage'

type NavigationKey = 'home' | 'dm' | 'alarm' | 'more'

function App() {
  const [activeTab, setActiveTab] = useState<NavigationKey>('home')

  return (
    <PageFrame>
      <div className="flex h-full flex-col bg-white">
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'home' && <div>홈</div>}
          {activeTab === 'dm' && <ChatListPage />}
          {activeTab === 'alarm' && <div>알림</div>}
          {activeTab === 'more' && <div>더 보기</div>}
        </div>
        <NavigationBar active={activeTab} onTabChange={setActiveTab} />
      </div>
    </PageFrame>
  )
}

export default App
