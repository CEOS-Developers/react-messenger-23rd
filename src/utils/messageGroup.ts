import type { MessageItem } from "@/types/message";

export const groupMessages = (messages: readonly MessageItem[]) => {
  const groups: MessageItem[][] = [];
  messages.forEach(msg => {
    const last = groups[groups.length - 1];
    if (last && last[0].type === msg.type) {
      last.push(msg);
    } else {
      groups.push([msg]);
    }
  });
  return groups;
};

export const getPointedCornerSet = (messages: readonly MessageItem[]) =>
  new Set<number>(
    messages.reduce<number[]>((acc, msg, idx) => {
      const prev = messages[idx - 1];
      const isFirstInGroup =
        !prev || prev.type !== msg.type || prev.time !== msg.time || prev.date !== msg.date;
      if (isFirstInGroup) acc.push(idx);
      return acc;
    }, []),
  );

export const getShowReadStatusSet = (messages: readonly MessageItem[]) =>
  new Set<number>(
    messages.reduce<number[]>((acc, msg, idx) => {
      const next = messages[idx + 1];
      const isLastInGroup =
        !next || next.type !== msg.type || next.time !== msg.time || next.date !== msg.date;
      if (isLastInGroup) acc.push(idx);
      return acc;
    }, []),
  );
