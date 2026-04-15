export interface Message {
  id: string
  text: string
  sender: 'me' | 'other'
  senderName?: string
  time: string
  date: string
  unreadCount: number
}
