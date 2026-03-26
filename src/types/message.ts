export type MessageType = "my" | "friend";

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
  myName: string;
  friendName: string;
  perspective: MessageType;
  messages: MessageItem[];
}

export type ChatRoomsMap = Record<number, ChatRoom>;
