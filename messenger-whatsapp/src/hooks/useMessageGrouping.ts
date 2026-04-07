import type { Message } from "@/store/useChatStore";
import type { Friend } from "@/store/useFriendsStore";
import { isSameDay, getUnreadCount } from "@/utils/chatUtils";
import { formatMinute } from "@/utils/formatTime";

export interface MessageMeta {
  msg: Message;
  isSent: boolean;
  showDate: boolean;
  showTime: boolean;
  senderName: string | undefined;
  unreadCount: number;
}

export function groupMessages(
  messages: Message[],
  currentUserId: number,
  participantIds: number[],
  friends: Friend[],
): MessageMeta[] {
  const isGroup = participantIds.length >= 3;

  return messages.map((msg, index) => {
    const isSent = msg.senderId === currentUserId;
    const prev = messages[index - 1];
    const next = messages[index + 1];

    const showDate = index === 0 || !isSameDay(prev.timestamp, msg.timestamp);

    const showTime =
      !next ||
      (next.senderId === currentUserId) !== isSent ||
      formatMinute(next.timestamp) !== formatMinute(msg.timestamp);

    const isFirstInSequence = !prev || prev.senderId !== msg.senderId;
    const senderName =
      !isSent && isGroup && isFirstInSequence
        ? friends.find((f) => f.id === msg.senderId)?.name
        : undefined;

    return {
      msg,
      isSent,
      showDate,
      showTime,
      senderName,
      unreadCount: getUnreadCount(msg, participantIds),
    };
  });
}
