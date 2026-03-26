import { create } from "zustand";
import type { Message, ChatRoom } from "@/types";
import messagesData from "@/data/messages.json";
import chatRoomsData from "@/data/chatRooms.json";

interface ChatState {
  messages: Message[];
  chatRooms: ChatRoom[];
  activeChatRoomId: number | null;
  lastReadMessageId: Record<number, number>;

  setActiveChatRoom: (chatRoomId: number | null) => void;
  markAsRead: (chatRoomId: number) => void;
  sendMessage: (chatRoomId: number, senderId: number, content: string) => void;
  addReaction: (messageId: number, emoji: string) => void;

  getMessagesByChatRoomId: (chatRoomId: number) => Message[];
  getLastMessage: (chatRoomId: number) => Message | undefined;
  getUnreadCount: (chatRoomId: number, currentUserId: number) => number;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: messagesData,
  chatRooms: chatRoomsData,
  activeChatRoomId: null,
  lastReadMessageId: {},

  setActiveChatRoom: (chatRoomId) => {
    set({ activeChatRoomId: chatRoomId });
    if (chatRoomId !== null) {
      get().markAsRead(chatRoomId);
    }
  },

  markAsRead: (chatRoomId) => {
    const messages = get().messages.filter((m) => m.chatRoomId === chatRoomId);
    const lastMsg = messages.at(-1);
    if (lastMsg) {
      set((state) => ({
        lastReadMessageId: {
          ...state.lastReadMessageId,
          [chatRoomId]: lastMsg.id,
        },
      }));
    }
  },

  sendMessage: (chatRoomId, senderId, content) =>
    set((state) => {
      const newId = Math.max(0, ...state.messages.map((m) => m.id)) + 1;
      return {
        messages: [
          ...state.messages,
          {
            id: newId,
            chatRoomId,
            senderId,
            content,
            timestamp: new Date().toISOString(),
            reactions: [],
          },
        ],
        lastReadMessageId: {
          ...state.lastReadMessageId,
          [chatRoomId]: newId,
        },
      };
    }),

  addReaction: (messageId, emoji) =>
    set((state) => ({
      messages: state.messages.map((m) => {
        if (m.id !== messageId) return m;
        return m.reactions.includes(emoji)
          ? { ...m, reactions: [] }
          : { ...m, reactions: [emoji] };
      }),
    })),

  getMessagesByChatRoomId: (chatRoomId) =>
    get().messages.filter((m) => m.chatRoomId === chatRoomId),

  getLastMessage: (chatRoomId) =>
    get().messages.findLast((m) => m.chatRoomId === chatRoomId),

  getUnreadCount: (chatRoomId, currentUserId) => {
    const lastReadId = get().lastReadMessageId[chatRoomId] ?? 0;
    return get().messages.filter(
      (m) =>
        m.chatRoomId === chatRoomId &&
        m.senderId !== currentUserId &&
        m.id > lastReadId
    ).length;
  },
}));
