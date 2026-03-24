export const formatDate = (d: string | Date, format: "short" | "long" = "short"): string => {
  const dateObj = typeof d === "string" ? new Date(d) : d;

  if (format === "long") {
    return `${dateObj.getFullYear()}년 ${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
  }

  return `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
};
