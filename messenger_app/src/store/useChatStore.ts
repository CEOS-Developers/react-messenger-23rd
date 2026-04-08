import { create } from 'zustand';
import type { ChatRoom, Message, User } from '../types/chat';
import { persist } from 'zustand/middleware';
import mockData from '../data/mockData.json';

interface ChatStore {
  currentUser: User;
  chatRooms: ChatRoom[];
  currentRoomId: string | null;

  setCurrentRoom: (roomId: string) => void;
  sendMessage: (text: string) => void;
  readMessage: () => void;
  // switchUser: () => void;
  // loadData: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      currentUser: {
        id: 'user_me',
        name: '나',
        profileImage: '../src/assets/profile_me.png',
      },
      chatRooms: mockData.chatRooms,
      currentRoomId: null,

      setCurrentRoom: (roomId) => {
        set({ currentRoomId: roomId });
        if (roomId) get().readMessage();
      },

      sendMessage: (text: string) =>
        set((state) => {
          if (!text.trim() || !state.currentRoomId) return state;

          const newMessage: Message = {
            id: crypto.randomUUID(),
            senderId: state.currentUser.id,
            text,
            isRead: false,
            timestamp: new Date().toISOString(),
          };

          const updatedRooms = state.chatRooms.map((room) =>
            room.id === state.currentRoomId
              ? { ...room, messages: [...room.messages, newMessage] }
              : room
          );

          const roomIndex = updatedRooms.findIndex(
            (r) => r.id === state.currentRoomId
          );
          if (roomIndex > 0) {
            updatedRooms.unshift(updatedRooms.splice(roomIndex, 1)[0]);
          }

          return { chatRooms: updatedRooms };
        }),

      readMessage: () =>
        set((state) => {
          if (!state.currentRoomId) return state;

          const updatedRooms = state.chatRooms.map((room) => {
            if (room.id === state.currentRoomId) {
              return {
                ...room,
                unreadCount: 0,
                messages: room.messages.map((msg) =>
                  msg.senderId !== state.currentUser.id
                    ? { ...msg, isRead: true }
                    : msg
                ),
              };
            }
            return room;
          });

          return { chatRooms: updatedRooms };
        }),

      // switchUser: () =>
      //   set((state) => {
      //     const nextUser =
      //       state.users.find((u) => u.id !== state.currentUser.id) ||
      //       state.users[0];
      //     return { currentUser: nextUser };
      //   }),
    }),
    {
      name: 'chat-storage',
    }
  )
);
