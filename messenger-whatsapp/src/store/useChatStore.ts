import { create } from "zustand";

export type Message = {
  id: number;
  text: string;
  isSent: boolean;
  timestamp: number;
};

type ChatStore = {
  chatName: string;
  messages: Message[];
  sendMessage: (text: string) => void;
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: "동해물과 백두산이",
    isSent: true,
    timestamp: new Date("2026-03-18T09:30:00").getTime(),
  },
  {
    id: 2,
    text: "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세",
    isSent: false,
    timestamp: new Date("2026-03-18T09:31:00").getTime(),
  },
];

export const useChatStore = create<ChatStore>((set) => ({
  chatName: "세오스",
  messages: initialMessages,
  sendMessage: (text) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: Date.now(),
          text,
          isSent: true,
          timestamp: Date.now(),
        },
      ],
    })),
}));
