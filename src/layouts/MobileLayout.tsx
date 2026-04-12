import type { ReactNode } from "react";

type MobileLayoutProps = {
  children: ReactNode;
};

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="min-h-dvh bg-[var(--app-theme-color)] md:flex md:items-start md:justify-center md:bg-chat-gray-150 md:p-6">
      <div
        className="
          h-dvh w-full overflow-hidden bg-chat-white
          md:h-[812px] md:w-[375px] md:rounded-[35px] md:border md:border-chat-gray-200
        "
      >
        {children}
      </div>
    </div>
  );
}
