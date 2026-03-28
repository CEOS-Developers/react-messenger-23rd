export const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("ko-KR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // '오전/오후' 표시
  });
};
