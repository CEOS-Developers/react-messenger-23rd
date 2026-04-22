// 채팅목록용: 오늘이면 시간만, 아니면 날짜만
export const formatListTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, //오전, 오후 표시
    });
  } else {
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  }
};

// 채팅방용: 오늘이면 "오늘" + 시간, 아니면 "날짜" + 시간
export const formatChatTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();

  const timePart = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  if (isToday) {
    return `오늘 ${timePart}`;
  } else {
    const datePart = `${date.getMonth() + 1}월 ${date.getDate()}일`;
    return `${datePart} ${timePart}`;
  }
};
