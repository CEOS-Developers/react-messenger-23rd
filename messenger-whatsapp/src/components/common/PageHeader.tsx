import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "@/assets/pageheader_back.svg?react";

interface PageHeaderProps {
  title?: string;
  isTitle?: boolean;
  right?: ReactNode;
  onBack?: () => void;
  showBack?: boolean;
  onTitleClick?: () => void;
}

export default function PageHeader({
  title,
  isTitle = true,
  right,
  onBack,
  showBack = false,
  onTitleClick,
}: PageHeaderProps) {
  const navigate = useNavigate();

  const handleBack = onBack ?? (() => navigate(-1));

  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      <div className="flex items-center gap-3">
        {showBack && (
          <BackIcon className="cursor-pointer shrink-0" onClick={handleBack} />
        )}
        <span
          className={`${isTitle ? "text-headline-1" : "text-headline-2"} text-gray-06 font-semibold`}
          onClick={onTitleClick}
        >
          {title}
        </span>
      </div>
      {right && <div className="flex flex-row items-center gap-3">{right}</div>}
    </div>
  );
}
