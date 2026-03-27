import ChatListItem from '@/components/chatList/ChatListItem'

import ChatListHeader from '@/components/layout/ChatListHeader'
import NavigationBar from '@/components/layout/NavigationBar'
import PageFrame from '@/components/layout/PageFrame'

type NavigationKey = 'home' | 'dm' | 'alarm' | 'more'

type ChatListPageProps = {
  activeTab?: NavigationKey
  onTabChange: (tab: NavigationKey) => void
  onChatSelect: (chatId: string, name: string, memberCount?: number) => void
}

function ChatListPage({ activeTab, onTabChange, onChatSelect }: ChatListPageProps) {
  return (
    <PageFrame>
      <div className="flex h-full flex-col bg-white">
        <div className="h-[48px] shrink-0" />
        <ChatListHeader />

        <div className="flex-1 overflow-y-auto bg-white">
          <ChatListItem
            name="최지우"
            lastMessage="Text Text Text Text Text Text T..."
            time="오후 12시 30분"
            isPinned
            status="active"
            onClick={() => onChatSelect('1', '최지우')}
          />
          <ChatListItem
            name="신예은"
            lastMessage="Text Text Text Text Text Text T..."
            time="어제"
            unreadCount={4}
            isPinned
            status="sleeping"
            onClick={() => onChatSelect('2', '신예은')}
          />
          <ChatListItem
            name="단체 그룹 DM"
            lastMessage="Text Text Text Text Text Text T..."
            time="어제"
            unreadCount={99}
            isPinned
            isGroup
            memberCount={4}
            status="sleeping"
            onClick={() => onChatSelect('3', '단체 그룹 DM', 4)}
          />
          <ChatListItem
            name="윤다희"
            lastMessage="Text Text Text Text Text Text T..."
            time="7분 전"
            unreadCount={3}
            isPinned
            status="active"
            onClick={() => onChatSelect('4', '윤다희')}
          />
          <ChatListItem
            name="단체 그룹 DM 2"
            lastMessage="Text Text Text Text Text Text T..."
            time="오후 4시 30분"
            unreadCount={99}
            isPinned
            isGroup
            memberCount={8}
            status="sleeping"
            onClick={() => onChatSelect('5', '단체 그룹 DM 2', 8)}
          />
          <ChatListItem
            name="김지안"
            lastMessage="Text Text Text Text Text Text T..."
            time="오전 11시 43분"
            unreadCount={42}
            isPinned
            status="active"
            onClick={() => onChatSelect('6', '김지안')}
          />
          <ChatListItem
            name="신혜린"
            lastMessage="Text Text Text Text Text Text T..."
            time="3일 전"
            isPinned
            status="sleeping"
            onClick={() => onChatSelect('7', '신혜린')}
          />
          <ChatListItem
            name="오하은"
            lastMessage="Text Text Text Text Text Text T..."
            time="6일 전"
            isPinned
            status="active"
            onClick={() => onChatSelect('8', '오하은')}
          />
          <ChatListItem
            name="오수아"
            lastMessage="Text Text Text Text Text Text T..."
            time="3월 3일"
            isPinned
            status="sleeping"
            onClick={() => onChatSelect('9', '오수아')}
          />
          <ChatListItem
            name="박은지"
            lastMessage="Text Text Text Text Text Text T..."
            time="2025.12.30"
            isPinned
            status="sleeping"
            onClick={() => onChatSelect('10', '박은지')}
          />
        </div>

        <NavigationBar active={activeTab} onTabChange={onTabChange} />
      </div>
    </PageFrame>
  )
}

export default ChatListPage