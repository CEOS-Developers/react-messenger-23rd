import { useEffect, useState } from 'react'
import ChatListHeader from '@/ChatList/ChatListHeader'
import ChatListFilter, { type Tab } from '@/ChatList/ChatListFilter'
import ChatListProfile from '@/ChatList/ChatListProfile'
import type { Chatroom } from '@/types/chatroom'

function ChatList() {
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([])
  const [activeTab, setActiveTab] = useState<Tab>('모두')

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

  const filtered = activeTab === '즐겨찾기'
    ? chatrooms.filter((c) => c.isPinned)
    : activeTab === '읽지 않음'
    ? chatrooms.filter((c) => c.unreadCount > 0)
    : chatrooms

  return (
    <>
      <ChatListHeader />
      <ChatListFilter activeTab={activeTab} onChangeTab={setActiveTab} />
      {filtered.map((chatroom) => (
        <ChatListProfile key={chatroom.id} chatroom={chatroom} />
      ))}
    </>
  )
}
export default ChatList
