export const formatDisplayDate = (d: string | Date, format: "short" | "long" = "short"): string => {
  const dateObj = typeof d === "string" ? new Date(d) : d;

  if (format === "long") {
    return `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
  }

  return `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
};

export const formatISODate = (date: Date) => date.toISOString().split("T")[0];

export const parseTimeToMinutes = (time: string): number => {
  const isPM = time.startsWith("오후");
  const [h, m] = time
    .replace(/오전|오후/, "")
    .trim()
    .split(":")
    .map(Number);
  const hours = isPM && h !== 12 ? h + 12 : !isPM && h === 12 ? 0 : h;
  return hours * 60 + m;
};

export const getLastSeenDisplay = (date: string, time: string, suffix = false): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const msgDate = new Date(date);
  msgDate.setHours(0, 0, 0, 0);
  const diffDays = Math.round((today.getTime() - msgDate.getTime()) / (1000 * 60 * 60 * 24));
  const end = suffix ? "접속함" : "접속";

  if (diffDays === 0) return `${time}에 마지막으로 ${end}`;
  if (diffDays === 1) return `어제 ${time}에 마지막으로 ${end}`;
  const [, month, day] = date.split("-").map(Number);
  return `${month}월 ${day}일 ${time}에 마지막으로 ${end}`;
};
