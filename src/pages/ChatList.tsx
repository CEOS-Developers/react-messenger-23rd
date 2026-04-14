import { useEffect, useState } from 'react'
import ChatListHeader from '@/ChatList/ChatListHeader'
import ChatListFilter from '@/ChatList/ChatListFilter'
import ChatListProfile from '@/ChatList/ChatListProfile'
import type { Chatroom } from '@/types/chatroom'

function ChatList() {
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([])

  useEffect(() => {
    fetch('/data/chatroom.json')
      .then((res) => res.json())
      .then((data) => setChatrooms(data.chatrooms))
  }, [])

  return (
    <>
      <ChatListHeader />
      <ChatListFilter />
      {chatrooms.map((chatroom) => (
        <ChatListProfile key={chatroom.id} chatroom={chatroom} />
      ))}
    </>
  )
}
export default ChatList
