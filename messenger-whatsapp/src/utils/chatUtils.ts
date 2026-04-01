import type { User, Message } from "@/store/useChatStore";

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

/** 채팅방에서 나(currentUserId)가 아닌 상대방 유저 찾기 */
export const findPartner = (
  users: User[],
  participantIds: number[],
  currentUserId: number,
): User | undefined =>
  users.find((u) => u.id !== currentUserId && participantIds.includes(u.id));

/** 메시지를 아직 읽지 않은 참여자 수 (보낸 사람 제외) */
export const getUnreadCount = (
  msg: Message,
  participantIds: number[],
): number =>
  participantIds.filter(
    (id) => id !== msg.senderId && !msg.readBy.includes(id),
  ).length;
