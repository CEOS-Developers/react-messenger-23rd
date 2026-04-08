import BatteryIcon from "@/assets/icons/iphone_battery.svg?react";
import SignalIcon from "@/assets/icons/iphone_signal.svg?react";
import TimeIcon from "@/assets/icons/iphone_time.svg?react";
import WifiIcon from "@/assets/icons/iphone_wifi.svg?react";

const StatusBar = () => {
  return (
    <header className="h-12 w-full bg-white">
      <div className="flex flex-row justify-between">
        <div className="flex items-center pt-5.25 pl-[31.5px]">
          <TimeIcon className="h-4.25 w-11.5" />
        </div>
        <div className="pt-5.75 pr-[18.7px]">
          <div className="flex flex-row items-center gap-1.5 pl-0.5">
            <SignalIcon className="h-3 w-5" />
            <WifiIcon className="h-3 w-4.25" />
            <BatteryIcon className="h-4 w-7" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default StatusBar;
