type CountBadgeProps = {
  label: string;
  className?: string;
};

export default function CountBadge({ label, className = "" }: CountBadgeProps) {
  return (
    <span
      className={`inline-flex h-[16px] min-w-[16px] items-start justify-center rounded-[100px] bg-chat-accent-200 px-[4px] ${className}`}
    >
      <span className="flex pt-[2px]">
        <span className="text-center font-kakao-small text-[11px] leading-[100%] font-normal tracking-[0] text-chat-white">
          {label}
        </span>
      </span>
    </span>
  );
}
