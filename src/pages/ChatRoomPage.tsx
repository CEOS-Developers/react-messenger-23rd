import ChatRoomHeader from '@/components/layout/ChatRoomHeader'
import PageFrame from '@/components/layout/PageFrame'

type ChatRoomPageProps = {
  chatName: string
  memberCount?: number
  onBack: () => void
}

function ChatRoomPage({ chatName, memberCount, onBack }: ChatRoomPageProps) {
  return (
    <PageFrame>
      <div className="flex h-full flex-col bg-white">
        <div className="h-[48px] shrink-0" />
        <ChatRoomHeader title={chatName} memberCount={memberCount} onBack={onBack} />
        <div className="flex-1 bg-white" />
      </div>
    </PageFrame>
  )
}

export default ChatRoomPage
