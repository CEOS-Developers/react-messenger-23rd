import type { Message } from "@/store/useChatStore";
import type { Friend } from "@/store/useFriendsStore";

/** 두 타임스탬프가 같은 날인지 비교 */
export const isSameDay = (a: number, b: number): boolean => {
  const da = new Date(a);
  const db = new Date(b);
  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  );
};

/** 채팅방 표시 이름 (나 제외 참여자 이름을 쉼표로 연결) */
export const getRoomName = (
  friends: Friend[],
  participantIds: number[],
  currentUserId: number,
): string =>
  friends
    .filter((f) => f.id !== currentUserId && participantIds.includes(f.id))
    .map((f) => f.name)
    .join(", ");

/** 메시지를 아직 읽지 않은 참여자 수 (보낸 사람 제외) */
export const getUnreadCount = (
  msg: Message,
  participantIds: number[],
): number =>
  participantIds.filter(
    (id) => id !== msg.senderId && !msg.readBy.includes(id),
  ).length;
