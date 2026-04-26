import RightSide from "@/assets/right_side.svg?react";

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

const currentTime = formatTime(Date.now());

const TopBar = () => {
  return (
    <div className="h-[50px] flex flex-row text-gray-06 justify-between items-center pl-7.25 pr-4 py-[15px] text-[15px] font-semibold font-pretendard tracking-[0.0]">
      {currentTime}
      <RightSide />
    </div>
  );
};

export default TopBar;
