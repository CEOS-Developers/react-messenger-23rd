import ChatListItem from '@/components/chatList/ChatListItem'
import ChatListHeader from '@/components/layout/ChatListHeader'
import NavigationBar from '@/components/layout/NavigationBar'
import PageFrame from '@/components/layout/PageFrame'
import chatRoomsData from '@/data/chatRooms.json'
import messagesData from '@/data/messages.json'
import usersData from '@/data/users.json'
import type { Message } from '@/types/message'
import type { NavigationKey } from '@/types/navigation'
import { formatChatListTime } from '@/utils/formatChatTime'

type ChatListPageProps = {
  activeTab?: NavigationKey
  onTabChange: (tab: NavigationKey) => void
  onChatSelect: (chatId: string, name: string, memberCount?: number) => void
}

function ChatListPage({ activeTab, onTabChange, onChatSelect }: ChatListPageProps) {
  const userMap = Object.fromEntries(usersData.map((u) => [u.id, u]))

  const getMessages = (roomId: string): Message[] => {
    const stored = localStorage.getItem(`messages-${roomId}`)
    if (stored) return JSON.parse(stored)
    return messagesData.filter((m) => m.chatRoomId === roomId)
  }

  const chatListItems = chatRoomsData.map((room) => {
    const roomMessages = getMessages(room.id)
    const lastMessage = roomMessages[roomMessages.length - 1]
    const otherMemberId = room.memberIds.find((id) => id !== 'me')
    const otherUser = otherMemberId ? userMap[otherMemberId] : null

    return {
      ...room,
      lastMessage: lastMessage?.text ?? '',
      time: lastMessage ? formatChatListTime(lastMessage.timestamp) : '',
      status: otherUser?.status ?? 'sleeping',
    }
  })

  return (
    <PageFrame>
      <div className="flex h-full flex-col bg-white">
        <div className="h-[48px] shrink-0" />
        <ChatListHeader />

        <div className="flex-1 overflow-y-auto bg-white">
          {chatListItems.map((item, index) => (
            <ChatListItem
              key={item.id}
              name={item.name}
              lastMessage={item.lastMessage}
              time={item.time}
              isPinned={index < 4}
              isGroup={item.isGroup}
              memberCount={item.isGroup ? item.memberIds.length : undefined}
              status={item.status as 'active' | 'away' | 'sleeping'}
              onClick={() =>
                onChatSelect(
                  item.id,
                  item.name,
                  item.isGroup ? item.memberIds.length : undefined,
                )
              }
            />
          ))}
        </div>

        <NavigationBar active={activeTab} onTabChange={onTabChange} />
      </div>
    </PageFrame>
  )
}

export default ChatListPage
