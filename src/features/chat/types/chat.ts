export type User = {
  id: number;
  name: string;
  profileImage: string;
  isMe: boolean;
};

export type MessageType = "text" | "image";

export type Message = {
  id: number;
  senderId: number;
  type: MessageType;
  text?: string;
  imageUrl?: string;
  imageUrls?: string[];
  createdAt: string;
  createdDate: string;
  unreadCount?: number;
};
