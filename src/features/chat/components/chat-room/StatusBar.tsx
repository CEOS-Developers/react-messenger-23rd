import SignalIconSvg from "@/assets/icons/Signal.svg";
import ConnectionIconSvg from "@/assets/icons/Connection.svg";
import BatteryIconSvg from "@/assets/icons/Battery.svg";

type StatusBarProps = {
  backgroundColor?: "chatRoom" | "white";
};

export default function StatusBar({
  backgroundColor = "chatRoom",
}: StatusBarProps) {
  const backgroundClassName =
    backgroundColor === "white"
      ? "bg-chat-white"
      : "bg-chat-blue-100/80 backdrop-blur-[2px]";

  return (
    <div className={`relative hidden h-[47px] w-full self-stretch md:block ${backgroundClassName}`}>
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
