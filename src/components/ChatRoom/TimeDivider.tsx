interface Props {
  time: string; // e.g. "오후 2:03"
}

export default function TimeDivider({ time }: Props) {
  return (
    <div className="flex justify-center my-5">
      <span className="text-gray50 font-caption-02">{time}</span>
    </div>
  );
}
