export interface ChatRoom {
    id: string;
    name: string;
    memberCount: number | null;
    lastMessage: string;
    time: string;
    unreadCount: number;
    isPinned: boolean;
}