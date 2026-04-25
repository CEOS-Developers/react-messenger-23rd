import { useEffect, useState } from 'react'
import ChatListHeader from '@/ChatList/ChatListHeader'
import ChatListFilter, { type Tab } from '@/ChatList/ChatListFilter'
import ChatListProfile from '@/ChatList/ChatListProfile'
import type { Chatroom } from '@/types/chatroom'

function ChatList() {
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([])
  const [currentTab, setCurrentTab] = useState<Tab>('all')

  useEffect(() => {
    fetch('/data/chatroom.json')
      .then((res) => res.json())
      .then((data) => {
        const readRooms: number[] = JSON.parse(localStorage.getItem('readRooms') ?? '[]')
        const rooms = data.chatrooms.map((room: Chatroom) => ({
          ...room,
          unreadCount: readRooms.includes(room.id) ? 0 : room.unreadCount,
        }))
        setChatrooms(rooms)
      })
  }, [])

  const filtered = currentTab === 'favorite'
    ? chatrooms.filter((c) => c.isPinned)
    : currentTab === 'unread'
    ? chatrooms.filter((c) => c.unreadCount > 0)
    : chatrooms

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <ChatListHeader />
      <ChatListFilter currentTab={currentTab} onChangeTab={setCurrentTab} />
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {filtered.map((chatroom) => (
          <ChatListProfile key={chatroom.id} chatroom={chatroom} />
        ))}
      </div>
    </div>
  )
}
export default ChatList
