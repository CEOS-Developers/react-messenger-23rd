type MobileLayoutProps = {
  children: React.ReactNode;
};

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="flex min-h-screen items-start justify-center bg-[#EDEDEF] p-6">
      <div
        className="overflow-hidden rounded-[35px] border border-[#DEDEDE] bg-white"
        style={{
          width: "375px",
          height: "812px",
        }}
      >
        {children}
      </div>
    </div>
  );
}