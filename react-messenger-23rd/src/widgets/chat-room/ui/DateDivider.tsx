// 날짜 구분선 컴포넌트
interface DateDividerProps {
  date: string;
}

const DateDivider = ({ date }: DateDividerProps) => {
  return (
    <div className="my-6 flex justify-center">
      <span className="rounded-full bg-[var(--color-gray-20)] px-3 py-1 text-xs text-[var(--color-gray-70)]">
        {date}
      </span>
    </div>
  );
};

export default DateDivider;
