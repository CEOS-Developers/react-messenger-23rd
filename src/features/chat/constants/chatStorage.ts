export const DIRECT_CHAT_ROOM_MESSAGES_STORAGE_KEY = "chat-room-messages-v2";
export const GROUP_CHAT_ROOM_MESSAGES_STORAGE_KEY = "group-chat-room-messages-v1";

export function getChatRoomMessagesStorageKey(roomId: number) {
  if (roomId === 1) return DIRECT_CHAT_ROOM_MESSAGES_STORAGE_KEY;
  if (roomId === 2) return GROUP_CHAT_ROOM_MESSAGES_STORAGE_KEY;

  return null;
}
