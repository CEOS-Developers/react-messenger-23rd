import { create } from "zustand";
import { persist } from "zustand/middleware";

import messagesJson from "@/data/messages.json";
import type { ChatRoom, ChatRoomsMap, MessageItem, MessageType } from "@/types/message";

import type { PersistStorage, StorageValue } from "zustand/middleware";

const initialChatRooms: ChatRoomsMap = Object.fromEntries(
  (messagesJson.chatRooms as ChatRoom[]).map(room => [room.chatRoomId, room]),
);

type PersistedState = { chatRooms: ChatRoomsMap };

const chatStorage: PersistStorage<PersistedState> = {
  getItem: (): StorageValue<PersistedState> | null => {
    const chatRooms: ChatRoomsMap = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("chat-room-")) {
        const id = Number(key.replace("chat-room-", ""));
        const raw = localStorage.getItem(key);
        if (raw) chatRooms[id] = JSON.parse(raw) as ChatRoom;
      }
    }
    if (Object.keys(chatRooms).length === 0) return null;
    return { state: { chatRooms } };
  },
  setItem: (_name, value: StorageValue<PersistedState>) => {
    Object.entries(value.state.chatRooms).forEach(([id, room]) => {
      localStorage.setItem(`chat-room-${id}`, JSON.stringify(room));
    });
  },
  removeItem: () => {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("chat-room-")) keysToRemove.push(key);
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  },
};

interface ChatState {
  chatRooms: ChatRoomsMap;
  togglePerspective: (chatRoomId: number) => void;
  markMessagesRead: (chatRoomId: number, type: MessageType) => void;
  sendMessage: (chatRoomId: number, text: string, date: string, time: string) => void;
  getChatRoom: (chatRoomId: number) => ChatRoom | undefined;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chatRooms: initialChatRooms,

      togglePerspective: chatRoomId => {
        set(state => {
          const room = state.chatRooms[chatRoomId];
          if (!room) return state;
          return {
            chatRooms: {
              ...state.chatRooms,
              [chatRoomId]: {
                ...room,
                perspective: room.perspective === "my" ? "friend" : "my",
              },
            },
          };
        });
      },

      markMessagesRead: (chatRoomId, type) => {
        set(state => {
          const room = state.chatRooms[chatRoomId];
          if (!room) return state;
          return {
            chatRooms: {
              ...state.chatRooms,
              [chatRoomId]: {
                ...room,
                messages: room.messages.map(msg =>
                  msg.type === type ? { ...msg, isRead: true } : msg,
                ),
              },
            },
          };
        });
      },

      sendMessage: (chatRoomId, text, date, time) => {
        const room = get().chatRooms[chatRoomId];
        if (!room) return;
        const newMsg: MessageItem = {
          type: room.perspective,
          message: text,
          date,
          time,
          isRead: false,
          showReadStatus: false,
        };
        set(state => ({
          chatRooms: {
            ...state.chatRooms,
            [chatRoomId]: { ...room, messages: [...room.messages, newMsg] },
          },
        }));
      },

      getChatRoom: chatRoomId => {
        return get().chatRooms[chatRoomId];
      },
    }),
    {
      name: "chat-store",
      storage: chatStorage,
      partialize: state => ({ chatRooms: state.chatRooms }),
      version: 1,
    },
  ),
);
