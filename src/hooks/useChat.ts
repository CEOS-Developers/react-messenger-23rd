import { useEffect, useState } from 'react'
import type { Message } from '@/types/chat'

//채팅 리스트, 메시지
export function useChat() {
  const [chatList, setChatList] = useState<Message[]>([])
  const dummyData: Message[] = [
    {
      id: '1',
      text: '강의실 변경 확인해주세요.',
      sender: 'other',
      time: '15:14',
      date: '2026-03-09',
      unreadCount: 0,
    },
    {
      id: '2',
      text: '확인하였습니다.',
      sender: 'me',
      time: '15:14',
      date: '2026-03-09',
      unreadCount: 0,
    },
    {
      id: '3',
      text: '채팅방에 한하여 전체 프레임 좌우 마진을 12로 설정합니다.',
      sender: 'me',
      time: '15:15',
      date: '2026-03-09',
      unreadCount: 0,
    },
  ]

  useEffect(() => {
    const saved = localStorage.getItem('chatList')
    if (!saved) {
      setChatList(dummyData)
      return
    }

    const parsed = JSON.parse(saved)
    setChatList(parsed.length ? parsed : dummyData)
  }, [])

  useEffect(() => {
    localStorage.setItem('chatList', JSON.stringify(chatList))
  }, [chatList])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const now = new Date()

    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      sender: 'me',
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

  return { chatList, sendMessage }
}
