import SignalIconSvg from "@/assets/icons/chat/Signal.svg";
import ConnectionIconSvg from "@/assets/icons/chat/Connection.svg";
import BatteryIconSvg from "@/assets/icons/chat/Battery.svg";

export default function StatusBar() {
  return (
    <div className="relative h-[47px] w-full self-stretch bg-chat-blue-100/80 backdrop-blur-[2px]">
      <div className="flex h-[47px] w-[88px] items-center justify-end pt-[17px] pr-[6.5px] pb-[13px] pl-[46.5px]">
        <span className="typo-ios-status">
          9:41
        </span>
      </div>

      <div className="absolute top-[19px] right-[26.7px] inline-flex items-center gap-[7px]">
        <img
          src={SignalIconSvg}
          alt="셀룰러 신호 아이콘"
          className="svg-icon h-[12px] w-[19.971px]"
        />
        <img
          src={ConnectionIconSvg}
          alt="와이파이 연결 아이콘"
          className="svg-icon h-[12.5px] w-[17px]"
        />
        <img
          src={BatteryIconSvg}
          alt="배터리 아이콘"
          className="svg-icon h-[13px] w-[27.33px]"
        />
      </div>
    </div>
  );
}
