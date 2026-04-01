import { getFormattedDate } from "@/utils/formatTime";

interface ChipDateProps {
  date: Date;
}

const ChipDate = ({ date }: ChipDateProps) => (
  <div className="bg-gray-07/60 text-white rounded-2xl font-medium font-pretendard text-[12px] px-2 py-1.5 w-fit text-center">
    {getFormattedDate(date)}
  </div>
);

export default ChipDate;
