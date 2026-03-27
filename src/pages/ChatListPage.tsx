import NavigationBar from '@/components/layout/NavigationBar'
import PageFrame from '@/components/layout/PageFrame'

function ChatListPage() {
  return (
    <PageFrame>
      <div className="flex h-full flex-col bg-white">
        <div className="flex-1 bg-white" />
        <NavigationBar />
      </div>
    </PageFrame>
  )
}

export default ChatListPage