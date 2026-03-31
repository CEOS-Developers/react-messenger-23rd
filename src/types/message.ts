export type MessageType = "my" | "friend";

export interface User {
  userId: number;
  name: string;
  profileColor: string;
}

export interface MessageItem {
  type: MessageType;
  userId: number;
  message: string;
  date: string;
  time: string;
  isRead: boolean;
}

export interface ChatRoom {
  chatRoomId: number;
  myUserId: number;
  friendUserIds: number[];
  perspective: number;
  messages: MessageItem[];
}

export type ChatRoomsMap = Record<number, ChatRoom>;
