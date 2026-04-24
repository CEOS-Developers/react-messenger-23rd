interface AlertProps {
  count: number;
}

const Alert = ({ count }: AlertProps) => {
  return (
    <div className="bg-primary-300 rounded-100 inline-flex items-center justify-center px-1.5">
      <span className="font-suit text-[11px] leading-[160%] font-semibold tracking-[-0.22px] text-white">
        {count >= 99 ? "99+" : count}
      </span>
    </div>
  );
};

export default Alert;
