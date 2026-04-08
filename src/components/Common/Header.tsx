import { type ReactNode } from "react";

import MoreIcon from "@/assets/icons/more.svg?react";
import SearchIcon from "@/assets/icons/search.svg?react";
import { cn } from "@/utils/cn";

interface HeaderProps {
  leftIcon?: ReactNode;
  text?: string;
  rightIcon?: ReactNode;
  onLeftIconClick?: () => void;
  onTextClick?: () => void;
  onRightIconClick?: () => void;
  onMoreClick?: () => void;
  onSearchIconClick?: () => void;
  showShadow?: boolean;
  showSearchIcon?: boolean;
  className?: string;
}

const Header = ({
  leftIcon,
  text,
  rightIcon,
  onLeftIconClick,
  onTextClick,
  onRightIconClick,
  onMoreClick,
  onSearchIconClick,
  showShadow = false,
  showSearchIcon = false,
  className,
}: HeaderProps) => (
  <header
    className={cn(
      "flex h-13 w-full justify-between bg-white px-4 py-3 transition-shadow",
      showShadow && "shadow-header",
      className,
    )}
  >
    <div className="flex shrink-0 flex-row items-center gap-3">
      {leftIcon && (
        <button onClick={onLeftIconClick} className="size-6 cursor-pointer text-gray-500">
          {leftIcon}
        </button>
      )}
      {text && (
        <span
          className={cn(
            leftIcon ? "font-body-1" : "font-heading-2",
            "text-black",
            onTextClick && "cursor-pointer",
          )}
          onClick={onTextClick}
        >
          {text}
        </span>
      )}
    </div>
    <div className="flex shrink-0 flex-row items-center gap-3">
      {showSearchIcon && (
        <button onClick={onSearchIconClick} className="size-6 cursor-pointer text-gray-500">
          <SearchIcon className="size-6" />
        </button>
      )}
      {rightIcon && (
        <button onClick={onRightIconClick} className="size-6 cursor-pointer text-gray-500">
          {rightIcon}
        </button>
      )}
      <button onClick={onMoreClick} className="cursor-pointer">
        <MoreIcon className="size-6 text-gray-500" />
      </button>
    </div>
  </header>
);

export default Header;
