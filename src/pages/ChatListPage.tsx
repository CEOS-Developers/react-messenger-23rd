import ChatListHeader from '@/components/layout/ChatListHeader'
import NavigationBar from '@/components/layout/NavigationBar'
import PageFrame from '@/components/layout/PageFrame'

type NavigationKey = 'home' | 'dm' | 'alarm' | 'more'

type ChatListPageProps = {
  activeTab?: NavigationKey
  onTabChange: (tab: NavigationKey) => void
}

function ChatListPage({ activeTab, onTabChange }: ChatListPageProps) {
  return (
    <PageFrame>
      <div className="flex h-full flex-col bg-white">
        <div className="h-[48px] shrink-0" />
        <ChatListHeader />
        <div className="flex-1 bg-white" />
        <NavigationBar active={activeTab} onTabChange={onTabChange} />
      </div>
    </PageFrame>
  )
}

export default ChatListPage