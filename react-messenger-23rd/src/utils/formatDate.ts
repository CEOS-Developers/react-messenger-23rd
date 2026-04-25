export function formatDate(timestamp: string): string {
  const date = new Date(timestamp);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}
