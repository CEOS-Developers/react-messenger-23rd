import SignalIcon from "../../../../assets/icons/chat/Signal.svg";
import ConnectionIcon from "../../../../assets/icons/chat/Connection.svg";
import BatteryIcon from "../../../../assets/icons/chat/Battery.svg";

export default function StatusBar() {
  return (
    <div
      className="relative h-[47px] w-full"
      style={{
        alignSelf: "stretch",
        background: "rgba(167, 200, 232, 0.80)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
    >
      <div
        className="flex h-[47px] w-[88px] items-center justify-end"
        style={{
          padding: "17px 6.5px 13px 46.5px",
        }}
      >
        <span
          className="text-center text-[#000]"
          style={{
            fontFamily: '"SF Pro", "SF Pro Display", sans-serif',
            fontFeatureSettings: '"ss03" on',
            fontSize: "17px",
            fontStyle: "normal",
            fontWeight: 590,
            lineHeight: "17px",
            letterSpacing: "-0.5px",
          }}
        >
          9:41
        </span>
      </div>

      <div
        className="absolute inline-flex items-center gap-[7px]"
        style={{
          top: "19px",
          right: "26.7px",
        }}
      >
        <img
          src={SignalIcon}
          alt=""
          className="shrink-0"
          style={{ width: "19.971px", height: "12px" }}
        />
        <img
          src={ConnectionIcon}
          alt=""
          className="shrink-0"
          style={{ width: "17px", height: "12.5px" }}
        />
        <img
          src={BatteryIcon}
          alt=""
          className="shrink-0"
          style={{ width: "27.33px", height: "13px" }}
        />
      </div>
    </div>
  );
}