export interface Message {
  id: number;
  chatRoomId: number;
  senderId: number;
  content: string;
  timestamp: string;
  reactions: string[];
}
