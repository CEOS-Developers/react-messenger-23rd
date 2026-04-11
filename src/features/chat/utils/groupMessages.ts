import type { Message } from "@/features/chat/types/chat";

type BubbleMessage = Message & {
  type: "text" | "image";
};

export type GroupedMessage = BubbleMessage & {
  showTime: boolean;
};

export type MessageGroup = {
  kind: "message";
  senderId: number;
  createdDate: string;
  messages: GroupedMessage[];
};

export type SystemMessageGroup = {
  kind: "system";
  createdDate: string;
  message: Message;
};

export type MessageListGroup = MessageGroup | SystemMessageGroup;

const getMinuteKey = (time: string) => time.slice(0, 5);

function isBubbleMessage(message: Message): message is BubbleMessage {
  return message.type === "text" || message.type === "image";
}

export function groupMessages(messages: Message[]): MessageListGroup[] {
  const groups: MessageListGroup[] = [];

  for (const message of messages) {
    if (!isBubbleMessage(message)) {
      groups.push({
        kind: "system",
        createdDate: message.createdDate,
        message,
      });
      continue;
    }

    const lastGroup = groups[groups.length - 1];

    const shouldStartNewGroup =
      !lastGroup ||
      lastGroup.kind !== "message" ||
      lastGroup.senderId !== message.senderId ||
      lastGroup.createdDate !== message.createdDate;

    if (shouldStartNewGroup) {
      groups.push({
        kind: "message",
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
