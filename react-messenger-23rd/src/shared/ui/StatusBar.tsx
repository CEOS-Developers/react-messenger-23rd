import batteryIcon from '@/shared/assets/icons/chattingRoom/Status Bar/Elements/Battery.svg';
import connectionIcon from '@/shared/assets/icons/chattingRoom/Status Bar/Elements/Connection.svg';
import signalIcon from '@/shared/assets/icons/chattingRoom/Status Bar/Elements/Signal.svg';

interface StatusBarProps {
  className?: string;
}

const StatusBar = ({ className = 'bg-white' }: StatusBarProps) => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return (
    <div className={`flex h-12 w-full items-center justify-between bg-transparent px-[31.5px] ${className}`}>
      <span className="text-base font-semibold leading-4 text-black">{`${hours}:${minutes}`}</span>

      <div className="flex items-center gap-1.5">
        <img src={signalIcon} alt="시그널" />
        <img src={connectionIcon} alt="연결" />
        <img src={batteryIcon} alt="배터리" />
      </div>
    </div>
  );
};

export default StatusBar;
