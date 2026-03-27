import ChatListItem from '@/components/chatList/ChatListItem'

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

        <div className="flex-1 overflow-y-auto bg-white">
          <ChatListItem
            name="최지우"
            lastMessage="마지막 대화 Text Text Text Text Text T..."
            time="오후 12시 30분"
            isPinned
            status="active"
          />
          <ChatListItem
            name="신예은"
            lastMessage="마지막 대화 Text Text Text Text Text T..."
            time="어제"
            unreadCount={4}
            isPinned
            status="sleeping"
          />
          <ChatListItem
            name="단체 그룹 DM"
            lastMessage="마지막 대화 Text Text Text Text Text T..."
            time="어제"
            unreadCount={99}
            isPinned
            isGroup
            memberCount={4}
            status="sleeping"
          />
          <ChatListItem
            name="윤다희"
            lastMessage="마지막 대화 Text Text Text Text Text T..."
            time="7분 전"
            unreadCount={3}
            isPinned
            status="active"
          />
          <ChatListItem
            name="단체 그룹 DM 2"
            lastMessage="마지막 대화 Text Text Text Text Text T..."
            time="오후 4시 30분"
            unreadCount={99}
            isPinned
            isGroup
            memberCount={8}
            status="sleeping"
          />
          <ChatListItem
            name="김지안"
            lastMessage="마지막 대화 Text Text Text Text Text T..."
            time="오전 11시 43분"
            unreadCount={42}
            isPinned
            status="active"
          />
          <ChatListItem
            name="신혜린"
            lastMessage="마지막 대화 Text Text Text Text Text T..."
            time="3일 전"
            isPinned
            status="sleeping"
          />
          <ChatListItem
            name="오하은"
            lastMessage="마지막 대화 Text Text Text Text Text T..."
            time="6일 전"
            isPinned
            status="active"
          />
          <ChatListItem
            name="오수아"
            lastMessage="마지막 대화 Text Text Text Text Text T..."
            time="3월 3일"
            isPinned
            status="sleeping"
          />
          <ChatListItem
            name="박은지"
            lastMessage="마지막 대화 Text Text Text Text Text T..."
            time="2025.12.30"
            isPinned
            status="sleeping"
          />
        </div>

        <NavigationBar active={activeTab} onTabChange={onTabChange} />
      </div>
    </PageFrame>
  )
}

export default ChatListPage