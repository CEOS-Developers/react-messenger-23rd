import { useEffect, useState } from 'react'
import type { Message } from '@/types/chat'

export function useChat(chatroomId: number) {
  const [chatList, setChatList] = useState<Message[]>([])
  const [chatroomName, setChatroomName] = useState('')
  const [memberCount, setMemberCount] = useState(0)

  const storageKey = `chatList_${chatroomId}`

  useEffect(() => {
    fetch('/data/chatroom.json')
      .then((res) => res.json())
      .then((data) => {
        const room = data.chatrooms.find((c: { id: number }) => c.id === chatroomId)
        if (!room) return

        setChatroomName(room.name)
        setMemberCount(room.memberCount)

        const saved = localStorage.getItem(storageKey)
        if (saved) {
          const parsed = JSON.parse(saved)
          setChatList(parsed.length ? parsed : room.messages)
        } else {
          setChatList(room.messages)
        }
      })
  }, [chatroomId])

  useEffect(() => {
    if (chatList.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(chatList))
    }
  }, [chatList])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const now = new Date()
    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      sender: 'me',
      senderName: '나',
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      unreadCount: 1,
    }

    setChatList((prev) => [...prev, newMessage])
  }

  return { chatList, chatroomName, memberCount, sendMessage }
}
