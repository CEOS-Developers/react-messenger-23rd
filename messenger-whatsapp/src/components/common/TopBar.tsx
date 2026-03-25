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
    <div className="h-[50px] flex flex-row justify-between items-center pl-[33.45px] pr-[14.67px] py-4 typo-body-3 font-semibold">
      {currentTime}
      <RightSide />
    </div>
  );
};

export default TopBar;
