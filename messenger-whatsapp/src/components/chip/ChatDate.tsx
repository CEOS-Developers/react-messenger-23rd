const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

interface ChipDateProps {
  date: Date;
}

const ChipDate = ({ date }: ChipDateProps) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const day = DAYS[date.getDay()];

  return (
    <div className="bg-gray-07/60 text-white rounded-2xl font-medium font-pretendard text-[12px] px-2 py-1.5 w-fit text-center">
      {yyyy}. {mm}. {dd}. {day}
    </div>
  );
};

export default ChipDate;
