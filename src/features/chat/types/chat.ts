export type User = {
  id: number;
  name: string;
  profileImage: string;
  isMe: boolean;
};

export type MessageType = "text" | "image" | "system";
export type SystemMessageType = "leave" | "invite";

export type Message = {
  id: number;
  senderId: number;
  type: MessageType;
  text?: string;
  imageUrl?: string;
  imageUrls?: string[];
  systemType?: SystemMessageType;
  actorName?: string;
  invitedNames?: string[];
  createdAt: string;
  createdDate: string;
  unreadCount?: number;
};

export type ChatRoom = {
  id: number;
  name: string;
  participantCount?: number;
  profileImages?: string[];
  lastMessageType?: "text" | "image";
  imageCount?: number;
  previewImageUrl?: string;
  lastMessage: string;
  lastMessageCreatedAt: string;
  lastMessageCreatedDate: string;
  unreadLabel?: string;
  isPinned?: boolean;
  isMuted?: boolean;
};
