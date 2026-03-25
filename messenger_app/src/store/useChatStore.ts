import { create } from 'zustand';
import type { Message, User } from '../types/chat';
import { persist } from 'zustand/middleware';

const initialUsers: User[] = [
  { id: 'user_1', name: '김예린', profileImage: '/profile.jpg' },
  { id: 'user_2', name: '나', profileImage: '/my_profile.jpg' },
];

const initialMessages: Message[] = [
  {
    id: 'msg_001',
    senderId: 'user_1',
    text: '안녕하세요!',
    isRead: false,
    timestamp: new Date().toISOString(),
  },
];

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
      users: initialUsers,
      currentUser: initialUsers[1],
      messages: initialMessages,

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
          users: initialUsers,
          currentUser: initialUsers[1],
          messages: initialMessages,
        }),
    }),
    {
      name: 'chat-storage',
    }
  )
);
