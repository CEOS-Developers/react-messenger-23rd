import PageFrame from '@/components/layout/PageFrame'

type ChatRoomPageProps = {
  chatName: string
  onBack: () => void
}

function ChatRoomPage({ chatName, onBack }: ChatRoomPageProps) {
  return (
    <PageFrame>
      <div className="flex h-full flex-col bg-white">
        <div className="flex items-center px-[20px] py-[16px]">
          <button type="button" onClick={onBack} className="text-[16px]">
            ←
          </button>
          <span className="ml-[8px] text-[16px] font-semibold">
            {chatName}
          </span>
        </div>
        <div className="flex-1 bg-white" />
      </div>
    </PageFrame>
  )
}

export default ChatRoomPage
