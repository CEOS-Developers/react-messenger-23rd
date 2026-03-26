export interface Message {
  id: number;
  chatRoomId: number;
  senderId: number;
  content: string;
  timestamp: string;
  reactions: string[]; // reactions 는 다른 타입으로 둬도 되겠다 ㅇㅈ?
}
