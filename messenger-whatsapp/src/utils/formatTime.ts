/**
 * 오전/오후 + 12시간제 포맷 (버블 타임스탬프, 채팅 목록)
 * ex) 오전 9:05
 */
export const formatTime = (ts: number): string => {
  const d = new Date(ts);
  const hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours < 12 ? "오전" : "오후";
  const h = hours % 12 || 12;
  return `${ampm} ${h}:${minutes}`;
};

/**
 * 분 단위 비교용 포맷 (메시지 그룹핑)
 * ex) 9:5
 */
export const formatMinute = (ts: number): string => {
  const d = new Date(ts);
  return `${d.getHours()}:${d.getMinutes()}`;
};
