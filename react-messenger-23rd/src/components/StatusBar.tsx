import { useState, useEffect, memo } from "react";
import IconCellular from "@/assets/icons/icon_cellular.svg?react";
import IconWifi from "@/assets/icons/icon_wifi.svg?react";
import IconBattery from "@/assets/icons/icon_battery.svg?react";

export default memo(function StatusBar() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;

  return (
    <div className="flex items-center justify-between px-6 pt-5.25 pb-4.75 h-13.5">
      <div className="flex items-center px-6 h-5.5">
        <span className="text-[17px] font-[590] leading-5.5 text-black">
          {time}
        </span>
      </div>
      <div className="flex items-center gap-1.75">
        <IconCellular className="w-4.75 h-3" aria-hidden="true" />
        <IconWifi className="w-4.25 h-3" aria-hidden="true" />
        <IconBattery className="w-6.75 h-3.25" aria-hidden="true" />
      </div>
    </div>
  );
});
