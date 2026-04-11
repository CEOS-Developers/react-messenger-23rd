const ONE_MINUTE_MS = 60 * 1000;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function parseMessageDate(createdDate: string, createdAt: string) {
  const [year, month, date] = createdDate.split("-").map(Number);
  const [hours, minutes] = createdAt.split(":").map(Number);

  if (
    [year, month, date, hours, minutes].some((value) => Number.isNaN(value))
  ) {
    return null;
  }

  return new Date(year, month - 1, date, hours, minutes);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatMonthDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${month}월 ${day}일`;
}

export function formatChatRoomSentAt(
  createdDate: string,
  createdAt: string,
  now = new Date()
) {
  const sentAt = parseMessageDate(createdDate, createdAt);

  if (!sentAt) return createdAt;

  const diffMs = now.getTime() - sentAt.getTime();
  const diffDays = Math.floor(
    (startOfDay(now).getTime() - startOfDay(sentAt).getTime()) / ONE_DAY_MS
  );

  if (diffMs >= 0 && diffMs <= ONE_MINUTE_MS) return "방금";
  if (diffDays === 0) return createdAt;
  if (diffDays === 1) return "어제";
  if (diffDays >= 7 && diffDays < 14) return "일주일 전";

  return formatMonthDate(sentAt);
}
