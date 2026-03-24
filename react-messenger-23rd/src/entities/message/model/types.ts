// 메시지 데이터의 타입을 정의.
export interface Message {
  id: string;
  sender: 'me' | 'other';
  messages: string;
  time: string;
}
