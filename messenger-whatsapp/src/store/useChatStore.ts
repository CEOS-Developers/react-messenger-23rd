import { create } from "zustand";
import { persist } from "zustand/middleware";
import mockData from "@/data/mockData.json";
import { MY_ID } from "@/constants/userId";

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
  currentUserId: number;
  messages: Message[];
  favorites: number[];
  sendMessage: (text: string, chatRoomId: number) => void;
  markAsRead: (chatRoomId: number) => void;
  swapPerspective: (chatRoomId: number) => void;
  resetPerspective: () => void;
  toggleFavorite: (chatRoomId: number) => void;
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      chatRooms: mockData.chatRooms,
      currentUserId: mockData.currentUserId,
      messages: mockData.messages,
      favorites: [],

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

      markAsRead: (chatRoomId) =>
        set((state) => ({
          messages: state.messages.map((m) =>
            m.chatRoomId === chatRoomId && !m.readBy.includes(MY_ID)
              ? { ...m, readBy: [...m.readBy, MY_ID] }
              : m,
          ),
        })),

      resetPerspective: () => {
        set({ currentUserId: MY_ID });
      },

      toggleFavorite: (chatRoomId) =>
        set((state) => ({
          favorites: state.favorites.includes(chatRoomId)
            ? state.favorites.filter((id) => id !== chatRoomId)
            : [...state.favorites, chatRoomId],
        })),

      swapPerspective: (chatRoomId: number) => {
        set((state) => {
          const { chatRooms, currentUserId, messages } = state;

          // 1. 현재 채팅방 정보를 가져와서 다음 사용자(nextId) 결정
          const room = chatRooms.find((r) => r.id === chatRoomId);
          if (!room) return state;

          const ids = room.participantIds;
          const nextId = ids[(ids.indexOf(currentUserId) + 1) % ids.length];

          // 2. 모든 메시지를 순회하며 readBy에 nextId가 없으면 추가
          const updatedMessages = messages.map((m) =>
            m.chatRoomId === chatRoomId && !m.readBy.includes(nextId)
              ? { ...m, readBy: [...m.readBy, nextId] }
              : m,
          );

          // 3. 상태 업데이트
          return {
            ...state,
            currentUserId: nextId,
            messages: updatedMessages,
          };
        });
      },
    }),
    { name: "chat-store", version: 9 },
  ),
);
