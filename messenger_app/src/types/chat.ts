export interface User {
  id: string;
  name: string;
  profileImage: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}