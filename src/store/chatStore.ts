import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CHAT_ROOM_STORAGE_PREFIX, CHAT_STORE_KEY, CHAT_STORE_VERSION } from "@/constants/chatRoom";
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
      if (key?.startsWith(CHAT_ROOM_STORAGE_PREFIX)) {
        const id = Number(key.slice(CHAT_ROOM_STORAGE_PREFIX.length));
        const raw = localStorage.getItem(key);
        if (raw) chatRooms[id] = JSON.parse(raw) as ChatRoom;
      }
    }
    return Object.keys(chatRooms).length > 0 ? { state: { chatRooms } } : null;
  },
  setItem: (_name, value: StorageValue<PersistedState>) => {
    Object.entries(value.state.chatRooms).forEach(([id, room]) => {
      localStorage.setItem(`${CHAT_ROOM_STORAGE_PREFIX}${id}`, JSON.stringify(room));
    });
  },
  removeItem: () => {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CHAT_ROOM_STORAGE_PREFIX)) keysToRemove.push(key);
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
  },
};

const updateRoom = (
  chatRooms: ChatRoomsMap,
  chatRoomId: number,
  updates: Partial<ChatRoom>,
): { chatRooms: ChatRoomsMap } => ({
  chatRooms: { ...chatRooms, [chatRoomId]: { ...chatRooms[chatRoomId], ...updates } },
});

interface ChatState {
  chatRooms: ChatRoomsMap;
  switchPerspective: (chatRoomId: number) => void;
  markMessagesRead: (chatRoomId: number, type: MessageType) => void;
  sendMessage: (chatRoomId: number, text: string, date: string, time: string) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      chatRooms: initialChatRooms,

      switchPerspective: chatRoomId => {
        set(state => {
          const room = state.chatRooms[chatRoomId];
          if (!room) return state;
          const next = room.perspective === "my" ? "friend" : "my";
          return updateRoom(state.chatRooms, chatRoomId, {
            perspective: next,
            messages: room.messages.map(msg =>
              msg.type === room.perspective ? { ...msg, isRead: true } : msg,
            ),
          });
        });
      },

      markMessagesRead: (chatRoomId, type) => {
        set(state => {
          const room = state.chatRooms[chatRoomId];
          if (!room) return state;
          return updateRoom(state.chatRooms, chatRoomId, {
            messages: room.messages.map(msg =>
              msg.type === type ? { ...msg, isRead: true } : msg,
            ),
          });
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
        };
        set(state =>
          updateRoom(state.chatRooms, chatRoomId, { messages: [...room.messages, newMsg] }),
        );
      },
    }),
    {
      name: CHAT_STORE_KEY,
      storage: chatStorage,
      partialize: state => ({ chatRooms: state.chatRooms }),
      version: CHAT_STORE_VERSION,
    },
  ),
);
