import IconUserChat from "@/assets/icons/icon_user_chat.svg?react";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md";
}

export default function Avatar({ src, name, size = "md" }: AvatarProps) {
  const sizeClass = size === "sm" ? "w-8 h-8" : "w-11 h-11";

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizeClass} rounded-full object-cover shrink-0`}
      />
    );
  }

  return (
    <IconUserChat
      className={`${sizeClass} rounded-full shrink-0`}
      aria-label={name}
    />
  );
}
