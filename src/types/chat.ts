export interface Message {
  id: string
  text: string
  sender: 'me' | 'other'
  time: string
  date: string
  unreadCount: number
}
