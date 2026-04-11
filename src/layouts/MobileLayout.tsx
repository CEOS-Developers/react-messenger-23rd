type MobileLayoutProps = {
  children: React.ReactNode;
};

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="min-h-[100svh] bg-[#EDEDEF] md:flex md:items-start md:justify-center md:p-6">
      <div
        className="
          h-[100svh] w-full overflow-hidden bg-white
          md:h-[812px] md:w-[375px] md:rounded-[35px] md:border md:border-[#DEDEDE]
        "
      >
        {children}
      </div>
    </div>
  );
}