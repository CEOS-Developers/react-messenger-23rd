import type { ChatRoom } from "@/types/message";
import { parseTimeToMinutes } from "@/utils/formatDate";

export const formatDisplayTime = (date: Date) =>
  date.toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit", hour12: true });

export const getChatTimestamp = (room: ChatRoom) => {
  const lastMsg = room.messages.at(-1);
  if (!lastMsg) return 0;
  const totalMinutes = parseTimeToMinutes(lastMsg.time);
  const date = new Date(lastMsg.date);
  date.setHours(Math.floor(totalMinutes / 60), totalMinutes % 60, 0, 0);
  return date.getTime();
};
