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
      .then((data) => setChatrooms(data.chatrooms))
  }, [])

  const filtered = activeTab === '즐겨찾기'
    ? chatrooms.filter((c) => c.isPinned)
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
