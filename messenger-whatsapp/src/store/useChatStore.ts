import { create } from "zustand";
import { persist } from "zustand/middleware";
import mockData from "@/data/mockData.json";

export type User = {
  id: number;
  name: string;
  profileImage: string;
};

export type ChatRoom = {
  id: number;
  participantIds: number[];
};

export type Message = {
  id: number;
  chatRoomId: number;
  text: string;
  senderId: number;
  timestamp: number;
  readBy: number[];
};

type ChatStore = {
  chatRooms: ChatRoom[];
  users: User[];
  currentUserId: number;
  messages: Message[];
  sendMessage: (text: string, chatRoomId: number) => void;
  swapPerspective: (chatRoomId: number) => void;
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chatRooms: mockData.chatRooms,
      users: mockData.users,
      currentUserId: mockData.currentUserId,
      messages: mockData.messages,
      sendMessage: (text, chatRoomId) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: Date.now(),
              chatRoomId,
              text,
              senderId: state.currentUserId,
              timestamp: Date.now(),
              readBy: [state.currentUserId],
            },
          ],
        })),
      swapPerspective: (chatRoomId: number) => {
        const { users, chatRooms, currentUserId, messages } = get();
        const room = chatRooms.find((r) => r.id === chatRoomId);
        if (!room) return;
        const other = users.find(
          (u) => u.id !== currentUserId && room.participantIds.includes(u.id),
        );
        if (!other) return;
        set({
          currentUserId: other.id,
          messages: messages.map((m) =>
            m.readBy.includes(other.id)
              ? m
              : { ...m, readBy: [...m.readBy, other.id] },
          ),
        });
      },
    }),
    { name: "chat-store", version: 3 },
  ),
);
