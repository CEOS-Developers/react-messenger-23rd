import { create } from 'zustand';
import type { Message, User } from '../types/chat';
import { persist } from 'zustand/middleware';
import mockData from '../data/mockData.json';

interface ChatStore {
  users: User[];
  currentUser: User;
  messages: Message[];
  sendMessage: (text: string) => void;
  readMessage: () => void;
  switchUser: () => void;
  loadData: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      users: mockData.users,
      currentUser: mockData.users[1],
      messages: mockData.messages,

      sendMessage: (text: string) =>
        set((state) => {
          if (!text.trim()) return state;

          const newMessage: Message = {
            id: crypto.randomUUID(),
            senderId: state.currentUser.id,
            text: text,
            isRead: false,
            timestamp: new Date().toISOString(),
          };

          return { messages: [...state.messages, newMessage] };
        }),

      readMessage: () =>
        set((state) => {
          const updatedMessages = state.messages.map((msg) => {
            if (msg.senderId !== state.currentUser.id && msg.isRead === false) {
              return { ...msg, isRead: true };
            }
            return msg;
          });

          return { messages: updatedMessages };
        }),

      switchUser: () =>
        set((state) => {
          const nextUser =
            state.users.find((u) => u.id !== state.currentUser.id) ||
            state.users[0];
          return { currentUser: nextUser };
        }),

      loadData: () =>
        set({
          users: mockData.users,
          currentUser: mockData.users[1],
          messages: mockData.messages,
        }),
    }),
    {
      name: 'chat-storage',
    }
  )
);
