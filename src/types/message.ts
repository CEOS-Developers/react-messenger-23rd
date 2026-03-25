export type MessageType = "my" | "friend";

export interface MessageItem {
  type: MessageType;
  message: string;
  time: string;
  isRead: boolean;
  showReadStatus: boolean;
}

export interface UserItem {
  name: string;
}
