export interface User {
  id: string;
  name: string;
  profileImage: string;
}

export interface Message {
  // 현재 내가 보고 있는 id와 senderId가 일치하면 내 시점으로, 그렇지 않으면 상대가 보낸 메시지로 보이게
  id: string;
  senderId: string;
  text: string;
  isRead: boolean;
  timestamp: string;
}
