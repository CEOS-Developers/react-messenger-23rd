type DateDividerProps = {
  label: string;
};

export default function DateDivider({ label }: DateDividerProps) {
  return (
    <div className="flex w-full items-center px-[16px] py-[16px]">
      <div className="h-[1px] flex-1 bg-chat-gray-500/20" />
      <span className="typo-caption-01 px-[16px] text-center text-chat-gray-500">
        {label}
      </span>
      <div className="h-[1px] flex-1 bg-chat-gray-500/20" />
    </div>
  );
}
