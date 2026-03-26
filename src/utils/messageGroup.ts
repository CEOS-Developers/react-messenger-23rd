import type { MessageItem } from "@/types/message";

export const groupMessages = (messages: readonly MessageItem[]): MessageItem[][] =>
  messages.reduce<MessageItem[][]>((groups, msg) => {
    const last = groups[groups.length - 1];
    if (last?.[0].type === msg.type) {
      last.push(msg);
    } else {
      groups.push([msg]);
    }
    return groups;
  }, []);

const isSameTimeGroup = (a: MessageItem, b: MessageItem) =>
  a.type === b.type && a.time === b.time && a.date === b.date;

// 메시지 배열을 단일 순회하며 pointCornerSet과 showReadStatusSet을 동시에 계산
export const computeMessageMeta = (messages: readonly MessageItem[]) => {
  const pointedCornerSet = new Set<number>();
  const showReadStatusSet = new Set<number>();

  messages.forEach((msg, idx) => {
    if (!messages[idx - 1] || !isSameTimeGroup(messages[idx - 1], msg)) {
      pointedCornerSet.add(idx);
    }
    if (!messages[idx + 1] || !isSameTimeGroup(msg, messages[idx + 1])) {
      showReadStatusSet.add(idx);
    }
  });

  return { pointedCornerSet, showReadStatusSet };
};
