export interface Room {
  id: string;
  participants: string[];
  lastMessage?: string;
  updatedAt?: string;
  isPinned: boolean;
}
