import type { Message } from "../types/chat";

export type GroupedMessage = Message & {
  showTime: boolean;
};

export type MessageGroup = {
  senderId: string;
  createdDate: string;
  messages: GroupedMessage[];
};

const getMinuteKey = (time: string) => time.slice(0, 5);

export function groupMessages(messages: Message[]): MessageGroup[] {
  const groups: MessageGroup[] = [];

  for (const message of messages) {
    const lastGroup = groups[groups.length - 1];

    const shouldStartNewGroup =
      !lastGroup ||
      lastGroup.senderId !== message.senderId ||
      lastGroup.createdDate !== message.createdDate;

    if (shouldStartNewGroup) {
      groups.push({
        senderId: message.senderId,
        createdDate: message.createdDate,
        messages: [{ ...message, showTime: true }],
      });
      continue;
    }

    const prevMessage = lastGroup.messages[lastGroup.messages.length - 1];
    const prevMinute = getMinuteKey(prevMessage.createdAt);
    const currentMinute = getMinuteKey(message.createdAt);

    lastGroup.messages.push({
      ...message,
      showTime: prevMinute !== currentMinute,
    });
  }

  return groups;
}