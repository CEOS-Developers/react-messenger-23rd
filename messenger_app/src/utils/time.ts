// 날짜 변경 확인 함수
  export const isDifferentDay = (
    prevDateString: string | undefined,
    currentDateString: string
  ) => {
    if (!prevDateString) return true;
    const prevDate = new Date(prevDateString).setHours(0, 0, 0, 0);
    const currentDate = new Date(currentDateString).setHours(0, 0, 0, 0);
    return prevDate !== currentDate;
  };

  // 시간 포맷함수
  export const formatTime = (dateString: string) => {
    return new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(dateString));
  };