import { useState } from 'react'

import NavigationBar from '@/components/layout/NavigationBar'
import PageFrame from '@/components/layout/PageFrame'
import ChatListPage from '@/pages/ChatListPage'

type NavigationKey = 'home' | 'dm' | 'alarm' | 'more'

function App() {
  const [activeTab, setActiveTab] = useState<NavigationKey | undefined>()

  if (activeTab === 'dm') {
    return <ChatListPage activeTab={activeTab} onTabChange={setActiveTab} />
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