export interface User {
  id: string;
  name: string;
  profileImage: string;
  statusMessage?: string;
  isMe: boolean;
  isFavorite: boolean;
}

export interface Message {
  id: string;
  roomId: string;
  senderId: string;
  recieverId: string;
  text: string;
  createdAt: string;
  isRead: boolean;
  type?: "system"; //system: 날짜 구분선, 입/퇴장 알림 등
}
