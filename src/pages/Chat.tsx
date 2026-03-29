import { useEffect, useRef } from 'react'
import { useChat } from '@/hooks/useChat'
import ChatMessage from '@Chat/ChatMessage'
import ChatInput from '@Chat/ChatInput'
import ChatHeader from '@/Chat/ChatHeader'

export default function Chat() {
  const { chatList, sendMessage } = useChat()
  const scrollRef = useRef<HTMLDivElement>(null)

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }
    return new Date(dateString).toLocaleDateString('ko-KR', options)
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chatList])

  return (
    <div className="flex flex-col flex-1 overflow-hidden w-full">
      <ChatHeader title="Data Visulization" />

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar px-3 space-y-2"
      >
        {chatList.map((chat, index) => {
          const next = chatList[index + 1]
          const prev = chatList[index - 1]

          const isNewDay = !prev || prev.date !== chat.date

          return (
            <div
              key={chat.id}
              className="flex flex-col"
            >
              {isNewDay && (
                <div className="flex justify-center my-5">
                  <div className="bg-[var(--gray-60)] text-[var(--gray-5)] text-[11px] px-4 py-1 rounded-full">
                    {formatDate(chat.date)}
                  </div>
                </div>
              )}

              <div className="mb-2">
                <ChatMessage
                  message={chat}
                  showTime={
                    !next ||
                    next.sender !== chat.sender ||
                    next.time !== chat.time
                  }
                  showTail={
                    !prev ||
                    prev.sender !== chat.sender ||
                    prev.time !== chat.time
                  }
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* 입력 */}
      <ChatInput onSend={sendMessage} />
    </div>
  )
}
