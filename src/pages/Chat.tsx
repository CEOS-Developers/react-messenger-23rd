import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useChat } from '@/hooks/useChat'
import ChatMessage from '@Chat/ChatMessage'
import ChatInput from '@Chat/ChatInput'
import ChatHeader from '@Chat/ChatHeader'
import CalendarIcon from '@assets/CalendarIcon.svg'

export default function Chat() {
  const { id } = useParams()
  const { chatList, chatroomName, memberCount, sendMessage } = useChat(
    Number(id)
  )
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
    <div className="flex flex-col flex-1 overflow-hidden w-full bg-gray-20">
      <ChatHeader
        title={chatroomName}
        memberCount={memberCount}
      />

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar px-3"
      >
        {chatList.map((chat, index) => {
          const next = chatList[index + 1]
          const prev = chatList[index - 1]

          const isSameGroupWithNext =
            next && next.sender === chat.sender && next.time === chat.time

          const gapClass = isSameGroupWithNext ? 'mb-[4px]' : 'mb-[20px]'

          const isNewDay = !prev || prev.date !== chat.date

          return (
            <div
              key={chat.id}
              className={`flex flex-col ${gapClass}`}
            >
              {isNewDay && (
                <div className="flex flex-row justify-center items-center my-5">
                  <div className="flex flex-row gap-0.5 justify-center items-center bg-gray-60 text-gray-5 text-caption2_r antialiased px-3 py-1  rounded-full">
                    <button>
                      <img
                        src={CalendarIcon}
                        alt="달력"
                      />
                    </button>
                    {formatDate(chat.date)}
                  </div>
                </div>
              )}

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
          )
        })}
      </div>

      <ChatInput onSend={sendMessage} />
    </div>
  )
}
