type DateDividerProps = {
  label: string;
};

export default function DateDivider({ label }: DateDividerProps) {
  return (
    <div className="flex w-full items-center px-[16px] py-[16px]">
      <div className="h-[1px] flex-1 bg-[rgba(82,82,84,0.20)]" />
      <span
        className="px-[16px] text-center text-[12px] font-normal text-[#525254]"
        style={{
          fontFamily:
            '"Kakao Small Sans", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
          fontFeatureSettings: '"liga" off, "clig" off',
          lineHeight: "160%",
          letterSpacing: "-0.48px",
        }}
      >
        {label}
      </span>
      <div className="h-[1px] flex-1 bg-[rgba(82,82,84,0.20)]" />
    </div>
  );
}