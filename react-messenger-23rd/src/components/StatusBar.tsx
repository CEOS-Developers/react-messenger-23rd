import { useState, useEffect } from "react";
import cellularIcon from "@/assets/icons/cellular.svg";
import wifiIcon from "@/assets/icons/wifi.svg";
import batteryIcon from "@/assets/icons/battery.svg";

export default function StatusBar() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;

  return (
    <div className="flex items-center justify-between px-6 pt-[21px] pb-[19px] h-[54px]">
      <span className="text-[17px] font-[590] leading-[22px] text-black">
        {time}
      </span>
      <div className="flex items-center gap-[7px]">
        <img src={cellularIcon} alt="" className="w-[19px] h-[12px]" />
        <img src={wifiIcon} alt="" className="w-[17px] h-[12px]" />
        <img src={batteryIcon} alt="" className="w-[27px] h-[13px]" />
      </div>
    </div>
  );
}
