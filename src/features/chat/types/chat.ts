export type User = {
  id: string;
  name: string;
  profileImage: string;
  isMe?: boolean;
};

export type MessageType = "text" | "image";

export type Message = {
  id: string;
  senderId: string;
  type: MessageType;
  text?: string;
  imageUrl?: string;
  createdAt: string;     // 예: "22:59"
  createdDate: string;   // 예: "2026-03-27"
  unreadCount?: number;
};