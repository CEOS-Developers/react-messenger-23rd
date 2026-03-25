import { create } from "zustand";
import { persist } from "zustand/middleware";
import mockData from "../data/mockData.json";

export type User = {
  id: number;
  name: string;
  profileImage: string;
};

export type Message = {
  id: number;
  text: string;
  senderId: number;
  timestamp: number;
};

type ChatStore = {
  users: User[];
  currentUserId: number;
  messages: Message[];
  sendMessage: (text: string) => void;
  swapPerspective: () => void;
};

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      users: mockData.users,
      currentUserId: mockData.currentUserId,
      messages: mockData.messages,
      sendMessage: (text) =>
        set((state) => ({
          messages: [
            ...state.messages,
            {
              id: Date.now(),
              text,
              senderId: state.currentUserId,
              timestamp: Date.now(),
            },
          ],
        })),
      swapPerspective: () => {
        const { users, currentUserId } = get();
        const other = users.find((u) => u.id !== currentUserId);
        if (other) set({ currentUserId: other.id });
      },
    }),
    { name: "chat-store" },
  ),
);
