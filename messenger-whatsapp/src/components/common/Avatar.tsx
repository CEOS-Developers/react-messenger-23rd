import clsx from "clsx";
import DefaultProfile from "@/assets/profile_default.svg?react";
import MeProfile from "@/assets/profile_reverse.svg?react";

interface AvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  variant?: "default" | "me";
}

export default function Avatar({
  src,
  alt,
  className,
  variant = "default",
}: AvatarProps) {
  return (
    <div
      className={clsx(
        "rounded-full bg-gray-02 overflow-hidden shrink-0",
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? "profile"}
          className="w-full h-full object-cover"
        />
      ) : variant === "me" ? (
        <MeProfile className="w-full h-full" />
      ) : (
        <DefaultProfile className="w-full h-full" />
      )}
    </div>
  );
}
