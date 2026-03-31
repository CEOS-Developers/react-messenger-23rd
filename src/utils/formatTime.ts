import type { ChatRoom } from "@/types/message";

export const formatDisplayTime = (date: Date) =>
  date.toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit", hour12: true });

export const getChatTimestamp = (room: ChatRoom) => {
  const lastMsg = room.messages[room.messages.length - 1];
  if (!lastMsg) return 0;
  const [period, time] = lastMsg.time.split(" ");
  const [hoursStr, minutesStr] = time.split(":");
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);
  if (period === "오후" && hours !== 12) hours += 12;
  if (period === "오전" && hours === 12) hours = 0;
  const date = new Date(lastMsg.date);
  date.setHours(hours, minutes, 0, 0);
  return date.getTime();
};
