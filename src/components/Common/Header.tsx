import { type ReactNode } from "react";
import { useMatch } from "react-router-dom";

import MoreIcon from "@/assets/icons/more.svg?react";

interface HeaderProps {
  leftIcon?: ReactNode;
  text?: string;
  rightIcon?: ReactNode;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  onMoreClick?: () => void;
  scrolled?: boolean;
  className?: string;
}

const Header = ({
  leftIcon,
  text,
  rightIcon,
  onLeftIconClick,
  onRightIconClick,
  onMoreClick,
  scrolled = false,
  className = "",
}: HeaderProps) => {
  const isChatRoom = useMatch("chat/:id");

  return (
    <header
      className={`flex h-13 w-full justify-between bg-white px-4 py-3 transition-shadow ${
        !isChatRoom && scrolled ? "shadow-header" : ""
      } ${className}`}
    >
      <div className="flex shrink-0 flex-row items-center gap-3">
        {leftIcon && (
          <button onClick={onLeftIconClick} className="size-6 cursor-pointer">
            {leftIcon}
          </button>
        )}
        {text && (
          <span className={`${leftIcon ? "font-body-1" : "font-heading-2"} text-black`}>
            {text}
          </span>
        )}
      </div>
      <div className="flex shrink-0 flex-row items-center gap-3">
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
};

export default Header;
