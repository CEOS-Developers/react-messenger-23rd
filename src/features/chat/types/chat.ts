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
  imageUrls?: string[];
  createdAt: string;
  createdDate: string;
  unreadCount?: number;
};