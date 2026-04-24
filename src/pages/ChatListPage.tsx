import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import AppBarChatList from "../components/chat-list/AppBarChatList";
import PlaceHolder from "../components/chat-list/PlaceHolder";
import CurrentPlace from "../components/chat-list/CurrentPlace";
import NavBarChatList from "../components/chat-list/NavBarChatList";
import AlarmBox from "../components/chat-list/AlarmBox";

import rawChatRooms from "../data/chatRooms.json";
import rawMessages from "../data/messages.json";
import rawUsers from "../data/users.json";

import profileImage from "../assets/chat-page/profile.svg";

type ChatRoom = {
  id: number;
  type: "direct" | "group";
  participantIds: string[];
  title?: string;
  subtitle?: string;
};

type Message = {
  id: number;
  chatRoomId: number;
  text: string;
  senderID: string;
  sentAt: number;
};

type User = {
  id: string;
  name: string;
  profileImage: string;
};

type ChatListItem = {
  id: number;
  title: string;
  previewText: string;
  timeText: string;
  profileImage: string;
};

function formatListTime(sentAt: number | null) {
  if (!sentAt) return "";

  const now = Date.now();
  const diff = now - sentAt;

  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (diff < hour) {
    const minutes = Math.max(1, Math.floor(diff / minute));
    return `${minutes}분`;
  }

  if (diff < day) {
    const hours = Math.max(1, Math.floor(diff / hour));
    return `${hours}시간`;
  }

  return "";
}

function ChatListPage() {
  const navigate = useNavigate();

  const chatRooms = rawChatRooms as ChatRoom[];
  const messages = rawMessages as Message[];
  const users = rawUsers as User[];

  const chatList = useMemo<ChatListItem[]>(() => {
    return chatRooms.map((room) => {
      const roomMessages = messages
        .filter((message) => message.chatRoomId === room.id)
        .sort((a, b) => b.sentAt - a.sentAt);

      const lastMessage = roomMessages[0];

      if (room.type === "group") {
        return {
          id: room.id,
          title: room.title ?? "단체 채팅방",
          previewText: lastMessage?.text ?? "",
          timeText: formatListTime(lastMessage?.sentAt ?? null),
          profileImage: profileImage,
        };
      }

      const otherUserId = room.participantIds.find((id) => id !== "me");
      const otherUser = users.find((user) => user.id === otherUserId);

      return {
        id: room.id,
        title: otherUser?.name ?? "알 수 없음",
        previewText: lastMessage?.text ?? "",
        timeText: formatListTime(lastMessage?.sentAt ?? null),
        profileImage: profileImage,
      };
    });
  }, [chatRooms, messages, users]);

  return (
    <div className="flex h-full w-full flex-col">
      <AppBarChatList />
      <PlaceHolder />
      <CurrentPlace />
      <AlarmBox />

      <main className="flex w-[var(--screen-width)] flex-col items-start gap-[12px] pt-[8px] overflow-y-auto">
        {chatList.map((room) => (
          <button
            key={room.id}
            type="button"
            onClick={() => navigate(`/chat/${room.id}`)}
            className="flex w-full items-center gap-[12px] px-[12px] py-[8px] text-left"
          >
            <img
              src={room.profileImage}
              alt={room.title}
              className="h-[56px] w-[56px]"
            />

            <div className="flex w-[227px] flex-col items-start gap-[2px]">
              <p className="w-[220px] text-[12px] font-normal leading-[140%]">
                {room.title}
              </p>
              <p className="w-[220px] text-[12px] font-normal leading-[140%]">
                {room.previewText}
              </p>
            </div>
          </button>
        ))}
      </main>

      <NavBarChatList />
    </div>
  );
}

export default ChatListPage;
