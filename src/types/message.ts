export type MessageType = "my" | "friend";

export interface User {
  userId: number;
  name: string;
  profileColor: string;
}

export interface MessageItem {
  type: MessageType;
  message: string;
  date: string;
  time: string;
  isRead: boolean;
  showReadStatus: boolean;
}

export interface ChatRoom {
  chatRoomId: number;
  myUserId: number;
  friendUserId: number;
  perspective: MessageType;
  messages: MessageItem[];
}

export type ChatRoomsMap = Record<number, ChatRoom>;
