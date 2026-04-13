import ChatRoomListItem from "@/features/chat/components/chat-list/ChatRoomListItem";
import { getChatRoomMessagesStorageKey } from "@/features/chat/constants/chatStorage";
import { formatChatRoomSentAt } from "@/features/chat/utils/formatMessageTime";
import chatRoomsData from "@/features/chat/data/chatRooms.json";
import type { Message } from "@/features/chat/types/chat";

type ChatRoomListProps = {
  onOpenChatRoom?: (roomId: number) => void;
  showUnreadOnly?: boolean;
};

type ChatRoom = {
  id: number;
  name: string;
  participantCount?: number;
  profileImages?: string[];
  lastMessageType?: "text" | "image";
  imageCount?: number;
  previewImageUrl?: string;
  lastMessage: string;
  lastMessageCreatedAt: string;
  lastMessageCreatedDate: string;
  unreadLabel?: string;
  isPinned?: boolean;
  isMuted?: boolean;
};

const chatRooms = chatRoomsData as ChatRoom[];

function isPreviewMessage(message: Message) {
  return message.type === "text" || message.type === "image";
}

function getImageUrls(message: Message) {
  if (message.imageUrls && message.imageUrls.length > 0) return message.imageUrls;
  if (message.imageUrl) return [message.imageUrl];

  return [];
}

function getRoomWithSavedPreview(room: ChatRoom): ChatRoom {
  const storageKey = getChatRoomMessagesStorageKey(room.id);
  if (!storageKey) return room;

  try {
    const savedMessages = localStorage.getItem(storageKey);
    if (!savedMessages) return room;

    const parsed = JSON.parse(savedMessages);
    if (!Array.isArray(parsed)) return room;

    const lastMessage = (parsed as Message[]).findLast(isPreviewMessage);
    if (!lastMessage) return room;

    if (lastMessage.type === "image") {
      const imageUrls = getImageUrls(lastMessage);

      return {
        ...room,
        lastMessageType: "image",
        imageCount: Math.max(imageUrls.length, 1),
        previewImageUrl: imageUrls[0],
        lastMessage: "사진",
        lastMessageCreatedAt: lastMessage.createdAt,
        lastMessageCreatedDate: lastMessage.createdDate,
      };
    }

    return {
      ...room,
      lastMessageType: "text",
      imageCount: undefined,
      previewImageUrl: undefined,
      lastMessage: lastMessage.text ?? "",
      lastMessageCreatedAt: lastMessage.createdAt,
      lastMessageCreatedDate: lastMessage.createdDate,
    };
  } catch (error) {
    console.error("채팅방 미리보기를 불러오지 못했습니다.", error);
    return room;
  }
}

export default function ChatRoomList({
  onOpenChatRoom,
  showUnreadOnly = false,
}: ChatRoomListProps) {
  const rooms = chatRooms
    .map(getRoomWithSavedPreview)
    .filter((room) => !showUnreadOnly || room.unreadLabel !== undefined);

  return (
    <section aria-label="채팅방 목록" className="flex flex-col gap-0 bg-chat-white">
      {rooms.map((room) => {
        const canOpenRoom = !!onOpenChatRoom && (room.id === 1 || room.id === 2);

        return (
          <ChatRoomListItem
            key={room.id}
            name={room.name}
            participantCount={room.participantCount}
            profileImageNames={room.profileImages}
            lastMessageType={room.lastMessageType}
            imageCount={room.imageCount}
            previewImageUrl={room.previewImageUrl}
            lastMessage={room.lastMessage}
            sentAtLabel={formatChatRoomSentAt(
              room.lastMessageCreatedDate,
              room.lastMessageCreatedAt
            )}
            unreadLabel={room.unreadLabel}
            showPinnedIcon={room.isPinned}
            showMutedIcon={room.isMuted}
            disabled={!canOpenRoom}
            resetSwipeKey={showUnreadOnly ? "unread" : "all"}
            onClick={canOpenRoom ? () => onOpenChatRoom?.(room.id) : undefined}
          />
        );
      })}
    </section>
  );
}
