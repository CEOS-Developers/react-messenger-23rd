interface DateSeparatorProps {
  date: string;
}

export default function DateSeparator({ date }: DateSeparatorProps) {
  return (
    <div className="flex justify-center">
      <span className="bg-surface-reaction text-content-secondary text-caption2 px-4 py-1 rounded-full">
        {date}
      </span>
    </div>
  );
}
