import RightSide from "../../assets/right_side.svg?react";

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

const currentTime = formatTime(Date.now());

const TopBar = () => {
  return (
    <div className="h-[50px] flex flex-row justify-between items-center px-5 py-3 typo-caption-1">
      {currentTime}
      <RightSide />
    </div>
  );
};

export default TopBar;
