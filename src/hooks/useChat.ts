import { useEffect, useState } from 'react'
import type { Message } from '@/types/chat'

//채팅 리스트, 메시지
export function useChat() {
  const [chatList, setChatList] = useState<Message[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('chatList')
    if (saved) {
      setChatList(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('chatList', JSON.stringify(chatList))
  }, [chatList])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      sender: 'me',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
    }

    setChatList((prev) => [...prev, newMessage])
  }

  return { chatList, sendMessage }
}
