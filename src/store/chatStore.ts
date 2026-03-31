import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CHAT_ROOM_STORAGE_PREFIX, CHAT_STORE_KEY, CHAT_STORE_VERSION } from "@/constants/chatRoom";
import messagesJson from "@/data/messages.json";
import type { ChatRoom, ChatRoomsMap, MessageItem } from "@/types/message";

import type { PersistStorage, StorageValue } from "zustand/middleware";

const initialChatRooms: ChatRoomsMap = Object.fromEntries(
  (messagesJson.chatRooms as ChatRoom[]).map(room => [room.chatRoomId, room]),
);

type PersistedState = { chatRooms: ChatRoomsMap };

const VERSION_KEY = `${CHAT_STORE_KEY}-version`;

const chatStorage: PersistStorage<PersistedState> = {
  getItem: (): StorageValue<PersistedState> | null => {
    if (Number(localStorage.getItem(VERSION_KEY)) !== CHAT_STORE_VERSION) return null;

    const chatRooms: ChatRoomsMap = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(CHAT_ROOM_STORAGE_PREFIX)) {
        const id = Number(key.slice(CHAT_ROOM_STORAGE_PREFIX.length));
        if (!Number.isInteger(id) || id < 1) continue;
        const raw = localStorage.getItem(key);
        if (raw) chatRooms[id] = JSON.parse(raw) as ChatRoom;
      }
    }
    return Object.keys(chatRooms).length > 0 ? { state: { chatRooms } } : null;
  },
  setItem: (_name, value: StorageValue<PersistedState>) => {
    localStorage.setItem(VERSION_KEY, String(CHAT_STORE_VERSION));
    Object.entries(value.state.chatRooms).forEach(([id, room]) => {
      localStorage.setItem(`${CHAT_ROOM_STORAGE_PREFIX}${id}`, JSON.stringify(room));
    });
  },
  removeItem: () => {
    localStorage.removeItem(VERSION_KEY);
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
  markMessagesRead: (chatRoomId: number, perspective: number) => void;
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
          const participants = [room.myUserId, ...room.friendUserIds];
          const nextPerspective =
            participants[(participants.indexOf(room.perspective) + 1) % participants.length];
          return updateRoom(state.chatRooms, chatRoomId, {
            perspective: nextPerspective,
            messages: room.messages.map(msg =>
              msg.userId !== nextPerspective ? { ...msg, isRead: true } : msg,
            ),
          });
        });
      },

      markMessagesRead: (chatRoomId, perspective) => {
        set(state => {
          const room = state.chatRooms[chatRoomId];
          if (!room) return state;
          return updateRoom(state.chatRooms, chatRoomId, {
            messages: room.messages.map(msg =>
              msg.userId !== perspective ? { ...msg, isRead: true } : msg,
            ),
          });
        });
      },

      sendMessage: (chatRoomId, text, date, time) => {
        const room = get().chatRooms[chatRoomId];
        if (!room) return;
        const newMsg: MessageItem = {
          type: room.perspective === room.myUserId ? "my" : "friend",
          userId: room.perspective,
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
