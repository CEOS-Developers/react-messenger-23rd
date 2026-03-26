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
    <div className="h-[50px] flex flex-row justify-between items-center pl-7.25 pr-4 py-[15px] typo-body-3 font-semibold">
      {currentTime}
      <RightSide />
    </div>
  );
};

export default TopBar;
