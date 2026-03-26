interface DateSeparatorProps {
  date: string;
}

export default function DateSeparator({ date }: DateSeparatorProps) {
  return (
    <div className="flex justify-center">
      <span className="bg-line/60 text-content-tertiary text-[11px] font-medium leading-[100%] px-2.5 py-1 rounded-full">
        {date}
      </span>
    </div>
  );
}
